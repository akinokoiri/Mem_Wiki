<template>
  <img :src="withBase(iconSrc)" class="dst-inline-icon" :alt="icon" :title="icon" @error="handleImageError" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { iconMap } from './icons.js'

const props = defineProps({
  icon: String, // health, sanity, hunger, soul, etc.
})

const imageError = ref(false)

const iconSrc = computed(() => {
  if (imageError.value) {
    return '/icons/icon_mod.webp'
  }
  const iconKey = props.icon ? props.icon.toLowerCase().trim() : 'mod'
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
