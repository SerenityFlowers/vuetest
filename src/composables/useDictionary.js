// 字典相关的组合式函数
import { ref, reactive, computed } from 'vue'
import { dictionaryManager } from '@/utils/dictionaryManager'

export function useDictionary() {
  // 状态
  const loaded = ref(false)
  const loading = ref(false)
  const error = ref(null)
  const currentDictionary = ref(null)
  const searchResults = reactive({
    results: [],
    sources: [],
    totalFound: 0,
    patterns: []
  })

  // 计算属性
  const fields = computed(() => currentDictionary.value?.fields || [])
  const sources = computed(() => currentDictionary.value?.sources || {})
  const searchableFields = computed(() => currentDictionary.value?.searchableFields || [])

  // 加载字典
  const loadDictionary = async (dictionaryId) => {
    loading.value = true
    error.value = null
    
    try {
      const dict = await dictionaryManager.loadDictionary(dictionaryId)
      currentDictionary.value = dict
      loaded.value = true
    } catch (err) {
      error.value = err.message
      console.error('字典加载失败:', err)
    } finally {
      loading.value = false
    }
  }

  // 搜索
  const search = (options) => {
    if (!loaded.value) {
      error.value = '字典未加载'
      return
    }

    try {
      const result = dictionaryManager.search(options)
      Object.assign(searchResults, result)
      error.value = null
    } catch (err) {
      error.value = err.message
      searchResults.results = []
      searchResults.sources = []
      searchResults.totalFound = 0
    }
  }

  // 获取所有字典
  const getAllDictionaries = () => {
    return dictionaryManager.getAllDictionaries()
  }

  // 重置状态
  const reset = () => {
    loaded.value = false
    loading.value = false
    error.value = null
    currentDictionary.value = null
    Object.assign(searchResults, {
      results: [],
      sources: [],
      totalFound: 0,
      patterns: []
    })
  }

  return {
    // 状态
    loaded,
    loading,
    error,
    currentDictionary,
    searchResults,
    
    // 计算属性
    fields,
    sources,
    searchableFields,
    
    // 方法
    loadDictionary,
    search,
    getAllDictionaries,
    reset
  }
} 