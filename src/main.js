import Vue from 'vue'
import App from './App'
import router from './router'

// 1. 导入 vue-resource 发送请求
import VueResource from 'vue-resource'
// 2. 安装 vue-resource
Vue.use(VueResource)

// 1.引入完整的 mint-ui 和 css 
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//  2.安装mint-ui 
Vue.use(MintUI)

// 初始化css样式
import './css/common.css'

//  引入mui css
import './lib/mui/css/mui.min.css'

// 引入 mui 扩展的字体图标样式
import './lib/mui/css/icons-extra.css'

// 设置vue-resource 根目录
Vue.http.options.root = 'http://www.lovegf.cn:8899/api/';
// 设置 post 请求时的请求格式  application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 引入 vue-scroller 插件, 实现上拉刷新下拉加载更多
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
// 引入 vuex
import Vuex from 'vuex'
Vue.use(Vuex)


//  进入页面就获取本地存储的购物车数据,如果没有就返回一个空数组,然后将它赋予给 car
let car = JSON.parse(localStorage.getItem("car") || "[]")

// 创建Vue.Store 实例
let store = new Vuex.Store({
  state:{
    car:car// 存储购物车数据
  },
  mutations:{
    // 1.将商品添加到购物车,如果商品已经存在就只修改 count 
    // 2.如果商品不存在就 push 到购物车中
    addToCar(state,goodsInfo){
      // findIndex 找索引 如果不存在返回 -1
    // let index = state.car.findIndex( item => {
    //     // 表示商品已经存在
    //     if(item.id === goodsInfo.id){
    //       item.count += goodsInfo.count
    //       return true
    //     }
    //   })
    //   if(index == -1){
    //     state.car.push(goodsInfo)
    //   }

    let index = state.car.findIndex( item => {
      if(item.id == goodsInfo.id){
        return true
      }
    })
    if(index == -1){
      state.car.push(goodsInfo)
    }else{
      state.car[index].count += goodsInfo.count
    }

    // 刷新页面购物车徽标的数据会清空,所以需要将数据存储到本地 
    localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{
    // 同步徽标的数据
    totalCount(state){
      let sum = 0;
      state.car.forEach(item => {
        sum += item.count
      });
      return sum
    }
  }
})
// 引入 moment 时间格式化插件
import moment from 'moment'

// 定义全局过滤器
Vue.filter('datastr',(data,patent = 'YYYY-MM-DD HH-mm-ss') =>{
  return moment(data).format(patent)
})

// 引入缩略图插件
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

// 引入评论子组件
import comment from './components/comment'
// 注册全局评论子组件
Vue.component('comment-box',comment)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,  // 将 store 数据仓库挂载到Vue实例上
  render: h => h(App)
})
