<!-- 垃圾组件-功能实现不了 -->
<script setup lang="ts">
import { ref, inject, watch, computed, defineEmits, onMounted } from "vue";
import { isNumber } from "@/utils/validate";
import { windowInfo } from "./setup";

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

const style: any = ref({
  position: "",
  left: "",
  top: "",
});
function getPosition() {
  // console.log([child.value]);
}

function getValue(val: string) {
  return isNumber(val) ? val + "px" : val;
}

let linten: any = inject("linten", null);
const child = ref();
let top: number, left: number;

//当前子是否比可视区域大-高
const itemHeightBiggerWindow = computed(
  () => child.value?.clientHeight > linten.value.seeHeight
);

onMounted(() => {
  top = child.value.offsetTop || 0;
  left = child.value.offsetLeft || 0;
  //设置了粘贴
  if (config.sticky && linten) {
    watch(
      linten,
      (v: windowInfo) => {
        //监听的定位 self 或 window

        //是否开启定位
        let usePosition = false;

        //上
        if (v.scrollTop > top) {
          usePosition = true;
          style.value.top = v.scrollTop - top + "px";
        } else {
          style.value.top = "";
        }

        //左
        if (v.scrollLeft > left) {
          usePosition = true;
          style.value.left = v.scrollTop - left + "px";
        } else {
          style.value.left = "";
        }

        if (config.sticky.bottom && itemHeightBiggerWindow.value) {
          let bot = config.sticky.bottom;
          getPosition();
        }

        style.value.position = usePosition ? "relative" : "";

        //期望定位
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
  <div ref="child" :style="style" class="flex-box-item">
    {{ itemHeightBiggerWindow }}
    <slot />
  </div>
</template>
