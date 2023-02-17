<script setup>
import { ref } from "vue";

const items = ref([]);
let emojis = ["😏", "😐", "😑", "😒", "😕"];

let book = emojis.reduce((item, val, ind) => {
  item[val] = [ind];
  return item;
}, {});
function removeItem(toRemove, ind) {
  items.value.splice(ind, 1);
}
(() => {
  emojis.forEach(i=>items.value.push(i))
  // let ind = 0;
  // while (ind++ < 50) {
  //   addItem();
  // }
})();
function addItem(toRemove) {
  items.value.push(emojis[Math.floor(Math.random() * emojis.length)]);
}
function RandomItem() {
    items.value.sort(() => (Math.random() > 0.5 ? 1 : -1));

}
function SortItem() {
  let oldV = JSON.parse(JSON.stringify(items.value));
  for (let i = 0; i < oldV.length; i++) {
    for (let j = i + 1; j < oldV.length; j++) {
      if (book[oldV[i]] < book[oldV[j]]) {
        [oldV[i], oldV[j]] = [oldV[j], oldV[i]];
      }
    }
  }
  items.value=oldV
}
</script>

<template>
  <h5>Click emojis to remove them.</h5>
  <button @click="addItem">Add emojis</button>
  <button @click="RandomItem">Random</button>
  <button @click="SortItem">Sort</button>
  <li v-for="(item, ind) in items" :key="item" @click="removeItem(item, ind)">
    {{ item }}
  </li>
</template>
<style scoped>
ul {
  margin: 0;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
ul li {
  list-style: none;
}
</style>
