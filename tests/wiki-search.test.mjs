import test from 'node:test'
import assert from 'node:assert/strict'
import MiniSearch from 'minisearch'
import { wikiSearchOptions } from '../.vitepress/data/wiki-search.js'
import { resolveSkillLocation } from '../.vitepress/data/skill-links.js'

function makeSearch(documents) {
  const options = {
    fields: ['title', 'titles', 'text'],
    storeFields: ['title', 'titles'],
    ...wikiSearchOptions.options,
    searchOptions: { fuzzy: 0.2, prefix: true, ...wikiSearchOptions.searchOptions },
  }
  const index = new MiniSearch(options)
  index.addAll(documents)
  // Exercise the server-to-browser index and function serialization boundary.
  const browserOptions = { ...options }
  for (const key of ['tokenize', 'extractField']) {
    browserOptions[key] = new Function(`return ${options[key].toString()}`)()
  }
  return MiniSearch.loadJSON(JSON.stringify(index), browserOptions)
}

test('Chinese search finds words from the middle and end, including a single character', () => {
  const index = makeSearch([
    { id: 'soul', title: '灵魂回声', text: '鬼火命中敌方目标后可能生成影子。' },
    { id: 'aura', title: '灵魂光环', text: '另一种机制。' },
    { id: 'echo', title: '鬼火回声', text: '另一种回声。' },
  ])
  for (const query of ['灵魂', '魂回', '回声', '声', '灵魂回声']) {
    assert.ok(index.search(query).some(result => result.id === 'soul'), query)
  }
  assert.deepEqual(index.search('魂回').map(result => result.id), ['soul'])
  assert.deepEqual(index.search('灵魂回声').map(result => result.id), ['soul'])
  assert.deepEqual(index.search('不存在的词条'), [])
})

test('mixed Chinese and Latin queries retain prefix and typo matching', () => {
  const index = makeSearch([{ id: 'armor', title: 'W.A.R.B.I.S. 盔甲', text: '恢复能力 repair。' }])
  assert.equal(index.search('盔甲 W.A.R').at(0)?.id, 'armor')
  assert.equal(index.search('repai').at(0)?.id, 'armor')
  assert.equal(index.search('repaur').at(0)?.id, 'armor')
})

test('skill detail results open the matching skill and section in the unified tree', () => {
  const id = 'mem_skill_soul_lock_3'
  const index = makeSearch([
    { id: `/mechanics/skills_desc/${id}.html#${id}`, title: '四象离魂 · 路径锁', text: '' },
    { id: `/mechanics/skills_desc/${id}.html#灵魂池峰值`, title: '灵魂池峰值', titles: ['四象离魂 · 路径锁'], text: '需要灵魂池达到 150 点。' },
    { id: '/mechanics/enemies.html#shadow-soul-echo', title: '灵魂回声', text: '鬼火生成影子。' },
  ])
  const result = index.search('峰值').at(0)
  assert.equal(result.id, `/mechanics/skilltree.html#${id}--灵魂池峰值`)
  assert.deepEqual(resolveSkillLocation(new URL(result.id, 'https://wiki.example').hash), {
    id, anchor: `${id}--灵魂池峰值`,
  })
  assert.equal(index.search('四象离魂').some(result => result.id === `/mechanics/skilltree.html#${id}`), true)
  assert.equal(index.search('回声').at(0).id, '/mechanics/enemies.html#shadow-soul-echo')
})
