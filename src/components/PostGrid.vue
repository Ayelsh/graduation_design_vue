<template>
    <div class="post-grid">
        <div class="post" v-for="(post, index) in posts" :key="index">
            <div class="post-thumbnail" :style="{ backgroundImage: 'url(' + post.image + ')' }"></div>
            <div class="post-details" @click=openPostPage(post.id)>
                <div class="post-title">{{ post.articleTitle }}</div>
                <div class="post-description">{{ post.articlePreviewContent }}</div>
                <Popup :title="props.title" :btn="2" :showModule="props.showModule" :size="props.size" cancelBtn="取消"
                    @cancel="closePopup" themeColor="#ff6600">
                    <template slot="body">
                        <div>
                            <p>{{ message }}</p>
                        </div>
                    </template>
                </Popup>
            </div>
        </div>
    </div>
</template>

<script>
import Popup from "./myPopup.vue";
export default {
    components: {
        Popup

    },
    data: function () {
        return {
            posts: [],
            props: {
                // 1. 弹框大小：包括 小 small 中 middle 大 large 表单 form
                size: 'small',
                // 2. 弹框标题
                title: 'warning',
                // 3. 按钮类型： 1 确定 2 取消 3 确定&取消
                btn: 3,
                // 4. 按钮内容
                submitBtn: 'submit',
                cancelBtn: 'cancel',
                // 5. 是否显示遮罩层
                mask: true,
                // 6. 选择弹框显示/隐藏的动画效果：top 从上方渐入渐出 fade 淡入淡出
                transition: 'top',
                // 7. 设置主题色
                themeColor: '#cc6699',
                showModule: false,

                message: '请联系管理员'

            },
        };
    },
    created() {
        this.initPost();
        window.openPostPage = this.openPostPage


    },
    methods: {
        initPost() {

            this.$axios.get('/Article/initPage').then((response) => {
                if (response.code === 200) {
                    console.log("请求成功")
                    this.posts = response.data
                    console.log(this.posts)
                }
                else {
                    console.log("请求失败")
                    this.props.title = "请求失败"
                    this.message = response.data.data
                    this.showPopup()
                }
            });
        },
        showPopup() {
            console.log("访问show")
            this.props.showModule = true;
        },
        closePopup() {
            this.props.showModule = false;
        },
        openPostPage(postid) {
            this.$router.push(
                {
                    //添加需要传值到那个页面的路径
                    path: '/postPage',
                    //携带需要传递的参数
                    query: { id: postid }
                })
        }
    }

};

</script>

<style scoped>
/* Post grid styles */
.post-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    flex: 1;
}

.post {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.post-thumbnail {
    width: 100%;
    height: 150px;
    background-size: cover;
    background-position: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.post-details {
    padding: 15px;
}

.post-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
}

.post-description {
    font-size: 14px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 1;
}
</style>