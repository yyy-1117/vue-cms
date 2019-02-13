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

// 引入 moment 时间格式化插件
import moment from 'moment'

// 定义全局过滤器
Vue.filter('datastr',(data,patent = 'YYYY-MM-DD HH-mm-ss') =>{
  return moment(data).format(patent)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
