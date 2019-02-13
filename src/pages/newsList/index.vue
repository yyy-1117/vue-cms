<template>
    <div class="newslist-content">
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item, index) in newsList" :key="index">
					<router-link :to="'/home/newsInfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1 class="title">{{item.title}}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间:{{item.add_time | datastr('YYYY-MM-DD')}}</span>
                                <span>点击:{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            newsList:[]
        }
    },
    created(){
        this.getNewsList()
    },
    methods:{
        getNewsList(){
            this.$http.get('getnewslist').then( result => {
                // console.log(result)
                if(result.body.status === 0){
                    this.newsList = result.body.message
                }else{
                    Toast('获取新闻列表失败')
                }
            })
        }
    },
}
</script>

<style lang="less">
    .newslist-content{
        img{
            width: 100%;
        }
        .title{
            font-size: 13px;
        }
        .mui-ellipsis{
            color: #226aff;
            font-size: 12px;
            display: flex;
            justify-content: space-between
        }
    }
</style>
