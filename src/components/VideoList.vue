<template>
    <v-card variant="flat" height="100%">
        <v-layout>
            <v-main>
                <v-tabs
                    v-model="tab"
                    align-tabs="center"
                    :mandatory=true 
                >
                    <v-tab :value="1" @click="getData('v.CreatedAt','desc')">最近更新</v-tab>
                    <v-tab :value="2" @click="getData('l.browse','desc')">播放次数</v-tab>
                    <v-tab :value="3" @click="getData('l.collect','desc')">收藏数量</v-tab>
                </v-tabs>

                <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
                    <v-data-iterator :items="cards" :items-per-page="itemsPerPage" :page="page" :loading="loading">
                        <template v-slot:default="{ items }">
                            <v-container class="d-flex" fluid>
                                <v-row justify="start" dense>
                                    <v-col v-for="(card, i) in items" :key="i" cols="6" sm="2" order="1">
                                        <v-card 
                                            variant="flat" 
                                            class="mx-auto" 
                                            max-width="300"
                                            :href="path + card.raw.id" 
                                            target="_blank" 
                                            hover
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
                                            <div class="text-truncate text-body-1 pt-2">{{ card.raw.title }}</div>
                                            <div class="text-overline text-grey-darken-1">
                                                <v-icon color="grey-darken-1" class="me-1" icon="mdi-eye" size="x-small"></v-icon>
                                                <span class="subheading me-2" v-text="card.raw.browse"></span>
                                                <v-icon color="grey-darken-1" class="me-1" icon="mdi-heart" size="x-small"></v-icon>
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
<style>
.bg-black-semi {
    background-color: rgba(0, 0, 0, 0.3);
    /* 黑色半透明 */
}
</style>
<script>
import { inject } from 'vue';
import { ref } from 'vue';
import { useGoTo } from 'vuetify';

export default {
    setup() {
        const host = inject('serverHost');
        const goTo = useGoTo()
        return { host, goTo }
    },
    data: () => ({
        tab: null,
        actress_id: 0,
        path: 'play?id=',
        itemsPerPage: 24,
        page: ref(1),
        length: 0,
        cards: [],
        loading: true,
        pagepage: 0,
        pagesize: 0,
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
        getData(action,sort) {
            this.$http.get('/video/getList', { params: { actress_id: this.actress_id, page: this.pagepage, size: this.pagesize, action: action, sort: sort } })
                .then(response => {
                    // console.log(response.data.data.list);
                    // this.cards = response.data.data.list;
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
        this.actress_id = this.$route.query.id
        this.getData('','');
    },
}
</script>