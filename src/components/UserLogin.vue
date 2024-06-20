<template>
    <v-sheet class="bg-deep-purple h-100 pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" label="Email"
                    clearable></v-text-field>

                <v-text-field v-model="password" :readonly="loading" :rules="[required]" label="Password"
                    placeholder="Enter your password" clearable></v-text-field>

                <br>

                <v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit"
                    variant="elevated" block>
                    Sign In
                </v-btn>
            </v-form>
        </v-card>
    </v-sheet>
</template>
<script>
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8081';
axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    data: () => ({
        form: false,
        email: 'wxw9868@163.com',
        password: '123456',
        loading: false,
    }),

    methods: {
        onSubmit() {
            if (!this.form) return
            this.loading = true
            setTimeout(() => (this.loading = false), 1000)

            const formData = {};
            formData['email'] = this.email
            formData['password'] = this.password

            axios.post('/user/doLogin', formData, {
                headers: { 'content-type': 'application/json' },
                // httpsAgent: new https.Agent({
                //     rejectUnauthorized: false
                // })
            })
                .then(function (response) {
                    // 登录成功的处理逻辑
                    console.log('Login successful', response);
                    console.log('cookie: ');
                    console.log(document.cookie);
                    console.log(response.headers['set-cookie']);
                    // 处理cookie，例如保存到Vuex或localStorage
                    if (response) {
                        //3秒钟之后跳转到指定的页面 
                        // setTimeout(window.location.href = '/', 3);
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