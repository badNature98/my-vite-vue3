<script setup lang="ts">
import { ref } from 'vue';
import { getFileByPath } from "@/api/local/index";

const fileList = ref([]);
const getFiles = async function () {
  const { data } = await getFileByPath();
  fileList.value = data;
};
</script>
<template>
    <el-button @click="getFiles">获取文件</el-button>
    <FileManager :list="fileList"> </FileManager>
</template>
