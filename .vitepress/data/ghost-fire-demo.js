// mem_void_bouncer.lua: bonuses add 10% of the initial speed/range per bounce.
// FindEntities is distance-sorted (official simutil.lua); enemy search runs first.
// The real attacker and current target are excluded, but earlier targets can return.
// Ten bounces are the agreed balance change; the mod code is updated separately.
export const ghostFireRules = Object.freeze({ speed: 7, range: 10, bounces: 10, damage: 10, pixelsPerUnit: 10 })

export const fireActors = Object.freeze([
  { id: 'caster', label: '芒伊木', faction: 'caster', x: 415, y: 290 },
  { id: 'a', label: 'A', faction: 'ally', x: 395, y: 195 },
  { id: 'b', label: 'B', faction: 'ally', x: 335, y: 195 },
  { id: 'c', label: 'C', faction: 'enemy', health: 40, x: 220, y: 195 },
  { id: 'd', label: 'D', faction: 'enemy', health: 30, entersAt: 5, x: 290, y: 255, entryY: 425 }
])
export const actorById = Object.fromEntries(fireActors.map(actor => [actor.id, actor]))

export const initialFireHealth = Object.freeze(Object.fromEntries(fireActors.filter(actor => actor.health).map(actor => [actor.id, actor.health])))
export const fireMultiplier = bounces => 1 + bounces * 0.1
export const actorDistance = (from, to) => Math.hypot(to.x - from.x, to.y - from.y) / ghostFireRules.pixelsPerUnit

export function findBounceTarget(currentId, bounces, health = initialFireHealth) {
  const current = actorById[currentId]
  const range = ghostFireRules.range * fireMultiplier(bounces)
  const candidates = fireActors.filter(actor => actor.id !== currentId && actor.faction !== 'caster'
    && (actor.entersAt || 0) <= bounces && (health[actor.id] ?? Infinity) > 0
    && actorDistance(current, actor) <= range)
    .sort((left, right) => actorDistance(current, left) - actorDistance(current, right))
  return (candidates.find(actor => actor.faction === 'enemy') || candidates.find(actor => actor.faction === 'ally'))?.id ?? null
}

const searchCopy = [
  ['命中 B · 借友军跳板', 'C 距 B 11.5，超出本次范围 10；没有敌人可选，转向友军 A。友军不受伤。'],
  ['命中 A · 回跳 B', '本次范围 11 仍够不到 C；B 是最近的合格友军，可以再次选中刚才的目标。'],
  ['命中 B · 终于够到 C', '范围扩大到 12，覆盖距 B 11.5 的敌人 C。即使友军 A 更近，也优先攻击敌人。'],
  ['命中 C · 回到友军 B', 'C 受到 10 点伤害，仍然存活。范围 13 内没有其他敌人，转向最近的友军 B。'],
  ['命中 B · 再次攻击 C', 'C 仍是范围内的敌人；刚才命中过也能再次选中，鬼火继续飞回 C。'],
  ['命中 C · 新敌人 D 入场', 'C 再受 10 点伤害后还剩 20 血；D 此时进入范围，优先选中敌人 D，继续攻击。'],
  ['命中 D · 敌人优先于友军', 'D 受到 10 点伤害。友军 B 虽然更近，但敌人 C 仍存活，鬼火优先回到 C。'],
  ['命中 C · 敌人间反复弹射', 'C 还剩 10 血；D 仍是范围内的敌人，鬼火继续在 C、D 之间往返。'],
  ['命中 D · 再次攻击 C', 'D 还剩 10 血；即使友军 B 更近，仍优先攻击存活的敌人 C。'],
  ['命中 C · 最后一次弹射', 'C 第四次受击后被击败。D 仍然存活，使用最后一次弹射额度继续攻击 D。']
]

function createFireStages() {
  const stages = [
    { kind: 'ready', bounces: 0, title: '本源协调 · 友军接力', description: '已学一级弹射与本源协调。芒伊木朝友军 B 发射，A、B 可以反复作为跳板。' },
    { kind: 'flight', bounces: 0, from: 'caster', to: 'b', title: '发射 → 友军 B', description: '先追踪指定目标 B。C 在最初的索敌范围外，D 尚未入场。' }
  ]
  const health = { ...initialFireHealth }
  let currentId = 'b'
  for (let bounces = 0; bounces <= ghostFireRules.bounces; bounces++) {
    if (actorById[currentId].faction === 'enemy') health[currentId] -= ghostFireRules.damage
    if (bounces === ghostFireRules.bounces) {
      stages.push({ kind: 'done', bounces, at: currentId, title: `${ghostFireRules.bounces} 次弹射用尽 · 鬼火消散`, description: `首次命中之外的 ${ghostFireRules.bounces} 次弹射全部完成。友军 A、B 都没有受伤；敌人 C、D 均被击败。` })
      break
    }
    const next = findBounceTarget(currentId, bounces, health)
    stages.push({ kind: 'search', bounces, at: currentId, next, title: searchCopy[bounces][0], description: searchCopy[bounces][1] })
    if (!next) break
    stages.push({ kind: 'flight', bounces: bounces + 1, from: currentId, to: next,
      title: `第 ${bounces + 1} 次弹射 → ${actorById[next].faction === 'ally' ? '友军' : '敌人'} ${actorById[next].label}`,
      description: bounces === 4 ? '鬼火再次飞向 C，敌人 D 开始进入战场。每次命中都会重新索敌。'
        : `飞行速度 ×${Number(fireMultiplier(bounces + 1).toFixed(1))}；下一次索敌范围增至 ${ghostFireRules.range + bounces + 1}。` })
    currentId = next
  }
  return Object.freeze(stages)
}
export const fireStages = createFireStages()

export function stageDuration(stage) {
  if (stage.kind !== 'flight') return 1900
  const distance = actorDistance(actorById[stage.from], actorById[stage.to])
  // Slow every flight equally; relative speeds remain faithful. Searches pause for reading.
  return distance / (ghostFireRules.speed * fireMultiplier(stage.bounces) * 0.65) * 1000
}

export function flightPosition(stage, progress) {
  const from = actorById[stage.from]
  const to = actorById[stage.to]
  const t = Math.max(0, Math.min(1, progress))
  return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t }
}
