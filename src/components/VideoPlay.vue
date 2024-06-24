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
                                    <v-btn color="medium-emphasis" :icon="icon.collect" size="medium"
                                        @click="statisticsCollect()"></v-btn>
                                    <span class="subheading me-2" v-text="collect"></span>
                                    <v-btn color="medium-emphasis" icon="mdi-eye" size="medium"></v-btn>
                                    <span class="subheading" v-text="browse"></span>
                                    <v-btn color="medium-emphasis" icon="mdi-clock" size="medium"></v-btn>
                                    <span class="subheading" v-text="duration"></span>
                                </v-card-actions>

                                <v-item-group class="pb-6">
                                    <!-- <small>切换播放器：</small> pt-2-->
                                    <v-item v-for="logo in logos" :key="logo">
                                        <v-btn class="rounded-circle" height="40" width="40" variant="text">
                                            <v-img :src="host + logo.src" class="rounded-circle" height="40" width="40"
                                                cover></v-img>
                                        </v-btn>
                                    </v-item>
                                </v-item-group>
                            </v-card>

                            <v-card>
                                <v-row>
                                    <v-avatar
                                        image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-avatar>
                                    <v-col>
                                        <v-textarea label="Label"
                                            variant="outlined"></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import { inject } from 'vue';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
// import DPlayer from 'dplayer';
// import Artplayer from "artplayer";
// import XGplayer, { Events } from 'xgplayer';
// import 'xgplayer/dist/index.min.css';

export default {
    setup() {
        const host = inject('serverHost');
        return { host }
    },
    data: () => ({
        comments: [
            { author: 'John Doe', text: 'This is a sample comment.' },
            { author: 'Jane Roe', text: 'Another sample comment.' }
        ],
        videoId: 0,
        path: '/actress?id=',
        videoTitle: '',
        isCollect: '',
        collect: '',
        icon: {
            collect: 'mdi-heart-outline',
        },
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
    }),
    mounted() {
        let id = this.$route.query.id;
        this.videoId = id;
        this.getData(id);
        this.loadBrowse(id);
    },
    methods: {
        getData(id) {
            this.$http.get('/video/getPlay', { params: { id: id } })
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
                    // this.videoUrl = this.host + data.videoUrl;
                    this.poster = this.host + data.Poster;

                    this.icon.collect = this.isCollect ? 'mdi-heart' : icon.collect

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

            console.log(this.videoId)
            return

            const formData = {};
            formData['video_id'] = this.videoId
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
        // 获取评论数据
        loadCommentList() {
            this.$http.get('/comment/list', { params: { video_id: parseInt(videoID) } }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
                .then(function (response) {
                    // console.log(response);
                    // console.log(response.data.data);
                    let list = response.data.data;
                    if (list) {
                        let userID = storage.getItem("userID");
                        // console.log(userID);
                        let commentHTML = '';
                        list.forEach(element => {
                            let timeString = doTime(element.CreatedAt);
                            // console.log(timeString);
                            const { isZan, isCai } = isZanAndCai(element.LogUserID, userID, element.Zan, element.Cai)
                            // console.log(isZan,isCai);
                            // console.log(element);
                            // console.log(element.Childrens);
                            commentHTML +=
                                `<div class="row mt-4">
							<div class="col-auto">
								<!-- User Avatar -->
								<img src="/`+ element.Avatar + `" width="40" height="40" class="rounded-circle">
							</div>
							<div class="col text-dark">
								<!-- User Name and Location -->
								<div class="row comment-title">
									<div class="col">`+ element.Nickname + ` <small class="text-muted">北京</small></div>
									<!-- Comment Time -->
									<small class="col-auto text-muted">`+ timeString + `</small>
								</div>
								<!-- Comment Text -->
								<p class="my-2 comment-text">`+ element.Content + `</p>
								<!-- Like, Dislike, Reply, Report Buttons -->
								<div class="comment-button">
									<button class="btn btn-sm border-0 comment-zan" data-comment-id="`+ element.ID + `" onclick="commentZan(this)"><i class="bi ` + isZan + `"></i> <span>` + element.Support + `</span></button>
									<button class="btn btn-sm border-0 comment-cai" data-comment-id="`+ element.ID + `" onclick="commentCai(this)"><i class="bi ` + isCai + `"></i> <span>` + element.Oppose + `</span></button>
									<button class="btn btn-sm border-0" onclick="toggleReplyForm(this)">回复</button>
									<button class="btn btn-sm border-0">举报</button>
								</div>
								<!-- 回复表单（默认隐藏） -->
								<div class="mt-3 reply-form d-none">
									<form>
										<div class="mb-3">
											<input type="hidden" name="video_id" value="`+ videoID + `">
											<input type="hidden" name="parent_id" value="`+ element.ID + `">
											<textarea name="content" class="form-control comment-reply" rows="3" placeholder="回复`+ element.Nickname + `："></textarea>
										</div>
										<button type="button" class="btn btn-sm btn-primary" onclick="reply(this)" disabled>发送回复</button>
									</form>
								</div>`;
                            if (element.Childrens) {
                                commentHTML +=
                                    `<!-- Reply Area -->
									<div class="ms-3 mt-3 collapse">`;
                                element.Childrens.forEach(element => {
                                    const { isZan, isCai } = isZanAndCai(element.LogUserID, userID, element.Zan, element.Cai)
                                    commentHTML +=
                                        `<div class="row mt-3">
											<div class="col-auto">
												<!-- Reply User Avatar -->
												<img src="/`+ element.Avatar + `" width="24" height="24" class="rounded-circle">
											</div>
											<div class="col">
												<!-- Reply User Name and Location -->
												<div class="row comment-title">
													<div class="col" style="font-size: small;">`+ element.Nickname + ` <small class="text-muted">位置</small></div>
													<!-- Reply Time -->
													<small class="col-auto text-muted" style="font-size: small;">2小时前</small>
												</div>
												<!-- Reply Text -->
												<p class="my-2 comment-text">`+ element.Content + `</p>
												<!-- Like, Dislike, Reply, Report Buttons -->
												<div class="comment-button">
													<button class="btn btn-sm border-0 comment-zan" data-comment-id="`+ element.ID + `" onclick="commentZan(this)"><i class="bi ` + isZan + `"></i> <span>` + element.Support + `</span></button>
													<button class="btn btn-sm border-0 comment-cai" data-comment-id="`+ element.ID + `" onclick="commentCai(this)"><i class="bi ` + isCai + `"></i> <span>` + element.Oppose + `</span></button>
													<button class="btn btn-sm border-0"onclick="toggleReplyForm(this)">回复</button>
													<button class="btn btn-sm border-0">举报</button>
												</div>
												<!-- 回复表单（默认隐藏） -->
												<div class="mt-3 reply-form d-none">
													<form>
														<div class="mb-3">
															<input type="hidden" name="video_id" value="`+ videoID + `">
															<input type="hidden" name="parent_id" value="`+ element.ID + `">
															<textarea name="content" class="form-control comment-reply" rows="3" placeholder="回复`+ element.Nickname + `："></textarea>
														</div>
														<button type="button" class="btn btn-sm btn-primary" onclick="reply(this)" disabled>发送回复</button>
													</form>
												</div>
											</div>
										</div>`;
                                });
                                let count = element.Childrens.length;
                                commentHTML +=
                                    `</div>
									<!-- Show/Hide Reply Button -->
									<div class="reply-collapse" data="展开 `+ count + ` 条回复" onclick="toggleReplyCollapse(this)" style="font-size:0.833rem;">展开 ` + count + ` 条回复 <i class="bi bi-chevron-down"></i></div>`;
                            }
                            commentHTML +=
                                `</div>
						</div>`;
                        });

                        document.getElementById('comment-list').innerHTML = commentHTML;

                        loadCommentReply()
                        loadCollapse()
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
        comment(button) {
            // 处理表单数据的代码
            const form = button.parentNode;
            const formData = {};
            for (let element of form.elements) {
                // console.log(element.tagName)
                if (element.tagName !== "BUTTON" && element.type !== "SUBMIT") {
                    if (element.tagName === "INPUT") {
                        formData[element.name] = parseInt(element.value);
                    } else {
                        formData[element.name] = element.value;
                    }
                }
            }
            // console.log(formData)

            this.$http.post('/comment/comment', formData, { headers: { 'content-type': 'application/json' } })
                .then(function (response) {
                    // console.log(response);
                    let data = response.data.data
                    if (data) {
                        let commentHTML =
                            `<div class="row mt-4">
						<div class="col-auto">
							<!-- User Avatar -->
							<img src="/`+ data.userAvatar + `" width="40" height="40" class="rounded-circle">
						</div>
						<div class="col">
							<!-- User Name and Location -->
							<div class="row comment-title">
								<div class="col">`+ data.userNickname + ` <small class="text-muted">位置</small></div>
								<!-- Comment Time -->
								<small class="col-auto text-muted">刚刚</small>
							</div>
							<!-- Comment Text -->
							<p class="my-2 comment-text">`+ data.content + `</p>
							<!-- Like, Dislike, Reply, Report Buttons -->
							<div class="comment-button">
								<button class="btn btn-sm border-0 comment-zan" data-comment-id="`+ data.commentID + `" onclick="commentZan(this)"><i class="bi bi-hand-thumbs-up"></i> <span>0</span></button>
								<button class="btn btn-sm border-0 comment-cai" data-comment-id="`+ data.commentID + `" onclick="commentCai(this)"><i class="bi bi-hand-thumbs-down"></i> <span>0</span></button>
								<button class="btn btn-sm border-0" onclick="toggleReplyForm(this)">回复</button>
								<button class="btn btn-sm border-0">举报</button>
							</div>
							<!-- 回复表单（默认隐藏） -->
							<div class="mt-3 reply-form d-none">
								<form>
									<div class="mb-3">
										<input type="hidden" name="video_id" value="`+ videoID + `">
										<input type="hidden" name="parent_id" value="`+ data.commentID + `">
										<textarea name="content" class="form-control comment-reply" rows="3" placeholder="回复`+ data.userNickname + `："></textarea>
									</div>
									<button type="button" class="btn btn-sm btn-primary" onclick="comment(this)" disabled>发送回复</button>
								</form>
							</div>
						</div>
					</div>`;

                        document.getElementById('loadHTML').innerHTML = commentHTML;
                        let node = document.getElementById('loadHTML').firstElementChild;
                        let commentList = document.getElementById('comment-list');
                        commentList.insertBefore(node, commentList.children[0]);
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

            form.querySelector('textarea').value = '';
            button.disabled = true;
        },
        // 回复
        reply(button) {
            // 处理表单数据的代码
            const form = button.parentNode;
            const formData = {};
            for (let element of form.elements) {
                // console.log(element.tagName)
                if (element.tagName !== "BUTTON" && element.type !== "SUBMIT") {
                    if (element.tagName === "INPUT") {
                        formData[element.name] = parseInt(element.value);
                    } else {
                        formData[element.name] = element.value;
                    }
                }
            }
            // console.log(formData)

            this.$http.post('/comment/reply', formData, { headers: { 'content-type': 'application/json' } })
                .then(function (response) {
                    // console.log(response);
                    let data = response.data.data
                    if (data) {
                        let rowHTML =
                            `<div class="row mt-3">
						<div class="col-auto">
							<!-- Reply User Avatar -->
							<img src="/`+ data.userAvatar + `" width="24" height="24" class="rounded-circle">
						</div>
						<div class="col">
							<!-- Reply User Name and Location -->
							<div class="row comment-title">
								<div class="col">`+ data.userNickname + ` <small class="text-muted">位置</small></div>
								<!-- Reply Time -->
								<small class="col-auto text-muted">刚刚</small>
							</div>
							<!-- Reply Text -->
							<p class="my-2 comment-text">`+ data.content + `</p>
							<!-- Like, Dislike, Reply, Report Buttons -->
							<div class="comment-button">
								<button class="btn btn-sm border-0 comment-zan" data-comment-id="`+ element.ID + `" onclick="commentZan(this)"><i class="bi bi-hand-thumbs-up"></i> <span>0</span></button>
								<button class="btn btn-sm border-0 comment-cai" data-comment-id="`+ element.ID + `" onclick="commentCai(this)"><i class="bi bi-hand-thumbs-down"></i> <span>0</span></button>
								<button class="btn btn-sm border-0" onclick="toggleReplyForm(this)">回复</button>
								<button class="btn btn-sm border-0">举报</button>
							</div>
							<!-- 回复表单（默认隐藏） -->
							<div class="mt-3 reply-form d-none">
								<form>
									<div class="mb-3">
										<input type="hidden" name="video_id" value="`+ videoID + `">
										<input type="hidden" name="parent_id" value="`+ data.commentID + `">
										<textarea class="form-control comment-reply" rows="3" placeholder="回复`+ data.userNickname + `："></textarea>
									</div>
									<button type="button" class="btn btn-sm btn-primary" onclick="reply(this)" disabled>发送回复</button>
								</form>
							</div>
						</div>
					</div>`;

                        const replyElement = button.parentNode.parentNode.nextElementSibling;
                        const loadHTML = document.getElementById('loadHTML')
                        if (replyElement) {
                            loadHTML.innerHTML = rowHTML;
                            const node = loadHTML.firstElementChild;
                            replyElement.insertBefore(node, replyElement.children[0]);
                            const msg = '展开 ' + replyElement.children.length + ' 条回复';
                            const button = replyElement.nextElementSibling
                            button.setAttribute('data', msg);
                            button.innerHTML = msg + `<i class="bi bi-chevron-down"></i>`;
                        } else {
                            let replyHTML =
                                `<!-- Reply Area -->
						<div class="ms-3 mt-3 collapse">
							`+ rowHTML + `
						</div>
						<!-- Show/Hide Reply Button -->
						<div class="reply-collapse" data="展开 1 条回复" onclick="toggleReplyCollapse(this)">展开 1 条回复 <i class="bi bi-chevron-down"></i></div>`;
                            loadHTML.innerHTML = replyHTML;
                            const firstNode = loadHTML.firstElementChild;
                            const lastNode = loadHTML.lastElementChild;
                            const comment = button.parentNode.parentNode.parentNode;
                            comment.appendChild(firstNode);
                            comment.appendChild(lastNode);
                        }
                        loadCommentReply()
                        loadCollapse()
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