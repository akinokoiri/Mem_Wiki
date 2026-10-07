import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { nounMap, linkMap } from '../.vitepress/theme/components/icons.js'
import { termDescriptions } from '../.vitepress/data/term-previews.js'
import { termTranslations, termDescriptionsEn } from '../.vitepress/data/terms-en.js'

const root = path.resolve(import.meta.dirname, '..')
const sources = ['index.md', ...readdirSync(path.join(root, 'mechanics'), { recursive: true }).filter(file => file.endsWith('.md')).map(file => `mechanics/${file}`)]
const errors = []
const results = []
const count = values => values.reduce((map, value) => (map[value] = (map[value] || 0) + 1, map), {})
const numericText = text => text
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/\{#[^}]+\}/g, '')
  .replace(/<[^>]*>/g, '')
  .replace(/\]\([^)]*\)/g, ']')
const numberCounts = text => count(numericText(text).match(/\d+(?:\.\d+)?/g) || [])
for (const source of sources) {
  const translated = `en/${source}`
  if (!existsSync(path.join(root, translated))) { errors.push(`Missing ${translated}`); continue }
  const zh = readFileSync(path.join(root, source), 'utf8')
  const en = readFileSync(path.join(root, translated), 'utf8')
  const before = numberCounts(zh)
  const after = numberCounts(en)
  const differences = [...new Set([...Object.keys(before), ...Object.keys(after)])].filter(number => before[number] !== after[number]).map(number => `${number}: ${before[number] || 0} → ${after[number] || 0}`)
  const anchors = [...zh.matchAll(/\[#([^\]]+)\]/g)].map(match => match[1])
  const missingAnchors = anchors.filter(anchor => !en.includes(`[#${anchor}]`))
  if (missingAnchors.length) errors.push(`${translated}: missing canonical anchors ${missingAnchors.join(', ')}`)
  if (differences.length) errors.push(`${translated}: numeric counts differ (${differences.join('; ')})`)
  results.push({ source, translated, numericParity: !differences.length, definitionAnchors: anchors.length })
}
for (const key of new Set([...Object.keys(nounMap), ...Object.keys(linkMap), ...Object.keys(termDescriptions)])) {
  if (!termTranslations[key]) errors.push(`Missing English term: ${key}`)
}
for (const key of Object.keys(termDescriptions)) {
  if (!termDescriptionsEn[key]) errors.push(`Missing English preview: ${key}`)
}
console.log(JSON.stringify({ pages: results.length, expectedPages: sources.length, termLabels: Object.keys(termTranslations).length, previews: Object.keys(termDescriptionsEn).length, results, errors }, null, 2))
assert.equal(errors.length, 0, errors.join('\n'))
