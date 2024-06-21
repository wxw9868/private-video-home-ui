<template>
    <v-app-bar :elevation="2">
        <template v-slot:prepend>
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>Application Video</v-app-bar-title>
        <v-spacer></v-spacer>
        <template v-slot:append>
            <v-btn icon="mdi-heart"></v-btn>
            <v-btn icon="mdi-magnify"></v-btn>
            <v-btn @click="toggleTheme">toggle theme</v-btn>
            <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
        <v-list v-for="item in items">
            <v-list-item :to="item.href" v-text="item.title"></v-list-item>
        </v-list>
    </v-navigation-drawer>
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
                title: 'Home',
                href: '/',
            },
            {
                title: 'List',
                href: '/list',
            },
            {
                title: 'Actress',
                href: '/actress',
            },
            {
                title: 'Login',
                href: '/login',
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