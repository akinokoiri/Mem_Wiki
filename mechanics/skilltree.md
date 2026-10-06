---
aside: false
pageClass: ink-archive skilltree-page
---
# 技能树

这里是《芒伊木》模组的专属技能树深度模拟器。你可以在这里自由分配技能点，预览各种加点路线的机制与效果。

网页允许模拟学习封印技能：满足技能前置且剩余洞察足够即可分配，**不检查存档里的觉醒进度**。树上的 7 个路径锁只表示前置条件，不单独消耗技能点；游戏中技能是否生效仍取决于觉醒条件或相关设置。

<details class="skill-awakening-guide">
<summary>封印技能与觉醒规则</summary>

> [!WARNING]封印<DSTIcon icon="mod"/>
> [#技能觉醒]芒伊木的技能树中，有部分`【封印】`技能。
> - 这部分技能即使学习了也没有效果，需要 **达成特定条件** 才能激活已学习的 **[封印技能]**（*可在设置中调整*）。
> - 可以通过检查技能前面的 **锁**，来检查该技能是否为 **封印技能**。
> - 当在设置关闭 **[技能觉醒]** 机制后，`锁`不会提示 `【封印】`。学习这些技能会立刻生效。
> - 可以在游戏中按`/`键输入`mem`来检查 **当前已学习但还未解锁** 的技能的进度。
> - 也可以输入`/mem 技能名或拼音缩写`来检查 **指定技能** 当前的进度。
> - 例如输入`/mem 彼世的光芒`或`/mem bsdgm`来查询当前的解锁进度（**胆识**）。
> - 进度在`天体传送门`换人或重置技能点后依然保留。

</details>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import SkillTreeSimulator from '../.vitepress/components/SkillTreeSimulator.vue'
import SkillDetailPanel from '../.vitepress/components/SkillDetailPanel.vue'
import SkillSummary from '../.vitepress/components/SkillSummary.vue'
import { SKILL_NODES } from '../.vitepress/data/skilltree.js'
import { skillTitle } from '../.vitepress/data/skill-presentation.js'
import { resolveSkillLocation } from '../.vitepress/data/skill-links.js'

const currentSkillId = ref(null)
const simulatorRef = ref(null)
const overviewRef = ref(null)
const detailsRef = ref(null)
const sections = ref([])
const detailTitle = computed(() => skillTitle(currentSkillId.value))
const detailTitleId = computed(() => `${currentSkillId.value}--details`)
const skills = Object.values(SKILL_NODES).filter(node => !node.isLock)
const locks = Object.values(SKILL_NODES).filter(node => node.isLock)
let syncingHash = false

const moveTo = element => {
  element?.scrollIntoView({ behavior: 'auto', block: 'start' })
  element?.focus({ preventScroll: true })
}
const scrollToDetailHash = () => {
  const location = resolveSkillLocation(window.location.hash)
  if (location?.anchor && location.id === currentSkillId.value) {
    document.getElementById(location.anchor)?.scrollIntoView({ block: 'start' })
  }
}
const onDetailLoaded = () => {
  const root = detailsRef.value
  if (!root) return
  const replacements = new Map()
  root.querySelectorAll('.skill-detail-panel :is(h2, h3, h4, h5, h6)[id]').forEach(heading => {
    const old = heading.id
    const id = `${currentSkillId.value}--${old}`
    replacements.set(old, id)
    heading.id = id
  })
  root.querySelectorAll('a[href^="#"]').forEach(link => {
    let old
    try { old = decodeURIComponent(link.getAttribute('href').slice(1)) } catch { return }
    if (replacements.has(old)) link.setAttribute('href', `#${replacements.get(old)}`)
  })
  root.querySelectorAll('[aria-labelledby]').forEach(element => {
    element.setAttribute('aria-labelledby', element.getAttribute('aria-labelledby').split(' ').map(id => replacements.get(id) || id).join(' '))
  })
  sections.value = [...root.querySelectorAll('.skill-detail-panel h3[id]')].map(heading => ({
    id: heading.id, title: heading.textContent.replace(/\u200b/g, '').trim(),
  }))
  scrollToDetailHash()
}
const jumpToSection = id => {
  window.history.replaceState(null, '', `#${id}`)
  document.getElementById(id)?.scrollIntoView({ block: 'start' })
}
const showDetails = () => jumpToSection(detailTitleId.value)
const onSkillSelect = id => {
  if (id !== currentSkillId.value) sections.value = []
  currentSkillId.value = id
  if (!syncingHash) window.history.replaceState(null, '', id ? `#${id}` : window.location.pathname + window.location.search)
}
const selectSkill = id => {
  simulatorRef.value?.selectNode(id)
  moveTo(overviewRef.value)
}
const syncHash = () => {
  const location = resolveSkillLocation(window.location.hash)
  syncingHash = true
  if (location) simulatorRef.value?.selectNode(location.id)
  else if (!window.location.hash) simulatorRef.value?.resetSelection()
  syncingHash = false
  if (location?.anchor) nextTick(scrollToDetailHash)
  else if (location) nextTick(() => moveTo(overviewRef.value))
}
onMounted(() => {
  nextTick(syncHash)
  window.addEventListener('hashchange', syncHash)
})
onUnmounted(() => window.removeEventListener('hashchange', syncHash))
</script>

<ClientOnly>
  <div class="skill-page-layout" ref="overviewRef" tabindex="-1">
    <SkillTreeSimulator ref="simulatorRef" :maxPoints="15" @select="onSkillSelect">
      <template #tree-header>
        <div class="skill-picker">
          <label for="skill-picker">按名称查找</label>
          <select id="skill-picker" :value="currentSkillId || ''" @change="simulatorRef.selectNode($event.target.value)">
            <option value="" disabled>选择技能或路径锁</option>
            <optgroup label="技能"><option v-for="node in skills" :key="node.id" :value="node.id">{{ node.title }}</option></optgroup>
            <optgroup label="路径锁"><option v-for="node in locks" :key="node.id" :value="node.id">{{ skillTitle(node.id) }}</option></optgroup>
          </select>
        </div>
      </template>
      <template #summary="selection">
        <SkillSummary :node="selection.node" :points="selection.points" :learned="selection.learned" :learned-ids="selection.learnedIds" :can-learn="selection.canLearn" :can-refund="selection.canRefund" @learn="selection.learn" @refund="selection.refund" @reset="selection.reset" @details="showDetails" @select="selectSkill" />
      </template>
    </SkillTreeSimulator>
    <section v-if="currentSkillId" class="skill-details" ref="detailsRef" tabindex="-1" :aria-labelledby="detailTitleId">
      <div class="skill-detail-heading">
        <h2 :id="detailTitleId">{{ detailTitle }}：{{ SKILL_NODES[currentSkillId].isLock ? '觉醒说明' : '详细机制' }}</h2>
        <button type="button" @click="moveTo(overviewRef)">返回技能树 ↑</button>
      </div>
        <nav v-if="sections.length" class="skill-section-index" :aria-label="detailTitle + '详细机制目录'">
          <span>详细机制</span>
          <button v-for="section in sections" :key="section.id" type="button" @click="jumpToSection(section.id)">{{ section.title }} ↓</button>
        </nav>
      <SkillDetailPanel :skillId="currentSkillId" @loaded="onDetailLoaded" />
      <button type="button" class="skill-return" @click="moveTo(overviewRef)">返回技能树 ↑</button>
    </section>
  </div>
</ClientOnly>

<style>
.skill-page-layout { display: grid; grid-template-columns: minmax(0, 1fr); gap: 40px; align-items: start; margin-top: 20px; width: 100%; }
.skill-awakening-guide { margin: 20px 0 32px; border-block: 1px solid var(--ink-line); padding: 12px 0; }
.skill-awakening-guide > summary { cursor: pointer; color: var(--ink-secondary); font-size: 14px; font-weight: 600; }
.skill-page-layout, .skill-details, .skill-details :is(h2, h3, h4, h5) { scroll-margin-top: 84px; }
.skill-page-layout:focus-visible, .skill-details:focus-visible { outline: none; }
.skill-details { min-width: 0; border-top: 2px solid var(--ink-stroke); }
.skill-detail-heading { display: flex; align-items: baseline; flex-wrap: wrap; justify-content: space-between; gap: 12px; margin: 24px 0; }
.ink-archive .vp-doc .skill-detail-heading h2 { margin: 0; padding: 0; border: 0; font-size: 30px; }
.ink-archive .vp-doc .skill-detail-heading h2::before { display: none; }
.skill-detail-heading button, .skill-return { color: var(--ink-link); font-size: 14px; }
.skill-details .rich-text { margin-top: 0; }
.ink-archive .vp-doc .skill-details h3 { font-size: 24px; margin: 36px 0 16px; }
.ink-archive .vp-doc .skill-details h4 { font-size: 20px; margin: 24px 0 12px; }
.ink-archive .vp-doc .skill-details :is(th, td) { white-space: normal; vertical-align: top; }
.ink-archive .vp-doc .skill-details table { table-layout: fixed; }
.ink-archive .vp-doc .skill-details .archive-table :is(th, td):first-child { width: 16%; }
.skill-section-index { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; border-top: 1px solid var(--ink-line); padding-block: 16px; margin-bottom: 24px; }
.skill-section-index > span { grid-column: 1 / -1; color: var(--ink-muted); font-size: 13px; }
.skill-section-index > button { text-align: left; font-size: 14px; color: var(--ink-link); padding-block: 4px; }
.skill-section-index > button:hover { text-decoration: underline; }
.skill-return { margin-top: 28px; }
.ink-archive .vp-doc .skill-probability-table :is(th, td) { padding-inline: 8px; }
.ink-archive .vp-doc .skill-probability-table :is(th, td):not(:first-child) { white-space: nowrap; }
.skill-picker { display: grid; gap: 8px; margin-bottom: 18px; font-size: 14px; }
.skill-picker label { color: var(--ink-muted); }
.skill-picker select { width: 100%; min-width: 0; border: 1px solid var(--ink-line); background: var(--ink-paper); color: var(--ink-text); border-radius: 3px; padding: 10px 12px; min-height: 44px; font: inherit; }
.skill-page-layout :is(button, select):focus-visible { outline: 2px solid var(--ink-link); outline-offset: 3px; }
@container wiki-content (max-width: 760px) {
  .ink-archive .vp-doc .skill-detail-heading h2 { font-size: 26px; }
  .skill-page-layout { gap: 28px; }
}
</style>
