import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const root = path.resolve(import.meta.dirname, '../.vitepress/dist')
assert.ok(existsSync(path.join(root, 'en/index.html')), 'Run npm run docs:build before checking rendered locales')
const paths = readdirSync(root, { recursive: true })
  .filter(file => file.endsWith('.html'))
  .map(file => file.split(path.sep).join('/'))
const pages = new Map(paths.map(file => [file, readFileSync(path.join(root, file), 'utf8')]))
const englishPages = [...pages.keys()].filter(file => file.startsWith('en/')).length
assert.ok(englishPages > 0, 'No rendered English pages found')
const ids = new Map([...pages].map(([file, html]) => [file, new Set([...html.matchAll(/\bid="([^"]*)"/g)].map(match => match[1]))]))
const errors = []
let checkedLinks = 0
let checkedHeadings = 0
const headings = html => [...html.matchAll(/<h[1-6]\b[^>]*\bid="([^"]+)"/g)].map(match => match[1]).filter(id => id !== 'skill-summary-title')
for (const [file, html] of pages) {
  if (!file.startsWith('en/')) continue
  if (!html.includes('<html lang="en-US"')) errors.push(`${file}: missing English HTML language`)
  const source = pages.get(file.slice(3))
  if (source) {
    const before = headings(source)
    const after = headings(html)
    checkedHeadings += before.length
    if (JSON.stringify(before) !== JSON.stringify(after)) errors.push(`${file}: heading anchors do not match Chinese page`)
  }
  const visible = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    // Exact Chinese command arguments are required game inputs, not untranslated prose.
    .replace(/\/mem\s+(?:彼世的光芒|易燃易爆|魂魄逸散)/g, '')
    .replaceAll('中文', '')
  if (/\p{Script=Han}/u.test(visible)) errors.push(`${file}: visible Chinese text remains`)
  for (const [, attr, text] of html.matchAll(/\b(aria-label|alt|title|placeholder)="([^"]*)"/g)) {
    if (/\p{Script=Han}/u.test(text) && text !== '切换到中文，保留当前页面') errors.push(`${file}: Chinese ${attr}: ${text}`)
  }
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    let url
    try { url = new URL(href.replaceAll('&amp;', '&'), `https://wiki.invalid/${file}`) } catch { errors.push(`${file}: malformed href ${href}`); continue }
    if (url.origin !== 'https://wiki.invalid') continue
    let destination = decodeURIComponent(url.pathname).slice(1)
    destination = !destination || destination.endsWith('/') ? `${destination}index.html` : path.extname(destination) ? destination : `${destination}.html`
    if (!pages.has(destination)) {
      if (!existsSync(path.join(root, destination))) errors.push(`${file}: missing linked file ${href}`)
      continue
    }
    checkedLinks++
    const hash = decodeURIComponent(url.hash.slice(1))
    if (!hash || ids.get(destination).has(hash)) continue
    // Skill IDs and their namespaced detail sections are inserted by the client.
    if (/^(?:en\/)?mechanics\/skilltree\.html$/.test(destination) && hash.startsWith('mem_')) continue
    errors.push(`${file}: missing linked anchor ${href}`)
  }
}
console.log(JSON.stringify({ englishPages, checkedHeadings, checkedLinks, errors }, null, 2))
assert.equal(errors.length, 0, errors.join('\n'))

// Inspect the real emitted English search index rather than a hand-made fixture.
const chunkDirectory = path.join(root, 'assets/chunks')
const searchChunk = readdirSync(chunkDirectory).find(file => file.startsWith('@localSearchIndexen.'))
assert.ok(searchChunk, 'Missing emitted English search index')
const { pathToFileURL } = await import('node:url')
const { default: MiniSearch } = await import('minisearch')
const { wikiSearchOptions } = await import('../.vitepress/data/wiki-search.js')
const serialized = (await import(pathToFileURL(path.join(chunkDirectory, searchChunk)).href)).default
const searchData = JSON.parse(serialized)
assert.ok(Object.values(searchData.documentIds).every(id => id.startsWith('/en/')), 'English search must stay in English')
assert.ok(Object.values(searchData.storedFields).every(value => !/\p{Script=Han}/u.test(value.title)), 'Search result titles must be English')
const search = MiniSearch.loadJSON(serialized, {
  fields: ['title', 'titles', 'text'], storeFields: ['title', 'titles'],
  ...wikiSearchOptions.options,
  searchOptions: { fuzzy: 0.2, prefix: true, ...wikiSearchOptions.searchOptions },
})
for (const query of ['Mangem', 'Soul Mark', 'Dreadsaw', 'Revved Up', 'Hands-On', 'Soul Entity Mastery']) {
  assert.ok(search.search(query).length, `English search has no results for ${query}`)
}
assert.equal(search.search('Pool Peak')[0]?.id, '/en/mechanics/skilltree.html#mem_skill_soul_lock_3--灵魂池峰值')
console.log(`English search checked: ${searchData.documentCount} records, localized titles and skill-detail destinations.`)
