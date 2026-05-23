<template>
  <component 
    :is="targetLink ? 'a' : 'span'"
    :href="targetLink ? withBase(targetLink) : undefined"
    class="dst-noun" 
    :class="{ 'has-link': targetLink }"
    :style="themeStyle" 
    :title="hoverTitle"
  >
    <img :src="withBase(iconSrc)" class="noun-icon" @error="handleImageError" />
    <slot></slot>
  </component>
</template>

<script setup>
import { computed, useSlots, ref } from 'vue'
import { withBase } from 'vitepress'
import { iconMap, colorMap, linkMap, officialTerms } from './icons.js'

const props = defineProps({
  icon: String, // health, sanity, hunger, soul, beast, ghost, collar, etc.
})

const slots = useSlots()
const imageError = ref(false)

const extractText = (vnodes) => {
  if (!vnodes) return ''
  let text = ''
  for (const vnode of vnodes) {
    if (typeof vnode === 'string') {
      text += vnode
    } else if (typeof vnode.children === 'string') {
      text += vnode.children
    } else if (Array.isArray(vnode.children)) {
      text += extractText(vnode.children)
    } else if (typeof vnode.children === 'object' && vnode.children?.default) {
      text += extractText(vnode.children.default())
    }
  }
  return text
}

const nounText = computed(() => {
  if (slots.default) {
    return extractText(slots.default())
  }
  return ''
})

const targetLink = computed(() => {
  return linkMap[nounText.value] || null
})

const hoverTitle = computed(() => {
  if (officialTerms.includes(nounText.value)) {
    return '官方词条'
  }
  return `模组词条: ${nounText.value}`
})

const iconSrc = computed(() => {
  if (imageError.value) {
    return '/icons/icon_mod.png'
  }
  const iconKey = props.icon ? props.icon.toLowerCase().trim() : 'mod'
  return iconMap[iconKey] || '/icons/icon_mod.png'
})

const themeStyle = computed(() => {
  const iconKey = props.icon ? props.icon.toLowerCase().trim() : 'mod'
  const colors = colorMap[iconKey] || colorMap['mod']
  return {
    '--dst-theme-h': colors.h,
    '--dst-theme-s': colors.s + '%',
    '--dst-theme-l': colors.l + '%'
  }
})

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.dst-noun {
  --dst-theme-h: 199;
  --dst-theme-s: 92%;
  --dst-theme-l: 60%;
  
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  font-size: 0.9em;
  padding: 1px 6px;
  margin: 0 2px;
  border-radius: 4px;
  
  /* Glassmorphism & HSL Gradient variables */
  background: linear-gradient(135deg, hsla(var(--dst-theme-h), var(--dst-theme-s), var(--dst-theme-l), 0.05), hsla(var(--dst-theme-h), var(--dst-theme-s), var(--dst-theme-l), 0.15));
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid hsla(var(--dst-theme-h), var(--dst-theme-s), var(--dst-theme-l), 0.25);
  color: hsl(var(--dst-theme-h), var(--dst-theme-s), var(--dst-theme-l));
  
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  vertical-align: middle;
  cursor: help;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.dst-noun.has-link {
  cursor: pointer;
  text-decoration: none;
}

.dst-noun:hover {
  background: linear-gradient(135deg, hsla(var(--dst-theme-h), var(--dst-theme-s), var(--dst-theme-l), 0.1), hsla(var(--dst-theme-h), var(--dst-theme-s), var(--dst-theme-l), 0.25));
  border-color: hsla(var(--dst-theme-h), var(--dst-theme-s), var(--dst-theme-l), 0.5);
  transform: translateY(-1.5px);
  box-shadow: 0 4px 12px hsla(var(--dst-theme-h), var(--dst-theme-s), var(--dst-theme-l), 0.35);
}

.noun-icon {
  width: 15px;
  height: 15px;
  object-fit: contain;
  vertical-align: middle;
  transition: transform 0.25s ease;
}

.dst-noun:hover .noun-icon {
  transform: translateY(-1px) scale(1.1);
}
</style>
