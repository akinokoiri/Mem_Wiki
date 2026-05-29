<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

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
  checkStorage()
  window.addEventListener('mem-wiki-route-changed', checkStorage)
})

onUnmounted(() => {
  window.removeEventListener('mem-wiki-route-changed', checkStorage)
})
</script>

<template>
  <Transition name="capsule">
    <div v-if="isVisible" class="return-capsule" title="返回上一阅读位置">
      <div class="return-capsule-main" @click="goBack">
        <span class="return-capsule-icon">↶</span>
        <span class="return-capsule-text">返回上文：{{ returnTitle }}</span>
      </div>
      <div class="return-capsule-divider"></div>
      <div class="return-capsule-close" @click.stop="dismiss" title="关闭并留在当前页面">×</div>
    </div>
  </Transition>
</template>
