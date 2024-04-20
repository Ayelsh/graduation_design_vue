<template>
  <div class="password-verification center">
    <h2 style="margin-bottom: 20px;">请输入Lv1破译的密码</h2>
    <form @submit.prevent="verifyPassword">
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Verify</button>
      <div v-if="showError" class="error-message">Incorrect password, please try again!</div>
    </form>
  </div>
</template>

<script>
import { Message } from 'element-ui';

export default {
  data() {
    return {
      password: '',
      showError: false,
    };
  },
  methods: {
    verifyPassword() {
      if (this.password === 'sys.hidden.hmv') {
        Message({
          type: 'success',
          message: 'Verification successful'
        });
        this.$router.push({ path: "/Linux/Level1" });
      } else {
        this.showError = true;
        this.password = '';
      }
    },
  },
};
</script>

<style>
.password-verification {
  margin: auto auto;
  padding: 20px;
  border: 1px solid #007bff;
  border-radius: 8px;
  background-color: #f5f5f5;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.center {
  
  justify-content: center;
  align-items: center;
  
}

input[type="password"] {
  
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  width: 40%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
