// Locale-independent URL helpers are also exercised directly by Node tests.
export function isEnglishPath(path = '') {
  return /^\/en(?:\/|$)/.test(path)
}
export function localizeWikiLink(link, english = false) {
  if (!link || !link.startsWith('/') || link.startsWith('//')) return link
  const path = link.replace(/^\/en(?=\/|$)/, '') || '/'
  if (!/^\/(?:mechanics(?:\/|$)|$|index(?:\.html)?(?:[?#]|$))/.test(path)) return link
  return english ? `/en${path}` : path
}
export function counterpartUrl(url) {
  const parsed = new URL(url, 'https://wiki.invalid')
  parsed.pathname = isEnglishPath(parsed.pathname)
    ? parsed.pathname.replace(/^\/en(?=\/|$)/, '') || '/'
    : `/en${parsed.pathname}`
  return `${parsed.pathname}${parsed.search}${parsed.hash}`
}
