<template>
  <section class="layout-main">    
    <router-view v-slot="{ Component, route }">
      <!-- <transition name="fade" > -->
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      <!-- </transition> -->
    </router-view>
  </section>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import useStore from "@/store";

const route = useRoute();
// const router = useRouter();
const { tagsView } = useStore();
const cachedViews = computed(() => tagsView.cachedViews);
</script>
<style scoped>
 /* 渐变设置 */
.fade-enter-from, .fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.1s ease;
}
.fade-leave-active {
   transition: all 0.1s cubic-bezier(1, 0.6, 0.6, 1);
}

</style>
