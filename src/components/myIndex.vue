<template>
  <div class="learning-forum" :class="{ 'nav-collapsed': isNavCollapsed }">
    <el-container>
      <el-header height="50px"><!-- 头部区 -->
        <el-row style="display: flex; align-items: center;">
          <img src="@/assets/icon-gitee.svg" alt="" height="30px" />
          <span class="brand-name">My Graduation Design</span>
          <div class="user-info" @click="toggleUserInfo">
            <img class="avatar" src="@/assets/user-admin.jpg" alt="User Avatar" />
            <div class="user-info-box" v-if="isUserInfoVisible">
              <router-link :to="{ name: 'user_profile' }" class="user-info-item">个人信息</router-link>
              <a href="#" class="user-info-item">设置</a>
              <a class="user-info-item" @click="logout">退出登录</a>
            </div>
          </div>
        </el-row>
      </el-header>
      <el-container>

        <div class="navigation" :class="{ 'nav-collapsed': isNavCollapsed }">
          <div class="toggle-btn" @click="toggleNav">☰</div>
          <div class="nav-header">
            <div class="nav-title">导航栏</div>
          </div>
          <div>
            <router-link to="/myBlog" class="nav-item" :class="{ active: $route.name === 'myBlog' }">论坛</router-link>
            <router-link :to="{ name: 'updateUserInfo' }" class="nav-item"
              :class="{ active: $route.name === 'updateUserInfo' }">修改我的信息</router-link>
            <router-link :to="{ name: 'KaliLiunx' }" class="nav-item"
              :class="{ active: $route.name === 'KaliLiunx' }">Kali攻击机</router-link>
            <router-link :to="{ name: 'MsfLiunx' }" class="nav-item"
              :class="{ active: $route.name === 'MsfLiunx' }">MSF靶机</router-link>
            <div class="sub-menu" @click="toggleSubMenu">
              <div class="menu-title">Linux</div>
              <transition name="fade">
                <div v-if="isSubMenuVisible">

                  <router-link class="sub-menu-item" :to="{ name: 'Level1' }">Level1：破译</router-link>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Message } from 'element-ui';

export default {
  data() {
    return {
      isNavCollapsed: false,
      isUserInfoVisible: false,
      isSubMenuVisible: false,
    };
  },
  mounted() {
    // 导航到论坛页面
    this.$router.push({ name: 'myBlog' });
  },
  methods: {
    toggleNav() {
      this.isNavCollapsed = !this.isNavCollapsed;
    },
    toggleUserInfo() {
      this.isUserInfoVisible = !this.isUserInfoVisible;
    },
    toggleSubMenu() {
      this.isSubMenuVisible = !this.isSubMenuVisible;
    },
    logout() {
      var url = "/user/logout"
      this.$axios.delete(url).then((response) => {
        console.log(response)
        if (response.code === 200) {
          localStorage.clear();
          this.$router.push({ path: "/login" })
        } else {
          Message({
            message: '登出失败',
            type: 'warning'
          })
        }
      }).catch((error) => {
        console.log("请求失败" + error);
      });

    }
  },
};
</script>

<style scoped>
* {
  user-select: none;

}

.learning-forum {
  display: flex;
  height: 100vh;
  transition: all 0.3s ease;
}

.el-header {
  background-color: #303030;
  color: #ffffff;
}

.brand-name {
  margin-left: 10px;
  font-size: 20px;
}

.user-info {
  margin-left: auto;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-info-box {
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.user-info:hover .user-info-box {
  opacity: 1;
}

.user-info-item {
  display: block;
  color: #303030;
  padding: 8px;
  
  white-space: nowrap;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.user-info-item:hover {
  background-color: #f0f0f0;
}

.toggle-btn {
  cursor: pointer;
  padding: 10px;
  color: #ffffff;
  font-size: 20px;
  background-color: #303030;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background-color: #404040;
}

.navigation {
  background-color: #404040;
  color: #ffffff;
  transition: all 0.3s ease;
}

.nav-header {
  padding: 10px 20px;
  border-bottom: 1px solid #505050;
}

.nav-title {
  font-size: 18px;
  font-weight: bold;
}

.nav-item {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #ffffff;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: #505050;
}

.active {
  background-color: #505050;
}

.sub-menu {
  padding: 10px 20px;
}

.menu-title {
  font-size: 16px;
  color: #c0c0c0;
}

.sub-menu-item {
  padding: 8px 20px;
  color: #ffffff;
  text-decoration: none;
  display: block;
  transition: all 0.3s ease;
}

.sub-menu-item:hover {
  background-color: #505050;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin 0.3s ease;
}

.nav-collapsed .navigation {
  width: 60px;
}

.nav-collapsed .nav-header,
.nav-collapsed .nav-item,
.nav-collapsed .sub-menu,
.nav-collapsed .sub-menu-item {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}
</style>
