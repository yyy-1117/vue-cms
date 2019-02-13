<template>
    <div class="newsInfo-container">
       <h1 class="title">{{newsInfo.title}}</h1>
       <p class="subtitle">
           <span>发表时间:{{newsInfo.add_time | datastr('YYYY-MM-DD')}}</span>
           <span>点击{{newsInfo.click}}次</span>
       </p>
       <hr>
       <div class="content" v-html="newsInfo.content"></div>

        <!-- 评论子组件 -->
       <comment-box></comment-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';


export default {
    data() {
        return {
            id: this.$route.params.id,
            newsInfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('getnew/'+ this.id).then( result => {
                console.log(result)
                if(result.body.status === 0){
                    this.newsInfo = result.body.message[0]
                }else{
                    Toast('获取新闻详情失败')
                }
            })
        }
    }
}
</script>

<style lang="less">
  .newsInfo-container{
        padding: 0 4px;
        .title{
            font-size: 16px;
            color: red;
            text-align: center;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #226aff;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>
