<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getFileByPath } from "@/api/local/index";
import { cancel } from "@/utils/request";
let tableData = ref([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
const router = useRouter()
function goBack(){

router.go(-1)
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
  ])
}
</script>

<template>
  <hover-box class="test" ritate="5" border style="width: 200px">
    <h3>HoverBox 组件</h3>
    <p>可以设置组件划过时的效果</p>
  </hover-box>

  <el-button @click="goBack">返回</el-button>
  <el-button @click="add">添加</el-button>
  <el-button @click="del">删除</el-button>
  <el-button @click="getImages">获取</el-button>
  <AnimateBox>
    <div>123</div>
  </AnimateBox>

  <el-table :data="tableData">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <FlexBox>
    <FlexItem>
      
    </FlexItem>
  </FlexBox>
  <!-- <Iframe src="/server/html/index.html"/> -->
</template>
