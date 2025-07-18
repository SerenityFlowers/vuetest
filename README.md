# 老趙的文獻小屋

一個基於 Vue 3 開發的古典文獻查詢網站，主要提供《經典釋文》等古典辭書的智能檢索功能。

## ✨ 核心功能

- 📚 **多字典支持** - 支持多個古典辭書的統一查詢
- 🔍 **智能檢索** - 支持關鍵詞搜索和異體字匹配
- 🎨 **主題切換** - 支持淺色、深色、跟隨系統三種主題
- 📱 **響應式設計** - 完美適配桌面端和移動端
- ⚡ **高性能** - 基於 Vue 3 + Vite 的現代化架構

## 🚀 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 構建生產版本
npm run build

# 預覽構建結果
npm run preview

# 部署到GitHub Pages
npm run deploy
```

## 🌐 GitHub Pages部署

本項目已配置為可以輕鬆部署到GitHub Pages。有兩種部署方式：

### 方式一：使用gh-pages包部署

1. 在`package.json`中更新`homepage`字段為你的GitHub Pages URL：
   ```json
   "homepage": "https://你的用户名.github.io/laozhao-literature-hut/"
   ```

2. 運行部署命令：
   ```bash
   npm run deploy
   ```

### 方式二：使用GitHub Actions自動部署

1. 將代碼推送到GitHub倉庫
2. 在GitHub倉庫設置中啟用GitHub Pages，選擇來源為GitHub Actions
3. 每次推送到main或master分支時，會自動構建並部署

詳細部署說明請參考[部署指南](./DEPLOYMENT.md)。

## 📖 詳細文檔

- [項目介紹](./项目介绍.md) - 詳細的功能介紹和使用指南
- [架構文檔](./ARCHITECTURE.md) - 技術架構和開發指南

## 🛠️ 技術棧

- **前端框架**: Vue 3.5.17 + Vite 7.0.0
- **UI組件**: Element Plus 2.10.3
- **路由管理**: Vue Router 4.5.1
- **構建工具**: Vite 7.0.0

## 📄 許可證

本項目採用 MIT 許可證。

---

**注意**: 這是一個個人學習項目，主要用於整理和分享古典文獻資料。所有資料僅供學習研究使用。
