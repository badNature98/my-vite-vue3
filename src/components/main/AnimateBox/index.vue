<script setup lang="ts">
/**
 * @name AnimateBox
 * @description 组件中的 元素 将会获得自动动画
 */
import { ref, Ref, onMounted } from "vue";
import useAnimate from "@formkit/auto-animate";
const box: Ref<any> = ref();
onMounted(() => {
  useAnimate(box.value);
});
</script>
<template>
  <div ref="box">
    <slot />
  </div>
</template>
