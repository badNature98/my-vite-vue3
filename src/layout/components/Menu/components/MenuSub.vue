<script setup lang="ts">
import Temp from "./Template.vue";
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <el-sub-menu :index="props.item.path">
    <template #title>
      <Temp :item="props.item" />
    </template>
    <slot />
  </el-sub-menu>
</template>
