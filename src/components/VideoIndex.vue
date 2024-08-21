<template>
    <v-card variant="flat" height="100%">
        <v-layout>
            <v-main>
                <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
                    <v-sheet class="mx-auto" :elevation="0">
                        <v-slide-group v-model="model" class="pa-4" center-active :mobile=true>
                            <v-slide-group-item
                                v-for="(card, n) in cards"
                                :key="n"
                                v-slot="{ toggle, selectedClass }"
                            >
                                <v-skeleton-loader type="image" :loading="loading" class="ma-1" height="189" width="336">
                                    <v-card
                                        :class="['ma-1', selectedClass]"
                                        color="grey-lighten-1"
                                        height="189"
                                        width="336"
                                        @click="toggle"
                                        :to="path+card.id"
                                        target="_blank"
                                    >
                                        <v-img :src="host + card.poster" class="h-auto"></v-img>
                                    </v-card>
                                </v-skeleton-loader>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>
                </v-lazy>

                <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
                    <v-data-iterator :items="lists" :items-per-page="itemsPerPage" :loading="loading">
                        <template v-slot:default="{ items }">
                            <v-container class="d-flex">
                                <v-row justify="start" dense>
                                    <v-col v-for="(card, i) in items" :key="i" cols="6" sm="3" order="1">
                                        <v-skeleton-loader type="card" :loading="loading" class="mx-auto" max-width="300">
                                            <v-card
                                                variant="text"
                                                class="mx-auto"
                                                max-width="300"
                                                :to="path+card.raw.id"
                                                target="_blank"
                                            >
                                                <v-img
                                                    :src="host + card.raw.poster"
                                                    class="h-auto align-end text-white"
                                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                                    height="200"
                                                    cover
                                                >
                                                    <v-toolbar color="transparent">
                                                        <template v-slot:append>
                                                            <v-chip variant="tonal" class="bg-black-semi text-body-2 font-weight-light">{{ card.raw.duration }}</v-chip>
                                                        </template>
                                                    </v-toolbar>
                                                </v-img>
                                                <div class="text-uppercase text-truncate text-body-1 font-weight-light pt-2">{{ card.raw.title }}</div>
                                                <div class="text-overline text-grey-darken-1">
                                                    <v-icon color="grey-darken-1" class="me-1" icon="mdi-eye" size="x-small"></v-icon>
                                                    <span class="subheading me-2" v-text="card.raw.browse"></span>
                                                    <v-icon color="grey-darken-1" class="me-1" icon="mdi-heart" size="x-small"></v-icon>
                                                    <span class="subheading" v-text="card.raw.collect"></span>
                                                </div>
                                            </v-card>
                                        </v-skeleton-loader>
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
                </v-lazy>
            </v-main>
        </v-layout>
    </v-card>
</template>
<style>
.bg-black-semi {
    background-color: rgba(0, 0, 0, 0.3);
    /* 黑色半透明 */
}
</style>
<script>
import { inject } from 'vue';

export default {
    setup() {
        const host = inject('serverHost');
        return { host }
    },
    data: () => ({
        model: 5,
        itemsPerPage: 18,
        loading: true,
        cards: [],
        lists: [],
        path: '/video/play?id=',
    }),
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.lists = [
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
            ];
            this.cards = this.lists.slice(0, 9);
            // this.loading = false;
            // return
            this.$http.get('/video/getList', { params: { actress_id: 0, page: 1, size: 30, action: 'v.CreatedAt', sort: 'desc' } })
                .then(response => {
                    // console.log(response);
                    // this.lists = response.data.data.list;
                    // this.cards = this.lists.slice(0, 9);
                    this.loading = false;
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
