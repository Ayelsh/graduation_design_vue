<template>
  <div>
    <div class="profile-header">
      <img class="avatar-wrapper" :src=imageUrl alt="用户头像">
    </div>


    <div class="profile-details">
      <div class="grid-container">

        <div class="detail-item" v-for="(value, key) in userInfo" :key="key" v-show="key !== 'avatar'">

          <div class="detail-icon">
            <i class="fas" :class="iconClass(key)"></i>
          </div>

          <div class="detail-content">
            <p style="text-align: left;">{{ value }}</p>
            <p style=" font-size: 15px;  color: cadetblue;">{{ key }}</p>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
export default {


  data() {
    return {
      userInfo: {
        userName: 'John Doe',
        status: '',
        sex: '',
        userType: '',
        nickName: '',
        avatar: '',
        email: 'john@example.com',
        phoneNumber: '123-456-7890'
        // 添加其他个人信息字段
      },
      imageUrl: '',
      props: {
        size: 'small',
        title: 'warning',
        btn: 3,
        submitBtn: 'submit',
        cancelBtn: 'cancel',
        mask: true,
        transition: 'top',
        themeColor: '#cc6699',
        showModule: false,
        message: '请联系管理员'
      }
    };
  },
  created() {
    this.initPage();

  },
  mounted() {

  },
  methods: {
    initPage() {
      this.$axios.get('/user/userInfo').then((response) => {
        if (response.code === 200) {
          this.userInfo = response.data;
          this.$globalMethods.loadImageGlobal(this.userInfo.avatar, this.$axios)
            .then(imageUrl => {
              this.imageUrl = imageUrl;
            })
            .catch(error => {
              console.error('加载图片失败:', error);
            });
        } else {
          this.props.title = "请求失败";
          this.message = response.msg;
          this.showPopup();
        }
      });
    },
    filteredItems() {
      return this.userInfo.filter(item => item !== 'avatar');
    },
    showPopup() {
      this.props.showModule = true;
    },
    closePopup() {
      this.props.showModule = false;
    },
    iconClass(key) {
      // 根据字段名返回相应的 FontAwesome 图标类名
      switch (key) {
        case 'userName':
          return 'fa-user';
        case 'status':
          return 'fa-user-check';
        case 'sex':
          return 'fa-venus-mars';
        case 'userType':
          return 'fa-user-tag';
        case 'nickName':
          return 'fa-id-badge';
        case 'avatar':
          return 'fa-image';
        case 'email':
          return 'fa-envelope';
        case 'phoneNumber':
          return 'fa-phone';
        default:
          return 'fa-info-circle';
      }
    }
  }
};
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
}

body {
  overflow: hidden;
  /* 防止页面溢出 */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* 定义两列 */
  grid-gap: 0px;
  /* 设置网格间隔 */
  margin-left: 1%;
}

.avatar-wrapper {
  position: relative;
  /* 使用相对定位 */
  margin-top: 1%;
  left: 2%;
  width: 300px;
  /* 设置相同的宽度和高度 */
  height: 300px;
  /* 设置相同的宽度和高度 */
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.avatar-wrapper:hover {
  transform: scale(1.05);
}

.profile-container {
  display: flex;

  /* height: 100vh; 让容器铺满整个视口高度 */
  max-width: 100%;
  margin: 0 auto;
  padding: 40px;
  /* text-align: center; */
}

.profile-header {
  flex: 1;
  display: flex;
  padding-left: 0%;
  margin-bottom: 20px;
  align-items: center;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
}

.profile-cont {

  padding: 2%;
  margin-bottom: 1%;
}

.profile-header h1 {
  font-size: 120px;
  display: flex;
  padding: 2%;
  margin-bottom: 1%;
}

.profile-header p {
  font-size: 16px;
  color: #666;
}

.profile-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 20px;
  align-items: center;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
}

.detail-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: auto;
  margin: 20px;
  transition: transform 0.3s;
}

.detail-item:hover {
  transform: translateY(-5px);
}

.detail-icon {
  width: 40px;
  height: 40px;
  background-color: #007bff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.detail-icon i {
  color: #fff;
  font-size: 20px;
  /* 设置图标大小 */
}

.detail-content p {
  font-size: 18px;
  transition: color 0.3s;
}

.detail-item:hover .detail-content p {
  color: #007bff;
}

.edit-profile-btn button {
  position: fixed;
  bottom: 20px;
  /* 悬浮在页面底部 */
  right: 20px;
  /* 添加渐变效果 */
  z-index: 1000;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-profile-btn button:hover {
  background-color: #0056b3;
}
</style>
