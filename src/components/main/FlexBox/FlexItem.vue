<script setup lang="ts">
import { ref, inject, watch, computed, defineEmits, onMounted } from "vue";
import { isNumber } from "@/utils/validate";
const emit = defineEmits(["item-click"]); //注册通讯父的事件
const config = defineProps({
  /**
   * {
   *  left:string | number,
   *  top:string | number,
   *  right:string | number,
   *  botton:string | number
   * }
   */
  sticky: {
    type: Object,
    default: null,
  },
});

function getPosition(){

console.log([child.value])
}

function getValue(val: string) {
  return isNumber(val) ? val + "px" : val;
}

let linten = inject("linten", null);
const child = ref();
onMounted(() => {
  //设置了粘贴
  if (config.sticky && linten) {
    watch(
      linten,
      (v) => {
        console.log(v);
        getPosition()
        getValue(config.sticky.left);
      },
      {
        deep: true,
      }
    );
  }
});
</script>

<template>
  <div ref="child" class="flex-box-item">
    <slot />
  </div>
</template>
