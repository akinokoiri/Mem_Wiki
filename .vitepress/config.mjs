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
        const nounMap = {
          '生命值': 'health',
          '饱食度': 'hunger',
          '理智值': 'sanity',
          '精神值': 'sanity',
          '灵魂值': 'soul',
          '灵魂值系统': 'soul',
          '灵魂池': 'hpky',
          '兽化': 'beast',
          '怨灵': 'ghost',
          '尸体': 'corpse',
          '芒头': 'corpse',
          '芒身': 'corpse',
          '芒手': 'corpse',
          '芒腿': 'corpse',
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
          '狐狸的凶宅': 'hlxz',
          '芒芒的坟墓': 'mb',
          '芒芒的墓碑': 'mb',
          '凉拌脑花': 'food-lbnh',
          '红烧芒肘': 'food-hsmz',
          '烤全芒': 'food-kqm',
          '热心肠血冻': 'food-rxxcd',
          '星期四特惠套餐': 'food-xqs',
          '芒伊月': 'yue',
          '荒尹沐': 'shadowmem',
          '友善的芒伊月': 'yue-pet',
          '友善的荒尹沐': 'shadowmem-pet',
          '光辉意志': 'yue-bond',
          '先驱意志': 'shadowmem-bond',
          '被囚禁的虚影': 'qjdxy',
          '被侵蚀的虚影': 'shadow-gestalt',
          '尸体防腐核心': 'tomb-upgrader',
          '芒芒尸体的设计图': 'mem_corpse_site',
          '魂墙': 'soul_wall',
          '电锯惊魂': 'dj',
          '刻印形态': 'kyxt',
          '电锯轰鸣': "djhm",
          '魂魄刻印': "state",
          '沐尹荒': 'shadowmem_minion',
          '友善的沐尹荒': 'shadowmem_minion_pet',
          '身体(友善的荒尹沐)': 'shadowmem_pet_body',
          '编织梦魇': 'stalker_minion',
          '位面寄生': 'shadowaligned',
          '位面能量': 'shadowaligned',
          '暗影位面寄生': 'shadowaligned',
          '月亮位面寄生': 'moonaligned',
          '位面封锁': 'moonaligned',
          '敌意虚影·启迪': 'mem_gestalt_guard',
          '闪耀刻印': 'state',
          '鬼火': 'ghost_fire',
          '月光灼烧': 'state',
          '位面实体降格': 'state',
          '芒伊木': 'mod',
          '芒芒的肢体': 'corpse',
          '灵魂实体专精': 'mod',
          '彼世的光芒': 'mod',
          '死体精通': 'mod',
          '启迪陷阱空投仓': 'trap',
          '启迪陷阱': 'trap',
          '启迪陷阱空袭': 'trap',
          '启迪陷阱阵列': 'trap',
          '再一次的机会': 'state',
          '复生虚弱': 'state',
          '灵魂震荡': 'state',
          '灵魂裂痕': 'state',
          '捕猎姿态': 'beast',
          '分头行动': 'ftxd',
          '死亡回归': 'mod',
          '友善随从': 'mod',
          '天基激光': 'tenkibeam',
          '月能激光': 'yuebeam',
          '月能灼烧伤害': 'original',
          '极限催眠': 'original',
          '虚影轰炸区': 'atk',
          '三连击': 'atk',
          '跳劈': 'atk',
          '横扫': 'atk',
          '冲刺': 'atk',
          '劈砍': 'atk',
          '暗影观察者': 'shadowseer',
          '收回': 'command',
          '战斗': 'command',
          '工作命令': 'command',
          '解散': 'command',
          '汇合行动(解散)': 'command',
          '分头行动(友善的荒尹沐)': 'command',
          '潜伏恐惧': 'mem_ruinsnightmare',
        };

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
