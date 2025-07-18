<template>
  <div v-if="visible" id="progressContainer">
    <div id="progressBar">
      <div id="progressFill" :style="{ width: progress + '%' }"></div>
    </div>
    <p>正在加载数据... {{ progress.toFixed(0) }}%</p>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
/* 进度条 */
#progressContainer {
  margin: 1.5rem 0;
  text-align: center;
}

#progressBar {
  width: 100%;
  height: 12px;
  background: #e0e0e0;
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 0.5rem;
}

#progressFill {
  height: 100%;
  background: var(--primary);
  border-radius: var(--radius);
  transition: width 0.3s ease;
}
</style>