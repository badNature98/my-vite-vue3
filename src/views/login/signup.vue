<script setup lang="ts">
import { ref } from "vue";
import { rules, login } from "./setup";
import type { FormInstance, FormRules } from "element-plus";
import { useRoute } from 'vue-router';
const route = useRoute()
const options = ref([
  {
    value: "email",
    label: "邮箱注册",
    description: "使用邮箱注册账号。",
  },
  {
    value: "phone",
    label: "手机注册",
    description: "使用手机注册账号。",
  },
]);
const loginForm = ref({
  loginType: "email",
  remember: true,
  email: "",
  phone: "",
  username: "",
  password: "",
});
const loginView = ref();

const clickLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // login(loginForm.value,route)
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<template>
  <div class="login-page">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginView"
    >
      <el-form-item label="注册方式">
        <el-select v-model="loginForm.loginType" placeholder="选择注册方式">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="email" v-if="['email'].includes(loginForm.loginType)">
        <template #label>邮箱<Icon name="def-Message"></Icon></template>
        <el-input v-model="loginForm.email" placeholder="请输入邮箱">
        </el-input>
      </el-form-item>
      <el-form-item prop="phone" v-if="['phone'].includes(loginForm.loginType)">
        <template #label>手机<Icon name="def-Phone"></Icon></template>
        <el-input v-model="loginForm.phone" placeholder="请输入手机号码">
        </el-input>
      </el-form-item>
      <el-form-item prop="username">
        <template #label>账号<Icon name="def-User"></Icon></template>
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item prop="password">
        <template #label>密码<Icon name="def-Key"></Icon></template>
        <el-input type="password" v-model="loginForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="clickLogin(loginView)" type="primary"
          >注册</el-button>
        <div class="checkeds">
          <el-checkbox v-model="loginForm.remember" label="自动登录" />
          <el-link href="/#/login" type="primary">返回登录界面</el-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
