<template>
    <v-card>
        <v-layout>
            <v-main>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-card variant="flat" class="mx-auto">
                                <v-responsive :aspect-ratio="16 / 9" id="videoContainer">
                                    <div id="videoPlayer" :style="style"></div>
                                    <!-- <video id="videoPlayer" :style="style"></video> -->
                                </v-responsive>
                                <div id="videoPlayer"></div>
                                <v-card-text class="text-h6">
                                    {{ videoTitle }}
                                </v-card-text>

                                <v-card-subtitle>
                                    <span class="me-2" v-for="item in videoActress" :key="item" :to="path + item.id">
                                        {{item.actress}}
                                    </span>
                                </v-card-subtitle>

                                <v-card-actions>
                                    <v-btn color="medium-emphasis" :icon="icon.collect" size="medium"
                                        @click="statisticsCollect()"></v-btn>
                                    <span class="subheading me-2" v-text="collect"></span>
                                    <v-btn color="medium-emphasis" icon="mdi-eye" size="medium"></v-btn>
                                    <span class="subheading" v-text="browse"></span>
                                    <v-btn color="medium-emphasis" icon="mdi-clock" size="medium"></v-btn>
                                    <span class="subheading" v-text="duration"></span>
                                </v-card-actions>

                                <!-- <v-item-group class="pb-6">
                                    <v-item v-for="player in players" :key="player">
                                        <v-btn class="rounded-circle" height="40" width="40" variant="text">
                                            <v-img :src="host + player.src" class="rounded-circle" height="40" width="40"
                                                cover></v-img>
                                        </v-btn>
                                    </v-item>
                                </v-item-group> -->
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

                <v-container>
                    <v-row>
                        <div class="pt-3">
                            <v-avatar size="40px" :image="avatar"></v-avatar>
                        </div>
                        <v-col>
                            <v-form v-model="form" @submit.prevent="onComment">
                                <v-textarea v-model="content" :rules="contentRules" @input="insertContent" row-height="25" rows="3"
                                    clear-icon="mdi-close-circle" variant="outlined" auto-grow shaped
                                    clearable></v-textarea>
                                <v-btn :disabled="!form" :loading="loading" type="submit">发布评论</v-btn>
                            </v-form>
                        </v-col>

                        <v-divider class="pt-10"></v-divider>
                    </v-row>
                    
                    <v-row class="pt-5" v-for="(comment, i) in comments" :key="i">
                        <div class="pt-3">
                            <v-avatar size="40px" :image="host + comment.Avatar"></v-avatar>
                        </div>
                        <v-col>
                            <v-row style="font-size: 13px;">
                                <v-col class="me-auto" cols="auto">
                                    <v-span class="me-2">{{ comment.Nickname }}</v-span>
                                    <v-small class="me-2">北京</v-small>
                                </v-col>
                                <v-col cols="auto" style="font-size: 15px;">
                                    <v-small class="justify-end align-end">{{ doTime(comment.CreatedAt) }}</v-small>
                                </v-col>
                            </v-row>
                            <p class="my-2" style="font-size: 15px;">{{ comment.Content }}</p>
                            <div class="d-flex justify-start" style="font-size: 13px;">
                                <v-btn variant="text" text :color="liked ? 'blue' : ''" @click="likeComment">
                                    <v-icon class="me-1" left small>mdi-thumb-up</v-icon>
                                    <span>{{ comment.Support }}</span>
                                </v-btn>
                                <v-btn variant="text" text :color="disliked ? 'red' : ''" @click="dislikeComment">
                                    <v-icon class="me-1" left small>mdi-thumb-down</v-icon>
                                    <span>{{ comment.Oppose }}</span>
                                </v-btn>
                                <v-btn variant="text" text color="green" @click="replyShow(comment.ID)">
                                    <v-icon left small>mdi-comment-outline</v-icon>
                                </v-btn>
                                <v-btn variant="text" text color="orange" @click="openReportDialog">
                                    <v-icon left small>mdi-flag-outline</v-icon>
                                </v-btn>
                            </div>
                            <v-col v-show="reply===comment.ID">
                                <v-form v-model="form" @submit.prevent="onReply">
                                    <v-input v-model="commentId" type="hidden" @input="insertContent" :value="comment.ID"></v-input>
                                    <v-textarea v-model="content" :rules="contentRules" row-height="25" rows="3" clear-icon="mdi-close-circle"
                                        variant="outlined" auto-grow shaped clearable></v-textarea>
                                    <v-btn :disabled="!form" :loading="loading" type="submit">发送回复</v-btn>
                                </v-form>
                            </v-col>

                            <v-div v-show="show==comment.ID">
                                <v-row v-for="(replies, i) in comment.Childrens" :key="i">
                                    <div class="pt-3">
                                        <v-avatar size="24px" :image="host + replies.Avatar"></v-avatar>
                                    </div>
                                    <v-col>
                                        <v-row style="font-size: 13px;">
                                            <v-col class="me-auto" cols="auto">
                                                <v-span class="me-2">{{ replies.Nickname }}</v-span>
                                                <v-small class="me-2">北京</v-small>
                                            </v-col>
                                            <v-col cols="auto" style="font-size: 15px;">
                                                <v-small class="justify-end align-end">{{ doTime(replies.CreatedAt)
                                                    }}</v-small>
                                            </v-col>
                                        </v-row>
                                        <p class="my-2" style="font-size: 15px;">{{ replies.Content }}</p>
                                        <div class="d-flex justify-start" style="font-size: 13px;">
                                            <v-btn variant="text" text :color="liked ? 'blue' : ''"
                                                @click="likeComment">
                                                <v-icon class="me-1" left small>mdi-thumb-up</v-icon>
                                                <span>{{ replies.Support }}</span>
                                            </v-btn>
                                            <v-btn variant="text" text :color="disliked ? 'red' : ''"
                                                @click="dislikeComment">
                                                <v-icon class="me-1" left small>mdi-thumb-down</v-icon>
                                                <span>{{ replies.Oppose }}</span>
                                            </v-btn>
                                            <v-btn variant="text" text color="green" @click="replyShow(replies.ID)">
                                                <v-icon left small>mdi-comment-outline</v-icon>
                                            </v-btn>
                                            <v-btn variant="text" text color="orange" @click="openReportDialog">
                                                <v-icon left small>mdi-flag-outline</v-icon>
                                            </v-btn>
                                        </div>
                                        <v-col v-show="reply===replies.ID">
                                            <v-form v-model="form" @submit.prevent="onReply">
                                                <v-textarea v-model="content" :rules="contentRules" row-height="25" rows="3" @input="insertContent" clear-icon="mdi-close-circle"
                                                    variant="outlined" auto-grow shaped clearable></v-textarea>
                                                <v-btn :disabled="!form" :loading="loading" type="submit">发送回复</v-btn>
                                            </v-form>
                                        </v-col>
                                    </v-col>
                                </v-row>
                            </v-div>

                            <v-btn variant="text" @click="repliesShow(comment.ID)">展开 {{ comment.Childrens?comment.Childrens.length:0
                                }} 条回复 <v-icon :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon></v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>
<script>
import { inject, ref } from 'vue';
// import Plyr from 'plyr';
// import 'plyr/dist/plyr.css';
// import DPlayer from 'dplayer';
import Artplayer from "artplayer";
// import XGplayer, { Events } from 'xgplayer';
// import 'xgplayer/dist/index.min.css';

export default {
    setup() {
        const host = inject('serverHost');

        const content = ref('');

        function insertContent(event) {
            content.value = event.target.value
        }
        return { host,content,insertContent }
    },
    data: () => ({
        userId: localStorage.getItem("userID"),
        videoId: 0,
        videoUrl: 'src/assets/video/lc.mp4',
        videoTitle: '中华人民共和国',
        videoActress: [
            {
                "id": "1",
                "actress": "国务院"
            },
            {
                "id": "2",
                "actress": "检察院"
            }
        ],
        path: '/actress?id=',
        duration: 0,
        avatar: '',
        poster: '',
        browse: 0,
        collect: 0,
        icon: {
            collect: 'mdi-heart-outline',
        },
        isCollect: '',
        style: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%'
        },
        players: [
            {
                player: 'plyr',
                src: '/assets/image/player/player.png',
            },
            {
                player: 'dplayer',
                src: '/assets/image/player/dplayer.png',
            },
            {
                player: 'artplayer',
                src: '/assets/image/player/artplayer.png',
            },
            {
                player: 'xgplayer',
                src: '/assets/image/player/xgplayer.jpg',
            },
        ],
        form: false,
        loading: false,
        // commentId: 0,
        // content: '',
        contentRules: [
            value => {
                if (value?.length > 3) return true
                return 'content must be at least 3 characters.'
            },
        ],
        comments: [],
        show: 0,
        reply: 0,
        liked: false,
        disliked: false,
    }),
    mounted() {
        let id = this.$route.query.id;
        this.videoId = id;
        this.getData(id);
        this.loadBrowse(id);
        this.loadCommentList(id);
    },
    methods: {
        getData(id) {
            this.$http.get('/video/getPlay', { params: { id: id } })
                .then(response => {
                    console.log(response.data);
                    let data = response.data
                    this.videoTitle = data.videoTitle;
                    this.videoActress = data.videoActress;
                    this.duration = data.Duration;
                    this.videoUrl = this.host + data.videoUrl;
                    this.poster = this.host + data.Poster;
                    this.avatar = this.host + data.Avatar;
                    this.isCollect = data.IsCollect;
                    this.collect = data.Collect;
                    this.browse = data.Browse;
                    this.icon.collect = this.isCollect ? 'mdi-heart' : this.icon.collect

                    // this.loadPlyr();
                    // this.loadDPlayer();
                    this.loadArtplayer();
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
            this.$http.get('/video/browse', { params: { video_id: parseInt(id) } }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
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
        // 统计收藏量
        statisticsCollect() {
            console.log(this.videoId)
            let num = 0
            if (this.icon.collect == 'mdi-heart-outline') {
                this.icon.collect = 'mdi-heart'
                this.collect = this.collect + 1
                num = 1
            } else {
                this.icon.collect = 'mdi-heart-outline'
                this.collect = this.collect - 1
                num = -1
            }

            const formData = {};
            formData['video_id'] = parseInt(this.videoId)
            formData['collect'] = num

            this.$http.post('/video/collect', formData, { headers: { 'content-type': 'application/json' } })
                .then(function (response) {
                    // console.log(response);
                    if (response) {
                        console.log(response.data);
                    }
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

        doTime(timeString) {
            let old = new Date(timeString);
            let now = new Date();
            // console.log(old.toLocaleString())
            // console.log(now.toLocaleString())
            // console.log(y,m,d,h,i,s)

            let y = now.getFullYear() - old.getFullYear()
            if (y == 0) {
                let m = now.getMonth() - old.getMonth()
                if (m == 0) {
                    let d = now.getDate() - old.getDate()
                    if (d == 0) {
                        let h = now.getHours() - old.getHours()
                        if (h == 0) {
                            let i = now.getMinutes() - old.getMinutes()
                            if (i == 0) {
                                return i + '秒钟前'
                            }
                            return i + '分钟前'
                        }
                        return h + '小时前'
                    }
                    return d + '天前'
                }
                return m + '月前'
            }
            return y + '年前'
        },

        isZanAndCai(logUserID, userID, zan, cai) {
            let isZan = 'bi-hand-thumbs-up'
            let isCai = 'bi-hand-thumbs-down'
            if (logUserID == userID) {
                if (zan == 1) {
                    isZan = 'bi-hand-thumbs-up-fill'
                }
                if (cai == 1) {
                    isCai = 'bi-hand-thumbs-down-fill'
                }
            }
            return { isZan, isCai }
        },

        likeComment() {
            this.liked = !this.liked;
            if (this.disliked) this.disliked = false;
        },
        dislikeComment() {
            this.disliked = !this.disliked;
            if (this.liked) this.liked = false;
        },

        replyShow(id) {
            if (this.reply != id) {
                this.reply = id
            } else {
                this.reply = 0
            }
        },

        repliesShow(id) {
            if (this.show != id) {
                this.show = id
            } else {
                this.show = 0
            }
        },

        // 获取评论数据
        loadCommentList(id) {
            this.$http.get('/comment/list', { params: { video_id: parseInt(id) } }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
                .then(response => {
                    // console.log(response);
                    console.log(response.data.data);
                    this.comments = response.data.data;
                    // console.log(this.comments);
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
        // 评论
        onComment() {
            console.log(this.form);
            if (!this.form) return
            setTimeout(() => (this.loading = false), 100)
            this.loading = true
           
            const formData = {};
            formData['content'] = this.content
            formData['video_id'] = parseInt(this.videoId)
            
            this.$http.post('/comment/comment', formData, { headers: { 'content-type': 'application/json' } })
                .then(function (response) {
                    // console.log(response);
                    let data = response.data.data
                    console.log(data);
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
        // 回复
        onReply() {
            console.log(this.form);
            if (!this.form) return
            setTimeout(() => (this.loading = false), 100)
            this.loading = true
           
            const formData = {};
            formData['content'] = this.content
            formData['parent_id'] = parseInt(this.commentId.value)
            formData['video_id'] = parseInt(this.videoId)
            console.log(formData)
            return

            this.$http.post('/comment/reply', formData, { headers: { 'content-type': 'application/json' } })
                .then(function (response) {
                    // console.log(response);
                    let data = response.data.data
                    console.log(data);
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
            form.querySelector('textarea').value = '';
            button.disabled = true;
        },
        // 赞
        commentZan(button) {
            let children = button.children
            let zan = children[0].classList
            let num = 0
            if (zan[1] == 'bi-hand-thumbs-up') {
                zan.remove('bi-hand-thumbs-up')
                zan.add('bi-hand-thumbs-up-fill')
                children[1].textContent = parseInt(children[1].textContent) + 1
                num = 1
            } else {
                zan.remove('bi-hand-thumbs-up-fill')
                zan.add('bi-hand-thumbs-up')
                children[1].textContent = parseInt(children[1].textContent) - 1
                num = -1
            }
            // console.log(children[0].classList[1])
            // console.log(children[1].textContent)

            const formData = {};
            formData['comment_id'] = parseInt(button.getAttribute('data-comment-id'))
            formData['zan'] = num

            // console.log(formData)
            // return

            this.$http.post('/comment/zan', formData, { headers: { 'content-type': 'application/json' } })
                .then(function (response) {
                    // console.log(response);
                    if (response) {
                        console.log(response.data);
                    }
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
        // 踩
        commentCai(button) {
            let children = button.children
            let zan = children[0].classList
            let num = 0
            if (zan[1] == 'bi-hand-thumbs-down') {
                zan.remove('bi-hand-thumbs-down')
                zan.add('bi-hand-thumbs-down-fill')
                children[1].textContent = parseInt(children[1].textContent) + 1
                num = 1
            } else {
                zan.remove('bi-hand-thumbs-down-fill')
                zan.add('bi-hand-thumbs-down')
                children[1].textContent = parseInt(children[1].textContent) - 1
                num = -1
            }
            // console.log(children[0].classList[1])
            // console.log(children[1].textContent)

            const formData = {};
            formData['comment_id'] = parseInt(button.getAttribute('data-comment-id'))
            formData['cai'] = num

            this.$http.post('/comment/cai', formData, { headers: { 'content-type': 'application/json' } })
                .then(function (response) {
                    // console.log(response);
                    if (response) {
                        console.log(response.data);
                    }
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
        loadArtplayer() {
            const art = new Artplayer({
                container: '#videoPlayer',
                url: this.videoUrl,
                poster: this.poster,
                volume: 1,
                muted: false, // 是否默认静音
                autoplay: false, // 是否自动播放
                pip: true,
                autoSize: true,
                autoMini: true,
                screenshot: true,
                setting: true,
                loop: true, // 是否循环播放
                flip: true,
                playbackRate: true,
                aspectRatio: true,
                fullscreen: true,
                fullscreenWeb: true,
                subtitleOffset: true,
                miniProgressBar: true,
                mutex: false, // 假如页面里同时存在多个播放器，是否只能让一个播放器播放
                backdrop: true,
                playsInline: true,
                autoPlayback: true,
                airplay: true,
                theme: '#23ade5',
                lang: navigator.language.toLowerCase(),
                moreVideoAttr: {
                    crossOrigin: 'anonymous',
                },
                contextmenu: [],
            });
            console.log(art)
        },
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
        // loadPlyr() {
        //     const player = new Plyr('#videoPlayer', {
        //         captions: {
        //             active: true,
        //         },
        //         controls: [
        //             'play-large', // The large play button in the center
        //             // 'restart', // Restart playback
        //             'rewind', // Rewind by the seek time (default 10 seconds)
        //             'play', // Play/pause playback
        //             'fast-forward', // Fast forward by the seek time (default 10 seconds)
        //             'progress', // The progress bar and scrubber for playback and buffering
        //             'current-time', // The current time of playback
        //             'duration', // The full duration of the media
        //             // 'mute', // Toggle mute
        //             // 'volume', // Volume control
        //             'captions', // Toggle captions
        //             'settings', // Settings menu
        //             'pip', // Picture-in-picture (currently Safari only)
        //             'airplay', // Airplay (currently Safari only)
        //             // 'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
        //             'fullscreen', // Toggle fullscreen
        //         ],
        //         settings: ['captions', 'quality', 'speed', 'loop'],
        //         volume: 1,
        //     });

        //     player.source = {
        //         type: 'video',
        //         title: this.title,
        //         sources: [
        //             {
        //                 src: this.videoUrl,
        //                 type: 'video/mp4',
        //                 size: 1080,
        //             },
        //         ],
        //         poster: this.poster,
        //     };

        //     // Expose player so it can be used from the console
        //     window.player = player;
        // },
    },
}
</script>