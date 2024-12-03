<template>
    <v-card variant="flat" height="100%">
        <v-layout>
            <v-main>
                <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
                    <v-data-iterator :items="cards" :items-per-page="itemsPerPage" :page="page" :loading="loading">
                        <template v-slot:default="{ items }">
                            <v-container class="d-flex" fluid>
                                <v-row justify="start" dense>
                                    <v-col v-for="(card, i) in items" :key="i" cols="4" sm="3" order="1">
                                        <v-skeleton-loader type="image" :loading="loading" class="mx-auto" max-width="300">
                                            <v-card
                                                variant="flat"
                                                class="mx-auto"
                                                max-width="300"
                                                :to="path + card.raw.id"
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
                                            </v-card>
                                        </v-skeleton-loader>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-pagination
                                v-model="page"
                                :length="length"
                                :total-visible="5"
                                @click="pagination()"
                            ></v-pagination>
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
import { get,err } from '@/utils/request';
import { inject } from 'vue';
import { useGoTo } from 'vuetify';

export default {
    setup() {
        const host = inject('serverHost');
        const goTo = useGoTo()
        return { host, goTo }
    },
    data: () => ({
        path: '/video/play?id=',
        itemsPerPage: 24,
        page: 1,
        length: 0,
        cards: [],
        loading: true,
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
        getData(query) {
            get('/user/getUserBrowseList', { params: { query: query } })
                .then(response => {
                    let data = response.data.data
                    this.cards = data
                    this.length = Math.ceil(data.length / this.itemsPerPage)
                    this.loading = false;
                    this.loadPage();
                }).catch(function (error) {
                    err(error)
                });
        }
    },
    mounted() {
        this.getData(this.$route.query.query);
    },
}
</script>
