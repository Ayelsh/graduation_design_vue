<template>
  <div class="learning-forum" :class="{ 'nav-collapsed': isNavCollapsed }">
    <el-container>
      <el-header height="7vh"><!-- 头部区 -->
        <el-row style="display: flex; align-items: center;">
          <img src="@/assets/icon-gitee.svg" alt="" height="30px" />
          <span class="brand-name">My Graduation Design</span>
          <div class="user-info">
            <img class="avatar" :src=imageUrl alt="User Avatar" @click="toggleUserInfo" />
            <div class="user-info-box" v-if="isUserInfoVisible">
              <router-link :to="{ name: 'user_profile' }" class="user-info-item">个人信息</router-link>
              <router-link v-if="userType" :to="{ name: 'UserControl' }" class="user-info-item">用户管理</router-link>
              <router-link v-if="userType" :to="{ name: 'postControlPage' }" class="user-info-item">帖子管理</router-link>
              <router-link v-if="userType" :to="{ name: 'resourceControlPage' }" class="user-info-item">资源管理</router-link>
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
            <router-link to="/resources" class="nav-item"
              :class="{ active: $route.name === 'resources' }">资源中心</router-link>
            <router-link to="/encode" class="nav-item" :class="{ active: $route.name === 'encode' }">密码加解密</router-link>
            <router-link :to="{ name: 'updateUserInfo' }" class="nav-item"
              :class="{ active: $route.name === 'updateUserInfo' }">修改我的信息</router-link>
            <router-link :to="{ name: 'KaliLiunx' }" class="nav-item"
              :class="{ active: $route.name === 'KaliLiunx' }">Kali攻击机</router-link>
            <router-link :to="{ name: 'MsfLiunx' }" class="nav-item"
              :class="{ active: $route.name === 'MsfLiunx' }">MSF靶机</router-link>
          </div>
        </div>
        <keep-alive>
          <div class="content">
            <router-view></router-view>
          </div>
        </keep-alive>
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
      imageUrl: localStorage.getItem('avatar'),
      userType: localStorage.getItem('userType') === '管理员' ? true : false
    };
  },
  created() {
    this.imageUrl = localStorage.getItem('avatar')
    console.log(this.imageUrl)
    if (localStorage.getItem('userType') === '管理员') {
      this.$router.addRoute(
        {
          path: '/index',
          component: () => import("@/components/myIndex.vue"),//懒加载
          meta: { requireAuth: true },
          children: [
            {
              path: '/user/userControl',
              name: 'UserControl',
              meta: { requireAuth: true },
              component: () => import("@/components/User/userControlPage.vue")
            },
            {
              path: '/postControlPage',
              name: 'postControlPage',
              meta: { requireAuth: true },
              component: () => import("@/components/Actricle/ActricleControl.vue")
            },
            {
              path: '/resourceControlPage',
              name: 'resourceControlPage',
              meta: { requireAuth: true },
              component: () => import("@/components/Anthor/resourceControl.vue")
            },
          ]
        }
      )
    }


  },
  mounted() {
    // 导航到论坛页面
    console.log(this.userType)
    this.imageUrl = localStorage.getItem('avatar')
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

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin 0.3s ease;
  overflow: auto;
  height: 93vh;
  /* overflow-x: hidden; */
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
  margin-top: 5px;
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

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
