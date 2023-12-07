// 1.导入vue 、 路由模块 和 登录组件模块
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/myLogin.vue'
// 2.全局注册路由
Vue.use(Router)

// 3.配置路由规则
const router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
  ]
})

// 4.导出路由对象
export default router
