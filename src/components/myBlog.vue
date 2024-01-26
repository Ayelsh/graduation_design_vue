<template>
    <div>
        <!-- 主体容器，包含过滤后的帖子列表和分类面板 -->
        <div class="main-content" ref="mainContent">
            <!-- 过滤后的帖子列表 -->
            <div class="post-grid-container" ref="postGridContainer">
                <PostGrid :posts="filteredPosts" />
            </div>
            <!-- 分类面板 -->
            <div v-show="flag" style="position: absolute;" class="category-panel-container">
                <CategoryPanel @update-posts="filterPosts" />
            </div>
            <button @click="flag = !flag" class="toggle-button">
                {{ flag ? '隐藏分类' : '显示分类' }}
            </button>
        </div>
    </div>
</template>
  
<script>
import CategoryPanel from '@/components/CategoryPanel.vue';
import PostGrid from '@/components/PostGrid.vue';

export default {
    components: {
        CategoryPanel,
        PostGrid,
    },
    data() {
        return {
            allPosts: [], // 所有帖子数据
            filteredPosts: [], // 过滤后的帖子数据
            scrollTimeout: null,
            flag: false,
        };
    },
    methods: {
        // 根据选择的分类过滤帖子
        filterPosts(selectedCategories) {
            console.log(selectedCategories);
            // 添加根据选择的分类过滤帖子的逻辑
            // 更新 this.filteredPosts 以反映过滤后的数据
        },
    },
    mounted() {
        // 在组件挂载时获取所有帖子
        // 更新 this.allPosts 以反映获取的数据
        this.allPosts = [
            // 添加更多默认帖子
        ];
        // 初始显示所有帖子
        this.filteredPosts = this.allPosts;

        // 添加滚动事件监听器
        this.$refs.mainContent.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        // 在组件销毁前移除滚动事件监听器
        this.$refs.mainContent.removeEventListener('scroll', this.handleScroll);
    },
};
</script>
  
<style scoped>
/* 设置根元素和 body 的高度为 100% */
html,
body {
    height: 100%;
    margin: 0;
}

/* 主体容器的样式，使用 Flexbox 布局，设置内边距和高度为 100vh */
.main-content {
    display: flex;
    padding: 10px;
    height: 100vh;
    position: relative;
}

/* 设置过滤后的帖子列表容器，使用 flex: 1; 让其占据剩余空间 */
.post-grid-container {
    flex: 1;
    height: calc(100% - 20px);
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
}

/* 自定义滚动条样式 */
.post-grid-container::-webkit-scrollbar {
    width: 5px;
}

.post-grid-container::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
}

/* 切换分类按钮样式 */
.toggle-button {
    background-color: #4caf50;
    /* 绿色背景色 */
    color: #fff;
    /* 白色文字颜色 */
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    /* 添加渐变效果 */
}

/* 悬停时的样式 */
.toggle-button:hover {
    background-color: #45a049;
    /* 深绿色 */
}

/* 设置分类面板容器，可以根据需要调整宽度 */
.category-panel-container {
    width: 200px;

    background-color: #f4f4f4;


    border-radius: 5px;
    padding: 10px;
}

/* 美化分类面板的样式，可以根据需要调整 */
.category-panel {
    margin-bottom: 10px;
}

/* 添加一些装饰性的样式，可以根据需要调整 */
h2 {
    color: #333;
}

/* 移除默认的列表样式 */
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

/* 设置帖子的样式，可以根据需要调整 */
.post {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}

/* 添加一些悬停效果，可以根据需要调整 */
.post:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
  