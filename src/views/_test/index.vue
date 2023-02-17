<script setup lang="ts">
import { ref } from "vue";
import numberbox from "./components/number-box.vue";
import Ems from "./components/asd.vue";
</script>

<template>
  <h1>测试界面</h1>
  <FlexBox listen="window" scroll >
    <FlexItem :sticky="{
      top:''
    }" >
      <div style="width: 300px; height: 200px; border: 1px solid black">
        n诶荣
      </div>
    </FlexItem>
    <FlexItem>
      <div style="width: 300px; height: 1200px; border: 1px solid black">
        n诶荣
      </div>
    </FlexItem>
  </FlexBox>
  <!-- <AnimateBox>
    <Ems/>
  </AnimateBox> -->
</template>
