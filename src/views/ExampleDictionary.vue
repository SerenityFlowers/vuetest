<template>
  <DictionaryTemplate 
    :dictionary-id="EXAMPLE_DICT_ID"
    :dictionary-config="dictionaryConfig"
  />
</template>

<script setup>
import DictionaryTemplate from '@/views/DictionaryTemplate.vue'
import { exampleNewDictionaryConfig } from '@/config/dictionaries'

// 示例字典ID
const EXAMPLE_DICT_ID = 'example-dict'

// 字典配置
const dictionaryConfig = exampleNewDictionaryConfig
</script> 