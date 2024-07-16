<template>
  <div class="text-center">
    <v-avatar size="124" variant="outlined" color="primary" class="border-dashed">
      <img :src="avatar" width="124" alt="profile" />
      <input type="file" class="preview-upload" ref="avatarFile" v-on:change="uploadAvatar()" aria-label="upload file" />
    </v-avatar>
    <h5 class="text-h5 pt-5 mb-1">{{ nickname }}</h5>
    <p class="text-h6 text-lightText">{{ designation }}</p>
    <!-- <v-list class="d-flex justify-center py-0" aria-label="social links" aria-busy="true">
      <v-list-item class="px-3" to="/">
        <TwitterSquareFilled class="text-twitter" :style="{ fontSize: '18px' }" />
      </v-list-item>
      <v-list-item class="px-3" to="/">
        <FacebookFilled class="text-facebook" :style="{ fontSize: '18px' }" />
      </v-list-item>
      <v-list-item class="px-3" to="/">
        <LinkedinFilled class="text-linkedin" :style="{ fontSize: '18px' }" />
      </v-list-item>
    </v-list> -->
    <div class="my-4 mb-8 d-flex align-center ga-2">
      <div class="text-center w-100">
        <h5 class="text-h5 mb-1">{{collectNum}}</h5>
        <span class="text-h6 text-lightText">{{ $t('VideoCollection') }} </span>
      </div>
      <v-divider vertical></v-divider>
      <div class="text-center w-100">
        <h5 class="text-h5 mb-1">{{browseNum}}</h5>
        <span class="text-h6 text-lightText">{{ $t('VideoBrowsing') }} </span>
      </div>
      <v-divider vertical></v-divider>
      <div class="text-center w-100">
        <h5 class="text-h5 mb-1">4.5K</h5>
        <span class="text-h6 text-lightText">Members </span>
      </div>
    </div>
  </div>
</template>
<script setup>
// import { FacebookFilled, LinkedinFilled, TwitterSquareFilled } from '@ant-design/icons-vue';
import { inject } from 'vue';
import { ref, getCurrentInstance } from 'vue'

const instance = getCurrentInstance();
const http = instance.appContext.config.globalProperties.$http;

const host = inject('serverHost');
const avatar = ref(localStorage.getItem("userAvatar")? host+localStorage.getItem("userAvatar"):'@/assets/images/profile/user-profile-1.png');
const nickname = localStorage.getItem("userNickname")
const designation = localStorage.getItem("userDesignation")

const collectNum = ref(0)
const browseNum = ref(0)

getUserInfo()
function getUserInfo() {
  http.get('/user/info')
    .then(response => {
      let data = response.data.data;
      // console.log(data)
      if (data) {
        avatar.value = host + data.Avatar
        collectNum.value = data.CollectNum
        browseNum.value = data.BrowseNum
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

const avatarFile = ref(null)

function uploadAvatar() {
  const formData = new FormData();
  formData.append('avatar', avatarFile.value.files[0]);
  http.post('/user/uploadAvatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(response => {
      // console.log(response);
      avatar.value = host + response.data.data
      localStorage.setItem("userAvatar",response.data.data)
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