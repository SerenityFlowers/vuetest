<template>
  <el-card shadow="hover" class="filter-card filter-checkboxes-card">
    <template #header>
      <div class="card-header">
        <div class="header-left">
          <el-icon><Filter /></el-icon>
          <span>篩選結果來源</span>
          <el-tag 
            v-if="sources.length > 0" 
            size="small" 
            type="info" 
            effect="light"
            class="source-count"
          >
            {{ selectedSources.length }}/{{ sources.length }}
          </el-tag>
        </div>
        <div class="header-right">
          <el-checkbox
            v-model="allChecked"
            @change="toggleAll"
            :disabled="sources.length === 0"
            class="select-all-checkbox"
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
        <!-- 来源复选框组 -->
        <div v-if="sources.length > 0" class="sources-section">
          <el-checkbox-group 
            v-model="localSelected"
            @change="handleSelectionChange"
            class="checkbox-group"
          >
            <el-row :gutter="16">
              <el-col 
                v-for="source in sources"
                :key="source"
                :lg="8" 
                :md="12" 
                :sm="24" 
                :xs="24"
              >
                <el-checkbox 
                  :label="source"
                  class="source-checkbox"
                >
                  <div class="checkbox-content">
                    <span class="source-name">{{ source }}</span>
                  </div>
                </el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>

        <!-- 空状态 -->
        <div v-else class="empty-state">
          <el-empty 
            description="暫無可篩選的來源" 
            :image-size="60"
          />
        </div>
      </div>
    </el-collapse-transition>
  </el-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Filter, ArrowDown, ArrowUp } from '@element-plus/icons-vue'

const props = defineProps({
  sources: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['update:selected'])

// 本地选中状态
const localSelected = ref([])
const allChecked = ref(false)
const isCollapsed = ref(false)

// 计算属性：选中的来源
const selectedSources = computed(() => localSelected.value)

// 全选/取消全选
function toggleAll() {
  if (allChecked.value) {
    localSelected.value = [...props.sources]
  } else {
    localSelected.value = []
  }
  emitChange()
}

// 处理选择变化
function handleSelectionChange(value) {
  localSelected.value = value
  emitChange()
}

// 切换展开/收起
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

// 发送变化事件
function emitChange() {
  emits('update:selected', localSelected.value)
}

// 监听props.sources变化，更新本地状态
watch(() => props.sources, (newSources) => {
  if (newSources && newSources.length > 0) {
    // 保持当前选中的来源（如果仍然存在）
    const validSelected = localSelected.value.filter(source => 
      newSources.includes(source)
    )
    localSelected.value = validSelected
  } else {
    localSelected.value = []
  }
}, { immediate: true })

// 监听localSelected变化，更新全选状态
watch(localSelected, (newValue) => {
  if (props.sources.length > 0) {
    allChecked.value = newValue.length === props.sources.length
  } else {
    allChecked.value = false
  }
}, { deep: true, immediate: true })

// 监听props.sources变化，更新全选状态
watch(() => props.sources, () => {
  if (props.sources.length > 0) {
    allChecked.value = localSelected.value.length === props.sources.length
  } else {
    allChecked.value = false
  }
}, { immediate: true })
</script>

<style scoped>
/* 使用共享样式，无需额外样式 */
</style>
