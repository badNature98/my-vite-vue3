<script setup lang="ts">
import MenuItem from "./components/MenuItem.vue";
import MenuSub from "./components/MenuSub.vue";
import { shallowRef } from "vue";
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  showChild: {
    //是否显示子级
    type: Boolean,
    default: true,
  },
  mode: {
    /**
     * @description vertical = 纵向风格; horizontal = 横向风格
     */
    type: String,
    default: "vertical",
  },
  collapse:{
    //控制宽度
    type:Boolean,
    default:false
  }
});
const menuComponent = shallowRef(MenuItem);
if (
  props.showChild &&
  props.item.children &&
  props.item.children.some(
    (route: any) => route.meta && route.meta.hidden !== true
  )
) {
  menuComponent.value = MenuSub;
}
</script>

<template>
  <component
    :is="menuComponent"
    v-if="item.meta && !item.meta.hidden"
    :item="item"
  >
    <template v-if="item.children && item.children.length">
      <el-scrollbar
        v-if="
          (props.mode === 'horizontal' && item.children.length > 18) ||
          (props.mode !== 'horizontal' && props.collapse && item.children.length > 18)
        "
        class="vab-menu-children-height"
      >
        <Menu v-for="route in item.children" :key="route.path" :item="route" />
      </el-scrollbar>
      <template v-else>
        <Menu v-for="route in item.children" :key="route.path" :item="route" />
      </template>
    </template>
  </component>
</template>
