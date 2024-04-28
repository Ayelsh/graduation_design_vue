<template>
  <div class="embedded-container">
    <!-- 嵌入页面 -->
    <div class="iframe-container">
      <iframe src="http://192.168.44.130/" frameborder="0" width="100%" height="100%"></iframe>
    </div>

    <!-- 显示提示信息的按钮 -->
    <button class="tip-button" @click="toggleTips">显示提示</button>

    <Popup :title="props.title" :size="props.size" :btn="props.btn" :showModule="props.showModule" cancelBtn="关闭" 
  @cancel="closePopup"  themeColor="#ff6600" @close="props.showModule = false">
      <template slot="body">
        <div>
          <p>{{ props.message }}</p>
        </div>
      </template>
    </Popup>
    <!-- 提示信息弹窗 -->
    <div v-if="showTips" class="tip-modal">
      <div class="tip-content">{{ currentTip }}</div>
      <button @click="showNextTip">下一条提示</button>
    </div>
  </div>
</template>

<script>
import Popup from "./myPopup.vue";

export default {
  components: {
    Popup,
  },

  data() {
    return {
      tips: [
        '1、F12',
        '2、猪圈密码',
        '3、解密工具：https://www.dcode.fr/rosicrucian-cipher'
        // 可以添加更多的提示信息
      ],
      props: {
        // 1. 弹框大小：包括 小 small 中 middle 大 large 表单 form
        size: 'large',
        // 2. 弹框标题
        title: '注意',
        // 3. 按钮类型： 1 确定 2 取消 3 确定&取消
        btn: 2,
        // 4. 按钮内容
        submitBtn: 'submit',
        cancelBtn: 'cancel',
        // 5. 是否显示遮罩层
        mask: true,
        // 6. 选择弹框显示/隐藏的动画效果：top 从上方渐入渐出 fade 淡入淡出
        transition: 'top',
        // 7. 设置主题色
        themeColor: '#cc6699',
        showModule: true,
        message: '此密码关系到level2的host'
      },
      currentTipIndex: 0,
      showTips: false,
    };
  },
  computed: {
    currentTip() {
      return this.tips[this.currentTipIndex] || null;
    },
  },
  methods: {
    toggleTips() {
      this.showTips = !this.showTips;
      if (this.showTips) {
        this.currentTipIndex = 0; // 显示时重置提示索引
      }
    },
    showNextTip() {
      this.currentTipIndex = (this.currentTipIndex + 1) % this.tips.length;
    },
    closePopup() {
      this.props.showModule = false;
      console.log(1111111111)
    },
  },
};
</script>

<style>
* {
  overflow: hidden;
}

.embedded-container {
  position: relative;
  width: 100%;
  height: 100vh;
  /* 使用视口高度，确保页面填充并且不溢出 */

}

.iframe-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.tip-button {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ff6600;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 1000;
}

.tip-button:hover {
  background-color: #e65100;
}

.tip-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #cccccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
}

.tip-content {
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #ff6600;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e65100;
}
</style>