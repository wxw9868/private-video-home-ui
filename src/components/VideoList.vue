<template>
    <v-card>
        <v-layout>

            <v-main>
                <v-data-iterator :items="cards" :items-per-page="20" :search="search">
                    <template v-slot:header>
                        <v-toolbar class="px-2">
                            <v-text-field v-model="search" density="comfortable" placeholder="Search"
                                prepend-inner-icon="mdi-magnify" style="max-width: 300px;" variant="solo" clearable
                                hide-details></v-text-field>
                        </v-toolbar>
                    </template>

                    <template v-slot:default="{ items }">
                        <v-container class="d-flex bg-surface-variant" fluid>
                            <v-row justify="start" dense>
                                <v-col v-for="card in items" :key="card.title" sm="3" offset="0" order="1" cols="6">
                                    <v-card class="mx-auto" max-width="336" :href="path"
                                        hover>
                                        <v-img :src="host + card.raw.poster" class="h-auto align-end text-white"
                                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200" cover>

                                            <v-toolbar color="transparent">
                                                <template v-slot:append>
                                                    <span class="subheading" v-text="card.raw.duration"></span>
                                                </template>
                                            </v-toolbar>
                                        </v-img>

                                        <v-card-title class="overflow-x-hidden" v-text="card.raw.title"></v-card-title>

                                        <v-card-actions>
                                            <v-btn color="medium-emphasis" icon="mdi-heart" size="small"></v-btn>
                                            <span class="subheading me-2" v-text="card.raw.collect"></span>
                                            <v-btn color="medium-emphasis" icon="mdi-eye" size="small"></v-btn>
                                            <span class="subheading" v-text="card.raw.browse"></span>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>

                    <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                        <div class="d-flex align-center justify-center pa-4">
                            <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal"
                                rounded @click="prevPage"></v-btn>

                            <div class="mx-2 text-caption">
                                Page {{ page }} of {{ pageCount }}
                            </div>

                            <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right"
                                variant="tonal" rounded @click="nextPage"></v-btn>
                        </div>
                    </template>
                </v-data-iterator>

                <!-- <v-list lines="two">
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
                </v-list> -->

                <!-- <v-pagination v-model="page" :length="5" rounded="0"></v-pagination> -->


            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import axios from 'axios';

axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;
// 例如，保存token到本地存储
//  localStorage.setItem('token', response.data.token);

let actress_id = 0;
let pagepage = 0;
let pagesize = 0;
let action = '';
let sort = '';

export default {
    data: () => ({
        host: 'http://192.168.0.3:80/',
        path: 'play', 
        search: '',
        cards: []
    }),

    methods: {
        getData() {
            axios.get('/video/getList', { params: { actress_id: actress_id, page: pagepage, size: pagesize, action: action, sort: sort } })
                .then(response => {
                    console.log(response.data.data.list);
                    this.cards = response.data.data.list;
                    // console.log('list: ' + this.cards);
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
    },

    mounted() {
        this.getData();
    },
    // watch: {
    //     group() {
    //         this.drawer = false
    //     },
    // },
}

// page: Object,
// list: [
//     { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 2 },
//     { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 2 },
//     { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 2 },
//     { title: 'Top 10 Australian beaches', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', flex: 2 },
//     { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 2 },
//     { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 2 },
//     { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 2 },
//     { title: 'Top 10 Australian beaches Top 10 Australian beaches Top 10 Australian beaches Top 10 Australian beaches', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', flex: 2 }
// ],
// cards: [
//     { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
//     { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
//     { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
// ],
// drawer: false,
// group: null,


// files: [
//     {
//         color: 'blue',
//         icon: 'mdi-clipboard-text',
//         subtitle: 'Jan 20, 2014',
//         title: 'Vacation itinerary',
//     },
//     {
//         color: 'amber',
//         icon: 'mdi-gesture-tap-button',
//         subtitle: 'Jan 10, 2014',
//         title: 'Kitchen remodel',
//     },
// ],
// folders: [
//     {
//         subtitle: 'Jan 9, 2014',
//         title: 'Photos',
//     },
//     {
//         subtitle: 'Jan 17, 2014',
//         title: 'Recipes',
//     },
//     {
//         subtitle: 'Jan 28, 2014',
//         title: 'Work',
//     },
// ],
</script>
