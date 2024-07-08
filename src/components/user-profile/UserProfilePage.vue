<script setup lang="ts">
import { ref } from 'vue';
import UserDetails from './UserDetails.vue';
import InformationTab from './InformationTab.vue';
import UserVideoTab from './UserVideoTab.vue';
import ChangePasswordTab from './ChangePasswordTab.vue';
// import SettingTab from './SettingTab.vue';
// import PaymentTab from './PaymentTab.vue';

// icons
import { UserOutlined, HeartOutlined, LockOutlined} from '@ant-design/icons-vue';

const tab = ref('one');
</script>

<template>
  <v-row class="mt-0">
    <v-col cols="12" lg="3" md="4">
      <v-card variant="text" class="bg-surface">
        <v-card-item>
          <UserDetails />
          <v-tabs v-model="tab" color="primary" variant="flat" class="tabBtn" density="compact" direction="vertical" hide-slider>
            <v-tab value="one" variant="flat" hide-slider><UserOutlined class="v-icon--start" />个人信息</v-tab>
            <v-tab value="two" variant="flat" hide-slider><HeartOutlined class="v-icon--start" />影片收藏</v-tab>
            <v-tab value="three" variant="flat" hide-slider><LockOutlined class="v-icon--start" />修改密码</v-tab>
            <!-- <v-tab value="two" variant="flat" hide-slider><CreditCardOutlined class="v-icon--start" /> Payment </v-tab> -->
            <!-- <v-tab value="four" variant="flat" hide-slider><SettingOutlined class="v-icon--start" /> Settings </v-tab> -->
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
          <UserVideoTab />
        </v-window-item>

        <v-window-item value="three">
          <ChangePasswordTab />
        </v-window-item>

        <!-- <v-window-item value="four">
          <SettingTab />
        </v-window-item> -->

        <!-- <v-window-item value="two">
          <PaymentTab />
        </v-window-item> -->

      </v-window>
    </v-col>
  </v-row>
</template>

<style>
.editBtn {
  @media (max-width: 600px) {
    width: 100%;
  }
}
</style>
