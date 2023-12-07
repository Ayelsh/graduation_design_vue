import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from '@/router/index.js'
// main.js中引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入请求配置
import axios from "axios";
import './network/axios_config';
import vuex from 'vuex';
import store from './store/store.js';

Vue.prototype.$http = axios;
Vue.use(ElementUI);
Vue.use(vuex);

new Vue({
  //全局注册router
  router,
  store,
  render: h => h(App),
}).$mount('#app')
