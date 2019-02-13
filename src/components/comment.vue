<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <textarea placeholder="请输入要发表的内容(最多120字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div>
            用户:
        </div>
         <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less">
    
</style>