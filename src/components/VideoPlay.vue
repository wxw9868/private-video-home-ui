<template>
    <v-card class="mx-auto" max-width="960">
        <div id="videoPlayer" cover></div>

        <v-card-title class="overflow-x-hidden" v-text="videoTitle"></v-card-title>
        <v-card-subtitle class="pt-2" v-text="videoActress"></v-card-subtitle>
        <v-card-actions>
            <v-btn color="medium-emphasis" icon="mdi-heart" size="small"></v-btn>
            <span class="subheading me-2" v-text="collect"></span>
            <v-btn color="medium-emphasis" icon="mdi-eye" size="small"></v-btn>
            <span class="subheading" v-text="browse"></span>
            <v-btn color="medium-emphasis" icon="mdi-eye" size="small"></v-btn>
            <span class="subheading" v-text="duration"></span>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios';
import DPlayer from 'dplayer';

axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

export default {
    data: () => ({
        videoTitle: '',
        isCollect: '',
        collect: '',
        browse: '',
        duration: '',
        avatar: '',
        videoActress: '',
        videoUrl: 'src/assets/video/lc.mp4',
        poster: '',
        logo: '',
    }),
    mounted() {
        let id = this.$route.query.id;
        this.getData(id);
        this.initDplayer();
    },
    methods: {
        getData(id) {
            axios.get('/video/getPlay', { params: { id: id } })
                .then(response => {
                    console.log(response.data);
                    let data = response.data
                    this.videoTitle = data.videoTitle;
                    this.isCollect = data.IsCollect;
                    this.collect = data.Collect;
                    this.browse = data.Browse;
                    this.duration = data.Duration;
                    this.avatar = data.Avatar;
                    this.videoActress = data.videoActress;
                    // this.videoUrl = data.videoUrl;
                    this.poster = data.Poster;
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
        },
        initDplayer() {
            const dp = new DPlayer({
                container: document.getElementById('videoPlayer'), // 容器
                autoplay: false,
                theme: '#FADFA3',
                loop: true, // 循环播放
                lang: 'zh-cn',
                lang: navigator.language.toLowerCase(), // 语言，可选'en', 'zh-cn', 'zh-tw',
                screenshot: true,
                hotkey: true,
                airplay: true,
                chromecast: false,
                preload: 'auto',
                logo: this.logo, // 在左上角展示一个logo
                volume: 0.7,
                playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2],
                mutex: false, // 互斥，阻止多个播放器同时播放
                video: {
                    url: this.videoUrl,
                    pic: this.poster,
                    type: 'auto',
                },
                contextmenu: [],
            });
        }
    },
}
</script>