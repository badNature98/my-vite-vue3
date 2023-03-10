<script setup lang="ts">
import { ref, onMounted } from "vue";
import FileManger from "./components/FileManger.vue";
import AnimateTest from "./components/AnimateTest.vue";
import D3 from "./components/D3.vue";
import textStyle from "./components/textStyle.vue";
import { useRouter } from "vue-router";
import { getFileByPath } from "@/api/local/index";
import { cancel } from "@/utils/request";
import axios from "axios";
import blog from "@/router/other/blog";
let tableData = ref([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
const router = useRouter();
function goBack() {
  router.go(-1);
}

function add() {
  tableData.value.push({
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  });
}
function del() {
  tableData.value.splice(0, 1);
}
async function getImages() {
  setTimeout(() => {
    // cancel({message:'取消请求'});
    // cancel();
  }, 10);
  Promise.all([
    getFileByPath(),
    getFileByPath(),
    getFileByPath(),
    getFileByPath(),
  ]);
}
</script>

<template>
  <h1>测试界面</h1>
  <Iframe get="/server/resources/html/index.html" />
  <textStyle/>
  <AnimateTest />
  <hover-box class="test" ritate="5" border style="width: 200px">
    <h3>HoverBox 组件</h3>
    <p>可以设置组件划过时的效果</p>
  </hover-box>

  <el-button @click="goBack">返回</el-button>
  <el-button @click="add">添加</el-button>
  <el-button @click="del">删除</el-button>
  <el-button @click="getImages">获取</el-button>
  <el-table :data="tableData">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <FlexBox listen="window" scroll>
    <FlexItem
      :sticky="{
        top: 60,
        bottom: 20,
      }"
    >
      <div style="width: 300px; height: 900px; border: 1px solid black">
        <D3 />
      </div>
    </FlexItem>
    <FlexItem>
      <div style="width: 300px; height: 1200px; border: 1px solid black">
        <FileManger></FileManger>
      </div>
    </FlexItem>
  </FlexBox>

  <!-- <Iframe src="/server/html/index.html"/> -->
</template>
<style></style>
