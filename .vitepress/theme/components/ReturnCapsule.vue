<script setup>
import { ref, shallowRef, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter, useData } from 'vitepress'

const router = useRouter()
const { frontmatter } = useData()
const isMobile = ref(false)
const dockTarget = shallowRef(null)
let mobileQuery
const updateMobile = () => { isMobile.value = mobileQuery.matches }
watch([isMobile, () => frontmatter.value.pageClass], async () => {
  await nextTick()
  dockTarget.value = isMobile.value && String(frontmatter.value.pageClass || '').split(/\s+/).includes('ink-archive')
    ? document.querySelector('.VPLocalNav') : null
}, { flush: 'post' })

const isVisible = ref(false)
const returnTitle = ref('')
const returnUrl = ref('')

const checkStorage = () => {
  if (typeof window !== 'undefined') {
    const title = sessionStorage.getItem('mem_wiki_return_text')
    const url = sessionStorage.getItem('mem_wiki_return_url')
    
    if (title && url) {
      returnTitle.value = title
      returnUrl.value = url
      isVisible.value = true
    } else {
      isVisible.value = false
    }
  }
}

const goBack = () => {
  if (returnUrl.value) {
    router.go(returnUrl.value)
    dismiss()
  }
}

const dismiss = () => {
  sessionStorage.removeItem('mem_wiki_return_text')
  sessionStorage.removeItem('mem_wiki_return_url')
  isVisible.value = false
}

onMounted(() => {
  mobileQuery = window.matchMedia('(max-width: 639px)')
  mobileQuery.addEventListener('change', updateMobile)
  updateMobile()
  checkStorage()
  window.addEventListener('mem-wiki-route-changed', checkStorage)
})

onUnmounted(() => {
  mobileQuery?.removeEventListener('change', updateMobile)
  window.removeEventListener('mem-wiki-route-changed', checkStorage)
})
</script>

<template>
  <Teleport :to="dockTarget" :disabled="!dockTarget">
  <Transition name="capsule">
    <div v-if="isVisible" class="return-capsule" :class="{ 'is-docked': dockTarget }" title="返回上一阅读位置">
      <button type="button" class="return-capsule-main" :aria-label="`↶ 返回上文：${returnTitle}`" :title="`返回上文：${returnTitle}`" @click="goBack">
        <span class="return-capsule-icon">↶</span>
        <span class="return-capsule-text">{{ dockTarget ? '返回上文' : `返回上文：${returnTitle}` }}</span>
      </button>
      <div class="return-capsule-divider" aria-hidden="true"></div>
      <button type="button" class="return-capsule-close" @click.stop="dismiss" aria-label="关闭返回上文" title="关闭并留在当前页面">×</button>
    </div>
  </Transition>
  </Teleport>
</template>
