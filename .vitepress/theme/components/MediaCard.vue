<template>
  <aside :class="['media-card', 'pos-' + position]" :style="{ '--media-width': width, '--aside-push': push }">
    <div class="media-container">
      <video v-if="isVideo" :src="withBase(src)" :width="intrinsicWidth" :height="intrinsicHeight" autoplay :controls="manual" preload="auto" :aria-label="caption" loop muted playsinline class="media-content"></video>
      <button v-else-if="src" type="button" class="media-zoom-trigger" :aria-label="`放大图片：${caption || '机制演示'}`" aria-haspopup="dialog" @click="openImage">
        <img :src="withBase(src)" :alt="caption || ''" :width="intrinsicWidth" :height="intrinsicHeight" :loading="loading" class="media-content" />
        <span class="media-zoom-hint" aria-hidden="true">放大 ↗</span>
      </button>
      <slot v-else></slot>
    </div>
    <div v-if="caption" class="media-caption">
      <div class="caption-decorator"></div>
      {{ formattedCaption }}
    </div>
  </aside>
  <ClientOnly>
    <Teleport to="body">
      <dialog v-if="src && !isVideo" ref="imageDialog" class="media-lightbox" :aria-label="caption || '机制演示大图'" @click="closeOnBackdrop">
        <div class="media-lightbox-content">
          <button type="button" class="media-lightbox-close" autofocus @click="imageDialog.close()">关闭大图 ×</button>
          <img :src="withBase(src)" :alt="caption || '机制演示'" :width="intrinsicWidth" :height="intrinsicHeight" loading="lazy" />
          <p v-if="caption">{{ formattedCaption }}</p>
        </div>
      </dialog>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import { computed, ref, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'
const imageDialog = ref(null)
const openImage = () => imageDialog.value?.showModal()
const closeOnBackdrop = event => {
  if (event.target === imageDialog.value) imageDialog.value.close()
}
onBeforeUnmount(() => imageDialog.value?.close())
const props = defineProps({
  src: String,
  caption: String,
  manual: Boolean,
  intrinsicWidth: Number,
  intrinsicHeight: Number,
  loading: String,
  width: {
    type: String,
    default: '280px'
  },
  position: {
    type: String,
    default: 'right'
  },
  push: {
    type: String,
    default: '0px'
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
  width: var(--media-width, 280px);
  max-width: 100%;
  background: var(--mem-bg);
  border: 2px solid var(--mem-heading);
  border-radius: 8px;
  padding: 6px;
  box-shadow: 4px 4px 0px var(--mem-table-shadow);
  z-index: 10;
  transition: transform 0.2s ease;
  box-sizing: border-box;
}

.media-card.pos-right {
  float: right;
  clear: right;
  margin: 0 0 24px 32px;
}

.media-card.pos-left {
  float: left;
  clear: left;
  margin: 0 32px 24px 0;
}

.media-card.pos-center {
  float: none;
  clear: both;
  margin: 24px auto;
  display: block;
}

.media-card.pos-inline {
  float: none;
  margin: 0;
  display: inline-block;
  vertical-align: top;
}

.media-card:hover {
  transform: translateY(-2px);
}

.media-container {
  background: var(--mem-bg-soft);
  border: 1px solid var(--mem-border);
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

.media-zoom-trigger {
  display: block;
  position: relative;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;
}
.media-zoom-trigger:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: -3px; }
.media-zoom-hint {
  position: absolute;
  right: 6px;
  bottom: 6px;
  border-radius: 3px;
  padding: 2px 6px;
  background: rgb(22 20 15 / .85);
  color: #fffdf8;
  font-size: 11px;
  line-height: 1.6;
}
.media-lightbox {
  margin: auto;
  padding: 16px;
  max-width: calc(100vw - 32px);
  max-height: calc(100dvh - 32px);
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-shadow: 0 16px 64px #0006;
}
.media-lightbox::backdrop { background: rgb(0 0 0 / .78); }
.media-lightbox-content { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.media-lightbox-close { align-self: flex-end; min-height: 44px; padding: 8px 12px; border: 1px solid var(--vp-c-divider); border-radius: 4px; cursor: pointer; }
.media-lightbox-close:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.media-lightbox-content img { display: block; max-width: 100%; max-height: 72dvh; width: auto; height: auto; object-fit: contain; }
.media-lightbox-content p { margin: 0; max-width: 65ch; font-size: 14px; line-height: 1.6; white-space: pre-line; }

.media-caption {
  margin-top: 8px;
  text-align: center;
  font-size: 0.85em;
  color: var(--mem-heading);
  line-height: 1.4;
  padding: 0 4px;
  position: relative;
  white-space: pre-line; /* 支持换行符 */
}

.caption-decorator {
  width: 30px;
  height: 2px;
  background: var(--mem-border);
  margin: 0 auto 6px;
}

@media (max-width: 768px) {
  .media-card.pos-right,
  .media-card.pos-left,
  .media-card.pos-center,
  .media-card.pos-inline {
    float: none;
    width: 100%;
    margin: 20px 0;
  }
}
</style>
