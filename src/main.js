import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import './styles/shared-components.css'
import './styles/element-overrides.css'

// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 初始化字典配置
import { registerAllDictionaries } from './config/dictionaries'
registerAllDictionaries()

const app = createApp(App)

// 注册Element Plus
app.use(ElementPlus)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.mount('#app')
