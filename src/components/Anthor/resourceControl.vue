<template>
    <div>
        <div class="grid-container">
            <div  v-for="(card, index) in cards" :key="index" :style="{ backgroundColor: getRandomColor() }" class="card"
                @click="showCard(card)">
                <h1>{{ card.filename }}</h1>
            <button class="close" @click="deleteCard(card.id)">删除</button>
            </div>
        </div>
        <transition name="card-modal">
            <div v-if="showModal" class="card-modal" @click="closeCard">
                <div class="modal-content">
                    <h2>{{ selectedCard.filename }}</h2>
                    <p>{{ selectedCard.description }}</p>
                </div>
            </div>
        </transition>

        <el-pagination v-if="!showModal" style="margin-top: 15px" @size-change="findSizeChange"
            @current-change="initCard" :current-page.sync="page" :page-sizes="[2, 4, 6, 8, 10]" :page-size="size"
            layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
</template>
<script>
import { Message } from 'element-ui';
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
      key:0
    };
  },
  created() {
    this.initCard();
  },
  methods: {
    initCard() {
      
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
      },
    showCard(card) {
      this.selectedCard = card;
      this.showModal = true;
    },
    closeCard() {
      this.showModal = false;
    },
    getRandomColor() {
      const randomIndex = Math.floor(Math.random() * this.monetColors.length);
      return this.monetColors[randomIndex];
    },
    findSizeChange(size) {
      this.size = size;
      this.initCard();
    },
    async deleteCard(id){
        var url = '/File/resources/' +id
        this.$axios.delete(url).then(res =>{
        if(res.code === 200){
          Message({
            type:'success',
            message:'删除资源成功'
          })
          this.initCard();
        }else{
          Message({
            type:'error',
            message:'删除资源失败\n'+res.data
          })
          this.initCard();
        }
        
      })
      
    }
  },
};
</script>
<style>
.close {
  height: 40px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  right: 50px;
  bottom: 5%;
  position: absolute;
  width: 100px;
}

.close:hover {
  height: 40px;
  background-color: #ff5500;
  color: #fff;
  border: none;
  border-radius: 20px;
  right: 50px;
  bottom: 5%;
  position: absolute;
  width: 100px;
}

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