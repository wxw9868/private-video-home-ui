<script setup lang="ts">
import Logo from '@/layouts/logo/LogoMain.vue';
import AuthForgotPwd from '../authForms/AuthForgotPwd.vue';
import AuthFooter from './AuthFooter.vue';
</script>

<template>
  <v-row class="bg-containerBg position-relative" no-gutters>
    <div class="blur-logo">
      
    </div>
    <v-col cols="12">
      <div class="pt-6 pl-6">
        <Logo />
      </div>
    </v-col>
    <!---Forgot pwd Part-->
    <v-col cols="12" class="d-flex align-center">
      <v-container>
        <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
          <v-row justify="center">
            <v-col cols="12" lg="12">
              <v-card elevation="0" class="loginBox">
                <v-card elevation="24">
                  <v-card-text class="pa-sm-10 pa-4">
                    <div class="d-flex justify-space-between align-center">
                      <h3 class="text-h3 text-center mb-0">{{ $t('ForgotPassword') }}</h3>
                      <router-link to="/login" class="text-primary text-decoration-none">{{ $t('BackLogin') }}</router-link>
                    </div>

                    <!---Forgot pwd Form-->
                    <AuthForgotPwd />
                    <!---Forgot pwd Form-->
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <!---Forgot pwd Part-->
    <!-- <v-col cols="12">
      <v-container class="pt-0 pb-6">
        <AuthFooter />
      </v-container>
    </v-col> -->
  </v-row>
</template>
<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
.blur-logo {
  position: absolute;
  filter: blur(18px);
  bottom: 0;
  transform: inherit;
}
</style>
