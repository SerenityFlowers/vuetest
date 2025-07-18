<template>
  <DictionaryTemplate 
    :dictionary-id="JINGDIAN_SHIWEN_DICT_ID"
    :dictionary-config="dictionaryConfig"
  />
</template>

<script setup>
import DictionaryTemplate from '@/views/DictionaryTemplate.vue'
import { jingdianShiwenConfig } from '@/config/dictionaries'

// 经典释文字典ID
const JINGDIAN_SHIWEN_DICT_ID = 'jingdian-shiwen'

// 字典配置
const dictionaryConfig = jingdianShiwenConfig
</script> 