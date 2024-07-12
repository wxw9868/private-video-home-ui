<script setup lang="ts">
import { ref } from 'vue';
// icons
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';

const show1 = ref(false);
const username = ref('wxw111');
const email = ref('wxw111@163.com');
const password = ref('123456');
const repeat_password = ref('123456');
const Regform = ref();

const usernameRules = ref([(v: string) => !!v || 'Username is required']);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);

function validate() {
  Regform.value.validate();
  console.log(Regform.value.validate());
  console.log(1111);
}
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h3 text-center mb-0">Sign up</h3>
    <router-link to="/login" class="text-primary text-decoration-none">已有账号?</router-link>
  </div>
  <v-form ref="Regform" lazy-validation action="/dashboards/analytical" class="mt-7 loginForm">
    <div class="mb-6">
      <v-label>Username</v-label>
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
      <v-label>Email Address</v-label>
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
      <v-label>Password</v-label>
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
      <v-label>Confirm Password</v-label>
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
    <v-btn color="primary" block class="mt-4" variant="flat" size="large" @click="validate()">注册</v-btn>
  </v-form>
</template>
<style lang="scss">
.loginForm {
  .v-field--appended {
    padding-inline-end: 0;
  }
}
</style>
