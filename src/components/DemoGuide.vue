<template>
  <div class="demo-guide">
    <h1>🚀 Gamma.app Style Drag & Drop Editor</h1>
    
    <div class="guide-section">
      <h2>✨ 功能特性</h2>
      <ul>
        <li>🎯 拖拽组件到编辑器</li>
        <li>📝 富文本编辑支持</li>
        <li>🎨 10+ 内置组件</li>
        <li>📱 响应式设计</li>
        <li>⚡ 实时预览</li>
      </ul>
    </div>

    <div class="guide-section">
      <h2>🎮 使用方法</h2>
      <ol>
        <li>从左侧侧边栏选择组件</li>
        <li>拖拽到编辑器中的目标位置</li>
        <li>释放鼠标完成插入</li>
        <li>点击内容进行编辑</li>
      </ol>
    </div>

    <div class="guide-section">
      <h2>📦 可用组件</h2>
      <div class="component-grid">
        <div class="component-card" v-for="component in components" :key="component.type">
          <div class="component-icon">{{ component.icon }}</div>
          <div class="component-name">{{ component.name }}</div>
        </div>
      </div>
    </div>

    <div class="guide-section">
      <h2>🔧 技术栈</h2>
      <div class="tech-stack">
        <span class="tech-badge">Vue 3.4</span>
        <span class="tech-badge">Tiptap 2.11.7</span>
        <span class="tech-badge">Vite</span>
        <span class="tech-badge">TypeScript</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getAvailableComponents } from '../utils/componentTemplates.js'

export default {
  name: 'DemoGuide',
  setup() {
    const components = getAvailableComponents()
    
    return {
      components
    }
  }
}
</script>

<style scoped>
.demo-guide {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-guide h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 2.5rem;
}

.guide-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.guide-section h2 {
  color: #34495e;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.guide-section ul,
.guide-section ol {
  color: #555;
  line-height: 1.8;
}

.guide-section li {
  margin-bottom: 8px;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.component-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: transform 0.2s ease;
}

.component-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.component-icon {
  font-size: 24px;
  margin-bottom: 8px;
  color: #007bff;
}

.component-name {
  font-size: 14px;
  color: #495057;
  font-weight: 500;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-badge {
  background: #007bff;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}
</style>