<template>
  <div class="search-container">
    <el-form
      :model="formData"
      @submit.prevent="handleSubmit"
      :inline="true"
      size="large"
    >
      <el-row :gutter="16" justify="start" align="middle">
        <el-col :span="14">
          <el-input
            v-model="formData.keyword"
            placeholder="輸入一個繁體字"
            clearable
            :prefix-icon="Search"
            @keyup.enter="handleSubmit"
            @keyup.esc="clearKeyword"
            ref="keywordInput"
            :disabled="disabled"
            class="search-input"
          />
        </el-col>
        
        <el-col :span="3">
          <el-select
            v-model="formData.variantToggle"
            placeholder="異體字"
            :disabled="disabled"
            class="compact-select"
          >
            <el-option label="查詢異體字" value="withVariants" />
            <el-option label="只查原字" value="withoutVariants" />
          </el-select>
        </el-col>
        
        <el-col :span="3">
          <el-select
            v-model="formData.searchField"
            placeholder="查詢字段"
            :disabled="disabled"
            class="compact-select"
          >
            <el-option
              v-for="field in fields"
              :key="field"
              :label="`查「${field}」`"
              :value="field"
            />
          </el-select>
        </el-col>
        
        <el-col :span="2">
          <el-button
            type="info"
            :disabled="disabled || !formData.keyword.trim()"
            @click="$emit('show-variants')"
            class="variant-button"
          >
            查看異體字組
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button
            type="primary"
            :disabled="disabled || !formData.keyword.trim()"
            @click="handleSubmit"
            :icon="Search"
            :loading="disabled"
            class="search-button"
          >
            {{ disabled ? '查詢中...' : '查詢' }}
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { ref, watch, reactive, nextTick, onMounted, onUnmounted } from 'vue'
import { Search } from '@element-plus/icons-vue'

const props = defineProps({
  fields: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['search', 'show-variants'])

// 表单数据
const formData = reactive({
  keyword: '',
  variantToggle: 'withVariants',
  searchField: ''
})

// 输入框引用
const keywordInput = ref(null)

// 全局回车键处理函数
const handleGlobalEnter = (event) => {
  // 只处理回车键
  if (event.key !== 'Enter') {
    return
  }
  
  // 如果用户正在输入框中输入，不触发全局回车
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.contentEditable === 'true') {
    return
  }
  
  // 如果有搜索关键词且组件未被禁用，则触发搜索
  if (formData.keyword.trim() && !props.disabled) {
    handleSubmit()
  }
}

// 组件挂载时添加全局键盘监听
onMounted(() => {
  document.addEventListener('keydown', handleGlobalEnter)
})

// 组件卸载时移除全局键盘监听
onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalEnter)
})

// 监听字段数组变化，设置默认值
watch(() => props.fields, (newFields) => {
  if (newFields?.length > 0) {
    // 如果当前没有选择字段，或者当前选择的字段不在新字段列表中，则设置为第一个字段
    if (!formData.searchField || !newFields.includes(formData.searchField)) {
      formData.searchField = newFields[0]
    }
  }
}, { immediate: true })

// 统一的提交处理函数
function handleSubmit() {
  // 验证输入
  if (!formData.keyword.trim()) {
    return
  }
  
  // 如果组件被禁用，不执行搜索
  if (props.disabled) {
    return
  }
  
  emitSearch()
}

// 清空关键词
function clearKeyword() {
  formData.keyword = ''
  // 聚焦到输入框
  nextTick(() => {
    keywordInput.value?.focus()
  })
}

function emitSearch() {
  emits('search', { 
    keyword: formData.keyword.trim(), 
    variantToggle: formData.variantToggle, 
    searchField: formData.searchField 
  })
}

// 暴露方法供父组件调用
defineExpose({
  focus: () => {
    nextTick(() => {
      keywordInput.value?.focus()
    })
  },
  clear: clearKeyword
})
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
  padding: 16px 0;
}

.search-input {
  width: 100%;
}

.compact-select {
  width: 100%;
}

.search-button,
.variant-button {
  width: 100%;
  white-space: nowrap;
}

.variant-button {
  background-color: #e3f2fd;
  border-color: #bbdefb;
  color: #1976d2;
}

.variant-button:hover {
  background-color: #bbdefb;
  border-color: #90caf9;
  color: #0d47a1;
}

/* 结构性样式 - 下拉选项文本处理 */
.search-container .el-select-dropdown__item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
