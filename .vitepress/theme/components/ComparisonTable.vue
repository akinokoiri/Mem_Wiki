<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({ labelId: { type: String, required: true } })
const region = ref(null)
const scrolled = ref(false)
const more = ref(false)
let observer
const updateEdges = () => {
  const el = region.value
  if (!el) return
  scrolled.value = el.scrollLeft > 1
  more.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}
onMounted(() => {
  observer = new ResizeObserver(updateEdges)
  observer.observe(region.value)
  updateEdges()
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="archive-table" :class="{ 'is-scrolled': scrolled, 'has-more': more }">
    <div ref="region" class="archive-table-scroll" role="region" :aria-labelledby="labelId" tabindex="0" @scroll.passive="updateEdges">
      <slot />
    </div>
  </div>
</template>
