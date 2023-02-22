<script setup lang="ts">
import { onMounted, ref } from "vue";
import BarChart from "@/utils/d3/BarChart";
onMounted(() => {
  // BarChart("#test", {
  //   width: 500,
  //   height: 600,
  //   data:[10,20,30,50,40,60]
  // });

  let test = new BarChart("#test",{width:500,height:600,data:[1,2,3,4,5]})
  console.log(test)

});
</script>
<template>
  <div id="test">12</div>
</template>
