<template>
    <v-container>
        <v-row>
            <div class="pt-3">
                <v-avatar size="40px" image="https://via.placeholder.com/50"></v-avatar>
            </div>
            <v-col>
                <v-textarea row-height="25" rows="3" clear-icon="mdi-close-circle" variant="outlined" auto-grow shaped
                    clearable></v-textarea>
                <v-btn>发布评论</v-btn>
            </v-col>

            <v-divider class="pt-10"></v-divider>
        </v-row>

        <v-row class="pt-5">
            <div class="pt-3">
                <v-avatar size="40px" image="https://via.placeholder.com/50"></v-avatar>
            </div>
            <v-col>
                <v-row style="font-size: 13px;">
                    <v-col class="me-auto" cols="auto">
                        <v-span class="me-2">用户名</v-span>
                        <v-small class="me-2">位置</v-small>
                    </v-col>
                    <v-col cols="auto" style="font-size: 15px;">
                        <v-small class="justify-end align-end">3小时前</v-small>
                    </v-col>
                </v-row>
                <p class="my-2" style="font-size: 15px;">这是评论内容。用户可以在这里发表自己的看法和意见。</p>
                <div class="d-flex justify-start" style="font-size: 13px;">
                    <v-btn variant="text" text :color="liked ? 'blue' : ''" @click="likeComment">
                        <v-icon left small>mdi-thumb-up</v-icon>
                        <span>100</span>
                    </v-btn>
                    <v-btn variant="text" text :color="disliked ? 'red' : ''" @click="dislikeComment">
                        <v-icon left small>mdi-thumb-down</v-icon>
                        <span>10</span>
                    </v-btn>
                    <v-btn variant="text" text color="green" @click="replyShow = !replyShow">
                        <v-icon left small>mdi-comment-outline</v-icon>
                    </v-btn>
                    <v-btn variant="text" text color="orange" @click="openReportDialog">
                        <v-icon left small>mdi-flag-outline</v-icon>
                    </v-btn>
                </div>
                <v-col v-show="replyShow">
                    <v-textarea row-height="25" rows="3" clear-icon="mdi-close-circle" variant="outlined" auto-grow
                        shaped clearable></v-textarea>
                    <v-btn>发送回复</v-btn>
                </v-col>
                
                <v-div v-show="show">
                    <v-row>
                        <div class="pt-3">
                            <v-avatar size="24px" image="https://via.placeholder.com/50"></v-avatar>
                        </div>
                        <v-col>
                            <v-row style="font-size: 13px;">
                                <v-col class="me-auto" cols="auto">
                                    <v-span class="me-2">用户名</v-span>
                                    <v-small class="me-2">位置</v-small>
                                </v-col>
                                <v-col cols="auto" style="font-size: 15px;">
                                    <v-small class="justify-end align-end">3小时前</v-small>
                                </v-col>
                            </v-row>
                            <p class="my-2" style="font-size: 15px;">这是评论内容。用户可以在这里发表自己的看法和意见。</p>
                            <div class="d-flex justify-start" style="font-size: 13px;">
                                <v-btn variant="text" text :color="liked ? 'blue' : ''" @click="likeComment">
                                    <v-icon left small>mdi-thumb-up</v-icon>
                                    <span>100</span>
                                </v-btn>
                                <v-btn variant="text" text :color="disliked ? 'red' : ''" @click="dislikeComment">
                                    <v-icon left small>mdi-thumb-down</v-icon>
                                    <span>10</span>
                                </v-btn>
                                <v-btn variant="text" text color="green" @click="replyShow1 = !replyShow1">
                                    <v-icon left small>mdi-comment-outline</v-icon>
                                </v-btn>
                                <v-btn variant="text" text color="orange" @click="openReportDialog">
                                    <v-icon left small>mdi-flag-outline</v-icon>
                                </v-btn>
                            </div>
                            <v-col v-show="replyShow1">
                                <v-textarea row-height="25" rows="3" clear-icon="mdi-close-circle" variant="outlined"
                                    auto-grow shaped clearable></v-textarea>
                                <v-btn>发送回复</v-btn>
                            </v-col>
                        </v-col>
                    </v-row>
                </v-div>
                <v-btn variant="text" @click="show = !show" data="展开 1 条回复">展开 1 条回复 <v-icon :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon></v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        show: false,
        replyShow: false,
        replyShow1: false,
    }),
    methods: {
    }
};
</script>