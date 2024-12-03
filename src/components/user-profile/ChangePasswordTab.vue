<template>
  <v-row>
    <v-col cols="12">
      <v-card variant="flat">
        <v-card variant="text">
          <div class="pa-5">
            <h5 class="text-subtitle-1 mb-0">{{ $t('ChangePassword') }}</h5>
          </div>
          <v-divider></v-divider>
          <v-form v-model="form" @submit.prevent="submit">
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="12">
                      <v-label class="mb-2">{{ $t('OldPassword') }}</v-label>
                      <v-text-field
                        v-model="old_password.value.value"
                        :error-messages="old_password.errorMessage.value"
                        :readonly="loading"
                        :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="show1 ? 'text' : 'password'"
                        color="primary"
                        density="compact"
                        placeholder="Enter Old Password"
                        prepend-inner-icon="mdi-lock-outline"
                        variant="outlined"
                        @click:append-inner="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-label class="mb-2">{{ $t('NewPassword') }}</v-label>
                      <v-text-field
                        v-model="password.value.value"
                        :error-messages="password.errorMessage.value"
                        :readonly="loading"
                        :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="show2 ? 'text' : 'password'"
                        color="primary"
                        density="compact"
                        placeholder="Enter New Password"
                        prepend-inner-icon="mdi-lock-outline"
                        variant="outlined"
                        @click:append-inner="show2 = !show2"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-label class="mb-2">{{ $t('ConfirmPassword') }}</v-label>
                      <v-text-field
                        v-model="repeat_password.value.value"
                        :error-messages="repeat_password.errorMessage.value"
                        :readonly="loading"
                        :append-inner-icon="show3 ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="show3 ? 'text' : 'password'"
                        color="primary"
                        density="compact"
                        placeholder="Enter Confirm Password"
                        prepend-inner-icon="mdi-lock-outline"
                        variant="outlined"
                        @click:append-inner="show3 = !show3"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <div class="text-right mt-4">
                <v-btn @click="handleReset" color="secondary" variant="outlined" class="mr-2">{{ $t('Cancel') }}</v-btn>
                <v-btn :disabled="!form" :loading="loading" type="submit" color="primary" variant="flat">{{ $t('Save') }}</v-btn>
              </div>
            </v-card-text>
          </v-form>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { post,err } from '@/utils/request';
import { useField, useForm } from 'vee-validate'
import { ref} from 'vue';

let form = ref(false)
let loading = ref(false)
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        password(value) {
          if (value?.length > 7 && /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value)) return true

          return '8~20位同时包含数字和字母'
        },
        repeat_password(value) {
          if (value?.length > 7 && /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value)) return true

          return '8~20位同时包含数字和字母'
        },
    },
})

const old_password = useField('old_password')
const password = useField('password')
const repeat_password = useField('repeat_password')

const submit = handleSubmit(values => {
    loading = true
    setTimeout(() => (loading = false), 200)
    loading = false

    const formData = JSON.stringify(values, null, 2)
    post('/user/changePassword', formData, { headers: { 'content-type': 'application/json' } })
        .then(response => {
            console.log(response);
        })
        .catch(function (error) {
           err(error)
        });
})
</script>
