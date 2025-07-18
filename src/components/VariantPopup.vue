<template>
  <Teleport to="body">
    <div v-if="show" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal" aria-label="關閉">
          <span>&times;</span>
        </button>
        <h3 class="modal-title">異體字組</h3>

        <div class="variant-table-container">
          <table class="variant-table">
            <thead>
              <tr>
                <th>輸入字</th>
                <th>異體字組</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(group, i) in groups" :key="i">
                <td class="variant-origin">{{ keyword[i] }}</td>
                <td class="variant-group">{{ [...new Set(group)].join(' / ') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ 
  keyword: String, 
  groups: Array 
})

const show = ref(false)

const closeModal = () => {
  show.value = false
}

defineExpose({
  show
})
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.18); /* 半透明遮罩 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  max-width: 480px;
  width: 96vw;
  max-height: 80vh;
  overflow-y: auto;
  padding: 32px 24px 24px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 1.5rem;
  color: #888;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.close-button:hover {
  background: #f2f2f2;
  color: #333;
}

.modal-title {
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
  text-align: center;
}

.variant-table-container {
  background: #fafbfc;
  border-radius: 4px;
  border: 1px solid #ececec;
  overflow: hidden;
}

.variant-table {
  width: 100%;
  border-collapse: collapse;
}
.variant-table th,
.variant-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #ececec;
}
.variant-table th {
  background: #f5f5f5;
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}
.variant-table tr:last-child td {
  border-bottom: none;
}
.variant-origin {
  font-weight: 600;
  text-align: center;
  color: #1976d2;
  background: #e3f2fd;
  font-size: 1.1rem;
}
.variant-group {
  color: #222;
  font-size: 1rem;
  line-height: 1.7;
}

.variant-link-container {
  margin: 24px 0;
  text-align: left;
}
.variant-link {
  display: inline-block;
  padding: 6px 18px;
  background: #e3f2fd;
  color: #1976d2;
  border: 1px solid #bbdefb;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.variant-link:hover {
  background: #bbdefb;
  color: #0d47a1;
}

@media (max-width: 600px) {
  .modal-content {
    padding: 16px 4vw 16px 4vw;
    max-width: 98vw;
  }
  .modal-title {
    font-size: 1rem;
  }
  .variant-table th,
  .variant-table td {
    padding: 6px 4px;
    font-size: 0.95rem;
  }
  .variant-origin {
    font-size: 1rem;
  }
  .variant-group {
    font-size: 0.95rem;
  }
}
</style>
