---
layout: page
sidebar: false
---

<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.documentElement.classList.add('is-home')
})

onUnmounted(() => {
  document.documentElement.classList.remove('is-home')
})
</script>

<div class="mem-custom-home">
  <div class="mem-hero-center">
    <img src="/names_mem.webp" alt="芒伊木" class="mem-logo" />
    <div class="mem-links">
      <!-- 进入 Wiki 的入口 -->
      <a href="/mechanics/lite_draft" title="极速省流版人物介绍" class="mem-text-link primary">
        极速上手「省流版」
      </a>
      <a href="/mechanics/core" title="完整详细 WIKI 词条" class="mem-text-link secondary">
        完整详细 WIKI
      </a>
      <div class="mem-divider-vertical"></div>
      <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3734900216" target="_blank" title="Steam 创意工坊" class="mem-icon-link">
        <img src="/steam.svg" alt="Steam" />
      </a>
      <a href="https://space.bilibili.com/415674" target="_blank" title="Bilibili" class="mem-icon-link">
        <img src="/bilibili.svg" alt="Bilibili" />
      </a>
    </div>
  </div>
  <div class="mem-easter-egg">
    这是一个首页，并没有什么实质性内容。如果你看到了这个说明，说明你是大笨蛋。
  </div>
  <a href="https://www.netlify.com" target="_blank" rel="noopener" class="mem-netlify-badge" title="Deploys by Netlify">
    <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" />
  </a>
</div>

<style>
/* 仅在首页挂载时（html 标签带有 .is-home 类）才全局隐藏侧边栏和顶栏，避免 SPA 路由污染 */
.is-home .VPNav,
.is-home .VPSidebar,
.is-home .VPLocalNav {
  display: none !important;
}

/* 仅在首页覆盖 VitePress 默认的内容区 padding，实现真正的全屏 */
.is-home .VPDoc {
  padding: 0 !important;
}

.is-home .vp-doc {
  margin: 0 !important;
  max-width: none !important;
}

.is-home .vp-doc > div {
  margin: 0 !important;
}
</style>

<style scoped>
.mem-custom-home {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #2a2a2a 0%, #151515 60%, #050505 100%);
  color: #e0e0e0;
  overflow: hidden;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.mem-hero-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  z-index: 2;
  animation: float 6s ease-in-out infinite;
}

.mem-logo {
  max-width: 85%;
  width: 480px;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.05)) drop-shadow(0 0 30px rgba(0, 0, 0, 0.9));
  user-select: none;
  pointer-events: none;
}

.mem-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  opacity: 0.85;
  transition: opacity 0.3s;
}

.mem-links:hover {
  opacity: 1;
}

.mem-text-link {
  font-size: 0.95rem;
  font-weight: bold;
  text-decoration: none;
  padding: 0.5rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 1px;
  font-family: serif;
}

.mem-text-link.primary {
  color: #c084fc;
  border-color: rgba(192, 132, 252, 0.35);
  background: rgba(192, 132, 252, 0.04);
}

.mem-text-link.primary:hover {
  color: #fff;
  border-color: #c084fc;
  background: rgba(192, 132, 252, 0.15);
  box-shadow: 0 0 20px rgba(192, 132, 252, 0.35);
}

.mem-text-link.secondary {
  color: #a0a0a0;
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.02);
}

.mem-text-link.secondary:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.mem-divider-vertical {
  width: 1px;
  height: 22px;
  background-color: rgba(255, 255, 255, 0.12);
  margin: 0 0.5rem;
}

.mem-icon-link {
  display: inline-block;
  width: 36px;
  height: 36px;
  transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.2s;
  filter: grayscale(100%) brightness(0.6) sepia(20%);
}

.mem-icon-link:hover {
  transform: scale(1.15) translateY(-2px);
  filter: grayscale(0%) brightness(1.2) drop-shadow(0 5px 10px rgba(0,0,0,0.5));
}

.mem-icon-link img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.mem-easter-egg {
  position: absolute;
  right: 24px;
  bottom: 24px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.08);
  font-family: sans-serif;
  user-select: none;
  transition: color 0.4s;
  cursor: help;
  z-index: 10;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
}

.mem-easter-egg:hover {
  color: rgba(255, 255, 255, 0.5);
}

.mem-netlify-badge {
  position: absolute;
  left: 24px;
  bottom: 24px;
  opacity: 0.5;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  z-index: 10;
  filter: grayscale(100%) brightness(0.8);
}

.mem-netlify-badge:hover {
  opacity: 1;
  transform: translateY(-2px);
  filter: grayscale(0%) brightness(1) drop-shadow(0 5px 10px rgba(0,0,0,0.5));
}

.mem-netlify-badge img {
  height: 32px;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}
</style>
