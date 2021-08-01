<template>
	<view>
		<view class="dots" :style="{backgroundColor:icon.color}">
			<image class=".dotsImage" :src="src" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"eventIcon",
		props:{
			icon:Object,
		},
		computed: {
			src() {
				return '/static/icon/'+this.icon.icon+'.png'
			}
		},	
		created() {}
	}
</script>

<style lang="less">
	/* 事件小圆点 */
	.dots{ 
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		height: 60rpx;
		width: 60rpx;
		border: 1rpx solid white;
		border-radius: 50%;
		background-color: #000;
		.dotsImage{
			/* transform: translate(0,-25%); */
			height: 36rpx;
			width: 36rpx;
			// /* #ifndef H5*/
			// height: 36px;
			// width: 36px;
			// /*#endif */
		}
	}
</style>
