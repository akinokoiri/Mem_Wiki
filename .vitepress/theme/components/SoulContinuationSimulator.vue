<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { berserkMultiplier, damageAfterReduction, damagePresets, initialResources, simulateAttack } from '../../data/soul-continuation.js'

const resources = ref({ ...initialResources })
const lastHit = ref(null)
const hitCount = ref(0)
const feedbackKey = ref(0)
const applyBerserk = ref(true)
const numbLevel = ref(0)
const attackOptions = ref({ customDamage: 100, reductionPercent: 0 })
const stats = [
  { id: 'soul', label: '灵魂值', max: 150, colour: '#689ca7' },
  { id: 'sanity', label: '理智值', max: 200, colour: '#e87b0f' },
  { id: 'health', label: '生命值', max: 75, colour: '#ae1515' }
]
const isDead = computed(() => resources.value.health <= 0)
const sanityPercent = computed(() => resources.value.sanity / initialResources.sanity * 100)
const currentMultiplier = computed(() => applyBerserk.value ? berserkMultiplier(resources.value.sanity, numbLevel.value) : 1)
const asset = name => withBase(`/ui/soul-continuation/${name}.webp`)
const display = value => value > 0 && value < 0.01 ? '<0.01' : Number(value.toFixed(2)).toString()
const inputDisplay = value => Number(value.toFixed(value > 0 && value < 0.01 ? 6 : 2))
const displayMultiplier = value => Number(value.toFixed(3)).toString()
const actualDamage = baseDamage => damageAfterReduction(baseDamage, attackOptions.value.reductionPercent) * currentMultiplier.value
const lost = stat => lastHit.value?.[`${stat}Lost`] || 0
const liquidCut = stat => {
  // Exported liquid alpha bounds are y=43..149 on a shared 192px canvas.
  const percent = resources.value[stat.id] / stat.max
  return `${(149 - 106 * percent) / 192 * 100}%`
}

function setResource(stat, event) {
  // Blur also commits edits made without a native change event. Merely focusing
  // an unchanged rounded value must not round the simulation's internal state.
  if (event.type === 'blur' && event.target.value === String(inputDisplay(resources.value[stat.id]))) return
  const value = event.target.valueAsNumber
  if (!Number.isFinite(value)) {
    event.target.value = inputDisplay(resources.value[stat.id])
    return
  }
  const next = Math.max(0, Math.min(stat.max, value))
  resources.value = { ...resources.value, [stat.id]: next }
  event.target.value = next
  clearFeedback()
}

function clearFeedback() {
  lastHit.value = null
  hitCount.value = 0
  feedbackKey.value++
}

function setAttackOption(key, event) {
  if (event.type === 'blur' && event.target.value === String(attackOptions.value[key])) return
  const value = event.target.valueAsNumber
  if (!Number.isFinite(value)) {
    event.target.value = attackOptions.value[key]
    return
  }
  const max = key === 'reductionPercent' ? 100 : Number.MAX_SAFE_INTEGER
  const next = Math.max(0, Math.min(max, value))
  attackOptions.value = { ...attackOptions.value, [key]: next }
  event.target.value = next
  clearFeedback()
}

function hit(preset) {
  if (isDead.value) return
  const result = simulateAttack(resources.value, preset.damage, {
    applyBerserk: applyBerserk.value,
    numbLevel: numbLevel.value,
    reductionPercent: attackOptions.value.reductionPercent
  })
  lastHit.value = { ...result, attacker: preset.label }
  resources.value = result.after
  hitCount.value++
  feedbackKey.value++
}

function reset() {
  resources.value = { ...initialResources }
  clearFeedback()
}
</script>

<template>
  <section id="灵魂续行演示" class="soul-simulator" aria-label="灵魂续行受伤演示">
    <header class="sim-header">
      <div>
        <p class="sim-eyebrow">点一下，承受一次伤害</p>
        <p class="sim-title">灵魂续行 · 受伤演示</p>
      </div>
      <button type="button" class="reset-button" title="恢复三项资源，保留伤害与减伤设置" @click="reset">重置</button>
    </header>

    <div class="sim-resources">
      <div v-for="stat in stats" :key="stat.id" class="stat-control" :style="{ '--stat-colour': stat.colour }">
        <div class="badge" aria-hidden="true">
          <img class="badge-layer" :src="asset('backing')" alt="" width="192" height="192" />
          <img class="badge-layer badge-liquid" :src="asset(`${stat.id}-fill`)" :style="{ clipPath: `inset(${liquidCut(stat)} 0 0 0)` }" alt="" width="192" height="192" />
          <img class="badge-layer" :src="asset('frame')" alt="" width="192" height="192" />
          <img class="badge-layer" :src="asset(`${stat.id}-icon`)" alt="" width="192" height="192" />
          <span v-if="lost(stat.id) > 0" :key="feedbackKey" class="badge-loss">−{{ display(lost(stat.id)) }}</span>
        </div>
        <label class="stat-label" :for="`continuation-${stat.id}`">{{ stat.label }}</label>
        <div class="stat-amount">
          <input :id="`continuation-${stat.id}`" type="number" inputmode="decimal" :value="inputDisplay(resources[stat.id])" min="0" :max="stat.max" step="any" @change="setResource(stat, $event)" @blur="setResource(stat, $event)" @keydown.enter="setResource(stat, $event)" />
          <span>/ {{ stat.max }}</span>
        </div>
        <input class="stat-slider" type="range" :aria-label="`调整${stat.label}`" :value="resources[stat.id]" min="0" :max="stat.max" step="0.1" @input="setResource(stat, $event)" />
      </div>
    </div>

    <div class="sim-conditions">
      <label class="condition-switch">
        <input v-model="applyBerserk" type="checkbox" role="switch" @change="clearFeedback" />
        计入怨灵承伤倍率
      </label>
      <label class="skill-option">
        逐渐麻木
        <select v-model.number="numbLevel" aria-label="逐渐麻木等级" :disabled="!applyBerserk" @change="clearFeedback">
          <option :value="0">未学习</option>
          <option :value="1">一级</option>
          <option :value="2">二级</option>
          <option :value="3">三级</option>
        </select>
      </label>
    </div>
    <div class="reduction-control">
      <label for="continuation-reduction">减伤率</label>
      <div class="option-amount">
        <input id="continuation-reduction" type="number" inputmode="decimal" :value="attackOptions.reductionPercent" min="0" max="100" step="any" @change="setAttackOption('reductionPercent', $event)" @blur="setAttackOption('reductionPercent', $event)" @keydown.enter="setAttackOption('reductionPercent', $event)" />
        <span>%</span>
      </div>
      <input type="range" aria-label="调整减伤率" :value="attackOptions.reductionPercent" min="0" max="100" step="0.1" @input="setAttackOption('reductionPercent', $event)" />
      <small>多件普通护甲取最高减伤率，不相加。</small>
    </div>
    <p class="multiplier-readout" aria-live="polite">下一击：理智 {{ display(sanityPercent) }}% · 承伤 <strong>×{{ displayMultiplier(currentMultiplier) }}</strong><span v-if="!applyBerserk">（未计入易伤）</span> · 减伤 {{ display(attackOptions.reductionPercent) }}%</p>

    <div class="sim-attacks" role="group" aria-label="伤害预设">
      <button v-for="preset in damagePresets" :key="preset.id" type="button" class="attack-button" :disabled="isDead" @click="hit(preset)">
        <span class="attacker-name">{{ preset.label }}</span>
        <span class="attacker-damage">{{ display(actualDamage(preset.damage)) }} <small>点伤害</small></span>
        <small class="attack-base">基础 {{ preset.damage }}</small>
      </button>
    </div>

    <div class="custom-attack">
      <label for="continuation-custom-damage">自定义基础伤害</label>
      <div class="option-amount">
        <input id="continuation-custom-damage" type="number" inputmode="decimal" :value="attackOptions.customDamage" min="0" :max="Number.MAX_SAFE_INTEGER" step="any" @change="setAttackOption('customDamage', $event)" @blur="setAttackOption('customDamage', $event)" @keydown.enter="setAttackOption('customDamage', $event)" />
        <span>点</span>
      </div>
      <button type="button" class="attack-button custom-hit-button" :disabled="isDead" @click="hit({ label: '自定义', damage: attackOptions.customDamage })">
        <span class="attacker-name">受伤一次</span>
        <span class="attacker-damage">{{ display(actualDamage(attackOptions.customDamage)) }} <small>点伤害</small></span>
      </button>
    </div>

    <div class="sim-result" role="status" aria-live="polite" aria-atomic="true" :class="{ 'result-dead': isDead }">
      <template v-if="lastHit">
        <div class="result-heading">
          <span>第 {{ hitCount }} 次受击 · {{ lastHit.attacker }}</span>
          <strong>{{ lastHit.dead ? '已死亡' : lastHit.damage <= 0 ? '未受伤 · 存活' : lastHit.continued ? '触发续行 · 存活' : '普通受伤 · 存活' }}</strong>
        </div>
        <p class="hit-detail"><template v-if="lastHit.applyBerserk">受击前理智 {{ display(lastHit.sanityPercent) }}%：</template>基础 {{ display(lastHit.baseDamage) }} → 减伤 {{ display(lastHit.reductionPercent) }}% 后 {{ display(lastHit.reducedDamage) }} → 承伤 ×{{ displayMultiplier(lastHit.damageMultiplier) }} → 实际 {{ display(lastHit.damage) }} 点伤害。</p>
        <p class="hit-summary">受击 {{ display(lastHit.damage) }} → 生命 −{{ display(lastHit.healthLost) }}<template v-if="lastHit.soulLost > 0"> → 灵魂 −{{ display(lastHit.soulLost) }}</template><template v-if="lastHit.sanityLost > 0"> → 理智 −{{ display(lastHit.sanityLost) }}</template></p>
        <p v-if="lastHit.continued" class="hit-detail">溢出 {{ display(lastHit.overflow) }} × (0.40 + 48 / (40 + {{ display(lastHit.overflow) }})) = {{ display(lastHit.resourceCost) }} 点资源消耗。</p>
        <p v-else-if="lastHit.damage <= 0" class="hit-detail">实际伤害为 0，三项资源均未扣减。</p>
        <p v-else class="hit-detail">本次伤害未致命，只扣生命值。</p>
        <p v-if="lastHit.uncoveredCost > 0" class="hit-detail">灵魂与理智耗尽，未覆盖的 {{ display(lastHit.uncoveredCost) }} 点消耗转为扣血。{{ lastHit.dead ? '重置或调整生命值后可继续体验。' : `剩余生命 ${display(resources.health)}，仍然存活。` }}</p>
      </template>
      <p v-else-if="isDead" class="empty-result">生命值为 0。重置或调整生命值后可继续体验。</p>
      <p v-else class="empty-result">调整资源，或点击上方生物受伤。致命时优先耗魂，再扣理智。</p>
    </div>
    <p class="sim-note">预设和自定义伤害均先减伤，再计入受击前的怨灵承伤倍率，最后结算续行；关闭易伤时仍应用减伤。耗理智后更新下一击倍率。熊獾对玩家基础伤害为 87.5。减伤率按固定值演示普通伤害，不模拟护甲耐久、位面伤害或每秒理智流失。</p>
  </section>
</template>

<style scoped>
.soul-simulator {
  margin: 24px 0;
  padding: 22px 24px 18px;
  border: 1px solid var(--ink-line);
  border-radius: 12px;
  background: var(--ink-surface);
  color: var(--ink-text);
  font-variant-numeric: tabular-nums;
}
.soul-simulator p { margin: 0; }
.sim-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.soul-simulator .sim-eyebrow { margin-bottom: 4px; color: var(--ink-muted); font-size: 12px; line-height: 1.5; }
.soul-simulator .sim-title { color: var(--ink-text); font-size: 18px; font-weight: 650; line-height: 1.5; }
.reset-button { padding: 6px 12px; border: 1px solid var(--ink-line); border-radius: 6px; color: var(--ink-secondary); font-size: 13px; cursor: pointer; }
.reset-button:hover { border-color: var(--ink-link); color: var(--ink-link); }
.sim-resources { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin: 8px 0 24px; }
.stat-control { display: flex; flex-direction: column; align-items: center; min-width: 0; }
.badge { position: relative; width: 148px; max-width: 100%; aspect-ratio: 1; }
.soul-simulator .badge-layer { position: absolute; inset: 0; display: block; width: 100%; height: 100%; margin: 0; }
.badge-liquid { transition: clip-path 350ms ease-out; }
.badge-loss { position: absolute; top: 20%; left: 0; right: 0; z-index: 1; color: #fff; font-size: 19px; font-weight: 750; line-height: 1.2; text-align: center; text-shadow: 0 1px 3px #000, 1px 0 2px #000, -1px 0 2px #000; pointer-events: none; animation: loss-float 1.3s ease-out forwards; }
@keyframes loss-float { 0% { opacity: 1; transform: translateY(8px); } 65% { opacity: 1; } 100% { opacity: 0; transform: translateY(-22px); } }
.stat-label { margin-top: -8px; color: var(--ink-secondary); font-size: 13px; font-weight: 600; }
.stat-amount { display: flex; align-items: baseline; justify-content: center; gap: 4px; margin: 6px 0 12px; }
.stat-amount input { width: 84px; min-width: 0; padding: 4px 5px; border: 1px solid var(--ink-line); border-radius: 5px; background: var(--ink-paper); color: var(--ink-text); font-family: inherit; font-size: 18px; font-weight: 650; text-align: center; appearance: textfield; -moz-appearance: textfield; }
.stat-amount input::-webkit-inner-spin-button, .stat-amount input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.stat-amount span { color: var(--ink-muted); font-size: 12px; white-space: nowrap; }
.stat-slider { width: 100%; max-width: 168px; height: 24px; accent-color: var(--stat-colour); cursor: pointer; }
.sim-conditions { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px 20px; padding-top: 14px; border-top: 1px solid var(--ink-line); font-size: 13px; }
.condition-switch, .skill-option { display: flex; align-items: center; gap: 8px; color: var(--ink-secondary); }
.condition-switch { cursor: pointer; }
.condition-switch input { width: 16px; height: 16px; accent-color: var(--ink-link); cursor: pointer; }
.skill-option select { padding: 5px 8px; border: 1px solid var(--ink-line); border-radius: 5px; background: var(--ink-paper); color: var(--ink-text); font: inherit; cursor: pointer; }
.skill-option select:disabled { opacity: .5; cursor: default; }
.reduction-control, .custom-attack { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 12px; color: var(--ink-secondary); font-size: 13px; }
.reduction-control { margin-top: 14px; }
.reduction-control > input[type="range"] { flex: 1 1 100px; min-width: 80px; max-width: 180px; accent-color: var(--ink-link); cursor: pointer; }
.reduction-control small { color: var(--ink-muted); font-size: 11px; }
.option-amount { display: flex; align-items: center; gap: 5px; }
.option-amount input { width: 78px; padding: 5px 6px; border: 1px solid var(--ink-line); border-radius: 5px; background: var(--ink-paper); color: var(--ink-text); font: inherit; text-align: center; }
.custom-attack { margin-top: 12px; }
.custom-attack .option-amount input { width: 96px; }
.custom-hit-button { flex: 1 1 180px; margin-left: auto; }
.soul-simulator .multiplier-readout { margin: 12px 0; color: var(--ink-secondary); font-size: 12px; line-height: 1.8; }
.multiplier-readout strong { color: var(--ink-link); font-weight: 650; }
.sim-attacks { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.attack-button { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 4px 8px; padding: 12px 14px; border: 1px solid var(--ink-line); border-radius: 7px; background: var(--ink-paper); text-align: left; cursor: pointer; transition: border-color 150ms, background 150ms; }
.attack-button:hover:enabled { border-color: var(--ink-link); background: var(--ink-focus-bg); }
.attack-button:active:enabled { transform: translateY(1px); }
.attack-button:disabled { opacity: .45; cursor: default; }
.attacker-name { color: var(--ink-text); font-size: 14px; font-weight: 600; white-space: nowrap; }
.attacker-damage { color: var(--ink-secondary); font-size: 16px; font-weight: 650; white-space: nowrap; }
.attacker-damage small { font-size: 11px; font-weight: 400; }
.attack-base { grid-column: 1 / -1; color: var(--ink-muted); font-size: 11px; line-height: 1.5; }
.sim-result { margin-top: 14px; padding: 14px 16px; border-radius: 7px; background: var(--ink-soft); font-size: 13px; line-height: 1.8; overflow-wrap: anywhere; }
.result-heading { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 4px 12px; margin-bottom: 6px; color: var(--ink-secondary); font-size: 12px; }
.result-heading strong { color: var(--ink-link); font-weight: 600; }
.result-dead .result-heading strong { color: var(--ink-danger); }
.hit-summary { color: var(--ink-text); font-weight: 600; }
.soul-simulator .hit-detail { margin-top: 4px; color: var(--ink-secondary); font-size: 12px; }
.empty-result { color: var(--ink-secondary); }
.soul-simulator .sim-note { margin-top: 12px; color: var(--ink-muted); font-size: 11px; line-height: 1.8; }
@container continuation-demo (max-width: 640px) {
  .soul-simulator { padding: 18px 16px 14px; }
  .sim-resources { gap: 12px; margin: 4px 0 14px; }
  .badge { width: 100px; }
  .stat-label { margin-top: 0; }
  .stat-amount { margin-bottom: 6px; }
  .stat-amount input { width: 64px; font-size: 16px; }
  .attack-button { display: flex; flex-direction: column; gap: 4px; padding: 10px 6px; text-align: center; }
  .custom-attack { display: grid; grid-template-columns: 112px minmax(0, 1fr); gap: 6px 10px; }
  .custom-attack > label { grid-column: 1 / -1; }
  .custom-attack .option-amount input { width: 84px; }
  .custom-hit-button { display: flex; flex-direction: row; justify-content: space-between; min-width: 0; margin-left: 0; padding: 8px 10px; }
}
@container continuation-demo (max-width: 380px) {
  .soul-simulator { padding: 16px 10px 12px; }
  .sim-title { font-size: 16px !important; }
  .sim-resources { gap: 8px; margin-top: 16px; }
  .stat-label { margin-top: 0; }
  .stat-amount { flex-direction: column; align-items: center; gap: 1px; }
  .stat-amount input { width: 70px; font-size: 16px; }
  .sim-attacks { gap: 6px; }
  .attacker-name { font-size: 12px; }
  .attacker-damage { font-size: 14px; }
  .attacker-damage small { display: block; font-size: 10px; }
  .custom-hit-button { flex-direction: column; }
  .sim-result { padding: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .badge-liquid { transition: none; }
  .badge-loss { animation: none; opacity: 1; }
}
</style>
