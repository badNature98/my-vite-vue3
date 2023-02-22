import "./d3_style.scss";
import d3 from "./d3";
import { componentPathToName } from "@/utils/.build/components";

// //所有的其他文件下的 index.ts 是不同的组件
// export const components = (()=>{
//   let use = componentPathToName(import.meta.glob("./**/index.ts", { eager: true }),'.ts')
//   for(let key in use){
//     use[key] = use[key].default
//   }
//   return use
// })()

const barPadding: any = {
  start: (padding?: number) => 0,
  center: (padding: number) => padding / 2,
  end: (padding: number) => padding,
};

/**
 * @name input-to-output
 * @description 传入input和output会返回一个函数，该方法传入数字，会根据输入的比例，转换成输出的比例
 *
 * 例子：
 * const scaleNum = scale([0,10],[0,100]);
 * scaleNum(1.5); // 返回 15
 * @param input
 * @param output
 * @returns {Function}
 */
export function scaleLinear(
  input: [number, number],
  output: [number, number]
): Function {
  return d3
    .scaleLinear()
    .domain(input) //输入的
    .range(output); //得到的
}

//获取自己的
export function getBarPadding(val: string) {}

/**
 * @name 下面为用到的各种类
 */
interface d3_item_style {
  style?: {}; //每个item 单独的样式
  barWidth?: number; //每个图形的宽度
  barPadding?: number; //每个图形的间距
  align?: string; //是否居中
}
//初始化储存的数据
interface d3_init_data {
  width: number;
  height: number;
  item?: d3_item_style;
  data: any[];
}

const defauktInitData = {
  item: {
    barPadding: 10,
    align: "center",
  },
};
//deConponent
export class d3Conponent {
  d3: any;
  self: any;
  align: string;
  padding: number;
  initData?: d3_init_data;
  static barPadding = {
    start: (padding?: number) => 0,
    center: (padding: number) => padding / 2,
    end: (padding: number) => padding,
  };
  /**
   * @param select 选择的存在框架里
   * @param initData 初始数据
   */

  constructor(select: string, initData: d3_init_data) {
    this._initData(initData);
    this.d3 = d3;
    this.self = this.d3.select(select);
    this.padding = 10;
    this.align = "center";
    this.init();
  }
  //初始化储存的数据
  _initData(initData: d3_init_data) {
    let cloneData = JSON.parse(JSON.stringify(defauktInitData));
    function joinData(outData: d3_init_data, inData: d3_init_data) {
      
      return outData;
    }
    this.initData = joinData(cloneData, initData);
    console.log(defauktInitData, initData);
  }
  init() {
    throw new Error("Method not implemented.");
  }
  getBarPadding() {
    return barPadding[this.align];
  }
}

//默认暴露d3
export default d3;
