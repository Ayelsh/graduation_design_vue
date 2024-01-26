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
  }, {
    path: '/register',
    component: () => import("@/components/myRegister.vue"),//懒加载
    children: [
    ]//如果有孩子
  },
  {
    path: '/index',
    component: () => import("@/components/myIndex.vue"),//懒加载
    children: [
      {
      path: '/Kali_Liunx',
      name: 'Kali_Liunx',
      component: () => import("@/components/myWebSSH.vue")
    },
    {
      path: '/myComments',
      name: 'myComments',
      component: () => import("@/components/myComments.vue")
    },
    {
      path: '/user/profile',
      name: 'user_profile',
      component: () => import("@/components/myUserInfo.vue")
    },
    {
      path: '/myBlog',
      name: 'myBlog',
      component: () => import("@/components/myBlog.vue")
    },
    
    ]//如果有孩子
  },



  ],
  mode: 'history'
})

// 4.导出路由对象
export default router
