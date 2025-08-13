<template>
  <div class="sidebar">
    <!-- 侧边栏标题 -->
    <h2>Components</h2>
    
    <!-- 组件列表容器 -->
    <div class="components-list">
      <!-- 遍历所有可用组件，为每个组件创建可拖拽元素 -->
      <!-- draggable="true 让元素可拖拽 -->
      <div 
        v-for="component in components" 
        :key="component.type"
        class="component-item"
        :draggable="true"
        @dragstart="handleDragStart($event, component.type)"
        @dragend="handleDragEnd"
      >
        <!-- 组件图标显示 -->
        <div class="component-icon">
          {{ iconMap[component.icon]() }}
        </div>
        <!-- 组件名称显示 -->
        <span>{{ component.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Sidebar组件：拖拽组件侧边栏
 * 
 * 功能特点：
 * 1. 展示所有可用的拖拽组件
 * 2. 支持拖拽功能，将组件拖到编辑器中
 * 3. 提供组件图标和名称预览
 * 4. 响应式设计，适配不同屏幕尺寸
 */
export default {
  name: 'Sidebar',
  
  data() {
    return {
      // 可用组件列表：每个组件包含类型、名称和图标信息
      components: [
        { type: 'heading', name: 'Heading', icon: 'H' },
        { type: 'paragraph', name: 'Paragraph', icon: 'P' },
        { type: 'image', name: 'Image', icon: 'IMG' },
        { type: 'table', name: 'Table', icon: 'TAB' },
        { type: 'bulletList', name: 'Bullet List', icon: 'UL' },
        { type: 'blockquote', name: 'Quote', icon: 'Q' },
        { type: 'divider', name: 'Divider', icon: 'DIV' },
      ],
      
      // 组件图标映射：将图标标识符映射为对应的HTML元素
      iconMap: {
        'H': () => 'H',
        'P': () => 'P',
        'IMG': () => '🖼️',
        'TAB': () => '⊞',
        'UL': () => '•••',
        'Q': () => '"',
        'DIV': () => '—',
      }
    }
  },
  
  methods: {
    /**
     * 处理拖拽开始事件
     * 
     * 功能：
     * 1. 设置拖拽数据，传递组件类型信息
     * 2. 设置拖拽时的视觉样式
     * 
     * @param {DragEvent} event - 拖拽事件对象
     * @param {string} componentType - 被拖拽的组件类型
     */
    handleDragStart(event, componentType) {
      // 设置拖拽数据：将组件类型信息存储在dataTransfer中
      event.dataTransfer.setData('component-type', componentType)
      
      // 设置拖拽效果：允许复制操作
      event.dataTransfer.effectAllowed = 'copy'
      
      // 可选：设置拖拽时的自定义图标（这里使用默认图标）
      // event.dataTransfer.setDragImage(...)
    },
    
    /**
     * 处理拖拽结束事件
     * 
     * 功能：
     * 1. 清理拖拽状态
     * 2. 可以在这里添加拖拽完成后的清理逻辑
     * 
     * @param {DragEvent} event - 拖拽事件对象
     */
    handleDragEnd(event) {
      // 拖拽结束时的清理工作
      // 目前不需要特殊处理，但可以在这里添加动画效果或状态清理
      console.log('Drag ended for component')
    }
  }
}
</script>

<style scoped>
/* 侧边栏样式 */
.sidebar {
  width: 250px;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  padding: 20px;
  overflow-y: auto;
}

.sidebar h2 {
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #495057;
}

/* 组件列表样式 */
.components-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 单个组件项样式 */
.component-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  cursor: grab;
  transition: all 0.2s ease;
}

/* 组件项悬停效果 */
.component-item:hover {
  background: #e9ecef;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 拖拽时的组件样式 */
.component-item:active {
  cursor: grabbing;
}

/* 组件图标样式 */
.component-icon {
  margin-right: 8px;
  font-size: 16px;
  width: 24px;
  text-align: center;
}

/* 组件名称样式 */
.component-item span {
  font-size: 14px;
  color: #495057;
}
</style>