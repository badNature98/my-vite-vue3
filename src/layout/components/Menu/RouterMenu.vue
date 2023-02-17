<script setup lang="ts">
import settings from '@/settings'
import { computed, ref,watch } from "vue";
import userStore from "@/store";
import {useRoute} from 'vue-router'
const props = defineProps({
  showChild: {
    //是否显示子
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
  path:{
    /**
     * @description 路由的开始路径 已办用于获取一级往后的菜单列
     */
    type:String,
    default:null
  }
});
const { permission,app } = userStore();
const appWindow = computed(()=>app.window)
watch(()=>appWindow.value.innerWidth,(v)=>{
  if(v<settings.menuCollapse){
    isCollapse.value=true
  }else{
    isCollapse.value=false

  }
})
const isCollapse = ref(appWindow.value.innerWidth<settings.menuCollapse); //是否折叠
//打开
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
//关闭
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const list = computed(() => {
  if(props.path){
    for(let item of permission.addRoutes){
      if(item.path === props.path)return item.children
    }
  }
  return permission.addRoutes;
});
const route = useRoute()
function pathChange(){
app.changeActiveName(route.path)
}
watch(()=>route.path,pathChange)
pathChange()
</script>
<template>
  <el-menu
    :default-active="app.activeName"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :mode="props.mode"
    @open="handleOpen"
    @close="handleClose"
  >
    <slot />
    <Menu
      v-for="item in list"
      :item="item"
      :key="item"
      :showChild="showChild"
    />
  </el-menu>
</template>
