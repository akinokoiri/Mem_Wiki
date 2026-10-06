import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { getTermPreview, termDescriptions } from '../.vitepress/data/term-previews.js'
import { linkMap, nounMap, officialTerms } from '../.vitepress/theme/components/icons.js'

test('resource modifiers preview the resource rather than the literal numeric label', () => {
  for (const label of ['−0.2/s', '-0.2/s', '+30', '150']) {
    // Mathematical minus is used in authored prose as well as ASCII minus.
    const definition = getTermPreview(label, 'soul')
    assert.equal(definition?.term, '灵魂值')
    assert.match(definition.description, /资源/)
    assert.equal(definition.href, linkMap['灵魂值系统'])
  }
})

test('aliases have the same definition and destination while keeping the displayed term', () => {
  const alias = getTermPreview('灵魂振荡')
  const canonical = getTermPreview('灵魂震荡')
  assert.equal(alias.description, canonical.description)
  assert.equal(alias.href, canonical.href)
  assert.equal(alias.term, '灵魂振荡')
})

test('unknown terms and ordinary official numeric attributes keep their existing behavior', () => {
  assert.equal(getTermPreview('没有这个词条'), null)
  assert.equal(getTermPreview('+5', 'health'), null)
  assert.equal(getTermPreview(''), null)
})

test('all player-visible registry states have a preview and a detail anchor', () => {
  const states = [
    '月光灼烧', '完美复活', '灵魂震荡', '魂魄刻印', '位面实体降格',
    '死亡回归冷却', '灵魂裂痕', '闪耀刻印', '芒伊月近战模式', '兽化身躯',
    '怨灵身躯', '分头行动状态', '三个灵魂', '位面封锁', '轨道增援', '食物中毒',
    '花期未至', '体温恒定', '暗影臣民', '强壮搬运',
    '暗影协同', '虚影协同', '电锯轰鸣', '工作高效'
  ]
  const page = readFileSync(new URL('../mechanics/statuses.md', import.meta.url), 'utf8')
  for (const term of states) {
    const definition = getTermPreview(term)
    assert.ok(definition, term)
    assert.equal(definition.href, '/mechanics/statuses.html#def-' + term)
    assert.ok(page.includes('[#' + term + ']'), 'missing detail: ' + term)
  }
  assert.equal(termDescriptions['幻觉冷却'], undefined)
  assert.ok(!page.includes('_DETAIL -->'))
})

test('chainsaw marking mode and soul resource retain their operation guides', () => {
  assert.equal(getTermPreview('刻印形态').href, '/mechanics/items.html#def-刻印形态')
  assert.equal(getTermPreview('灵魂值').href, '/mechanics/core.html#def-灵魂值系统')
})

test('registered mod nouns have summaries instead of falling back to a native title', () => {
  const missing = Object.entries(nounMap)
    .filter(([, icon]) => !officialTerms.includes(icon))
    .filter(([term]) => !getTermPreview(term))
    .map(([term]) => term)
  assert.deepEqual(missing, [])
  assert.match(getTermPreview('凉拌脑花').description, /暗影臣民/)
  assert.equal(getTermPreview('凉拌脑花').href, '/mechanics/items.html#def-凉拌脑花')
  assert.match(getTermPreview('芒伊月').description, /月亮位面寄生/)
  assert.equal(getTermPreview('芒伊月').href, '/mechanics/enemies.html#def-芒伊月')
})
