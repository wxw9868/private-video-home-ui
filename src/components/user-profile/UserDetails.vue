<script setup>
import { FacebookFilled, LinkedinFilled, TwitterSquareFilled } from '@ant-design/icons-vue';
import { inject } from 'vue';

const host = inject('serverHost');
const avatar = localStorage.getItem("userAvatar")? host+localStorage.getItem("userAvatar"):'@/assets/images/profile/user-profile-1.png';
const nickname = localStorage.getItem("userNickname")
const designation = localStorage.getItem("userDesignation")
</script>

<template>
  <div class="text-center">
    <v-avatar size="124" variant="outlined" color="primary" class="border-dashed">
      <img :src="avatar" width="124" alt="profile" />
      <input type="file" class="preview-upload" aria-label="upload file" />
    </v-avatar>
    <h5 class="text-h5 pt-5 mb-1">{{ nickname }}</h5>
    <p class="text-h6 text-lightText">{{ designation }}</p>
    <v-list class="d-flex justify-center py-0" aria-label="social links" aria-busy="true">
      <v-list-item class="px-3" to="/">
        <TwitterSquareFilled class="text-twitter" :style="{ fontSize: '18px' }" />
      </v-list-item>
      <v-list-item class="px-3" to="/">
        <FacebookFilled class="text-facebook" :style="{ fontSize: '18px' }" />
      </v-list-item>
      <v-list-item class="px-3" to="/">
        <LinkedinFilled class="text-linkedin" :style="{ fontSize: '18px' }" />
      </v-list-item>
    </v-list>
    <div class="my-4 mb-8 d-flex align-center ga-2">
      <div class="text-center w-100">
        <h5 class="text-h5 mb-1">86</h5>
        <span class="text-h6 text-lightText">Post </span>
      </div>
      <v-divider vertical></v-divider>
      <div class="text-center w-100">
        <h5 class="text-h5 mb-1">40</h5>
        <span class="text-h6 text-lightText">Project </span>
      </div>
      <v-divider vertical></v-divider>
      <div class="text-center w-100">
        <h5 class="text-h5 mb-1">4.5K</h5>
        <span class="text-h6 text-lightText">Members </span>
      </div>
    </div>
  </div>
</template>
