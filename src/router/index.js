import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// 引入组件  @ 相当于 scr 目录
import homeComponent from '@/pages/home'
import menberComponent from '@/pages/menber'
import shopcarComponent from '@/pages/shopcar'
import searchComponent from '@/pages/search'
import newsListComponent from '@/pages/newsList'
import newsInfoComponent from '@/pages/newsInfo'


export default new Router({
  routes: [
    {path:'/',redirect:'/home'}, // 重定向
    {path:'/home',component:homeComponent},
    {path:'/menber',component:menberComponent},
    {path:'/shopcar',component:shopcarComponent},
    {path:'/search',component:searchComponent},
    {path:'/home/newsList',component:newsListComponent},
    {path:'/home/newsList',component:newsListComponent}
  ],
  linkActiveClass:"mui-active"  
})
