<script setup lang="ts">
import Logo from '@/layouts/logo/LogoMain.vue';
import AuthCheckMail from '../authForms/AuthCheckMail.vue';
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
    <!---Check mail Part-->
    <v-col cols="12" class="d-flex align-center">
      <v-container>
        <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
          <v-row justify="center">
            <v-col cols="12">
              <v-card elevation="0" class="loginBox">
                <v-card elevation="24">
                  <v-card-text class="pa-sm-9 pa-6">
                    <!---Check mail Form-->
                    <AuthCheckMail />
                    <!---Check mail Form-->
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <!---Check mail Part-->
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
