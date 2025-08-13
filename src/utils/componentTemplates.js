export const componentTemplates = {
  heading: {
    name: 'Heading',
    icon: 'H',
    generate: (level = 2, text = 'New Heading') => `<h${level}>${text}</h${level}>`
  },
  
  paragraph: {
    name: 'Paragraph',
    icon: 'P',
    generate: (text = 'Start typing your content here...') => `<p>${text}</p>`
  },
  
  image: {
    name: 'Image',
    icon: 'IMG',
    generate: (src = 'https://via.placeholder.com/600x300', alt = 'Image description') => 
      `<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto;" />`
  },
  
  table: {
    name: 'Table',
    icon: 'TBL',
    generate: (rows = 3, cols = 3) => {
      return `
        <div class="table-wrapper">
          <table style="width: 100%; border-collapse: collapse; margin: 1em 0;">
            <tbody>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">Header 1</th>
                <th style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">Header 2</th>
                <th style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; font-weight: bold;">Header 3</th>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Cell 1</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Cell 2</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Cell 3</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Cell 4</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Cell 5</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Cell 6</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    }
  },
  
  bulletList: {
    name: 'Bullet List',
    icon: 'UL',
    generate: (items = ['Item 1', 'Item 2', 'Item 3']) => {
      let list = '<ul>'
      items.forEach(item => {
        list += `<li>${item}</li>`
      })
      list += '</ul>'
      return list
    }
  },
  
  numberedList: {
    name: 'Numbered List',
    icon: 'OL',
    generate: (items = ['First item', 'Second item', 'Third item']) => {
      let list = '<ol>'
      items.forEach(item => {
        list += `<li>${item}</li>`
      })
      list += '</ol>'
      return list
    }
  },
  
  blockquote: {
    name: 'Quote',
    icon: 'Q',
    generate: (text = 'This is an important quote or highlight.') => 
      `<blockquote style="border-left: 4px solid #007bff; padding-left: 16px; margin: 16px 0; font-style: italic; color: #666;"><p>${text}</p></blockquote>`
  },
  
  codeBlock: {
    name: 'Code Block',
    icon: 'CODE',
    generate: (code = '// Your code here', language = 'javascript') => 
      `<pre><code class="language-${language}" style="background: #f4f4f4; padding: 16px; border-radius: 4px; display: block; overflow-x: auto;">${code}</code></pre>`
  },
  
  callout: {
    name: 'Callout',
    icon: 'CALLOUT',
    generate: (type = 'info', title = 'Note', content = 'Important information here') => {
      const colors = {
        info: { bg: '#e3f2fd', border: '#2196f3', text: '#1976d2' },
        warning: { bg: '#fff3e0', border: '#ff9800', text: '#e65100' },
        success: { bg: '#e8f5e8', border: '#4caf50', text: '#2e7d32' },
        error: { bg: '#ffebee', border: '#f44336', text: '#c62828' }
      }
      
      const color = colors[type] || colors.info
      
      return `
        <div style="
          background: ${color.bg};
          border-left: 4px solid ${color.border};
          padding: 16px;
          margin: 16px 0;
          border-radius: 4px;
        ">
          <strong style="color: ${color.text}; display: block; margin-bottom: 8px;">${title}</strong>
          <p style="margin: 0; color: #333;">${content}</p>
        </div>
      `
    }
  },
  
  divider: {
    name: 'Divider',
    icon: 'DIV',
    generate: () => '<hr style="border: none; height: 1px; background: #ddd; margin: 24px 0;" />'
  }
}

export const getComponentTemplate = (type, ...args) => {
  const template = componentTemplates[type]
  if (template && template.generate) {
    return template.generate(...args)
  }
  return `<p>Unknown component: ${type}</p>`
}

export const getAvailableComponents = () => {
  return Object.entries(componentTemplates).map(([key, template]) => ({
    type: key,
    name: template.name,
    icon: template.icon
  }))
}