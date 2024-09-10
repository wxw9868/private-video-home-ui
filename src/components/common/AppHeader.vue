<template>
    <v-app-bar :elevation="0">
        <template v-slot:prepend>
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title></v-app-bar-title>
        <v-spacer></v-spacer>
        <template v-slot:append>
            <v-btn variant="text" icon="mdi-magnify" @click="toggleSearch"></v-btn>
            <v-menu :close-on-content-click="false" location="bottom" offset="6, 80">
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-translate-variant" v-bind="props"></v-btn>
                </template>
                <v-sheet rounded="md" width="180">
                    <LanguageDD />
                </v-sheet>
            </v-menu>
            <v-btn variant="text" :icon="theme.global.name.value === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
                @click="toggleTheme"></v-btn>
            <v-menu :close-on-content-click="false" offset="8, 0">
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-account" v-bind="props">
                        <v-avatar size="24"><v-img :src="avatar ? (host+avatar) : '@/assets/images/users/avatar-1.png'"></v-img></v-avatar>
                    </v-btn>
                </template>
                <v-sheet rounded="md" width="180">
                    <ProfileDD />
                </v-sheet>
            </v-menu>
        </template>
        <v-expand-x-transition>
            <form action="/video/search" method="get">
                <v-text-field
                    v-show="isSearchVisible"
                    hide-details
                    type="search"
                    name="query"
                    :style="{ width: searchWidth }"
                    density="comfortable"
                    placeholder="Search"
                    variant="outlined"
                ></v-text-field>
            </form>
        </v-expand-x-transition>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined" temporary>
        <v-list v-for="item in items" :key="item" density="compact" nav>
            <v-list-item :prepend-icon="item.icon" :to="item.href">{{ $t(item.title) }}</v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script setup>
import { get, err } from '@/utils/request';
import { useTheme } from 'vuetify'
import { inject } from 'vue';

const host = inject('serverHost');
const theme = useTheme()

// loadTheme()
// function loadTheme() {
//     theme.global.name.value = localStorage.getItem("theme")
// }

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    localStorage.setItem("theme", theme.global.name.value)
}
</script>
<script>
export default {
    data: () => ({
        isSearchVisible: false,
        searchWidth: '150px', // 初始宽度
        searchQuery: '',
        dialog: false,
        visible: false,
        drawer: false,
        group: null,
        items: [
            {
                title: 'Home',
                href: '/',
                icon: 'mdi-home-circle',
            },
            {
                title: 'List',
                href: '/video/list',
                icon: 'mdi-list-box',
            },
            {
                title: 'Actress',
                href: '/video/actress',
                icon: 'mdi-account-group',
            },
            {
                title: 'Liquidation',
                href: '/stock/liquidation',
                icon: 'mdi-table',
            },
            {
                title: 'TradingRecords',
                href: '/stock/trading-records',
                icon: 'mdi-table',
            },
        ],
        avatar: null,
    }),
    mounted() {
        if (document.cookie) {
            this.getSession()
        }
    },

    methods: {
        toggleSearch() {
            this.isSearchVisible = !this.isSearchVisible;
            if (this.isSearchVisible) {
                this.searchWidth = '300px'; // 设置搜索框展开后的宽度
            } else {
                this.searchWidth = '100px'; // 设置搜索框收起后的宽度
            }
        },
        getSession() {
            get('/user/session')
                .then(response => {
                    let data = response.data.data;
                    if (data) {
                        console.log(data)
                        this.avatar = data.avatar;
                        localStorage.setItem("userID", data.id);
                        localStorage.setItem("userAvatar", data.avatar);
                        localStorage.setItem("userUsername", data.username);
                        localStorage.setItem("userNickname", data.nickname);
                        localStorage.setItem("userEmail", data.email);
                        localStorage.setItem("userMobile", data.mobile);
                        localStorage.setItem("userDesignation", data.designation);
                    }
                }).catch(function (error) {
                    err(error)
                });
        },
    },

    watch: {
        group() {
            this.drawer = false
        },
    },
}
</script>
