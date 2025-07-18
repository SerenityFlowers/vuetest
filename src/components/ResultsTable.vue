<template>
  <el-card shadow="hover" class="enhanced-results-table-card">
    <template #header>
      <div class="table-header">
        <div class="header-left">
          <span class="header-title">查询结果</span>
          <el-tag type="info" size="small">共 {{ rows.length }} 条记录</el-tag>
        </div>
        <div class="header-right">
          <!-- 列显示控制 -->
          <el-dropdown @command="handleColumnToggle" trigger="click">
            <el-button size="small" :icon="Setting">
              列设置
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item 
                  v-for="field in fields" 
                  :key="field"
                  :command="field"
                  :divided="field === 'source'"
                >
                  <el-checkbox 
                    :model-value="visibleColumns.includes(field)"
                    @change="(val) => toggleColumn(field, val)"
                    @click.stop
                  >
                    {{ field }}
                  </el-checkbox>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          
          <!-- 内容显示模式切换 -->
          <el-dropdown @command="handleDisplayModeChange" trigger="click">
            <el-button size="small" :icon="View">
              {{ displayModeText }}
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="truncate">
                  <el-icon><Hide /></el-icon>
                  隐藏溢出
                </el-dropdown-item>
                <el-dropdown-item command="wrap">
                  <el-icon><Expand /></el-icon>
                  自动换行
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </template>
    
    <el-table
      :data="filteredRows"
      stripe
      border
      size="default"
      :empty-text="emptyText"
      v-loading="loading"
      header-cell-class-name="table-header-cell"
      style="width: 100%"
      :row-class-name="getRowClassName"
    >
      <el-table-column
        prop="index"
        label="序号"
        width="80"
        align="center"
      >
        <template #default="{ $index }">
          <el-tag size="small" type="info">{{ $index + 1 }}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column
        v-for="field in visibleFields"
        :key="field"
        :prop="field"
        :label="field"
        :min-width="getAdaptiveColumnWidth(field)"
        :width="getFixedColumnWidth(field)"
        :show-overflow-tooltip="displayMode === 'truncate'"
      >
        <template #default="{ row }">
          <div 
            :class="displayMode === 'wrap' ? 'cell-simple-wrap' : 'cell-content'"
            v-html="getCellContent(row, field)"
          ></div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Setting, View, Hide, Expand } from '@element-plus/icons-vue'

const props = defineProps({
  fields: {
    type: Array,
    default: () => []
  },
  rows: {
    type: Array,
    default: () => []
  },
  displaySources: {
    type: Set,
    default: () => new Set()
  },
  loading: {
    type: Boolean,
    default: false
  },
  highlightKeyword: {
    type: String,
    default: ''
  },
  highlightPatterns: {
    type: Array,
    default: () => []
  }
})

// 响应式状态
const visibleColumns = ref([...props.fields]) // 移除 'source'
const displayMode = ref('wrap') // 'truncate' | 'wrap'

// 计算属性
const filteredRows = computed(() => {
  return props.rows.filter(row => 
    props.displaySources.has(row.source || '')
  )
})

const visibleFields = computed(() => {
  return props.fields.filter(field => visibleColumns.value.includes(field))
})

const displayModeText = computed(() => {
  return displayMode.value === 'truncate' ? '隐藏溢出' : '自动换行'
})

const emptyText = computed(() => {
  if (props.loading) return '加载中...'
  if (props.rows.length === 0) return '沒有找到相關資料'
  if (filteredRows.value.length === 0) return '当前筛选条件下没有数据'
  return '沒有找到相關資料'
})

// 方法
const toggleColumn = (field, visible) => {
  if (visible) {
    if (!visibleColumns.value.includes(field)) {
      visibleColumns.value.push(field)
    }
  } else {
    const index = visibleColumns.value.indexOf(field)
    if (index > -1) {
      visibleColumns.value.splice(index, 1)
    }
  }
}

const handleColumnToggle = (command) => {
  // 处理列切换命令
}

const handleDisplayModeChange = (command) => {
  displayMode.value = command
}

// 动态计算列宽：内容少则变窄，内容多则自适应
const getAdaptiveColumnWidth = (field) => {
  // 取所有行该字段内容的最大长度
  const maxLen = Math.max(
    ...props.rows.map(row => (row[field] ? String(row[field]).length : 0)),
    field.length
  )
  // 设定最小宽度和最大宽度
  if (maxLen <= 4) return 60
  if (maxLen <= 8) return 90
  if (maxLen <= 16) return 120
  if (maxLen <= 32) return 180
  return 240
}
// 若内容极短，直接固定宽度
const getFixedColumnWidth = (field) => {
  const maxLen = Math.max(
    ...props.rows.map(row => (row[field] ? String(row[field]).length : 0)),
    field.length
  )
  return maxLen <= 4 ? 60 : undefined
}

const getCellContent = (row, field) => {
  const content = row[field] || ''
  
  // 如果没有高亮关键词，直接返回内容
  if (!props.highlightKeyword && (!props.highlightPatterns || props.highlightPatterns.length === 0)) {
    return content
  }
  
  let highlightedContent = content
  
  // 高亮用户输入的关键词
  if (props.highlightKeyword && highlightedContent.includes(props.highlightKeyword)) {
    const escapedKeyword = props.highlightKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedKeyword})`, 'gi')
    highlightedContent = highlightedContent.replace(regex, '<span class="highlight-text">$1</span>')
  }
  
  // 高亮异体字组合
  if (props.highlightPatterns && props.highlightPatterns.length > 0) {
    for (const pattern of props.highlightPatterns) {
      if (highlightedContent.includes(pattern)) {
        const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`(${escapedPattern})`, 'gi')
        highlightedContent = highlightedContent.replace(regex, '<span class="highlight-text">$1</span>')
      }
    }
  }
  
  return highlightedContent
}

const getRowClassName = ({ row, rowIndex }) => {
  // 简化的行高亮逻辑
  if (props.highlightKeyword || (props.highlightPatterns && props.highlightPatterns.length > 0)) {
    const hasHighlight = visibleFields.value.some(field => {
      const content = row[field] || ''
      
      // 检查用户输入的关键词
      if (props.highlightKeyword && content.toLowerCase().includes(props.highlightKeyword.toLowerCase())) {
        return true
      }
      
      // 检查异体字组合
      if (props.highlightPatterns && props.highlightPatterns.length > 0) {
        for (const pattern of props.highlightPatterns) {
          if (content.includes(pattern)) {
            return true
          }
        }
      }
      
      return false
    })
    return hasHighlight ? 'highlight-row' : ''
  }
  return ''
}

// 监听字段变化，更新可见列
watch(() => props.fields, (newFields) => {
  newFields.forEach(field => {
    if (!visibleColumns.value.includes(field)) {
      visibleColumns.value.push(field)
    }
  })
}, { deep: true })
</script>

<style scoped>
@import '@/styles/enhanced-table.css';

.cell-simple-wrap {
  white-space: normal;
  word-break: break-all;
  background: none;
  border: none;
  box-shadow: none;
  max-height: none;
  padding: 0;
}
</style> 