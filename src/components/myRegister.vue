<template>
    
      <div class="register">
        <vue-particles id="particles-js" color="#fff" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle"
                :particleSize="4" linesColor="#fff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
                :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
                clickMode="push" class="lizi">
            </vue-particles>
        <div class="myregister">
          <h4>注册</h4>
          <br>
          <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="0px">
            <el-form-item label="" prop="username">
              <el-input class="inps" placeholder="用户名" v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input class="inps" type="password" placeholder="密码" v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item label="" prop="confirmPassword">
              <el-input class="inps" type="password" placeholder="确认密码" v-model="registerForm.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 40px">
              <el-button type="primary" round class="submitBtn" @click="submitForm">注册</el-button>
              <!-- 注册成功的弹窗 -->
              <Popup :title="props.title" :btn="2" :showModule="props.showModule" :size="props.size" cancelBtn="关闭" @cancel="closePopup" themeColor="#ff6600">
                <template slot="body">
                  <div>
                    <p>{{ message }}</p>
                  </div>
                </template>
              </Popup>
            </el-form-item>
            <div class="unregister">
              <!-- <router-link :to="{ path: '/login' }">
                <a href="login.vue" target="_blank">返回登录</a>
              </router-link> -->
              <span class="longin_register" style="position: relative;" @click="returnLogin">返回登录</span>
            </div>
          </el-form>
        </div>
      </div>
    
  </template>
  
  <script>
  import { mapMutations } from "vuex";
  import axios from "axios";
  import Popup from "./myPopup.vue";
  
  export default {
    name: "myRegister",
    components: {
      Popup
    },
    data: function () {
      return {
        message: "",
        registerForm: {
          username: "",
          password: "",
          confirmPassword: ""
        },
        registerRules: {
          username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
          password: [{ required: true, message: "请输入密码", trigger: "blur" }],
          confirmPassword: [{ required: true, message: "请确认密码", trigger: "blur" }]
        },
        props: {
          size: 'small',
          title: 'warning',
          btn: 2,
          submitBtn: 'submit',
          cancelBtn: 'cancel',
          mask: true,
          transition: 'top',
          themeColor: '#cc6699',
          showModule: false
        }
      };
    },
  
    methods: {
      ...mapMutations(["changeLogin"]),
      submitForm() {
        const username = this.registerForm.username;
        const password = this.registerForm.password;
        const confirmPassword = this.registerForm.confirmPassword;
        const instance = axios.create({
          baseURL: 'http://localhost:80',
        });
  
        if (!username) {
          return this.$message({
            type: "error",
            message: "用户名不能为空！",
          });
        }
        if (!password) {
          return this.$message({
            type: "error",
            message: "密码不能为空！",
          });
        }
        if (password !== confirmPassword) {
          return this.$message({
            type: "error",
            message: "两次输入的密码不一致！",
          });
        }
  
        instance.post('/user/register', {
          userName: username,
          password: password
        }).then((response) => {
          if (response.data.code === 200) {
            this.props.title = "注册成功";
            this.message = response.data.data;
            this.showPopup();
          } else {
            this.props.title = "注册失败";
            this.message = response.data.data;
            this.showPopup();
          }
        }).catch((error) => {
          console.log("请求失败" + error);
          this.props.title = "注册失败";
          this.message = "错误：" + error;
          this.showPopup();
        });
      },
      showPopup() {
        this.props.showModule = true;
      },
      closePopup() {
        this.props.showModule = false;
      },
      //点击返回登录
      returnLogin(){
        this.$router.push({path:"/login"})
      }
    }
  };
  </script>
  
  <style scoped>
  .fullscreen-enter-active,
  .fullscreen-leave-active {
    transition: opacity 0.5s;
  }
  
  .fullscreen-enter,
  .fullscreen-leave-to {
    opacity: 0;
  }
  
  .register {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background: linear-gradient(45deg, #ff6600, #cc6699);
    color: #040404;
    font-family: "Source Sans Pro";
  }
  
  .myregister {
    width: 320px;
    padding: 40px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    background-color: #ffffff;
  }
  
  .inps input {
    border: none;
    color: #333;
    background-color: #f0f0f0;
    font-size: 14px;
    padding: 12px;
    border-radius: 4px;
  }
  
  .submitBtn {
    background-color: #1890ff;
    color: #fff;
    width: 100%;
  }
  
  .unregister {
    margin-top: 20px;
    text-align: center;
  }
  #particles-js {
    width: 100%;
    height: calc(100% - 100px);
    position: absolute;

}
  .unregister a {
    color: #1890ff;
  }
  </style>
  