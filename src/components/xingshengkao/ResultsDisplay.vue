<template>
  <div id="resultsContainer" v-if="results.length > 0 || (hasSearched && results.length === 0)">
    <div v-if="results.length === 0" class="error">
      没有找到符合条件的条目。
    </div>
    <div v-else>
      <div v-for="result in results" :key="result.字頭" class="char-card">
        <div class="card-title">{{ result.字頭 }}</div>
        
        <!-- 读音区块 -->
        <div class="readings-wrapper">
          <div v-for="(entry, index) in result.entries" :key="index" class="reading-block">
            <h4 class="reading-head">读音 #{{ index + 1 }}</h4>
            <p><strong>聲首：</strong><span>{{ entry.聲首 || '—' }}</span></p>
            <p><strong>諧聲域：</strong><span>{{ entry.諧聲域 || '—' }}</span></p>
            <p><strong>上古聲：</strong><span>{{ entry.上古聲 || '—' }}</span></p>
            <p><strong>上古韻：</strong><span>{{ entry.上古韻 || '—' }}</span></p>
            <p><strong>上古音（參考）：</strong><span>{{ entry['上古音（參考）'] || '—' }}</span></p>
            <p><strong>中古地位：</strong><span>{{ entry.中古地位 || '—' }}</span></p>
            <p><strong>切語：</strong><span>{{ entry.切語 || '—' }}</span></p>
            <p><strong>切拼：</strong><span>{{ entry.切拼 || '—' }}</span></p>
          </div>
        </div>

        <!-- 释义 -->
        <div class="card-shiyi">
          <p><strong>釋義：</strong></p>
          <ul>
            <li v-for="(value, key) in result.allShiYi" :key="key">
              <span class="shiyi-key">「{{ key }}」</span> → <span class="shiyi-val">{{ value }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsDisplay',
  props: {
    results: {
      type: Array,
      default: () => []
    },
    hasSearched: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
/* 结果展示 */
#resultsContainer {
  margin-top: 2rem;
}

.char-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgb(0 0 0 / 5%);
  transition: transform var(--speed), box-shadow var(--speed);
}

.char-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgb(0 0 0 / 8%);
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: .75rem;
  color: var(--primary);
}

/* 读音区块 */
.readings-wrapper {
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
}

.reading-block {
  min-width: 220px;
  flex: 0 0 auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  background: #fafafa;
  box-sizing: border-box;
}

.reading-head {
  margin: 0 0 .25rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.reading-block p {
  display: flex;
  margin-bottom: 0.25rem;
}

.reading-block strong {
  flex-shrink: 0;
  margin-right: .3em;
  white-space: nowrap;
}

.reading-block span {
  color: var(--text-light);
  word-break: break-word;
  font-size: .9rem;
}

/* 释义 */
.card-shiyi {
  margin-top: .75rem;
}

.card-shiyi p {
  font-weight: 600;
  margin-bottom: .5rem;
}

.card-shiyi ul {
  list-style: none;
  padding: 0;
}

.card-shiyi li {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  padding: .5rem .75rem;
  margin-bottom: .5rem;
  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: var(--radius);
}

.shiyi-key {
  font-weight: 600;
  color: var(--primary);
}

.shiyi-val {
  flex: 1;
  color: var(--text-light);
  font-size: .9rem;
}

/* 错误提示 */
.error {
  color: #e74c3c;
  background: #fdecea;
  border: 1px solid #f5c6cb;
  padding: 1rem;
  border-radius: var(--radius);
  margin-bottom: 1rem;
  text-align: center;
}

/* 响应式 */
@media (max-width: 600px) {
  .readings-wrapper {
    flex-direction: column;
  }
  
  .reading-block {
    min-width: auto;
  }
}
</style>