import test from 'node:test'
import assert from 'node:assert/strict'
import { AWAKENING, LOCK_RULES, skillTitle } from '../.vitepress/data/skill-presentation.js'
import { termTranslations } from '../.vitepress/data/terms-en.js'
import { uiTranslations } from '../.vitepress/data/ui-en.js'

test('approved names retain separate canonical identities', () => {
  assert.equal(termTranslations['启迪陷阱阵列'], 'Enlightened Strike Array')
  assert.equal(termTranslations['启迪陷阱'], 'Enlightening Snare')
  assert.equal(termTranslations['分头行动'], 'Head Out')
  assert.equal(termTranslations['分头行动状态'], 'Head Out')
  assert.equal(termTranslations['分头行动(友善的荒尹沐)'], 'Head Out (Friendly Mangmire)')
  assert.equal(termTranslations['四象离魂'], 'Soulfire Orbit')
  assert.equal(termTranslations['意识转移'], 'Hands-On')
  assert.equal(termTranslations['电锯惊魂'], 'Dreadsaw')
  assert.equal(termTranslations['电锯轰鸣'], 'Revved Up')
})
test('Courage summary retains five percent of current progress in both languages', () => {
  const zh = AWAKENING.mem_skill_soul_lock_1
  assert.match(zh, /当前总进度乘以 0\.05，保留 5%，损失 95%/)
  assert.match(uiTranslations[zh], /current total progress by 0\.05, retaining 5% and losing 95%/)
})
test('all seven path locks use the linked skill name convention', () => {
  for (const id of Object.keys(LOCK_RULES)) {
    assert.match(uiTranslations[skillTitle(id)], / · Path Lock$/)
  }
  assert.equal(uiTranslations[skillTitle('mem_skill_soul_lock_3')], 'Soulfire Orbit · Path Lock')
})

test('final boss family names and enlightened equipment preserve canonical keys', () => {
 assert.equal(termTranslations['芒伊月'], 'Mangelune')
 assert.equal(termTranslations['荒尹沐'], 'Mangmire')
 assert.equal(termTranslations['沐尹荒'], 'Erimgnam')
 assert.equal(termTranslations['友善的沐尹荒'], 'Friendly Erimgnam')
 assert.equal(termTranslations['W.A.R.B.I.S.盔甲·启迪'], 'Enlightened W.A.R.B.I.S. Armor')
 assert.equal([..."Mangmire"].reverse().join('').toLowerCase(), 'Erimgnam'.toLowerCase())
})
