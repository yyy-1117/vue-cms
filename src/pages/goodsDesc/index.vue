<template>
    <div class="goodsDesc-container">
        <h1 class="title">{{goodsDesc.title}}</h1>
        <hr>
        <div v-html="goodsDesc.content"></div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
    data(){
        return{
            id:this.$route.params.id,
            goodsDesc:{}
        }
    },
    methods:{
        getgoodsDesc(){
            this.$http.get('goods/getdesc/'+ this.id).then( result => {
                console.log(result)
                if(result.body.status === 0){
                    this.goodsDesc = result.body.message[0]
                }else{
                    Toast('获取图文介绍失败')
                }
            })
        }
    },
    created(){
        this.getgoodsDesc()
    }
}
</script>

<style lang="less">
    .goodsDesc-container{
        .title{
            color: #226aff;
            font-size: 16px;
            text-align: center;
            padding: 10px 0;
        }
        img{
            width: 100%;
        }
    }
</style>