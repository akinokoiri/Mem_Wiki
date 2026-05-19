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
        text: '核心机制',
        collapsed: false,
        items: [
          { text: '基础属性与常驻机制', link: '/mechanics/core' },
          { text: '灵魂系统', link: '/mechanics/soul' },
          { text: '死亡与复活', link: '/mechanics/death' }
        ]
      },
      {
        text: '形态研究',
        collapsed: false,
        items: [
          { text: '人类形态', link: '/forms/human' },
          { text: '兽化形态 (狐狸)', link: '/forms/fox' },
          { text: '怨灵形态', link: '/forms/wraith' }
        ]
      },
      {
        text: '装备与物品',
        collapsed: false,
        items: [
          { text: '封印项圈', link: '/items/collar' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    outline: {
      label: '本页导航'
    },
    
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  }
})
