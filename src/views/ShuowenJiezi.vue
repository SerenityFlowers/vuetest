<template>
  <DictionaryTemplate 
    :dictionary-id="SHUOWEN_JIEZI_DICT_ID"
    :dictionary-config="dictionaryConfig"
  />
</template>

<script setup>
import DictionaryTemplate from '@/views/DictionaryTemplate.vue'
import { shuowenJieziConfig } from '@/config/dictionaries'

// 说文解字字典ID
const SHUOWEN_JIEZI_DICT_ID = 'shuowen-jiezi'

// 字典配置
const dictionaryConfig = shuowenJieziConfig
</script> 