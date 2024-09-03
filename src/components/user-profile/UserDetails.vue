<template>
  <div class="text-center">
    <v-avatar size="124" variant="outlined" color="primary" class="border-dashed">
      <img :src="avatar" width="124" alt="profile" />
      <input type="file" class="preview-upload" ref="avatarFile" v-on:change="uploadAvatar()" aria-label="upload file" />
    </v-avatar>
    <h5 class="text-h5 pt-5 mb-1">{{ nickname }}</h5>
    <p class="text-h6 text-lightText">{{ designation }}</p>
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
import { get, post, err } from '@/utils/request';
import { ref, inject } from 'vue'

const host = inject('serverHost');
const avatar = ref(localStorage.getItem("userAvatar")? host+localStorage.getItem("userAvatar"):'@/assets/images/profile/user-profile-1.png');
const nickname = localStorage.getItem("userNickname")
const designation = localStorage.getItem("userDesignation")

const collectNum = ref(0)
const browseNum = ref(0)

getUserInfo()
function getUserInfo() {
  get('/user/info')
    .then(response => {
      let data = response.data.data;
      // console.log(data)
      if (data) {
        avatar.value = host + data.Avatar
        collectNum.value = data.CollectNum
        browseNum.value = data.BrowseNum
      }
    }).catch(function (error) {
      err(error)
    });
}

const avatarFile = ref(null)

function uploadAvatar() {
  const formData = new FormData();
  formData.append('avatar', avatarFile.value.files[0]);
  post('/user/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(response => {
      // console.log(response);
      avatar.value = host + response.data.data
      localStorage.setItem("userAvatar",response.data.data)
    })
    .catch(function (error) {
      err(error)
    });
}
</script>
