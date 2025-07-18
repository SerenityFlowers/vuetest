<script setup>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <div class="app-wrapper">
    <!-- 导航栏 -->
    <NavBar />
    
    <!-- 主内容区域 -->
    <main class="app-main">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    
    <!-- 页脚 -->
    <FooterBar />
  </div>
</template>

<style>
/* 全局重置和基础样式 */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
  line-height: inherit;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 应用主容器 */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* 主内容区域 */
.app-main {
  flex: 1;
  width: 100%;
  background-color: var(--bg-primary);
  padding: 0;
  margin: 0;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Element Plus 全局样式覆盖 */
.el-main {
  --el-main-padding: 0;
}

/* 确保所有容器都使用border-box */
* {
  box-sizing: border-box;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--border-medium);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--border-strong);
}
</style>
