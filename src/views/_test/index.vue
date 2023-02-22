<script setup lang="ts">
import { ref } from "vue";
import FileManger from './components/FileManger.vue'
import AnimateTest from './components/AnimateTest.vue'
import D3 from './components/D3.vue'
</script>

<template>
  <h1>测试界面</h1>
  <AnimateTest/>
  <FlexBox listen="window" scroll>
    <FlexItem
      :sticky="{
        top: 60,
        bottom: 20,
      }"
    >
      <div style="width: 300px; height: 900px; border: 1px solid black">
        <D3/>
      </div>
    </FlexItem>
    <FlexItem>
      <div style="width: 300px; height: 1200px; border: 1px solid black">
        <FileManger></FileManger>
      </div>
    </FlexItem>
  </FlexBox>
  <AnimateBox>
    
  </AnimateBox>
</template>
<style>

</style>
