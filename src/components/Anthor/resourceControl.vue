<template>
    <div>
        <div class="grid-container">
            <div v-for="(card, index) in cards" :key="index" :style="{ backgroundColor: getRandomColor() }" class="card"
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
    };
  },
  created() {
    this.initCard();
  },
  methods: {
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
    deleteCard(id){
        var url = '' +id
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
  left: 50px;
  bottom: 5%;
  position: absolute;
  width: 100px;
}
</style>