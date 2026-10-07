<template>
  <Teleport to="body">
    <aside v-if="preview" ref="panel" class="term-preview" :style="position"
      role="dialog" :aria-label="`${previewLabel}: ${t('词条预览', 'Term preview')}`"
      @pointerenter="cancelClose" @pointerleave="scheduleClose"
      @focusin="cancelClose" @focusout="onFocusOut">
      <div class="term-preview-heading">
        <strong>{{ previewLabel }}</strong>
        <button type="button" :aria-label="t('关闭词条预览', 'Close term preview')" @click="dismiss">×</button>
      </div>
      <p id="term-preview-summary">{{ previewDescription }}</p>
      <a v-if="preview.href" :href="withBase(localizeLink(preview.href))" @click="followLink">{{ t('查看详情', 'View details') }} <span aria-hidden="true">→</span></a>
    </aside>
  </Teleport>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, withBase } from 'vitepress'
import { computed, watch } from 'vue'
import { useWikiLocale } from '../../data/locale.js'
import { termTranslations, termDescriptionsEn } from '../../data/terms-en.js'
import { aliasMap } from './icons.js'
const { isEnglish, t, localizeLink } = useWikiLocale()
import { getTermPreview } from '../../data/term-previews.js'
import { TERM_PREVIEW_EVENT } from '../term-preview-events.js'

const route = useRoute()
const preview = ref(null)
const previewLabel = computed(() => isEnglish.value ? termTranslations[preview.value?.term] || preview.value?.term : t(preview.value?.term))
const previewDescription = computed(() => isEnglish.value ? termDescriptionsEn[preview.value?.term] || termDescriptionsEn[aliasMap[preview.value?.term]] || preview.value?.description : preview.value?.description)
const panel = ref(null)
const position = ref({})
let anchor = null
let openTimer = null
let closeTimer = null
let pointerInside = false
let suppressFocus = false

const findTerm = target => target instanceof Element ? target.closest('[data-term-preview]') : null
const cancelClose = () => { clearTimeout(closeTimer); closeTimer = null }
const hide = () => {
  clearTimeout(openTimer)
  cancelClose()
  preview.value = null
  anchor?.removeAttribute('aria-describedby')
  anchor = null
  pointerInside = false
}
const dismiss = () => {
  const previous = anchor
  hide()
  suppressFocus = true
  previous?.focus({ preventScroll: true })
  suppressFocus = false
}
const scheduleClose = () => {
  clearTimeout(openTimer)
  cancelClose()
  closeTimer = setTimeout(() => {
    if (!pointerInside && !panel.value?.contains(document.activeElement) && document.activeElement !== anchor) hide()
  }, 160)
}
const updatePosition = () => {
  if (!anchor || !panel.value) return
  const bounds = anchor.getBoundingClientRect()
  const width = panel.value.offsetWidth
  const height = panel.value.offsetHeight
  const viewport = window.visualViewport
  const leftEdge = viewport?.offsetLeft || 0
  const topEdge = viewport?.offsetTop || 0
  const rightEdge = leftEdge + (viewport?.width || window.innerWidth)
  const bottomEdge = topEdge + (viewport?.height || window.innerHeight)
  const left = Math.max(leftEdge + 12, Math.min(bounds.left, rightEdge - width - 12))
  const below = bounds.bottom + 8
  const top = below + height <= bottomEdge - 12 ? below : Math.max(topEdge + 12, bounds.top - height - 8)
  position.value = { left: `${left}px`, top: `${top}px` }
}
const show = async element => {
  clearTimeout(openTimer)
  cancelClose()
  const definition = getTermPreview(element.dataset.termPreview)
  if (!definition) return
  if (anchor !== element) anchor?.removeAttribute('aria-describedby')
  anchor = element
  anchor.setAttribute('aria-describedby', 'term-preview-summary')
  preview.value = definition
  await nextTick()
  updatePosition()
}
const onPointerOver = event => {
  if (event.pointerType === 'touch') return
  const element = findTerm(event.target)
  if (!element || element.contains(event.relatedTarget)) return
  cancelClose()
  clearTimeout(openTimer)
  pointerInside = true
  openTimer = setTimeout(() => show(element), 240)
}
const onPointerOut = event => {
  const element = findTerm(event.target)
  if (!element || element.contains(event.relatedTarget)) return
  pointerInside = false
  if (panel.value?.contains(event.relatedTarget)) return
  scheduleClose()
}
const onFocusIn = event => {
  if (suppressFocus) return
  const element = findTerm(event.target)
  if (element) show(element)
}
const onFocusOut = event => {
  if (panel.value?.contains(event.relatedTarget) || event.relatedTarget === anchor) return
  scheduleClose()
}
const onPointerDown = event => {
  if (preview.value && !panel.value?.contains(event.target) && !findTerm(event.target)) hide()
}
const onPreviewRequest = event => show(event.detail)
const followLink = event => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  if (anchor?.tagName === 'A') {
    event.preventDefault()
    const original = anchor
    hide()
    // Use the article link so the existing return-to-reading-position feature still works.
    original.click()
  } else hide()
}
const onKeyDown = event => { if (event.key === 'Escape' && preview.value) dismiss() }
const onScroll = event => {
  if (panel.value?.contains(event.target)) return
  // Keyboard focus can scroll a link into view after opening its preview.
  if (anchor === document.activeElement) {
    const bounds = anchor.getBoundingClientRect()
    if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
      updatePosition()
      return
    }
  }
  hide()
}

watch(() => route.path, hide)
onMounted(() => {
  document.addEventListener('pointerover', onPointerOver)
  document.addEventListener('pointerout', onPointerOut)
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('focusin', onFocusIn)
  document.addEventListener('focusout', onFocusOut)
  window.addEventListener(TERM_PREVIEW_EVENT, onPreviewRequest)
  document.addEventListener('keydown', onKeyDown)
  window.addEventListener('scroll', onScroll, true)
  window.addEventListener('resize', hide)
})
onUnmounted(() => {
  hide()
  document.removeEventListener('pointerover', onPointerOver)
  document.removeEventListener('pointerout', onPointerOut)
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('focusin', onFocusIn)
  document.removeEventListener('focusout', onFocusOut)
  window.removeEventListener(TERM_PREVIEW_EVENT, onPreviewRequest)
  document.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('scroll', onScroll, true)
  window.removeEventListener('resize', hide)
})
</script>

<style>
.term-preview {
  position: fixed;
  z-index: 100;
  width: min(320px, calc(100vw - 24px));
  max-height: min(360px, calc(100dvh - 24px));
  overflow-y: auto;
  padding: 16px 18px;
  border: 1px solid var(--ink-line, var(--vp-c-divider));
  border-radius: 4px;
  background: var(--ink-paper, var(--vp-c-bg));
  color: var(--ink-text, var(--vp-c-text-1));
  box-shadow: 0 8px 28px rgb(0 0 0 / .16);
  font: 14px / 1.65 var(--ink-font, var(--vp-font-family-base));
}
.term-preview-heading { display: flex; align-items: start; justify-content: space-between; gap: 16px; }
.term-preview-heading strong { font-size: 16px; font-weight: 700; }
.term-preview-heading button { color: var(--ink-muted, var(--vp-c-text-2)); padding: 0 5px; font-size: 20px; line-height: 1.2; cursor: pointer; }
.term-preview p { margin: 8px 0 12px; }
.term-preview a { color: var(--ink-link, var(--vp-c-brand-1)); text-decoration: underline; text-underline-offset: 3px; }
.term-preview :is(a, button):focus-visible { outline: 2px solid var(--ink-link, var(--vp-c-brand-1)); outline-offset: 3px; }
</style>
