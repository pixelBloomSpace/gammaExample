<template>
  <div class="editor-container">
    <Sidebar @drag-start="handleDragStart" />
    <Editor ref="editorRef" @drop="handleDrop" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Editor from './components/Editor.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Editor
  },
  setup() {
    const editorRef = ref(null)

    const handleDragStart = (componentType) => {
      console.log('Drag started:', componentType)
    }

    const handleDrop = (componentType, position) => {
      if (editorRef.value) {
        editorRef.value.insertComponent(componentType, position)
      }
    }

    return {
      editorRef,
      handleDragStart,
      handleDrop
    }
  }
}
</script>