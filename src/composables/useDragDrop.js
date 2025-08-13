import { ref, onMounted, onUnmounted } from 'vue'

export function useDragDrop(editor) {
  const draggedComponent = ref(null)
  const dropIndicator = ref(null)

  const createDropIndicator = () => {
    const indicator = document.createElement('div')
    indicator.style.cssText = `
      position: absolute;
      height: 2px;
      background: #007bff;
      width: 100%;
      pointer-events: none;
      z-index: 1000;
      transition: all 0.2s ease;
    `
    return indicator
  }

  const showDropIndicator = (event) => {
    if (!editor.value) return
    
    const pos = editor.value.view.posAtCoords({
      left: event.clientX,
      top: event.clientY
    })
    
    if (pos) {
      const coords = editor.value.view.coordsAtPos(pos.pos)
      if (!dropIndicator.value) {
        dropIndicator.value = createDropIndicator()
        document.body.appendChild(dropIndicator.value)
      }
      
      dropIndicator.value.style.left = coords.left + 'px'
      dropIndicator.value.style.top = coords.top + 'px'
      dropIndicator.value.style.width = coords.right - coords.left + 'px'
      dropIndicator.value.style.opacity = '1'
    }
  }

  const hideDropIndicator = () => {
    if (dropIndicator.value) {
      dropIndicator.value.style.opacity = '0'
    }
  }

  const handleDragEnter = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    showDropIndicator(event)
  }

  const handleDragLeave = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      hideDropIndicator()
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    hideDropIndicator()
    
    const componentType = event.dataTransfer.getData('component-type')
    if (componentType && editor.value) {
      const pos = editor.value.view.posAtCoords({
        left: event.clientX,
        top: event.clientY
      })
      
      if (pos) {
        return {
          componentType,
          position: pos.pos
        }
      }
    }
    return null
  }

  const cleanup = () => {
    if (dropIndicator.value) {
      document.body.removeChild(dropIndicator.value)
      dropIndicator.value = null
    }
  }

  onUnmounted(cleanup)

  return {
    draggedComponent,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    cleanup
  }
}