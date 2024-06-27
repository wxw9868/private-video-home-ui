<template>
    <div>
        <v-img class="mx-auto my-6" max-width="228"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">

            <v-form v-model="form" @submit.prevent="onSubmit">
                <div class="text-subtitle-1 text-medium-emphasis">Username</div>

                <v-text-field v-model="username" :readonly="loading" :rules="[required]" density="compact"
                    placeholder="username" prepend-inner-icon="mdi-account-outline" variant="outlined"
                    clearable></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis">Account</div>

                <v-text-field v-model="email" :readonly="loading" :rules="[required]" density="compact"
                    placeholder="Email address" prepend-inner-icon="mdi-email-outline" variant="outlined"
                    clearable></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password
                </div>

                <v-text-field v-model="password" :readonly="loading" :rules="[required]" label="Password"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
                    variant="outlined" @click:append-inner="visible = !visible" clearable></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Confirm Password
                </div>

                <v-text-field v-model="repeat_password" :readonly="loading" :rules="[required]" label="Confirm Password"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" placeholder="Enter your confirm password" prepend-inner-icon="mdi-lock-outline"
                    variant="outlined" @click:append-inner="visible = !visible" clearable></v-text-field>


                <v-btn :disabled="!form" :loading="loading" size="large" type="submit" class="mb-8" color="blue"
                    variant="tonal" block>
                    Sign up
                </v-btn>

                <v-card-text class="text-center">
                    <a class="text-blue text-decoration-none" href="/login" rel="noopener noreferrer">
                        Sign in now <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
            </v-form>
        </v-card>
    </div>
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
        username: '',
        email: '',
        password: '',
        repeat_password: '',
        loading: false,
    }),

    methods: {
        onSubmit() {
            if (!this.form) return
            this.loading = true
            setTimeout(() => (this.loading = false), 200)

            const formData = {};
            formData['username'] = this.username
            formData['email'] = this.email
            formData['password'] = this.password
            formData['repeat_password'] = this.repeat_password

            this.$http.post('/user/doRegister', formData, { headers: { 'content-type': 'application/json' } })
                .then(function (response) {
                    console.log(response);
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
        },
        required(v) {
            return !!v || 'Field is required'
        },
    },

    mounted() {
    }
}
</script>