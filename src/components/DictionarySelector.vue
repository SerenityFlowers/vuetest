<template>
  <el-card class="dictionary-selector-card" shadow="hover">
    <el-form inline class="selector-form">
      <el-form-item label="选择字典" class="selector-item">
        <el-select
          :model-value="modelValue"
          @update:model-value="$emit('update:modelValue', $event)"
          placeholder="请选择字典"
          :disabled="disabled"
          size="large"
          class="selector-input"
        >
          <el-option
            v-for="dict in dictionaries"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          >
            <span>{{ dict.name }}</span>
            <span v-if="!dict.loaded" class="loading-indicator">(加载中...)</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  dictionaries: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.dictionary-selector-card {
  margin-bottom: var(--space-6);
  border-radius: var(--radius-xl);
}

.selector-form {
  margin: 0;
}

.selector-item {
  margin-bottom: 0;
  width: 100%;
}

.selector-input {
  width: 100%;
  min-width: 300px;
}

.loading-indicator {
  color: var(--text-muted);
  font-style: italic;
  margin-left: var(--space-2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .selector-input {
    min-width: auto;
  }
}
</style> 