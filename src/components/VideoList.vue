<template>
    <v-card>
        <v-layout>
            <v-main>
                <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
                    <v-data-iterator :items="cards" :items-per-page="itemsPerPage" :page="page" :loading="loading">
                        <template v-slot:default="{ items }">
                            <v-container class="d-flex" fluid>
                                <v-row justify="start" dense>
                                    <v-col v-for="(card, i) in items" :key="i" cols="6" sm="2" order="1">
                                        <v-card variant="flat" class="mx-auto" max-width="300"
                                            :href="path + card.raw.id" target="_blank" hover>
                                            <v-img :src="host + card.raw.poster" class="h-auto align-end text-white"
                                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200" cover>
                                                <v-toolbar color="transparent">
                                                    <template v-slot:append>
                                                        <span class="subheading" v-text="card.raw.duration"></span>
                                                    </template>
                                                </v-toolbar>
                                            </v-img>
                                            <v-card-subtitle class="pt-2">{{ card.raw.title }}</v-card-subtitle>
                                            <div class="px-4 text-overline text-grey-darken-1">
                                                <v-icon color="grey-darken-1" class="me-1" icon="mdi-eye"
                                                    size="x-small"></v-icon>
                                                <span class="subheading" v-text="card.raw.browse"></span>
                                                <span class="me-2"></span>
                                                <v-icon color="grey-darken-1" class="me-1" icon="mdi-heart"
                                                    size="x-small"></v-icon>
                                                <span class="subheading" v-text="card.raw.collect"></span>
                                            </div>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-pagination v-model="page" :length="length" :total-visible="5" @click="pagination()"></v-pagination>
                        </template>
                    </v-data-iterator>
                </v-lazy>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useGoTo } from 'vuetify';

axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

export default {
    setup() {
        const goTo = useGoTo()
        return { goTo }
    },
    data: () => ({
        host: 'http://192.168.0.4:80/',
        path: 'play?id=',
        itemsPerPage: 24,
        page: ref(1),
        length: 0,
        cards: [],
        loading: true,
        pagepage: 0,
        pagesize: 0,
        action: '',
        sort: '',
    }),
    methods: {
        pagination() {
            localStorage.setItem('list-currentPage', this.page);
            this.goTo(0, { container: '#goto-container' });
        },
        loadPage() {
            let currentPage = parseInt(localStorage.getItem('list-currentPage'));
            this.page = currentPage || this.page;
        },
        getData(actress_id) {
            axios.get('/video/getList', { params: { actress_id: actress_id, page: this.pagepage, size: this.pagesize, action: this.action, sort: this.sort } })
                .then(response => {
                    console.log(response.data.data.list);
                    this.cards = response.data.data.list;
                    this.length = Math.ceil(response.data.data.list.length / this.itemsPerPage);
                    this.loading = false;
                    this.loadPage();
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
        this.getData(this.$route.query.id);
    },
}
</script>