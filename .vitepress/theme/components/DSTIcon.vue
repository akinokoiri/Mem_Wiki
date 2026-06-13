<template>
  <img :src="withBase(iconSrc)" class="dst-inline-icon" :alt="resolvedIconName" :title="resolvedIconName" @error="handleImageError" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { iconMap } from './icons.js'

const props = defineProps({
  icon: String, // health, sanity, hunger, soul, etc.
  name: String, // alias for icon
})

const imageError = ref(false)

const resolvedIconName = computed(() => {
  return props.icon || props.name || 'mod'
})

const iconSrc = computed(() => {
  if (imageError.value) {
    return '/icons/icon_mod.webp'
  }
  const iconKey = resolvedIconName.value.toLowerCase().trim()
  return iconMap[iconKey] || '/icons/icon_mod.webp'
})

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.dst-inline-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  vertical-align: text-bottom;
  display: inline-block;
  margin: 0 2px;
}
</style>
