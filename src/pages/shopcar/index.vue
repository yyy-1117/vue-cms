<template>
  <div class="shopcar-container">
        <div class="mui-card-content-inner mui-card">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media item" v-for="(item,i) in car" :key="item.id">
                <mt-switch 
                @change="flag(item.id,$store.getters.goodsSelected[item.id])"
                :value="$store.getters.goodsSelected[item.id]"></mt-switch>&nbsp;&nbsp;
                <img class="mui-media-object mui-pull-left" :src="item.thumb_path">
                <div class="mui-media-body">
                    <span class="title">{{item.title}}</span>
                  <div class="mui-ellipsis">
                      <span class="price">¥{{item.sell_price}}</span>
                          <input type="button" value="-" @click="subtract(item.id)">
                          <input type="number" v-model="count[item.id]">
                          <input type="button" value="+" @click="increment(item.id)">
                  <a href="javascript:;" @click.prevent="remove(item.id,i)">删除</a>
                  </div>
                </div>
            </li>
          </ul>
      </div>
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner total">
                        <div>
                            <p>
                            <span>总计</span>&nbsp;&nbsp;<span>(不含运费)</span>
                        </p>
                        <p>
                            已勾选商品<i class="red">{{$store.getters.goodsCountAndAmount.count}}</i>件,&nbsp;&nbsp;总价
                            <i class="red">¥{{$store.getters.goodsCountAndAmount.amount}}</i>
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
            car:[], // 存储购物车数据
            count:this.$store.getters.goodsNumber,  // {id:count}
        }
    },
    methods: {
      getShopCar(){
        //   调用接口需要 store 中 car 中所有商品的id,手动拼接一个以逗号分隔的字符串
        let idArr = []
        this.$store.state.car.forEach(item => {
            idArr.push(item.id)
            // 如果没有数据,就不需要发送请求,否则会报错
            if(idArr.length <= 0){
                return true
            }
        });
        // console.log(idArr)
        // 由于Id是 store 中获取的,所以不需要修改路由
        this.$http.get('goods/getshopcarlist/'+idArr.join()).then( result => {  // join 方法 以什么字符串分割,不传参数默认 逗号
            // console.log(result)
            if(result.body.status === 0){
                this.car = result.body.message
            }
        })
      },
      subtract(id){ 
          this.count[id] > 1 && this.count[id]--
          this.$store.commit("updateCount",{id,count:this.count[id]})
      },
      increment(id){
          this.count[id]++
          this.$store.commit("updateCount",{id,count:this.count[id]})
      },
      remove(id,i){
          this.car.splice(i,1)
          this.$store.commit("removeFromCar",id)
      },
      flag(id,flag){
          this.$store.commit("updateSelected",{id,flag})
      }
    },
    created(){
        this.getShopCar()
    }
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
    }
    .total{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
        }
    }
}
</style>

