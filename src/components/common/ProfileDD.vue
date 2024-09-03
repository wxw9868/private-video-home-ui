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

            <v-list-item-title class="text-h6">{{ $t('EditProfile') }}</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout()" color="secondary" rounded="0">
            <template v-slot:prepend>
              <span class="mdi mdi-logout mr-4" :style="{ fontSize: '14px' }"></span>
            </template>

            <v-list-item-title class="text-subtitle-2">{{ $t('Logout') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-window-item>
    </v-window>
  </div>
</template>
<script setup>
import { get, err } from '@/utils/request';
import { ref } from 'vue'
import { inject } from 'vue'

const host = inject('serverHost');
const avatar = localStorage.getItem("userAvatar")? host+localStorage.getItem("userAvatar"):'@/assets/images/profile/user-profile-1.png';
const nickname = localStorage.getItem("userNickname")
const designation = localStorage.getItem("userDesignation")

const tab = ref(null);

function clearCookie(cookieName) {
  document.cookie = cookieName + "=; expires=" + new Date(0).toUTCString() + "; path=/";
}

function logout() {
  get('/user/logout')
    .then(response => {
      // console.log(response);
      if (response.data) {
        localStorage.clear();
        clearCookie('stock_session');
        clearCookie('ckplayer-player-cookie');
        window.location.href = '/login'
      }
    }).catch(function (error) {
      err(error)
    });
}
</script>
