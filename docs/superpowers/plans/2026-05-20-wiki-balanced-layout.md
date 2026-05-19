# 平衡居中 Wiki 布局实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 消除侧边栏的“贴片广告感”，通过恢复整体居中和增加 Aside 宽度实现平衡的专业 Wiki 观感。

**架构：** 恢复 VitePress 的居中对齐机制，同时精确控制正文、间距和右侧大纲的比例。

**技术栈：** CSS (VitePress Theme Customization)

---

## 待修改文件清单

- `.vitepress/theme/custom.css`: 核心布局重构。

---

## 任务列表

### 任务 1：恢复整体居中与参数重置

**文件：**
- 修改：`.vitepress/theme/custom.css`

- [ ] **步骤 1：重置布局变量与居中逻辑**

```css
/* .vitepress/theme/custom.css */
:root {
  --vp-layout-max-width: 1560px; /* 调整为更稳重的宽度 */
}

/* 恢复居中：移除之前强制靠左的 margin 和 display 限制 */
@media (min-width: 960px) {
  .VPDoc .container {
    max-width: 100% !important;
    margin: 0 auto !important; /* 恢复居中 */
    display: flex !important;
    justify-content: center !important; /* 主体居中 */
  }
}

/* 移除 1440px 下的强制靠左指令 */
@media (min-width: 1440px) {
  .VPDoc .container {
    justify-content: center !important;
  }
}
```

- [ ] **步骤 2：提交变更**

```bash
git add .vitepress/theme/custom.css
git commit -m "style: restore layout centering and reset max-width"
```

---

### 任务 2：强化右侧大纲 (Aside) 比例

**文件：**
- 修改：`.vitepress/theme/custom.css`

- [ ] **步骤 1：增加 Aside 宽度并调整间距**

```css
/* .vitepress/theme/custom.css */

@media (min-width: 1280px) {
  .VPDoc.has-aside .aside {
    width: 320px !important; /* 增加到 320px，更有分量 */
    padding-left: 40px !important; /* 增加与正文的间距 (Gap) */
    margin-right: 0 !important;
  }

  .VPDoc.has-aside .aside-container {
    width: 320px !important;
  }
}
```

- [ ] **步骤 2：提交变更**

```bash
git add .vitepress/theme/custom.css
git commit -m "style: increase aside width to 320px for better balance"
```

---

### 任务 3：优化正文宽度与“一人一半”对齐

**文件：**
- 修改：`.vitepress/theme/custom.css`

- [ ] **步骤 1：调整 content-container 宽度以实现平衡**

```css
/* .vitepress/theme/custom.css */

@media (min-width: 960px) {
  .VPDoc .content-container {
    max-width: 1000px !important; /* 适度收窄，为 Aside 腾出平衡空间 */
    margin: 0 !important; /* 在 Flex 容器内不再需要 auto margin */
  }
}
```

- [ ] **步骤 2：验证并提交**
确认在宽屏下，正文右侧到 Aside 的距离看起来舒适且不拥挤。

```bash
git add .vitepress/theme/custom.css
git commit -m "style: optimize content width for balanced spacing"
```

---

### 任务 4：最终清理与样式稳固

**文件：**
- 修改：`.vitepress/theme/custom.css`

- [ ] **步骤 1：清理冗余的 !important 和冲突块**
检查文件中是否还有 `justify-content: flex-start` 等残留并清除。

- [ ] **步骤 2：提交最终布局**

```bash
git add .vitepress/theme/custom.css
git commit -m "style: final cleanup of layout overrides"
```

---

## 自检

1. **规格覆盖度：**
   - 恢复居中 -> 见任务 1。
   - Aside 320px -> 见任务 2。
   - 间距平衡 -> 见任务 3。
2. **占位符扫描：** 无。
3. **类型一致性：** 均为 CSS。
