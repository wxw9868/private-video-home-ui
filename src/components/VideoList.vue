<template>
    <v-card>
        <v-layout>
            <v-app-bar :elevation="2">
                <template v-slot:prepend>
                    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                </template>
                <v-app-bar-title>Application Bar</v-app-bar-title>
                <v-spacer></v-spacer>
                <template v-slot:append>
                    <v-btn icon="mdi-heart"></v-btn>
                    <v-btn icon="mdi-magnify"></v-btn>
                    <v-btn @click="toggleTheme">toggle theme</v-btn>
                    <v-btn icon="mdi-dots-vertical"></v-btn>
                </template>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
                <v-list :items="items" :href="items"></v-list>
            </v-navigation-drawer>

            <v-main>
                <v-container class="bg-surface-variant" fluid>
                    <v-row justify="start" dense>
                        <v-col v-for="card in list" :key="card.title" :cols="card.flex" offset="0" order="1">
                            <v-card class="mx-auto" max-width="344" href="https://github.com/vuetifyjs/vuetify/" hover>
                                <v-img :src="card.src" class="align-end text-white"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" cover>
                                    <!-- <v-card-title class="text-white" v-text="card.title"></v-card-title> -->
                                    <v-toolbar color="transparent">
                                        <!-- <template v-slot:prepend>
                                <v-btn icon="$menu"></v-btn>
                            </template> -->

                                        <!-- <v-toolbar-title class="text-h6" text="Messages"></v-toolbar-title> -->

                                        <template v-slot:append>
                                            <span class="subheading">01:34:21</span>
                                            <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
                                        </template>
                                    </v-toolbar>
                                </v-img>

                                <v-card-title class="overflow-x-auto" v-text="card.title"></v-card-title>

                                <!-- <v-card-subtitle class="pt-4">
                        Number 10
                    </v-card-subtitle> -->

                                <!-- <v-card-text>
                        <div>Whitehaven Beach</div>
                        <div>Whitsunday Island, Whitsunday Islands</div>
                    </v-card-text> -->

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

                <v-list lines="two">
                    <v-list-item v-for="file in files" :key="file.title" :subtitle="file.subtitle" :title="file.title">
                        <template v-slot:prepend>
                            <v-avatar :color="file.color">
                                <v-icon color="white">{{ file.icon }}</v-icon>
                            </v-avatar>
                        </template>

                        <template v-slot:append>
                            <v-btn color="grey-lighten-1" icon="mdi-information" variant="text"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>
                
                <v-pagination v-model="page" :length="5" rounded="0"></v-pagination>

                
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
<script>
export default {
    data: () => ({
        drawer: false,
        group: null,
        items: [
            {
                title: 'Foo',
                value: 'Foo',
            },
            {
                title: 'Bar',
                value: 'bar',
            },
            {
                title: 'Fizz',
                value: 'fizz',
            },
            {
                title: 'Buzz',
                value: 'buzz',
            },
        ],
        list: [
            { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
            { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
            { title: 'Top 10 Australian beaches', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', flex: 3 },
            { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
            { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
            { title: 'Top 10 Australian beaches Top 10 Australian beaches Top 10 Australian beaches Top 10 Australian beaches', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', flex: 3 }
        ],
        // cards: [
        //     { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        //     { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        //     { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
        // ],
        files: [
            {
                color: 'blue',
                icon: 'mdi-clipboard-text',
                subtitle: 'Jan 20, 2014',
                title: 'Vacation itinerary',
            },
            {
                color: 'amber',
                icon: 'mdi-gesture-tap-button',
                subtitle: 'Jan 10, 2014',
                title: 'Kitchen remodel',
            },
        ],
        folders: [
            {
                subtitle: 'Jan 9, 2014',
                title: 'Photos',
            },
            {
                subtitle: 'Jan 17, 2014',
                title: 'Recipes',
            },
            {
                subtitle: 'Jan 28, 2014',
                title: 'Work',
            },
        ],
    }),

    watch: {
        group() {
            this.drawer = false
        },
    },
}
</script>