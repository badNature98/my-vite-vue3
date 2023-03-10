<template>
  <div class="blog-query">
    <el-input name="blog-query" v-model="query">
      <template #append>
        <Icon name="def-Query" @click="doQuery.send" />
      </template>
    </el-input>
  </div>
</template>
<script setup lang="ts">
import { query,doQuery } from '../../setup'
</script>
