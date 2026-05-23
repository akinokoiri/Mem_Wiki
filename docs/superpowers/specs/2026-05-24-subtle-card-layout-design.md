# 芒伊木 Wiki - 无感卡片双栏排版设计方案

## 1. 目标与背景
**目标**：解决以 `G:\DSmod\Mem-Wiki\mechanics\items.md` 为代表的 Wiki 页面中，由于浮动属性卡片（`Infobox`）过长、导致强制使用 `<div class="clearfix">` 隔离条未出现大面积左下侧空白的视觉缺陷。同时解决多媒体组件（`MediaCard`）在清除浮动后被强行挤落至 `Infobox` 底部导致版面割裂的 Bug。

**背景**：
基于艺术总监设计决策，本项目作为 **“互动式宣传海报”** 级别的高视觉文档站，不应容忍低劣的大面积无效空白。我们引入**“无感卡片双栏网格 (Subtle Card Wrapper)”** 替代原有的浮动与清除浮动逻辑，将页面内的异构信息容器化，统一排版风格并赋予极佳的呼吸留白与响应式体验。

---

## 2. 架构与实现逻辑

此方案通过在 CSS 层面增加专有栅格排版类，并在 Markdown 文件中为条目增加逻辑容器标签来实现。

### 2.1 CSS 排版层 (`custom.css`)

新增 `.item-card` 容器及内部 `.item-content` 盒子，使用 **CSS Grid** 替换 Float：

```css
/* ============================================================
   无感卡片双栏网格 (Subtle Card Grid)
   ============================================================ */
.vp-doc .item-card {
  display: grid;
  grid-template-columns: 1fr; /* 默认单栏 */
  gap: 32px;
  align-items: start;
  background: var(--mem-bg);
  border: 1px dashed var(--mem-border);
  border-radius: 8px;
  padding: 24px;
  margin: 24px 0 32px;
  box-shadow: 0 4px 12px var(--mem-table-shadow);
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.vp-doc .item-card:hover {
  border-color: var(--mem-heading-sub);
  box-shadow: 0 6px 16px rgba(92, 58, 33, 0.08);
}

/* 当卡片直接含有属性面板、右侧媒体卡片或侧栏容器时，自动变为双栏 */
.vp-doc .item-card:has(> .infobox),
.vp-doc .item-card:has(> .media-card),
.vp-doc .item-card:has(> .item-aside) {
  grid-template-columns: 1fr 320px;
}

.vp-doc .item-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 消除卡片内首尾段落外边距对布局的挤压 */
.vp-doc .item-content > *:first-child {
  margin-top: 0 !important;
}
.vp-doc .item-content > *:last-child {
  margin-bottom: 0 !important;
}

/* 右侧侧栏堆叠容器 */
.vp-doc .item-aside {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 320px;
  box-sizing: border-box;
}

/* 卡片内部属性卡片与多媒体卡片重置 */
.vp-doc .item-card .infobox,
.vp-doc .item-card .media-card {
  margin: 0 !important;
  float: none !important;
  clear: none !important;
  max-width: 100% !important;
}

.vp-doc .item-card .infobox {
  width: 100% !important; /* 属性栏宽度撑满 */
}

.vp-doc .item-card .media-card {
  margin: 0 auto !important; /* 右侧媒体卡片水平居中 */
}

/* 卡片内部嵌套的多媒体卡片样式保留（如段落中的 MediaCard 居中） */
.vp-doc .item-content .media-card {
  margin: 16px auto !important;
  float: none !important;
  clear: none !important;
}

/* 子卡片与子网格系统 (Sub-Card & Sub-Grid System) */
.vp-doc .item-sub-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
}

.vp-doc .sub-card {
  background: var(--mem-bg-soft);
  border: 1px solid var(--mem-border);
  border-radius: 6px;
  padding: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.vp-doc .sub-card:hover {
  border-color: var(--mem-heading-sub);
  box-shadow: 0 4px 12px rgba(92, 58, 33, 0.04);
}

.vp-doc .sub-card > *:first-child {
  margin-top: 0 !important;
}
.vp-doc .sub-card > *:last-child {
  margin-bottom: 0 !important;
}

/* 侧栏微调对齐工具 (仅在桌面端生效，防止破坏移动端排版) */
@media (min-width: 960px) {
  .vp-doc .aside-push-60 {
    margin-top: 60px !important;
  }
  .vp-doc .aside-push-120 {
    margin-top: 120px !important;
  }
  .vp-doc .aside-push-180 {
    margin-top: 180px !important;
  }
  .vp-doc .aside-push-300 {
    margin-top: 300px !important;
  }
}

/* 响应式折叠：在手机和中屏下自动转换为单栏 */
@media (max-width: 959px) {
  .vp-doc .item-card {
    grid-template-columns: 1fr !important;
    gap: 20px;
    padding: 16px;
  }
  
  .vp-doc .item-aside {
    width: 100% !important;
  }
  
  .vp-doc .item-card .infobox,
  .vp-doc .item-card .media-card {
    margin: 16px auto !important;
  }
  
  .vp-doc .item-sub-grid {
    grid-template-columns: 1fr !important;
  }
}
```

### 2.2 Markdown 条目结构层 (`*.md`)

将原有的 `<div class="clearfix">` 替换为更具语义化的双层网格结构：

```html
<div class="item-card">
<div class="item-content">

### [#芒芒的尸体]芒芒的尸体 <DSTIcon icon="corpse" />

- 等同于死亡留下的[芒芒的尸体]。
- 可以被`分解法杖`或[电锯惊魂]分解为肢体。
- 具有新鲜度，默认腐烂时间 3 天。
  
<MediaCard 
  src="/videos/fh_web.webm" 
  caption="身体正在用刻印状态攻击牛群" 
  position="center"
/>

</div>

<Infobox 
  title="芒芒的尸体"
  image="/death2-54.png"
  :stats="[
    { label: '配方', value: '6 小肉 + 3 噩梦燃料' },
    { label: '腐烂时间', value: '3 天', icon: '/icons/icon_spoil.png' },
  ]"
/>
</div>
```

---

## 3. 测试与验证标准

1. **左侧多媒体填补验证**：
   在 `.item-card` 结构下，`MediaCard` 必须位于左栏 `.item-content` 容器内且完美展示在介绍列表下方，绝对不能被挤落至右侧 `Infobox` 底端。
2. **条目间绝缘隔离验证**：
   去除页面所有 `<div class="clearfix">` 后，多个 `.item-card` 依次排列时必须天然硬隔离，下一条目的标题与内容绝不与上一条目的 `Infobox` 产生碰撞或粘连。
3. **自适应单栏退避验证**：
   对于没有引入 `<Infobox>` 组件的微小建筑/物品（例如 `#芒芒尸体的设计图`），容器必须通过 `:not(:has(.infobox))` 选择器自动延伸为 100% 全宽度的单栏卡片。
4. **移动端响应式折叠测试**：
   在浏览器宽度缩放至 959px 以下时，右侧的 `Infobox` 应自动流式排版折叠在左侧内容正下方。

---

## 4. 后续规划
- 验证通过后，将该优雅的 `.item-card` 现代双栏网格推广到 Wiki 其他异构物品或生物板块（如 `enemies.md` 等），全面提升整站视觉凝聚力。
