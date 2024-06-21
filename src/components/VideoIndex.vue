<template>
    <v-card>
        <v-layout>

            <v-main>
                <v-data-iterator :items="cards" :items-per-page="itemsPerPage" :search="search">
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
                                <v-col v-for="(card, i) in items" :key="i" cols="6" sm="3" order="1">
                                    <v-card class="mx-auto" max-width="336" :href="path" hover>
                                        <v-img :src="card.raw.poster" class="h-auto align-end text-white"
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

                    <template v-slot:loader>
                        <v-row>
                            <v-col v-for="(_, k) in list" :key="k" cols="6" sm="3">
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
export default {
    data: () => ({
        itemsPerPage: 4,
        list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        path: 'play?id=1',
        search: '',
        cards: [
            { title: 'Pre-fab homes', poster: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            { title: 'Favorite road trips', poster: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            { title: 'Best airlines', poster: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            { title: 'Top 10 Australian beaches', poster: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            { title: 'Pre-fab homes', poster: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            { title: 'Favorite road trips', poster: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            { title: 'Top 10 Australian beaches', poster: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', duration: '01:23:46', collect: 236, browse: 89843, flex: 2 },
            { title: 'Pre-fab homes', poster: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', duration: '01:23:46', collect: 236, browse: 89843, flex: 12 },
            { title: 'Favorite road trips', poster: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', duration: '01:23:46', collect: 236, browse: 89843, flex: 6 },
            { title: 'Best airlines', poster: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', duration: '01:23:46', collect: 236, browse: 89843, flex: 6 }
        ],
    }),
}




</script>
