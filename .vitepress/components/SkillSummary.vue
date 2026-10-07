<script setup>
import { useWikiLocale } from '../data/locale.js'
const { t, isEnglish } = useWikiLocale()
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { nounMap } from '../theme/components/icons.js'
import { skillPresentation, skillTitle, skillIcon, evaluateSkillLock } from '../data/skill-presentation.js'

const props = defineProps({
  node: Object, points: Number, learned: Boolean,
  canLearn: Boolean, canRefund: Boolean, learnedIds: Set,
})
const emit = defineEmits(['learn', 'refund', 'reset', 'details', 'select'])
const info = computed(() => skillPresentation(props.node?.id))
const has = id => props.learnedIds?.has(id)
const open = computed(() => props.node?.isLock && evaluateSkillLock(props.node.id, has))
const effects = computed(() => t(props.node?.desc || '').split('\n').filter(Boolean).map(line =>
  line.split(/(\[[^\]]+\])/).filter(Boolean).map(text => ({
    noun: text.startsWith('[') && text.endsWith(']'),
    text: text.startsWith('[') && text.endsWith(']') ? text.slice(1, -1) : text,
  }))
))
const guide = {
  title: '从一个技能开始',
  description: '点击树上的图标，查看效果、学习前置与觉醒条件。也可以用树上的列表按名称查找。',
  hint: '路径锁仅表示条件，不消耗洞察。点击技能树的空白处可取消选择；刷新页面会清空模拟加点。',
  steps: [
    ['学习', '双击可用节点，或点击“学习技能”。'],
    ['退点', '右键已学节点，或点击“退还此点”；需要保留后续技能的前置。'],
  ],
}

const groupLabel = group => group.skills.length === 1 ? '需要学习'
  : group.min === group.skills.length ? '需要全部学习'
  : group.min === 1 ? '以下任选一项' : '以下任选两项'
</script>

<template>
  <section class="skill-summary" aria-labelledby="skill-summary-title">
    <template v-if="node">
      <p class="skill-summary-kicker">{{ t(info.category) }} · {{ node.isLock ? t('路径条件') : info.awakening ? t('封印技能') : t('普通技能') }}</p>
      <div class="skill-summary-heading">
        <img :src="withBase(skillIcon(node.id))" alt="" width="40" height="40" />
        <h2 id="skill-summary-title">{{ t(info.title) }}</h2>
        <span class="skill-skill-cost">{{ node.isLock ? t('不耗洞察') : t('1 洞察') }}</span>
      </div>
      <nav v-if="info.levels.length > 1" class="skill-levels" :aria-label="t('技能等级')">
        <button v-for="(id, index) in info.levels" :key="id" type="button" :aria-current="id === node.id ? 'true' : undefined" @click="emit('select', id)">
          {{ [t('一级'), t('二级'), t('三级')][index] }}<span v-if="has(id)"> {{ t("· 已学") }}</span>
        </button>
      </nav>
      <p v-if="node.isLock" class="skill-lock-intro">{{ t("满足学习前置即可通向") }} <button type="button" @click="emit('select', node.connects[0])">{{ t(skillTitle(node.connects[0])) }} →</button>{{ t("。路径锁自动判定，无需单独分配洞察。") }}</p>
      <ul v-else class="skill-effects">
        <li v-for="(line, index) in effects" :key="index">
          <template v-for="(part, i) in line" :key="i">
            <DST v-if="part.noun" :term="part.text" :icon="nounMap[part.text]">{{ part.text }}</DST>
            <template v-else>{{ part.text }}</template>
          </template>
        </li>
      </ul>
      <div class="skill-requirement">
        <h3>{{ t("学习前置") }} <span v-if="!info.requirements.length">{{ t("起始技能，可直接学习") }}</span><span v-else-if="info.requirements.length > 1">{{ t("以下各组均需满足") }}</span></h3>
        <div v-for="(group, index) in info.requirements" :key="index" class="skill-requirement-group">
          <p class="skill-group-label">{{ t(groupLabel(group)) }} <span>{{ group.skills.filter(has).length }} / {{ group.min }}</span></p>
          <ul>
            <li v-for="id in group.skills" :key="id">
              <button type="button" class="skill-prerequisite" @click="emit('select', id)">
                <img :src="withBase(skillIcon(id))" alt="" />{{ t(skillTitle(id)) }}<span v-if="has(id)" class="skill-check">{{ t("已学") }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="info.awakening" class="skill-requirement">
        <h3>{{ t("觉醒条件") }}</h3>
        <p>{{ t(info.awakening) }}</p>
        <p class="skill-hint">{{ t("模拟器只检查前置与洞察。游戏开启技能觉醒时，还需完成此挑战才能生效。") }}</p>
      </div>
      <div class="skill-controls">
        <p class="skill-learning-state" role="status">{{ t("剩余") }} {{ points }} {{ t("洞察 ·") }} {{ node.isLock ? (open ? t('路径已通') : t('前置未满足')) : learned ? t('已学习') : canLearn ? t('可以学习') : points === 0 ? t('洞察不足') : t('前置未满足') }}</p>
        <div class="skill-control-buttons">
          <template v-if="!node.isLock">
            <button type="button" class="skill-primary" :disabled="!canLearn" @click="emit('learn')">{{ learned ? t('已学习') : t('学习技能') }}</button>
            <button type="button" :disabled="!canRefund" @click="emit('refund')">{{ t("退还此点") }}</button>
          </template>
          <button type="button" @click="emit('reset')">{{ t("重置洞察") }}</button>
        </div>
        <p v-if="learned && !canRefund" class="skill-hint">{{ t("后续技能仍依赖此节点，暂时无法单独退点。") }}</p>
        <button type="button" class="skill-read-more" @click="emit('details')">{{ node.isLock ? t('阅读觉醒说明') : t('阅读详细机制') }} <span aria-hidden="true">↓</span></button>
      </div>
      <details v-if="info.following.length" class="skill-next">
        <summary>{{ t("后续路径 ·") }} {{ info.following.length }}</summary>
        <div><button v-for="id in info.following" :key="id" type="button" @click="emit('select', id)">{{ t(skillTitle(id)) }} →</button></div>
      </details>
    </template>
    <template v-else>
      <p class="skill-summary-kicker">{{ t("28 个技能 · 7 个路径锁") }}</p>
      <h2 id="skill-summary-title">{{ t(guide.title) }}</h2>
      <p>{{ t(guide.description) }}</p>
      <details class="skill-next">
        <summary>{{ t("鼠标快捷操作") }}</summary>
        <ol class="skill-guide"><li v-for="[action, text] in guide.steps" :key="action"><strong>{{ t(action) }}</strong>{{ isEnglish ? ': ' : '：' }}{{ t(text) }}</li></ol>
      </details>
      <p class="skill-hint">{{ t(guide.hint) }}</p>
      <div class="skill-control-buttons"><button type="button" @click="emit('reset')">{{ t("重置洞察 · 剩余") }} {{ points }}</button></div>
    </template>
  </section>
</template>

<style scoped>
.vp-doc .skill-summary { min-width: 0; border-top: 2px solid var(--ink-stroke); padding-top: 18px; }
.vp-doc .skill-summary-kicker { margin: 0 0 12px; font-size: 12px; color: var(--ink-muted); letter-spacing: .1em; }
.vp-doc .skill-summary-heading { display: flex; align-items: center; gap: 12px; }
.vp-doc .skill-summary-heading h2 { margin: 0; padding: 0; border: 0; font-size: 26px; line-height: 1.35; }
.vp-doc .skill-summary-heading h2::before { display: none; }
.vp-doc .skill-summary-heading:lang(en) h2 { min-width: 0; overflow-wrap: anywhere; }
.vp-doc .skill-skill-cost { margin-left: auto; white-space: nowrap; color: var(--ink-muted); font-size: 13px; }
.vp-doc .skill-effects { padding-left: 20px; margin: 20px 0; }
.vp-doc .skill-effects li { margin: 8px 0; line-height: 1.8; }
.vp-doc .skill-requirement { border-top: 1px solid var(--ink-line); padding-top: 16px; margin-top: 18px; }
.vp-doc .skill-requirement h3 { margin: 0 0 10px; padding: 0; border: 0; font-size: 16px; line-height: 1.6; }
.vp-doc .skill-requirement h3 span { font-size: 13px; color: var(--ink-muted); font-weight: 400; margin-left: 8px; }
.vp-doc .skill-requirement ul { list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 8px 12px; padding: 0; margin: 0; }
.vp-doc .skill-requirement li { margin: 0; }
.vp-doc .skill-prerequisite { display: inline-flex; align-items: center; gap: 6px; color: var(--ink-link); font-size: 13px; text-align: left; line-height: 1.6; }
.vp-doc .skill-prerequisite:hover { text-decoration: underline; }
.vp-doc .skill-prerequisite img { width: 20px; height: 20px; flex-shrink: 0; }
.vp-doc .skill-requirement p { margin: 8px 0; }
.vp-doc .skill-hint { font-size: 13px; line-height: 1.7; color: var(--ink-muted); }
.vp-doc .skill-controls { margin-top: 20px; }
.vp-doc .skill-learning-state { font-size: 13px; color: var(--ink-secondary); margin: 0 0 10px; }
.vp-doc .skill-control-buttons { display: flex; flex-wrap: wrap; gap: 8px; }
.vp-doc .skill-control-buttons button { padding: 8px 12px; min-height: 44px; border: 1px solid var(--ink-line); border-radius: 3px; font-size: 14px; }
.vp-doc .skill-control-buttons .skill-primary { background: var(--ink-link); border-color: var(--ink-link); color: var(--ink-paper); }
.vp-doc .skill-control-buttons button:disabled { opacity: .45; cursor: not-allowed; }
.vp-doc .skill-control-buttons button:not(:disabled):hover { filter: brightness(.9); }
.vp-doc .skill-read-more { margin-top: 18px; color: var(--ink-link); font-size: 14px; font-weight: 600; }
.vp-doc .skill-read-more span { margin-left: 8px; }

.vp-doc .skill-summary > h2 { margin: 0 0 20px; border: 0; padding: 0; font-size: 28px; }
.vp-doc .skill-summary > h2::before { display: none; }
.vp-doc .skill-summary-heading > img { flex-shrink: 0; }
.dark .vp-doc .skill-summary-heading > img,
.dark .vp-doc .skill-prerequisite img { padding: 3px; border-radius: 4px; background: #cbbb9f; }
.vp-doc .skill-levels { display: flex; gap: 8px; margin: 18px 0; }
.vp-doc .skill-levels button { border: 1px solid var(--ink-line); padding: 5px 12px; border-radius: 3px; font-size: 13px; }
.vp-doc .skill-levels [aria-current=true] { color: var(--ink-link); border-color: var(--ink-link); background: var(--ink-surface); font-weight: 600; }
.vp-doc .skill-lock-intro button, .vp-doc .skill-next button { color: var(--ink-link); }
.vp-doc .skill-requirement-group + .skill-requirement-group { margin-top: 14px; }
.vp-doc .skill-group-label { font-size: 12px; color: var(--ink-muted); }
.vp-doc .skill-group-label span { margin-left: 8px; font-variant-numeric: tabular-nums; }
.vp-doc .skill-check { font-size: 11px; white-space: nowrap; color: var(--ink-secondary); }
.vp-doc .skill-next { border-top: 1px solid var(--ink-line); margin-top: 20px; padding-top: 12px; font-size: 13px; }
.vp-doc .skill-next summary { cursor: pointer; color: var(--ink-secondary); }
.vp-doc .skill-next > div { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-top: 12px; }
.vp-doc .skill-guide { padding-left: 20px; }
.vp-doc .skill-guide li { margin: 12px 0; }
.vp-doc .skill-summary button:focus-visible { outline: 2px solid var(--ink-link); outline-offset: 3px; }
@container wiki-content (max-width: 760px) {
  .vp-doc .skill-summary-heading h2 { font-size: 24px; }
}
</style>
