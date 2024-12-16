<template>
    <v-card variant="flat" height="100%">
        <v-layout>
            <v-main>
                <v-text-field
                    type="search"
                    density="comfortable"
                    placeholder="Search"
                    variant="outlined"
                    v-model="query"
                    v-on:keyup.enter="search()"
                >
                    <v-btn variant="text" @click="search()" class="text-field-with-button">搜索</v-btn>
                </v-text-field>
                <v-tabs v-model="tab" align-tabs="center" :mandatory=true>
                    <v-tab value="one" @click="getData('a.CreatedAt', 'desc', '')">{{ $t('RecentUpdate') }}</v-tab>
                    <v-tab value="two" @click="getData('a.actress', 'desc', '')">{{ $t('Alphabetically') }}</v-tab>
                    <v-tab value="three" @click="getData('count', 'desc', '')">{{ $t('MostVideos') }}</v-tab>
                </v-tabs>
                <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
                    <v-data-iterator :items="items" :items-per-page="pageSize" :page="page" :loading="iteratorLoading">
                        <template v-slot:default="{ items }">
                            <v-list lines="two">
                                <v-container class="d-flex">
                                    <v-row justify="start" dense>
                                        <v-col v-for="(file, i) in items" :key="i" cols="6" sm="3" order="1">
                                            <v-skeleton-loader type="list-item-avatar-two-line" :loading="skeletonLoading">
                                                <v-list-item
                                                    :title="file.raw.actress"
                                                    :subtitle="file.raw.count + subtitle"
                                                    :href="path + file.raw.id"
                                                >
                                                    <template v-slot:prepend>
                                                        <v-avatar size="32">
                                                            <v-img :src="host + file.raw.avatar"></v-img>
                                                        </v-avatar>
                                                    </template>
                                                </v-list-item>
                                            </v-skeleton-loader>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-list>
                            <v-pagination v-model="page" :length="length" :total-visible="5" @click="pagination()"></v-pagination>
                        </template>
                    </v-data-iterator>
                </v-lazy>
            </v-main>
        </v-layout>
    </v-card>
</template>

<style>
.text-field-with-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
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
        tab: 'one',
        iteratorLoading: false,
        skeletonLoading: true,
        page: 1,
        pageSize: 40,
        length: 0,
        path: '/video/list?id=',
        subtitle: ' 部影片',
        items: [],
        query: '',
        column: 'a.CreatedAt',
        order: 'desc',
    }),
    methods: {
        search() {
            this.getData('', '', this.query);
        },
        getData(column, order, query) {
            this.setCache(column, order);
            const formData = {};
            formData['page'] = this.page
            formData['size'] = this.pageSize
            formData['action'] = this.column
            formData['sort'] = this.order
            formData['actress'] = query
            post('/actress/getActressList', formData)
                .then(response => {
                    this.items = response.data.data.list;
                    this.length = Math.ceil(response.data.data.count / this.pageSize);
                    this.skeletonLoading = false;
                }).catch(function (error) {
                    err(error)
                });
        },
        pagination() {
            this.getData('', '', this.query);
            localStorage.setItem('actress-page', this.page);
            this.goTo(0, { container: '#goto-container' });
        },
        setCache(column, order) {
            if (column !=='' && order !== '') {
                this.page = 1;
                localStorage.setItem('actress-page', 1);
            }
            this.column = column || this.column;
            this.order = order || this.order;

            localStorage.setItem('actress-tab', this.tab);
            localStorage.setItem('actress-column', column);
            localStorage.setItem('actress-order', order);
        },
        getCache() {
            this.tab = localStorage.getItem('actress-tab') || this.tab;
            this.column = localStorage.getItem('actress-column') || this.column;
            this.order = localStorage.getItem('actress-order') || this.order;
            this.page = parseInt(localStorage.getItem('actress-page')) || this.page;
        }
    },
    mounted() {
        this.getCache()
        this.getData('', '', '');
    },
}
</script>
