<script setup lang="ts">
import { post, err } from '../../../utils/request.js';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const valid = ref(false);
const email = ref('');
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

function validate() {
  if (!valid) return

  const formData = {};
  formData['email'] = email.value
  post('/user/sendUrl', formData)
    .then(response => {
      // 登录成功的处理逻辑
      // console.log(response);
      if (response) {
        router.push('/check-mail');
      }
    })
    .catch(function (error) {
      err(error)
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
