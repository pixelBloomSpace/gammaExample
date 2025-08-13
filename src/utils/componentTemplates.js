/**
 * 组件模板工具模块
 * 
 * 功能说明：
 * 1. 为拖拽编辑器提供各种组件的HTML模板
 * 2. 支持动态生成表格、列表等复杂组件
 * 3. 提供统一的模板获取接口
 * 4. 支持自定义组件样式和结构
 * 
 * 使用方法：
 * import { getComponentTemplate } from '@/utils/componentTemplates.js'
 * const template = getComponentTemplate('heading')
 */

/**
 * 组件模板配置对象
 * 每个键对应一个组件类型，值为返回HTML模板的函数
 */
const componentTemplates = {
  /**
   * 标题组件模板
   * 生成一个h2标题，可编辑
   * 
   * @returns {string} HTML模板字符串
   */
  heading: () => `
    <h2 style="margin: 16px 0; font-size: 24px; font-weight: bold; color: #2c3e50;">
      Your Heading Here
    </h2>
  `,

  /**
   * 段落组件模板
   * 生成一个标准段落文本
   * 
   * @returns {string} HTML模板字符串
   */
  paragraph: () => `
    <p style="margin: 12px 0; line-height: 1.6; color: #34495e; font-size: 16px;">
      Start typing your content here. This is a paragraph where you can add detailed information, 
      descriptions, or any text content you need.
    </p>
  `,

  /**
   * 图片组件模板
   * 生成一个带占位符的图片元素
   * 
   * @returns {string} HTML模板字符串
   */
  image: () => `
    <div style="margin: 16px 0; text-align: center;">
      <img 
        src="https://aippt-domestic-test.aippt.com/aippt-server/personal/image/932/186580/20250813152419yxynzgj.png" 
        alt="Placeholder Image" 
        style="
          max-width: 100%; 
          height: auto; 
          border-radius: 8px; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        " 
      />
      <p style="margin-top: 8px; font-size: 14px; color: #7f8c8d; font-style: italic;">
        Add your image description here
      </p>
    </div>
  `,

  /**
   * 表格组件模板
   * 生成一个3行3列的标准表格
   * 包含表头和示例数据
   * 
   * @returns {string} HTML模板字符串
   */
  table: () => `
    <div class="table-wrapper" style="margin: 16px 0;">
      <table style="
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      ">
        <tbody>
          <!-- 表头行 -->
          <tr>
            <th style="
              background-color: #f8f9fa;
              font-weight: bold;
              padding: 12px;
              border: 1px solid #ddd;
              text-align: left;
            ">Header 1</th>
            <th style="
              background-color: #f8f9fa;
              font-weight: bold;
              padding: 12px;
              border: 1px solid #ddd;
              text-align: left;
            ">Header 2</th>
            <th style="
              background-color: #f8f9fa;
              font-weight: bold;
              padding: 12px;
              border: 1px solid #ddd;
              text-align: left;
            ">Header 3</th>
          </tr>
          
          <!-- 数据行1 -->
          <tr>
            <td style="
              padding: 12px;
              border: 1px solid #ddd;
              background-color: white;
            ">Cell 1-1</td>
            <td style="
              padding: 12px;
              border: 1px solid #ddd;
              background-color: white;
            ">Cell 1-2</td>
            <td style="
              padding: 12px;
              border: 1px solid #ddd;
              background-color: white;
            ">Cell 1-3</td>
          </tr>
          
          <!-- 数据行2 -->
          <tr>
            <td style="
              padding: 12px;
              border: 1px solid #ddd;
              background-color: #f8f9fa;
            ">Cell 2-1</td>
            <td style="
              padding: 12px;
              border: 1px solid #ddd;
              background-color: #f8f9fa;
            ">Cell 2-2</td>
            <td style="
              padding: 12px;
              border: 1px solid #ddd;
              background-color: #f8f9fa;
            ">Cell 2-3</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,

  /**
   * 无序列表组件模板
   * 生成一个带项目符号的列表
   * 
   * @returns {string} HTML模板字符串
   */
  bulletList: () => `
    <ul style="
      margin: 12px 0;
      padding-left: 20px;
      list-style-type: disc;
    ">
      <li style="
        margin: 8px 0;
        line-height: 1.6;
        color: #34495e;
      ">
        First list item - add your content here
      </li>
      <li style="
        margin: 8px 0;
        line-height: 1.6;
        color: #34495e;
      ">
        Second list item - continue with your points
      </li>
      <li style="
        margin: 8px 0;
        line-height: 1.6;
        color: #34495e;
      ">
        Third list item - keep adding as needed
      </li>
    </ul>
  `,

  /**
   * 引用块组件模板
     * 生成一个带样式的引用块
   * 
   * @returns {string} HTML模板字符串
   */
  blockquote: () => `
    <blockquote style="
      margin: 16px 0;
      padding: 16px 20px;
      border-left: 4px solid #3498db;
      background-color: #f8f9fa;
      font-style: italic;
      color: #2c3e50;
      border-radius: 0 8px 8px 0;
    ">
      <p style="margin: 0; line-height: 1.6;">
        "This is a quote block. Use this to highlight important information, 
        testimonials, or any content that deserves special attention."
      </p>
      <cite style="
        display: block;
        margin-top: 8px;
        font-size: 14px;
        color: #7f8c8d;
        font-style: normal;
      ">
        — Author Name
      </cite>
    </blockquote>
  `,

  /**
   * 分隔符组件模板
   * 生成一个水平分隔线
   * 
   * @returns {string} HTML模板字符串
   */
  divider: () => `
    <hr style="
      margin: 24px 0;
      border: none;
      height: 2px;
      background: linear-gradient(to right, #3498db, #2c3e50, #3498db);
      border-radius: 1px;
    " />
  `
}

/**
 * 获取指定类型的组件模板
 * 
 * @param {string} type - 组件类型标识符
 * @returns {string} 对应的HTML模板字符串
 * @throws {Error} 当组件类型不存在时抛出错误
 * 
 * @example
 * // 获取标题组件模板
 * const headingTemplate = getComponentTemplate('heading')
 * 
 * // 获取表格组件模板
 * const tableTemplate = getComponentTemplate('table')
 */
export function getComponentTemplate(type) {
  // 检查组件类型是否存在
  if (!componentTemplates[type]) {
    // 如果类型不存在，返回错误提示或默认模板
    console.warn(`Component type "${type}" not found, using default template`)
    return `
      <div style="
        padding: 16px;
        background-color: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 8px;
        color: #856404;
        margin: 8px 0;
      ">
        <strong>Warning:</strong> Unknown component type "${type}"
      </div>
    `
  }
  
  // 返回对应的组件模板
  return componentTemplates[type]()
}

/**
 * 获取所有可用的组件类型
 * 
 * @returns {Array<Object>} 组件类型数组，每个对象包含type、name和icon属性
 * 
 * @example
 * const availableComponents = getAvailableComponents()
 * // 返回: [{ type: 'heading', name: 'Heading', icon: 'H' }, ...]
 */
export function getAvailableComponents() {
  return [
    { type: 'heading', name: 'Heading', icon: 'H' },
    { type: 'paragraph', name: 'Paragraph', icon: 'P' },
    { type: 'image', name: 'Image', icon: 'IMG' },
    { type: 'table', name: 'Table', icon: 'TAB' },
    { type: 'bulletList', name: 'Bullet List', icon: 'UL' },
    { type: 'blockquote', name: 'Quote', icon: 'Q' },
    { type: 'divider', name: 'Divider', icon: 'DIV' },
  ]
}

/**
 * 注册新的组件模板
 * 允许动态添加新的组件类型
 * 
 * @param {string} type - 组件类型标识符
 * @param {string} name - 组件显示名称
 * @param {string} icon - 组件图标标识符
 * @param {Function} templateFn - 返回HTML模板的函数
 * 
 * @example
 * // 注册一个新的代码块组件
 * registerComponent('codeBlock', 'Code Block', 'CODE', () => `
 *   <pre><code>console.log('Hello World')</code></pre>
 * `)
 */
export function registerComponent(type, name, icon, templateFn) {
  if (componentTemplates[type]) {
    console.warn(`Component type "${type}" already exists, overwriting...`)
  }
  
  // 添加新的组件模板
  componentTemplates[type] = templateFn
  
  // 返回注册结果
  return {
    success: true,
    message: `Component "${name}" registered successfully`
  }
}