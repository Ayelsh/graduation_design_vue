<template>

    <div class="register">
        <vue-particles id="particles-js" color="#fff" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle"
            :particleSize="4" linesColor="#fff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
            :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
            clickMode="push" class="lizi">
        </vue-particles>
        <div class="myregister">


            <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="100px">


                <el-row>
                    <el-col :span="19">
                        <el-form-item label="邮箱" prop="email">
                            <el-input placeholder="邮箱" v-model="registerForm.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="margin-left: 10px;" :span="4">
                        <el-button type="primary" @click="sendCode">发送验证码</el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="邮箱验证码" prop="verificationCode">
                            <el-input placeholder="邮箱验证码" v-model="registerForm.verificationCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">

                        <el-form-item label="密码" prop="password">
                            <el-input class="inps" type="password" placeholder="密码"
                                v-model="registerForm.password"></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="12">

                        <el-form-item label="确认密码" prop="confirmPassword">
                            <el-input class="inps" type="password" placeholder="确认密码"
                                v-model="registerForm.confirmPassword"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>


                <el-form-item>
                    <el-button type="primary" @click="submitForm">修改密码</el-button>
                    <el-button type="primary" @click="returnLogin">返回登录</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>

</template>

<script>
import { Message } from 'element-ui';
import axios from "axios";

export default {
    name: "myRegister",
    data: function () {
        return {
            instance: axios.create({
                baseURL: 'http://127.0.0.1:80',
            }),
            message: "",
            registerForm: {
                userName: "",
                nickName: "",
                password: "",
                email: "",
                confirmPassword: "",
                verificationCode: "",
                sex: true,
                avater: ""
            },
            registerRules: {
                email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                confirmPassword: [{ required: true, message: "请确认密码", trigger: "blur" }],
                verificationCode: [{ required: true, message: "请输入邮箱验证码", trigger: "blur" }]
            },

        };
    },

    methods: {
        sendCode() {

            console.log(1111111111)
            console.log(this.registerForm.email)
            this.instance.get('/user/code', { params: { email: this.registerForm.email } }).then((response) => {

                if (response.data.code === 200) {
                    console.log(22)
                    Message({
                        type: 'success',
                        message: response.data.msg
                    })
                } else {
                    Message({
                        type: 'error',
                        message: response.data.msg + '\n' + response.data.data
                    })
                }
            }).catch((error) => {
                console.log("请求失败" + error);
                Message({
                    type: 'error',
                    message: '请求失败\n' + error
                })
            });
        },
        submitForm() {

            const email = this.registerForm.email;
            const password = this.registerForm.password;
            const confirmPassword = this.registerForm.confirmPassword;
            const verificationCode = this.registerForm.verificationCode;

            if (!email) {
                return this.$message({
                    type: "error",
                    message: "邮箱不能为空！",
                });
            }
            if (!password) {
                return this.$message({
                    type: "error",
                    message: "密码不能为空！",
                });
            }
            if (!verificationCode) {
                return this.$message({
                    type: "error",
                    message: "邮箱验证码不能为空",
                });
            }
            if (password !== confirmPassword) {
                return this.$message({
                    type: "error",
                    message: "两次输入的密码不一致！",
                });
            }
            const formData = new FormData();
            formData.append('email', this.registerForm.email);
            formData.append('code', this.registerForm.verificationCode);
            this.instance.post('/user/code', formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((response) => {
                if (response.data.code === 200) {
                    console.log(this.registerForm)
                    this.instance.put('/user/resetPassword', this.registerForm).then((response) => {
                        if (response.data.code === 200) {

                            Message({
                                type: 'success',
                                message: response.data.data
                            })

                            this.$router.push({ path: "/login" })

                        } else {
                            Message({
                                type: 'error',
                                message: response.data.data
                            })
                        }
                    }).catch((error) => {
                        Message({
                            type: 'error',
                            message: error
                        })
                    });
                } else {
                    Message({
                        type: 'error',
                        message: response.data.msg + '\n' + response.data.data
                    })
                }
            }).catch((error) => {
                console.log("请求失败" + error);
                Message({
                    type: 'error',
                    message: '请求失败\n' + error
                })
            });


        },
        //   点击返回登录
        returnLogin() {
            this.$router.push({ path: "/login" })
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

    width: 640px;
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