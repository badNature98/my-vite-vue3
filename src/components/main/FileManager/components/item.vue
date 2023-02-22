<script setup lang="ts">
const props = defineProps({
  data:{
    type:Object,
    default:()=>({})
  }
})
</script>

<template>
  <div class="file-manager-item">
    <slot :data="props.data">
      {{props.data.name}}
    </slot>
  </div>
</template>
