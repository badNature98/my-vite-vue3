/**
 * 系统类型声明
 */
export interface AppState {
  device: string;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  language: string;
  size: string;
  activeName: string;
  window: AppState_window;
}

//记录几何大小
interface AppState_window {
  innerHeight: number;
  innerWidth: number;
  outerHeight: number;
  outerWidth: number;
  screenLeft: number;
  screenTop: number;
  screenX: number;
  screenY: number;
  scrollX: number;
  scrollY: number;
}
