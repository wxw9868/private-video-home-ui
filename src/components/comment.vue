<template>
    <v-container>
        <v-row>
            <div class="pt-3">
                <v-avatar size="50px" image="https://via.placeholder.com/50"></v-avatar>
            </div>
            <v-col>
                <v-textarea row-height="25" rows="3" clear-icon="mdi-close-circle" variant="outlined" auto-grow shaped
                    clearable></v-textarea>
                <v-btn>评论</v-btn>
            </v-col>·

            <v-divider class="pt-10"></v-divider>
        </v-row>

        <v-row class="pt-5">
            <div class="pt-3">
                <v-avatar size="50px" :image="comment.avatar"></v-avatar>
            </div>
            <v-col>
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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        comment: {
            avatar: 'https://via.placeholder.com/50',
            username: 'User',
            location: 'New York',
            time: '5 mins ago',
            content: 'This is a comment.',
        },
    }),
    methods: {
    }
};
</script>