<template>
  <div>
    <div class="search-bar">
      <input type="text" placeholder="Search..." />
      <button class="search-btn" @click="search">Search</button>
    </div>
    <div class="grid-container">

      <div v-for="(card, index) in cards" :key="index" :class="['card', card.color]" @click="showCardDetails(card)">
        <h3>{{ card.title }}</h3>
      </div>
      <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ selectedCard.title }}</h2>
        <p>{{ selectedCard.description }}</p>
        <button @click="downloadFile">下载文件</button>
      </div>
    </div>
    </div>
    
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { title: '卡片1', color: 'monet-color1', description: '这是卡片1的描述信息。' },
        { title: '卡片2', color: 'monet-color2', description: '这是卡片2的描述信息。' },
        // 可以添加更多卡片数据
      ],
      showModal: false,
      selectedCard: {},
    };
  },
  methods: {
    showCardDetails(card) {
      console.log(1111111)
      this.selectedCard = card;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedCard = null;
    },
    downloadFile() {
      // 添加下载文件的逻辑
      alert('文件下载中...');
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.card {
  left: 20px;
  top: 20px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  border: 2px solid #333;
  width: 200px;
  height: 100px;
}

.card:hover {
  transform: scale(1.1);
}

.monet-color1 {
  background-color: #ffcd94;
}

.monet-color2 {
  background-color: #b9d3dc;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #aaa;
}

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
</style>