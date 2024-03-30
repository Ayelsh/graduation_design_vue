<template>
    <div class="profile">
        <h2>个人信息修改</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="nickName">昵称：</label>
                <input type="text" id="nickName" v-model="userInfo.nickName" class="form-control" />
            </div>
            <div class="form-group">
                <label for="email">电子邮件：</label>
                <input type="email" id="email" v-model="userInfo.email" class="form-control" />
            </div>
            <div class="form-group">
                <label for="phoneNumber">手机号码：</label>
                <input type="tel" id="phoneNumber" v-model="userInfo.phoneNumber" class="form-control" />
            </div>
            <!-- 替换原有的头像字段为上传头像的部分 -->
            <div class="form-group">
                <label for="avatar">上传头像：</label>
                <input type="file" @change="handleAvatarUpload" accept="image/*" class="form-control-file" />
            </div>
            <button type="submit" class="btn btn-primary">保存修改</button>
        </form>
    </div>
</template>

<script>
import { Message } from 'element-ui';

export default {
    data() {
        return {
            userInfo: {
                userName: 'John Doe',
                status: '',
                sex: '',
                userType: '',
                nickName: '', // 昵称
                email: '', // 电子邮件
                phoneNumber: '', // 手机号码
                avatar: null, // 保存上传的头像文件对象
            }
        };
    },
    created() {
        this.initPage();
    },
    methods: {
        initPage() {
            this.$axios.get('/user/userInfo').then((response) => {
                if (response.code === 200) {
                    this.userInfo = response.data;
                    
                } else {
                    Message({
                        type:"error",
                        message:"读取用户信息出错！"
                    })
                }
            });
        },
        submitForm() {

            // 这里可以添加表单验证逻辑
            let that = this
            const url = '/user/userInfo'


            this.$axios.post(url, {
                userName: this.userInfo.userName,
                nickName: this.userInfo.nickName,
                status: this.userInfo.status,
                email: this.userInfo.email,
                phoneNumber: this.userInfo.phoneNumber,
                sex: this.userInfo.sex,
                avatar: this.userInfo.avatar,
                userType: this.userInfo.userType
            }).then((response) => {
                console.log(response)
                var messageType = ''
                if (response.code === 200) {
                    messageType = 'success'
                } else {
                    messageType = 'warning'
                }

                that.$message({
                    message: response.msg,
                    type: messageType,
                    duration: 2000
                })
                that.$router.push({ path: "/user/profile" })
            }).catch((error) => {
                that.$message({
                    message: error,
                    type: 'error',
                    duration: 2000
                })
            });


        },
        async handleAvatarUpload(event) {
            const file = event.target.files[0];
            const avatarData = new FormData();
            avatarData.append('file', file);
            console.log(11111111111)
            try {
                const response =
                    await this.$axios.post('/File/uploadAvatar', avatarData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    );
                if (response.code === 200) {
                    Message({
                        type: 'success',
                        message: '上传成功'
                    })
                    this.userInfo.avatar = response.data
                }

                // 在这里可以将文件路径保存到表单数据中或者进行其他操作
            } catch (error) {
                Message({
                    type: 'warning',
                    message: '上传失败:' + error
                })
            }
        }
    }
};
</script>

<style scoped>
.profile {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h2 {
    margin-bottom: 20px;
    color: #333;
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
}

.form-control {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.form-control-file {
    padding: 8px;
}

.btn {
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}

.btn:hover {
    background-color: #0056b3;
}
</style>