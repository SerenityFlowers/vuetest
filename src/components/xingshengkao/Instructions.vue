<template>
  <div v-if="visible" class="instructions-content">
    <div class="content-card">
      <h2>使用说明</h2>
      <h3>检索字段说明</h3>
      <ul>
        <li><strong>字頭：</strong>要查询的汉字</li>
        <li><strong>諧聲域：</strong>声符的谐声范围</li>
        <li><strong>聲首：</strong>声母信息</li>
        <li><strong>上古聲：</strong>上古音声母</li>
        <li><strong>上古韻：</strong>上古音韵母</li>
        <li><strong>上古音（參考）：</strong>上古音参考读音</li>
        <li><strong>中古地位：</strong>中古音地位信息</li>
        <li><strong>切語：</strong>反切用字</li>
        <li><strong>切拼：</strong>切韵拼音</li>
        <li><strong>釋義：</strong>字义解释</li>
      </ul>
      <p><strong>注意：</strong>所有字段均支持正则表达式匹配，留空表示不限制该字段。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Instructions',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
/* 使用说明 */
.instructions-content {
  margin-top: 1rem;
}

.content-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgb(0 0 0 / 8%);
  margin-bottom: 2rem;
}

.content-card h2 {
  font-size: 1.5rem;
  color: var(--primary);
  margin-bottom: .75rem;
}

.content-card h3 {
  font-size: 1.25rem;
  margin-bottom: .5rem;
}

.content-card p,
.content-card li {
  margin-bottom: .5rem;
  color: var(--text-main);
  line-height: 1.6;
}

.content-card ul {
  list-style: disc inside;
  padding-left: 1.25rem;
  margin-bottom: 1rem;
}
</style>