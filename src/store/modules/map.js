const state = {
    token: null,
    isShow: false, // 默认不显示
    tableList: [], // 表格数据
    infoData: null, // 表格当前行数据
    cityCode: '110099', //城市的行政编码
    resourceTab: "fileM",//当前选中的tab资源管理
    kindCode: '', // 种别代码
    foodOptions: '', // 风味列表
    userInfo:''
  };
  
  // getters计算属性
  const getters = {
      getDemoValue: state => state.cityCode
  };
  
  // actions异步请求处理
  const actions = {};
  
  // mutations主要用来操作state
  const mutations = {
    setToken (state, token) { // 布尔值 true
      // console.log('Mutation setToken called');
      state.token = token;
      // console.log("token:"+token)
      localStorage.setItem('token', JSON.stringify(token));
      // console.log(JSON.parse(localStorage.getItem('token')))
    },
    setUserInfo(state,userInfo){
      state.userInfo = userInfo;
      console.log('userInfoX:',state.userInfo)
    },
    setIsShow (state, isShow) { // 布尔值 true
      state.isShow = isShow;
    },
    CHANGE_KINDCODE (state, kindCode) { // 字符串 ''
      state.kindCode = kindCode;
    },
    setSelectedData (state, data) { // 数组 []
      state.tableList = data;
    },
    setInfoData (state, infoData) { // null
      state.infoData = infoData;
    },
    setCityCode (state, cityCode) {  // 固定值
      state.cityCode = cityCode
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  }
  