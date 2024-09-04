<template>
    <v-card variant="flat" height="100%">
        <v-layout :full-height=true>
            <v-main>
                <v-container>
                    <v-row no-gutters>
                        <v-col class="pa-1" cols="12" sm="8">
                            <v-skeleton-loader type="card" :loading="loading" class="mx-auto">
                                <v-card variant="flat" class="mx-auto">
                                    <v-responsive :aspect-ratio="16 / 9">
                                        <div class="videoPlayer" :style="style"></div>
                                    </v-responsive>
                                    <div class="artplayer-danmu pt-1"></div>
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
                        <v-col class="pa-1" cols="12" sm="4">
                            <v-card variant="tonal" align="center" justify="center">
                                <div class="pl-1 pt-4 pb-4">
                                    <span class="text-h5 me-3">{{ videoTitle }}</span>
                                    <span class="text-grey text-body-1">84集全</span>
                                </div>
                                <div class="pb-4">
                                    <v-virtual-scroll :items="items" height="338.5">
                                        <v-btn
                                            v-for="item in episodes" :key="item"
                                            class="ma-1"
                                            variant="tonal"
                                            border
                                        >
                                            {{ item }}
                                        </v-btn>
                                    </v-virtual-scroll>
                                </div>
                            </v-card>
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

                        <v-divider class="pb-3"></v-divider>
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
                                        <v-avatar size="40px" :image="userAvatar"></v-avatar>
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
                                                        <small class="justify-end align-end">{{ doTime(replies.CreatedAt) }}</small>
                                                    </v-col>
                                                </v-row>
                                                <p class="my-2" style="font-size: 15px;">{{ replies.Content }}</p>
                                                <div class="d-flex justify-start" style="font-size: 13px;">
                                                    <v-btn
                                                        variant="text"
                                                        :color="replyIsZans[replies.ID] ? 'blue' : ''"
                                                        @click="commentZan(replies.ID)">
                                                        <v-icon class="me-1" left small>mdi-thumb-up</v-icon>
                                                        <span>{{ replyZans[replies.ID] }}</span>
                                                    </v-btn>
                                                    <v-btn
                                                        variant="text"
                                                        :color="replyIsCais[replies.ID] ? 'red' : ''"
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
                                                        <v-avatar size="40px" :image="userAvatar"></v-avatar>
                                                    </div>
                                                    <v-col v-show="replyTextareaShow === replies.ID">
                                                        <v-form
                                                            v-model="replyForms[replies.ID]"
                                                            @submit.prevent="onReply(replies.ID)">
                                                            <v-textarea
                                                                v-model="replyTexts[replies.ID]"
                                                                :rules="replyRules[replies.ID]"
                                                                row-height="25" rows="3"
                                                                clear-icon="mdi-close-circle" variant="outlined"
                                                                auto-grow
                                                                shaped
                                                                clearable
                                                            ></v-textarea>
                                                            <v-btn
                                                                :disabled="!replyForms[replies.ID]"
                                                                :loading="replyloadings[replies.ID]"
                                                                type="submit"
                                                            >发送回复</v-btn>
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
import { err, get, post } from '@/utils/request';
import Artplayer from "artplayer";
import artplayerPluginDanmuku from 'artplayer-plugin-danmuku';
import { inject, reactive } from 'vue';
import { useTheme } from 'vuetify';

export default {
    setup() {
        const theme = useTheme();
        const host = inject('serverHost');
        return { host, theme }
    },
    data: () => ({
        items: Array.from({ length: 1 }, (k, v) => v + 1),
        episodes: 84,
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
        icon: { collect: 'mdi-heart-outline' },
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
            get('/video/play', { id: id })
                .then(response => {
                    // console.log(response.data);
                    const data = response.data
                    this.videoId = data.videoID;
                    this.videoTitle = data.videoTitle;
                    this.videoActress = data.videoActress;
                    if (id > 544) {
                        this.videoUrl = 'http://192.168.0.9:9090/' + data.videoUrl;
                    } else {
                        this.videoUrl = this.host + data.videoUrl;
                    }
                    this.videoPoster = this.host + data.Poster;
                    this.videoDuration = data.Duration;
                    this.videoCollect = data.Collect;
                    this.videoBrowse = data.Browse+1;
                    this.isCollect = data.IsCollect;
                    this.icon.collect = this.isCollect ? 'mdi-heart' : this.icon.collect;
                    this.userAvatar = this.host + data.Avatar;

                    // this.videoTitle = '三国演义';
                    // this.videoActress = [
                    //     {"id": "1", "actress": "曹操"},
                    //     {"id": "2", "actress": "刘备"},
                    //     {"id": "2", "actress": "孙权"},
                    // ];
                    // this.videoUrl = '/src/assets/video/lc.mp4';
                    // this.videoPoster = '';

                    this.loadArtplayer(id,this.$http);
                })
                .catch(function (error) {
                    err(error)
                });
        },
        // 统计浏览量
        addBrowse(id) {
            this.browse = this.browse + 1
            get('/video/browse', { video_id: parseInt(id) })
                .then(response => {
                    console.log(response.data);
                })
                .catch(function (error) {
                    err(error)
                });
        },
        // 统计收藏量
        statisticsCollect() {
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
            post('/video/collect', formData)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    err(error)
                });
        },
        // 获取评论数据
        getCommentList(id) {
            get('/comment/list', { video_id: parseInt(id) })
                .then(response => {
                    // console.log(response.data.data);
                    this.comments = response.data.data
                    this.loadReply(this.comments)
                })
                .catch(function (error) {
                    err(error)
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
            post('/comment/comment', formData)
                .then(response => {
                    // console.log(response.data);
                    let comment = response.data.data
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
                    err(error)
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
            post('/comment/reply', formData)
                .then(response => {
                    // console.log(response.data);
                    let comment = response.data.data
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
                    err(error)
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
            post('/comment/zan', formData)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    err(error)
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
            post('/comment/cai', formData)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    err(error)
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
                if (comment.Childrens) {
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
            get('/danmu/list',  { video_id: parseInt(id) })
                .then(response => {
                    // console.log(response.data.data);
                    this.danmuku  = response.data.data
                })
                .catch(function (error) {
                    err(error)
                });
        },
        loadArtplayer(id,http) {
            var $danmu = document.querySelector('.artplayer-danmu');
            const art = new Artplayer({
                id: String(this.videoId),
                container: '.videoPlayer',
                url: this.videoUrl,
                poster: this.videoPoster,
                volume: 1, // 默认音量
                muted: false, // 是否默认静音
                autoplay: false, // 是否自动播放
                autoSize: true, // 默认会填充整个 container 容器尺寸
                autoMini: true, // 当播放器滚动到浏览器视口以外时，自动进入 迷你播放 模式
                loop: true, // 是否循环播放
                // pip: true, // 是否在底部控制栏里显示 画中画 的开关按钮
                // screenshot: true, // 是否在底部控制栏里显示 视频截图 功能
                // setting: true,
                // flip: true,
                // playbackRate: true,
                // aspectRatio: true,
                // subtitleOffset: true,
                fullscreen: true, // 是否在底部控制栏里显示播放器 窗口全屏 按钮
                fullscreenWeb: true, // 是否在底部控制栏里显示播放器 网页全屏 按钮
                miniProgressBar: true, // 迷你进度条，只在播放器失去焦点后且正在播放时出现
                mutex: false, // 假如页面里同时存在多个播放器，是否只能让一个播放器播放
                backdrop: true,
                autoPlayback: true, // 是否使用自动 回放功能
                airplay: true, // 是否显示 airplay 按钮，当前只有部分浏览器支持该功能
                theme: '#23ade5', // 主题颜色，目前用于 进度条 和 高亮元素 上
                lang: navigator.language.toLowerCase(), // 显示语言，目前支持：en, zh-cn
                playsInline: true, // 在移动端是否使用 playsInline 模式
                lock: true, // 是否在移动端显示一个 锁定按钮 ，用于隐藏底部 控制栏
                fastForward: true, // 是否在移动端添加长按视频快进功能
                autoOrientation: true, // 是否在移动端的网页全屏时，根据视频尺寸和视口尺寸，旋转播放器
                controls: [
                    {
                        name: 'skip-next',
                        index: 20,
                        position: 'left',
                        html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="32" width="32"><path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z"/></svg>',
                        tooltip: '下一集',
                        style: {
                            color: 'white',
                        },
                        click: function (...args) {
                            let id = parseInt(args[0].art.option.id)+1
                            window.location.href = document.location.origin+document.location.pathname+'?id='+id
                            // console.info('click', args);
                        },
                        mounted: function (...args) {
                            // console.info('mounted', args);
                        },
                    },
                ],
                plugins: [
                    artplayerPluginDanmuku({
                        danmuku: this.danmuku,
                        speed: 5, // 弹幕持续时间，范围在[1 ~ 10]
                        width: 600, // 当播放器宽度小于此值时，弹幕发射器置于播放器底部
                        heatmap: false, // 是否开启热力图
                        visible: true, // 弹幕层是否可见
                        emitter: true, // 是否开启弹幕发射器
                        maxLength: 200, // 弹幕输入框最大长度, 范围在[1 ~ 1000]
                        lockTime: 1, // 输入框锁定时间，范围在[1 ~ 60]
                        mount: $danmu, // 弹幕发射器挂载点, 默认为播放器控制栏中部
                        theme: this.theme.global.name.value, // light dark

                        // 手动发送弹幕前的过滤器，返回 true 则可以发送，可以做存库处理
                        beforeEmit(danmu) {
                            let formData = {};
                            formData = danmu;
                            formData['video_id'] = parseInt(id);
                            post('/danmu/save', formData)
                                .then(response => {
                                    console.log(response.data)
                                })
                                .catch(function (error) {
                                    err(error)
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
