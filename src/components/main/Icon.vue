<template>
  <svg aria-hidden="true" class="icon" :class="{transition:anima}">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
/**
 * @name Icon
 * @description 自定义icon组件 vite-plugin-svg-icons
 */
import { computed } from 'vue';

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: false
  },
  color: {
    type: String,
    default: ''
  },
  anima:{
    type: Boolean,
    default: true
  }
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
.transition{
  transition: all .3s;
}
</style>
