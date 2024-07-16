<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const instance = getCurrentInstance();
const http = instance.appContext.config.globalProperties.$http;

const valid = ref(false);
const email = ref('');
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);



function validate() {
  if (!valid) return
  
  const formData = {};
  formData['email'] = email.value
  http.post('/user/sendUrl', formData, { headers: { 'content-type': 'application/json' }})
    .then(response => {
      // 登录成功的处理逻辑
      // console.log(response);
      if (response) {
        router.push('/check-mail');
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
  <v-form v-model="valid" @submit.prevent="validate" class="mt-7 loginForm">
    <v-label>{{ $t('EmailAddress') }}</v-label>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      placeholder="Enter email address"
      class="mt-2 mb-6"
      required
      hide-details="auto"
      variant="outlined"
      color="primary"
    ></v-text-field>

    <h6 class="text-caption">{{ $t('SendPwdResetEmailTips') }}</h6>
    <v-btn color="primary" block class="mt-2" variant="flat" size="large" :disabled="!valid" type="submit">{{ $t('SendPwdResetEmail') }}</v-btn>
  </v-form>
</template>
