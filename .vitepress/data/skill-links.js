import { SKILL_NODES } from './skilltree.js'

// Keep previously shared links working after correcting the original noun map.
const legacyIds = { mem_skill_body_precision: 'mem_skill_body_precision_1' }

export function resolveSkillId(value) {
  if (typeof value !== 'string') return null
  let id
  try {
    id = decodeURIComponent(value.replace(/^#/, '')).replace(/^def-/, '')
  } catch {
    return null
  }
  if (Object.hasOwn(legacyIds, id)) id = legacyIds[id]
  return Object.hasOwn(SKILL_NODES, id) ? id : null
}

const legacySpiritHeadings = new Set(['spirit-detail-title', '受击保护', '损失灵魂后的鬼火反击', '意识转移', '开启与持续消耗', '头部与身体的分工', '身体的战斗规则', '察觉范围与视野', '结束与接头', '觉醒条件的计算'])

export function resolveSkillLocation(value) {
  if (typeof value !== 'string') return null
  let hash
  try { hash = decodeURIComponent(value.replace(/^#/, '')) } catch { return null }
  if (legacySpiritHeadings.has(hash)) {
    return { id: 'mem_spirit_link', anchor: `mem_spirit_link--${hash === 'spirit-detail-title' ? 'details' : hash}` }
  }
  const divider = hash.indexOf('--')
  if (divider !== -1) {
    const id = resolveSkillId(hash.slice(0, divider))
    return id ? { id, anchor: `${id}--${hash.slice(divider + 2)}` } : null
  }
  const id = resolveSkillId(hash)
  return id ? { id, anchor: null } : null
}
