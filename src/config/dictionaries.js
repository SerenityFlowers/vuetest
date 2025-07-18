// 字典配置文件 - 轻松添加新字典
import { dictionaryManager } from '@/utils/dictionaryManager'

// 经典释文字典配置（专门用于JingdianShiwen.vue）
const jingdianShiwenConfig = {
  id: 'jingdian-shiwen',
  name: '經典釋文',
  description: '陸德明《經典釋文》字典查詢',
  dataFiles: ['/jingdianshiwen_part1.json', '/jingdianshiwen_part2.json'],
  variantFile: '/variants.json',
  fields: [], // 动态获取
  searchableFields: [], // 动态获取 - 所有字段都可搜索
  sourceField: '書目'
}

// 切韵玉篇字典配置（专门用于PianYunYuPian.vue）
const pianYunYuPianConfig = {
  id: 'pianyun-yupian',
  name: '切韵玉篇',
  description: '切韵玉篇联合查询',
  dataFiles: ['/pianyun_part1.json', '/pianyun_part2.json'],
  variantFile: '/variants.json',
  fields: [], // 动态获取
  searchableFields: [], // 动态获取 - 所有字段都可搜索
  sourceField: 'title'
}

// 说文解字字典配置（专门用于ShuowenJiezi.vue）
const shuowenJieziConfig = {
  id: 'shuowen-jiezi',
  name: '說文解字',
  description: '許慎《說文解字》字典查詢',
  dataFiles: ['/shuowen_jiezi.json'],
  variantFile: '/variants.json', // 使用统一的异体字文件
  fields: [], // 动态获取
  searchableFields: [], // 动态获取 - 所有字段都可搜索
  sourceField: '書目'
}

// 示例：如何添加新字典
const exampleNewDictionaryConfig = {
  id: 'example-dict',
  name: '示例字典',
  description: '这是一个示例字典配置',
  dataFiles: ['/example_dict.json'],
  variantFile: '/variants.json', // 使用统一的异体字文件
  fields: [], // 动态获取
  searchableFields: [], // 动态获取 - 所有字段都可搜索
  sourceField: '来源'
}

// 示例：如何添加不需要异体字的字典
const simpleDictionaryConfig = {
  id: 'simple-dict',
  name: '简单字典',
  description: '不需要异体字功能的字典',
  dataFiles: ['/simple_dict.json'],
  // 不设置 variantFile，表示不使用异体字功能
  fields: [],
  searchableFields: [], // 动态获取
  sourceField: '来源'
}

// 所有字典配置集合，后续如需添加新字典，只需在此数组中追加配置对象
const allDictionaryConfigs = [
  jingdianShiwenConfig,
  shuowenJieziConfig,
  pianYunYuPianConfig,
  exampleNewDictionaryConfig,
  simpleDictionaryConfig
]

// 注册所有字典
export function registerAllDictionaries() {
  allDictionaryConfigs.forEach(cfg => dictionaryManager.registerDictionary(cfg))
}

// 导出配置供参考
export const dictionaryConfigs = {
  jingdianShiwen: jingdianShiwenConfig,
  shuowenJiezi: shuowenJieziConfig,
  pianYunYuPian: pianYunYuPianConfig,
  example: exampleNewDictionaryConfig,
  simple: simpleDictionaryConfig
}

// 导出单个配置供页面使用
export { jingdianShiwenConfig, shuowenJieziConfig, pianYunYuPianConfig, exampleNewDictionaryConfig }