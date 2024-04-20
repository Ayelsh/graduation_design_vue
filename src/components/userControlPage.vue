<template>
  <div class="user-management">
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="搜索用户" class="search-input" />
    </div>

    <ul class="user-list">
      <li v-for="user in filteredUsers" :key="user.id" class="user-item">
        <div class="user-info">
          <span class="user-name">{{ user.nickName }}</span>
          <span class="user-email">{{ user.email }}</span>
          <span class="user-sex">{{ user.sex }}</span>
        </div>
        <div class="user-actions">
          <button @click="editUser(user)" class="edit-button">编辑</button>
          <button @click="deleteUser(user.userName)" class="delete-button">删除</button>
        </div>
      </li>
    </ul>

    <button @click="showAddModal" class="add-button">添加用户</button>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ editingUser ? '编辑用户' : '添加用户' }}</h2>

        <form @submit.prevent="saveUser" class="user-form">
          <input type="text" v-model="form.userName" placeholder="用户名" required class="form-input" />
          <input type="text" v-model="form.nickName" placeholder="昵称" required class="form-input" />
          <input type="password" v-model="form.password" placeholder="密码(为空表示不修改/默认密码)"  class="form-input" />
          <input type="email" v-model="form.email" placeholder="邮箱" required class="form-input" />
          <input type="text" v-model="form.phoneNumber" placeholder="手机号" required class="form-input" />
          <select v-model="form.status" required class="form-select">
            <option value="0">正常</option>
            <option value="1">停用</option>
          </select>
          <select v-model="form.sex" required class="form-select">
            <option value="0">男</option>
            <option value="1">女</option>
            <option value="2">未知</option>
          </select>
          <div class="form-group avatar-group">
            <label for="avatar" class="form-label">上传头像：</label>
            <input type="file" @change="handleAvatarUpload" accept="image/*" class="form-control-file" />
          </div>
          <button type="submit" class="submit-button">{{ editingUser ? '保存' : '添加' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';

// import { Message } from 'element-ui';

export default {
  data() {
    return {
      users: [],
      searchQuery: '',
      showModal: false,
      editingUser: null,
      form: {
        id: null,
        userName: '',
        nickName: '',
        password: '',
        status: 0,
        email: '',
        phoneNumber: '',
        sex: 0,
        avatar: ''
      }
    };
  },
  mounted() {
    this.initUserList();
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user =>
        user.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    initUserList() {
      // 初始化用户列表的方法
      this.$axios.get('/user/').then((res) => {
        if (res.code === 200) {
          this.users = res.data;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.error(err);
        this.$message.error('获取用户列表失败，请稍后重试');
      });
    },
    showAddModal() {
      this.editingUser = null;
      this.showModal = true;
    },
    editUser(user) {
      this.editingUser = user;
      this.form.id = user.id;
      this.form.userName = user.userName;
      this.form.nickName = user.nickName;
      this.form.password = user.password;
      this.form.status = user.status;
      this.form.email = user.email;
      this.form.phoneNumber = user.phoneNumber;
      this.form.sex = user.sex;
      this.showModal = true;
    },
    saveUser() {
      if (this.editingUser) {
        //编辑
        const index = this.users.findIndex(user => user.id === this.form.id);
        if (index !== -1) {
          this.form.status = parseInt(this.form.status)
          this.form.sex = parseInt(this.form.sex)
          this.$axios.post('/user/userUpdate', this.form).then((res) => {
            if (res.code === 200) {
              this.$message.success('用户修改成功');
              
              this.users[index] = { ...this.form };
              this.closeModal();
            } else {
              this.$message.error(res.msg);
            }
          })
        }
        } else {
          console.log(1111111111);
          this.$axios.post('/user/addUser', this.form).then((res) => {
            if (res.code === 200) {
              this.form.sex = this.form.sex? '女':'男'
              this.users.push(this.form);
              this.$message.success('用户添加成功');
              this.showModal =false
            } else {
              this.$message.error(res.msg);
              this.closeModal();
            }
          }).catch(err => {
            console.error(err);
            this.$message.error('添加用户失败，请稍后重试');
            this.closeModal();
          });
        }
    },
    deleteUser(userName) {
      
      var url = '/user/'+userName
      this.$axios.delete(url).then((res)=>{
        if(res.code === 200){
          Message({
            type:'success',
            message:'用户删除成功'
          })
          this.initUserList();
        }else{
          Message({
            type:'error',
            message:res.msg+res.data
          })}
      })
    },
    handleAvatarUpload(event) {
      const file = event.target.files[0];
      const avatarData = new FormData();
      avatarData.append('file', file);

      try {
        const response = this.$axios.post('/File/uploadAvatar', avatarData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        if (response.code === 200) {
          this.$message.success('上传成功');
          this.form.avatar = response.data;
        }
      } catch (error) {
        this.$message.warning('上传失败:' + error);
      }
    },
    closeModal() {
      this.editingUser = null;
      this.form.id = null;
      this.form.userName = '';
      this.form.nickName = '';
      this.form.password = '';
      this.form.status = 0;
      this.form.email = '';
      this.form.phoneNumber = '';
      this.form.sex = 0;
      this.form.avatar = '';
      this.showModal = false;
    },
    isFormEmpty() {
      return !(
        this.form.userName &&
        this.form.nickName &&
        this.form.password &&
        this.form.email &&
        this.form.phoneNumber &&
        this.form.status &&
        this.form.sex
      );
    }
  }
};
</script>

<style scoped>
.user-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.user-list {
  list-style: none;
  padding: 0;
}

.user-item {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.user-info {
  flex: 1;
}

.user-name,
.user-email,
.user-sex {
  font-weight: bold;
  margin-right: 10px;
}

.user-actions {
  display: flex;
  align-items: center;
}

.edit-button,
.delete-button,
.submit-button,
.add-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button:hover,
.delete-button:hover,
.submit-button:hover,
.add-button:hover {
  background-color: #0056b3;
}

.modal-overlay {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #fff;
  position: relative;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  width: 100%;
}

.close {
  height: 100%;
  color: black;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.form-input,
.form-select,
.form-control-file {
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.form-input:focus,
.form-select:focus,
.form-control-file:focus {
  outline: none;
  border-color: #007bff;
}

.form-select {
  appearance: none;
  background-image: url('data:image/svg+xml;charset=utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpolyline points="6 9 12 15 18 9"%3E%3C/polyline%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 16px;
  padding-right: 30px;
}

.form-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.submit-button {
  background-color: #28a745;
}

.submit-button:hover {
  background-color: #218;
}

.form-group {
  margin-bottom: 20px;
}

.avatar-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.avatar-group input[type="file"] {
  display: block;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .user-item {
    flex-direction: column;
  }

  .user-info {
    margin-bottom: 10px;
  }

  .user-actions {
    flex-direction: column;
  }

  .edit-button,
  .delete-button {
    margin-top: 10px;
    margin-right: 0;
  }
}
</style>
