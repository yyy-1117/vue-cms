<template>
    <div class="goodsList-container">
        <div class="goods-items" v-for="(item) in goodsList" :key="item.id">
            <img :src="item.img_url" alt="">
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
</template>

<script>
import {Toast} from 'mint-ui'

export default {
    data(){
        return {
            pageIndex:1,  // 默认显示第一页
            goodsList:[], // 商品数据
        }
    },
    methods:{
        // 获取商品数据
        getGoodsList(){
            this.$http.get('getgoods?pageindex='+this.pageIndex).then( result => {
                console.log(result)
                if(result.body.status === 0){
                    this.goodsList = result.body.message
                }else{
                    Toast('获取商品信息失败')
                }
            })
        }
    },
    created(){
        this.getGoodsList()
    }
}
</script>

<style lang="less">
    .goodsList-container{
        padding: 5px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .goods-items{
            width: 49%;
            margin-bottom: 10px;
            background-color: #fff;
            border: 1px solid #ccc;
            box-sizing: border-box;
            box-shadow: 0 0 6px #ccc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 353px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
                padding: 0 5px;
            }
            .info{
                padding: 0 5px;
                background-color: #eee;
                p{
                    margin: 0;
                    color: black;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        margin-right: 5px;
                    }
                 .old{
                        text-decoration: line-through;
                        font-size: 12px;
                    }
                    
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
