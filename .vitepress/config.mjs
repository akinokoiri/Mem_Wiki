import { defineConfig } from 'vitepress'
import { nounMap } from './theme/components/icons.js'
import { checkWikiLinks } from '../scripts/check-links.mjs'
import { archiveMathCjk } from './markdown/math-cjk.mjs'
import { wikiSearchOptions } from './data/wiki-search.js'
import { skillTitle } from './data/skill-presentation.js'
import { termDisplayNamesZh } from './data/terms-zh.js'
import { termTranslations } from './data/terms-en.js'

const archiveSidebar = [
  { text: '开始', items: [{ text: '极速上手', link: '/mechanics/lite_draft' }] },
  { text: '资料', items: [
    { text: '角色机制', link: '/mechanics/core' },
    { text: '物品与料理', link: '/mechanics/items' },
    { text: '敌人与随从', link: '/mechanics/enemies' },
    { text: '状态与机制', link: '/mechanics/statuses' }
  ] },
  { text: '工具与设置', items: [
    { text: '技能树', link: '/mechanics/skilltree' },
    { text: '模组设置', link: '/mechanics/settings' }
  ] }
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  buildEnd(siteConfig) {
    checkWikiLinks(siteConfig.outDir)
  },
  locales: {
    root: { label: "中文", lang: "zh-CN", title: "芒伊木 Wiki" },
    en: {
      label: "English", lang: "en-US", title: "Mangem Wiki",
      description: "Complete guide to the Mangem mod for Don’t Starve Together",
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Quick Start', link: '/en/mechanics/lite_draft' },
          { text: 'Reference', items: [
            { text: 'Character Mechanics', link: '/en/mechanics/core' },
            { text: 'Items & Food', link: '/en/mechanics/items' },
            { text: 'Enemies & Followers', link: '/en/mechanics/enemies' },
            { text: 'Statuses & Systems', link: '/en/mechanics/statuses' }
          ] },
          { text: 'Skill Tree', link: '/en/mechanics/skilltree' }
        ],
        sidebar: [
          { text: 'Start Here', items: [{ text: 'Quick Start', link: '/en/mechanics/lite_draft' }] },
          { text: 'Reference', items: [
            { text: 'Character Mechanics', link: '/en/mechanics/core' },
            { text: 'Items & Food', link: '/en/mechanics/items' },
            { text: 'Enemies & Followers', link: '/en/mechanics/enemies' },
            { text: 'Statuses & Systems', link: '/en/mechanics/statuses' }
          ] },
          { text: 'Tools & Settings', items: [
            { text: 'Skill Tree', link: '/en/mechanics/skilltree' },
            { text: 'Mod Settings', link: '/en/mechanics/settings' }
          ] }
        ],
        outline: { label: 'On this page', level: [2, 3] },
        sidebarMenuLabel: 'Menu', returnToTopLabel: 'Back to top',
        darkModeSwitchLabel: 'Appearance', lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme', langMenuLabel: 'Change language',
        docFooter: { prev: 'Previous page', next: 'Next page' },
        notFound: { title: 'PAGE NOT FOUND', quote: 'This page could not be found. Return to the Wiki to continue exploring.', linkLabel: 'Go to home', linkText: 'Take me home' }
      }
    },
  },
  title: "芒伊木 Wiki",
  description: "饥荒：联机版 芒伊木模组全效果说明书",
  srcExclude: [
    'CLAUDE.md',
    'GEMINI.md',
    '_RAW_DATA_SOURCE.md',
    'scratch/**',
    '.antigravity/**',
    '**/superpowers/**',
    '**/README.md',
    'CODE_OF_CONDUCT.md',
    'items/**'
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '极速上手', link: '/mechanics/lite_draft' },
      { text: '资料', items: [
        { text: '角色机制', link: '/mechanics/core' },
        { text: '物品与料理', link: '/mechanics/items' },
        { text: '敌人与随从', link: '/mechanics/enemies' },
        { text: '状态与机制', link: '/mechanics/statuses' }
      ] },
      { text: '技能树', link: '/mechanics/skilltree' }
    ],

    // The sidebar switches pages; section links belong to each page's outline.
    sidebar: archiveSidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/akinokoiri/Mem_Wiki' }
    ],

    outline: {
      label: '本页导航',
      level: [2, 3]
    },
    
    sidebarMenuLabel: '页面导航',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换为浅色',
    darkModeSwitchTitle: '切换为暗色',

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    footer: {
      message: 'Released under the <a href="https://github.com/akinokoiri/Mem_Wiki/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>. | <a href="https://github.com/akinokoiri/Mem_Wiki/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener noreferrer">Code of Conduct</a>',
      copyright: 'Copyright © 2026-present akinokoiri <br/> <a href="https://www.netlify.com" target="_blank" rel="noopener"><img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" style="display:inline; margin-top:8px; height: 32px;" /></a>'
    },

    search: {
      provider: 'local',
      options: {
        miniSearch: wikiSearchOptions,
        locales: {
          en: { translations: {
            button: { buttonText: 'Search', buttonAriaLabel: 'Search the Wiki' },
            modal: {
              displayDetails: 'Show details', resetButtonTitle: 'Clear search', backButtonTitle: 'Back',
              noResultsText: 'No results found. Try a mechanic or item name.',
              footer: { selectText: 'Select', navigateText: 'Navigate', closeText: 'Close' }
            }
          } }
        },
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索 Wiki' },
          modal: {
            displayDetails: '显示详情', resetButtonTitle: '清除搜索', backButtonTitle: '返回',
            noResultsText: '没有找到相关内容，试试机制或物品名称。',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        },
        _render(src, env, md) {
          const relativePath = env.relativePath || ''
          // 只渲染 mechanics 目录下的 markdown 文件供搜索索引使用
          if (!/^(en\/)?mechanics\//.test(relativePath)) {
            return ''
          }
          const skill = relativePath.match(/^(?:en\/)?mechanics\/skills_desc\/([^/]+)\.md$/)
          if (skill && skillTitle(skill[1])) {
            // Detail fragments are loaded inside the skill tree. Give search
            // their skill title; extractField routes each section to that tree.
            const title = skillTitle(skill[1])
            const label = relativePath.startsWith('en/') ? (termTranslations[title] || (termTranslations[title.replace(' · 路径锁', '')] || title.replace(' · 路径锁', '')) + (title.endsWith(' · 路径锁') ? ' · Path lock' : '')) : title
            return md.render(`# ${label} {#${skill[1]}}\n\n${src}`, env)
          }
          return md.render(src, env)
        }
      }
    }
  },

  // 自定义 Markdown 编译器行为
  markdown: {
    math: true,
    config: (md) => {
      md.use(archiveMathCjk)
      md.core.ruler.after('anchor', 'wiki-heading-labels', state => {
        const english = (state.env.relativePath || '').startsWith('en/')
        for (let i = 0; i < state.tokens.length; i++) {
          if (state.tokens[i].type !== 'heading_open') continue
          const inline = state.tokens[i + 1]
          const title = (inline?.content || '')
            .replace(/\[#([^\]]+)\]/g, '')
            .replace(/\{#[^}]+\}/g, '')
            .replace(/<[^>]*>/g, '')
            .replace(/\[([^\]]+)\]/g, (_, term) => english ? (termTranslations[term] || term) : (termDisplayNamesZh[term] || term))
            .replace(/[*_`]/g, '').trim()
          for (const child of inline?.children || []) {
            if (child.attrGet?.('class') === 'header-anchor') {
              child.attrSet('aria-label', english ? `Permalink to "${title}"` : `链接到“${title}”`)
            }
          }
        }
      })
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

      // 注册 [#词条名] 语法糖，转化为隐形锚点
      md.inline.ruler.before('emphasis', 'dst-anchor-sugar', (state, silent) => {
        const start = state.pos;
        if (state.src.charCodeAt(start) !== 0x5B || state.src.charCodeAt(start + 1) !== 0x23) return false; // [#

        let end = -1;
        for (let i = start + 2; i < state.posMax; i++) {
          if (state.src.charCodeAt(i) === 0x5D) { // ]
            end = i;
            break;
          }
        }

        if (end === -1) return false;

        if (!silent) {
          const idName = state.src.slice(start + 2, end).trim();
          const token = state.push('html_inline', '', 0);
          token.content = `<span id="def-${idName}" class="dst-anchor"></span>`;
        }

        state.pos = end + 1;
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
                    const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
                    const english = (state.env.relativePath || '').startsWith('en/');
                    const label = english ? (termTranslations[noun] || noun) : (termDisplayNamesZh[noun] || noun);
                    htmlToken.content = `<DST term="${escape(noun)}" icon="${key}">${escape(label)}</DST>`;
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
