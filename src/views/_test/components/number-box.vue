<script setup>
import { ref } from "vue";
const numbers = ref(new Array(50).fill("").map((_, i) => i));
const randomize = () => {
  numbers.value.sort(() => (Math.random() > 0.5 ? 1 : -1));
};
function addItem() {
  numbers.value.push(numbers.value.length);
}
function Sort() {
  let list = numbers.value;
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (book[list[i]] < book[list[j]]) {
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
  }
}
</script>

<template>
  <div ref="animate_div" class="example boxes-example">
    <div class="boxes" >
      <div
        class="box"
        v-for="number in numbers"
        :key="number"
        v-text="number"
      />
    </div>
    <button class="button button--alt" @click="randomize">Randomize</button>
    <button class="button button--alt" @click="addItem">Add item</button>
    <button class="button button--alt" @click="Sort">Sort</button>
  </div>
</template>

<style scoped>
.boxes {
  display: flex;
  flex-wrap: wrap;
  margin: 2em -0.25em 2em -0.25em;
}
.box {
  box-sizing: border-box;
  width: calc(10% - 0.5em);
  margin: 0.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875em;
  font-weight: 300;
  aspect-ratio: 1;
  border: 1px solid var(--gray-l);
}
</style>
