<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import Temp from "./Template.vue";
const routers = useRouter();
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const clickItem = function () {
  if (props.item.path) {
    routers.push({ path: props.item.path });
  }
};
</script>
<template>
  <el-menu-item @click="clickItem" :index="props.item.path">
    <Temp :item="props.item" />
  </el-menu-item>
</template>
