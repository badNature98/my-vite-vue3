<template>
  <!-- <component :style="styles" :is="useTemp" /> -->
  <component :is="useTemp" />
</template>

<script setup>
import templates, { localLayout , styles } from "./template/index";
import { useRoute } from "vue-router";

import {
  onMounted,
  reactive,
  ref,
  shallowRef,
  toRefs,
  watch,
  nextTick,
  computed,
} from "vue";

let route = useRoute();
const useLayout = computed(() => {
  return route.meta.layout || localLayout.value;
});

const useTemp = shallowRef();
//监听 布局改变
watch(()=>useLayout.value, getTemp);
async function getTemp(val) {
  let tem = templates[val] || templates["None"];
  if (tem instanceof Function) {
    tem = (await tem()).default;
  }
  useTemp.value = tem;
}
getTemp(useLayout.value);


</script>
