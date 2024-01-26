<template>
  <div class="learning-forum" :class="{ 'nav-collapsed': isNavCollapsed }">
    <el-container>
      <el-header height="40px"><!-- 头部区 -->
        <div>
          <img src="src/assets/icon-gitee.png" alt="" height="20px" />
          <span>My Graduation_design</span>
        </div>
      </el-header>
      <el-container>
        <div class="toggle-btn" @click="toggleNav">☰</div>
        <div class="navigation">
          <div class="nav-header">
            <div v-if="!isNavCollapsed" class="nav-title">
              <span style="font-size: 10px;">导航栏</span>
            </div>
          </div>
          <div v-if="!isNavCollapsed">
            <!-- 使用 $router.push 跳转 -->
            <div class="nav-item" :class="{ active: $route.path === '/Kali_Liunx' }" @click="$router.push('/Kali_Liunx')">
              Kali_Liunx</div>
            <div class="nav-item" :class="{ active: $route.path === '/myComments' }" @click="$router.push('/myComments')">
              评论区</div>
            <div class="nav-item" :class="{ active: $route.path === 'user_profile' }"
              @click="$router.push('/user/profile')">
              我的信息</div>
            <div class="nav-item"
              @click="$router.push('/myBlog')">
              论坛</div>
            <!-- 添加一些有意义的子菜单内容 -->
            <div class="sub-menu" @click="toggleSubMenu">
              <div class="menu-title">子菜单</div>
              <div v-if="isSubMenuVisible">
                <div class="sub-menu-item" @click="$router.push('/submenu/1')">子菜单项 1</div>
                <div class="sub-menu-item" @click="$router.push('/submenu/2')">子菜单项 2</div>
                <div class="sub-menu-item" @click="$router.push('/submenu/3')">子菜单项 3</div>
              </div>
            </div>
          </div>
        </div>
        <div class="user-info" @click="toggleUserInfo">
          <img src="user-avatar.jpg" alt="User Avatar" class="avatar" ref="userAvatar" />
          <div v-if="isUserInfoVisible" class="user-info-box" ref="userInfoBox">
            <div class="user-info-item" @click="$router.push('/dashboard')">Link 1</div>
            <div class="user-info-item" @click="$router.push('/profile')">Link 2</div>
            <div class="user-info-item" @click="$router.push('/link/1')">Link 3</div>
            <div class="user-info-item" @click="$router.push('/link/2')">Link 4</div>
            <div class="user-info-item" @click="$router.push('/link/3')">Link 5</div>
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
export default {
  data() {
    return {
      isNavCollapsed: false,
      isUserInfoVisible: false,
      isSubMenuVisible: false,
      key: 0,
    };
  },
  created() {
    this.$router.push('/Kali_Liunx')
  },
  methods: {
    toggleNav() {
      this.isNavCollapsed = !this.isNavCollapsed;
    },
    toggleUserInfo() {
      this.isUserInfoVisible = !this.isUserInfoVisible;
      if (this.isUserInfoVisible) {
        this.$nextTick(() => {
          this.positionUserInfoBox();
        });
      }
    },
    toggleSubMenu() {
      this.isSubMenuVisible = !this.isSubMenuVisible;
    },
    positionUserInfoBox() {
      const userInfoBox = this.$refs.userInfoBox;
      const userAvatar = this.$refs.userAvatar;
      if (userInfoBox && userAvatar) {
        const userInfoBoxRect = userInfoBox.getBoundingClientRect();
        const userAvatarRect = userAvatar.getBoundingClientRect();
        const top = userAvatarRect.top - userInfoBoxRect.height;
        const left = userAvatarRect.left + userAvatarRect.width / 2 - userInfoBoxRect.width / 2;
        userInfoBox.style.top = `${top}px`;
        userInfoBox.style.left = `${left}px`;
      }
    },
    logout() {
      // Add your logout logic here
    },
  },
};
</script>

<style scoped>
.learning-forum {
  display: flex;
  height: 100vh;
  overflow: hidden;
  transition: all 0.3s ease;
}

.nav-collapsed .navigation {
  width: 0;
}

.toggle-btn {
  cursor: pointer;
  padding: 10px;
  color: #fff;
  font-size: 20px;
  background-color: #333;
}

.navigation {
  width: 15%;
  background-color: #333;
  padding: 20px;
  color: #fff;
  transition: width 0.3s ease;
  position: relative;
}

.nav-item {
  position: relative;
  margin-bottom: 8px;
  /* 添加链接之间的小间隔 */
  padding-left: 10px;
  /* 添加左边距 */
}

.nav-item:first-child {
  margin-top: 8px;
  /* 第一个导航链接与上方有相同间隔 */
}

.nav-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(169, 169, 169, 0.5);
  /* 悬停时使用较低透明度的遮罩 */
  opacity: 0;
  border-radius: 5px;
  transition: opacity 0.3s ease, border-radius 0.3s ease;
}

.nav-item:hover::before {
  opacity: 0.2;
  /* 悬停时的透明度 */
}

.nav-item.active::before {
  opacity: 0.4;
  border-radius: 5px;
}

.nav-item.active {
  background-color: transparent;
  /* 被选中时背景透明 */
  color: #fff;
  /* 字体颜色不更改 */
}



.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #555;
}

.sub-menu {
  margin-top: 10px;
  cursor: pointer;
}

.menu-title {
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
}

.nav-item,
.sub-menu-item,
.user-info-item {
  cursor: pointer;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
}

.user-info {
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-info-box {
  position: absolute;
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.user-info-box router-link {
  color: #fff;
  text-decoration: none;
  padding: 5px 0;
}

.user-info-box router-link:hover {
  background-color: #555;
}

.user-info:hover .user-info-box {
  opacity: 1;
  transform: translateY(0);
}

.nav-title {
  font-size: 18px;
  font-weight: bold;
}

.navigation a {
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 10px 0;
  font-size: 16px;
}

.navigation a:hover {
  background-color: #555;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: margin 0.3s ease;
}

.xterm-container {
  flex: 1;
  overflow: hidden;
}

.comments {
  overflow: hidden;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 15px;
  /* 调整字体大小 */
  height: 40px;

  >div {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }
}</style>
