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
import photoListComponent from '@/pages/photoList'
import photoInfoComponent from '@/pages/photoInfo'
import goodsListComponent from '@/pages/goodsList'
import goodsInfoComponent from '@/pages/goodsInfo'
import goodsDescComponent from '@/pages/goodsDesc'
import goodsCommentComponent from '@/pages/goodsComment'


export default new Router({
  routes: [
    {path:'/',redirect:'/home'}, // 重定向
    {path:'/home',component:homeComponent},
    {path:'/menber',component:menberComponent},
    {path:'/shopcar',component:shopcarComponent},
    {path:'/search',component:searchComponent},
    {path:'/home/newsList',component:newsListComponent},
    {path:'/home/newsInfo/:id',component:newsInfoComponent},
    {path:'/home/photoList',component:photoListComponent},
    {path:'/home/photoInfo/:id',component:photoInfoComponent},
    {path:'/home/goodsList',component:goodsListComponent},
    {path:'/home/goodsInfo/:id',component:goodsInfoComponent},
    {path:'/home/goodsDesc/:id',component:goodsDescComponent},
    {path:'/home/goodsComment/:id',component:goodsCommentComponent}
  ],
  linkActiveClass:"mui-active"  
})
