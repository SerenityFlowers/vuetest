import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: './', // 添加基础路径配置，使用相对路径以适应GitHub Pages部署
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
