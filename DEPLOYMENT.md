# 部署指南

## GitHub Pages 部署注意事项

在将项目部署到GitHub Pages时，需要注意以下几点以确保项目正常运行：

### 1. 基础路径配置

在`vite.config.js`中，我们已经添加了`base: './'`配置，这确保了所有静态资源使用相对路径加载，适合GitHub Pages等静态托管环境。

```js
export default defineConfig({
  plugins: [vue()],
  base: './', // 使用相对路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 2. 数据文件路径

在`src/config/dictionaries.js`中，所有JSON数据文件的路径都已修改为使用相对路径：

```js
dataFiles: ['./jingdianshiwen_part1.json', './jingdianshiwen_part2.json'],
variantFile: './variants.json',
```

而不是之前的绝对路径：

```js
dataFiles: ['/jingdianshiwen_part1.json', '/jingdianshiwen_part2.json'],
variantFile: '/variants.json',
```

### 3. 构建和部署步骤

1. 运行构建命令：
   ```
   npm run build
   ```

2. 将`dist`目录的内容推送到GitHub仓库的`gh-pages`分支，或直接推送到主分支（如果已配置GitHub Pages使用主分支）。

3. 确保所有JSON数据文件都已正确复制到`dist`目录。

### 4. 解决刷新404问题

单页应用(SPA)在GitHub Pages上刷新页面时经常会遇到404错误。本项目已通过以下方式解决此问题：

1. **使用Hash路由模式**：在`router/index.js`中，生产环境下使用`createWebHashHistory`而不是`createWebHistory`：
   ```js
   history: import.meta.env.PROD ? createWebHashHistory() : createWebHistory(),
   ```

2. **添加404.html重定向**：在`public/404.html`中添加了重定向脚本，配合`index.html`中的脚本处理刷新问题。

3. **添加.nojekyll文件**：在`public/.nojekyll`中添加空文件，防止GitHub Pages使用Jekyll处理项目。

### 5. 自动部署配置

本项目已配置GitHub Actions工作流，可以自动构建和部署项目：

1. 工作流配置文件位于`.github/workflows/deploy.yml`
2. 每次推送到main或master分支时，会自动触发构建和部署
3. 也可以在GitHub仓库的Actions页面手动触发部署

### 6. 故障排除

如果在部署后仍然遇到问题：

- 检查浏览器控制台，查看具体的错误信息
- 确认JSON文件是否已正确上传到GitHub
- 验证文件路径是否正确（可以直接在浏览器中尝试访问JSON文件URL）
- 检查GitHub Pages的设置是否正确
- 如果使用自定义域名，确保DNS配置正确

### 7. 本地测试

在推送到GitHub之前，可以使用以下命令在本地预览构建后的项目：

```
npm run build
npm run preview
```

这有助于验证构建后的项目是否能正确加载所有资源。

### 8. 使用gh-pages包部署

除了GitHub Actions，也可以使用gh-pages包手动部署：

1. 确保已安装gh-pages包：
   ```
   npm install --save-dev gh-pages
   ```

2. 在package.json中已添加部署脚本：
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. 运行部署命令：
   ```
   npm run deploy
   ```

这将自动构建项目并将dist目录发布到gh-pages分支。