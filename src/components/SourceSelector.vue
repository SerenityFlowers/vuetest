<template>
  <el-card shadow="hover" class="filter-card source-selector-card">
    <template #header>
      <div class="card-header">
        <div class="header-left">
          <el-icon><Document /></el-icon>
          <span>選擇查詢來源</span>
        </div>
        <div class="header-right">
          <el-checkbox
            v-model="allChecked"
            @change="toggleAll"
            class="select-all-checkbox"
            :disabled="orderedSources.length === 0"
          >
            <span class="select-all-text">全選/取消全選</span>
          </el-checkbox>
          <el-button
            type="text"
            size="small"
            @click="toggleCollapse"
            class="collapse-button"
            :icon="isCollapsed ? ArrowDown : ArrowUp"
          />
        </div>
      </div>
    </template>

    <el-collapse-transition>
      <div v-show="!isCollapsed" class="filter-content">
        <div v-if="orderedSources.length > 0" class="sources-section">
          <el-checkbox-group 
            v-model="localSelected"
            @change="handleSelectionChange"
            class="checkbox-group"
          >
            <el-row :gutter="16">
              <el-col 
                v-for="({ name, count }) in orderedSources"
                :key="name"
                :lg="8" 
                :md="12" 
                :sm="24" 
                :xs="24"
              >
                <el-checkbox 
                  :label="name"
                  class="source-checkbox"
                >
                  <div class="checkbox-content">
                    <span class="source-name">{{ name }}</span>
                    <el-tag size="small" type="info">{{ count }} 條</el-tag>
                  </div>
                </el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>

        <div v-else class="empty-state">
          <el-empty 
            description="暫無可選擇的來源" 
            :image-size="60"
          />
        </div>
      </div>
    </el-collapse-transition>
  </el-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Document, ArrowDown, ArrowUp } from '@element-plus/icons-vue'

const props = defineProps({
  sourceStats: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['update:modelValue'])

const localSelected = ref([...props.modelValue])
const allChecked = ref(false)
const isCollapsed = ref(false)

/* 排序：先按條數 desc，再按中/英文字母 */
const orderedSources = computed(() => {
  if (!props.sourceStats) return []
  
  const arr = Object.entries(props.sourceStats).map(([name, count]) => ({ name, count }))
  return arr.sort((a, b) => {
    if (a.count !== b.count) return b.count - a.count
    const hanA = /^[\u4e00-\u9fa5]/.test(a.name)
    const hanB = /^[\u4e00-\u9fa5]/.test(b.name)
    if (hanA && !hanB) return -1
    if (!hanA && hanB) return 1
    return a.name.localeCompare(b.name)
  })
})

function toggleAll() {
  if (allChecked.value) {
    localSelected.value = orderedSources.value.map(s => s.name)
  } else {
    localSelected.value = []
  }
  emitChange()
}

function handleSelectionChange(value) {
  localSelected.value = value
  emitChange()
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

function emitChange() {
  emits('update:modelValue', localSelected.value)
}

// 监听父组件modelValue变化，更新本地状态
watch(() => props.modelValue, (newValue) => {
  localSelected.value = [...(newValue || [])]
}, { immediate: true })

// 监听localSelected变化，更新allChecked状态
watch(localSelected, (newValue) => {
  if (orderedSources.value.length > 0) {
    allChecked.value = newValue.length === orderedSources.value.length
  } else {
    allChecked.value = false
  }
}, { deep: true, immediate: true })

// 监听orderedSources变化，更新allChecked状态
watch(orderedSources, () => {
  if (orderedSources.value.length > 0) {
    allChecked.value = localSelected.value.length === orderedSources.value.length
  } else {
    allChecked.value = false
  }
}, { immediate: true })
</script>

<style scoped>
/* 使用共享样式，无需额外样式 */
</style>
