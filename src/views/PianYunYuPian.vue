<template>
  <DictionaryTemplate 
    :dictionary-id="PIANYUN_YUPIAN_DICT_ID"
    :dictionary-config="dictionaryConfig"
  />
</template>

<script setup>
import DictionaryTemplate from '@/views/DictionaryTemplate.vue'
import { pianYunYuPianConfig } from '@/config/dictionaries'

// 切韵玉篇字典ID
const PIANYUN_YUPIAN_DICT_ID = 'pianyun-yupian'

// 字典配置
const dictionaryConfig = pianYunYuPianConfig
</script>