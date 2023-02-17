<script setup lang="ts">
const props = defineProps({
  ritate: {
    type: [Number,String], // 参数类型
    default: 2, //默认值
    required: false, //是否必传
  },
  border: {
    type: Boolean, // 参数类型
    default: true, //默认值
    required: false, //是否必传
    validator: (value: any) => {
      return value !== false; // 除了验证是否符合type的类型，此处再判断该值结果是否符合验证
    },
  },
});
import { isBoolean } from "@vueuse/shared";
import { ref, onMounted } from "vue";
const HoverBox = ref();
const Thumb = ref();
const show = ref(false);
const ThumbStyle = ref({
  left: "0",
  top: "0",
});
const HoverBoxStyles = ref({
  transform: "",
});
onMounted(() => {
  HoverBox.value.addEventListener("mouseover", () => {
    HoverBoxStyles.value.transform = "";
    show.value = true;
  });
  HoverBox.value.addEventListener("mouseout", () => {
    HoverBoxStyles.value.transform = "";
    show.value = false;
  });
  HoverBox.value.addEventListener("mousemove", (e: any) => {
    e.target.clientWidth;
    e.target.clientHeight;

    ThumbStyle.value.left = e.layerX + "px";
    ThumbStyle.value.top = e.layerY + "px";
    let x = e.layerX || 1;
    let y = e.layerY || 1;

    //划过凹陷
    // x=x / e.target.clientWidth * props.ritate - props.ritate*0.5;
    // y=0 - (y / e.target.clientHeight* props.ritate - props.ritate*0.5);
    //划过凸起
    x = 0 - ((x / e.target.clientWidth) * props.ritate - props.ritate * 0.5);
    y = (y / e.target.clientHeight) * props.ritate - props.ritate * 0.5;

    HoverBoxStyles.value.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
});
</script>
<template>
  <div
    ref="HoverBox"
    :style="HoverBoxStyles"
    class="hover-box"
    :class="{ border }"
  >
    <div class="hover-thumb">
      <div
        ref="Thumb"
        class="hover-thumb-item"
        :class="{ background: !$slots.thumb, show }"
        :style="ThumbStyle"
      >
        <slot name="thumb" />
      </div>
    </div>
    <div class="hover-box-body">
      <slot />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.hover-box {
  cursor: default;
  display: inline-block;
  transition: all 0.3s;
  position: relative;
  transform: perspective(700px) rotateX(0deg) rotateY(0deg);
  &.border {
    border: 1px solid #0f0f0f;
    border-radius: 5px;
  }
  .hover-box-body {
    position: relative;
  }
  .hover-thumb {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  .hover-thumb-item {
    opacity: 0;
    position: absolute;
    transition: opacity 0.3s, box-shadow 0.3s;
    &.background {
      // color: blueviolet;
      color: orangered;
      border-radius: 100%;
      box-shadow: 0 0 0 0;
    }
    &.show {
      opacity: 0.2;
      box-shadow: 0 0 50px 50px;
    }
  }
}
</style>
