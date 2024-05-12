<template>
    <div class="app">
        <!-- 分类面板 -->
        <!-- <div v-show="flag" class="category-panel-container" ref="categoryPanel">
            <CategoryPanel @update-posts="filterPosts" />
        </div> -->
        <!-- 切换分类按钮 -->
        <!-- <button @click="toggleCategoryPanel" class="floating-toggle-button" :class="{ 'active': flag }">{{ flag ? '隐藏分类'
            : '显示分类' }}</button> -->
        <button @click="newArticle" class="toggle-button" >发布帖子</button>
        <!-- 过滤后的帖子列表 -->
        <div class="post-grid-container">
            <PostGrid :posts="filteredPosts" />
        </div>
    </div>
</template>

<script>
// import CategoryPanel from '@/components/CategoryPanel.vue';
import PostGrid from '@/components/Actricle/PostGrid.vue';

export default {
    components: {
        // CategoryPanel,
        PostGrid,
    },
    data() {
        return {
            allPosts: [], // 所有帖子数据
            filteredPosts: [], // 过滤后的帖子数据
            flag: false, // 控制分类面板显示/隐藏的标志
        };
    },
    methods: {
        // 根据选择的分类过滤帖子
        filterPosts(selectedCategories) {
            console.log(selectedCategories);
            // 添加根据选择的分类过滤帖子的逻辑
            // 更新 this.filteredPosts 以反映过滤后的数据
        },
        // 切换分类面板的显示/隐藏
        toggleCategoryPanel() {
            this.flag = !this.flag;
        },
        newArticle(){
            this.$router.push({path:'/contentPage'})
        }
    },
    mounted() {
        // 在组件挂载时获取所有帖子
        // 更新 this.allPosts 以反映获取的数据
        this.allPosts = [
            // 添加更多默认帖子
        ];
        // 初始显示所有帖子
        this.filteredPosts = this.allPosts;
    },
};
</script>

<style scoped>
/* 主体容器的样式 */
.app {
    position: relative;
    overflow: auto !important;
    ;
}

/* 分类面板容器样式 */
.category-panel-container {
    position: fixed;
    bottom: 20px;
    /* 与按钮底部对齐 */
    right: 20px;
    /* 靠右边缘 */
    z-index: 1000;
    width: 200px;
    background-color: #f4f4f4;
    border-radius: 5px;
    margin-bottom: 60px;
}

.post-grid-container {
    margin-top: 5px;
    padding: 10px;
    overflow-y: auto;
}

/* 切换分类按钮样式 */
.floating-toggle-button {
    position: fixed;
    bottom: 20px;
    /* 悬浮在页面底部 */
    right: 20px;
    /* 悬浮在页面右边缘 */
    padding: 10px 20px;
    background-color: #4caf50;
    /* 绿色背景色 */
    color: #fff;
    /* 白色文字颜色 */
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s;
    /* 添加渐变效果 */
    z-index: 1000;
}
.toggle-button {
    position: fixed;
    bottom: 50px;
    /* 悬浮在页面底部 */
    right: 20px;
    /* 悬浮在页面右边缘 */
    padding: 10px 20px;
    background-color: #4caf50;
    /* 绿色背景色 */
    color: #fff;
    /* 白色文字颜色 */
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s;
    /* 添加渐变效果 */
    z-index: 1000;
}

/* 切换分类按钮激活状态样式 */
.floating-toggle-button.active {
    background-color: #ff0000;
    /* 红色背景色 */
}

/* 切换分类按钮悬停样式 */
.floating-toggle-button:hover {
    background-color: #45a049;
    /* 深绿色 */
}

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