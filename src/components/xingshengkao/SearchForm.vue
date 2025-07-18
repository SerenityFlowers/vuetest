<template>
  <form class="search-form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="字頭">字頭</label>
      <input type="text" id="字頭" v-model="form.字頭" placeholder="如：水">
    </div>
    <div class="form-group">
      <label for="諧聲域">諧聲域</label>
      <input type="text" id="諧聲域" v-model="form.諧聲域" placeholder="如：水部">
    </div>
    <div class="form-group">
      <label for="聲首">聲首</label>
      <input type="text" id="聲首" v-model="form.聲首" placeholder="如：s">
    </div>
    <div class="form-group">
      <label for="上古聲">上古聲</label>
      <input type="text" id="上古聲" v-model="form.上古聲" placeholder="如：*s-">
    </div>
    <div class="form-group">
      <label for="上古韻">上古韻</label>
      <input type="text" id="上古韻" v-model="form.上古韻" placeholder="如：*-uj">
    </div>
    <div class="form-group">
      <label for="上古音（參考）">上古音（參考）</label>
      <input type="text" id="上古音（參考）" v-model="form['上古音（參考）']" placeholder="如：*suj">
    </div>
    <div class="form-group">
      <label for="中古地位">中古地位</label>
      <input type="text" id="中古地位" v-model="form.中古地位" placeholder="如：心母">
    </div>
    <div class="form-group">
      <label for="切語">切語</label>
      <input type="text" id="切語" v-model="form.切語" placeholder="如：式聚切">
    </div>
    <div class="form-group">
      <label for="切拼">切拼</label>
      <input type="text" id="切拼" v-model="form.切拼" placeholder="如：syuiH">
    </div>
    <div class="form-group full-width">
      <label for="釋義">釋義</label>
      <input type="text" id="釋義" v-model="form.釋義" placeholder="如：水也">
    </div>
    <div class="form-group full-width">
      <button type="submit" :disabled="isLoading">{{ isLoading ? '检索中...' : '开始检索' }}</button>
    </div>
  </form>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'SearchForm',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['search'],
  setup(props, { emit }) {
    const state = reactive({
      form: {
        字頭: '',
        諧聲域: '',
        聲首: '',
        上古聲: '',
        上古韻: '',
        '上古音（參考）': '',
        中古地位: '',
        切語: '',
        切拼: '',
        釋義: ''
      }
    })

    const onSubmit = () => {
      emit('search', { ...state.form })
    }

    return {
      ...toRefs(state),
      onSubmit
    }
  }
}
</script>

<style scoped>
/* 搜索表单 */
.search-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  background: var(--bg-card);
  padding: 1.5rem 2rem;
  border-radius: var(--radius);
  box-shadow: 0 2px 6px rgb(0 0 0 / 5%);
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  margin-bottom: .5rem;
  font-weight: 600;
}

input[type="text"] {
  width: 100%;
  padding: .5rem .75rem;
  border: 1px solid #d1d5db;
  border-radius: var(--radius);
  color: var(--text-main);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color var(--speed), box-shadow var(--speed);
}

input[type="text"]:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgb(52 152 219 / 20%);
}

button[type="submit"] {
  background: var(--primary);
  color: #fff;
  padding: .75rem 1.5rem;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  transition: background-color var(--speed);
}

button[type="submit"]:hover {
  background: var(--primary-hover);
}

button[type="submit"]:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}
</style>