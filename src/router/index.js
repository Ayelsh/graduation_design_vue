// 1.导入vue 、 路由模块 和 登录组件模块
import Vue from 'vue'
import Router from 'vue-router'
// 2.全局注册路由
Vue.use(Router)

import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 3.配置路由规则
const router = new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import("@/components/myLogin.vue")
  },
  {
    path: '/register',
    component: () => import("@/components/myRegister.vue"),//懒加载
    children: [
    ]//如果有孩子
  },
  {
    path: '/index',
    component: () => import("@/components/myIndex.vue"),//懒加载
    meta: { requireAuth: true },
    children: [
      {
        path: '/resources',
        name: 'resources',
        meta: { requireAuth: true },
        component: () => import("@/components/resourcesCard.vue")
      },
      {
        path: '/encode',
        name: 'encode',
        meta: { requireAuth: true },
        component: () => import("@/components/myEncode.vue")
      },
      {
        path: '/Liunx/Kali',
        name: 'KaliLiunx',
        meta: { requireAuth: true },
        component: () => import("@/components/myWebSSH.vue")
      },
      {
        path: '/Liunx/Msf',
        name: 'MsfLiunx',
        meta: { requireAuth: true },
        component: () => import("@/components/msfWebSSH.vue")
      },
      {
        path: '/Liunx/Level1',
        name: 'Level1',
        meta: { requireAuth: true },
        component: () => import("@/components/myCipherPage.vue")
      },
      {
        path: '/Liunx/Level2',
        name: 'Level2',
        meta: { requireAuth: true },
        component: () => import("@/components/myAttackPage.vue")
      },
      {
        path: '/user/profile',
        name: 'user_profile',
        meta: { requireAuth: true },
        component: () => import("@/components/myUserInfo.vue")
      },
      {
        path: '/user/updateProfile',
        name: 'updateUserInfo',
        meta: { requireAuth: true },
        component: () => import("@/components/updateUserInfo.vue")
      },
      {
        path: '/contentPage',
        meta: { requireAuth: true },
        component: () => import("@/components/contentPage.vue")
      },
      {
        path: '/myBlog',
        name: 'myBlog',
        meta: { requireAuth: true },
        component: () => import("@/components/myBlog.vue"),
        // children: [
        //   {
        //     path: '/postPage',
        //     name: 'postPage',
        //     component: () => import("@/components/myPostPage.vue")
        //   },
        // ]
      },
      {
        path: '/postPage',
        name: 'postPage',
        meta: { requireAuth: true },
        component: () => import("@/components/myPostPage.vue")
      },

    ]//如果有孩子
  },



  ],
  mode: 'history'
})

// 4.导出路由对象
export default router
