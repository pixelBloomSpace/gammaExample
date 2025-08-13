# Tiptap Drag & Drop Editor

一个类似 Gamma.app 的拖拽式富文本编辑器，基于 Vue 3.4、Tiptap 2.11.7 和 Vite 构建。

## 功能特性

- 🎯 **拖拽组件**：从侧边栏拖拽各种组件到编辑器
- 📝 **富文本编辑**：基于 Tiptap 的强大编辑功能
- 🎨 **丰富组件**：支持标题、段落、图片、表格、列表、引用等
- 🖱️ **精确放置**：拖拽时显示放置指示器
- ⚡ **实时预览**：所见即所得的编辑体验

## 组件列表

- **Heading** - 标题组件
- **Paragraph** - 段落组件
- **Image** - 图片组件
- **Table** - 表格组件
- **Bullet List** - 无序列表
- **Numbered List** - 有序列表
- **Quote** - 引用块
- **Code Block** - 代码块
- **Callout** - 提示框
- **Divider** - 分隔线

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3001 查看应用（端口可能因占用而变化）

### 使用演示

1. 打开浏览器访问本地服务器
2. 从左侧侧边栏拖拽组件到编辑器
3. 点击内容进行编辑
4. 使用顶部工具栏格式化文本

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── components/
│   ├── Editor.vue          # 主编辑器组件
│   └── Sidebar.vue         # 侧边栏组件
├── composables/
│   └── useDragDrop.js      # 拖拽功能组合式函数
├── utils/
│   └── componentTemplates.js # 组件模板定义
├── App.vue                 # 主应用组件
├── main.js                 # 应用入口
└── style.css               # 全局样式
```

## 使用方法

### 拖拽组件

1. 从左侧侧边栏选择需要的组件
2. 拖拽组件到编辑器中的目标位置
3. 释放鼠标完成插入

### 编辑内容

- 使用顶部工具栏进行文本格式化
- 直接点击内容进行编辑
- 支持标准的富文本编辑操作

### 自定义组件

在 `src/utils/componentTemplates.js` 中添加新的组件模板：

```javascript
myComponent: {
  name: 'My Component',
  icon: 'MY',
  generate: (param1, param2) => `<div>Custom content</div>`
}
```

## 技术栈

- **Vue 3.4** - 渐进式 JavaScript 框架
- **Tiptap 2.11.7** - 现代富文本编辑器框架
- **Vite** - 下一代前端构建工具
- **SortableJS** - 拖拽排序库

## 开发说明

### 添加新组件类型

1. 在 `componentTemplates.js` 中定义新组件
2. 更新 `getAvailableComponents()` 函数
3. 确保组件模板返回有效的 HTML

### 样式定制

所有样式都在 `src/style.css` 中定义，支持自定义主题。

## 许可证

MIT License