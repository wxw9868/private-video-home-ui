<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const primary = ref('rgb(var(--v-theme-primary))');
const darkprimary = ref('rgb(var(--v-theme-darkprimary))');
</script>
<template>
  <div class="logo">
    <RouterLink to="/" aria-label="logo">
      <img src="@/assets/images/favicon/favicon-32x32.png" width="29" height="29">
    </RouterLink>
  </div>
</template>
