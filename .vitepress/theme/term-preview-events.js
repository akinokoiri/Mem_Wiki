import { getTermPreview } from '../data/term-previews.js'

export const TERM_PREVIEW_EVENT = 'mem-wiki-preview-term'

let pointerType = 'mouse'
const recordPointer = event => { pointerType = event.pointerType }
const interceptClick = event => {
  if (event.detail === 0 || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  if (pointerType !== 'touch' && !window.matchMedia('(hover: none)').matches) return
  const element = event.target instanceof Element ? event.target.closest('[data-term-preview]') : null
  if (!element || !getTermPreview(element.dataset.termPreview)) return
  event.preventDefault()
  event.stopImmediatePropagation()
  window.dispatchEvent(new CustomEvent(TERM_PREVIEW_EVENT, { detail: element }))
}

// Theme imports run before VitePress installs its window capture navigation handler.
// Capture touch activation here so the router cannot navigate before the preview opens.
if (typeof window !== 'undefined') {
  window.addEventListener('pointerdown', recordPointer, true)
  window.addEventListener('click', interceptClick, true)
  if (import.meta.hot) import.meta.hot.dispose(() => {
    window.removeEventListener('pointerdown', recordPointer, true)
    window.removeEventListener('click', interceptClick, true)
  })
}
