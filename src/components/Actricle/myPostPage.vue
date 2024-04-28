<template>
    <div class="contain">
        <div class="blog-post">
            <h1 class="post-title">{{ post.articleTitle }}</h1>
            <p class="author">作者：{{ post.author }}</p>
            <mavon-editor class="markdown-body" codeStyle="monokai"  v-html="compiledMarkdown"  ref="md"/>
            <!-- <div class="post-content" v-html="compiledMarkdown"></div> -->
        </div>
        <div class="CommentSection">
            <CommentSection :comments="commentsData" :key="componentKey" v-on:commentPosted="openComment"
                ref="CommentSection" />
        </div>
        <div class="panel" v-if="showPanel">
            <div class="close-btn" @click="closePanel">X</div>
            <textarea id="content" class="input-field" v-model="inputText" rows="10" required
                placeholder="输入你的评论"></textarea>
            <button class="submit-btn" @click="submitComment">提交</button>
        </div>
    </div>
</template>

<script>
import { marked } from 'marked';
import CommentSection from './CommentSection.vue';
import { Message } from 'element-ui';

export default {
    components: {
        CommentSection
    },
    data() {
        return {
            postId: this.$route.query.id,
            post: {
                title: 'Vue 2 博客正文页面',
                author: '你的名字',
                articleContent: '',
            },
            compiledMarkdown: '',
            commentsData: [],
            componentKey: 0,
            showPanel: false,
            inputText: '',
            comment: null,
            replay: null
        };
    },
    created() {
        this.initPageData();
        // this.moniDate();
        this.initComments();
    },
    methods: {
        async initPageData() {
            var url = "/Article/initPostPage/" + this.$route.query.id
            console.log(url)
            await this.$axios.get(url).then((response) => {
                if (response.code === 200) {
                    console.log("请求成功")
                    this.post = response.data
                    this.compiledMarkdown = marked(decodeURIComponent(this.post.articleContent));
                    // this.compiledMarkdown = marked(this.post.articleContent);
                }
                else {
                    console.log("请求失败")
                    this.props.title = "请求失败"
                    this.message = response.data.msg
                    this.showPopup()
                }
            });
        },
        moniDate() {
            const commentsData = [
                {
                    id: 1,
                    author: {
                        name: 'Alice',
                        avatar: 'https://via.placeholder.com/40',
                    },
                    content: '这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。这是第一条评论。',
                    children: [
                        {
                            id: 11,
                            author: {
                                name: 'Bob',
                                avatar: 'https://via.placeholder.com/40',
                            },
                            content: '这是第一条评论的子评论。',
                        },
                        {
                            id: 12,
                            author: {
                                name: 'Charlie',
                                avatar: 'https://via.placeholder.com/40',
                            },
                            content: '这是第一条评论的第二个子评论。',
                        },
                        // 可以添加更多子评论
                    ],
                },
                {
                    id: 2,
                    author: {
                        name: 'David',
                        avatar: 'https://via.placeholder.com/40',
                    },
                    content: '这是第二条评论。',
                    children: [
                        {
                            id: 21,
                            author: {
                                name: 'Emily',
                                avatar: 'https://via.placeholder.com/40',
                            },
                            content: '这是第二条评论的子评论。',
                        },
                        // 可以添加更多子评论
                    ],
                },
                // 可以继续添加更多评论
            ];







            this.commentsData = commentsData

        },
        initComments() {
            var url = '/Comments/' + this.$route.query.id
            this.$axios.get(url).then((res) => {
                if (res.code === 200) {
                    this.commentsData = res.data

                }
                else {
                    Message({
                        type: 'error',
                        message: res.msg
                    })
                }

            })
        },
        reflashComments() {
            var url = '/Comments/' + this.$route.query.id
            this.$axios.get(url).then((res) => {
                if (res.code === 200) {
                    this.commentsData = res.data
                    for (let i = 0; i < this.commentsData.length; i++) {
                        this.$globalMethods.loadImageGlobal(this.commentsData[i].authorAvatar, this.$axios).then((res) => {
                            this.commentsData[i].authorAvatar = res
                        })
                        for (let j = 0; j < this.commentsData[i].children.length; j++) {
                            this.$globalMethods.loadImageGlobal(this.commentsData[i].children[j].authorAvatar, this.$axios).then((res) => {
                                this.commentsData[i].children[j].authorAvatar = res
                            })
                        }
                    }
                }
                else {
                    Message({
                        type: 'error',
                        message: res.msg
                    })
                }

            })
            this.componentKey += 1;
        },
        openComment(data) {
            this.showPanel = true;
            this.comment = data.comment;
            this.replay = data.replay;

            console.log(data)
        },
        closePanel() {
            this.showPanel = false;
        },
        submitComment() {
            console.log('Submitted:', this.inputText);
            const newComment = {
                content: this.inputText,
                commentId: this.comment ? this.comment.id : null,
                articleId: this.$route.query.id,
                repalyId: this.replay ? this.replay.id : null,
                repalyName: this.replay ? this.replay.authorNickname : null
            }
            this.$axios.post('/Comments', newComment).then((res) => {
                if (res.code === 200) {
                    Message({
                        type: 'success',
                        message: "评论发布表成功"
                    })

                    this.reflashComments();
                    this.closePanel();
                } else {
                    Message({
                        type: 'error',
                        message: res.msg
                    })
                }
            })

            this.inputText = '';
            this.comment = null;
            this.replay = null;
        },

    },
};
</script>

<style scoped>
html,
body {
    height: 100%;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    /* 使用 Google Fonts 中的 Roboto 字体 */
    background-color: #f8f9fa;
    /* 设置页面背景颜色 */
}

.panel {
    position: fixed;
    top: 50px;
    /* 距离顶部的位置，根据需要调整 */
    right: 20px;
    /* 距离右侧的位置，根据需要调整 */
    width: 200px;
    /* 板的宽度，根据需要调整 */
    padding: 20px;
    background-color: #ffffff;
    /* 板的背景色 */
    border-radius: 10px;
    /* 圆角半径 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
    height: 93vh;
    z-index: 1000;
    /* 确保板在其他元素之上 */
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #999999;
    /* 关闭按钮的颜色 */
    font-size: 15px;
    /* 关闭按钮的大小 */
}

.input-field {
    width: 100%;
    height: 70vh;
    margin-bottom: 10px;
    margin-top: 15px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    /* 输入框边框颜色 */
    border-radius: 5px;
    /* 输入框圆角半径 */
    box-sizing: border-box;
    word-wrap: break-word;
}

.submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    /* 提交按钮的背景色 */
    color: #ffffff;
    /* 提交按钮的文字颜色 */
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.submit-btn:hover {
    background-color: #0056b3;
    /* 鼠标悬停时的背景色 */
}


/* Your existing styles */
.contain {
    display: flex;
}

.CommentSection {
    flex: 1;
    position: fixed;
    z-index: 999;
    width: 250px;
    bottom: 3vh;
    max-height:90vh;;
}

.blog-post {
    flex: 1;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    overflow: auto;
}

.blog-post:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.post-title {
    font-size: 28px;
    color: #007bff;
    margin-bottom: 10px;
}

.author {
    font-style: italic;
    color: #6c757d;
}

.post-content {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    box-sizing: border-box;
    overflow-y: auto;
}

.contain {
    display: flex;
}

.CommentSection {
    flex: 1;
    position: fixed;
    z-index: 999;
    width: 250px;

}

.blog-post {
    flex: 1;

    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    /* 设置文章容器背景颜色 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    /* 添加轻微阴影效果 */
    transition: box-shadow 0.3s ease;
    /* 添加阴影变化的过渡效果 */
    overflow: auto;
}

.blog-post:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    /* 鼠标悬浮时增加阴影 */
}

.post-title {
    font-size: 28px;
    color: #007bff;
    /* 设置标题颜色为蓝色 */
    margin-bottom: 10px;
}

.author {
    font-style: italic;
    color: #6c757d;
    /* 设置作者信息颜色 */
}

.post-content {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    /* 调整文章内容颜色 */
    box-sizing: border-box;
    overflow-y: auto;
}
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

</style>
