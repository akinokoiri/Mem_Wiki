<template>
  <span class="dst-noun" :class="iconClass" :title="`模组词条: ${nounText}`">
    <img :src="withBase(iconSrc)" class="noun-icon" @error="handleImageError" />
    <slot></slot>
  </span>
</template>

<script setup>
import { computed, useSlots, ref } from 'vue'
import { withBase } from 'vitepress'

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

const iconMap = {
  health: '/icon_health.png',
  sanity: '/icon_sanity.png',
  hunger: '/icon_hunger.png',
  soul: '/icon_soul.png',
  beast: '/icon_mem_beast_mode.png',
  ghost: '/icon_mem_ghost_mode.png',
  collar: '/icon_mem_xq.png',
  'collar-lv2': '/icon_mem_xq_lv2.png',
  'collar-lv3': '/icon_mem_xq_lv3.png',
  'collar-lv4-an': '/icon_mem_xq_lv4_an.png',
  'collar-lv4-yue': '/icon_mem_xq_lv4_yue.png',
  repair: '/icon_mem_repair.png',
  'tomb-upgrader': '/icon_mem_tomb_upgrader.png',
  corpse: '/icon_mem_corpse.png',
  'shadow-gestalt': '/icon_mem_shadow_gestalt.png',
  mod: '/icon_mod.png'
}

const iconSrc = computed(() => {
  if (imageError.value) {
    return '/icon_mod.png'
  }
  const iconKey = props.icon ? props.icon.toLowerCase().trim() : 'mod'
  return iconMap[iconKey] || '/icon_mod.png'
})

const iconClass = computed(() => `dst-${props.icon ? props.icon.toLowerCase().trim() : 'mod'}`)

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
  gap: 6px;
  font-weight: 600;
  padding: 2px 8px;
  margin: 0 4px;
  border-radius: 6px;
  
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

.dst-noun:hover {
  background: linear-gradient(135deg, hsla(var(--dst-theme-h), var(--dst-theme-s), var(--dst-theme-l), 0.1), hsla(var(--dst-theme-h), var(--dst-theme-s), var(--dst-theme-l), 0.25));
  border-color: hsla(var(--dst-theme-h), var(--dst-theme-s), var(--dst-theme-l), 0.5);
  transform: translateY(-1.5px);
  box-shadow: 0 4px 12px hsla(var(--dst-theme-h), var(--dst-theme-s), var(--dst-theme-l), 0.35);
}

.noun-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  vertical-align: middle;
  transition: transform 0.25s ease;
}

.dst-noun:hover .noun-icon {
  transform: translateY(-1px) scale(1.1);
}

/* 基于 DST 经典的专属属性渐变色彩体系 */
.dst-health { --dst-theme-h: 0; --dst-theme-s: 100%; --dst-theme-l: 65%; }
.dst-sanity { --dst-theme-h: 48; --dst-theme-s: 100%; --dst-theme-l: 60%; }
.dst-hunger { --dst-theme-h: 30; --dst-theme-s: 100%; --dst-theme-l: 60%; }
.dst-soul   { --dst-theme-h: 275; --dst-theme-s: 96%; --dst-theme-l: 75%; }
.dst-beast  { --dst-theme-h: 46; --dst-theme-s: 90%; --dst-theme-l: 47%; }
.dst-ghost  { --dst-theme-h: 215; --dst-theme-s: 25%; --dst-theme-l: 65%; }
.dst-mod    { --dst-theme-h: 199; --dst-theme-s: 92%; --dst-theme-l: 60%; }

/* 特殊封印项圈系列 */
.dst-collar, .dst-collar-lv2, .dst-collar-lv3, .dst-collar-lv4-an, .dst-collar-lv4-yue {
  --dst-theme-h: 189; --dst-theme-s: 94%; --dst-theme-l: 37%;
}

/* 新增映射的色彩支持 */
.dst-repair         { --dst-theme-h: 142; --dst-theme-s: 71%; --dst-theme-l: 45%; }
.dst-tomb-upgrader  { --dst-theme-h: 258; --dst-theme-s: 90%; --dst-theme-l: 66%; }
.dst-corpse         { --dst-theme-h: 0; --dst-theme-s: 0%; --dst-theme-l: 55%; }
.dst-shadow-gestalt { --dst-theme-h: 270; --dst-theme-s: 50%; --dst-theme-l: 45%; }
</style>
