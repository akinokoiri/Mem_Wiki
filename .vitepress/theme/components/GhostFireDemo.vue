<script setup>
import { useWikiLocale } from '../../data/locale.js'
const { t, isEnglish } = useWikiLocale()
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { actorById, fireActors, fireMultiplier, fireStages, flightPosition, ghostFireRules, initialFireHealth, stageDuration } from '../../data/ghost-fire-demo.js'

const root = ref(null)
const stageIndex = ref(0)
const elapsed = ref(0)
const playing = ref(false)
const visible = ref(false)
const stage = computed(() => fireStages[stageIndex.value])
const multiplier = computed(() => fireMultiplier(stage.value.bounces))
const range = computed(() => ghostFireRules.range * multiplier.value)
const finished = computed(() => stage.value.kind === 'done')
const progress = computed(() => Math.min(1, elapsed.value / stageDuration(stage.value)))
const projectile = computed(() => stage.value.kind === 'flight' ? flightPosition(stage.value, progress.value) : actorById[stage.value.at || 'caster'])
const tail = computed(() => stage.value.kind === 'flight' ? flightPosition(stage.value, Math.max(0, progress.value - 0.13)) : projectile.value)
const searchPoint = computed(() => stage.value.kind === 'search' ? actorById[stage.value.at] : null)
const searchRadius = computed(() => range.value * ghostFireRules.pixelsPerUnit)
const completedFlights = computed(() => fireStages.slice(0, stageIndex.value).filter(item => item.kind === 'flight'))
const health = computed(() => {
  const result = { ...initialFireHealth }
  const hits = [...completedFlights.value]
  if (stage.value.kind === 'flight' && progress.value === 1) hits.push(stage.value)
  for (const hit of hits) {
    if (actorById[hit.to].faction === 'enemy') result[hit.to] = Math.max(0, result[hit.to] - ghostFireRules.damage)
  }
  return result
})
const defeated = computed(() => new Set(Object.keys(health.value).filter(id => health.value[id] === 0)))
const visibleActors = computed(() => fireActors.filter(actor => (actor.entersAt || 0) <= stage.value.bounces))
const entering = computed(() => stage.value.kind === 'flight' && stage.value.bounces === actorById.d.entersAt && progress.value < 1)
function actorPosition(actor) {
  return `translate(${actor.x} ${actor.id === 'd' && entering.value ? actor.entryY + (actor.y - actor.entryY) * progress.value : actor.y})`
}
const format = number => Number(number.toFixed(2)).toString()

let frame = 0
let previousTime = 0
let observer
let started = false
let reduceMotion = false

function stopFrame() {
  cancelAnimationFrame(frame)
  frame = 0
  previousTime = 0
}

function tick(now) {
  const delta = previousTime ? Math.min(64, now - previousTime) : 0
  previousTime = now
  elapsed.value += delta
  if (elapsed.value >= stageDuration(stage.value)) {
    if (stageIndex.value < fireStages.length - 1) {
      stageIndex.value++
      elapsed.value = 0
    }
    if (finished.value) {
      playing.value = false
      return
    }
  }
  frame = requestAnimationFrame(tick)
}

function play() {
  if (finished.value) {
    stageIndex.value = 1
    elapsed.value = 0
  } else if (stageIndex.value === 0) {
    stageIndex.value = 1
    elapsed.value = 0
  }
  playing.value = !playing.value
}

function next() {
  playing.value = false
  stageIndex.value = Math.min(fireStages.length - 1, stageIndex.value + 1)
  // A manual step shows the complete frame, with no movement required.
  elapsed.value = stageDuration(stage.value)
}

function replay() {
  stageIndex.value = 1
  elapsed.value = 0
  playing.value = true
}

watch([playing, visible], ([isPlaying, isVisible]) => {
  stopFrame()
  if (isPlaying && isVisible) frame = requestAnimationFrame(tick)
})

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  observer = new IntersectionObserver(([entry]) => {
    visible.value = entry.isIntersecting
    if (visible.value && !started) {
      started = true
      if (!reduceMotion) replay()
    }
  }, { threshold: 0.25 })
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  stopFrame()
})
</script>

<template>
  <section id="鬼火弹射演示" ref="root" class="ghost-fire-demo" :aria-label="t('鬼火发射与弹射演示')">
    <header class="fire-header">
      <div>
        <p class="fire-eyebrow">{{ t("一级弹射＋本源协调") }}</p>
        <p class="fire-title">{{ t("友军接力，够到远处敌人") }}</p>
      </div>
      <div class="fire-controls">
        <button type="button" class="fire-play" @click="play">{{ playing ? t('暂停演示') : finished ? t('再次播放') : t('播放演示') }}</button>
        <button type="button" :disabled="finished" @click="next">{{ t("下一步") }}</button>
        <button type="button" @click="replay">{{ t("重播") }}</button>
      </div>
    </header>

    <svg class="fire-scene" viewBox="0 0 640 440" role="img" :aria-label="t('鬼火在友军 A、B 之间往返，扩大索敌范围后攻击敌人 C；D 入场后，鬼火优先在 C、D 两个敌人之间弹射，完成十次额外弹射。')">
      <rect x="1" y="1" width="638" height="438" rx="10" class="scene-ground" />
      <text x="24" y="36" class="scene-rule">{{ t("敌人优先 · 无敌人时借友军跳板") }}</text>
      <text v-if="stage.bounces < actorById.d.entersAt" x="24" y="414" class="entry-label">{{ t("D 尚未入场") }}</text>
      <g v-if="searchPoint">
        <circle v-if="stage.bounces > 0" :cx="searchPoint.x" :cy="searchPoint.y" :r="ghostFireRules.range * ghostFireRules.pixelsPerUnit" class="original-range" />
        <circle :cx="searchPoint.x" :cy="searchPoint.y" :r="searchRadius" class="search-range" />
        <text :x="searchPoint.x" :y="Math.max(64, searchPoint.y - range * ghostFireRules.pixelsPerUnit + 28)" text-anchor="middle" class="range-label">{{ t("索敌") }} {{ format(range) }}</text>
        <line v-if="stage.next" :x1="searchPoint.x" :y1="searchPoint.y" :x2="actorById[stage.next].x" :y2="actorById[stage.next].y" class="selected-route" />
      </g>
      <line v-for="(flight, index) in completedFlights" :key="index" :x1="actorById[flight.from].x" :y1="actorById[flight.from].y" :x2="actorById[flight.to].x" :y2="actorById[flight.to].y" class="travelled-route" />
      <line v-if="stage.kind === 'flight'" :x1="actorById[stage.from].x" :y1="actorById[stage.from].y" :x2="projectile.x" :y2="projectile.y" class="active-route" />

      <g v-for="actor in visibleActors" :key="actor.id" :data-actor="actor.id" :transform="actorPosition(actor)" class="fire-actor" :class="{ 'actor-ally': actor.faction === 'ally', 'actor-enemy': actor.faction === 'enemy', 'actor-defeated': defeated.has(actor.id), 'actor-selected': stage.next === actor.id || stage.kind === 'flight' && stage.to === actor.id }">
        <template v-if="actor.id === 'caster'">
          <circle cy="-13" r="12" class="caster-head" />
          <path d="M-20 23 Q-21 0 0 0 Q21 0 20 23 Z" class="caster-body" />
          <text y="52" text-anchor="middle" class="caster-label">{{ t("芒伊木") }}</text>
        </template>
        <template v-else>
          <circle r="22" class="actor-disc" />
          <text y="10" text-anchor="middle" class="actor-letter">{{ t(actor.label) }}</text>
          <path v-if="defeated.has(actor.id)" d="M-14 -14 L14 14 M14 -14 L-14 14" class="defeated-mark" />
          <text :y="actor.id === 'c' ? -36 : 44" text-anchor="middle" class="actor-label">{{ actor.faction === 'ally' ? t('友军') : actor.id === 'd' && entering ? t('入场中') : defeated.has(actor.id) ? t('已击败') : `${t('敌人')} · ${health[actor.id]}${isEnglish ? ' health' : '血'}` }}</text>
        </template>
      </g>

      <g v-if="stage.kind === 'flight' || stage.kind === 'search'" class="ghost-projectile">
        <line v-if="stage.kind === 'flight'" :x1="tail.x" :y1="tail.y" :x2="projectile.x" :y2="projectile.y" class="fire-tail" />
        <circle :cx="projectile.x" :cy="projectile.y" r="15" class="fire-halo" />
        <circle :cx="projectile.x" :cy="projectile.y" r="9" class="fire-ball" />
      </g>
    </svg>

    <div class="fire-metrics">
      <div><span>{{ t("飞行速度") }}</span><strong>×{{ format(multiplier) }}</strong><small>{{ format(ghostFireRules.speed * multiplier) }} {{ t("/ 基准 7") }}</small></div>
      <div><span>{{ stage.kind === 'search' ? t('本次索敌范围') : t('下一次索敌范围') }}</span><strong>{{ format(range) }}</strong><small>{{ t("基准 10 · +") }}{{ stage.bounces * 10 }}%</small></div>
      <div><span>{{ t("已弹射") }}</span><strong>{{ stage.bounces }} <small>/ {{ ghostFireRules.bounces }}</small></strong><small>{{ t("剩余") }} {{ ghostFireRules.bounces - stage.bounces }} {{ t("次") }}</small></div>
    </div>

    <div class="fire-caption" role="status" aria-live="polite" aria-atomic="true">
      <strong>{{ t(stage.title) }}</strong>
      <p>{{ t(stage.description) }}</p>
    </div>
    <div class="fire-footer">
      <span class="fire-legend"><i></i> {{ t("本轮范围") }} <i class="legend-original"></i> {{ t("原始范围") }}</span>
    </div>
    <p class="fire-note">{{ t("本例 C 为 40 血、D 为 30 血，每次命中敌人造成 10 伤害，友军不受伤。距离按比例绘制；飞行放慢，索敌时停顿便于阅读。发起者本人不参与回跳。") }}</p>
  </section>
</template>

<style scoped>
.ghost-fire-demo { max-width: 560px; margin: 24px auto; padding: 18px 16px 14px; border: 1px solid var(--ink-line); border-radius: 12px; background: var(--ink-surface); color: var(--ink-text); font-variant-numeric: tabular-nums; }
.ghost-fire-demo p { margin: 0; }
.fire-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px 12px; }
.fire-controls { display: flex; gap: 6px; }
.ghost-fire-demo .fire-eyebrow { color: var(--ink-muted); font-size: 11px; line-height: 1.5; }
.ghost-fire-demo .fire-title { margin-top: 3px; font-size: 17px; font-weight: 650; line-height: 1.5; }
.ghost-fire-demo button { padding: 6px 10px; border: 1px solid var(--ink-line); border-radius: 5px; background: var(--ink-paper); color: var(--ink-secondary); font: inherit; font-size: 12px; white-space: nowrap; cursor: pointer; }
.ghost-fire-demo button:hover:enabled { border-color: var(--ink-link); color: var(--ink-link); }
.ghost-fire-demo .fire-play { color: var(--ink-link); }
.ghost-fire-demo button:disabled { opacity: .45; cursor: default; }
.fire-scene { display: block; width: 100%; height: auto; margin: 14px 0 12px; overflow: hidden; }
.scene-ground { fill: var(--ink-paper); stroke: var(--ink-line); }
.scene-rule, .entry-label { fill: var(--ink-muted); font-size: 21px; }
.original-range { fill: none; stroke: var(--ink-muted); stroke-width: 2; stroke-dasharray: 4 6; opacity: .5; }
.search-range { fill: color-mix(in srgb, var(--ink-link) 9%, transparent); stroke: var(--ink-link); stroke-width: 2.5; }
.range-label { fill: var(--ink-link); font-size: 24px; font-weight: 600; }
.selected-route { stroke: var(--ink-link); stroke-width: 2.5; stroke-dasharray: 7 7; }
.travelled-route { stroke: var(--ink-muted); stroke-width: 2; stroke-dasharray: 3 7; opacity: .45; }
.active-route { stroke: var(--ink-link); stroke-width: 3; opacity: .6; }
.caster-head, .caster-body { fill: var(--ink-secondary); }
.caster-label { fill: var(--ink-secondary); font-size: 23px; }
.actor-disc { fill: var(--ink-soft); stroke: var(--ink-secondary); stroke-width: 2; }
.actor-ally .actor-disc { fill: color-mix(in srgb, #568ba8 12%, var(--ink-paper)); stroke: #568ba8; }
.actor-enemy .actor-disc { fill: color-mix(in srgb, #b47951 12%, var(--ink-paper)); stroke: #b47951; }
.actor-letter { fill: var(--ink-text); font-size: 28px; font-weight: 650; }
.actor-label { fill: var(--ink-secondary); font-size: 21px; }
.actor-selected .actor-disc { stroke: var(--ink-link); stroke-width: 4; }
.actor-defeated { opacity: .38; }
.defeated-mark { stroke: var(--ink-secondary); stroke-width: 2; }
.ghost-projectile { filter: drop-shadow(0 0 5px #39be9b); pointer-events: none; }
.fire-tail { stroke: #61d3b5; stroke-width: 6; stroke-linecap: round; opacity: .65; }
.fire-halo { fill: #61d3b5; opacity: .2; }
.fire-ball { fill: #36b98f; stroke: #d5fff1; stroke-width: 2.5; }
.fire-metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; padding: 8px 0; border-block: 1px solid var(--ink-line); text-align: center; }
.fire-metrics > div { display: flex; flex-direction: column; gap: 4px; }
.fire-metrics span { color: var(--ink-secondary); font-size: 11px; }
.fire-metrics strong { color: var(--ink-link); font-size: 21px; font-weight: 650; line-height: 1.3; }
.fire-metrics small { color: var(--ink-muted); font-size: 10px; line-height: 1.5; }
.fire-metrics strong small { font-size: 12px; }
.fire-caption { min-height: 82px; margin-top: 12px; padding: 12px; border-radius: 6px; background: var(--ink-soft); font-size: 12px; line-height: 1.8; }
.fire-caption > strong { color: var(--ink-text); font-weight: 600; }
.ghost-fire-demo .fire-caption p { margin-top: 4px; color: var(--ink-secondary); font-size: 12px; line-height: 1.8; }
.fire-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.fire-legend { display: flex; align-items: center; gap: 5px; color: var(--ink-muted); font-size: 10px; }
.fire-legend i { width: 14px; height: 14px; border: 1px solid var(--ink-link); border-radius: 50%; }
.fire-legend .legend-original { border: 1px dashed var(--ink-muted); margin-left: 6px; }
.ghost-fire-demo .fire-note { margin-top: 10px; color: var(--ink-muted); font-size: 10px; line-height: 1.8; }
@container ghost-fire-visual (max-width: 380px) {
  .ghost-fire-demo { padding: 16px 10px 12px; }
  .ghost-fire-demo .fire-title { font-size: 15px; }
  .fire-metrics { gap: 4px; }
  .fire-metrics strong { font-size: 19px; }
  .fire-caption { min-height: 108px; }
}
</style>
