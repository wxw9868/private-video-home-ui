<template>
     <v-main>
        <v-img class="mx-auto my-6" max-width="100" max-height="70"
            :src="host+'./assets/image/favicon/logo.png'"></v-img>

        <v-card class="mx-auto pa-12 pb-8" elevation="0" max-width="448" rounded="lg">

            <v-form v-model="form" @submit.prevent="onSubmit">
                <div class="text-subtitle-1 text-medium-emphasis">Account</div>

                <v-text-field 
                    v-model="email" 
                    :rules="emailRules" 
                    :readonly="loading" 
                    density="compact"
                    placeholder="Email address" 
                    prepend-inner-icon="mdi-email-outline" 
                    variant="outlined"
                    clearable
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password
                    <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer"
                        target="_blank">
                        Forgot login password?</a>
                </div>

                <v-text-field 
                    v-model="password" 
                    :rules="passwordRules" 
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

                <v-btn :disabled="!form" :loading="loading" size="large" type="submit" class="mb-8" color="blue"
                    variant="tonal" block>
                    Sign In
                </v-btn>

                <v-card-text class="text-center">
                    <a class="text-blue text-decoration-none" href="/register" rel="noopener noreferrer">
                        Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
            </v-form>
        </v-card>
    </v-main>
</template>
<script>
import { inject } from 'vue';

export default {
    setup() {
        const host = inject('serverHost');
        return { host }
    },
    data: () => ({
        visible: false,
        form: false,
        loading: false,
        email: 'wxw9868@163.com',
        emailRules: [
            value => {
                if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(value)) return true

                return '必须是有效的电子邮件'
            },
        ],
        password: '123456',
        passwordRules: [
            value => {
                if (value) return true

                return 'password is required.'
            },
        ],
    }),

    methods: {
        onSubmit() {
            if (!this.form) return
            this.loading = true
            setTimeout(() => (this.loading = false), 1000)

            const formData = {};
            formData['email'] = this.email
            formData['password'] = this.password

            this.$http.post('/user/doLogin', formData, {
                headers: { 'content-type': 'application/json' },
            })
                .then(function (response) {
                    // 登录成功的处理逻辑
                    console.log('Login successful', response);
                    console.log('cookie: ' + document.cookie);
                    // 处理cookie，例如保存到Vuex或localStorage
                    if (response) {
                        //3秒钟之后跳转到指定的页面 
                        setTimeout(window.location.href = '/', 3);
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
        },
        required(v) {
            return !!v || 'Field is required'
        },
    },

    mounted() {
        // console.log(this.form);  
    }
}
</script>