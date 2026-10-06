// VitePress serializes these functions into the browser, so keep them self-contained.
export function tokenizeWikiSearch(text, fieldName) {
  const tokens = []
  const parts = text.match(/\p{Script=Han}+|[^\p{Script=Han}\p{White_Space}\p{Punctuation}\p{Symbol}]+/gu) || []
  for (const part of parts) {
    if (!/^\p{Script=Han}/u.test(part)) {
      tokens.push(part)
      continue
    }
    const characters = [...part]
    // Index single characters as well; queries of two or more characters use
    // adjacent pairs so unrelated occurrences of each character cannot match.
    if (fieldName || characters.length === 1) tokens.push(...characters)
    for (let i = 0; i < characters.length - 1; i++) {
      tokens.push(characters[i] + characters[i + 1])
    }
  }
  return tokens
}

export function extractWikiSearchField(document, fieldName) {
  if (fieldName !== 'id') return document[fieldName]
  const match = document.id.match(/^(.*\/mechanics\/)skills_desc\/([^/#]+)\.html(?:#(.*))?$/)
  if (!match) return document.id
  const [, base, skillId, section] = match
  const anchor = section && section !== skillId ? `${skillId}--${section}` : skillId
  return `${base}skilltree.html#${anchor}`
}

export const wikiSearchOptions = {
  options: { tokenize: tokenizeWikiSearch, extractField: extractWikiSearchField },
  searchOptions: { combineWith: 'AND' },
}
