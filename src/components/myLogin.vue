<template>
    <transition name="fullscreen">

        <div class="login">
            <vue-particles id="particles-js" color="#fff" :particleOpacity="0.7" :particlesNumber="60"
                shapeType="circle" :particleSize="4" linesColor="#fff" :linesWidth="1" :lineLinked="true"
                :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab"
                :clickEffect="true" clickMode="push" class="lizi">
            </vue-particles>
            <div class="mylogin">
                <h4>登录</h4>
                <br>
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px">
                    <el-form-item label="" prop="account">
                        <el-input class="inps" placeholder="账号" v-model="loginForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="passWord">
                        <el-input class="inps" type="password" placeholder="密码" v-model="loginForm.passWord"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 40px">
                        <el-button type="primary" round class="submitBtn" @click="submitForm">登录</el-button>
                        <Popup :title="props.title" :btn="2" :showModule="props.showModule" :size="props.size"
                            cancelBtn="取消" @cancel="closePopup" themeColor="#ff6600">
                            <template slot="body">
                                <div>
                                    <p>{{ message }}</p>
                                </div>
                            </template>
                        </Popup>
                    </el-form-item>
                    <div class="unlogin">
                        <span class="longin_register" style="position: relative;" @click="forgetPwd">忘记密码？</span>
                        <span class="longin_register" style="position: relative;" @click="register">注册账户</span>
                    </div>


                </el-form>

            </div>
        </div>
    </transition>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";
import Popup from "./myPopup.vue";
import { Message } from "element-ui";
export default {
    name: "myLogin",
    components: {
        Popup

    },
    data: function () {
        return {
            message: "",
            loginForm: {
                account: "",
                passWord: "",
            },
            loginRules: {
                account: [{ required: true, message: "请输入账号", trigger: "blur" }],
                passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
            },
            props: {
                // 1. 弹框大小：包括 小 small 中 middle 大 large 表单 form
                size: 'small',
                // 2. 弹框标题
                title: 'warning',
                // 3. 按钮类型： 1 确定 2 取消 3 确定&取消
                btn: 3,
                // 4. 按钮内容
                submitBtn: 'submit',
                cancelBtn: 'cancel',
                // 5. 是否显示遮罩层
                mask: true,
                // 6. 选择弹框显示/隐藏的动画效果：top 从上方渐入渐出 fade 淡入淡出
                transition: 'top',
                // 7. 设置主题色
                themeColor: '#cc6699',
                showModule: false,

                message: '请联系管理员'

            },

        };
    },

    methods: {
        ...mapMutations(["changeLogin"]),
        submitForm() {

            const self = this;
            const userAccount = this.loginForm.account;
            const userPassword = this.loginForm.passWord;
            const instance = axios.create({
                baseURL: 'http://127.0.0.1:80',
            });


            if (!userAccount) {
                return this.$message({
                    type: "error",
                    message: "账号不能为空！",
                });
            }
            if (!userPassword) {
                return this.$message({
                    type: "error",
                    message: "密码不能为空！",
                });
            }
            instance.post('/user/login', {
                userName: userAccount,
                password: userPassword
            }).then((response) => {
                if (response.data.code === 200) {
                    self.$store.commit('setToken', response.data.data.token)
                    this.$axios.get('/user/userInfo').then((response) => {
                        if (response.code === 200) {
                            localStorage.setItem('avatar', response.data.avatar)
                            localStorage.setItem('userType', response.data.userType)
                            if (response.data.userType === '管理员') {
                                console.log(1111)
                                console.log(response.data.userType)
                                this.$router.addRoute(
                                    {
                                        path: '/user/userControl',
                                        name: 'UserControl',
                                        meta: { requireAuth: true },
                                        component: () => import("@/components/userControlPage.vue")
                                    }
                                )
                            }
                        } else {
                            Message({
                                type: 'error',
                                message: '用户信息请求出错'
                            })
                        }
                    });
                    this.$router.push({ path: "/index" })
                }
                else {
                    this.props.title = "登录失败"
                    this.message = response.data.data
                    this.showPopup()
                }
            }).catch((error) => {
                console.log("请求失败" + error);
                this.props.title = "登录失败"
                this.message = "错误：" + error
                this.showPopup()
            });
        },
        showPopup() {
            this.props.showModule = true;
        },
        closePopup() {
            this.props.showModule = false;
        },
        test() { this.$router.push({ path: "/test" }) },
        //点击忘记密码按钮
        forgetPwd() {
            //点击后路由跳转，这是编程式路由导航跳转
            this.$router.push({ path: "/" })
        },
        //点击注册按钮
        register() {
            this.$router.push({ path: "/register" })
        }

    },
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

.login {
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

.mylogin {
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

.unlogin {
    margin-top: 20px;
    text-align: center;


}

#particles-js {
    width: 100%;
    height: calc(100% - 100px);
    position: absolute;

}

.unlogin a {
    color: #1890ff;
}

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    /* 100% 视窗高度，确保按钮在垂直方向上居中 */
}

.third-party-login {
    background-color: #2c3136;
    /* GitHub 颜色 */
    color: #fff;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    transition: background-color 0.3s ease;
    position: relative;
}

.third-party-login i {
    margin-right: 10px;
}

.third-party-login:hover {
    background-color: #c9d4d4;
    /* Hover 时的颜色 */
}

.icon-container {
    width: 20px;
    /* 设置适当的宽度 */
    height: 20px;
    /* 设置适当的高度 */
}


.icon {
    width: 100%;
    height: 100%;
}
</style>
