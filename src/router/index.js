import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

import homeComponent from '../pages/home'
import menberComponent from '../pages/menber'
import shopcarComponent from '../pages/shopcar'
import searchComponent from '../pages/search'


export default new Router({
  routes: [
    {path:'/',redirect:'/home'}, // 重定向
    {path:'/home',component:homeComponent},
    {path:'/menber',component:menberComponent},
    {path:'/shopcar',component:shopcarComponent},
    {path:'/search',component:searchComponent}
  ],
  linkActiveClass:"mui-active"  
})
