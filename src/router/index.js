import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

// 字典模块路由
const dictionaryRoutes = [
  {
    path: '/jingdian-shiwen',
    name: 'JingdianShiwen',
    component: () => import('@/views/JingdianShiwen.vue'),
    meta: {
      title: '經典釋文',
      description: '陸德明《經典釋文》字典查詢'
    }
  },
  {
    path: '/shuowen-jiezi',
    name: 'ShuowenJiezi',
    component: () => import('@/views/ShuowenJiezi.vue'),
    meta: {
      title: '說文解字',
      description: '許慎《說文解字》字典查詢'
    }
  },
  {
    path: '/pianyun-yupian',
    name: 'PianYunYuPian',
    component: () => import('@/views/PianYunYuPian.vue'),
    meta: {
      title: '切韵玉篇',
      description: '切韵玉篇联合查询'
    }
  }
]

// 工具书模块路由
const toolRoutes = [
  {
    path: '/xingshengkao-search',
    name: 'XingshengkaoSearch',
    component: () => import('@/views/XingshengkaoSearch.vue'),
    meta: {
      title: '形声考组合检索',
      description: '形声考组合检索工具'
    }
  }
]

// 其他模块路由（预留）
const otherModuleRoutes = [
  // 未来可以在这里添加其他模块的路由
]

// 合并所有路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      description: '前端精進 - 古辞书查询系统'
    }
  },
  ...dictionaryRoutes,
  ...toolRoutes,
  ...otherModuleRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} - 夭夭古籍`
  }
  next()
})

export default router
