/**
 * layout 主要是外部的一个躯壳 
 * 主要内容呈现在 Main 组件里面
 * 内容界面在 src/views 中 
 */
import { ref } from 'vue';
import {componentPathToName} from '@/utils/.build/components'
import './styles/index'
import useStore from '@/store';
const components: Record<string, any> = import.meta.glob("./**/*.vue");
//把路径转成名称
componentPathToName(components,'.vue')
//以下为Layout 文件下的公用配置

//默认使用的路由 None
export const localLayout = ref('Node')

//大于1012 和 小于 1012 需要两种布局
//960 布局
//需要额外注册的 样式
/**
 * @命名规范
 * --layout-header-backgroundColor-dark-0
 * --[名字]-[属于部分]-([补充])?-[作用](-[状态])?(-[等级])?
 * [状态]=> light 亮 | dark 暗
 * [等级]=> Number (0-9)
 */
export const styles = ref({
  '--layout-body-fontSize':'16px',
  
  '--layout-body-backgroundColor': '#F9F9F9',

  '--layout-header-backgroundColor': '#303030',
  '--layout-header-backgroundColor-light': '#4F4F4F',
  '--layout-header-backgroundColor-dark': '#1B1B1B',
  '--layout-header-color': '#F5F5F5',
  '--layout-header-color-light': '#FCFCFC',
  '--layout-header-color-dark': '#DCDCDC',

  '--layout-menu-backgroundColor': 'var(--layout-header-backgroundColor)',
  '--layout-menu-backgroundColor-light': 'var(--layout-header-backgroundColor-light)',
  '--layout-menu-backgroundColor-dark': 'var(--layout-header-backgroundColor-dark)',
  '--layout-menu-color': 'var(--layout-header-color)',
  '--layout-menu-color-light': 'var(--layout-header-color-light)',
  '--layout-menu-color-dark': 'var(--layout-header-color-dark)',

  '--layout-menu-active-backgroundColor': '#696969',
  '--layout-menu-active-backgroundColor-light': '#828282',
  
  '--layout-menu-active-color': '#FFD700',

  '--layout-main-backgroundColor': 'var(--layout-body-backgroundColor)',

  '--layout-button-color': '#F5F5F5',
  '--layout-button-color-light': '#FCFCFC',
  '--layout-button-color-dark': '#DCDCDC',


})

//设置 root 的属性
export function setProperty(styles:styles){
  for(let s in styles){
    document.documentElement.style.setProperty(s,styles[s])
  }
}

interface styles {
  [prop: string]: string;
}


//自动注册


export default components

//加载完成后 判断是什么西永
window.addEventListener('load',()=>{
  const {OS} = useStore()
  console.log(OS.mobile)
  setProperty(styles.value)
  
})
