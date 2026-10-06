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
    <p class="mem-home-intro">饥荒：联机版 · 芒伊木模组资料库</p>
    <div class="mem-links">
      <!-- 进入 Wiki 的入口 -->
      <a href="/mechanics/lite_draft" title="极速上手：玩法与开局建议" class="mem-text-link primary">
        极速上手
      </a>
      <a href="/mechanics/core" title="完整详细 WIKI 词条" class="mem-text-link secondary">
        角色机制
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
  height: 100dvh;
  min-height: 100svh;
  padding: 64px 24px 96px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #2a2a2a 0%, #151515 60%, #050505 100%);
  color: #e0e0e0;
  overflow-y: auto;
  font-family: "Noto Sans SC Variable", system-ui, sans-serif;
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
  width: min(100%, 760px);
  gap: 2rem;
  z-index: 2;
  animation: float 6s ease-in-out infinite;
}

.mem-home-intro {
  margin: 0;
  color: #c2b9a9;
  font-size: 14px;
  letter-spacing: .08em;
  text-align: center;
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
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
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
  font-family: inherit;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}

.mem-text-link.primary {
  color: #9dd3c8;
  border-color: #6fb8ae80;
  background: #6fb8ae14;
}

.mem-text-link.primary:hover {
  color: #fff;
  border-color: #9dd3c8;
  background: #6fb8ae30;
  box-shadow: 0 0 20px #6fb8ae25;
}

.mem-text-link.secondary {
  color: #d7cfc1;
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
  width: 44px;
  height: 44px;
  padding: 6px;
  transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.2s;
  filter: brightness(0) invert(.8);
}

.mem-icon-link:hover {
  transform: scale(1.15) translateY(-2px);
  filter: brightness(0) invert(1) drop-shadow(0 5px 10px rgba(0,0,0,0.5));
}

.mem-links a:focus-visible { outline: 2px solid #9dd3c8; outline-offset: 5px; }

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

@media (max-width: 480px) {
  .mem-hero-center { gap: 24px; }
  .mem-links { gap: 12px; max-width: 280px; }
  .mem-divider-vertical { display: none; }
  .mem-text-link { justify-content: center; flex: 1 1 110px; }
  .mem-easter-egg { left: 24px; bottom: 12px; text-align: right; }
  .mem-netlify-badge { bottom: 44px; }
}
@media (prefers-reduced-motion: reduce) {
  .mem-hero-center { animation: none; }
  .mem-custom-home * { transition: none; }
}
</style>
