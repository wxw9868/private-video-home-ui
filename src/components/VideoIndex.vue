<template>
    <v-card>
        <v-layout>
            <v-main>
                <v-sheet class="mx-auto" :elevation="0">
                    <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" center-active :mobile=true>
                        <v-slide-group-item v-for="(card, n) in cards" :key="n"
                            v-slot="{ isSelected, toggle, selectedClass }">
                            <v-card :class="['ma-4', selectedClass]" color="grey-lighten-1" height="189" width="336"
                                @click="toggle" :href="path + card.id" target="_blank" hover>
                                <v-img :src="host + card.poster" class="h-auto align-end text-white"></v-img>
                                <div class="d-flex fill-height align-center justify-center">
                                    <v-scale-transition>
                                        <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline"
                                            size="48"></v-icon>
                                    </v-scale-transition>
                                </div>
                            </v-card>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-sheet>

                <v-data-iterator :items="cards" :items-per-page="itemsPerPage" :search="search" :loading="loading">
                    <template v-slot:default="{ items }">
                        <v-container class="d-flex" fluid>
                            <v-row justify="start" dense>
                                <v-col v-for="(card, i) in items" :key="i" cols="6" sm="3" order="1">
                                    <v-card class="mx-auto" max-width="336" :href="path" hover>
                                        <v-img :src="host + card.raw.poster" class="h-auto align-end text-white"
                                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200" cover>

                                            <v-toolbar color="transparent">
                                                <template v-slot:append>
                                                    <span class="subheading" v-text="card.raw.duration"></span>
                                                </template>
                                            </v-toolbar>
                                        </v-img>

                                        <v-card-title class="overflow-x-hidden">{{ card.raw.title }}</v-card-title>

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

                    <template v-slot:loader>
                        <v-row>
                            <v-col v-for="(_, k) in cards" :key="k" cols="6" sm="3">
                                <v-skeleton-loader class="border" type="image, article"></v-skeleton-loader>
                            </v-col>
                        </v-row>
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
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import { inject } from 'vue';

export default {
    setup() {
        const host = inject('serverHost');
        return { host }
    },
    data: () => ({
        model: null,
        itemsPerPage: 8,
        loading: true,
        path: '/play?id=1',
        search: '',
        cards: [
            {id: 1, title: 'Pre-fab homes', poster: './assets/image/card/card1.jpeg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            {id: 2, title: 'Favorite road trips', poster: './assets/image/card/card2.jpeg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            {id: 3, title: 'Best airlines', poster: './assets/image/card/card3.jpeg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            {id: 4, title: 'Top 10 Australian beaches', poster: './assets/image/card/card4.jpeg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            {id: 5, title: 'Pre-fab homes', poster: './assets/image/card/card5.jpeg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            {id: 6, title: 'Favorite road trips', poster: './assets/image/card/card6.jpeg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            {id: 7, title: 'Top 10 Australian beaches', poster: './assets/image/card/card7.jpeg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            {id: 8, title: 'Pre-fab homes', poster: './assets/image/card/card8.jpeg', duration: '01:23:46', collect: 236, browse: 89843, flex: 12 },
            {id: 9, title: 'Favorite road trips', poster: './assets/image/card/card9.jpeg', duration: '01:23:46', collect: 236, browse: 89843, flex: 6 },
            {id: 10, title: 'Best airlines', poster: './assets/image/card/card10.jpeg', duration: '01:23:46', collect: 236, browse: 89843, flex: 6 }
        ],
    }),
    mounted() {
        this.getData();
        this.loading = false;
    },
    methods: {
        getData() {
            this.$http.get('/video/getList', { params: { actress_id: 0, page: 1, size: 10, action: '', sort: '' } })
                .then(response => {
                    console.log(response.data.data.list);
                    // this.cards = response.data.data.list;
                    this.loading = false;
                    // this.length = Math.ceil(response.data.data.list.length / this.itemsPerPage);
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
}
</script>
