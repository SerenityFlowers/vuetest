<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-info">
          <p class="footer-text">
            © 2024 老趙的文獻小屋
          </p>
          <p class="footer-subtext">
            一個簡單的古典文獻分享空間
          </p>
        </div>
        <div class="footer-links">
          <el-button 
            type="text" 
            class="footer-link" 
            @click="showAbout = true"
          >
            關於
          </el-button>
          <el-button 
            type="text" 
            class="footer-link" 
            @click="showTerms = true"
          >
            條款
          </el-button>
          <el-button 
            type="text" 
            class="footer-link" 
            @click="showPrivacy = true"
          >
            隱私
          </el-button>
          <el-button 
            type="text" 
            class="footer-link" 
            @click="showContact = true"
          >
            聯繫
          </el-button>
        </div>
      </div>
    </div>

    <!-- 關於我們 -->
    <el-dialog
      v-model="showAbout"
      title="關於我們"
      width="60%"
      :close-on-click-modal="true"
      :close-on-press-escape="true">
      <div class="dialog-content">
        <h3>老趙的文獻小屋</h3>
        <p>這是一個專注於古典文獻查詢和分享的平台，致力於為研究者和愛好者提供便捷的古代文獻檢索服務。</p>
        
        <h4>主要功能</h4>
        <ul>
          <li>經典釋文查詢</li>
          <li>說文解字檢索</li>
          <li>異體字關聯查詢</li>
          <li>多源文獻整合</li>
        </ul>
        
        <h4>技術特色</h4>
        <p>採用現代化Web技術，提供響應式設計，支持多種設備訪問。數據來源可靠，查詢結果準確。</p>
      </div>
    </el-dialog>

    <!-- 使用條款 -->
    <el-dialog
      v-model="showTerms"
      title="使用條款"
      width="60%"
      :close-on-click-modal="true"
      :close-on-press-escape="true">
      <div class="dialog-content">
        <h3>使用條款</h3>
        <p>歡迎使用老趙的文獻小屋。使用本平台即表示您同意以下條款：</p>
        
        <h4>1. 服務使用</h4>
        <p>本平台提供文獻查詢服務，用戶應合理使用，不得進行惡意查詢或攻擊。</p>
        
        <h4>2. 內容責任</h4>
        <p>平台內容僅供學術研究參考，使用者應自行判斷內容的準確性和適用性。</p>
        
        <h4>3. 版權聲明</h4>
        <p>本平台尊重知識產權，如發現侵權內容，請及時聯繫我們。</p>
        
        <h4>4. 服務變更</h4>
        <p>我們保留隨時修改或終止服務的權利，恕不另行通知。</p>
      </div>
    </el-dialog>

    <!-- 隱私政策 -->
    <el-dialog
      v-model="showPrivacy"
      title="隱私政策"
      width="60%"
      :close-on-click-modal="true"
      :close-on-press-escape="true">
      <div class="dialog-content">
        <h3>隱私政策</h3>
        <p>我們重視您的隱私保護，本政策說明我們如何收集、使用和保護您的信息：</p>
        
        <h4>信息收集</h4>
        <p>我們僅收集必要的技術信息，包括：</p>
        <ul>
          <li>查詢關鍵詞（用於提供服務）</li>
          <li>訪問時間和頻率</li>
          <li>瀏覽器類型和版本</li>
        </ul>
        
        <h4>信息使用</h4>
        <p>收集的信息僅用於：</p>
        <ul>
          <li>提供查詢服務</li>
          <li>改善用戶體驗</li>
          <li>系統維護和優化</li>
        </ul>
        
        <h4>信息保護</h4>
        <p>我們採用行業標準的安全措施保護您的信息，不會向第三方出售或分享您的個人信息。</p>
      </div>
    </el-dialog>

    <!-- 聯繫我們 -->
    <el-dialog
      v-model="showContact"
      title="聯繫我們"
      width="60%"
      :close-on-click-modal="true"
      :close-on-press-escape="true">
      <div class="dialog-content">
        <h3>聯繫我們</h3>
        <p>如果您有任何問題、建議或反饋，歡迎通過以下方式聯繫我們：</p>
        
        <h4>聯繫方式</h4>
        <ul>
          <li><strong>電子郵件：</strong>contact@example.com</li>
          <li><strong>技術支持：</strong>support@example.com</li>
          <li><strong>反饋建議：</strong>feedback@example.com</li>
        </ul>
        
        <h4>常見問題</h4>
        <p>在聯繫我們之前，您可以查看常見問題解答，可能會找到您需要的答案。</p>
        
        <h4>響應時間</h4>
        <p>我們會在收到您的消息後1-3工作日內回覆。對於緊急技術問題，我們會優先處理。</p>
        
        <h4>建議內容</h4>
        <p>為了更好地幫助您，請在聯繫時提供：</p>
        <ul>
          <li>問題的詳細描述</li>
          <li>使用的瀏覽器和版本</li>
          <li>錯誤信息（如果有的話）</li>
        </ul>
      </div>
    </el-dialog>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

// 控制各個對話框的顯示狀態
const showAbout = ref(false)
const showTerms = ref(false)
const showPrivacy = ref(false)
const showContact = ref(false)
</script>

<style scoped>
.footer {
  background: var(--bg-color);
  border-top: 1px solid var(--border-color-light);
  padding: var(--space-8) 0;
  margin-top: auto;
  transition: all var(--transition-base);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-8);
}

.footer-info {
  flex: 1;
}

.footer-text {
  color: var(--text-primary);
  font-size: var(--font-size-base);
  font-weight: 500;
  margin: 0 0 var(--space-1) 0;
  line-height: var(--line-height-normal);
}

.footer-subtext {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
  line-height: var(--line-height-normal);
}

.footer-links {
  display: flex;
  gap: var(--space-6);
  flex-shrink: 0;
}

.footer-link {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: color var(--transition-fast);
  padding: var(--space-1) 0;
  font-weight: 500;
}

.footer-link:hover {
  color: var(--color-primary);
}

/* 响应式设计 */
@media (max-width: 1240px) {
  .footer-container {
    padding: 0 var(--space-4);
  }
  
  .footer-content {
    gap: var(--space-6);
  }
  
  .footer-links {
    gap: var(--space-4);
  }
}

/* 对话框内容样式 */
.dialog-content {
  line-height: var(--line-height-relaxed);
  color: var(--text-primary);
}

.dialog-content h3 {
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin: 0 0 var(--space-4) 0;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: var(--space-2);
}

.dialog-content h4 {
  color: var(--text-primary);
  font-size: var(--font-size-base);
  font-weight: 600;
  margin: var(--space-4) 0 var(--space-2) 0;
}

.dialog-content p {
  margin: var(--space-2) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.dialog-content ul {
  margin: var(--space-2) 0;
  padding-left: var(--space-4);
}

.dialog-content li {
  margin: var(--space-1) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.dialog-content strong {
  color: var(--text-primary);
  font-weight: 600;
}

/* 响应式对话框 */
@media (max-width: 768px) {
  .footer {
    padding: var(--space-6) 0;
  }
  
  .footer-container {
    padding: 0 var(--space-3);
  }
  
  .footer-content {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }
  
  .footer-text {
    font-size: var(--font-size-sm);
  }
  
  .footer-subtext {
    font-size: var(--font-size-xs);
  }
  
  .footer-links {
    justify-content: center;
    gap: var(--space-4);
  }
  
  .footer-link {
    font-size: var(--font-size-xs);
  }
  
  /* 响应式对话框 */
  .dialog-content h3 {
    font-size: var(--font-size-base);
  }
  
  .dialog-content h4 {
    font-size: var(--font-size-sm);
  }
  
  .dialog-content p,
  .dialog-content li {
    font-size: var(--font-size-xs);
  }
}

@media (max-width: 480px) {
  .footer {
    padding: var(--space-4) 0;
  }
  
  .footer-container {
    padding: 0 var(--space-2);
  }
  
  .footer-content {
    gap: var(--space-3);
  }
  
  .footer-links {
    gap: var(--space-3);
  }
}
</style>
