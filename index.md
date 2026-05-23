---
layout: page
sidebar: false
---

<div class="mem-custom-home">
  <div class="mem-hero-center">
    <a href="/_RAW_DATA_SOURCE" title="点击进入 Wiki" class="mem-logo-link">
      <img src="/names_mem.png" alt="芒伊木" class="mem-logo" />
    </a>
    <div class="mem-links">
      <a href="/mechanics/core" class="mem-enter-button">进入 Wiki</a>
      <a href="#" target="_blank" title="Steam 创意工坊" class="mem-icon-link">
        <img src="/steam.svg" alt="Steam" />
      </a>
      <a href="#" target="_blank" title="Bilibili" class="mem-icon-link">
        <img src="/bilibili.svg" alt="Bilibili" />
      </a>
    </div>
  </div>
  <div class="mem-easter-egg">
    这是一个首页，并没有什么实质性内容。
  </div>
</div>

<style scoped>
.mem-custom-home {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #2a2a2a 0%, #151515 60%, #050505 100%);
  color: #e0e0e0;
  overflow: hidden;
  z-index: 999999; /* 保证能遮盖所有 VitePress 默认元素 */
}

.mem-hero-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  z-index: 2;
  animation: float 6s ease-in-out infinite;
}

.mem-logo-link {
  display: block;
  cursor: pointer;
  transition: transform 0.3s;
}

.mem-logo-link:hover {
  transform: scale(1.02);
}

.mem-logo {
  max-width: 85vw;
  width: 480px;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.05)) drop-shadow(0 0 30px rgba(0, 0, 0, 0.9));
  user-select: none;
  pointer-events: none;
}

.mem-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.mem-links:hover {
  opacity: 1;
}

.mem-enter-button {
  font-family: sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  color: #e0e0e0;
  text-decoration: none;
  padding: 0.6rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  margin-right: 1rem;
}

.mem-enter-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.mem-icon-link {
  display: inline-block;
  width: 40px;
  height: 40px;
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

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

</style>
