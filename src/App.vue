<template>
  <div id="app">
    <!-- 页面标题 -->
    <header class="app-header">
      <h1>Drag & Drop Editor</h1>
      <p class="subtitle">Build beautiful content with ease</p>
    </header>

    <!-- 主应用区域 -->
    <div class="app-container">
      <!-- 侧边栏：包含可拖拽组件 -->
      <Sidebar class="sidebar" />
      
      <!-- 编辑器主体：富文本编辑区域 -->
      <div class="editor-container">
        <Editor ref="editor" class="editor" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Editor from './components/Editor.vue'

/**
 * App组件：拖拽编辑器主应用
 * 
 * 功能说明：
 * 1. 整合侧边栏和编辑器组件
 * 2. 提供整体应用布局
 * 3. 管理组件间的通信和状态
 * 4. 响应式设计，适配不同屏幕尺寸
 * 
 * 组件架构：
 * - Sidebar: 左侧组件列表，支持拖拽
 * - Editor: 右侧富文本编辑器，支持放置组件
 */
export default {
  name: 'App',
  components: {
    Sidebar,
    Editor
  },
  
  mounted() {
    // 应用启动时的初始化逻辑
    console.log('Drag & Drop Editor initialized')
  }
}
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 根元素样式 */
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* 页面标题样式 */
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.app-header .subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 300;
}

/* 主容器布局 */
.app-container {
  display: flex;
  height: calc(100vh - 120px); /* 减去header高度 */
  overflow: hidden;
}

/* 侧边栏样式 */
.sidebar {
  flex-shrink: 0; /* 防止侧边栏被压缩 */
  width: 280px;
  background: white;
  border-right: 1px solid #e1e8ed;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
}

/* 编辑器容器样式 */
.editor-container {
  flex: 1; /* 占据剩余空间 */
  overflow: hidden;
  position: relative;
}

/* 编辑器样式 */
.editor {
  height: 100%;
  background: white;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

/* 响应式设计：小屏幕适配 */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
    height: auto;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .app-header {
    padding: 20px;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .editor {
    margin: 10px;
    height: calc(100vh - 300px);
  }
}

/* 响应式设计：中等屏幕适配 */
@media (max-width: 1024px) and (min-width: 769px) {
  .sidebar {
    width: 250px;
  }
  
  .editor {
    margin: 15px;
  }
}

/* 滚动条样式美化 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>