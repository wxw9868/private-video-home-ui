<script setup lang="ts">
import { post, err } from '../../../utils/request.js';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// icons
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();

const valid = ref(false);
const show1 = ref(false);
const password = ref('');
const conpassword = ref('');
const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const confirmpasswordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const snackbar = ref(false);
const text = ref('登录成功');

function validate() {
  if (!valid) return

  const formData = {};
  formData['reset_password_token'] = route.query.reset_password_token;
  formData['password'] = password.value
  formData['confirm_password'] = conpassword.value
  post('/user/forgotPassword', formData, { headers: { 'content-type': 'application/json' }})
    .then(response => {
      // console.log(response);
      if (response) {
        snackbar.value = true
        text.value = response.data.message
        setTimeout(() => {router.push('/login');}, 5000);
      }
    })
    .catch(function (error) {
      err(error)
    });
}
</script>

<template>
  <v-form lazy-validation v-model="valid" @submit.prevent="validate" class="mt-7 loginForm">
    <div class="mb-6">
      <v-label>{{ $t('Password') }}</v-label>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        required
        placeholder="Enter password"
        variant="outlined"
        color="primary"
        hide-details="auto"
        :type="show1 ? 'text' : 'password'"
        class="mt-2 mb-4"
      >
        <template v-slot:append-inner>
          <v-btn color="secondary" icon rounded variant="text">
            <EyeInvisibleOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show1 == false" @click="show1 = !show1" />
            <EyeOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show1 == true" @click="show1 = !show1" />
          </v-btn>
        </template>
      </v-text-field>
    </div>
    <div class="mb-6">
      <v-label>{{ $t('ConfirmPassword') }}</v-label>
      <v-text-field
        v-model="conpassword"
        :rules="confirmpasswordRules"
        placeholder="Enter confirm password"
        required
        variant="outlined"
        color="primary"
        hide-details="auto"
        class="mt-2"
      ></v-text-field>
    </div>
    <v-btn color="primary" block class="mt-5" variant="flat" size="large" :disabled="!valid" type="submit">{{ $t('ResetPassword') }} </v-btn>
  </v-form>
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
  .v-field--appended {
    padding-inline-end: 0;
  }
}
</style>
