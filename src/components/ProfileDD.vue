<template>
  <!-- ---------------------------------------------- -->
  <!-- profile DD -->
  <!-- ---------------------------------------------- -->
  <div>
    <div class="d-flex align-center pa-5">
      <v-avatar size="32" class="mr-2">
        <img :src="avatar" width="32" alt="Julia" />
      </v-avatar>
      <div>
        <h6 class="text-h6 mb-0">{{ nickname }}</h6>
        <p class="text-caption mb-0">{{ designation }}</p>
      </div>
    </div>
    <v-window v-model="tab">
      <v-window-item value="111">
        <v-list class="py-0" aria-label="profile list" aria-busy="true">
          <v-list-item color="primary" rounded="0" value="Edit profile" to="/user">
            <template v-slot:prepend>
              <span class="mdi mdi-account-edit mr-4" :style="{ fontSize: '14px' }"></span>
            </template>

            <v-list-item-title class="text-h6">编辑个人资料</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout()" color="secondary" rounded="0">
            <template v-slot:prepend>
              <span class="mdi mdi-logout mr-4" :style="{ fontSize: '14px' }"></span>
            </template>

            <v-list-item-title class="text-subtitle-2">退出账号</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-window-item>
    </v-window>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
import { inject } from 'vue'

const host = inject('serverHost');
const avatar = localStorage.getItem("userAvatar")? host+localStorage.getItem("userAvatar"):'@/assets/images/profile/user-profile-1.png';
const nickname = localStorage.getItem("userNickname")
const designation = localStorage.getItem("userDesignation")

const tab = ref(null);

const instance = getCurrentInstance();
const http = instance.appContext.config.globalProperties.$http;

function clearCookie(cookieName) {
  document.cookie = cookieName + "=; expires=" + new Date(0).toUTCString() + "; path=/";
}

function logout() {
  http.get('/user/logout')
    .then(response => {
      // console.log(response);
      if (response.data) {
        localStorage.clear();
        clearCookie('stock_session');
        clearCookie('ckplayer-player-cookie');
        window.location.href = '/login'
      }
    }).catch(function (error) {
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