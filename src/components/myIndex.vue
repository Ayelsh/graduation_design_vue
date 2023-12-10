<template>
    <div class="forum-home">
      <!-- 导航栏 -->
      <nav>
        <ul>
          <li @click="navigate('home')">首页</li>
          <li @click="navigate('hot')">热门主题</li>
          <li @click="navigate('new')">最新帖子</li>
          <li v-if="!userLoggedIn" @click="navigate('login')">登录</li>
          <li v-if="!userLoggedIn" @click="navigate('register')">注册</li>
          <li v-if="userLoggedIn" class="user-info">
            <span>{{ username }}</span>
            <button @click="logout">退出</button>
          </li>
        </ul>
      </nav>
  
      <!-- 帖子列表 -->
      <div class="post-list">
        <div v-for="post in posts" :key="post.id" class="post">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
          <span>{{ post.author }} 发表于 {{ formatDate(post.timestamp) }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userLoggedIn: false,
        username: "",
        currentPage: "home", // 当前页面标识
        posts: [
          {
            id: 1,
            title: "Vue.js 组件示例",
            content: "这是一个简化的 Vue.js 组件示例。",
            author: "JohnDoe",
            timestamp: "2023-01-01T12:34:56",
          },
          // 其他帖子...
        ],
      };
    },
    methods: {
      logout() {
        // 实际应用中应该向后端发起退出登录请求
        this.userLoggedIn = false;
        this.username = "";
        this.navigate("home");
      },
      navigate(page) {
        // 页面导航逻辑
        this.currentPage = page;
        // 实际应用中可能需要使用路由进行导航
      },
      formatDate(timestamp) {
        // 格式化时间戳
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .forum-home {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  nav {
    background-color: #333;
    padding: 10px;
    color: white;
  }
  
  nav ul {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  
  .post-list {
    margin-top: 20px;
  }
  
  .post {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  </style>
  