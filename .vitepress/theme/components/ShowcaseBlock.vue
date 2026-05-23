<template>
  <div class="showcase-block" :class="{ reverse }">
    <div class="showcase-text">
      <slot></slot>
    </div>
    <div class="showcase-media">
      <video v-if="video" :src="withBase(video)" autoplay loop muted playsinline class="media-video"></video>
      <div v-else class="media-placeholder">视频演示待补充</div>
    </div>
  </div>
</template>

<script setup>
import { withBase } from 'vitepress'
defineProps({
  video: String,
  reverse: Boolean
})
</script>

<style scoped>
.showcase-block {
  display: flex;
  align-items: center;
  gap: 32px;
  margin: 40px 0;
}
.showcase-block.reverse {
  flex-direction: row-reverse;
}
.showcase-text {
  flex: 1;
  min-width: 0;
}
.showcase-media {
  flex: 1;
  min-width: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 20px var(--mem-table-shadow);
  background: var(--mem-bg);
  border: 2px solid var(--mem-heading);
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 16 / 9;
}
.media-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.media-placeholder {
  color: var(--mem-text-2);
  font-size: 0.9em;
  padding: 40px;
}
@media (max-width: 768px) {
  .showcase-block, .showcase-block.reverse {
    flex-direction: column;
    gap: 16px;
    margin: 24px 0;
  }
}
</style>
