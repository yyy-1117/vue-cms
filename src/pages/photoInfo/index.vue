<template>
    <div class="info">
        <h3>{{photoInfo.title}}</h3>
        <div class="info-box">
            <span>发表时间:{{photoInfo.add_time | datastr}}</span>
            <span>点击{{photoInfo.click}}次</span>
        </div>
        <hr>
        <!-- 缩放图区域 -->
        <div class="img-box">
              <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
        </div>
        <!-- 评论子组件 -->
        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
    data(){
        return{
            id:this.$route.params.id,
            photoInfo:{},
            list:[]
        }
    },
    created(){
        this.getphotoInfo()
        this.gettHumImages()
    },
    methods:{
        // 获取图片详情
        getphotoInfo(){
            this.$http.get('getimageInfo/'+this.id).then( result => {
                //   console.log( result)
                  if(result.body.status === 0){
                      this.photoInfo = result.body.message[0]
                  }else{
                      Toast('获取图片详情失败')
                  }
            })
        },
        // 获取缩略图
        gettHumImages(){
            this.$http.get('getthumimages/'+this.id).then( result => {
                // console.log(result)
                if(result.body.status === 0){
                    result.body.message.forEach(item => {
                        item.w = 600
                        item.h = 400
                    });
                    this.list = result.body.message
                }
            })
        }

    }
}
</script>

<style lang="less">
    .info{
        h3{
            font-size: 15px;
            text-align: center;
            color: red;
        }
        .info-box{
            padding: 0 5px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #226aff;
        }
        .img-box{
            padding: 0 10px;
            img{
                margin: 5px 10px;

            }       
        }     
    }
</style>
