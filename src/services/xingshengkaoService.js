/**
 * 形声考数据服务
 * 负责数据加载、处理和检索逻辑
 */

// 字段匹配检查函数
const ok = (src, pattern) => !pattern || new RegExp(pattern).test(src || '')

/**
 * 处理单个数据条目
 * @param {Object} entry 原始数据条目
 * @param {Object} query 查询条件
 * @param {Map} groups 结果分组
 */
function handleEntry(entry, query, groups) {
  // 基本字段条件检查
  if (
    !ok(entry.字頭, query.字頭) ||
    !ok(entry.聲首, query.聲首) ||
    !ok(entry.諧聲域, query.諧聲域) ||
    !ok(entry.上古聲, query.上古聲) ||
    !ok(entry.上古韻, query.上古韻) ||
    !ok(entry['上古音（參考）'], query['上古音（參考）']) ||
    !ok(entry.中古地位, query.中古地位) ||
    !ok(entry.切語, query.切語) ||
    !ok(entry.切拼, query.切拼)
  ) {
    return
  }

  // 释义条件检查
  let matchedShiYi = {}
  if (query.釋義) {
    const re = new RegExp(query.釋義)
    matchedShiYi = Object.fromEntries(
      Object.entries(entry.釋義 || {}).filter(([k]) => re.test(k))
    )
    if (Object.keys(matchedShiYi).length === 0) return
  } else {
    matchedShiYi = { ...(entry.釋義 || {}) }
  }

  // 构建精简entry
  const processedEntry = {
    聲首: entry.聲首 || '',
    諧聲域: entry.諧聲域 || '',
    上古聲: entry.上古聲 || '',
    上古韻: entry.上古韻 || '',
    '上古音（參考）': entry['上古音（參考）'] || '',
    中古地位: entry.中古地位 || '',
    切語: entry.切語 || '',
    切拼: entry.切拼 || '',
    釋義: matchedShiYi
  }

  // 生成签名用于去重
  const signature = JSON.stringify([
    processedEntry.聲首,
    processedEntry.諧聲域,
    processedEntry.上古聲,
    processedEntry.上古韻,
    processedEntry['上古音（參考）'],
    processedEntry.中古地位,
    processedEntry.切語,
    processedEntry.切拼
  ])

  // 存储到groups中
  if (!groups.has(entry.字頭)) {
    groups.set(entry.字頭, new Map())
  }
  const bucket = groups.get(entry.字頭)

  if (bucket.has(signature)) {
    // 合并释义
    Object.assign(bucket.get(signature).釋義, processedEntry.釋義)
  } else {
    bucket.set(signature, processedEntry)
  }
}

/**
 * 格式化结果数据
 * @param {Map} groups 分组后的数据
 * @returns {Array} 格式化后的结果数组
 */
function formatResults(groups) {
  if (groups.size === 0) return []

  const results = []
  const sortedKeys = [...groups.keys()].sort((a, b) => a.localeCompare(b, 'zh-Hant'))
  
  for (const 字頭 of sortedKeys) {
    const bucket = groups.get(字頭)
    const entries = [...bucket.values()]
    
    // 按读音排序
    entries.sort((a, b) => {
      const sa = (a.切拼 || '') + (a.中古地位 || '')
      const sb = (b.切拼 || '') + (b.中古地位 || '')
      return sa.localeCompare(sb, 'zh-Hant')
    })

    // 合并所有释义
    const allShiYi = {}
    entries.forEach(entry => {
      Object.assign(allShiYi, entry.釋義)
    })

    results.push({
      字頭,
      entries,
      allShiYi
    })
  }

  return results
}

/**
 * 执行检索
 * @param {Object} searchForm 搜索表单数据
 * @param {Function} progressCallback 进度回调函数
 * @returns {Promise<Array>} 检索结果
 */
async function performSearch(searchForm, progressCallback) {
  // 检查是否有查询条件
  const hasCondition = Object.values(searchForm).some(value => value.trim() !== '')
  if (!hasCondition) {
    throw new Error('请至少填写一个检索条件！')
  }

  // 构建查询条件
  const query = {}
  Object.keys(searchForm).forEach(key => {
    if (searchForm[key].trim() !== '') {
      query[key] = searchForm[key].trim()
    }
  })

  const jsonFiles = [
    '/xingshengkao_part1.json',
    '/xingshengkao_part2.json', 
    '/xingshengkao_part3.json',
    '/xingshengkao_part4.json',
    '/xingshengkao_part5.json'
  ]

  const groups = new Map()
  let loadedCount = 0

  // 并行加载所有JSON文件
  const loadPromises = jsonFiles.map(async (path) => {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`无法加载：${path}`)
    }
    const data = await response.json()
    
    // 处理数据
    for (const entry of data) {
      handleEntry(entry, query, groups)
    }
    
    loadedCount++
    if (progressCallback) {
      progressCallback((loadedCount / jsonFiles.length) * 100)
    }
  })

  await Promise.all(loadPromises)
  
  // 转换结果格式
  return formatResults(groups)
}

export default {
  performSearch
}