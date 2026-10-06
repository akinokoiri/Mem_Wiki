import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { linkMap, specialLinks, aliasMap } from '../.vitepress/theme/components/icons.js'
import { SKILL_NODES } from '../.vitepress/data/skilltree.js'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))

// Check rendered anchors, rather than guessing which Markdown constructs create IDs.
// Skill links select a client-side node, so their targets live in SKILL_NODES.
export function validateLinks(outDir, links, skills) {
  const errors = []
  const pages = new Map()
  for (const [term, target] of Object.entries(links)) {
    if (!target.startsWith('/') || target.startsWith('//')) continue
    let url
    let id
    let page
    try {
      url = new URL(target, 'https://wiki.invalid')
      id = decodeURIComponent(url.hash.slice(1))
      page = decodeURIComponent(url.pathname)
    } catch {
      errors.push(`${term}: invalid URL ${target}`)
      continue
    }
    const filename = page.endsWith('/') ? `${page}index.html`
      : page.endsWith('.html') ? page : `${page}.html`
    const file = path.join(outDir, filename)
    if (!pages.has(file)) {
      pages.set(file, existsSync(file) ? readFileSync(file, 'utf8') : null)
    }
    const html = pages.get(file)
    if (html === null) {
      errors.push(`${term}: missing page ${target}`)
    } else if (page.replace(/\.html$/, '') === '/mechanics/skilltree' && id.startsWith('mem_')) {
      if (!Object.hasOwn(skills, id)) errors.push(`${term}: unknown skill ${id}`)
    } else if (id && !Array.from(html.matchAll(/\bid=["']([^"']*)["']/g), m => m[1]).includes(id)) {
      errors.push(`${term}: missing anchor ${target}`)
    }
  }
  return errors
}

export function checkWikiLinks(outDir) {
  const errors = validateLinks(outDir, linkMap, SKILL_NODES)
  for (const [term, target] of Object.entries(specialLinks)) {
    if (linkMap[term] !== target) errors.push(`${term}: specialLinks and linkMap disagree`)
  }
  for (const [alias, canonical] of Object.entries(aliasMap)) {
    if (!linkMap[canonical] || linkMap[alias] !== linkMap[canonical]) {
      errors.push(`${alias}: link does not match canonical term ${canonical}`)
    }
  }
  if (errors.length) throw new Error(`Wiki link check failed:\n${errors.join('\n')}`)
  console.log(`Wiki links checked: ${Object.keys(linkMap).length} targets and alias mappings.`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    checkWikiLinks(path.resolve(projectRoot, process.argv[2] || '.vitepress/dist'))
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
