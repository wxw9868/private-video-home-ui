<template>
    <v-card variant="flat" height="100%">
        <v-layout>
            <v-main>
                <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
                    <v-data-iterator :items="cards" :items-per-page="pageSize" :page="page" :loading="iteratorLoading">
                        <template v-slot:default="{ items }">
                            <v-container class="d-flex">
                                <v-row justify="start" dense>
                                    <v-col v-for="(card, i) in items" :key="i" cols="6" sm="3" order="1">
                                        <v-skeleton-loader type="card" :loading="skeletonLoading" class="mx-auto" max-width="300">
                                            <v-card
                                                variant="flat"
                                                class="mx-auto"
                                                max-width="300"
                                                target="_blank"
                                                :href="path + card.raw.document.id"
                                                hover
                                            >
                                                <v-img :src="host + card.raw.document.poster" class="h-auto align-end text-white" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200" cover>
                                                    <v-toolbar color="transparent">
                                                        <template v-slot:append>
                                                            <v-chip variant="tonal" class="bg-black-semi text-body-2 font-weight-light">{{ card.raw.document.duration }}</v-chip>
                                                        </template>
                                                    </v-toolbar>
                                                </v-img>
                                                <div class="text-uppercase text-truncate text-body-1 font-weight-light pt-2">{{ card.raw.document.title }}</div>
                                                <div class="text-overline text-grey-darken-1">
                                                    <v-icon color="grey-darken-1" class="me-1" icon="mdi-eye" size="x-small"></v-icon>
                                                    <span class="subheading me-2" v-text="card.raw.document.browse_num"></span>
                                                    <v-icon color="grey-darken-1" class="me-1" icon="mdi-heart" size="x-small"></v-icon>
                                                    <span class="subheading" v-text="card.raw.document.collect_num"></span>
                                                </div>
                                            </v-card>
                                        </v-skeleton-loader>
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
import { err, post } from '@/utils/request';
import { inject } from 'vue';
import { useGoTo } from 'vuetify';

export default {
    setup() {
        const host = inject('serverHost');
        const goTo = useGoTo()
        return { host, goTo }
    },
    data: () => ({
        iteratorLoading: false,
        skeletonLoading: true,
        page: 1,
        pageSize: 24,
        length: 0,
        cards: [],
        path: '/video/play?id=',
    }),
    methods: {
        getData(query) {
            console.log(this.page)
            post('/search/api/query', { query: query } )
                .then(response => {
                    const data = response.data.data
                    this.cards = data.documents
                    this.length = Math.ceil(data.total / this.pageSize)
                    this.skeletonLoading = false;
                }).catch(function (error) {
                    err(error)
                });
        },
        pagination() {
            localStorage.setItem('search-page', this.page);
            this.goTo(0, { container: '#goto-container' });
        },
    },
    mounted() {
        this.page = parseInt(localStorage.getItem('search-page')) || this.page;
        this.getData(this.$route.query.query);
    },
}
</script>
