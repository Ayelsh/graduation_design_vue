<template>
  <div class="app">
    <!-- 搜索框 -->
    <div class="search-bar">
      <input type="text" placeholder="Search..." v-model="searchKey"/>
      <button class="search-btn" @click="search">Search</button>
    </div>

    <!-- 文章列表 -->
    <div class="post-grid">
      <div @click="openPostPage(post.id)" class="post" v-for="(post, index) in posts" :key="index">
        <img class="avatar-wrapper" :src=post.articleThumbnailUrl alt="帖子封面">
        <div class="post-details">
          <div class="post-title">{{ post.articleTitle }}</div>
        </div>
      </div>
    </div>

    <div style="display:inline-block;">
      <el-pagination style="padding-top: 15px" @size-change="findSizeChange" @current-change="initPost"
        :current-page.sync="page" :page-sizes="[2, 4, 6, 8, 10, 12]" :page-size="size"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
import { Message } from 'element-ui';


export default {
  
  data() {
    return {
      posts: [],
      imgurl: [],
      page: 0,
      size: 8,
      total : 0,
      totalPage:100,
      searchKey:''
    };
  },
  created() {
    this.initPost();
  },
  methods: {
    findSizeChange(size) {
        console.log("当每页条数改变的时候" + size);
        //将val赋值给size
        this.size = size;
        //重新去后台查询数据
        if(this.searchKey === ''){this.initPost()}
        else{this.search()}
        
      },
    initPost() {
      if(this.page > this.totalPage){
        Message({
          type:'error',
          message:'请求页数超出总页数'
        })
      }else{
      this.$axios.get('/Article/initPagePage', {
        params: {
          pageNumber: this.page,
          pageSize: this.size
        }
      }).then((response) => {
        if (response.code === 200) {
          this.posts = response.data.records;
          this.total = response.data.total
          this.totalPage = response.data.pages
          
        } else {
          console.log(response.msg+response.data)
          Message({
            type:'error',
            message:response.msg+response.data
          })
        }
      });}
    },
    openPostPage(postid) {
      console.log(postid)
      this.$router.push({
        path: '/postPage',
        query: { id: postid }
      });
    },
    search() {
      this.$axios.get('/Article/searchPage', {
        params: {
          keyValue: this.searchKey,
          pageNumber: this.page,
          pageSize: this.size
        }
      }).then((response) => {
        if (response.code === 200) {
          this.posts = response.data.records;
          this.total = response.data.total
          this.totalPage = response.data.pages
          
        } else {
          console.log(response.msg+response.data)
          Message({
            type:'error',
            message:response.msg+response.data
          })
        }
      });
    }
  }
};
</script>

<style scoped>
/* App styles */
.app {
  font-family: Arial, sans-serif;
}

.avatar-wrapper {
  width: 300px;
  max-height: 200px;
  object-fit: cover;

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
  width: 100px;
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
  overflow-y: auto;


  /* 添加这行样式 */
}

.post {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  border: 2px solid #333;
  width: 300px;
  height: 260px;
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
  font-family: Arial, sans-serif;
  margin: auto;
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

