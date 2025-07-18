<template>
  <el-header class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <RouterLink to="/" class="logo" aria-label="首页">
        <el-icon class="logo-icon"><House /></el-icon>
        <span class="logo-text">老趙的文獻小屋</span>
      </RouterLink>

      <!-- 右侧区域：菜单列表 + 主题切换 -->
      <div class="nav-right">
        <!-- 菜单列表 -->
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          class="nav-menu"
          router
        >
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>主页</span>
          </el-menu-item>

          <!-- 古辞书查询（下拉菜单） -->
          <el-sub-menu index="dictionary">
            <template #title>
              <el-icon><Search /></el-icon>
              <span>古辞书查询</span>
            </template>
            <el-menu-item index="/jingdian-shiwen">
              <el-icon><Document /></el-icon>
              <span>經典釋文</span>
            </el-menu-item>
            <el-menu-item index="/pianyun-yupian">
              <el-icon><Document /></el-icon>
              <span>切韵玉篇查询</span>
            </el-menu-item>
            <el-menu-item index="/shuowen-jiezi">
              <el-icon><Search /></el-icon>
              <span>說文解字</span>
            </el-menu-item>
            <!-- 后续可以在这里添加更多字典相关功能 -->
          </el-sub-menu>

          <!-- 工具书（下拉菜单） -->
          <el-sub-menu index="tools">
            <template #title>
              <el-icon><Tools /></el-icon>
              <span>工具书</span>
            </template>
            <el-menu-item index="/xingshengkao-search">
              <el-icon><Search /></el-icon>
              <span>形声考组合检索</span>
            </el-menu-item>
          </el-sub-menu>

          <!-- 其他模块（预留） -->
          <el-sub-menu 
            v-for="module in otherModules" 
            :key="module.id" 
            :index="module.id"
          >
            <template #title>
              <el-icon><More /></el-icon>
              <span>{{ module.name }}</span>
            </template>
            <el-menu-item 
              v-for="item in module.items" 
              :key="item.path"
              :index="item.path"
            >
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-sub-menu>

          <!-- 禁用模块 -->
          <el-menu-item 
            v-if="disabledModules.length"
            index="disabled"
            disabled
            class="disabled-menu-item"
          >
            <el-icon><Lock /></el-icon>
            <span>{{ disabledModules[0].name }}</span>
          </el-menu-item>
        </el-menu>

        <!-- 主题切换按钮 -->
        <ThemeToggle />
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { House, Search, Document, More, Lock, Tools } from '@element-plus/icons-vue'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()

// 菜单配置 - 可以轻松扩展
const menuConfig = {
  // 其他模块配置
  otherModules: [
    // 示例：未来可以添加其他模块
    // {
    //   id: 'analysis',
    //   name: '文本分析',
    //   items: [
    //     { name: '词频统计', path: '/analysis/frequency' },
    //     { name: '文本对比', path: '/analysis/compare' }
    //   ]
    // }
  ],
  
  // 禁用模块（暂时不可用）
  disabledModules: [
    { id: 'other', name: '其他模块' }
  ]
}

// 计算属性
const otherModules = computed(() => menuConfig.otherModules)
const disabledModules = computed(() => menuConfig.disabledModules)

// 当前激活的菜单项
const activeIndex = computed(() => route.path)
</script>

<style scoped>
/* 顶栏整体 */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--bg-color-overlay);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-color-light);
  box-shadow: var(--shadow-sm);
  padding: 0;
  height: 64px;
  width: 100%;
  transition: all var(--transition-base);
}

/* 暗色主题适配 */
[data-theme="dark"] .navbar {
  background: rgba(15, 23, 42, 0.95);
  border-bottom-color: var(--border-light);
}

/* 内层容器：固定高度并居中 */
.nav-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  box-sizing: border-box;
}

/* Logo */
.logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.logo:hover {
  color: var(--color-primary-dark);
  transform: translateY(-1px);
}

.logo-icon {
  font-size: var(--font-size-2xl);
}

.logo-text {
  font-weight: 700;
}

/* 右侧区域 */
.nav-right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-shrink: 0;
}

/* Element Plus菜单样式覆盖 */
.nav-menu {
  background: transparent;
  border: none;
  flex: 1;
  display: flex;
  justify-content: center;
  border-bottom: none !important;
}

/* 统一所有菜单项的样式 */
.nav-menu .el-menu-item,
.nav-menu .el-sub-menu__title {
  height: 64px;
  line-height: 64px;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  border-radius: var(--radius-sm);
  margin: 0 var(--space-1);
  position: relative;
}

/* 统一悬浮效果 */
.nav-menu .el-menu-item:hover,
.nav-menu .el-sub-menu__title:hover {
  background: var(--color-primary-light);
  color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* 统一选中效果 */
.nav-menu .el-menu-item.is-active,
.nav-menu .el-sub-menu.is-active .el-sub-menu__title {
  background: var(--color-primary-light);
  color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* 子菜单箭头样式 */
.nav-menu .el-sub-menu__icon-arrow {
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.nav-menu .el-sub-menu:hover .el-sub-menu__icon-arrow,
.nav-menu .el-sub-menu.is-active .el-sub-menu__icon-arrow {
  color: var(--color-primary);
}

/* 下拉菜单样式 */
.nav-menu .el-menu--popup {
  background: var(--bg-color);
  border: 1px solid var(--border-color-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-2);
}

.nav-menu .el-menu--popup .el-menu-item {
  height: auto;
  line-height: var(--line-height-normal);
  padding: var(--space-3) var(--space-4);
  margin: var(--space-1) 0;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

.nav-menu .el-menu--popup .el-menu-item:hover {
  background: var(--bg-color-hover);
  color: var(--color-primary);
}

/* 禁用菜单项样式 */
.disabled-menu-item {
  opacity: 0.5;
  cursor: not-allowed;
}

.disabled-menu-item:hover {
  background: transparent !important;
  color: var(--text-secondary) !important;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .nav-container {
    padding: 0 var(--space-4);
  }
  
  .nav-menu {
    flex: 0.8;
  }
  
  .nav-menu .el-menu-item,
  .nav-menu .el-sub-menu__title {
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 var(--space-3);
  }
  
  .logo {
    font-size: var(--font-size-lg);
  }
  
  .logo-text {
    display: none;
  }
  
  .nav-menu .el-menu-item,
  .nav-menu .el-sub-menu__title {
    height: 56px;
    line-height: 56px;
    font-size: var(--font-size-sm);
  }
  
  .navbar {
    height: 56px;
  }
  
  .nav-right {
    gap: var(--space-2);
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 var(--space-2);
  }
  
  .logo {
    font-size: var(--font-size-base);
  }
  
  .nav-menu {
    display: none;
  }
  
  .nav-right {
    gap: var(--space-1);
  }
}
</style>
