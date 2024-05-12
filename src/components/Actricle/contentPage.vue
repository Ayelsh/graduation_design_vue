<template>
  <div class="post-form">
    <div class="form-group ">
        <button @click="submitPost" class="submit-button">发布</button>
      </div>
    <div class="editor-container">
      <h2>编辑你的帖子</h2>
      <div class="form-group">
        <label for="title">标题:</label>
        <input type="text" id="title" v-model="post.articleTitle" required>
      </div>

      <mavon-editor class="content" :codeStyle="codeStyle" :toolbars="toolbars" v-model="post.articleContent"
        :ishljs="true" ref="md" @change="change" />

      <div class="form-group">
        <label for="coverImage">封面图片:</label>
        <el-upload class="upload-demo" ref="upload" action="" :http-request="uploadFile" :auto-upload="false"
          :accept="'.jpeg,.png,.jpg'" :on-remove="handleRemove" :limit="1" :file-list="fileList"
          list-type="picture-card">
          <div class="uploadButton">
            <div><el-button size="small" class="upload-button-primary" type="primary" >选择图片</el-button></div>
            <div><el-button size="small" class="upload-button-success" type="success" @click="submitUpload">上传到服务器</el-button></div>
            
          </div>

        </el-upload>
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
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      codeStyle: 'monokai-sublime',
      compiledContent: '',
      md: new MarkdownIt(),
    };
  },
  methods: {
    uploadFile(param) {
      // 获取上传的文件名 
      var file = param.file

      console.log(file)
      //发送请求的参数格式为FormData
      const formData = new FormData();
      formData.append("file", file)
      var that = this;
      this.progressFlag = true
      // 调用param中的钩子函数处理各种情况，这样就可以用在组件中用钩子了。也可以用res.code==200来进行判断处理各种情况 
      this.$axios({
        url: '/File/uploadFile',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          // progressEvent.loaded:已上传文件大小
          // progressEvent.total:被上传文件的总大小
          //进度条
          that.loadProgress = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
        }
      }).then(res => {
        if (res.code === 200) {
          this.post.articleThumbnailUrl = res.data
          this.progressFlag = false
          Message({
            type: 'success',
            message: '上传成功'
          })
        } else {
          Message({
            type: 'error',
            message: res.msg + '\n' + res.data
          })
        }
      }).catch(err => {
        Message({
          type: 'error',
          message: err
        })
      }
      )
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.test_html = render;
    },
    uploadVideoProcess(event, file, fileList) {
      console.log(file === fileList)
      this.progressFlag = true; // 显示进度条
      this.loadProgress = parseInt(event.percent); // 动态获取文件上传进度
      if (this.loadProgress >= 100) {
        this.loadProgress = 100
        setTimeout(() => { this.progressFlag = false }, 1000) // 一秒后关闭进度条
      }
    },
    handleRemove(file) {
      console.log("文件删除")
      console.log(this.fileList.length)
      const index = this.fileList.indexOf(file);
      if (index !== -1) {
        this.fileList.splice(index, 1);
      }
    },
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
      this.$axios.post('/Article/newArticle', this.post).then((res) => {
        if (res.code === 200) {
          Message({
            type: 'success',
            message: '帖子发布成功'
          })
          this.$router.push({ path: '/myBlog' })
        } else {
          Message({
            type: 'error',
            message: '帖子发布失败'
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

.content {
  height: 100vh;
  z-index: 999;
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
  position: fixed;
    top: 10vh;
    /* 悬浮在页面底部 */
    right: 20px;
    /* 悬浮在页面右边缘 */
    padding: 10px 20px;
    width: auto;
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

.upload-button-primary {
  background-color: #0056b3;
  /* 绿色背景色 */
  color: #fff;
  /* 白色文字颜色 */
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s;
  /* 添加渐变效果 */
  width: auto;
  margin: 0 auto;
}
.upload-button-success {
  background-color: #4caf50;
  /* 绿色背景色 */
  color: #fff;
  /* 白色文字颜色 */
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s;
  /* 添加渐变效果 */
  width: auto;
  margin: 0 auto;
}
.upload-demo {
  border-radius: 50%;
}
.uploadButton{
  display: flex;
  justify-items: center;
  align-items: center;
}
</style>
