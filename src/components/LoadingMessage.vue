<template>
  <div v-if="!loaded || loading || error" class="loading-container">
    <el-card class="loading-card" shadow="hover">
      <div v-if="loading" class="loading-content">
        <el-icon class="loading-icon" :size="48">
          <Loading />
        </el-icon>
        <p class="loading-text">正在加载字典数据...</p>
      </div>
      
      <div v-else-if="error" class="error-content">
        <el-icon class="error-icon" :size="48" color="#f56c6c">
          <Warning />
        </el-icon>
        <p class="error-text">{{ error }}</p>
        <el-button 
          type="primary" 
          @click="$emit('retry')" 
          class="retry-button"
        >
          <el-icon><Refresh /></el-icon>
          重试
        </el-button>
      </div>
      
      <div v-else class="loading-content">
        <el-icon class="loading-icon" :size="48">
          <Loading />
        </el-icon>
        <p class="loading-text">准备中...</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { Loading, Warning, Refresh } from '@element-plus/icons-vue'

defineProps({
  loaded: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

defineEmits(['retry'])
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: var(--space-8);
}

.loading-card {
  border-radius: var(--radius-xl);
  min-width: 300px;
  background: var(--bg-color);
  border: 1px solid var(--border-color-light);
  box-shadow: var(--shadow-sm);
}

.loading-content,
.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
  padding: var(--space-6);
}

.loading-icon {
  color: var(--color-primary);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
  margin: 0;
  font-weight: 500;
  line-height: var(--line-height-normal);
}

.error-icon {
  margin-bottom: var(--space-2);
  color: var(--color-danger);
}

.error-text {
  color: var(--color-danger);
  font-size: var(--font-size-lg);
  margin: 0;
  max-width: 400px;
  line-height: var(--line-height-relaxed);
  font-weight: 500;
}

.retry-button {
  margin-top: var(--space-2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .loading-container {
    padding: var(--space-4);
  }
  
  .loading-card {
    min-width: auto;
    width: 100%;
  }
  
  .loading-content,
  .error-content {
    padding: var(--space-4);
  }
  
  .loading-text {
    font-size: var(--font-size-base);
  }
  
  .error-text {
    font-size: var(--font-size-base);
  }
}

@media (max-width: 480px) {
  .loading-container {
    padding: var(--space-3);
  }
  
  .loading-content,
  .error-content {
    padding: var(--space-3);
  }
  
  .loading-text {
    font-size: var(--font-size-sm);
  }
  
  .error-text {
    font-size: var(--font-size-sm);
  }
}
</style>
