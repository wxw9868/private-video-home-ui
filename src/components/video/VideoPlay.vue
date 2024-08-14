<template>
    <v-card variant="flat" height="100%">
        <v-layout :full-height=true>
            <v-main>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-skeleton-loader type="card" :loading="loading" class="mx-auto">
                                <v-card variant="flat" class="mx-auto">
                                    <v-responsive :aspect-ratio="16 / 9">
                                        <div id="videoPlayer" :style="style"></div>
                                    </v-responsive>
                                    <div class="text-uppercase text-h5 pt-4">{{ videoTitle }}</div>
                                    <v-chip-group >
                                        <v-chip class="pl-0 pr-0" variant="text" v-for="item in videoActress" :key="item" :to="path + item.id">{{ item.actress }}</v-chip>
                                    </v-chip-group>
                                    <div class="pt-0">
                                        <v-btn variant="text" class="me-2" color="medium-emphasis" :icon="icon.collect" size="medium" @click="statisticsCollect()"></v-btn>
                                        <span class="subheading me-5" v-text="videoCollect"></span>
                                        <v-btn variant="text" class="me-2" color="medium-emphasis" icon="mdi-eye" size="medium"></v-btn>
                                        <span class="subheading me-5" v-text="videoBrowse"></span>
                                        <v-btn variant="text" class="me-2" color="medium-emphasis" icon="mdi-clock" size="medium"></v-btn>
                                        <span class="subheading" v-text="videoDuration"></span>
                                    </div>
                                </v-card>
                            </v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-container>

                <v-container>
                    <v-row>
                        <div class="pt-5 pl-3">
                            <v-avatar size="40px" :image="userAvatar"></v-avatar>
                        </div>
                        <v-col>
                            <v-form v-model="form" @submit.prevent="onComment">
                                <v-textarea 
                                    v-model="content" 
                                    :rules="contentRules" 
                                    row-height="25" 
                                    rows="3"
                                    clear-icon="mdi-close-circle" 
                                    variant="outlined" 
                                    auto-grow 
                                    shaped
                                    clearable
                                ></v-textarea>
                                <v-btn :disabled="!form" :loading="loading" type="submit">发布评论</v-btn>
                            </v-form>
                        </v-col>

                        <v-divider></v-divider>
                    </v-row>
                    <v-lazy :min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
                        <v-row v-for="(comment, i) in comments" :key="i">
                            <div class="pt-3 pl-3">
                                <v-avatar size="40px" :image="host + comment.Avatar"></v-avatar>
                            </div>
                            <v-col>
                                <v-row style="font-size: 13px;">
                                    <v-col class="me-auto" cols="auto">
                                        <span class="me-2">{{ comment.Nickname }}</span>
                                        <small class="me-2">北京</small>
                                    </v-col>
                                    <v-col cols="auto" style="font-size: 15px;">
                                        <small class="justify-end align-end">{{ doTime(comment.CreatedAt) }}</small>
                                    </v-col>
                                </v-row>
                                <p class="my-2" style="font-size: 15px;">{{ comment.Content }}</p>
                                <div class="d-flex justify-start" style="font-size: 13px;">
                                    <v-btn variant="text" :color="replyIsZans[comment.ID] ? 'blue' : ''"
                                        @click="commentZan(comment.ID)">
                                        <v-icon class="me-1" left small>mdi-thumb-up</v-icon>
                                        <span>{{ replyZans[comment.ID] }}</span>
                                    </v-btn>
                                    <v-btn variant="text" :color="replyIsCais[comment.ID] ? 'red' : ''"
                                        @click="commentCai(comment.ID)">
                                        <v-icon class="me-1" left small>mdi-thumb-down</v-icon>
                                        <span>{{ replyCais[comment.ID] }}</span>
                                    </v-btn>
                                    <v-btn variant="text" color="green" @click="replyShow(comment.ID)">
                                        <v-icon left small>mdi-comment-outline</v-icon>
                                    </v-btn>
                                    <v-btn variant="text" color="orange">
                                        <v-icon left small>mdi-flag-outline</v-icon>
                                    </v-btn>
                                </div>
                                <v-row v-show="replyTextareaShow === comment.ID">
                                    <div class="pt-3 pl-3">
                                        <v-avatar size="40px" :image="avatar"></v-avatar>
                                    </div>
                                    <v-col>
                                        <v-form v-model="replyForms[comment.ID]" @submit.prevent="onReply(comment.ID,i)">
                                            <v-textarea 
                                                v-model="replyTexts[comment.ID]" 
                                                :rules="replyRules[comment.ID]"
                                                row-height="25" 
                                                rows="3" 
                                                clear-icon="mdi-close-circle" 
                                                variant="outlined"
                                                auto-grow 
                                                shaped 
                                                clearable
                                            ></v-textarea>
                                            <v-btn :disabled="!replyForms[comment.ID]" :loading="replyloadings[comment.ID]"
                                                type="submit">发送回复</v-btn>
                                        </v-form>
                                    </v-col>
                                </v-row>

                                <v-expand-transition>
                                    <div v-show="replyListShow == comment.ID">
                                        <v-row v-for="(replies, i) in comment.Childrens" :key="i">
                                            <div class="pt-3 pl-3">
                                                <v-avatar size="24px" :image="host + replies.Avatar"></v-avatar>
                                            </div>
                                            <v-col>
                                                <v-row style="font-size: 13px;">
                                                    <v-col class="me-auto" cols="auto">
                                                        <span class="me-2">{{ replies.Nickname }}</span>
                                                        <small class="me-2">北京</small>
                                                    </v-col>
                                                    <v-col cols="auto" style="font-size: 15px;">
                                                        <small class="justify-end align-end">{{ doTime(replies.CreatedAt)
                                                            }}</small>
                                                    </v-col>
                                                </v-row>
                                                <p class="my-2" style="font-size: 15px;">{{ replies.Content }}</p>
                                                <div class="d-flex justify-start" style="font-size: 13px;">
                                                    <v-btn variant="text" :color="replyIsZans[replies.ID] ? 'blue' : ''"
                                                        @click="commentZan(replies.ID)">
                                                        <v-icon class="me-1" left small>mdi-thumb-up</v-icon>
                                                        <span>{{ replyZans[replies.ID] }}</span>
                                                    </v-btn>
                                                    <v-btn variant="text" :color="replyIsCais[replies.ID] ? 'red' : ''"
                                                        @click="commentCai(replies.ID)">
                                                        <v-icon class="me-1" left small>mdi-thumb-down</v-icon>
                                                        <span>{{ replyCais[replies.ID] }}</span>
                                                    </v-btn>
                                                    <v-btn variant="text" color="green" @click="replyShow(replies.ID)">
                                                        <v-icon left small>mdi-comment-outline</v-icon>
                                                    </v-btn>
                                                    <v-btn variant="text" color="orange">
                                                        <v-icon left small>mdi-flag-outline</v-icon>
                                                    </v-btn>
                                                </div>
                                                <v-row v-show="replyTextareaShow === replies.ID">
                                                    <div class="pt-3 pl-3">
                                                        <v-avatar size="40px" :image="avatar"></v-avatar>
                                                    </div>
                                                    <v-col v-show="replyTextareaShow === replies.ID">
                                                        <v-form v-model="replyForms[replies.ID]"
                                                            @submit.prevent="onReply(replies.ID)">
                                                            <v-textarea v-model="replyTexts[replies.ID]"
                                                                :rules="replyRules[replies.ID]" row-height="25" rows="3"
                                                                clear-icon="mdi-close-circle" variant="outlined" auto-grow
                                                                shaped clearable></v-textarea>
                                                            <v-btn :disabled="!replyForms[replies.ID]"
                                                                :loading="replyloadings[replies.ID]"
                                                                type="submit">发送回复</v-btn>
                                                        </v-form>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-expand-transition>
                                <div v-if="comment.Childrens">
                                    <div 
                                        variant="text" 
                                        @click="repliesShow(comment.ID)"
                                    >
                                        展开 {{ comment.Childrens ? comment.Childrens.length : 0 }} 条回复
                                        <v-icon :icon="(this.replyListShow === comment.ID) ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-lazy>
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>
<script>
import { inject, reactive } from 'vue';
import Artplayer from "artplayer";
import artplayerPluginDanmuku from 'artplayer-plugin-danmuku';

export default {
    setup() {
        const host = inject('serverHost');
        return { host }
    },
    data: () => ({
        userId: localStorage.getItem("userID"),
        userAvatar: '',
        videoId: 0,
        videoTitle: '',
        videoActress: [],
        videoUrl: '/src/assets/video/lc.mp4',
        videoPoster: '',
        videoDuration: 0,
        videoBrowse: 0,
        videoCollect: 0,
        icon: {
            collect: 'mdi-heart-outline',
        },
        isCollect: '',
        path: '/video/list?id=',
        style: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%'
        },
        // players: [
        //     {
        //         player: 'plyr',
        //         src: '/assets/image/player/player.png',
        //     },
        //     {
        //         player: 'dplayer',
        //         src: '/assets/image/player/dplayer.png',
        //     },
        //     {
        //         player: 'artplayer',
        //         src: '/assets/image/player/artplayer.png',
        //     },
        //     {
        //         player: 'xgplayer',
        //         src: '/assets/image/player/xgplayer.jpg',
        //     },
        // ],
        form: false,
        loading: false,
        content: '',
        contentRules: [
            value => {
                if (value) return true

                return 'Content is required.'
            },
            value => {
                if (value?.length > 3) return true

                return 'content must be at least 3 characters.'
            },
        ],
        comments: [],
        replyListShow: 0,
        replyTextareaShow: 0,
        replyForms: reactive({}),
        replyloadings: reactive({}),
        replyTexts: reactive({}),
        replyRules: reactive({}),
        replyIsZans: reactive({}),
        replyIsCais: reactive({}),
        replyZans: reactive({}),
        replyCais: reactive({}),
        onCommentHtml: null,
        danmuku: [],
    }),
    mounted() {
        let id = this.$route.query.id;
        this.videoId = id;
        this.getDanmuList(id);
        this.addBrowse(id);
        this.getData(id);
        this.getCommentList(id);
    },
    methods: {
        getData(id) {
            this.$http.get('/video/getPlay', { params: { id: id } })
                .then(response => {
                    // console.log(response);
                    const data = response.data
                    this.videoTitle = data.videoTitle;
                    this.videoActress = data.videoActress;
                    // if (id > 544) {
                    //     this.videoUrl = 'http://192.168.0.9:9090/' + data.videoUrl;
                    // } else {
                    //     this.videoUrl = this.host + data.videoUrl;
                    // }
                    this.videoPoster = this.host + data.videoPoster;
                    this.videoDuration = data.Duration;
                    this.videoCollect = data.Collect;
                    this.videoBrowse = data.Browse+1;
                    this.isCollect = data.IsCollect;
                    this.icon.collect = this.isCollect ? 'mdi-heart' : this.icon.collect;
                    this.userAvatar = this.host + data.Avatar;
                    this.videoTitle = '三国演义';
                    this.videoActress = [
                        {"id": "1", "actress": "曹操"},
                        {"id": "2", "actress": "刘备"},
                        {"id": "2", "actress": "孙权"},    
                    ];

                    this.loadArtplayer(id,this.$http);
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
        // 统计浏览量
        addBrowse(id) {
            this.browse = this.browse + 1
            this.$http.get('/video/browse', { params: { video_id: parseInt(id) } }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
                .then(response => {
                    console.log(response.data.message);
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
                    // console.log(response.data);
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
        // 获取评论数据
        getCommentList(id) {
            this.$http.get('/comment/list', { params: { video_id: parseInt(id) } }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
                .then(response => {
                    // console.log(response);
                    // console.log(response.data.data);
                    let list = response.data.data
                    if (list) {
                        this.comments = list;
                        // console.log(this.comments);
                        this.loadReply(this.comments)
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
        // 评论
        onComment() {
            if (!this.form) return
            setTimeout(() => (this.loading = false), 100)
            this.loading = true

            const formData = {};
            formData['content'] = this.content
            formData['video_id'] = parseInt(this.videoId)

            this.$http.post('/comment/comment', formData, { headers: { 'content-type': 'application/json' } })
                .then(response => {
                    // console.log(response);
                    let comment = response.data.data
                    // console.log(comment)
                    this.comments.unshift({
                        "ID": comment.commentID,
                        "CreatedAt": "",
                        "UpdatedAt": "",
                        "DeletedAt": null,
                        "ParentId": 0,
                        "VideoId": this.videoId,
                        "UserId": this.userId,
                        "Nickname": comment.userNickname,
                        "Avatar": comment.userAvatar,
                        "Status": "APPROVED",
                        "ZanNum": 0,
                        "ZanUserid": "",
                        "ReplyNum": 0,
                        "IsAnonymous": 1,
                        "Content": comment.content,
                        "Remark": "",
                        "Support": 0,
                        "Oppose": 0,
                        "IsShow": 1,
                        "LogUserID": 0,
                        "Zan": 0,
                        "Cai": 0,
                        "Childrens": null
                    })
                    this.loadReply([comment])
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

            this.content = '';
        },
        // 回复
        onReply(id,i) {
            if (!this.replyForms[id]) return
            setTimeout(() => (this.replyloadings[id] = false), 100)
            this.replyloadings[id] = true

            const formData = {};
            formData['content'] = this.replyTexts[id]
            formData['parent_id'] = parseInt(id)
            formData['video_id'] = parseInt(this.videoId)

            this.$http.post('/comment/reply', formData, { headers: { 'content-type': 'application/json' } })
                .then(response => {
                    // console.log(response);
                    let comment = response.data.data
                    // console.log(comment);
                    if (!this.comments[i].Childrens) this.comments[i].Childrens = []
                    this.comments[i].Childrens.unshift({
                        "ID": comment.commentID,
                        "CreatedAt": "",
                        "UpdatedAt": "",
                        "DeletedAt": null,
                        "ParentId": 0,
                        "VideoId": this.videoId,
                        "UserId": this.userId,
                        "Nickname": comment.userNickname,
                        "Avatar": comment.userAvatar,
                        "Status": "APPROVED",
                        "ZanNum": 0,
                        "ZanUserid": "",
                        "ReplyNum": 0,
                        "IsAnonymous": 1,
                        "Content": comment.content,
                        "Remark": "",
                        "Support": 0,
                        "Oppose": 0,
                        "IsShow": 1,
                        "LogUserID": 0,
                        "Zan": 0,
                        "Cai": 0,
                        "Childrens": null
                    })
                    this.loadReply([comment])
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

            this.replyTexts[id] = '';
        },
        // 赞
        commentZan(id) {
            this.replyIsZans[id] = !this.replyIsZans[id];
            if (this.replyIsCais[id]) this.replyIsCais[id] = false;

            let num = this.replyIsZans[id] ? 1 : -1;
            this.replyZans[id] = this.replyZans[id] + num

            const formData = {};
            formData['comment_id'] = parseInt(id)
            formData['zan'] = num

            this.$http.post('/comment/zan', formData, { headers: { 'content-type': 'application/json' } })
                .then(function (response) {
                    // console.log(response);
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
        // 踩
        commentCai(id) {
            this.replyIsCais[id] = !this.replyIsCais[id];
            if (this.replyIsZans[id]) this.replyIsZans[id] = false;

            let num = this.replyIsCais[id] ? 1 : -1;
            this.replyCais[id] = this.replyCais[id] + num

            const formData = {};
            formData['comment_id'] = parseInt(id)
            formData['cai'] = num

            this.$http.post('/comment/cai', formData, { headers: { 'content-type': 'application/json' } })
                .then(function (response) {
                    // console.log(response);
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
        loadReply(comments) {
            comments.forEach((comment, index) => {
                this.replyForms[comment.ID] = false
                this.replyloadings[comment.ID] = false
                this.replyTexts[comment.ID] = ''
                this.replyRules[comment.ID] = [
                    value => {
                        if (value) return true

                        return 'Content is required.'
                    },
                    value => {
                        if (value?.length > 3) return true

                        return 'content must be at least 3 characters.'
                    },
                ]
                const { isZan, isCai } = this.isZanAndCai(comment.LogUserID, this.userID, comment.Zan, comment.Cai)
                this.replyIsZans[comment.ID] = isZan
                this.replyIsCais[comment.ID] = isCai
                this.replyZans[comment.ID] = comment.Support
                this.replyCais[comment.ID] = comment.Oppose
                if (comment.Childrens > 0) {
                    this.loadReply(comment.Childrens)
                }
            });
        },
        replyShow(id) {
            this.replyTextareaShow = (this.replyTextareaShow != id) ? id : 0;
        },
        repliesShow(id) {
            this.replyListShow = (this.replyListShow != id) ? id : 0;
        },
        isZanAndCai(logUserID, userID, zan, cai) {
            let isZan = false
            let isCai = false
            if (logUserID == userID) {
                if (zan == 1) {
                    isZan = true
                }
                if (cai == 1) {
                    isCai = true
                }
            }
            return { isZan, isCai }
        },
        doTime(timeString) {
            if (timeString == '') return '刚刚'
            let old = new Date(timeString);
            let now = new Date();
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
        getDanmuList(id) {
            this.$http.get('/danmu/list', { params: { video_id: parseInt(id) } }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
                .then(response => {
                    // console.log(response);
                    // console.log(response.data.data);
                    let list = response.data.data
                    if (list) {
                        this.danmuku = list;
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
        loadArtplayer(id,http) {
            const art = new Artplayer({
                container: '#videoPlayer',
                url: this.videoUrl,
                poster: this.videoPoster,
                volume: 1,
                muted: false, // 是否默认静音
                autoplay: false, // 是否自动播放
                autoSize: true,
                autoMini: true,
                pip: true, // 是否在底部控制栏里显示 画中画 的开关按钮
                screenshot: true, // 是否在底部控制栏里显示 视频截图 功能
                fullscreen: true, // 是否在底部控制栏里显示播放器 窗口全屏 按钮
                fullscreenWeb: true, // 是否在底部控制栏里显示播放器 网页全屏 按钮
                setting: false,
                loop: true, // 是否循环播放
                flip: true,
                playbackRate: true,
                aspectRatio: true,
                subtitleOffset: true,
                miniProgressBar: true, // 迷你进度条，只在播放器失去焦点后且正在播放时出现
                mutex: false, // 假如页面里同时存在多个播放器，是否只能让一个播放器播放
                backdrop: true,
                autoPlayback: true, // 是否使用自动 回放功能
                airplay: true,
                theme: '#23ade5',
                lang: navigator.language.toLowerCase(),
                playsInline: true, // 在移动端是否使用 playsInline 模式
                lock: true, // 是否在移动端显示一个 锁定按钮 ，用于隐藏底部 控制栏
                fastForward: true, // 是否在移动端添加长按视频快进功能
                autoOrientation: true, // 是否在移动端的网页全屏时，根据视频尺寸和视口尺寸，旋转播放器
                plugins: [
                    artplayerPluginDanmuku({
                        danmuku: this.danmuku,
                        // 以下为非必填
                        speed: 5, // 弹幕持续时间，范围在[1 ~ 10]
                        margin: [10, '25%'], // 弹幕上下边距，支持像素数字和百分比
                        opacity: 1, // 弹幕透明度，范围在[0 ~ 1]
                        color: '#FFFFFF', // 默认弹幕颜色，可以被单独弹幕项覆盖
                        mode: 0, // 默认弹幕模式: 0: 滚动，1: 顶部，2: 底部
                        modes: [0, 1, 2], // 弹幕可见的模式
                        fontSize: 25, // 弹幕字体大小，支持像素数字和百分比
                        antiOverlap: true, // 弹幕是否防重叠
                        synchronousPlayback: false, // 是否同步播放速度
                        // mount: undefined, // 弹幕发射器挂载点, 默认为播放器控制栏中部
                        heatmap: true, // 是否开启热力图
                        width: 512, // 当播放器宽度小于此值时，弹幕发射器置于播放器底部
                        points: [], // 热力图数据
                        filter: (danmu) => danmu.text.length <= 200, // 弹幕载入前的过滤器
                        beforeVisible: () => true, // 弹幕显示前的过滤器，返回 true 则可以发送
                        visible: true, // 弹幕层是否可见
                        emitter: true, // 是否开启弹幕发射器
                        maxLength: 200, // 弹幕输入框最大长度, 范围在[1 ~ 1000]
                        lockTime: 5, // 输入框锁定时间，范围在[1 ~ 60]
                        theme: 'dark', // 弹幕主题，支持 dark 和 light，只在自定义挂载时生效
                        OPACITY: {}, // 不透明度配置项
                        FONT_SIZE: {}, // 弹幕字号配置项
                        MARGIN: {}, // 显示区域配置项
                        SPEED: {}, // 弹幕速度配置项
                        COLOR: [], // 颜色列表配置项

                        // 手动发送弹幕前的过滤器，返回 true 则可以发送，可以做存库处理
                        beforeEmit(danmu) {
                            // console.log(danmu);
                            let formData = {};
                            formData = danmu;
                            formData['video_id'] = parseInt(id);
                            console.log(formData);
                            http.post('/danmu/save', formData, { headers: { 'content-type': 'application/json' } })
                                .then(response => {
                                    // console.log(response)
                                    console.log(response.data)
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
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve(true);
                                }, 1000);
                            });
                        },
                    }),
                ],
            });
        },
    },
}
</script>