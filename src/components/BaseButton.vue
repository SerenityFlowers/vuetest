<template>
  <button
    class="base-button"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({ disabled: Boolean })
defineEmits(['click'])
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: 500;
  font-family: inherit;
  background-color: var(--primary-600);
  color: var(--text-inverse);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  min-height: 44px;
  text-decoration: none;
  white-space: nowrap;
}

.base-button:hover:not(:disabled) {
  background-color: var(--primary-700);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.base-button:active:not(:disabled) {
  transform: translateY(0);
}

.base-button:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
</style>
