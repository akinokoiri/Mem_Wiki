<template>
  <div 
    class="skill-node" 
    :style="nodeStyle"
    @click="handleClick"
    @dblclick="handleDoubleClick"
    @contextmenu.prevent="handleRightClick"
    @mouseenter="onHover"
    @mouseleave="onLeave"
  >
    <div class="node-content" :class="{ 'is-lock': node.isLock }">
      <img :src="withBase(`/skills/office_icon/${statusImage}.png`)" class="status-layer" />
      <img v-if="!node.isLock" :src="withBase(`/skills/${node.icon}.png`)" class="icon-layer" />
      <img v-show="isFocused" :src="withBase(`/skills/office_icon/${frameImage}.png`)" class="frame-layer" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { withBase } from 'vitepress';

const props = defineProps({
  node: Object,
  status: String,
  isFocused: Boolean
});

const emit = defineEmits(['click', 'dblclick', 'rightclick', 'hover', 'leave']);

const isHovered = ref(false);

const statusImage = computed(() => {
  const hoverSuffix = isHovered.value ? '_over' : '';
  if (props.status === 'lock_open') return 'unlocked' + hoverSuffix;
  if (props.status === 'lock_closed') return 'locked' + hoverSuffix;
  if (props.status === 'normal_unlocked') return 'selected' + hoverSuffix;
  if (props.status === 'normal_selectable') return 'selectable' + hoverSuffix;
  if (props.status === 'normal_unselected') return 'unselected' + hoverSuffix;
  return 'unselected';
});

const frameImage = computed(() => {
  return props.node.isLock ? 'frame_octagon' : 'frame';
});

const nodeStyle = computed(() => {
  // === 🎨 偏移量微调区 ===
  // 如果你需要整体移动所有技能节点以对齐手绘线，请修改这里的两个值：
  
  // 基础 X 偏移量 (原设定相当于 255.5)
  // 👉 减小此值：所有节点整体向【左】移动
  // 👉 增大此值：所有节点整体向【右】移动
  const offsetX = 205; 
  
  // 基础 Y 偏移量 (原设定相当于 240)
  // 👉 减小此值：所有节点整体向【上】移动
  // 👉 增大此值：所有节点整体向【下】移动
  const offsetY = 167;   

  // 计算出相对于 521x320 画布的实际像素位置
  const leftPx = offsetX + props.node.x;
  const topPx = offsetY - props.node.y; // 饥荒中y轴向上为正，Web中向下为正，故用减法
  
  return {
    left: `${(leftPx / 521) * 100}%`,
    top: `${(topPx / 320) * 100}%`
  };
});

const onHover = () => {
  isHovered.value = true;
  emit('hover', props.node.id);
};

const onLeave = () => {
  isHovered.value = false;
  emit('leave');
};

const handleClick = () => {
  emit('click', props.node.id);
};

const handleDoubleClick = () => {
  emit('dblclick', props.node.id);
};

const handleRightClick = () => {
  emit('rightclick', props.node.id);
};
</script>

<style scoped>
.skill-node {
  position: absolute;
  width: 6.14%;
  aspect-ratio: 1 / 1;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.node-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-layer, .icon-layer, .frame-layer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: contain;
  /* 强制覆盖 VitePress 默认的 img { max-width: 100% }，允许外框超出父容器 */
  max-width: none !important;
  max-height: none !important;
}

.status-layer {
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* 官方 Lua 源码：skillbutton:SetScale(0.8, 0.8, 1) */
.is-lock .status-layer {
  width: 80%;
  height: 80%;
}

.icon-layer {
  width: 87.5%;
  height: 87.5%;
  z-index: 2;
}

.frame-layer {
  width: 125%;
  height: 125%;
  z-index: 3;
  pointer-events: none;
}
</style>
