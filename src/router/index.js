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
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import("@/components/Login/myLogin.vue")
  },
  {
    path: '/forget',
    component: () => import("@/components/Login/myForget.vue")
  },
  {
    path: '/register',
    component: () => import("@/components/Login/myRegister.vue"),
  },
  {
    path: '/index',
    component: () => import("@/components/myIndex.vue"),//懒加载
    meta: { requireAuth: true },
    children: [
      

      {
        path: '/encode',
        name: 'encode',
        meta: { requireAuth: true },
        component: () => import("@/components/Anthor/myEncode.vue")
      },
      {
        path: '/Liunx/Kali',
        name: 'KaliLiunx',
        meta: { requireAuth: true },
        component: () => import("@/components/Liunx/myWebSSH.vue")
      },
      {
        path: '/Liunx/Msf',
        name: 'MsfLiunx',
        meta: { requireAuth: true },
        component: () => import("@/components/Liunx/msfWebSSH.vue")
      },
      {
        path: '/resources',
        name: 'resources',
        meta: { requireAuth: true },
        component: () => import("@/components/Anthor/resourcesCard.vue")
      },
      {
        path: '/resourceControlPage',
        name: 'resourceControlPage',
        meta: { requireAuth: true },
        component: () => import("@/components/Anthor/resourceControl.vue")
      },
      {
        path: '/user/profile',
        name: 'user_profile',
        meta: { requireAuth: true },
        component: () => import("@/components/User/myUserInfo.vue")
      },
      {
        path: '/user/updateProfile',
        name: 'updateUserInfo',
        meta: { requireAuth: true },
        component: () => import("@/components/User/updateUserInfo.vue")
      },
      {
        path: '/contentPage',
        meta: { requireAuth: true },
        component: () => import("@/components/Actricle/contentPage.vue")
      },
      {
        path: '/myBlog',
        name: 'myBlog',
        meta: { requireAuth: true },
        component: () => import("@/components/Actricle/myBlog.vue"),
      },
      {
        path: '/postPage',
        name: 'postPage',
        meta: { requireAuth: true },
        component: () => import("@/components/Actricle/myPostPage.vue")
      },

    ]//如果有孩子
  },
  ],
  
})
/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if(isChunkLoadFailed){
    // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
      location.reload();
      // const targetPath = $router.history.pending.fullPath;
      // $router.replace(targetPath);
  }
  
});

// 4.导出路由对象
export default router
