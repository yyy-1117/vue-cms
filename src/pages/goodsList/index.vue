<template>
  <scroller 
  :on-refresh="refresh" 
  :on-infinite="infinite" 
  ref="scroller"
  refreshText="下拉刷新列表"
  noDataText="已经没有数据了"
  refreshLayerColor="#226aff"
  loadingLayerColor="#226aff">
    <div class="goodsList-container">
      <div
        class="goods-items"
        v-for="(item) in goodsList"
        :key="item.id"
        @click="goDetail(item.id)"
      >
        <img :src="item.img_url" alt>
        <h1 class="title">{{item.title}}</h1>
        <div class="info">
          <p class="price">
            <span class="now">¥{{item.sell_price}}</span>
            <span class="old">¥{{item.market_price}}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </p>
        </div>
      </div>
    </div>
  </scroller>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1, // 默认显示第一页
      goodsList: [] // 商品数据
    };
  },
  mounted(){
    //   初次进入页面就刷新
      this.$refs.scroller.finishPullToRefresh()
  },
  methods: {
    // 获取商品数据
    getGoodsList(refresh) {  // 不传递参数默认 false
        // 可能需要拼接,也可能需要覆盖
    return  this.$http.get("getgoods?pageindex=" + this.pageIndex).then(result => {
        // console.log(result)
        if (result.body.status === 0) {
            if(refresh){
                this.goodsList = result.body.message;
            }else{
                this.goodsList = this.goodsList.concat(result.body.message);
            }
        } else {
          Toast("获取商品信息失败");
        }
      });
    },
    // 使用JS形式进行路由跳转
    goDetail(id) {
      this.$router.push("/home/goodsInfo/" + id);
    },
    refresh() {
      // 上拉刷新 重新获取第一页数据并渲染
    //   console.log(this.$refs.scroller)
    this.pageIndex = 1
    /* 
    调用此函数获取数据并渲染,此函数是发送请求是异步操作,所以需要当次函数执行完毕之后才能结束上拉动画,
    可以使用promise 的 .then 方法执行结束上拉动画的函数,需要在此函数中 return 一个新的 promise 对象
     */
    this.getGoodsList(true).then( () => {
         this.$refs.scroller.finishPullToRefresh()
    })
    },
    infinite() {
        setInterval(() => {
        //  下拉加载更多
        this.pageIndex++
        //  此时调用方法获取数据需要拼接,所以不用传参
        this.getGoodsList().then( () => {
        //   调用此方法停止下拉加载更多,需要传递参数告诉它是否已经没有数据了,由于服务器没有提供总数据,手动创建一个数据以便实现效果
        this.$refs.scroller.finishInfinite( this.goodsList.length === 15 )
      })
        }, 2000);
    }
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style lang="less">
.pull-to-refresh-layer{
    margin-top: -20px !important ;
}
._v-content{
    padding-bottom: 40px;
}
.goodsList-container {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .goods-items {
    width: 49%;
    margin-bottom: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-sizing: border-box;
    box-shadow: 0 0 6px #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 290px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
      padding: 0 5px;
    }
    .info {
      padding: 0 5px;
      background-color: #eee;
      p {
        margin: 0;
        color: black;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          margin-right: 5px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
