<script setup lang="ts">
import Logo from '@/layouts/logo/LogoMain.vue';
import AuthCodeVerification from '../authForms/AuthCodeVerification.vue';
import AuthFooter from './AuthFooter.vue';
</script>

<template>
  <v-row class="position-relative" no-gutters>
    <div class="blur-logo">

    </div>
    <v-col cols="12">
      <div class="pt-6 pl-6">
        <Logo />
      </div>
    </v-col>
    <!---Code verification Part-->
    <v-col cols="12" class="d-flex align-center">
      <v-container>
        <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
          <v-row justify="center">
            <v-col cols="12" lg="10" xl="6" md="7">
              <v-card elevation="0" class="loginBox">
                <v-card elevation="24">
                  <v-card-text class="pa-sm-9 pa-6">
                    <h3 class="text-h3 mb-2">Enter Verification Code</h3>
                    <p class="text-h6 text-lightText">We send you on mail.</p>

                    <!---Code verification Form-->
                    <AuthCodeVerification />
                    <!---Code verification Form-->
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <!---Code verification Part-->
    <v-col cols="12">
      <v-container class="pt-0 pb-6">
        <AuthFooter />
      </v-container>
    </v-col>
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
