# 设计规格说明书：全量 PNG 转换为 WebP 与自动化重构

本项目基于 `VitePress` 构建，旨在提供极高性能与艺术级的模组宣传站。为进一步优化网络传输带宽、缩减托管体积并加快首屏加载时间，我们计划对 `public/` 目录下所有的 `.png` 静态资源进行全量 WebP 格式转换，并全自动重构整个代码仓库中的图片引用。

---

## 🎯 优化目标 (Optimization Goals)

1.  **物理体积缩减**：将 `public/` 目录下的 100+ 个 PNG 文件（包含普通图标、大图、卡片切图、交互式技能树背景等）全量转换为 **WebP**。
2.  **高保真有损压缩**：统一使用 `sharp` 库的 WebP 压缩算法，画质参数设为 **`90%`**。该模式在维持精美微动效和图像高保真清晰度的同时，预计可带来 60% ~ 80% 的体积优化。
3.  **零破损全局重构**：安全重构 `.md` 词条文档、`.vue` 交互组件、以及 `.js` 映射文件中的所有 `.png` 文件路径，确保转换后无一处 Missing Image（碎图）错误。
4.  **极简仓库**：清理所有原有的 `.png` 文件，仅在 Git 中保留这一阶段性优化成果。

---

## 🔍 项目现状与受影响资源 (Impact Analysis)

### 1. 静态资源分布 (Image Source)
受影响的 PNG 文件均位于以下 `public/` 目录下（共 104 个文件）：
-   `public/*.png` （大图、卡片、背景图）
-   `public/icons/*.png` （54 个常规词条内联小图标）
-   `public/skills/*.png` （28 个技能树结点图标）
-   `public/skills/office_icon/*.png` （18 个交互式技能树专属切图）
-   `public/skills/office_icon2/*.png` （4 个交互式长按钮切图）

### 2. 代码引用分布 (Code References)
以下文件包含对上述 `.png` 文件的物理路径引用，必须进行后缀名替换：
-   **配置文件与映射表**：
    -   `g:\DSmod\Mem-Wiki\.vitepress\theme\components\icons.js` （包含数十个对 `/icons/*.png` 和 `/skills/*.png` 的绝对路径映射）
-   **交互组件 (Vue 3)**：
    -   `g:\DSmod\Mem-Wiki\.vitepress\theme\components\DST.vue`
    -   `g:\DSmod\Mem-Wiki\.vitepress\theme\components\DSTIcon.vue`
    -   `g:\DSmod\Mem-Wiki\.vitepress\theme\components\Infobox.vue`
    -   `g:\DSmod\Mem-Wiki\.vitepress\components\SkillTreeSimulator.vue` （包含大量 CSS url 背景图和大背景 img 的 `.png` 静态路径引用）
    -   `g:\DSmod\Mem-Wiki\.vitepress\components\SkillTreeNode.vue` （包含 3 处通过 Vue 模板语法动态拼接的路径：`/skills/office_icon/${statusImage}.png`、`/skills/${node.icon}.png`、`/skills/office_icon/${frameImage}.png`）
-   **Markdown 词条文档**：
    -   `g:\DSmod\Mem-Wiki\index.md`
    -   `g:\DSmod\Mem-Wiki\mechanics/*.md`
    -   `g:\DSmod\Mem-Wiki\mechanics/skills_desc/*.md`

---

## 🛠️ 方案设计 (Architecture & Design)

我们将通过在项目根目录（或 `scratch/`）临时执行一个**一键重构 Node.js 脚本** (`scratch/convert_to_webp.js`) 来实现这一变更：

### 第一阶段：资源转换 (Image Process)
1.  使用 `fs.readdirSync` 递归遍历 `public/` 下的所有文件。
2.  对于每一个 `.png` 结尾的文件：
    -   调用 `sharp(pngPath).webp({ quality: 90 }).toFile(webpPath)` 转换输出 WebP。
    -   转换完成后，安全地物理删除原有的 `.png` 文件。

### 第二阶段：代码自动重构 (Code Refactoring)
1.  定义待重构的文件范围：
    -   包含：根目录下所有的 `.md`，`.vitepress/` 下所有的 `.vue`、`.js`、`.mjs` 文件。
    -   排除：`node_modules/`、`.git/`、`.antigravity/`、`scratch/`、`superpowers/`（我们的日志和历史计划所在目录）。
2.  对这些待重构文件进行读取和替换：
    -   **规则 1（普通静态路径引用）**：对于匹配特定公共目录图片的静态路径（如 `/(icons|skills|office_icon|office_icon2|videos|images)/[a-zA-Z0-9_\-]+.png` 或直接的 `/[a-zA-Z0-9_\-]+.png`），将 `.png` 替换为 `.webp`。
    -   **规则 2（组件内动态拼接语法）**：
        -   在 `SkillTreeNode.vue` 中，将 `/skills/office_icon/${statusImage}.png` 修改为 `/skills/office_icon/${statusImage}.webp`。
        -   将 `/skills/${node.icon}.png` 修改为 `/skills/${node.icon}.webp`。
        -   将 `/skills/office_icon/${frameImage}.png` 修改为 `/skills/office_icon/${frameImage}.webp`。
3.  写回原文件。

---

## ✅ 验证计划 (Verification Plan)

### 自动化检测与打包测试
1.  **文件覆盖度检查**：脚本在执行后会统计并打印 `[转换前总大小] -> [转换后总大小]` 字节数，以及转换出的 WebP 文件总数。
2.  **物理碎图与死链接扫描**：检查在代码和文档中是否还残留着 `.png` 后缀（除了打包日志和不需要处理的特定文件外）。
3.  **VitePress 生产环境编译测试**：运行 `npm run docs:build`，验证整个网站是否 100% 编译通过，有无任何未解析资源报错。

### 本地视觉验证
-   拉起本地开发服务器 `npm run docs:dev`，审查主页及技能树模拟器组件，确保微动效、透明通道切图、交互式背景全部高清且显示完美。

---

> [!NOTE]
> 本规格说明书已保存并自动 commit 备档。请在此审查整体设计。
