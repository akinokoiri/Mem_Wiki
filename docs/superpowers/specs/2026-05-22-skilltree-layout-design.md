# 技能树模拟器双列布局设计 (SkillTree Layout Design)

## 1. 目标与背景
当前的技能树模拟器组件 (`SkillTreeSimulator.vue`) 居中显示，且由于页面默认保留了大纲栏空间，导致右侧存在大片空白无法利用。同时，辅助说明内容（如 `MediaCard` 和补充文字）无处安放。
本设计的目的是将页面重构为“左侧为技能树，右侧为详情补充说明”的双列固定网格布局，在不改变原有视觉稳定的前提下，极大地提高页面的信息密度与美观度。

## 2. 页面结构与布局 (Layout & Structure)
### 2.1 整体容器 (`mechanics/skilltree.md`)
- **禁用默认侧边栏**：在 Markdown 文件的 Frontmatter 中配置 `aside: false`，释放页面全宽。
- **布局方案**：使用 `CSS Grid` 构建双列网格布局，比例建议为 `6.5fr : 3.5fr` 或固定比例。
  - **左列（主屏区）**：容纳重构后的 `SkillTreeSimulator`。
  - **右列（侧边详情区）**：容纳全新的 `SkillDetailPanel` 组件。
- **状态流转**：
  页面级将接收左列发射的选中状态，并传递给右列。
  ```vue
  <script setup>
  import { ref } from 'vue';
  const selectedSkillId = ref(null);
  </script>
  ```

### 2.2 左列组件 (`SkillTreeSimulator.vue`)
- **移除冗余样式**：剥离为了使其在单列布局中居中所设置的冗余 `margin` 和最大宽度限制，让其在 Grid 容器的左列中自适应撑满（保持原生游戏卷轴比例）。
- **事件发射**：
  在用户点击/选择技能时，通过 `emit('select', nodeId)` 将当前焦点的技能 ID 传递给父级环境。

### 2.3 右列组件 (`SkillDetailPanel.vue`)
- **功能职责**：根据接收到的 `skillId` 显示该技能的高级说明、图文以及富媒体卡片（如 `MediaCard`）。
- **默认状态**：当 `skillId` 为空时，右侧面板不留白，而是默认显示原先位于顶部的“操作介绍 (Operation Guide)”模块，保持界面丰满。
- **交互微动画**：
  当 `skillId` 改变时，内容进行“淡出 -> 淡入且轻微上浮”的 Vue `<Transition>` 动画，保证视觉的高级感和切换的柔和。

## 3. 约束与成功标准
- **无结构位移**：页面的 Grid 结构必须在加载时就完全固定，点击技能不会导致页面大块结构（如绿色模拟器区域）的滑动或尺寸跳跃。
- **自适应**：在宽屏下呈现经典的双列布局；如果在极窄屏幕（如移动端），需要通过媒体查询自动回退到上下堆叠布局（Flex/Grid 纵向排列）。
- **样式解耦**：右侧的 `SkillDetailPanel` 作为一个独立的组件，代码与复杂的 `SkillTreeSimulator` 完全解耦，便于后续自由添加各类 Web 组件和效果。

## 4. 后续任务
- [ ] 创建 `SkillDetailPanel.vue` 组件
- [ ] 调整 `skilltree.md` 的 Markdown 结构，引入双列容器
- [ ] 修改 `SkillTreeSimulator.vue` 剥离多余 margin 并添加 emit 事件
- [ ] 应用 `<Transition>` 动画与默认态说明内容
