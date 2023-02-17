//初始化时进行的操作
import { getOsInfo } from "@/utils/OS";
import { defineStore } from "pinia";

interface OSstate {
  name: string;
  version: string;
  mobile: boolean;
}
const OSState = {
  name: "",
  version: "",
  mobile: false,
}
const GetOsInfo = function (){
  let OS = getOsInfo();
  OSState.name = OS.name
  OSState.mobile = OS.mobile
  OSState.version = OS.version
}
GetOsInfo()
const useOS = defineStore({
  id: "OS",
  state: (): OSstate => (OSState),
  actions: {
    async init() {
      await this.getOsInfo();
      this.isMobile();
    },
    //获取操作系统信息
    getOsInfo:GetOsInfo,
    //是否是移动端
    isMobile() {
      if (this.mobile) {
        //设置meta
        const meta =
          document.querySelector("meta[name=viewport]") ||
          document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute(
          "content",
          "width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
        );
        document.head.appendChild(meta);
        // 禁用双指放大
        document.documentElement.addEventListener(
          "touchstart",
          function (event) {
            if (event.touches.length > 1) {
              event.preventDefault();
            }
          },
          {
            passive: false,
          }
        );

        // 禁用双击放大
        var lastTouchEnd = 0;
        document.documentElement.addEventListener(
          "touchend",
          function (event) {
            var now = Date.now();
            if (now - lastTouchEnd <= 300) {
              event.preventDefault();
            }
            lastTouchEnd = now;
          },
          {
            passive: false,
          }
        );
      }
    },
  },
});
export default useOS;
