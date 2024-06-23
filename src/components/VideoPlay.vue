<template>
    <v-card>
        <v-layout>
            <v-main>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-card variant="flat" class="mx-auto">
                                <v-responsive :aspect-ratio="16 / 9" id="videoContainer">
                                    <!-- <div id="videoPlayer" :style="style"></div> -->
                                    <video id="videoPlayer" :style="style"></video>
                                </v-responsive>
                                <div id="videoPlayer"></div>
                                <v-card-text class="text-h6">
                                    {{ videoTitle }}
                                </v-card-text>

                                <v-card-subtitle>
                                    <span class="me-2" v-for="item in videoActress" :key="item" :to="path + item.id">{{
                                    item.actress
                                }}</span>
                                </v-card-subtitle>

                                <v-card-actions>
                                    <v-btn color="medium-emphasis" icon="mdi-heart" size="small"></v-btn>
                                    <span class="subheading me-2" v-text="collect"></span>
                                    <v-btn color="medium-emphasis" icon="mdi-eye" size="small"></v-btn>
                                    <span class="subheading" v-text="browse"></span>
                                    <v-btn color="medium-emphasis" icon="mdi-clock" size="small"></v-btn>
                                    <span class="subheading" v-text="duration"></span>
                                </v-card-actions>

                                <v-item-group class="pb-6">
                                    <!-- <small>切换播放器：</small> pt-2-->
                                    <v-item v-for="logo in logos" :key="logo">
                                        <v-btn class="rounded-circle" height="40" width="40" variant="text">
                                            <v-img :src="logo.src" class="rounded-circle" height="40" width="40"
                                                cover></v-img>
                                        </v-btn>
                                    </v-item>
                                </v-item-group>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import axios from 'axios';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
// import DPlayer from 'dplayer';
// import Artplayer from "artplayer";
// import XGplayer, { Events } from 'xgplayer';
// import 'xgplayer/dist/index.min.css';

axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

export default {
    data: () => ({
        host: 'http://192.168.0.4:80/',
        path: '/actress?id=',
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
        style: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%'
        },
        logos: [
            {
                player: 'plyr',
                src: 'http://192.168.0.3:80/assets/image/player/player.png',
            },
            {
                player: 'dplayer',
                src: 'http://192.168.0.3:80/assets/image/player/dplayer.png',
            },
            {
                player: 'artplayer',
                src: 'http://192.168.0.3:80/assets/image/player/artplayer.png',
            },
            {
                player: 'xgplayer',
                src: 'http://192.168.0.3:80/assets/image/player/xgplayer.jpg',
            },
        ],
    }),
    mounted() {
        let id = this.$route.query.id;
        this.getData(id);
        this.loadBrowse(id)
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
                    this.avatar = this.host + data.Avatar;
                    this.videoActress = data.videoActress;
                    this.videoUrl = this.host + data.videoUrl;
                    this.poster = this.host + data.Poster;

                    this.loadPlyr();
                    // this.loadDPlayer();
                    // this.loadArtplayer();
                    // this.loadXgplayer();
                    // let playerType = localStorage.getItem("playerType") ? localStorage.getItem("playerType") : 'plyr';
                    // this.loadPlayer(playerType);
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
        // 统计浏览量
        loadBrowse(id) {
            this.browse = this.browse + 1
            axios.get('/video/browse', { params: { video_id: parseInt(id) } }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
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
        // loadPlayer(playerType) {
        //     playerType = (playerType) ? playerType : localStorage.getItem("playerType");
        //     localStorage.setItem("playerType", playerType);

        //     const element = document.getElementById("videoContainer");
        //     element.innerHTML = '';
        //     let tag = '';
        //     if (playerType == 'plyr') {
        //         tag = document.createElement("video");
        //     } else {
        //         tag = document.createElement("div");
        //     }
        //     tag.setAttribute("id", "videoPlayer");
        //     tag.style.position = 'absolute';
        //     tag.style.top = 0;
        //     tag.style.right = 0;
        //     tag.style.bottom = 0;
        //     tag.style.left = 0;
        //     tag.style.width = '100%';
        //     tag.style.height = '100%';

        //     switch (playerType) {
        //         case 'xgplayer':
        //             this.loadXgplayer();
        //             break;
        //         case 'dplayer':
        //             this.loadDPlayer();
        //             break;
        //         case 'artplayer':
        //             this.loadArtplayer();
        //             break;
        //         case 'plyr':
        //             this.loadPlyr();
        //             break;
        //         default:
        //             this.loadPlyr();
        //     }

        //     element.appendChild(tag);
        // },
        // loadDPlayer() {
        //     const dp = new DPlayer({
        //         container: document.getElementById('videoPlayer'), // 容器
        //         autoplay: false,
        //         theme: '#FADFA3',
        //         loop: true, // 循环播放
        //         lang: 'zh-cn',
        //         lang: navigator.language.toLowerCase(), // 语言，可选'en', 'zh-cn', 'zh-tw',
        //         screenshot: true,
        //         hotkey: true,
        //         airplay: true,
        //         chromecast: false,
        //         preload: 'auto',
        //         logo: this.logo, // 在左上角展示一个logo
        //         volume: 0.7,
        //         playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2],
        //         mutex: false, // 互斥，阻止多个播放器同时播放
        //         video: {
        //             url: this.videoUrl,
        //             pic: this.poster,
        //             type: 'auto',
        //         },
        //         contextmenu: [],
        //     });
        // },
        // loadArtplayer() {
        //     const art = new Artplayer({
        //         container: '#videoPlayer',
        //         url: this.videoUrl,
        //         poster: this.poster,
        //         volume: 1,
        //         muted: true, // 是否默认静音
        //         autoplay: false, // 是否自动播放
        //         pip: true,
        //         autoSize: true,
        //         autoMini: true,
        //         screenshot: true,
        //         setting: true,
        //         loop: true, // 是否循环播放
        //         flip: true,
        //         playbackRate: true,
        //         aspectRatio: true,
        //         fullscreen: true,
        //         fullscreenWeb: true,
        //         subtitleOffset: true,
        //         miniProgressBar: true,
        //         mutex: false, // 假如页面里同时存在多个播放器，是否只能让一个播放器播放
        //         backdrop: true,
        //         playsInline: true,
        //         autoPlayback: true,
        //         airplay: true,
        //         theme: '#23ade5',
        //         lang: navigator.language.toLowerCase(),
        //         moreVideoAttr: {
        //             crossOrigin: 'anonymous',
        //         },
        //         contextmenu: [],
        //     });

        // },
        // loadXgplayer() {
        //     const player = new XGplayer({
        //         id: 'videoPlayer',
        //         autoplay: true, // 是否自动播放
        //         volume: 0.6, // 默认音量, 取值范围0 ~ 1
        //         loop: true, // 是否循环播放
        //         url: this.videoUrl,
        //         poster: this.poster,
        //         lang: 'zh-cn', // 播放器初始显示语言
        //         startTime: localStorage.getItem(this.videoUrl), // 初始起播时间，仅点播
        //         fitVideoSize: 'auto', // 初始起播时间，仅点播
        //         seekedStatus: 'auto', // seek操作结束之后播放器的状态，如果取值为auto，则维持原播放状态, 默认是seek之后直接播放
        //         pip: true, // 是否使用画中画插件
        //         rotate: true,// 是否使用旋转插件
        //         screenShot: true, //显示截图按钮
        //         videoAttributes: {
        //             crossOrigin: 'anonymous'
        //         },
        //         playbackRate: [0.5, 0.75, 1, 1.5, 2, 3, 4],
        //         defaultPlaybackRate: 1.0,
        //         width: 'auto',
        //         hight: 'auto',
        //         mini: true, //开启小窗插件
        //     });
        //     player.on(Events.TIME_UPDATE, (data) => {
        //         localStorage.setItem(this.videoUrl, data.currentTime);
        //     });
        //     player.on(Events.MINI_STATE_CHANGE, (isMini) => {
        //         if (isMini) {
        //             console.log('enter miniScreen')
        //         } else {
        //             console.log('exit miniScreen')
        //         }
        //     })
        // },
        loadPlyr() {
            const player = new Plyr('#videoPlayer', {
                captions: {
                    active: true,
                },
                controls: [
                    'play-large', // The large play button in the center
                    // 'restart', // Restart playback
                    'rewind', // Rewind by the seek time (default 10 seconds)
                    'play', // Play/pause playback
                    'fast-forward', // Fast forward by the seek time (default 10 seconds)
                    'progress', // The progress bar and scrubber for playback and buffering
                    'current-time', // The current time of playback
                    'duration', // The full duration of the media
                    // 'mute', // Toggle mute
                    // 'volume', // Volume control
                    'captions', // Toggle captions
                    'settings', // Settings menu
                    'pip', // Picture-in-picture (currently Safari only)
                    'airplay', // Airplay (currently Safari only)
                    // 'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
                    'fullscreen', // Toggle fullscreen
                ],
                settings: ['captions', 'quality', 'speed', 'loop'],
                volume: 1,
            });

            player.source = {
                type: 'video',
                title: this.title,
                sources: [
                    {
                        src: this.videoUrl,
                        type: 'video/mp4',
                        size: 1080,
                    },
                ],
                poster: this.poster,
            };

            // Expose player so it can be used from the console
            window.player = player;
        },
    },
}
</script>