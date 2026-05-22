# 技能树双列布局 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将技能树页面重构为左侧主模拟器、右侧动态详情面板的固定网格双列布局。

**架构：** 在 Markdown 中通过 CSS Grid 建立左右列，移除原有组件居中限制以自适应左列；新建侧边栏组件接收选中技能并展示详情与动画。

**技术栈：** Vue 3 (Composition API), VitePress, CSS Grid, Vue `<Transition>`

---

### 任务 1：创建 SkillDetailPanel 基础组件

**文件：**
- 创建：`.vitepress/components/SkillDetailPanel.vue`

- [ ] **步骤 1：编写组件框架与默认态**

```vue
<template>
  <div class="skill-detail-panel">
    <transition name="fade-slide" mode="out-in">
      <div v-if="!skillId" class="default-guide" key="default">
        <div class="guide-content">
          <h3>操作介绍</h3>
          <ul>
            <li><strong>双击</strong> 高亮的可用技能节点</li>
            <li>或选中技能后点击 <u>学习</u></li>
            <li><strong>右键</strong> 点击已解锁的技能节点（前提是无后置依赖）进行退点</li>
            <li>或点击 <u>重置洞察</u> 来清空所有加点</li>
          </ul>
        </div>
      </div>
      <div v-else class="skill-info" :key="skillId">
        <!-- 后续任务完善具体的技能信息展示 -->
        <p>选中技能: {{ skillId }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  skillId: {
    type: String,
    default: null
  }
});
</script>

<style scoped>
.skill-detail-panel {
  width: 100%;
  height: 100%;
  min-height: 460px; /* 对齐左侧模拟器的基础比例高度 */
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  box-sizing: border-box;
}
.guide-content {
  color: #333;
}
.guide-content h3 {
  margin-top: 0;
  color: #5c3a21;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
```

- [ ] **步骤 2：Commit**

```bash
git add .vitepress/components/SkillDetailPanel.vue
git commit -m "feat(components): add SkillDetailPanel base component"
```

### 任务 2：重构 SkillTreeSimulator 布局与事件

**文件：**
- 修改：`.vitepress/components/SkillTreeSimulator.vue`

- [ ] **步骤 1：修改样式移除居中限制**
使用替换工具或手动修改 `<style scoped>` 中的 `.simulator-wrapper`，移除 `max-width: 950px;` 和 `margin: 0 auto;`，以适应父级 Grid 列宽。

```css
.simulator-wrapper {
  position: relative;
  width: 100%;
  /* 移除 max-width: 950px; 和 margin: 0 auto; */
  margin-bottom: 12%; 
  font-family: sans-serif;
  color: #333;
  aspect-ratio: 600 / 460; 
}
```

- [ ] **步骤 2：抛出选中事件**
在 `<script setup>` 中，通过 `defineEmits` 抛出 `select` 事件：
```javascript
// 在 defineProps 后方添加
const emit = defineEmits(['select']);

// 修改 handleNodeClick
function handleNodeClick(id) {
  selectedNodeId.value = id;
  emit('select', id);
}

// 修改 handleNodeDoubleClick
function handleNodeDoubleClick(id) {
  selectedNodeId.value = id;
  emit('select', id);
  if (canLearnDisplayNode.value) {
    learnDisplayNode();
  }
}

// 修改 resetSkills
function resetSkills() {
  unlockedSkills.value.clear();
  selectedNodeId.value = null;
  emit('select', null);
}
```

- [ ] **步骤 3：Commit**

```bash
git add .vitepress/components/SkillTreeSimulator.vue
git commit -m "refactor(skilltree): remove wrapper rigid margins and emit select event"
```

### 任务 3：构建页面双列网格布局

**文件：**
- 修改：`mechanics/skilltree.md`

- [ ] **步骤 1：重写 Markdown 页面结构**
添加 `aside: false` 并包裹布局，移除旧的纯文本操作介绍：

```markdown
---
aside: false
---
这里是《芒伊木》模组的专属技能树深度模拟器。你可以在这里自由分配技能点，预览各种加点路线的机制与效果。

<script setup>
import { ref } from 'vue'
import SkillTreeSimulator from '../.vitepress/components/SkillTreeSimulator.vue'
import SkillDetailPanel from '../.vitepress/components/SkillDetailPanel.vue'

const currentSkillId = ref(null);

const onSkillSelect = (id) => {
  currentSkillId.value = id;
}
</script>

<ClientOnly>
  <div class="skill-page-layout">
    <div class="skill-column-left">
      <SkillTreeSimulator :maxPoints="15" @select="onSkillSelect" />
    </div>
    <div class="skill-column-right">
      <SkillDetailPanel :skillId="currentSkillId" />
      
      <!-- 暂时放置到底部用于测试，后续将被整合 -->
      <MediaCard 
        src="/box_3.png" 
        caption="灵魂裂痕和灵魂震荡叠加导致的三维上限损失" 
        width="100%"
        style="margin-top: 20px;"
      />
    </div>
  </div>
</ClientOnly>

<style>
.skill-page-layout {
  display: grid;
  grid-template-columns: 6.5fr 3.5fr;
  gap: 20px;
  align-items: start;
  margin-top: 20px;
}

@media (max-width: 960px) {
  .skill-page-layout {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **步骤 2：测试构建结果**
运行本地服务，点击左侧节点，验证右侧面板是否有动画淡入。

- [ ] **步骤 3：Commit**

```bash
git add mechanics/skilltree.md
git commit -m "feat(pages): implement grid layout for skill tree page"
```
