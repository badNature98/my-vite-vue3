<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from "vue";
import QueryList from "./components/queryList/index.vue";

const text = ref("text");

for (let i = 0; i < 60; i++) {
  text.value += "<br/>text";
}
async function getFile(val: string) {}
let number = ref('input');
onBeforeUnmount(() => {
  console.log("e");
});
onMounted(() => {
  console.log("s");
});
</script>
<template>
  <div class="blog-home">
    <drop-box ms="250">
      <template #header> 标题 </template>
      <AnimateBox>
        <input v-model="number" type="text" />
        超出三界之外
        <div style="">name</div>
        <QueryList />
        <div
          v-for="ind in number"
          style="
            display: inline-block;
            padding: 30px;
            border: 1px solid black;
            margin: 15px;
          "
          :key="ind"
        >
          {{ ind }}
        </div>
      </AnimateBox>
    </drop-box>
  </div>
</template>
<style lang="scss" scoped>
.blog-home {
  overflow: auto;
  margin: 0 1.4rem;
  font-size: 1rem;
  .query-box {
    background: beige;
    padding: 30px;
  }
}
</style>
