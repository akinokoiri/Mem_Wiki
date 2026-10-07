import { counterpartUrl } from '../data/locale-routing.js'

// This module runs before VitePress installs its window capture router.
// Capture click-only activation as well as pointer and keyboard activation.
const prepareLanguageNavigation = event => {
  const anchor = event.target instanceof Element ? event.target.closest('a.wiki-language-switch') : null
  if (anchor) anchor.href = counterpartUrl(location.href)
}
if (typeof window !== 'undefined') {
  window.addEventListener('click', prepareLanguageNavigation, true)
  if (import.meta.hot) import.meta.hot.dispose(() => {
    window.removeEventListener('click', prepareLanguageNavigation, true)
  })
}
