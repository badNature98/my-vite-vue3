import { AppState } from "@/types/store/app";
import { localStorage } from "@/utils/storage";
import { defineStore } from "pinia";
import { getLanguage } from "@/lang/index";

const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    device: "desktop",
    sidebar: {
      opened: localStorage.get("sidebarStatus")
        ? !!+localStorage.get("sidebarStatus")
        : true,
      withoutAnimation: false,
    },
    language: getLanguage(),
    size: localStorage.get("size") || "default",
    activeName: "",
    window: {
      innerHeight: 0,
      innerWidth: 0,
      outerHeight: 0,
      outerWidth: 0,
      screenLeft: 0,
      screenTop: 0,
      screenX: 0,
      screenY: 0,
      scrollX: 0,
      scrollY: 0,
    },
  }),
  actions: {
    //储存window 变化后的属性
    getWindow() {
      this.window.innerHeight = window.innerHeight;
      this.window.innerWidth = window.innerWidth;
      this.window.outerHeight = window.outerHeight;
      this.window.outerWidth = window.outerWidth;
      this.window.screenLeft = window.screenLeft;
      this.window.screenTop = window.screenTop;
      this.window.screenX = window.screenX;
      this.window.screenY = window.screenY;
      this.window.scrollX = window.scrollX;
      this.window.scrollY = window.scrollY;
    },
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        localStorage.set("sidebarStatus", 1);
      } else {
        localStorage.set("sidebarStatus", 0);
      }
    },
    closeSideBar(withoutAnimation: any) {
      localStorage.set("sidebarStatus", 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    setSize(size: string) {
      this.size = size;
      localStorage.set("size", size);
    },
    setLanguage(language: string) {
      this.language = language;
      localStorage.set("language", language);
    },
    /**
     * @description 修改 activeName
     * @param activeName 当前激活菜单
     */
    changeActiveName(activeName: string) {
      this.activeName = activeName;
    },
  },
});


//自动注册weindow resize 变化事件
let resizeApp:any = null
function windowResize(){
  if(!resizeApp) resizeApp =  useAppStore()
  resizeApp.getWindow()
}
setTimeout(windowResize)
window?.addEventListener('resize',windowResize)

export default useAppStore;
