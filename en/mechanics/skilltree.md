---
aside: false
pageClass: ink-archive skilltree-page
---
# Skill Tree {#技能树}

This is the dedicated in-depth skill-tree simulator for the Mangem mod. Allocate skill points freely and preview the mechanics and effects of different builds.

The page lets you simulate learning sealed skills: you can allocate points as long as the prerequisites are met and enough Insight remains. **It does not check awakening progress in your world.** The 7 path locks on the tree represent prerequisites and do not cost skill points themselves; whether a skill takes effect in the game still depends on its awakening conditions or the relevant settings.

<details class="skill-awakening-guide">
<summary>Sealed Skills & Awakening Rules</summary>

> [!WARNING]Sealed<DSTIcon icon="mod"/>
> [#技能觉醒]Some skills in Mangem's skill tree are marked `【Sealed】`.
> - Learning these skills alone has no effect. You must **meet specific conditions** to activate learned **[封印技能]** (*adjustable in settings*).
> - Inspect the **lock** before a skill to see whether it is a **sealed skill**.
> - When **[技能觉醒]** is disabled in settings, the `lock` no longer shows `【Sealed】`. Learning these skills makes them take effect immediately.
> - In the game, press `/` and enter `mem` to check progress for skills **you have learned but not yet awakened**.
> - You can also enter `/mem skill name or pinyin initials` to check progress for a **specific skill**.
> - For example, enter `/mem 彼世的光芒` or `/mem bsdgm` to check its current unlocking progress (**Courage**).
> - Progress is preserved after changing characters at the `Celestial Portal` or resetting skill points.

</details>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import SkillTreeSimulator from '../../.vitepress/components/SkillTreeSimulator.vue'
import SkillDetailPanel from '../../.vitepress/components/SkillDetailPanel.vue'
import SkillSummary from '../../.vitepress/components/SkillSummary.vue'
import { SKILL_NODES } from '../../.vitepress/data/skilltree.js'
import { skillTitle } from '../../.vitepress/data/skill-presentation.js'
import { resolveSkillLocation } from '../../.vitepress/data/skill-links.js'
import { useWikiLocale } from '../../.vitepress/data/locale.js'

const { t } = useWikiLocale()

const currentSkillId = ref(null)
const simulatorRef = ref(null)
const overviewRef = ref(null)
const detailsRef = ref(null)
const sections = ref([])
const detailTitle = computed(() => t(skillTitle(currentSkillId.value)))
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
          <label for="skill-picker">Find by name</label>
          <select id="skill-picker" :value="currentSkillId || ''" @change="simulatorRef.selectNode($event.target.value)">
            <option value="" disabled>Choose a skill or path lock</option>
            <optgroup label="Skills"><option v-for="node in skills" :key="node.id" :value="node.id">{{ t(node.title) }}</option></optgroup>
            <optgroup label="Path Locks"><option v-for="node in locks" :key="node.id" :value="node.id">{{ t(skillTitle(node.id)) }}</option></optgroup>
          </select>
        </div>
      </template>
      <template #summary="selection">
        <SkillSummary :node="selection.node" :points="selection.points" :learned="selection.learned" :learned-ids="selection.learnedIds" :can-learn="selection.canLearn" :can-refund="selection.canRefund" @learn="selection.learn" @refund="selection.refund" @reset="selection.reset" @details="showDetails" @select="selectSkill" />
      </template>
    </SkillTreeSimulator>
    <section v-if="currentSkillId" class="skill-details" ref="detailsRef" tabindex="-1" :aria-labelledby="detailTitleId">
      <div class="skill-detail-heading">
        <h2 :id="detailTitleId">{{ detailTitle }}: {{ SKILL_NODES[currentSkillId].isLock ? 'Awakening Guide' : 'Detailed Mechanics' }}</h2>
        <button type="button" @click="moveTo(overviewRef)">Back to Skill Tree ↑</button>
      </div>
        <nav v-if="sections.length" class="skill-section-index" :aria-label="detailTitle + ' detailed mechanics contents'">
          <span>Detailed Mechanics</span>
          <button v-for="section in sections" :key="section.id" type="button" @click="jumpToSection(section.id)">{{ section.title }} ↓</button>
        </nav>
      <SkillDetailPanel :skillId="currentSkillId" @loaded="onDetailLoaded" />
      <button type="button" class="skill-return" @click="moveTo(overviewRef)">Back to Skill Tree ↑</button>
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
