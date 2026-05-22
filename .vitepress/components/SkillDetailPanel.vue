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
      <div v-else-if="AsyncDesc" class="skill-info" :key="skillId">
        <component :is="AsyncDesc" />
      </div>
      
      <!-- 未配置的技能，面板显示为空 -->
      <div v-else class="skill-info empty-state" :key="'empty-' + skillId">
      </div>
    </transition>
  </div>
</template>

<script setup>
import { defineAsyncComponent, shallowRef, watch } from 'vue';

const props = defineProps({
  skillId: {
    type: String,
    default: null
  }
});

const AsyncDesc = shallowRef(null);

watch(() => props.skillId, (newId) => {
  if (newId) {
    AsyncDesc.value = defineAsyncComponent(() => 
      import(`../../mechanics/skills_desc/${newId}.md`).catch(() => {
        // 如果文件不存在，返回空渲染
        return { render: () => null };
      })
    );
  } else {
    AsyncDesc.value = null;
  }
}, { immediate: true });
</script>

<style scoped>
.skill-detail-panel {
  width: 100%;
  min-height: 180px; /* 改为较小的最小高度，让面板可以自适应收缩 */
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

/* 强制重置 MediaCard 的浮动和外边距，防止撑破容器 */
.skill-info :deep(.media-card) {
  float: none;
  margin: 0 0 20px 0;
  width: 100% !important;
}
</style>
