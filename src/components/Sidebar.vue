<template>
  <div class="sidebar">
    <h3>Components</h3>
    <div class="component-list">
      <div
        v-for="component in components"
        :key="component.type"
        class="component-item"
        draggable="true"
        @dragstart="handleDragStart(component.type, $event)"
        @dragend="handleDragEnd"
      >
        <div class="component-icon">
          <component :is="component.icon" />
        </div>
        <span class="component-text">{{ component.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getAvailableComponents } from '../utils/componentTemplates.js'
import { h } from 'vue'

const iconMap = {
  'H': () => h('span', { style: 'font-weight: bold; font-size: 16px;' }, 'H'),
  'P': () => h('span', { style: 'font-size: 14px;' }, 'P'),
  'IMG': () => h('svg', { 
    width: 20, 
    height: 20, 
    viewBox: "0 0 24 24", 
    fill: "none", 
    stroke: "currentColor", 
    "stroke-width": 2 
  }, [
    h('rect', { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
    h('circle', { cx: "8.5", cy: "8.5", r: "1.5" }),
    h('polyline', { points: "21 15 16 10 5 21" })
  ]),
  'TBL': () => h('svg', { 
    width: 20, 
    height: 20, 
    viewBox: "0 0 24 24", 
    fill: "none", 
    stroke: "currentColor", 
    "stroke-width": 2 
  }, [
    h('path', { d: "M3 3h18v18H3zM3 9h18M9 3v18" })
  ]),
  'UL': () => h('svg', { 
    width: 20, 
    height: 20, 
    viewBox: "0 0 24 24", 
    fill: "none", 
    stroke: "currentColor", 
    "stroke-width": 2 
  }, [
    h('line', { x1: "8", y1: "6", x2: "21", y2: "6" }),
    h('line', { x1: "8", y1: "12", x2: "21", y2: "12" }),
    h('line', { x1: "8", y1: "18", x2: "21", y2: "18" }),
    h('line', { x1: "3", y1: "6", x2: "3.01", y2: "6" }),
    h('line', { x1: "3", y1: "12", x2: "3.01", y2: "12" }),
    h('line', { x1: "3", y1: "18", x2: "3.01", y2: "18" })
  ]),
  'Q': () => h('span', { style: 'font-style: italic;' }, '"'),
  'CODE': () => h('span', { style: 'font-family: monospace; font-size: 14px;' }, '</>'),
  'CALLOUT': () => h('span', { style: 'font-size: 14px;' }, '!'),
  'DIV': () => h('span', { style: 'font-size: 18px;' }, '—')
}

export default {
  name: 'Sidebar',
  emits: ['drag-start'],
  setup(props, { emit }) {
    const components = getAvailableComponents()

    const handleDragStart = (componentType, event) => {
      event.dataTransfer.setData('component-type', componentType)
      event.dataTransfer.effectAllowed = 'copy'
      emit('drag-start', componentType)
    }

    const handleDragEnd = () => {
      // 清理拖拽状态
    }

    return {
      components,
      iconMap,
      handleDragStart,
      handleDragEnd
    }
  }
}
</script>