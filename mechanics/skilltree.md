---
aside: false
pageClass: wide-page
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
      <!-- 暂时放置到底部用于测试 -->
      <MediaCard 
        src="/box_3.png" 
        caption="灵魂裂痕和灵魂震荡叠加导致的三维上限损失" 
        width="100%"
        style="margin-top: 20px;"
      ></MediaCard>
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