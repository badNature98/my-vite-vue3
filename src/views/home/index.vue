<script lang="ts">
/**
 * 最基本的主页 拥有个人信息 还有 可用路由操作
 */
import { defineComponent } from "vue";
import useStore from "@/store";
import { useRouter } from 'vue-router'
const { user } = useStore();
let roles = user.roles;

export default defineComponent({
  setup() {
    const router = useRouter()
    return {
      routerTo(path:string){
        router.push({path})
      },
      user,
      roles,
    };
  },
});
</script>

<template>
  <div class="home">
    <Header> 
      欢迎使用 
    </Header>
    <RouterMenu :showChild="false"/>
    <!-- <div>
      <div v-for="item in roles" :key="item">
        <el-button @click="routerTo(item)" type="primary">{{item}}</el-button>
        </div>
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
.home {
  .layout-header{
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
