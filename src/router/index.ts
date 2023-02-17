import useStore from '@/store';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
//App 中的框架
import Layout from "@/layout/index.vue";
import {filterRoutes} from '@/store/modules/permission'

/**
 * @description 路由对象
  {
    path:'/',//路径地址
    component: Layout,
    meta: { 
      hidden: true , //是否显示
      layout:'None', //应用的 layout 子类
    },
    children: [ //子路由
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
 */

//静态路由
export const constantRoutes = filterRoutes([
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/signup",
    component: () => import("@/views/login/signup.vue"),
    meta: { hidden: true },
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/error-page/401.vue"),
    meta: { hidden: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/error-page/404.vue"),
  },  
  {
    path: "/",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },

]);



// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 重置路由
export function resetRouter() {
  const { permission } = useStore();
  permission.routes.forEach((route:any) => {
    const name = route.name;
    if (name && router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
}

export default router
