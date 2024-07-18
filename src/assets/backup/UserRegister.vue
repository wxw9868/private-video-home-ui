<template>
    <v-main>
        <v-img class="mx-auto my-6" max-width="100" max-height="70" :src="host+'./assets/image/favicon/logo.png'"></v-img>

        <v-card class="mx-auto pa-12 pb-8" elevation="0" max-width="448" rounded="lg">
            <v-form v-model="form" @submit.prevent="submit">
                <div class="text-subtitle-1 text-medium-emphasis">Username</div>
                <v-text-field 
                    v-model="username.value.value" 
                    :error-messages="username.errorMessage.value"
                    :readonly="loading"
                    label="Username" 
                    density="compact" 
                    placeholder="Username"
                    prepend-inner-icon="mdi-account-outline" 
                    variant="outlined" 
                    clearable
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis">Account</div>
                <v-text-field 
                    v-model="email.value.value" 
                    :error-messages="email.errorMessage.value" 
                    :readonly="loading"
                    label="Email" 
                    density="compact" 
                    placeholder="Email address" 
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined" 
                    clearable
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password
                </div>
                <v-text-field 
                    v-model="password.value.value" 
                    :error-messages="password.errorMessage.value"
                    :readonly="loading" 
                    label="Password" 
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" 
                    density="compact" 
                    placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline" 
                    variant="outlined" 
                    @click:append-inner="visible = !visible"
                    clearable
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Confirm Password
                </div>
                <v-text-field 
                    v-model="repeat_password.value.value" 
                    :error-messages="repeat_password.errorMessage.value"
                    :readonly="loading" 
                    label="Confirm Password"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" 
                    :type="visible ? 'text' : 'password'"
                    density="compact" 
                    placeholder="Enter your confirm password" 
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined" 
                    @click:append-inner="visible = !visible" 
                    clearable
                ></v-text-field>

                <v-btn :disabled="!form" :loading="loading" size="large" type="submit" class="mb-8" color="blue" variant="tonal" block>
                    Sign up
                </v-btn>
                <v-card-text class="text-center">
                    <a class="text-blue text-decoration-none" href="/login" rel="noopener noreferrer">
                        Sign in now <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
            </v-form>
        </v-card>
    </v-main>
</template>
<script setup>
import { useField, useForm } from 'vee-validate'
import { getCurrentInstance} from 'vue';
import { inject } from 'vue';

const host = inject('serverHost');
const instance = getCurrentInstance();
const http = instance.appContext.config.globalProperties.$http;

let visible = false
let form = false
let loading = false

const { handleSubmit } = useForm({
    validationSchema: {
        username(value) {
            if (value?.length >= 3) return true

            return '用户名至少需要3个字符'
        },
        email(value) {
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(value)) return true

            return '必须是有效的电子邮件'
        },
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

const username = useField('username')
const email = useField('email')
const password = useField('password')
const repeat_password = useField('repeat_password')

const submit = handleSubmit(values => {
    loading = true
    setTimeout(() => (loading = false), 200)
    loading = false
    
    const formData = JSON.stringify(values, null, 2)
    http.post('/user/doRegister', formData, { headers: { 'content-type': 'application/json' } })
        .then(function (response) {
            // console.log(response);
            if (response) {
                //3秒钟之后跳转到指定的页面 
                setTimeout(window.location.href = '/login', 3);
            }
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
</script>