<template>
    <div>

        <div v-if="visible" class="floating-menu">
            <div class="close-btn" @click="closePanel">X</div>
            <button v-for="(item, index) in items" :key="index" @click="handleButtonClick(item)" class="flat-button">
                {{ item.description }}
            </button>
        </div>

        <button v-if="!visible" class="floating-menu" @click="openPanel">打开Command面板</button>
        

    </div>
</template>

<script>
import { Message } from 'element-ui';

export default {
    data() {
        return {
            items: [],// 从后端获取的数组将保存在这里
            visible: true,
        };
    },
    mounted() {
        this.initButton();
    },
    methods: {
        initButton() {
            this.$axios.get('Button').then((res) => {
                if (res.code === 200) {
                    this.items = res.data

                } else {
                    Message({
                        type: 'error',
                        message: res.msg
                    })
                }
            })
        },
        handleButtonClick(value) {
            this.$emit('butonClick', value);
            console.log('Button clicked with value:', value);
        },
        closePanel() {
            this.visible = false;
        },
        openPanel() {
            this.visible = true;
        },
        userChange(){
            this.$axios.get('/Liunx/userChange').then((res)=>{
                if(res.code === 200){
                    Message({
                        type:'success',
                        message:'root用户切换成功'
                    })
                }else{
                    Message({
                        type:'error',
                        message:res.msg
                    })
                }
            })
        },
    }
};
</script>

<style scoped>
.floating-menu {
   
    display: grid;
    position: fixed;
    bottom: 20px;
    /* 距离顶部的位置，根据需要调整 */
    right: 10px;
    /* 距离右侧的位置，根据需要调整 */
    width: 200px;
    /* 板的宽度，根据需要调整 */
    padding: 20px;
    background-color: #ffffff;
    /* 板的背景色 */
    border-radius: 10px;
    /* 圆角半径 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
    max-height: 70vh;
    z-index: 1000;
    /* 确保板在其他元素之上 */
}
.floating-menu2 {
    color: black;
   display: grid;
   position: fixed;
   top: 50px;
   /* 距离顶部的位置，根据需要调整 */
   right: 10px;
   /* 距离右侧的位置，根据需要调整 */
   width: 200px;
   /* 板的宽度，根据需要调整 */
   padding: 20px;
   background-color: #ffffff;
   /* 板的背景色 */
   border-radius: 10px;
   /* 圆角半径 */
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   /* 阴影效果 */
   max-height: 70vh;
   z-index: 1000;
   /* 确保板在其他元素之上 */
}
.flat-button {
    color: black;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px 12px;
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
}

.flat-button:hover {
    background-color: #f0f0f0;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #999999;
    /* 关闭按钮的颜色 */
    font-size: 15px;
    /* 关闭按钮的大小 */
}
</style>