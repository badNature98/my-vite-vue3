<script setup lang="ts">
import { isBoolean } from "@vueuse/shared";
import { ref, onMounted, Ref } from "vue";
const props = defineProps({
  defaultDrop: {
    type: Boolean,
    default: true,
  },
  clickHeaderDrop: {
    type: Boolean,
    default: true,
  },
  ms: {
    type: Number,
    default: 300,
  },
  length: {
    type: Number,
    default: null,
  },
});
const lengthClass: Ref<string> = ref<string>(
  props.length ? `drop-box-length-${props.length}` : ""
);
const DropContent = ref(); //内容外壳
const DropContentInner = ref()//内容
const drop = ref(true); //状态改变时计算用
const showDrop = ref(true); //最终结果
let timer: any = null;

const changeDorp = function (bool?:any) 
{
  if (!props.clickHeaderDrop) return;
  if (isBoolean(bool)) drop.value = bool;
  else drop.value = !drop.value;
  let sfunc: Function; //开始时触发的
  DropContent.value.style.transition = `height ${props.ms}ms`;
  DropContent.value.style.display = "block";
  //获取内容的高度
  let height = DropContentInner.value.clientHeight

  if (drop.value) {
    DropContent.value.style.height = `0px`;
    sfunc = () => {
      DropContent.value.style.height = `${height}px`;
    };
  } else {
    DropContent.value.style.height = `${height}px`;
    sfunc = () => {
      DropContent.value.style.height = `0px`;
    };
  }
  setTimeout(() => {
    sfunc();
    clearTimeout(timer);
    timer = setTimeout(() => {
      DropContent.value.style.transition = null;
      DropContent.value.style.height = null;
      DropContent.value.style.display = null;
      showDrop.value = drop.value;
    }, props.ms);
  });
};

onMounted(() => {
  drop.value = props.defaultDrop;
  showDrop.value = drop.value;
});
</script>
<template>
  <div
    ref="DropBox"
    class="drop-box"
    :class="{
      drop: showDrop,
      'is-drop': drop,
      [lengthClass]: lengthClass,
    }"
  >
    <div class="drop-box-header" @click="changeDorp">
      <div class="drop-box-header-left">
        <slot name="header"> title </slot>
      </div>
      <div class="drop-box-header-right">
        <slot name="drop-icon">
          <Icon name="def-Drop-down" />
        </slot>
      </div>
    </div>
    <div ref="DropContent" class="drop-box-content">
      <div ref="DropContentInner" class="drop-box-content-inner">
        <slot />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.drop-box {
  &.is-drop {
    > .drop-box-header {
      > .drop-box-header-right {
        svg {
          transform: rotate(0deg);
        }
      }
    }
  }
  &.drop {
    > .drop-box-content {
      display: block;
    }
  }
  > .drop-box-header {
    display: flex;
    > .drop-box-header-left {
      flex-grow: 1;
    }
    > .drop-box-header-right {
      svg {
        transform: rotate(-90deg);
      }
    }
  }
  > .drop-box-content {
    overflow: hidden;
    display: none;
  }
}
</style>
