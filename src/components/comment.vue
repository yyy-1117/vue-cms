<template>
  <div class="comment-container">
    <h4>发表评论</h4>
    <textarea placeholder="请输入要发表的内容(最多120字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postContent">发表评论</mt-button>
    <div class="sub-container">
      <div class="com-box" v-for="(item, index) in comments" :key="index">
        第{{index +1 }}楼&nbsp;&nbsp;用户:{{item.user_name}} &nbsp;&nbsp;发表时间:{{item.add_time | datastr}}
        <div class="com-comment">{{item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain  @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      comments: [], // 评论信息
      pageindex: 1, // 默认显示第一页
      msg:'',  // 评论内容
    };
  },
  props: ["id"],
  methods: {
    //   获取评论信息
    getComment() {
      this.$http.get("getcomments/" + this.id + "?pageindex=" + this.pageindex).then(result => {
        //   console.log(result);
          if (result.body.status === 0) {
            // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
            // concat方法  拼接数组
            this.comments = this.comments.concat(result.body.message)
          } else {
            Toast("获取评论信息失败");
          }
        });
    },
    // 加载更多
    getMore(){
        this.pageindex++
        this.getComment()
    },
    postContent(){
        // 校验用户输入的内容
        if(this.msg.trim().length === 0)  return Toast("评论信息不能为空"); 
        // 发表评论
        this.$http.post('postcomment/'+this.id,{content:this.msg}).then( result => {
            // console.log( result )
            if(result.body.status === 0){
                Toast("发表成功"); 
                //  方法1 手动添加一个对象 追加到数据前面
              //  let content = {
              //   add_time: Date.now(),
              //   content: this.msg,
              //   user_name: "匿名用户"
              //  }
              //  this.comments.unshift(content)

            // 方法2 直接调用 getComment 方法 并将 pgaeindex 设置为1  comments 设置为空数组
            this.pageindex = 1
            this.comments = []
            this.getComment()
            
            this.msg = ''
            }
        })
    }
  },
  created() {
    this.getComment();
  }
};
</script>

<style lang="less">
.comment-container {
    padding: 5px;
    h4{
        font-size: 15px;
    }
  .sub-container {
      line-height: 40px;
    .com-box {
      border-radius: 5px;
      margin-top: 5px;
      font-size: 14px;
      background-color: #ccc;
      .com-comment {
        text-indent: 2em;
        line-height: 35px;
        background-color: #fff;
      }
    }
  }
}
</style>