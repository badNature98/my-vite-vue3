<script setup lang="ts">
import { Ref, ref } from "vue";

//点击后触发
function bindLongClick() {
  function longClick() {}
}

let length: number, ind: number;
let list: Ref<number[]> = ref([]);

function initData() {
  list.value.splice(0)
  length = 100;
  ind = 0;
  while (ind++ < length) {
    list.value.push(ind);
  }
}

function add() {
  list.value.push(ind++);
}
function random() {
  list.value = list.value.sort(() => (Math.random() > 0.5 ? -1 : 1));
}
function sort() {
  list.value = list.value.sort((a, b) => a - b);
}
function disasters() {
  let length = Math.floor(list.value.length / 2);
  let del = 0;
  while (del++ < length) {
    let random = Math.floor(Math.random() * list.value.length);
    list.value.splice(random, 1);
  }
}
initData()
</script>
<template>
  <el-button @click="initData()">重置</el-button>
  <el-button @click="random()">打乱</el-button>
  <el-button @click="sort()">排序</el-button>
  <el-button @click="add()">添加</el-button>
  <el-button type="danger" @click="disasters()">打个响指</el-button>
  <br />
  <br />
   <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  
</template>
<style lang="scss" scoped>
.animate-text {
  display: flex;
  flex-wrap: wrap;

  > div {
    border: 1px solid black;
    padding: 5px;
    margin: 0 5px 5px 0;
  }
}
</style>
