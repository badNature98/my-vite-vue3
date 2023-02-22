<script setup lang="ts">
import useStore from '@/store';
import { onMounted ,computed  } from 'vue';
const { permission, setting, app } = useStore();
const routes = computed(() => permission.routes);
const props = defineProps({})
onMounted(()=>{})
</script>

<template>
  <div class="layout-sidebar">
    <slot/>
  </div>
</template>
