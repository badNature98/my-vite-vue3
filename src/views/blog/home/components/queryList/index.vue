<script setup lang="ts">
import { ref, onBeforeUnmount , onMounted } from "vue";
import { list, bindQuery } from "./setup";
import { download } from "@/api/local/index";
const emit = defineEmits(["getFile"]); //注册通讯父的事件
async function getFile(file: { dir: string }) {
  const data = await download(file);
  emit("getFile", data);
}
let unbind = bindQuery()
onBeforeUnmount(()=>{
  unbind()
})
</script>
<template>
  <div>
    <template v-if="list.length">
      <div v-for="(item, ind) in list" :key="ind" @click="getFile(item)">
        {{ item.name }}
      </div>
    </template>
  </div>
</template>
