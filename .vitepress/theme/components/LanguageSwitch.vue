<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, withBase } from 'vitepress'
import { counterpartUrl, isEnglishPath } from '../../data/locale-routing.js'
const props = defineProps({ homeOnly: Boolean })
const route = useRoute()
const current = ref(route.path)
const sync = () => { current.value = location.pathname + location.search + location.hash }
watch(() => route.path, () => { current.value = route.path; if (typeof location !== 'undefined') sync() })
onMounted(() => { sync(); window.addEventListener('hashchange', sync); window.addEventListener('popstate', sync) })
onUnmounted(() => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync) })
const english = computed(() => isEnglishPath(route.path))
const home = computed(() => /^\/(?:en\/)?(?:index(?:\.html)?)?$/.test(route.path))
const href = computed(() => withBase(counterpartUrl(current.value)))
// Read the actual URL at activation, including hashes changed with replaceState.
function prepare(event) { sync(); event.currentTarget.href = withBase(counterpartUrl(current.value)) }
</script>
<template>
  <a v-if="!homeOnly || home" class="wiki-language-switch" :class="{ 'wiki-language-home': homeOnly }"
    :href="href" :lang="english ? 'zh-CN' : 'en'" :hreflang="english ? 'zh-CN' : 'en'"
    :aria-label="english ? '切换到中文，保留当前页面' : 'Switch to English on this page'"
    @pointerenter="sync" @focus="sync" @pointerdown="prepare" @keydown.enter="prepare" @click.capture="prepare">
    {{ english ? '中文' : 'EN' }}
  </a>
</template>
<style>
.wiki-language-switch { display: inline-flex; flex: 0 0 auto; align-items: center; justify-content: center; min-width: 40px; min-height: 40px; padding: 0 10px; color: var(--vp-c-text-1); font-size: 13px; font-weight: 600; border: 1px solid var(--vp-c-divider); border-radius: 4px; margin-left: 8px; }
.wiki-language-switch:hover { color: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); }
.wiki-language-switch:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.wiki-language-home { position: fixed; z-index: 10000; top: 20px; right: 24px; background: var(--vp-c-bg); }
.VPNavBarTranslations, .VPNavScreenTranslations, .VPNavBarExtra .group.translations { display: none !important; }
</style>
