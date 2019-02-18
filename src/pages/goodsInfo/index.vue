<template>
  <div class="goodsInfo-container">

    <transition 
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
    <div class="ball" v-show="flag" ref="ball"></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item) in swipes" :key="item.src">
              <img :src="item.src" alt>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            <span class="old_price">市场价:¥{{goodsInfo.market_price}}</span>&nbsp;&nbsp;
            销售价:
            <span class="now_price">¥{{goodsInfo.sell_price}}</span>
          </p>
          <div class="numbox">
            <span class="title">购买数量:</span>&nbsp;&nbsp;
            <!-- 如果 buyCount 大于等于2 buyCount--   buyCount 等于1 就禁用按钮 -->
            <input type="button" value="-" 
            @click=" buyCount >=2 && buyCount--" 
            :disabled="buyCount == 1">
            <input type="number" v-model="buyCount" @change="filterMaxCount">
            <!-- 如果 buyCount 小于等于库存数量 buyCount++   buyCount 等于库存 就禁用按钮 -->
            <input type="button" value="+" 
            @click=" buyCount < goodsInfo.stock_quantity && buyCount++"  
            :disabled="buyCount == goodsInfo.stock_quantity">

          </div>
           <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品參數</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p>
                商品货号:{{goodsInfo.goods_no}}
            </p>
            <p>
                库存情况:{{goodsInfo.stock_quantity}}件
            </p>
            <p>
                上架时间:{{goodsInfo.add_time | datastr }}
            </p>
        </div>
      </div>
      <div class="mui-card-footer">
        <p>
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        </p>
        <p>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id: this.$route.params.id, // 存储URL传递过来的参数
      swipes: [], // 商品轮播图数据
      buyCount:1,  // 默认购买商品数
      goodsInfo:{},  // 商品详情数据
      flag:false
    };
  },
  methods: {
    // 获取商品轮播图数据
    getSwipes() {
      this.$http.get("getthumimages/" + this.id).then(result => {
        // console.log(result)
        if (result.body.status === 0) {
          this.swipes = result.body.message;
        } else {
          Toast("获取轮播图失败");
        }
      });
    },
    // 获取商品详情信息
    getGoodsInfo(){
        this.$http.get('goods/getinfo/'+ this.id).then( result => {
            // console.log(result)
            if(result.body.status === 0){
                this.goodsInfo = result.body.message[0]
            }else{
                Toast('获取商品详情失败')
            }
        })
    },
    // 限制最大值
    filterMaxCount(){
        if(this.buyCount > this.goodsInfo.stock_quantity){
            this.buyCount = this.goodsInfo.stock_quantity
        }
    },
    // 跳转到图文介绍
    goDesc(id){
        this.$router.push('/home/goodsDesc/'+ id)
    },
    // 跳转到商品评论
    goComment(id){
        this.$router.push('/home/goodsComment/'+ id)
    },
    // 添加到购物车
    addToShopCar(){
      this.flag = !this.flag

      // 将商品的 id 数量 价格 存储到 state 中
      this.$store.commit("addToCar", {
        id:this.id,
        count:this.buyCount,
        price:this.goodsInfo.sell_price,
        flag:true

      })
    },
    beforeEnter(el){
      el.style.transform = "translate(0, 0)"
    },
    enter(el,doen){
      el.offsetWidth;

      //  获取小球在页面中的位置
      let ball = this.$refs.ball.getBoundingClientRect()
      //  获取徽标在页面中的位置
      let badge = document.getElementById('badge').getBoundingClientRect()

      // 获取小球在不同设备下到徽标的移动距离
      let xDist = badge.left - ball.left
      let yDist = badge.top - ball.top


      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)"
      doen()
    },
    afterEnter(el){
      this.flag = !this.flag
    }
  },
  created() {
    this.getSwipes();
    this.getGoodsInfo()
  }
};
</script>

<style lang="less">
.goodsInfo-container {
  position: relative;
  .mint-swipe {
    height: 200px;
    text-align: center;
    img {
      height: 100%;
    }
  }
  .price{
      font-size: 14px;
      .old_price{
          text-decoration: line-through;
      }
      .now_price{
          color: red;
      }
  }
  .numbox{
    display: flex;
    height: 50px;
    align-items: center;
     .title{
         color: black;
     }
     input{
        width: 35px;
        height: 35px;
        padding: 0;
        margin: 0;
        text-align: center;
        border-radius: 0;
         &[type="number"]{
            border-left: 0;
            border-right: 0;
            font-size: 12px;
            color: gray;
         }
         &[type="button"]{
             background-color: #eee;
         }
     }
  }
  .mui-card-footer{
      display: block;
  }
  .ball{
    width: 15px;
    height: 15px;
    background-color: red;
    position: absolute;
    left: 136px;
    top: 349px;
    border-radius: 50%;
    z-index: 99;
  }
}
</style>