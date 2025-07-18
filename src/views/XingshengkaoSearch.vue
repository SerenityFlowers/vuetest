<template>
  <div class="xingshengkao-container">
    <!-- 页面头部 -->
    <div class="xingshengkao-header">
      <h1>形声考组合检索</h1>
      <button class="info-button" @click="showInstructions = !showInstructions">
        {{ showInstructions ? '隐藏使用说明' : '查看使用说明' }}
      </button>
    </div>

    <!-- 使用说明 -->
    <Instructions :visible="showInstructions" />

    <!-- 搜索表单 -->
    <SearchForm :is-loading="isLoading" @search="handleSearch" />

    <!-- 进度条 -->
    <ProgressBar :visible="isLoading" :progress="progress" />

    <!-- 结果展示 -->
    <ResultsDisplay :results="searchResults" :has-searched="hasSearched" />
  </div>
</template>

<script>
import { ref } from 'vue'
import xingshengkaoService from '@/services/xingshengkaoService'
import Instructions from '@/components/xingshengkao/Instructions.vue'
import SearchForm from '@/components/xingshengkao/SearchForm.vue'
import ProgressBar from '@/components/xingshengkao/ProgressBar.vue'
import ResultsDisplay from '@/components/xingshengkao/ResultsDisplay.vue'
import '@/assets/xingshengkao.css'

export default {
  name: 'XingshengkaoSearch',
  components: {
    Instructions,
    SearchForm,
    ProgressBar,
    ResultsDisplay
  },
  setup() {
    const showInstructions = ref(false)
    const isLoading = ref(false)
    const progress = ref(0)
    const hasSearched = ref(false)
    const searchResults = ref([])

    const handleSearch = async (formData) => {
      try {
        isLoading.value = true
        progress.value = 0
        searchResults.value = []
        hasSearched.value = true

        // 使用服务执行检索
        const results = await xingshengkaoService.performSearch(formData, (progressValue) => {
          progress.value = progressValue
        })

        searchResults.value = results
      } catch (error) {
        console.error('搜索出错：', error)
        alert(error.message || '搜索过程中出现错误，请稍后重试。')
      } finally {
        isLoading.value = false
      }
    }

    return {
      showInstructions,
      isLoading,
      progress,
      hasSearched,
      searchResults,
      handleSearch
    }
  }
}
</script>

<style>
@import '../assets/xingshengkao.css';
</style>