<template>
    <div class="blog-post">
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="author">作者：{{ post.author }}</p>
        <div class="post-content" v-html="compiledMarkdown" style="max-height: 100vh; overflow-y: auto;"></div>
    </div>
</template>

<script>
import { marked } from 'marked'

export default {
    data() {
        return {
            postId: this.$route.query.id,
            post: {
                title: 'Vue 2 博客正文页面',
                author: '你的名字',
                articleContent: '',
            },
            compiledMarkdown: '',
        };
    },
    created() {
        this.initPageData();
    },
    methods: {
        initPageData() {
            var url = "/Article/initPostPage/" + this.$route.query.id
            console.log(url)
            this.$axios.get(url).then((response) => {
                if (response.code === 200) {
                    console.log("请求成功")
                    this.post = response.data
                    this.compiledMarkdown = marked(this.post.articleContent);
                }
                else {
                    console.log("请求失败")
                    this.props.title = "请求失败"
                    this.message = response.data.msg
                    this.showPopup()
                }
            });
        },
    }
};
</script>

<style scoped>
html,
body {
    height: 100%;
    margin: 0;
    font-family: 'Roboto', sans-serif; /* 使用 Google Fonts 中的 Roboto 字体 */
    background-color: #f8f9fa; /* 设置页面背景颜色 */
}

.blog-post {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff; /* 设置文章容器背景颜色 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加轻微阴影效果 */
    transition: box-shadow 0.3s ease; /* 添加阴影变化的过渡效果 */
}

.blog-post:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* 鼠标悬浮时增加阴影 */
}

.post-title {
    font-size: 28px;
    color: #007bff; /* 设置标题颜色为蓝色 */
    margin-bottom: 10px;
}

.author {
    font-style: italic;
    color: #6c757d; /* 设置作者信息颜色 */
}

.post-content {
    font-size: 16px;
    line-height: 1.6;
    color: #333; /* 调整文章内容颜色 */
    box-sizing: border-box;
    overflow-y: auto;
}

/* You can add more styles as needed */
</style>
