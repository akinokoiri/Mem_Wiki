---
aside: false
pageClass: skilltree-page
---
这里是《芒伊木》模组的专属技能树深度模拟器。你可以在这里自由分配技能点，预览各种加点路线的机制与效果。

> [!WARNING]封印<DSTIcon icon="mod"/>
> [#技能觉醒]芒伊木的技能树中，有部分`【封印】`技能。
> - 这部分技能即使学习了也没有效果，需要 **达成特定条件** 才能激活已学习的 **[封印技能]**（*可在设置中调整*）。
> - 可以通过检查技能前面的 **锁**，来检查该技能是否为 **封印技能**。
> - 当在设置关闭 **[技能觉醒]** 机制后，`锁`不会提示 `【封印】`。学习这些技能会立刻生效。
> - 可以在游戏中按`/`键输入`mem`来检查 **当前已学习但还未解锁** 的技能的进度。
> - 也可以输入`/mem 技能名或拼音缩写`来检查 **指定技能** 当前的进度。
> - 例如输入`/mem 彼世的光芒`或`/mem bsdgm`来查询当前的解锁进度（**胆识**）。
> - 进度在`天体传送门`换人或重置技能点后依然保留。

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import SkillTreeSimulator from '../.vitepress/components/SkillTreeSimulator.vue'
import SkillDetailPanel from '../.vitepress/components/SkillDetailPanel.vue'

const currentSkillId = ref(null);
const simulatorRef = ref(null);

const onSkillSelect = (id) => {
  currentSkillId.value = id;
  if (typeof window !== 'undefined') {
    if (id) {
      window.history.replaceState(null, '', `#${id}`);
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }
}

const syncHash = () => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#')) {
      const id = hash.slice(1).replace(/^def-/, '');
      if (simulatorRef.value) {
        simulatorRef.value.selectNode(id);
      } else {
        nextTick(() => {
          if (simulatorRef.value) simulatorRef.value.selectNode(id);
        });
      }
    }
  }
};

onMounted(() => {
  syncHash();
  window.addEventListener('hashchange', syncHash);
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('hashchange', syncHash);
  }
});
</script>

<ClientOnly>
  <div class="skill-page-layout">
    <div class="skill-column-left">
      <SkillTreeSimulator ref="simulatorRef" :maxPoints="15" @select="onSkillSelect"></SkillTreeSimulator>
    </div>
    <div class="skill-column-right">
      <SkillDetailPanel :skillId="currentSkillId"></SkillDetailPanel>
    </div>
  </div>
</ClientOnly>

<style>
.skill-page-layout {
  display: grid;
  grid-template-columns: 6fr 3.6fr; /* 稍微扩大右侧比例 */
  gap: 30px; /* 增加两列之间的呼吸感 */
  align-items: start;
  margin-top: 20px;
  max-width: 95%; /* 放宽右侧边界限制 */
}

.skill-column-right {
  position: sticky;
  top: 100px; /* 避开 VitePress 顶部导航栏，实现平滑吸顶悬浮 */
  align-self: start;
}

@media (max-width: 960px) {
  .skill-page-layout {
    grid-template-columns: 1fr;
  }
}
</style>