import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from '@/router/index.js'
// main.js中引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//全局css样式
import "@/assets/styles.css"
//引入请求配置
import axios from "axios";
import './network/axios_config';
//全局存储
import vuex from 'vuex';
import store from './store/store.js';
//粒子动画
import VueParticles from 'vue-particles'
//全局方法
import globalMethods from './utils/globalMethods';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js' 
//导入代码高亮文件
import 'highlight.js/styles/googlecode.css'; 

Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('code,pre');
  highlight.forEach((block)=>{
      if(block){
          hljs.highlightBlock(block);
      }
  })
})

Vue.prototype.$axios = axios;
Vue.prototype.$globalMethods = globalMethods;
Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.use(vuex);
Vue.use(VueParticles);

router.beforeEach((to, from, next) => {

  const isAuthenticated = localStorage.getItem('token');/* 判断用户是否已登录，例如从后端获取用户信息判断 */
  if (to.meta.requireAuth && !isAuthenticated) {
    // 如果需要登录但用户未登录，则跳转到登录页面
    next('/');
  } else {
    // 如果不需要登录或用户已登录，则允许路由跳转
    next();
  }
});

new Vue({
  //全局注册router
  router,
  store,
  render: h => h(App),
}).$mount('#app')
