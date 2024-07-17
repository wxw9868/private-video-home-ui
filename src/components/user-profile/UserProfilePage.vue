<script setup lang="ts">
import { ref } from 'vue';
import { UserOutlined, HeartOutlined, EyeOutlined, LockOutlined} from '@ant-design/icons-vue';

const tab = ref('one');
</script>

<template>
  <v-row class="mt-0">
    <v-col cols="12" lg="3" md="4">
      <v-card variant="text" class="bg-surface">
        <v-card-item>
          <UserDetails />
          <v-tabs v-model="tab" color="primary" variant="flat" class="tabBtn" density="compact" direction="vertical" hide-slider>
            <v-tab value="one" variant="flat" hide-slider><UserOutlined class="v-icon--start" />{{ $t('PersonalInformation') }}</v-tab>
            <v-tab value="two" variant="flat" hide-slider><HeartOutlined class="v-icon--start" />{{ $t('VideoCollection') }}</v-tab>
            <v-tab value="three" variant="flat" hide-slider><EyeOutlined class="v-icon--start" />{{ $t('VideoBrowsing') }}</v-tab>
            <v-tab value="four" variant="flat" hide-slider><LockOutlined class="v-icon--start" />{{ $t('ChangePassword') }}</v-tab>
          </v-tabs>
        </v-card-item>
      </v-card>
    </v-col>
    <v-col cols="12" lg="9" md="8">
      <v-window v-model="tab">
        <v-window-item value="one">
          <InformationTab />
        </v-window-item>

        <v-window-item value="two">
          <UserCollectionTab />
        </v-window-item>

        <v-window-item value="three">
          <UserBrowsingTab />
        </v-window-item>

        <v-window-item value="four">
          <ChangePasswordTab />
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>
