<script setup lang="ts">
import { useAutoAnimate } from "@formkit/auto-animate/vue";
/**
 * @name AnimateBox
 * @description 组件中的 元素 将会获得自动动画
 */
const [box] = useAutoAnimate();
</script>
<template>
  <div ref="box" >
    <slot  />
  </div>
</template>
