<template>
  <v-card class="bg-surface" variant="text">
    <v-card-text>
      <h5 class="text-subtitle-1 mb-0">{{ $t('PersonalInformation') }}</h5>
    </v-card-text>
    <v-divider></v-divider>
    <v-form v-model="form" @submit.prevent="submit">
      <v-card-item>
        <v-row>
          <v-col cols="12" md="6">
            <v-label class="mb-2">{{ $t('Nickname') }}</v-label>
            <v-text-field v-model="nickname.value.value" :error-messages="nickname.errorMessage.value"
              :readonly="loading" aria-label="nickname" variant="outlined" placeholder="Nick name"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-label class="mb-2">{{ $t('Username') }}</v-label>
            <v-text-field v-model="username.value.value" :error-messages="username.errorMessage.value"
              :readonly="loading" aria-label="username" variant="outlined" placeholder="Ben"></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="12">
            <v-label class="mb-2">{{ $t('EmailAddress') }}</v-label>
            <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" :readonly="loading"
              aria-label="email address" variant="outlined" type="email"
              placeholder="stebin.ben@gmail.com"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-label class="mb-2">{{ $t('PhoneNumber') }}</v-label>
            <v-row>
              <v-col cols="7" lg="9" md="7" sm="8">
                <v-text-field v-model="mobile.value.value" :error-messages="mobile.errorMessage.value"
                  :readonly="loading" aria-label="phone number" variant="outlined" type="number"
                  placeholder="phone number"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-label class="mb-2">{{ $t('Designation') }}</v-label>
            <v-text-field v-model="designation.value.value" :error-messages="designation.errorMessage.value"
              :readonly="loading" aria-label="designation" variant="outlined" placeholder="Designation"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-label class="mb-2">{{ $t('Address') }}</v-label>
            <v-textarea v-model="address.value.value" :error-messages="address.errorMessage.value" :readonly="loading"
              variant="outlined" rows="3" aria-label="address" placeholder="Address"></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-label class="mb-2">{{ $t('Note') }}</v-label>
            <v-textarea v-model="note.value.value" :error-messages="note.errorMessage.value" :readonly="loading"
              aria-label="note" variant="outlined" placeholder="Note"></v-textarea>
          </v-col>
        </v-row>
      </v-card-item>
      <v-card-item class="pa-0">
        <v-divider></v-divider>
        <v-row class="pa-5">
          <v-col cols="12" class="text-right">
            <v-btn variant="outlined" color="secondary" @click="handleReset">{{ $t('Cancel') }}</v-btn>
            <v-btn :disabled="!form" :loading="loading" type="submit" variant="flat" color="primary"
              class="ml-2">{{ $t('Save') }}</v-btn>
          </v-col>
        </v-row>
      </v-card-item>
    </v-form>
  </v-card>
</template>
<script setup>
import { useField, useForm } from 'vee-validate'
import { ref, getCurrentInstance } from 'vue'

const instance = getCurrentInstance();
const http = instance.appContext.config.globalProperties.$http;

let form = ref(false)
let loading = ref(false)

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    nickname(value) {
      if (value?.length >= 3) return true

      return '用户名至少需要3个字符'
    },
    username(value) {
      if (value?.length >= 3) return true

      return '用户名至少需要3个字符'
    },
    email(value) {
      if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(value)) return true

      return '必须是有效的电子邮件'
    },
    mobile(value) {
      if (value?.length > 7 && /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(value)) return true

      return '必须是有效的手机号码'
    },
    // designation() {
    //   return '称号'
    // },
    // address() {
    //   return '地址'
    // },
    // note() {
    //   return '简介'
    // },
  },
})

const nickname = useField('nickname')
const username = useField('username')
const email = useField('email')
const mobile = useField('mobile')
const designation = useField('designation')
const address = useField('address')
const note = useField('note')

const submit = handleSubmit(values => {
  loading = true
  setTimeout(() => (loading = false), 200)
  loading = false

  const formData = JSON.stringify(values, null, 2)
  http.post('/user/save', formData, { headers: { 'content-type': 'application/json' } })
    .then(response => {
      // console.log(response);
    })
    .catch(function (error) {
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        console.log(error.request);
      } else {
        // 发送请求时出了点问题
        console.log('Error', error.message);
      }
      console.log(error.config);
      console.log(error);
    });
})

getUserInfo()
function getUserInfo() {
  http.get('/user/info')
    .then(response => {
      let data = response.data.data;
      if (data) {
        // console.log(data)
        nickname.value.value = data.Nickname
        username.value.value = data.Username
        email.value.value = data.Email
        mobile.value.value = data.Mobile
        designation.value.value = data.Designation
        address.value.value = data.Address
        note.value.value = data.Note
      }
    }).catch(function (error) {
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        console.log(error.request);
      } else {
        // 发送请求时出了点问题
        console.log('Error', error.message);
      }
      console.log(error.config);
      console.log(error);
    });
}
</script>
