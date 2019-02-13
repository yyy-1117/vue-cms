<template>
  <div id="app">
    <!-- header 区域 -->
    <mt-header fixed title="Vue移动端项目"></mt-header>

		<!-- 切换组件添加动画 -->
    <transition>
			<router-view/>
		</transition>


    <!-- tapbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/menber">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
  #app {
    padding-top: 40px;
		padding-bottom: 50px;
		overflow-x: hidden;  // 解决横向滚动条
	}
	.v-enter{
		opacity: 0;
		transform: translateX(100%)
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute; // 解决切换组件会上弹,块级元素独占一行
	}
	.v-enter-active,
	.v-leave-active{
		transition: all .5s ease;
	}
</style>

