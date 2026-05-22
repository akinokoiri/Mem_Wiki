import { defineConfig } from 'vitepress'
import { nounMap } from './theme/components/icons.js'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "芒伊木 Wiki",
  description: "饥荒：联机版 芒伊木模组全效果说明书",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/mechanics/core' }
    ],

    sidebar: [
      {
        text: '芒伊木 Wiki 词条',
        collapsed: false,
        items: [
          { text: '一、基础属性与常驻机制', link: '/mechanics/core' },
          { text: '二、建筑、物品、装备与料理', link: '/mechanics/items' },
          { text: '三、敌人与随从', link: '/mechanics/enemies' },
          { text: '四、技能树', link: '/mechanics/skilltree' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    outline: {
      label: '本页导航',
      level: [2, 3]
    },
    
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },

  // 自定义 Markdown 编译器行为
  markdown: {
    math: true,
    config: (md) => {
      // 注册黑幕 ||文字|| 行内语法插件
      md.inline.ruler.before('emphasis', 'heimu', (state, silent) => {
        const start = state.pos;
        if (state.src.charCodeAt(start) !== 0x7C || state.src.charCodeAt(start + 1) !== 0x7C) return false;

        let end = -1;
        for (let i = start + 2; i < state.posMax - 1; i++) {
          if (state.src.charCodeAt(i) === 0x7C && state.src.charCodeAt(i + 1) === 0x7C) {
            end = i;
            break;
          }
        }

        if (end === -1) return false;

        if (!silent) {
          const tokenOpen = state.push('heimu_open', 'span', 1);
          tokenOpen.attrs = [['class', 'heimu']];
          
          const max = state.posMax;
          state.pos = start + 2;
          state.posMax = end;
          state.md.inline.tokenize(state);
          state.posMax = max;

          const tokenClose = state.push('heimu_close', 'span', -1);
        }

        state.pos = end + 2;
        return true;
      });

      md.core.ruler.after('inline', 'dst-noun-autolink-plugin', (state) => {
        // 核心正则：匹配 [名词]、[**名词**]、**[名词]**
        const regexNoun = /(?:\*\*)?\[(\*?\*?)([^\]]+?)\1\](?:\*\*)?/g;

        state.tokens.forEach(token => {
          if (token.type === 'inline') {
            let newChildren = [];
            let inLink = false;

            token.children.forEach(child => {
              if (child.type === 'link_open') inLink = true;
              if (child.type === 'link_close') inLink = false;

              if (child.type === 'text' && !inLink) {
                let content = child.content;
                let isModified = false;

                regexNoun.lastIndex = 0;
                if (regexNoun.test(content)) {
                  isModified = true;
                }

                if (!isModified) {
                  // 如果没有任何匹配，保留原样
                  newChildren.push(child);
                } else {
                  // 2. 处理 [名词] 映射（此时黑幕已经变成了 HTML，当做字符串一块拆分处理）
                  let lastIndex = 0;
                  let m;
                  regexNoun.lastIndex = 0;
                  while ((m = regexNoun.exec(content)) !== null) {
                    const startIndex = m.index;
                    const endIndex = m.index + m[0].length;
                    
                    // 匹配前的部分（可能是普通文本或已经转换的黑幕 HTML）
                    if (startIndex > lastIndex) {
                      const textToken = new state.Token('html_inline', '', 0); // 统一用 html_inline 以支持已存在的黑幕
                      textToken.content = content.slice(lastIndex, startIndex);
                      newChildren.push(textToken);
                    }
                    
                    const noun = m[2].trim();
                    const lowerNoun = noun.toLowerCase();
                    const key = nounMap[lowerNoun] || nounMap[noun] || 'mod';
                    
                    const htmlToken = new state.Token('html_inline', '', 0);
                    htmlToken.content = `<DST icon="${key}">${noun}</DST>`;
                    newChildren.push(htmlToken);
                    
                    lastIndex = endIndex;
                  }
                  
                  if (lastIndex < content.length) {
                    const textToken = new state.Token('html_inline', '', 0);
                    textToken.content = content.slice(lastIndex);
                    newChildren.push(textToken);
                  }
                }
              } else {
                newChildren.push(child);
              }
            });
            token.children = newChildren;
          }
        });
      });
    }
  }
})
