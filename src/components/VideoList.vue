<template>
    <v-card>
        <v-layout>
            

            <v-main>
                <v-container class="d-flex bg-surface-variant" fluid>
                    <v-row justify="start" dense>
                        <v-col v-for="card in list" :key="card.title" :sm="card.flex" offset="0" order="1" cols="6">
                            <v-card class="mx-auto" max-width="336" href="https://github.com/vuetifyjs/vuetify/" hover>
                                <v-img :src="card.src" class="h-auto align-end text-white"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200" cover>

                                    <v-toolbar color="transparent">
                                        <template v-slot:append>
                                            <span class="subheading">01:34:21</span>
                                        </template>
                                    </v-toolbar>
                                </v-img>

                                <v-card-title class="overflow-x-hidden" v-text="card.title"></v-card-title>

                                <v-card-actions>
                                    <v-btn color="medium-emphasis" icon="mdi-heart" size="small"></v-btn>
                                    <span class="subheading me-2">256</span>
                                    <v-btn color="medium-emphasis" icon="mdi-bookmark" size="small"></v-btn>
                                    <span class="subheading">45</span>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

                <v-list lines="two">
                    <v-list-item v-for="file in files" :key="file.title" :subtitle="file.subtitle" :title="file.title">
                        <template v-slot:prepend>
                            <v-avatar :color="file.color">
                                <v-icon color="white">{{ file.icon }}</v-icon>
                            </v-avatar>
                        </template>

                        <template v-slot:append>
                            <v-btn color="grey-lighten-1" icon="mdi-information" variant="text"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>
                
                <v-pagination v-model="page" :length="5" rounded="0"></v-pagination>

                
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8081';
axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;

// 例如，保存token到本地存储
//  localStorage.setItem('token', response.data.token);

let actress_id = 0;
let pagepage = 0;
let pagesize = 0;
let action = '';
let sort = '';
axios.get('/video/getList', { params: {actress_id: actress_id, page: pagepage, size: pagesize, action: action, sort: sort } })
    .then(function (response) {
        console.log(response)
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

export default {
    data: () => ({
        drawer: false,
        group: null,
        items: [
            {
                title: 'Foo',
                value: 'Foo',
            },
            {
                title: 'Bar',
                value: 'bar',
            },
            {
                title: 'Fizz',
                value: 'fizz',
            },
            {
                title: 'Buzz',
                value: 'buzz',
            },
        ],
        list: [
            { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 2 },
            { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 2 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 2 },
            { title: 'Top 10 Australian beaches', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', flex: 2 },
            { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 2 },
            { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 2 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 2 },
            { title: 'Top 10 Australian beaches Top 10 Australian beaches Top 10 Australian beaches Top 10 Australian beaches', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', flex: 2 }
        ],
        // cards: [
        //     { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        //     { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        //     { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
        // ],
        files: [
            {
                color: 'blue',
                icon: 'mdi-clipboard-text',
                subtitle: 'Jan 20, 2014',
                title: 'Vacation itinerary',
            },
            {
                color: 'amber',
                icon: 'mdi-gesture-tap-button',
                subtitle: 'Jan 10, 2014',
                title: 'Kitchen remodel',
            },
        ],
        folders: [
            {
                subtitle: 'Jan 9, 2014',
                title: 'Photos',
            },
            {
                subtitle: 'Jan 17, 2014',
                title: 'Recipes',
            },
            {
                subtitle: 'Jan 28, 2014',
                title: 'Work',
            },
        ],
    }),

    watch: {
        group() {
            this.drawer = false
        },
    },
}
</script>