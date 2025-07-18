// 通用字典管理器 - 支持多字典配置和加载
export class DictionaryManager {
  constructor() {
    this.dictionaries = new Map()
    this.currentDictionary = null
  }

  // 注册字典配置
  registerDictionary(config) {
    const {
      id,
      name,
      description,
      dataFiles,
      fields,
      searchableFields,
      sourceField = '書目',
      variantFile = null
    } = config

    this.dictionaries.set(id, {
      id,
      name,
      description,
      dataFiles,
      fields,
      searchableFields,
      sourceField,
      variantFile,
      data: null,
      variants: null,
      sources: {},
      loaded: false
    })
  }

  // 加载指定字典
  async loadDictionary(dictionaryId) {
    const dict = this.dictionaries.get(dictionaryId)
    if (!dict) {
      throw new Error(`字典 ${dictionaryId} 未找到`)
    }

    if (dict.loaded) {
      this.currentDictionary = dict
      return dict
    }

    try {
      // 加载主数据文件
      const dataPromises = dict.dataFiles.map(file => 
        fetch(file).then(res => {
          if (!res.ok) throw new Error(`加载失败: ${file}`)
          return res.json()
        })
      )

      // 加载异体字文件（如果存在）
      let variantsPromise = Promise.resolve(null)
      if (dict.variantFile) {
        variantsPromise = fetch(dict.variantFile).then(res => {
          if (!res.ok) throw new Error(`异体字文件加载失败`)
          return res.json()
        })
      }

      const [dataArrays, variants] = await Promise.all([
        Promise.all(dataPromises),
        variantsPromise
      ])

      // 合并数据并处理
      const dictionary = dataArrays.flat()
      const sources = {}
      const fieldSet = new Set()

      dictionary.forEach((rec, i) => {
        rec.originalIndex = i
        rec.source = rec[dict.sourceField] || ''
        if (rec.source) {
          sources[rec.source] = (sources[rec.source] || 0) + 1
        }
        Object.keys(rec).forEach(k => {
          if (!['originalIndex', 'source'].includes(k)) {
            fieldSet.add(k)
          }
        })
      })

      // 更新字典状态
      dict.data = dictionary
      dict.variants = variants
      dict.sources = sources
      dict.fields = [...fieldSet] // 动态设置字段
      dict.searchableFields = [...fieldSet] // 动态设置可搜索字段 - 所有字段都可搜索
      dict.loaded = true
      this.currentDictionary = dict

      return dict
    } catch (error) {
      console.error('字典加载失败:', error)
      throw error
    }
  }

  // 获取当前字典
  getCurrentDictionary() {
    return this.currentDictionary
  }

  // 获取所有字典配置
  getAllDictionaries() {
    return Array.from(this.dictionaries.values()).map(dict => ({
      id: dict.id,
      name: dict.name,
      description: dict.description,
      loaded: dict.loaded,
      isClassicExegesis: dict.isClassicExegesis || false
    }))
  }

  // 搜索功能
  search(options) {
    const dict = this.currentDictionary
    if (!dict || !dict.loaded) {
      throw new Error('字典未加载')
    }

    const {
      keyword,
      searchField,
      selectedSources,
      variantToggle = 'withVariants',
      maxResults = 5000
    } = options

    if (!keyword) return []

    // 生成异体字组合
    const groups = [...keyword].map(ch => {
      if (variantToggle === 'withoutVariants' || !dict.variants) return [ch]
      const matched = dict.variants.filter(g => g.includes(ch))
      return matched.length ? [...new Set(matched.flat())] : [ch]
    })

    // 计算组合数
    const combos = groups.reduce((acc, arr) => acc * (arr?.length || 0), 1)
    if (combos > 5000) {
      throw new Error(`组合数 ${combos} 超过 5000，请缩短输入或关闭异体字后重试。`)
    }

    // 生成所有可能的组合
    const patterns = this.cartesianProduct(groups)

    // 执行搜索
    const results = []
    const uniqueSrc = new Set()

    dict.data.forEach(rec => {
      if (!selectedSources.includes(rec.source)) return
      
      const val = rec[searchField] || ''
      for (const pattern of patterns) {
        if (val.includes(pattern)) {
          results.push({
            ...rec,
            [searchField]: val.replaceAll(pattern, `<span class="highlight">${pattern}</span>`)
          })
          if (rec.source) uniqueSrc.add(rec.source)
          break
        }
      }
    })

    // 排序并限制结果数量
    results.sort((a, b) => a.originalIndex - b.originalIndex)
    
    return {
      results: results.slice(0, maxResults),
      sources: Array.from(uniqueSrc),
      totalFound: results.length,
      patterns,
      groups // 添加groups用于异体字弹窗显示
    }
  }

  // 笛卡尔积计算
  cartesianProduct(sets) {
    return sets.reduce((a, b) => a.flatMap(d => b.map(e => d + e)))
  }

  // 获取可能的组合数
  getPossibleCombinationCount(sets) {
    return sets.reduce((acc, arr) => acc * (arr?.length || 0), 1)
  }
}

// 创建全局字典管理器实例
export const dictionaryManager = new DictionaryManager() 