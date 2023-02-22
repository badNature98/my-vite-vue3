<!-- 垃圾组件-功能实现不了 -->
<script setup lang="ts">
//子组件可以通讯父组件的方法
import { ref, onMounted, watch, provide, onBeforeUnmount } from "vue";
import { windowInfo } from "./setup";

const config = defineProps({
  listen: {
    type: String,
    default: "window",
  },
  scroll: {
    type: Boolean,
    default: undefined,
  },
});
const FlexBox = ref();
//切换监听对象
watch(
  () => config.listen,
  (v) => changeListen(v)
);
function changeListen(v: string) {
  removeEvent();
  if (v === "self") {
    FlexBox.value.addEventListener("scroll", scrollChange_base);
  } else if (v === "window") {
    window.addEventListener("scroll", scrollChange_window);
  }
}

const windowInfo = ref({
  seeHeight: 0,
  seeWidth: 0,
  scrollHeight: 0,
  scrollWidth: 0,
  scrollLeft: 0,
  scrollTop: 0,
});

function scrollChange_event(event: windowInfo) {
  windowInfo.value["seeHeight"] = event["seeHeight"];
  windowInfo.value["seeWidth"] = event["seeWidth"];
  windowInfo.value["scrollHeight"] = event["scrollHeight"];
  windowInfo.value["scrollWidth"] = event["scrollWidth"];
  windowInfo.value["scrollLeft"] = event["scrollLeft"];
  windowInfo.value["scrollTop"] = event["scrollTop"];
}
function scrollChange_window(event: any) {
  let EventBody = event.target === document ? document.body : event.target;
  let seeHeight = document.documentElement.clientHeight; //可见高度
  let seeWidth = document.documentElement.clientWidth; //可见宽度
  let scrollHeight = EventBody.scrollHeight; //可滚动内容高度
  let scrollWidth = EventBody.scrollWidth; //可滚动内容宽度
  let scrollLeft = window.pageXOffset; //滚动条到左边的距离
  let scrollTop = window.pageYOffset; //滚动条到头部的距离
  scrollChange_event({
    seeHeight,
    seeWidth,
    scrollHeight,
    scrollWidth,
    scrollLeft,
    scrollTop,
  });
}
function scrollChange_base(event: any) {
  event = event || window.event;
  let seeHeight = event.target.clientHeight; //可见高度
  let seeWidth = event.target.clientWidth; //可见宽度
  let scrollHeight = event.target.scrollHeight; //可滚动内容高度
  let scrollWidth = event.target.scrollWidth; //可滚动内容宽度
  let scrollLeft = event.target.scrollLeft; //滚动条到左边的距离
  let scrollTop = event.target.scrollTop; //滚动条到头部的距离
  scrollChange_event({
    seeHeight,
    seeWidth,
    scrollHeight,
    scrollWidth,
    scrollLeft,
    scrollTop,
  });
}
provide("linten", windowInfo);
function removeEvent() {
  window.removeEventListener("scroll", scrollChange_window);
  FlexBox.value.removeEventListener("scroll", scrollChange_base);
}
onMounted(() => {
  changeListen(config.listen);
});
onBeforeUnmount(() => {
  removeEvent();
});
</script>
<template>
  <div
    ref="FlexBox"
    class="flex-box"
    :class="{ 'flex-box-scroll': config.scroll }"
  >
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.flex-box {
  display: flex;
  align-items: flex-start;
  &.flex-box-scroll {
    overflow: auto;
  }
  :deep() {
    > .flex-box-item {
      position: sticky;
    }
  }
}
</style>
