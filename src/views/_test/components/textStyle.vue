<template>
  <div>
    
    <h1>文字样式-文字样式-文字样式-文字样式-文字样式</h1>
    <h2>文字样式-文字样式</h2>
  </div>
</template>
<style lang="scss" scoped>
@keyframes example {
  from {
    background-position-x: 0px;
  }
  to {
    background-position-x: -100%;
  }
}

h1 {
  font-size: 60px;
  background-image: linear-gradient(
    90deg,
    rgb(255, 219, 99),
    rgb(0, 238, 255),
    rgb(183, 0, 255),
    rgb(0, 238, 255),
    rgb(255, 219, 99)
  );
  -webkit-background-clip: text;
  width: 200%;
  -webkit-text-fill-color: transparent;
  animation-direction: alternate;
  animation-name: example;
  animation-duration: 4s;
}
h2 {
  font-size: 50px;
  background-image: -webkit-linear-gradient(
    bottom,
    rgb(201, 115, 255),
    rgb(20, 11, 255)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
