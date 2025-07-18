<template>
  <div class="home-page">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <div class="welcome-content">
        <h1 class="welcome-title">老趙的文獻小屋</h1>
        <p class="welcome-subtitle">一個簡單的古典文獻分享空間</p>
        <p class="welcome-description">
          這裡是我整理的一些古典文獻資料，主要包含《經典釋文》等典籍的檢索功能。
          希望能為對古典文獻感興趣的朋友提供一些便利。
        </p>
        <div class="welcome-actions">
          <el-button 
            type="primary"
            size="large" 
            :icon="Search"
            @click="goToSearch"
          >
            開始查詢
          </el-button>
        </div>
      </div>
    </div>

    <!-- 功能介紹区域 -->
    <div class="intro-section">
      <div class="section-container">
        <h2 class="section-title">功能簡介</h2>
        <el-row :gutter="24">
          <el-col 
            v-for="feature in features" 
            :key="feature.title"
            :lg="8" 
            :md="12" 
            :sm="24" 
            :xs="24"
          >
            <el-card shadow="hover" class="feature-card">
              <div class="feature-icon">
                <el-icon :size="40" :color="feature.color">
                  <component :is="feature.icon" />
                </el-icon>
              </div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 資料概況区域 -->
    <div class="data-section">
      <div class="section-container">
        <h2 class="section-title">資料概況</h2>
        <p class="data-intro">目前收錄的資料包括：</p>
        <el-row :gutter="24">
          <el-col 
            v-for="item in dataItems" 
            :key="item.name"
            :lg="8" 
            :md="12" 
            :sm="24" 
            :xs="24"
          >
            <el-card shadow="hover" class="data-card">
              <div class="data-icon">
                <el-icon :size="32" color="#409eff">
                  <Document />
                </el-icon>
              </div>
              <h3 class="data-name">{{ item.name }}</h3>
              <p class="data-desc">{{ item.description }}</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 關於區域 -->
    <div class="about-section">
      <div class="section-container">
        <div class="about-content">
          <h2 class="about-title">關於這個小站</h2>
          <p class="about-text">
            這是一個個人業餘時間搭建的簡單網站，主要用於整理和分享一些古典文獻資料。
            如果您在使用過程中發現任何問題或有意見建議，歡迎聯繫我。
          </p>
          <p class="about-note">
            本站所有資料僅供學習研究使用，請尊重原作者的版權。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Document, Edit, User } from '@element-plus/icons-vue'

const router = useRouter()

// 跳转到搜索页面
const goToSearch = () => {
  router.push('/')
}

// 功能特色数据
const features = ref([
  {
    title: '文獻檢索',
    description: '支持異體字查詢，方便查找相關文獻內容',
    icon: Search,
    color: '#409eff'
  },
  {
    title: '資料整理',
    description: '將散落的古典文獻資料進行系統性整理',
    icon: Document,
    color: '#67c23a'
  },
  {
    title: '個人分享',
    description: '分享個人學習和研究古典文獻的心得體會',
    icon: User,
    color: '#e6a23c'
  }
])

// 資料項目
const dataItems = ref([
  {
    name: '經典釋文',
    description: '陸德明《經典釋文》的檢索資料'
  },
  {
    name: '說文解字',
    description: '許慎《說文解字》相關資料'
  },
  {
    name: '異體字庫',
    description: '常用異體字對照表'
  }
])
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.welcome-section {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  padding: 60px 0;
  text-align: center;
}

.welcome-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 20px;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
  line-height: 1.2;
}

.welcome-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 20px;
  font-weight: 400;
}

.welcome-description {
  font-size: 1rem;
  color: #475569;
  margin-bottom: 32px;
  line-height: 1.6;
}

.welcome-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.intro-section,
.data-section {
  padding: 60px 0;
  background: #ffffff;
}

.data-section {
  background: #f8fafc;
}

.section-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 40px;
  color: #1e293b;
}

.data-intro {
  text-align: center;
  color: #64748b;
  margin-bottom: 32px;
  font-size: 1.125rem;
}

.feature-card,
.data-card {
  height: 100%;
  text-align: center;
  margin-bottom: 24px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.feature-card:hover,
.data-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon,
.data-icon {
  margin-bottom: 16px;
}

.feature-title,
.data-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1e293b;
}

.feature-description,
.data-desc {
  color: #64748b;
  line-height: 1.6;
  font-size: 0.875rem;
}

.about-section {
  padding: 60px 0;
  background: #f1f5f9;
}

.about-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.about-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: #1e293b;
}

.about-text {
  color: #475569;
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 1rem;
}

.about-note {
  color: #94a3b8;
  font-size: 0.875rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
  }
  
  .welcome-description {
    font-size: 0.875rem;
  }
  
  .intro-section,
  .data-section,
  .about-section {
    padding: 40px 0;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .welcome-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
