<template>
  <div class="app">
    <!-- 搜索框 -->
    <div class="search-bar">
      <input type="text" placeholder="Search..." />
      <button class="search-btn" @click="search">Search</button>
    </div>

    <!-- 文章列表 -->
    <div class="post-grid" style="overflow: auto;">
      <div class="post" v-for="(post, index) in posts" :key="index">
        <div class="post-thumbnail" :style="{ backgroundImage: 'url(' + post.image + ')' }"></div>
        <div class="post-details" @click="openPostPage(post.id)">
          <div class="post-title">{{ post.articleTitle }}</div>
          <div class="post-description">{{ post.articlePreviewContent }}</div>
          <button class="view-details-btn">View Details</button>
        </div>
      </div>
    </div>

    <!-- 弹出框 -->
    <Popup :title="props.title" :btn="2" :showModule="props.showModule" :size="props.size" cancelBtn="取消"
            @cancel="closePopup" themeColor="#ff6600">
      <template slot="body">
        <div>
          <p>{{ props.message }}</p>
        </div>
      </template>
    </Popup>
  </div>
</template>

<script>
import Popup from "./myPopup.vue";
export default {
  components: {
    Popup
  },
  data() {
    return {
      posts: [],
      props: {
        size: 'small',
        title: 'warning',
        btn: 3,
        submitBtn: 'submit',
        cancelBtn: 'cancel',
        mask: true,
        transition: 'top',
        themeColor: '#cc6699',
        showModule: false,
        message: '请联系管理员'
      }
    };
  },
  created() {
    this.initPost();
  },
  methods: {
    initPost() {
      this.$axios.get('/Article/initPage').then((response) => {
        if (response.code === 200) {
          this.posts = response.data;
        } else {
          this.props.title = "请求失败";
          this.props.message = response.data.data;
          this.showPopup();
        }
      });
    },
    showPopup() {
      this.props.showModule = true;
    },
    closePopup() {
      this.props.showModule = false;
    },
    openPostPage(postid) {
      this.$router.push({
        path: '/postPage',
        query: { id: postid }
      });
    },
    search() {
      // 执行搜索逻辑
    }
  }
};
</script>

<style scoped>
/* App styles */
.app {
  font-family: Arial, sans-serif;
}

/* Search bar styles */
.search-bar {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.search-bar input {
  flex: 1;
  height: 20px;
  padding: 15px;
  font-size: 14px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-btn {
  height: 40px;
  padding: 0 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #0056b3;
}

/* Post grid styles */
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  overflow-y: auto; /* 添加这行样式 */
}

.post {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.post:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.post-details {
  padding: 15px;
}

.post-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.post-description {
  font-size: 16px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 2;
  margin-bottom: 10px;
}

.view-details-btn {
  padding: 8px 16px;
  background-color: #ff6600;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-details-btn:hover {
  background-color: #ff5500;
}

/* Your existing Popup styles */
</style>
