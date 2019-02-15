<template>
  <div>
    <!-- 分类导航栏 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <!-- 绑定class 设置默认选中 全部分类 -->
          <a
            :class="['mui-control-item', {'mui-active': item.id == 0}]"
            v-for="(item) in category"
            :key="item.id"
            @click="getPhotoList(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表 -->
    <ul class="photoList">
      <router-link v-for="(item) in photoList" :key="item.id" :to="'/home/photoInfo/'+ item.id" tag="li">
        <img v-lazy="item.img_url">
		<div class="title">
			<p>{{item.title}}</p>
			<p>{{item.zhaiyao}}</p>
		</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

//  引入mui
import mui from "@/lib/mui/js/mui.js";

/* bug1. 引入结构 导航栏是全屏的  需要删除 mui-fullscreen
  	bug2. 初始化导航栏会报错 mui.js?80c5:3424 Uncaught TypeError: 'caller', 'callee', and 'arguments' 
	 properties may not be accessed on strict mode   意思是 在严格模式下无法使用caller, callee, arguments
	在webpack4以后, 强制开启严格模式, 并且无法关闭
	babel 可以选择忽略某个js文件的转译
	初始化区域滚动组件时用到了mui, 而mui内部调用了callee或caller或arguments 
	bug4. 解决以上问题 tabBar无法切换,需要重新添加样式*/

export default {
  data() {
    return {
      category: [], // 分类数据
      photoList: [] // 图片数据
    };
  },
  mounted() {
    //  bug3. 第一次进入时无法滚动
    //  mounted 钩子函数中初始化导航栏  此时的DOM元素是最新的
    //  初始化导航栏
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    // 获取分类数据
    getCategory() {
      this.$http.get("getimgcategory").then(result => {
        // console.log(result)
        if (result.body.status === 0) {
          // 根据接口文档需要手动添加 全部分类
          result.body.message.unshift({
            title: "全部",
            id: 0
          });
          this.category = result.body.message;
        } else {
          Toast("获取分类失败");
        }
      });
    },
    getPhotoList(id) {
      this.$http.get("getimages/" + id).then(result => {
        // console.log(resule)
        if (result.body.status === 0) {
          this.photoList = result.body.message;
        } else {
          Toast("获取图片失败");
        }
      });
    }
  },
  created() {
    this.getCategory();
    // 调用 getPhotoList 方法 默认显示 全部 传参数 0
    this.getPhotoList(0);
  }
};
</script>

<style lang="less">
* {
  touch-action: pan-x; /* 解决 passive 报错 */
}
.photoList{
        li{
            box-shadow: 0 0 8px #eee;
            position: relative;
            img[lazy=loading] {
                width: 40px;
                height: 100px;
                margin: auto;
            }
            img{
                width: 100%;
                background-color: #ccc;
            }
            .title{
                margin: 2px 0;
                position: absolute;
                bottom: 0;
                max-height: 84px;
                font-size: 13px;
                background-color: rgba(0, 0, 0, 0.4);
                p{
                    color:#fff;
                    padding: 0;
                    margin: 0;
                }
            }
        }
    }
  /* 图片懒加载样式 */
  img[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
  }

</style>