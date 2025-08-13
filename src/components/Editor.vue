<template>
  <div class="editor-wrapper" v-if="editor">
    <drag-handle :editor="editor" :tippy-options="{ placement: 'left' }" pluginKey="myCustomDragHandle">
      <div class="custom-drag-handle"></div>
    </drag-handle>

    <!-- 编辑器工具栏：提供基础文本格式化功能 -->
    <div class="editor-toolbar">
      <!-- 加粗按钮：使用Tiptap的toggleBold命令 -->
      <button
        @click="editor?.chain().focus().toggleBold().run()"
        :disabled="!editor?.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor?.isActive('bold') }"
        title="加粗文本"
      >
        Bold
      </button>

      <!-- 斜体按钮：使用Tiptap的toggleItalic命令 -->
      <button
        @click="editor?.chain().focus().toggleItalic().run()"
        :disabled="!editor?.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor?.isActive('italic') }"
        title="斜体文本"
      >
        Italic
      </button>

      <!-- 一级标题按钮：使用Tiptap的toggleHeading命令设置H1 -->
      <button
        @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor?.isActive('heading', { level: 1 }) }"
        title="一级标题"
      >
        H1
      </button>

      <!-- 二级标题按钮：使用Tiptap的toggleHeading命令设置H2 -->
      <button
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor?.isActive('heading', { level: 2 }) }"
        title="二级标题"
      >
        H2
      </button>
    </div>

    <!-- 编辑器内容区域：支持拖拽放置 -->
    <div class="editor-content">
      <!-- EditorContent是Tiptap的Vue组件，用于渲染编辑器 -->
      <!-- @drop和@dragover事件处理拖拽功能 -->
      <editor-content :editor="editor" @drop="handleDrop" @dragover="handleDragOver" />
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { DragHandle } from "@tiptap/extension-drag-handle-vue-3";
import NodeRange from "@tiptap/extension-node-range";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { getComponentTemplate } from "../utils/componentTemplates.js";

/**
 * Editor组件：富文本编辑器
 *
 * 功能特点：
 * 1. 基于Tiptap的富文本编辑功能
 * 2. 支持从侧边栏拖拽组件插入
 * 3. 提供基础文本格式化（加粗、斜体、标题等）
 * 4. 响应式设计，支持图片插入
 */
export default {
  name: "Editor",
  components: {
    EditorContent,
    DragHandle,
  },
  emits: ["drop"],
  setup(props, { emit, expose }) {
    // 拖拽区域激活状态标识
    const dropZoneActive = ref(false);

    /**
     * 创建Tiptap编辑器实例
     *
     * 扩展配置：
     * - StarterKit: 提供基础编辑功能（段落、标题、列表等）
     * - Dropcursor: 显示拖拽放置位置的光标
     * - Image: 支持图片插入
     * - Placeholder: 空内容时显示提示文字
     */
    const editor = useEditor({
      extensions: [
        StarterKit,
        // Dropcursor,
        Image.configure({
          inline: true, // 允许行内图片
          allowBase64: true, // 允许Base64图片
        }),
        Placeholder.configure({
          placeholder: "Start writing or drag components from the sidebar...", // 空编辑器提示文字
        }),
        NodeRange.configure({
          key: null,
        }),
      ],

      // 初始内容：欢迎信息和使用说明
      content: `
        <h1>Welcome to the Drag & Drop Editor</h1>
        <p>Drag components from the sidebar to start building your content!</p>
      `,

      /**
       * 原生拖拽事件处理
       * 处理从外部拖拽到编辑器的组件
       *
       * @param {EditorView} view - Tiptap编辑器视图
       * @param {DragEvent} event - 拖拽事件对象
       * @returns {boolean} - 是否处理了该事件
       */
      // onDrop: (view, event) => {
      //   // 安全处理：确保dataTransfer存在
      //   if (!event.dataTransfer) return false;

      //   // 获取拖拽的组件类型
      //   const componentType = event.dataTransfer.getData("component-type");
      //   if (componentType) {
      //     event.preventDefault();

      //     // 计算拖拽位置在编辑器中的坐标
      //     const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });
      //     if (pos) {
      //       // 在指定位置插入组件
      //       insertComponent(componentType, pos.pos);
      //     }
      //     return true;
      //   }
      //   return false;
      // },
    });

    /**
     * 处理拖拽放置事件
     * 用于Vue模板中的@drop事件
     *
     * @param {DragEvent} event - 拖拽事件对象
     */
    const handleDrop = (event) => {
      event.preventDefault();

      // 安全处理：确保dataTransfer和编辑器实例存在
      if (!event.dataTransfer) return;

      //从 event.dataTransfer 中取出key为 component-type 的数据
      const componentType = event.dataTransfer.getData("component-type");
      if (componentType && editor.value) {
        // 计算鼠标位置对应的编辑器位置
        const pos = editor.value.view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });
        if (pos) {
          insertComponent(componentType, pos.pos);
        }
      }
    };

    /**
     * 处理拖拽悬停事件
     * 设置拖拽时的视觉反馈
     *
     * @param {DragEvent} event - 拖拽事件对象
     */
    const handleDragOver = (event) => {
      event.preventDefault();

      // 安全处理：确保dataTransfer存在
      if (event.dataTransfer) {
        // 设置拖拽效果为'copy'（显示复制光标）
        event.dataTransfer.dropEffect = "copy";
      }
    };

    /**
     * 插入组件到编辑器
     * 根据组件类型获取模板并插入到指定位置
     *
     * @param {string} componentType - 组件类型标识
     * @param {number} position - 插入位置（编辑器坐标）
     */
    const insertComponent = (componentType, position) => {
      // 确保编辑器实例存在
      if (!editor.value) return;

      // 获取对应组件的HTML模板
      const template = getComponentTemplate(componentType);

      // 在指定位置插入模板内容
      editor.value.chain().focus().insertContentAt(position, template).run();
    };

    // 组件卸载前清理：销毁编辑器实例
    onBeforeUnmount(() => {
      if (editor.value) {
        editor.value.destroy();
      }
    });

    return {
      editor,
      dropZoneActive,
      handleDrop,
      handleDragOver,
      insertComponent,
    };
  },
};
</script>

<style>
.custom-drag-handle {
  &::after {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1.25rem;
    content: "⠿";
    font-weight: 700;
    cursor: grab;
    background: #0d0d0d10;
    color: #0d0d0d50;
    border-radius: 0.25rem;
  }
}

.ProseMirror {
  padding: 1rem;
}

/* 编辑器样式 */
button {
  margin-right: 8px;
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #f5f5f5;
}

button.is-active {
  background: #007bff;
  color: white;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
