import axios from 'axios'
import router from '../router'
// import store from '../store/store'
//单独引入element的Message组件，以使用
import { Message } from 'element-ui'

//配置基础url、超时时间、post请求头

// axios.defaults.baseURL = 'http://192.168.44.129:8989';
axios.defaults.baseURL = 'http://127.0.0.1:80';
axios.defaults.timeout = 500000;
axios.defaults.headers.post['Content-Type'] = 'application/json';

//------------------请求拦截-------------------//
//------------在发送请求之前做些什么------------//
axios.interceptors.request.use(config => {

    const token = localStorage.getItem('token');
    // console.log('token:',token.slice(1, token.length - 1))
    if (token) {
        config.headers.token = token.slice(1, token.length - 1)
    }
    // console.log("请求查看："+config)
    return config;
}, err => {
    console.log("请求拦截=>", err);
    return err;
})

//------------------响应拦截-------------------//
//-------------对响应数据做点什么-------------//
axios.interceptors.response.use(res => {
    // console.log("响应拦截=>", res.data);
    // console.log('响应头：',res.headers.authorization)
    //例：后端数据处理错误，并返回错误原因；前端获取错误原因并展示
    if(res.headers.authorization){

        
        Message({
            message: '刷新token',
            type: 'warning'
        })
        const retoken = res.headers.authorization
        localStorage.setItem('token', JSON.stringify(retoken));
        console.log('刷新token：'+ retoken)
    }
    if (res.data.code === 505) {
        Message({
            message: res.data.data.message + '，请重新登录！',
            type: 'warning'
        });
        router.push("/login")
    
    }
    // console.log(res);
    return res ? res.data : res;
}, err => {
    console.log(err);
    
    //打印完整的错误信息
    console.log("响应拦截错误完整信息=>",err.response)
    //也可以在这里对不同的错误码做不同的展示处理
    throw err;
})
