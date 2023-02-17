export default {}
//  官网 https://greensock.com
//  import { gsap } from "gsap";
/*
  核心模块
  使用

  gsap.to(targets,vars)：从开始的位置到结束的位置。
  targets - 你需要添加动画的对象，可以是object,array和选择器".myClass"。
  vars - 一个对象，里面包含你想要改变的属性，延时，已经回调函数等。

  gsap.from(targets,vars)：与上面的gsap.to相反，这个是从结束的位置到开始的位置。
  Easing：运动状态。属于vars中的一个属性。

  var tween = gsap.from("#app", {
      duration: 5,
      x: 500,
      ease:"elastic.in(1,1)" //运动状态
  });
  Draggable.create("#app");

  回调函数
  onComplete：动画完成时调用。
  onStart：动画开始时调用
  onUpdate：每次动画更新时调用（在动画处于活动状态时每帧调用）。
  onRepeat：每次动画重复时调用一次。
  onReverseComplete：动画反转后再次到达其起点时调用。
var tween = gsap.from("#app", {
  duration: 5,
  x: 500,
  ease:"elastic.in(1,1)",
  onComplete:function () { //动画播放完成时调用
      console.log("111");
  }
});

  控制动画

  tween.pause(); //暂停
  tween.resume(); //恢复
  tween.reverse(); //反向播放
  tween.seek(0.5); //跳到0.5s
  tween.progress(0.25); //跳到4分之1处
  tween.timeScale(0.5); //速度减慢
  tween.timeScale(2); //速度翻倍
  tween.kill(); //删除动画


  Timeline
  从整体上控制一组动画。
  在不使用很多delay的情况下构建一个动画序列。（如果对前一个动画进行时间调整后一个动画的触发时间也会改变，从而大大简化了实验和维护工作）。
  对动画进行模块化。
  可以进行非常复杂的动画编排。
  要基于一组动画触发回调（例如“在完成所有这些动画之后，调用myFunction()”）。
  生命时间线变量var t1 = gsap.timeline();

  然后将需要依次触发的动画添加入时间线里即可，例如：
  时间轴的特殊属性：

  repeat：动画重复的次数。
  repeatDelay：两次重复之间的间隔时间（以秒为单位）。
  yoyo：如果为true，则每次重复播放都会前后交替进行。
  delay：时间轴开始之前的延迟（以秒为单位）。
  onComplete：时间线播放完毕后调用的函数。
*/
