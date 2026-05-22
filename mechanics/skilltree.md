---
aside: false
pageClass: skilltree-page
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
      <SkillTreeSimulator :maxPoints="15" @select="onSkillSelect"></SkillTreeSimulator>
    </div>
    <div class="skill-column-right">
      <SkillDetailPanel :skillId="currentSkillId"></SkillDetailPanel>
    </div>
  </div>
</ClientOnly>

<style>
.skill-page-layout {
  display: grid;
  grid-template-columns: 6fr 3.2fr; /* 稍微缩小右侧比例 */
  gap: 30px; /* 增加两列之间的呼吸感 */
  align-items: start;
  margin-top: 20px;
  max-width: 92%; /* 限制整体最大宽度，避免完全贴紧浏览器右侧边缘 */
}

@media (max-width: 960px) {
  .skill-page-layout {
    grid-template-columns: 1fr;
  }
}
</style>