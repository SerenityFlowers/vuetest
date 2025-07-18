import { ref, watch, onMounted, readonly, computed } from 'vue'

// 主题类型枚举
export const ThemeType = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
}

// 主题存储键名
const THEME_STORAGE_KEY = 'app-theme'

// 获取系统主题
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeType.DARK : ThemeType.LIGHT
}

// 应用主题到DOM
function applyTheme(theme) {
  const html = document.documentElement
  
  if (theme === ThemeType.SYSTEM) {
    const systemTheme = getSystemTheme()
    html.setAttribute('data-theme', systemTheme)
    return systemTheme
  } else {
    html.setAttribute('data-theme', theme)
    return theme
  }
}

// 主题切换组合式函数
export function useTheme() {
  // 响应式主题状态
  const currentTheme = ref(ThemeType.SYSTEM)
  const actualTheme = ref(ThemeType.LIGHT)
  
  // 初始化主题
  function initTheme() {
    // 从localStorage获取保存的主题
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    
    if (savedTheme && Object.values(ThemeType).includes(savedTheme)) {
      currentTheme.value = savedTheme
    } else {
      // 如果没有保存的主题，使用系统主题
      currentTheme.value = ThemeType.SYSTEM
    }
    
    // 应用主题
    actualTheme.value = applyTheme(currentTheme.value)
  }
  
  // 切换主题
  function toggleTheme() {
    const themes = Object.values(ThemeType)
    const currentIndex = themes.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }
  
  // 设置特定主题
  function setTheme(theme) {
    if (!Object.values(ThemeType).includes(theme)) {
      console.warn(`Invalid theme: ${theme}`)
      return
    }
    
    currentTheme.value = theme
    actualTheme.value = applyTheme(theme)
    
    // 保存到localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }
  
  // 监听系统主题变化
  function setupSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (currentTheme.value === ThemeType.SYSTEM) {
        actualTheme.value = applyTheme(ThemeType.SYSTEM)
      }
    }
    
    // 现代浏览器支持
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // 旧浏览器支持
      mediaQuery.addListener(handleChange)
    }
    
    // 返回清理函数
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        mediaQuery.removeListener(handleChange)
      }
    }
  }
  
  // 监听主题变化
  watch(currentTheme, (newTheme) => {
    actualTheme.value = applyTheme(newTheme)
  })
  
  // 组件挂载时初始化
  onMounted(() => {
    initTheme()
    setupSystemThemeListener()
  })
  
  return {
    // 当前选择的主题
    currentTheme: readonly(currentTheme),
    // 实际应用的主题（考虑系统主题）
    actualTheme: readonly(actualTheme),
    // 主题类型枚举
    ThemeType,
    // 方法
    toggleTheme,
    setTheme,
    // 计算属性
    isDark: computed(() => actualTheme.value === ThemeType.DARK),
    isLight: computed(() => actualTheme.value === ThemeType.LIGHT),
    isSystem: computed(() => currentTheme.value === ThemeType.SYSTEM)
  }
} 