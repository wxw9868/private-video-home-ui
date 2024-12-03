<script setup lang="ts">
import { post, err } from '../../../utils/request.js';
import { ref } from 'vue';
// icons
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { Form } from 'vee-validate';

const valid = ref(false);
const show1 = ref(false);
const username = ref('');
const email = ref('');
const password = ref('');
const repeat_password = ref('');
const usernameRules = ref([(v: string) => !!v || 'Username is required']);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const snackbar = ref(false);
const text = ref('注册成功');

function validate(values: any, { setErrors }: any) {
  if (!valid) return

  const formData = {};
  formData['username'] = username.value
  formData['email'] = email.value
  formData['password'] = password.value
  formData['repeat_password'] = repeat_password.value
  post('/user/register', formData)
    .then(function (response) {
      if (response) {
        //3秒钟之后跳转到指定的页面
        setTimeout(window.location.href = '/login', 5);
      }
    })
    .catch(function (error) {
      err(error)
    });
}
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h3 text-center mb-0">{{ $t('Register') }}</h3>
    <router-link to="/login" class="text-primary text-decoration-none">{{ $t('YesAccount') }}</router-link>
  </div>
  <Form v-model="valid" @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <div class="mb-6">
      <v-label>{{ $t('Username') }}</v-label>
      <v-text-field
        v-model="username"
        :rules="usernameRules"
        hide-details="auto"
        variant="outlined"
        class="mt-2"
        required
        color="primary"
        placeholder="Username"
      ></v-text-field>
    </div>
    <div class="mb-6">
      <v-label>{{ $t('EmailAddress') }}</v-label>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        placeholder="Email address"
        class="mt-2"
        required
        hide-details="auto"
        variant="outlined"
        color="primary"
      ></v-text-field>
    </div>
    <div class="mb-6">
      <v-label>{{ $t('Password') }}</v-label>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        placeholder="Enter your password"
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
    <div class="mb-6">
      <v-label>{{ $t('ConfirmPassword') }}</v-label>
      <v-text-field
        v-model="repeat_password"
        :rules="passwordRules"
        placeholder="Enter your confirm password"
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

    <div class="d-sm-inline-flex align-center mt-2 mb-7 mb-sm-0 font-weight-bold">
      <h6 class="text-caption">
        By Signing up, you agree to our
        <router-link to="/register" class="text-primary link-hover font-weight-medium">Terms of Service </router-link>
        and
        <router-link to="/register" class="text-primary link-hover font-weight-medium">Privacy Policy</router-link>
      </h6>
    </div>
    <v-btn color="primary" :loading="isSubmitting" block class="mt-4" variant="flat" size="large" :disabled="valid" type="submit">{{ $t('Register') }}</v-btn>
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
  .v-field--appended {
    padding-inline-end: 0;
  }
}
</style>
