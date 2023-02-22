(() => {
  //临时使用的CND
  document.head.appendChild(
    ["https://d3js.org/d3.v5.min.js"].reduce((h, u) => {
    let script = document.createElement("script");
    script.setAttribute('src',u)
    h.appendChild(script);
    return h
  }, document.createDocumentFragment())
  )
  
})();

//app.ts 中注冊了 app
import "@/styles/index";
import app from "./app";
import "@/store";
import router from "@/router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";



//路由守卫
import "@/router/permission";

// 引入svg注册脚本
import "virtual:svg-icons-register";

//引入常用组件
import "@/components/main";

//基本组件
import "@/layout/components/index";

// 国际化
import i18n from "@/lang/index";

app.use(createPinia()).use(ElementPlus).use(i18n).use(router).mount("#app");
