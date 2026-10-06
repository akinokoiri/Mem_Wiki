import { SKILL_NODES } from './skilltree.js'

// Groups are AND; each group requires at least min learned skills.
export const LOCK_RULES = {
  mem_skill_soul_lock_1: [{ skills: ['mem_skill_soul_melt'], min: 1 }],
  mem_skill_soul_lock_2: [{ skills: ['mem_skill_soul_rest_2'], min: 1 }],
  mem_skill_soul_lock_3: [{ skills: ['mem_skill_soul_fire_3', 'mem_skill_soul_rest_2', 'mem_skill_soul_melt'], min: 2 }],
  mem_skill_body_lock_spirit: [{ skills: ['mem_skill_soul_rest_2', 'mem_skill_body_precision_1', 'mem_skill_body_preservative_1', 'mem_skill_body_numb_1'], min: 2 }],
  mem_skill_body_lock_exp: [{ skills: ['mem_skill_instinct_beastly', 'mem_skill_instinct_ghostly'], min: 2 }],
  mem_skill_body_lock_medicine: [{ skills: ['mem_skill_instinct_hide_2'], min: 1 }],
  mem_skill_body_lock_corpse: [
    { skills: ['mem_skill_instinct_ghostly'], min: 1 },
    { skills: ['mem_skill_body_preservative_3', 'mem_skill_instinct_beastly'], min: 1 },
  ],
}
export const AWAKENING = {
  mem_skill_soul_lock_1: '在黑暗的夜袭警报中积攒 10 点胆识。逃回光亮可保留进度；达成前被夜袭命中会清空进度。',
  mem_skill_soul_lock_2: '承受一次幅度至少为 101% 的灵魂震荡。',
  mem_skill_soul_lock_3: '让灵魂池在某一刻达到至少 150 点。',
  mem_skill_body_lock_spirit: '在 5 秒内失去相当于当前灵魂上限的灵魂值。',
  mem_skill_body_lock_exp: '因爆炸而死亡 1 次。',
  mem_skill_body_lock_medicine: '在本存档中累计让 10 种不同生物跟随过自己，无需同时跟随。',
  mem_skill_body_lock_corpse: '制作 66 种不同的随身装备，或击杀 6 种符合条件的位面复生生物；两项挑战完成任一项即可。',
}
export function evaluateSkillLock(id, has) {
  return Boolean(LOCK_RULES[id]?.every(group => group.skills.filter(has).length >= group.min))
}
export function skillTitle(id) {
  const node = SKILL_NODES[id]
  if (!node) return ''
  return node.isLock ? `${SKILL_NODES[node.connects[0]].title} · 路径锁` : node.title
}
export function skillIcon(id) {
  const node = SKILL_NODES[id]
  return node?.isLock ? '/skills/office_icon/locked.webp' : `/skills/${node?.icon}.webp`
}
export function skillPresentation(id) {
  const node = SKILL_NODES[id]
  if (!node) return null
  const lockId = node.isLock ? id : node.locks[0]
  const incoming = node.root ? [] : Object.values(SKILL_NODES).filter(other => other.connects.includes(id)).map(other => other.id)
  const requirements = LOCK_RULES[lockId] || (incoming.length ? [{ skills: incoming, min: 1 }] : [])
  const family = id.replace(/_[123]$/, '')
  const levels = /_[123]$/.test(id) && !node.isLock
    ? Object.values(SKILL_NODES).filter(other => !other.isLock && other.id.replace(/_[123]$/, '') === family).map(other => other.id)
    : []
  const following = [...new Set([
    ...node.connects,
    ...Object.entries(LOCK_RULES).filter(([, groups]) => groups.some(group => group.skills.includes(id))).map(([lock]) => lock),
  ])]
  return {
    title: skillTitle(id), lockId, requirements, levels, following,
    category: id.includes('_soul_') ? '灵魂技艺' : id.includes('_instinct_') ? '生存本能' : '躯体强化',
    awakening: AWAKENING[lockId],
  }
}

export function meetsSkillRequirements(id, learned) {
  const info = skillPresentation(id)
  return Boolean(info && info.requirements.every(group => group.skills.filter(skill => learned.has(skill)).length >= group.min))
}

export function canRefundSkill(id, learned) {
  if (!learned.has(id)) return false
  const remaining = new Set(learned)
  remaining.delete(id)
  // Validate each retained skill against actual requirements, including alternate
  // threshold routes that the decorative connecting lines don't all depict.
  return [...remaining].every(skill => meetsSkillRequirements(skill, remaining))
}
