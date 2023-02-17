<script setup lang="ts">
import { ref } from "vue";
import { rules ,login} from "./setup";
import type { FormInstance, FormRules } from "element-plus";
import { useRoute } from 'vue-router';
const route = useRoute()
const options = ref([
  {
    value: "visitor",
    label: "游客",
    description: "游客身份访问有限制。",
  },
  {
    value: "login",
    label: "用户",
    description: "登录已经注册的账号进行访问。",
  },
]);
const loginForm = ref({
  loginType: "visitor",
  remember: false,
  username: "",
  password: "",
});
const loginView = ref();

const clickLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      login(loginForm.value,route)
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
      label-width="80px"
      ref="loginView"
    >
      <el-form-item label="登录方式">
        <el-select v-model="loginForm.loginType" placeholder="选择登录方式">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="username">
        <template #label>账号<Icon name="def-User"></Icon></template>
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item
        v-if="['login'].includes(loginForm.loginType)"
        prop="password"
      >
        <template #label>密码<Icon name="def-Key"></Icon></template>
        <el-input type="password" v-model="loginForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="clickLogin(loginView)" type="primary"
          >登录</el-button
        >
        <div class="checkeds">
          <el-checkbox v-model="loginForm.remember" label="记住密码" />
          <el-link href="/#/signup" type="primary">注册账号</el-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
