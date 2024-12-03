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
                    v-on:keyup.enter="searchActress()"
                >
                    <v-btn variant="text" @click="searchActress()" class="text-field-with-button">搜索</v-btn>
                </v-text-field>
                <v-tabs v-model="tab" align-tabs="center" :mandatory=true>
                    <v-tab value="one" @click="getData('a.CreatedAt', 'desc', '')">{{ $t('RecentUpdate') }}</v-tab>
                    <v-tab value="two" @click="getData('a.actress', 'desc', '')">{{ $t('Alphabetically') }}</v-tab>
                    <v-tab value="three" @click="getData('count', 'desc', '')">{{ $t('MostVideos') }}</v-tab>
                </v-tabs>
                <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
                    <v-data-iterator :items="items" :items-per-page="itemsPerPage" :page="page" :loading="iteratorLoading">
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
        tab: '',
        path: '/video/list?id=',
        subtitle: ' 部影片',
        itemsPerPage: 40,
        page: 1,
        pageSize: 40,
        items: [],
        iteratorLoading: false,
        skeletonLoading: true,
        length: 0,
        query: '',
    }),
    methods: {
        searchActress() {
            this.getData('', '', this.query);
        },
        getData(action, sort, query) {
            this.loading = true;
            const obj = this.loadTab(this.tab,action,sort);
            const formData = {};
            formData['page'] = this.page
            formData['size'] = this.pageSize
            formData['action'] = obj.action
            formData['sort'] = obj.sort
            formData['actress'] = query

            post('/actress/getActressList', formData)
                .then(response => {
                    this.items = response.data.data.list;
                    this.length = Math.ceil(response.data.data.count / this.itemsPerPage);
                    this.skeletonLoading = false;
                    this.loadPage();
                }).catch(function (error) {
                    err(error)
                });
        },
        pagination() {
            this.getData('', '', this.query);
            localStorage.setItem('actress-currentPage',this.page);
            this.goTo(0, { container: '#goto-container' });
        },
        loadPage() {
            let currentPage = parseInt(localStorage.getItem('actress-currentPage'));
            this.pageNum = currentPage || this.pageNum;
        },
        loadTab(tab,action,sort) {
            if (action !=='' && sort !== '') localStorage.setItem('actress-currentPage','1')

            this.tab = tab || localStorage.getItem('actress-tab');
            action = action || localStorage.getItem('actress-action');
            sort = sort || localStorage.getItem('actress-sort');

            localStorage.setItem('actress-tab',this.tab);
            localStorage.setItem('actress-action',action);
            localStorage.setItem('actress-sort',sort);
            return {action,sort}
        },
    },
    mounted() {
        this.getData('a.CreatedAt', 'desc', '');
    },
}
</script>
