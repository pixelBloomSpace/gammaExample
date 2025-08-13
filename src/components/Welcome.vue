<template>
  <div class="welcome-container">
    <div class="welcome-content">
      <h1>🎉 欢迎使用拖拽编辑器</h1>
      <p class="subtitle">类似 Gamma.app 的视觉内容创建体验</p>
      
      <div class="features">
        <div class="feature">
          <span class="emoji">🎯</span>
          <span>拖拽组件</span>
        </div>
        <div class="feature">
          <span class="emoji">📝</span>
          <span>富文本编辑</span>
        </div>
        <div class="feature">
          <span class="emoji">🎨</span>
          <span>实时预览</span>
        </div>
      </div>

      <button class="get-started-btn" @click="$emit('start')">
        开始使用
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  emits: ['start']
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.welcome-content {
  max-width: 500px;
  padding: 40px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  font-weight: 300;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.features {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.emoji {
  font-size: 2rem;
}

.get-started-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s ease;
  font-weight: 600;
}

.get-started-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>