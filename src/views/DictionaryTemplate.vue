<template>
  <div class="dictionary-page">
    <div class="page-container">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 class="page-title">{{ dictionaryConfig.name }}</h1>
        <p class="page-subtitle">{{ dictionaryConfig.description }}</p>
      </header>

      <!-- 加载状态 -->
      <LoadingMessage 
        :loaded="loaded" 
        :loading="loading" 
        :error="error" 
        @retry="loadDictionary"
      />

      <!-- 查询表单 -->
      <section v-if="loaded" class="section">
        <SearchForm 
          :fields="searchableFields" 
          :disabled="loading" 
          @search="handleSearch"
          @show-variants="showVariantPopup"
        />
      </section>

      <!-- 异体字组弹窗 -->
      <VariantPopup 
        v-if="keyword && searchResults.groups && searchResults.groups.length" 
        :keyword="keyword" 
        :groups="searchResults.groups"
        ref="variantPopupRef"
      />

      <!-- 来源筛选 -->
      <section v-if="loaded" class="section">
        <SourceSelector
          :source-stats="sources"
          v-model="selectedSources"
        />
      </section>

      <!-- 搜索结果区域 -->
      <section v-if="searchResults.results.length" class="section">
        <!-- 结果过滤 -->
        <FilterCheckboxes
          :sources="searchResults.sources"
          @update:selected="displaySources = new Set($event)"
        />

        <!-- 结果统计 -->

        <!-- 结果表 -->
        <ResultsTable
          :fields="fields"
          :rows="searchResults.results"
          :displaySources="displaySources"
          :loading="loading"
          :highlight-keyword="keyword"
          :highlight-patterns="searchResults.patterns"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useDictionary } from '@/composables/useDictionary'
import { ElMessage } from 'element-plus'

import LoadingMessage         from '@/components/LoadingMessage.vue'
import SearchForm             from '@/components/SearchForm.vue'
import SourceSelector         from '@/components/SourceSelector.vue'
import VariantPopup           from '@/components/VariantPopup.vue'
import FilterCheckboxes       from '@/components/FilterCheckboxes.vue'
import ResultsTable   from '@/components/ResultsTable.vue'

// 定义props
const props = defineProps({
  dictionaryId: {
    type: String,
    required: true
  },
  dictionaryConfig: {
    type: Object,
    required: true
  }
})

// 使用字典组合式函数
const {
  loaded,
  loading,
  error,
  currentDictionary,
  searchResults,
  fields,
  sources,
  searchableFields,
  loadDictionary: loadDict,
  search
} = useDictionary()

// 本地状态
const selectedSources = ref([])
const displaySources = ref(new Set())
const keyword = ref('')
const variantPopupRef = ref(null)

// 初始化
onMounted(async () => {
  await loadDictionary()
})

// 加载字典
const loadDictionary = async () => {
  try {
    await loadDict(props.dictionaryId)
    // 重置搜索相关状态
    if (sources.value && Object.keys(sources.value).length > 0) {
      selectedSources.value = Object.keys(sources.value)
    } else {
      selectedSources.value = []
    }
    displaySources.value = new Set()
    keyword.value = ''
    Object.assign(searchResults, {
      results: [],
      sources: [],
      totalFound: 0,
      patterns: []
    })
  } catch (err) {
    console.error(`${props.dictionaryConfig.name}字典加载失败:`, err)
  }
}

// 处理搜索
const handleSearch = ({ keyword: kw, variantToggle, searchField }) => {
  keyword.value = kw
  if (!kw) {
    ElMessage.warning('請輸入要查詢的內容！')
    return
  }

  search({
    keyword: kw,
    searchField,
    selectedSources: selectedSources.value,
    variantToggle
  })

  // 更新显示来源
  if (searchResults.sources.length) {
    displaySources.value = new Set(searchResults.sources)
  }
}

// 显示异体字组弹窗
const showVariantPopup = () => {
  if (variantPopupRef.value) {
    variantPopupRef.value.show = true
  }
}
</script>

<style scoped>
@import '@/styles/dictionary-shared.css';
</style>