<template>
  <div class="skill-detail-panel">
    <transition name="fade-slide" mode="out-in">
      <div v-if="!skillId" class="default-guide" key="default">
        <div class="guide-content">
          <h3>操作介绍</h3>
          <ul>
            <li><strong>双击</strong> 高亮的可用技能节点</li>
            <li>或选中技能后点击 <u>学习</u></li>
            <li><strong>右键</strong> 点击已解锁的技能节点（前提是无后置依赖）进行退点</li>
            <li>或点击 <u>重置洞察</u> 来清空所有加点</li>
          </ul>
        </div>
      </div>
      <div v-else-if="skillLore" class="skill-info" :key="skillId">
        <!-- 支持单图或多图模式 -->
        <template v-if="skillLore.media">
          <MediaCard 
            v-if="typeof skillLore.media === 'string'"
            :src="skillLore.media" 
            :caption="skillLore.caption" 
            width="100%"
          />
          <div v-else-if="Array.isArray(skillLore.media)" class="media-gallery">
            <MediaCard 
              v-for="(img, index) in skillLore.media" 
              :key="index"
              :src="img.src" 
              :caption="img.caption" 
              width="100%"
            />
          </div>
        </template>
        <div class="rich-text" v-if="skillLore.text">
          <AutoText :text="skillLore.text" />
        </div>
      </div>
      
      <!-- 未配置的技能，面板显示为空 -->
      <div v-else class="skill-info empty-state" :key="'empty-' + skillId">
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { SKILL_LORES } from '../../data/skillLore.js';
import AutoText from './AutoText.vue';

const props = defineProps({
  skillId: {
    type: String,
    default: null
  }
});

const skillLore = computed(() => {
  return props.skillId ? SKILL_LORES[props.skillId] : null;
});
</script>

<style scoped>
.skill-detail-panel {
  width: 100%;
  height: 100%;
  min-height: 460px; /* 对齐左侧模拟器的基础比例高度 */
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  box-sizing: border-box;
}
.guide-content {
  color: #333;
}
.guide-content h3 {
  margin-top: 0;
  color: #5c3a21;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.rich-text {
  margin-top: 15px;
  color: #3a2512;
  line-height: 1.6;
  font-size: 14.5px;
}
.rich-text p {
  margin: 0;
}
.media-gallery {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
