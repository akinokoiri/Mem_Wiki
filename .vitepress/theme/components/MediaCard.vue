<template>
  <aside class="media-card" :style="{ width: width }">
    <div class="media-container">
      <video v-if="isVideo" :src="withBase(src)" autoplay loop muted playsinline class="media-content"></video>
      <img v-else-if="src" :src="withBase(src)" :alt="caption" class="media-content" />
      <slot v-else></slot>
    </div>
    <div v-if="caption" class="media-caption">
      <div class="caption-decorator"></div>
      {{ formattedCaption }}
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
const props = defineProps({
  src: String,
  caption: String,
  width: {
    type: String,
    default: '280px'
  }
})

const isVideo = computed(() => {
  return props.src && (props.src.endsWith('.mp4') || props.src.endsWith('.webm'))
})

const formattedCaption = computed(() => {
  if (!props.caption) return ''
  return props.caption.replace(/\\n/g, '\n') // 将字符串 "\n" 转换为真正的换行符
})
</script>

<style scoped>
.media-card {
  float: right;
  clear: right;
  margin: 0 0 24px 32px;
  background: #fdfaf5;
  border: 2px solid #5c3a21;
  border-radius: 8px;
  padding: 6px;
  box-shadow: 4px 4px 0px rgba(92, 58, 33, 0.1);
  z-index: 10;
  transition: transform 0.2s ease;
  box-sizing: border-box;
}

.media-card:hover {
  transform: translateY(-2px);
}

.media-container {
  background: #fff;
  border: 1px solid #dcd1ba;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
  position: relative;
}

.media-content {
  max-width: 100%;
  height: auto;
  display: block;
}

.media-caption {
  margin-top: 8px;
  text-align: center;
  font-size: 0.85em;
  color: #5c3a21;
  line-height: 1.4;
  padding: 0 4px;
  position: relative;
  white-space: pre-line; /* 支持换行符 */
}

.caption-decorator {
  width: 30px;
  height: 2px;
  background: #dcd1ba;
  margin: 0 auto 6px;
}

@media (max-width: 768px) {
  .media-card {
    float: none;
    width: 100% !important;
    margin: 20px 0;
  }
}
</style>
