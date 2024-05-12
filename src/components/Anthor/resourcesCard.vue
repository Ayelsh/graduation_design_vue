<template>
  <div>
    <div class="grid-container">
      <div v-for="(card, index) in cards" :key="index" :style="{ backgroundColor: getRandomColor() }" class="card"
        @click="showCard(card)">
        <h1>{{ card.filename }}</h1>
      </div>
    </div>

    <transition name="card-modal">
      <div v-if="showModal" class="card-modal" @click="closeCard">
        <div class="modal-content">
          <h2>{{ selectedCard.filename }}</h2>
          <p>{{ selectedCard.description }}</p>
          <button @click="downloadFile(selectedCard.fileUrl)">下载</button>

        </div>
      </div>
    </transition>

    <el-pagination v-if="!showModal" style="margin-top: 15px" @size-change="findSizeChange" @current-change="initCard"
      :current-page.sync="page" :page-sizes="[2, 4, 6, 8, 10]" :page-size="size"
      layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    <!-- <el-button @click="showDialog">打开弹窗</el-button> -->
    <el-dialog :visible.sync="dialogVisible" title="上传文件" @close="handleCloseDialog">
      <el-form ref="form" :model="form" label-width="80px">


        <el-form-item label="文件名">
          <el-input v-model="form.filename"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" maxlength="145" v-model="form.description"></el-input>
        </el-form-item>

        <el-form-item label="文件">
          <el-upload class="upload-demo" ref="upload" action="" :http-request="uploadFile"
            :on-progress="uploadVideoProcess" :auto-upload="false" :accept="''" :on-remove="handleRemove" :limit="1"
            :file-list="fileList">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          </el-upload>

          <el-progress v-if="progressFlag" :percentage="loadProgress" status="success"></el-progress>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </el-dialog>

    <button @click="newCard" class="toggle-button">发布资源</button>

  </div>
</template>

<script>
import { Message } from 'element-ui';
// import download from "downloadjs";
export default {
  data() {
    return {
      cards: [],
      showModal: false,
      page: 1, // Start with page 1
      size: 10,
      total: 0,
      totalPage: 100,
      selectedCard: {
        filename: "",
        description: ""
      },
      form: {
        filename: "",
        description: "",
        fileUrl: ""
      },
      dialogVisible: false,
      msg: "",
      monetColors: ['#537895', '#8fbfe0', '#0d3b66', '#61afef', '#144d53', '#2e6f7e'],
      acceptTypes: '',
      fileList: [],
      loadProgress: 0, // 动态显示进度条
      progressFlag: false, // 关闭进度条
    };
  },
  created() {
    this.initCard();
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
          this.form.fileUrl = res.data
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
    uploadVideoProcess(event, file, fileList) {
      console.log(file === fileList)
      this.progressFlag = true; // 显示进度条
      this.loadProgress = parseInt(event.percent); // 动态获取文件上传进度
      if (this.loadProgress >= 100) {
        this.loadProgress = 100
        setTimeout(() => { this.progressFlag = false }, 1000) // 一秒后关闭进度条
      }
    },
     submitForm() {

      this.$axios.post('/File/submit', this.form, { timeout: 1000 * 60 * 2 }).then((res) => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.form.filename = ""
          this.form.description = ""
          this.form.fileUrl = ""
          this.initCard();
          Message({
            type: 'success',
            message: res.msg
          })
        } else if (res.code === 'ERR_NETWORK') {
          Message({
            type: 'error',
            message: '文件大小不得超过500MB'
          })
        } else {

          Message({
            type: 'error',
            message: res.msg + '\n' + res.data
          })
        }
      }).catch(err => {
        this.dialogVisible = false
        Message({
          type: 'error',
          message: err
        })
      }
      )
      
    },
    findSizeChange(size) {
      this.size = size;
      this.initCard();
    },
    handleRemove(file) {
      console.log("文件删除")
      console.log(this.fileList.length)
      const index = this.fileList.indexOf(file);
      if (index !== -1) {
        this.fileList.splice(index, 1);
      }
    },
    initCard() {
      if (this.page > this.totalPage) {
        Message({
          type: 'error',
          message: 'Requested page exceeds total pages'
        })
      } else {
        console.log(this.page)
        this.$axios.get('/File/list', {
          params: {
            pageNumber: this.page,
            pageSize: this.size
          }
        }).then((res) => {
          if (res.code === 200) {
            this.total = res.data.total;
            this.cards = res.data.records;
          } else {
            Message.error(res.msg + '\n' + res.data);
          }
        })
      }
    },
    newCard() {
      this.dialogVisible = true;
    },
    showCard(card) {
      this.selectedCard = card;
      this.showModal = true;
    },
    closeCard() {
      this.showModal = false;
    },
    handleCloseDialog() {
      this.dialogVisible = false
    },
    downloadFile(url) {
      const a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('download', '1.3.12.2.1107.5.6.1.2387.30200122071903025612700000098.DCM')
      a.click()
      

      Message.success('下载开始');

    },
    getRandomColor() {
      const randomIndex = Math.floor(Math.random() * this.monetColors.length);
      return this.monetColors[randomIndex];
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 20px;
}

.card {

  color: #fff;
  top: 10px;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  border: 2px solid #333;
  width: 200px;
  height: 100px;
  cursor: pointer;
  left: 20px;
  padding: 20px;
  border-radius: 8px;

}

.card:hover {
  transform: scale(1.05);
}

.card-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

}

.modal-content {
  max-width: 400px;
  background-color: white;
  min-width: 300px;
  min-height: 100px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-bottom: 10px;
}

.modal-content p {
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}

.toggle-button {
  position: fixed;
  bottom: 60px;
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
</style>
