<template>
  <div class="editor-wrapper">
    <div class="editor-toolbar">
      <button @click="editor?.chain().focus().toggleBold().run()" :disabled="!editor?.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor?.isActive('bold') }">
        Bold
      </button>
      <button @click="editor?.chain().focus().toggleItalic().run()" :disabled="!editor?.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor?.isActive('italic') }">
        Italic
      </button>
      <button @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor?.isActive('heading', { level: 1 }) }">
        H1
      </button>
      <button @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor?.isActive('heading', { level: 2 }) }">
        H2
      </button>
    </div>
    <div class="editor-content">
      <editor-content :editor="editor" @drop="handleDrop" @dragover="handleDragOver" />
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

export default {
  name: 'Editor',
  components: {
    EditorContent,
  },
  emits: ['drop'],
  setup(props, { emit, expose }) {
    const dropZoneActive = ref(false)

    const editor = useEditor({
      extensions: [
        StarterKit,
        Dropcursor,
        Image.configure({
          inline: true,
          allowBase64: true,
        }),
        Placeholder.configure({
          placeholder: 'Start writing or drag components from the sidebar...',
        }),
      ],
      content: `
        <h1>Welcome to the Drag & Drop Editor</h1>
        <p>Drag components from the sidebar to start building your content!</p>
      `,
      onDrop: (view, event) => {
        if (!event.dataTransfer) return false
        
        const componentType = event.dataTransfer.getData('component-type')
        if (componentType) {
          event.preventDefault()
          const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })
          if (pos) {
            insertComponent(componentType, pos.pos)
          }
          return true
        }
        return false
      },
    })

    const handleDrop = (event) => {
      event.preventDefault()
      if (!event.dataTransfer) return
      
      const componentType = event.dataTransfer.getData('component-type')
      if (componentType && editor.value) {
        const pos = editor.value.view.posAtCoords({ 
          left: event.clientX, 
          top: event.clientY 
        })
        if (pos) {
          insertComponent(componentType, pos.pos)
        }
      }
    }

    const handleDragOver = (event) => {
      event.preventDefault()
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'copy'
      }
    }

    const insertComponent = (componentType, position) => {
      if (!editor.value) return

      import('../utils/componentTemplates.js').then(({ getComponentTemplate }) => {
        const template = getComponentTemplate(componentType)
        editor.value.chain().focus().insertContentAt(position, template).run()
      }).catch(() => {
        // Fallback for basic components
        let content = ''
        switch (componentType) {
          case 'heading':
            content = '<h2>New Heading</h2>'
            break
          case 'paragraph':
            content = '<p>New paragraph content here...</p>'
            break
          case 'image':
            content = '<img src="https://via.placeholder.com/400x200" alt="Placeholder Image" />'
            break
          case 'table':
            content = `
              <table>
                <tbody>
                  <tr>
                    <th>Header 1</th>
                    <th>Header 2</th>
                  </tr>
                  <tr>
                    <td>Cell 1</td>
                    <td>Cell 2</td>
                  </tr>
                </tbody>
              </table>
            `
            break
          case 'bulletList':
            content = '<ul><li>List item 1</li><li>List item 2</li></ul>'
            break
          case 'blockquote':
            content = '<blockquote><p>This is a quote block.</p></blockquote>'
            break
          default:
            content = `<p>Component: ${componentType}</p>`
        }
        editor.value.chain().focus().insertContentAt(position, content).run()
      })
    }

    // 暴露方法给父组件
    expose({
      insertComponent
    })

    onBeforeUnmount(() => {
      if (editor.value) {
        editor.value.destroy()
      }
    })

    return {
      editor,
      dropZoneActive,
      handleDrop,
      handleDragOver,
      insertComponent
    }
  }
}
</script>

<style scoped>
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