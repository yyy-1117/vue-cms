<template>
  <div class="shopcar-container">
        <div class="mui-card-content-inner mui-card">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media item">
                <mt-switch v-model="flag"></mt-switch>&nbsp;&nbsp;
                <img class="mui-media-object mui-pull-left" src="http://www.dcloud.io/hellomui/images/shuijiao.jpg">
                <div class="mui-media-body">
                    <span class="title">标题</span>
                  <div class="mui-ellipsis">
                      <span class="price">¥1111</span>
                          <input type="button" value="-">
                          <input type="number">
                          <input type="button" value="+">
                  <a href="javascript:;">删除</a>
                  </div>
                </div>
            </li>
          </ul>
      </div>
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
                        <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red"></span> 件， 总价
              <span class="red">￥</span>
            </p>
          </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            flag:false
        }
    },
};
</script>

<style lang="less">
.shopcar-container{
    .item{
        display: flex;
        align-items: center;
        .title{
            font-size: 14px;
            font-weight: bolder;
        }
        .price{
            color: red;
            font-weight: bolder;
        }
         input{
            width: 30px;
            height: 30px;
            padding: 0;
            margin: 0;
            text-align: center;
            border-radius: 0;
            &[type="number"]{
                font-size: 12px;
                color: gray;
            }
            &[type="button"]{
                background-color: #eee;
            }
         }
         .jiesuan{
             display: flex;
             justify-content: space-between;
         }
    }
}
</style>

