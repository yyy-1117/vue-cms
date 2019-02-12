<template>
  <div>
    <!-- <h1>homeComponent</h1> -->
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in swipes" :key="index">
        <a :href="item.url">
          <img :src="item.img" alt>
        </a>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 六宫格 -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/menu1.png" alt="">
            <div class="mui-media-body">新闻资讯</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/menu2.png" alt="">            
            <div class="mui-media-body">图片分享</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/menu3.png" alt="">            
            <div class="mui-media-body">商品购买</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/menu4.png" alt="">            
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/menu5.png" alt="">            
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/menu6.png" alt="">            
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      swipes: []
    };
  },
  created() {
    this.getSwipe();
  },
  methods: {
    getSwipe() {
      this.$http.get("http://www.lovegf.cn:8899/api/getlunbo").then(result => {
        // console.log(result)
        this.swipes = result.body.message;
      });
    }
  }
};
</script>

<style lang="less">
.mint-swipe {
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border: none;
    img{
        width: 60px;
        height: 60px;
    }
    .mui-media-body{
        font-size: 14px !important
    }
}
</style>

