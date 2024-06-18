<template>
    <v-app-bar :elevation="2">
        <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Application Bar</v-app-bar-title>

        <template v-slot:append>
            <v-btn icon="mdi-heart"></v-btn>

            <v-btn icon="mdi-magnify"></v-btn>

            <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar>

    <v-container class="bg-surface-variant" fluid>
        <v-row justify="start" dense>
            <v-col v-for="card in list" :key="card.title" :cols="card.flex" offset="0" order="1">
                <v-card class="mx-auto" max-width="400">
                    <v-img :src="card.src" class="align-end text-white" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200" cover>
                        <v-card-title class="text-white" v-text="card.title"></v-card-title>
                    </v-img>

                    <v-card-title v-text="card.title"></v-card-title>
                    
                    <v-card-subtitle class="pt-4">
                        Number 10
                    </v-card-subtitle>

                    <v-card-text>
                        <div>Whitehaven Beach</div>
                        <div>Whitsunday Island, Whitsunday Islands</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn color="medium-emphasis" icon="mdi-heart" size="small"></v-btn>
                        <span class="subheading me-2">256</span>
                        <v-btn color="medium-emphasis" icon="mdi-bookmark" size="small"></v-btn>
                        <span class="subheading">45</span>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
export default {
    data: () => ({
        list: [
            { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
            { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
            { title: 'Top 10 Australian beaches', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', flex: 3 }
        ],
        cards: [
            { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
            { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
        ],
    }),
}
</script>