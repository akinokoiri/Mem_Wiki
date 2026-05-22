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
      <div v-else class="skill-info" :key="skillId">
        <!-- 后续任务完善具体的技能信息展示 -->
        <p>选中技能: {{ skillId }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  skillId: {
    type: String,
    default: null
  }
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
</style>
