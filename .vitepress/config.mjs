import { defineConfig } from 'vitepress'

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
          { text: '一、基础属性与常驻机制', link: '/mechanics/core' }
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
    config: (md) => {
      md.core.ruler.after('block', 'dst-noun-autolink-plugin', (state) => {
        // 核心正则：匹配 [名词]、[**名词**]、**[名词]** 并过滤 [文字](url)
        const regex = /(?:\*\*)?\[(\*?\*?)([^\]]+?)\1\](?:\*\*)?(?!\()/g;
        
        const nounMap = {
          '生命值': 'health',
          '饱食度': 'hunger',
          '理智值': 'sanity',
          '精神值': 'sanity',
          '灵魂值': 'soul',
          '灵魂池': 'soul',
          '狐狸': 'beast',
          '兽化': 'beast',
          '怨灵': 'ghost',
          '已死之人': 'ghost',
          '尸体': 'corpse',
          '芒芒的尸体': 'corpse',
          '封印项圈': 'collar',
          '封印项圈lv1': 'collar',
          '封印项圈lv2': 'collar-lv2',
          '封印项圈lv3': 'collar-lv3',
          '封印项圈lv4·暗': 'collar-lv4-an',
          '暗项圈': 'collar-lv4-an',
          '封印项圈lv4·月': 'collar-lv4-yue',
          '月项圈': 'collar-lv4-yue',
          '芒式修补工具': 'repair',
          '尸体防腐核心': 'tomb-upgrader',
          '暗影观察者': 'shadow-gestalt'
        };

        state.tokens.forEach(token => {
          if (token.type === 'inline') {
            let newChildren = [];
            token.children.forEach(child => {
              if (child.type === 'text') {
                let text = child.content;
                let lastIndex = 0;
                let match;
                regex.lastIndex = 0;
                
                let matches = [];
                while ((match = regex.exec(text)) !== null) {
                  matches.push(match);
                }
                
                if (matches.length > 0) {
                  matches.forEach(m => {
                    const startIndex = m.index;
                    const endIndex = regex.lastIndex;
                    
                    // 匹配前的普通文本
                    if (startIndex > lastIndex) {
                      const textToken = new state.Token('text', '', 0);
                      textToken.content = text.slice(lastIndex, startIndex);
                      newChildren.push(textToken);
                    }
                    
                    // DST 名词 Token 注入
                    const noun = m[2].trim();
                    const lowerNoun = noun.toLowerCase();
                    const key = nounMap[lowerNoun] || nounMap[noun] || 'mod';
                    
                    const htmlToken = new state.Token('html_inline', '', 0);
                    htmlToken.content = `<DST icon="${key}">${noun}</DST>`;
                    newChildren.push(htmlToken);
                    
                    lastIndex = endIndex;
                  });
                  
                  // 匹配后的剩余文本
                  if (lastIndex < text.length) {
                    const textToken = new state.Token('text', '', 0);
                    textToken.content = text.slice(lastIndex);
                    newChildren.push(textToken);
                  }
                } else {
                  newChildren.push(child);
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
