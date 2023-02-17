<script setup>
//默认是用的模板
</script>
<template>
  <div class="app-inner">
    <Main class="app-content" />
    <Header class="app-header"> 
      <h2>模型Demo</h2>
     </Header>
    <Sidebar class="app-sidebar">
      <router-menu>
        
      </router-menu>
    </Sidebar>
  </div>
</template>
<style lang="scss" scoped>
/*
一、less
//进制导出less 文件第一行添加 //out:false
//导入
@import "文件路径";

1、定义变量; 
@header-height: 60px; 

2、使用变量;
body{
  height: @header-height;
} 

3、函数的使用;
.setHeight(@bgColor,@color){
  background-color:@bgColor;
  color:@color;
}

body{
  .setHeight(#fff,red)
}

4、嵌套方法 
body{
  div{
    color:red;
  }
}

5、less 循环
// 输入 in 
// @input:3 默认值是3
.loop(@index:3) when(@index > 0){
  .loop(@index - 1); //调用自身
  .div@{index} {
    width:@index * 1px;
  }
}
body{
  .loop(3)
}
// 输出 out
body{
  .div3{
    width:3px
  }
  .div2{
    width:2px
  }
  .div1{
    width:1px
  }
}

6、取消 移动端 a 标签点击高亮
a {
  -webkit-tap-highlight-color: transparent;
}
*/

$header-height: 60px;
$sidebar-width: 180px;
$main-background: #002f6d;
$main-color:#fff;
@mixin setHeight(){
  background-color:$main-background;
  color:$main-color;
}
.app-inner {
  .app-header {
    position: fixed;
    top: 0;    
    margin-left: $sidebar-width;
    height: $header-height;
    width: 100%;
    background: #fff;
    border-bottom: 2px solid #aaa;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    padding: 5px 10px;
  }
  .app-sidebar{
    position: fixed;
    left: 0;
    top: 0;

    width: $sidebar-width;
    height: 100vh;
    box-sizing: border-box;
    padding: 10px;
    @include setHeight;
  }
  .app-content{
    margin-left: $sidebar-width;
    margin-top: $header-height;
    padding: 10px;
  }
}
</style>
