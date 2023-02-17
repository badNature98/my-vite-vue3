<script setup>
import useStore from '@/store';
import { onMounted ,computed  } from 'vue';
const { permission, setting, app } = useStore();
const routes = computed(() => permission.routes);
const props = defineProps({})
onMounted(()=>{})

</script>

<template>
  <div class="layout-header">
    <slot/>
  </div>
</template>
