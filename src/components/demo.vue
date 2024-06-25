<template>
    <v-container>
        <v-row>
            <v-col cols="1">
                <v-avatar size="50px">
                    <img :src="comment.avatar" alt="avatar" />
                </v-avatar>
            </v-col>
            <v-col cols="11">
                <v-card outlined class="pa-4">
                    <div class="d-flex justify-space-between">
                        <div>
                            <h3 class="headline">{{ comment.username }}</h3>
                            <div class="caption grey--text">{{ comment.location }} - {{ comment.time }}</div>
                        </div>
                        <v-btn icon @click="showReplies = !showReplies">
                            <v-icon>{{ showReplies ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </div>
                    <p class="body-1 mt-2">{{ comment.content }}</p>
                    <v-divider class="my-4"></v-divider>
                    <div class="d-flex justify-space-between">
                        <div>
                            <v-btn text :color="liked ? 'blue' : ''" @click="likeComment">
                                <v-icon left small>mdi-thumb-up</v-icon> Like
                            </v-btn>
                            <v-btn text :color="disliked ? 'red' : ''" @click="dislikeComment">
                                <v-icon left small>mdi-thumb-down</v-icon> Dislike
                            </v-btn>
                            <v-btn text color="green" @click="openReplyDialog">
                                <v-icon left small>mdi-comment-outline</v-icon> Reply
                            </v-btn>
                            <v-btn text color="orange" @click="openReportDialog">
                                <v-icon left small>mdi-flag-outline</v-icon> Report
                            </v-btn>
                        </div>
                    </div>
                </v-card>
                <v-expand-transition>
                    <v-card v-if="showReplies" outlined class="mt-3 pa-4">
                        <v-text-field v-model="replyContent" label="Write your reply..." solo></v-text-field>
                        <v-card-text v-for="reply in replies" :key="reply.id">
                            <p>
                                <strong class="body-1">{{ reply.username }}</strong> - <span
                                    class="caption grey--text">{{ reply.time }}</span>
                            </p>
                            <p>{{ reply.content }}</p>
                        </v-card-text>
                    </v-card>
                </v-expand-transition>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        showReplies: false,
        liked: false,
        disliked: false,
        replyContent: "",
        comment: {
            avatar: 'https://via.placeholder.com/50',
            username: 'User',
            location: 'New York',
            time: '5 mins ago',
            content: 'This is a comment.',
        },
        replies: [
            {
                id: 1,
                avatar: 'https://via.placeholder.com/50',
                username: 'Reply User',
                time: '3 mins ago',
                content: 'This is a reply.',
            },
            // Add more replies as needed
        ],
    }),
    methods: {
        likeComment() {
            this.liked = !this.liked;
            if (this.disliked) this.disliked = false;
        },
        dislikeComment() {
            this.disliked = !this.disliked;
            if (this.liked) this.liked = false;
        },
        openReplyDialog() {
            this.replyDialog = true;
        },
        openReportDialog() {
            this.reportDialog = true;
        },
        postReply() {
            // Handle reply post
            this.replyDialog = false;
        },
        submitReport() {
            // Handle report submission
            this.reportDialog = false;
        }
    }
};
</script>