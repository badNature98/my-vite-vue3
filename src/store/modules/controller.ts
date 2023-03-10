//初始化时进行的操作
import { defineStore } from "pinia";

interface controllerState {
  changeRouterMenu: boolean;
}

const useController = defineStore({
  id: "controller",
  state: (): controllerState => ({
    /**
     * @name RouterMenu中监听方法
     * @description 开启后次组件会根据宽度展现不同的样式
     */
    changeRouterMenu: false,
  }),
  actions: {
    async init() {
    
    },
  },
});
export default useController;
