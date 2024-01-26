<template>
  <div class="profile-container">
    <form @submit.prevent="updateProfile" class="profile-form">
      <div class="form-header">
        <h1>User Profile</h1>
      </div>

      <div class="form-group">
        <label for="username">Username:</label>
        <div class="input-container">
          <input type="text" id="username" v-model="userInfo.username" readonly>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <div class="input-container">
          <input type="email" id="email" v-model="userInfo.email" readonly>
        </div>
      </div>

      <div class="form-group">
        <label for="fullname">Full Name:</label>
        <div class="input-container">
          <input type="text" id="fullname" v-model="userInfo.fullname">
        </div>
      </div>

      <!-- 其他用户信息字段 -->

      <button type="submit">Update Profile</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    // 在组件创建时从后端获取用户信息
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      // 使用Vue Resource、Axios或其他方式从后端获取用户信息
      // 示例中使用setTimeout模拟异步请求
      setTimeout(() => {
        // 假设后端返回的用户信息包含username、email和fullname字段
        this.userInfo = {
          username: 'user123',
          email: 'user@example.com',
          fullname: 'John Doe'
          // 添加其他用户信息字段
        };
      }, 500);
    },
    updateProfile() {
      // 在这里实现更新用户信息的逻辑，可以通过Vue Resource、Axios或其他方式与后端交互
      console.log('Updating profile:', this.userInfo);
    }
  }
};
</script>

<style scoped>
.profile-container {
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
}

.profile-form {
  width: 95%;
  height: 95%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.form-header {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input-container {
  display: flex;
  align-items: center;
}

input {
  width: 100%;
  height: 40px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .profile-form {
    width: 90%;
  }
}
</style>
