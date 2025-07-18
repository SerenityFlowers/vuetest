<template>
  <div class="theme-toggle">
    <el-button
      class="theme-button"
      @click="handleThemeToggle"
      :title="buttonTitle"
      :aria-label="buttonTitle"
      circle
      size="large"
      type="info"
      plain
    >
      <!-- 亮色模式图标 -->
      <el-icon v-if="isLight" class="theme-icon">
        <Sunny />
      </el-icon>
      
      <!-- 暗色模式图标 -->
      <el-icon v-else-if="isDark" class="theme-icon">
        <Moon />
      </el-icon>
      
      <!-- 系统模式图标 -->
      <el-icon v-else class="theme-icon">
        <Monitor />
      </el-icon>
    </el-button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Sunny, Moon, Monitor } from '@element-plus/icons-vue'
import { useTheme } from '@/composables/useTheme'

const { currentTheme, isLight, isDark, toggleTheme } = useTheme()

// 按钮标题
const buttonTitle = computed(() => {
  if (isLight.value) return '当前：亮色模式 - 点击切换到暗色模式'
  if (isDark.value) return '当前：暗色模式 - 点击切换到跟随系统'
  return '当前：跟随系统 - 点击切换到亮色模式'
})

// 处理主题切换
function handleThemeToggle() {
  toggleTheme()
}
</script>

<style scoped>
.theme-toggle {
  position: relative;
  display: inline-block;
}

.theme-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all var(--transition-fast);
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-secondary);
}

.theme-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.theme-button:active {
  transform: translateY(0);
}

.theme-icon {
  font-size: var(--font-size-lg);
  transition: transform var(--transition-base);
}

.theme-button:hover .theme-icon {
  transform: rotate(15deg);
}

/* Element Plus按钮样式覆盖 */
/* 删除:deep(.el-button)相关样式，保留结构性和响应式部分 */

/* 响应式设计 */
@media (max-width: 768px) {
  .theme-button {
    width: 36px;
    height: 36px;
  }
  
  .theme-icon {
    font-size: var(--font-size-base);
  }
}

@media (max-width: 480px) {
  .theme-button {
    width: 32px;
    height: 32px;
  }
  
  .theme-icon {
    font-size: var(--font-size-sm);
  }
}
</style> 