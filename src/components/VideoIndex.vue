<template>
    <v-card variant="flat" height="100%">
        <v-layout>
            <v-main>
                <v-lazy :min-width="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
                    <v-sheet class="mx-auto" :elevation="0">
                        <v-slide-group v-model="model" class="pa-4" center-active :mobile=true>
                            <v-slide-group-item
                                v-for="(card, n) in cards"
                                :key="n"
                                v-slot="{ toggle, selectedClass }"
                            >
                                <v-skeleton-loader
                                    type="image"
                                    :loading="loading"
                                    class="ma-1"
                                >
                                    <v-card
                                        :class="['ma-1', selectedClass]"
                                        color="grey-lighten-1"
                                        :width="width"
                                        @click="toggle"
                                        :to="path+card.id"
                                        target="_blank"
                                    >
                                        <v-img :src="host + card.poster"></v-img>
                                    </v-card>
                                </v-skeleton-loader>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>
                </v-lazy>

                <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
                    <v-data-iterator :items="list" :items-per-page="itemsPerPage" :loading="loading">
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
                                <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded @click="prevPage"></v-btn>
                                <div class="mx-2 text-caption">
                                    Page {{ page }} of {{ pageCount }}
                                </div>
                                <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal" rounded @click="nextPage"></v-btn>
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
import {err, post} from '@/utils/request';
import {inject} from 'vue';

export default {
    setup() {
        const host = inject('serverHost');
        return { host }
    },
    data: () => ({
        loading: true,
        model: 5,
        width: 0,
        itemsPerPage: 20,
        list: [],
        cards: [],
        path: '/video/play?id=',
    }),
    mounted() {
        //根据不同路由跳转不同页面
        if( this.isMobile() ){
            console.log("手机端")
            this.width = 210
        }else{
            console.log("PC端")
            this.width = 339
        }
        this.getData();
    },
    methods: {
        getData() {
            const formData = {};
            formData['page'] = 1
            formData['size'] = 32
            formData['action'] = 'v.CreatedAt'
            formData['sort'] = 'desc'
            post('/video/getVideoList', formData)
                .then(response => {
                    console.log(response)
                    this.list = response.data.data.list;
                    this.cards = this.list.slice(0, 9);
                    this.loading = false;
                }).catch(function (error) {
                    err(error)
                });
        },
        //该方法用于判断是否进入手机端
        isMobile(){
          return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        }
    },
}
</script>
