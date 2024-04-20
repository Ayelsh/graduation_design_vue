<template>
  <div class="post-form">
    <div class="preview-container">
      <h2>实时预览</h2>
      <div class="preview-content" v-html="compiledContent"></div>
    </div>
    <div class="editor-container">
      <h2>编辑</h2>
      <div class="form-group">
        <label for="title">标题:</label>
        <input type="text" id="title" v-model="post.articleTitle" required>
      </div>
      <div class="form-group">
        <label for="content">内容:</label>
        <textarea id="content" v-model="post.articleContent" rows="10" required></textarea>
      </div>
      <div class="form-group">
        <button @click="previewContent" class="preview-button">预览</button>
      </div>
      <div class="form-group">
        <label for="coverImage">封面图片:</label>
        <input type="file" id="articleThumbnailUrl" @change="handleAvatarUpload" accept="image/*" required>
      </div>
      <div class="form-group">
        <button @click="submitPost" class="submit-button">发布</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import MarkdownIt from 'markdown-it';

export default {
  data() {
    return {
      post: {
        articleTitle: '',
        articleContent: '',
        articleThumbnailUrl: null,
      },
      compiledContent: '',
      md: new MarkdownIt(),
    };
  },
  methods: {
    previewContent() {
      
      const markdownText = `# ${this.post.articleTitle}\n${this.post.articleContent}`;
      console.log(markdownText)
      this.compiledContent = this.md.render(markdownText);
    },
    async handleAvatarUpload(event) {
        const file = event.target.files[0];
        const avatarData = new FormData();
        avatarData.append('file', file);
  
        try {
          const response = await this.$axios.post('/File/uploadAvatar', avatarData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );
          if (response.code === 200) {
            Message({
              type: 'success',
              message: '上传成功'
            })
            this.post.articleThumbnailUrl = response.data
          }
        } catch (error) {
          Message({
            type: 'warning',
            message: '上传失败:' + error
          })
        }
      },
    submitCoverImage() {
      console.log('上传封面图', this.post.coverImage);
    },
    submitPost() {
      // this.post.articleContent = encodeURIComponent(this.post.articleContent)
      this.$axios.post('/Article/newArticle',this.post).then((res)=>{
        if(res.code === 200){
          Message({
            type:'success',
            message:'帖子发布成功'
          })
          this.$router.push({path:'/myBlog'})
        }else{
          Message({
            type:'error',
            message:'帖子发布失败'
          })
        }
      })
    },
  },
};
</script>

<style scoped>
.post-form {
  display: flex;
}

.preview-container,
.editor-container {
  flex: 1;
  padding: 20px;
}

.preview-content {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 30px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
textarea,
button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.preview-button,
.submit-cover-button,
.submit-button {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  width: auto;
}

.preview-button:hover,
.submit-cover-button:hover,
.submit-button:hover {
  background-color: #0056b3;
}

.preview-button:focus,
.submit-cover-button:focus,
.submit-button:focus {
  outline: none;
}
</style>
