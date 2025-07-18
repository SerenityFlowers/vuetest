# 项目架构文档

## 重构概述

本次重构将原本耦合严重的字典查询功能重构为模块化、可扩展的架构，提高了代码的可维护性、可扩展性和组件复用性。

## 核心改进

### 1. 字典管理器 (`src/utils/dictionaryManager.js`)
- **统一管理**：所有字典配置和加载逻辑集中管理
- **多字典支持**：支持同时配置多个字典
- **灵活配置**：每个字典可以有不同的字段、搜索选项、异体字配置
- **动态加载**：按需加载字典数据，提高性能

### 2. 组合式函数 (`src/composables/useDictionary.js`)
- **状态管理**：统一的字典状态管理
- **响应式**：所有状态都是响应式的
- **错误处理**：完善的错误处理机制
- **可复用**：可在任何组件中使用

### 3. 配置驱动 (`src/config/dictionaries.js`)
- **声明式配置**：通过配置文件定义字典
- **易于扩展**：添加新字典只需修改配置文件
- **版本控制**：配置变更可追踪

### 4. 模块化路由 (`src/router/index.js`)
- **按需加载**：路由组件按需加载
- **模块化**：不同功能模块的路由分离
- **元信息**：支持路由元信息配置

## 如何添加新字典

### 步骤1：准备数据文件
将字典数据文件放在 `public/` 目录下，例如：
```
public/
  ├── new_dict.json          # 主数据文件
  ├── new_variants.json      # 异体字文件（可选）
  └── ...
```

### 步骤2：配置字典
在 `src/config/dictionaries.js` 中添加配置：

```javascript
const newDictionaryConfig = {
  id: 'new-dict',
  name: '新字典',
  description: '新字典的描述',
  dataFiles: ['/new_dict.json'],
  variantFile: '/new_variants.json', // 可选
  fields: [], // 动态获取
  searchableFields: ['字', '释义', '来源'],
  sourceField: '来源'
}

// 在 registerAllDictionaries 函数中注册
dictionaryManager.registerDictionary(newDictionaryConfig)
```

### 步骤3：创建页面
使用 `DictionaryTemplate.vue` 模板创建新页面：

```vue
<template>
  <DictionaryTemplate 
    :dictionary-id="DICT_ID"
    :dictionary-config="dictionaryConfig"
  />
</template>

<script setup>
import DictionaryTemplate from '@/views/DictionaryTemplate.vue'

const DICT_ID = 'new-dict'
const dictionaryConfig = {
  // 字典配置
}
</script>
```

### 步骤4：添加路由
在 `src/router/index.js` 中添加路由：

```javascript
{
  path: '/new-dict',
  name: 'NewDict',
  component: () => import('@/views/NewDict.vue'),
  meta: {
    title: '新字典',
    description: '新字典描述'
  }
}
```

## 组件复用性

### 可复用组件
以下组件完全可复用，无需修改：

1. **SearchForm** - 搜索表单
2. **ResultsTable** - 结果表格
3. **SourceSelector** - 来源选择器
4. **FilterCheckboxes** - 过滤复选框
5. **VariantPopup** - 异体字弹窗
6. **LoadingMessage** - 加载消息
7. **BaseButton** - 基础按钮
8. **ThemeToggle** - 主题切换

### 复用方式
```javascript
// 在任何组件中使用
import SearchForm from '@/components/SearchForm.vue'
import ResultsTable from '@/components/ResultsTable.vue'

// 使用字典组合式函数
import { useDictionary } from '@/composables/useDictionary'
const { search, searchResults } = useDictionary()
```

## 性能优化

### 1. 按需加载
- 路由组件按需加载
- 字典数据按需加载
- 异体字文件可选加载

### 2. 缓存机制
- 字典数据加载后缓存
- 避免重复加载相同字典

### 3. 结果限制
- 搜索结果限制在5000条以内
- 组合数超过5000时提示用户

## 错误处理

### 1. 加载错误
- 网络错误处理
- 文件不存在处理
- JSON解析错误处理

### 2. 搜索错误
- 字典未加载错误
- 组合数超限错误
- 字段不存在错误

### 3. 用户友好
- 错误信息本地化
- 重试机制
- 降级处理

## 扩展建议

### 1. 数据源扩展
- 支持远程API数据源
- 支持数据库连接
- 支持实时数据更新

### 2. 功能扩展
- 高级搜索功能
- 搜索结果导出
- 搜索历史记录
- 用户偏好设置

### 3. 性能扩展
- 虚拟滚动
- 搜索结果分页
- 后台搜索任务
- 搜索结果缓存

## 总结

重构后的架构具有以下优势：

1. **高可维护性**：模块化设计，职责分离
2. **高可扩展性**：配置驱动，易于添加新功能
3. **高复用性**：组件和逻辑完全可复用
4. **高性能**：按需加载，缓存机制
5. **高可靠性**：完善的错误处理机制

这个架构为未来的功能扩展奠定了坚实的基础，可以轻松支持多字典、多模块的复杂应用场景。 