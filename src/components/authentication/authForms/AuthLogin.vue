<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue';
import { err, post } from '../../../utils/request.js';
// icons
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { Form } from 'vee-validate';

const valid = ref(false);
const show1 = ref(false);
const email = ref('');
const password = ref('');
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const checkbox = ref(false);
const snackbar = ref(false);
const text = ref('登录成功');

// 设置cookie
function setCookie(name, pwd, exdays) {
  var exdate = new Date()// 获取时间
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)// 保存的天数
  // 字符串拼接cookie
  window.document.cookie = 'userName' + '=' + name.value + ';path=/;expires=' + exdate.toString()
  window.document.cookie = 'userPwd' + '=' + pwd.value + ';path=/;expires=' + exdate.toString()
}

getCookie()
// 读取cookie 将用户名和密码回显到input框中
function getCookie() {
  if (document.cookie.length > 0) {
    checkbox.value = true // 把复选框选上
    var arr = document.cookie.split('; ')// 这里显示的格式需要切割一下自己可输出看下
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=')// 再次切割
      // 判断查找相对应的值
      if (arr2[0] === 'userName') {
        email.value = arr2[1]// 保存到保存数据的地方
        // 其中unescape() 方法是将字符串进行编码，escape()方法是将字符串进行解码。
      }
      if (arr2[0] === 'userPwd') {
        password.value = arr2[1]
      }
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function validate(values: any, { setErrors }: any) {
  if (!valid) return

  // 点击登录按钮的时候，判断是否勾选了自动登录（记住密码），对cookie做相应操作
  if (checkbox.value) {
    // 传入账号名，密码，和保存天数14个参数
    setCookie(email, password, 14)
  } else {
    // 如果没有选中自动登录，那就清除cookie
    setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
  }

  const formData = {};
  formData['email'] = email.value
  formData['password'] = password.value
  post('/user/login', formData)
    .then(response => {
      if (response) {
        localStorage.setItem("isLogin", "true");
        snackbar.value = true
        text.value = response.data.message
        //5秒钟之后跳转到指定的页面
        setTimeout(window.location.href = '/', 8);
      }
    })
    .catch(function (error) {
      err(error)
    });
}
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h3 text-center mb-0">{{ $t('Login') }}</h3>
    <router-link to="/register" class="text-primary text-decoration-none">{{ $t('NoAccount') }}</router-link>
  </div>
  <Form v-model="valid" @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <div class="mb-6">
      <v-label>{{ $t('EmailAddress') }}</v-label>
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
      <v-label>{{ $t('Password') }}</v-label>
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
        <router-link to="/forgot-pwd" class="text-darkText link-hover">{{ $t('ForgotPassword') }}?</router-link>
      </div>
    </div>
    <v-btn color="primary" :loading="isSubmitting" block class="mt-5" variant="flat" size="large" :disabled="valid" type="submit">
      {{ $t('Login') }}
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
