import d3,{d3Conponent} from "@/utils/d3";


//item class
let itemClass = ["class", "d3-flex"];

class BarChart extends d3Conponent{
  init(){
    console.log(this.self)
  }
}

// function asd(selectValue: any, initData: any) {
//   let {
//     width,
//     height,
//     item: { style, barWidth, barPadding = 10, align = "center" } = {},
//     data,
//   } = initData;
//   //生成一个svg
//   const svg = d3
//     .select(selectValue)
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height);
//   var rectHeight = 25; //每个矩形所占的像素高度(包括空白)
//   var dataset = [250, 210, 170, 130, 90]; //数据（表示矩形的宽度）
//   svg
//     .selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr(...itemClass)
//     .append("rect")
//     .attr("x", 20)
//     .attr("y", function (d: string, i: number) {
//       return i * rectHeight;
//     })
//     .attr("width", function (d: number) {
//       return d;
//     })
//     .attr("height", rectHeight - 2);
// }

export default BarChart;
