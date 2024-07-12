<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
// icons
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
// import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';

const instance = getCurrentInstance();
const http = instance.appContext.config.globalProperties.$http;

const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const password = ref('123456');
const email = ref('wxw9868@163.com');
const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const snackbar = ref(false);
const text = ref('登录成功');

/* eslint-disable @typescript-eslint/no-explicit-any */
function validate(values: any, { setErrors }: any) {
  console.log('1111')
  // const authStore = useAuthStore();
  // return authStore.login(username.value, password.value).catch((error) => setErrors({ apiError: error }));
  const formData = {};
  formData['email'] = email.value
  formData['password'] = password.value
  http.post('/user/doLogin', formData, { headers: { 'content-type': 'application/json' }})
    .then(response => {
      // 登录成功的处理逻辑
      // console.log('Login successful', response.data);
      if (response) {
        localStorage.setItem("isLogin", true); 
        snackbar.value = true
        text.value = response.data.message
        //5秒钟之后跳转到指定的页面 
        setTimeout(window.location.href = '/', 8);
      }
    })
    .catch(function (error) {
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        console.log(error.request);
      } else {
        // 发送请求时出了点问题
        console.log('Error', error.message);
      }
      console.log(error.config);
      console.log(error);
    });     
}
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h3 text-center mb-0">Login</h3>
    <router-link to="/register" class="text-primary text-decoration-none">立即注册</router-link>
  </div>
  <Form @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <div class="mb-6">
      <v-label>Email Address</v-label>
      <v-text-field
        aria-label="email address"
        v-model="email"
        :rules="emailRules"
        class="mt-2"
        required
        hide-details="auto"
        variant="outlined"
        color="primary"
      ></v-text-field>
    </div>
    <div>
      <v-label>Password</v-label>
      <v-text-field
        aria-label="password"
        v-model="password"
        :rules="passwordRules"
        required
        variant="outlined"
        color="primary"
        hide-details="auto"
        :type="show1 ? 'text' : 'password'"
        class="mt-2"
      >
        <template v-slot:append-inner>
          <v-btn color="secondary" icon rounded variant="text">
            <EyeInvisibleOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show1 == false" @click="show1 = !show1" />
            <EyeOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show1 == true" @click="show1 = !show1" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="d-flex align-center mt-4 mb-7 mb-sm-0">
      <v-checkbox
        v-model="checkbox"
        :rules="[(v: any) => !!v || 'You must agree to continue!']"
        label="Keep me sign in"
        required
        color="primary"
        class="ms-n2"
        hide-details
      ></v-checkbox>
      <div class="ml-auto">
        <router-link to="/forgot-pwd" class="text-darkText link-hover">忘记密码?</router-link>
      </div>
    </div>
    <v-btn color="primary" :loading="isSubmitting" block class="mt-5" variant="flat" size="large" :disabled="valid" type="submit">
      登陆
    </v-btn>
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>

  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      color="success"
    >
      {{ text }}
    </v-snackbar>
</div>
</template>
<style lang="scss">
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
  .v-field--appended {
    padding-inline-end: 0;
  }
}
</style>
