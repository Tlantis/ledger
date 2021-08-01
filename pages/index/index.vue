<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="item in swiperArr" :key="item.id">
				<image :src="item.img" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- 总计 -->
		<view class="total">
			<view class="totalChild">
				<view>收入</view>
				<view>{{total.in}}</view>
			</view>
			<view class="addLedgerButton" @click="toAddLedger" >
				<image src="../../static/icon/jia.png" mode=""></image>
			</view>
			<view class="totalChild rightTotalChild">
				<view>支出</view>
				<view>{{total.out}}</view>
			</view>
		</view>
		<!-- 详细中线 -->
		<view class="midline"></view>
		<view class="scrollDetailed" :key = "scrollDetailed">	
			<!-- 详细事件 -->
			<view class="detailed" v-for="item in detailData" :key="item.time">
				<!-- 时间点 -->
				<view class="detailedChild Time">	
					<view class="detailedChildLeft">
						{{item.time.toString().substring(0,4) + '.' + item.time.toString().substring(4,6)+ '.' + item.time.toString().substring(6,8)}}
					</view>	
					<view class="detailedChildRight">{{item.total}}</view>
					<view class="detailedChildCentre">
						<view class="timeDots">
						</view>
					</view>
				</view>	
				<!-- 账单 -->
				<view class="detailedChild" v-for="(item1, index) in item.data" :key="index">
					<view class="detailedChildLeft" v-if="item1.outIn == 'in'">{{item1.text}}  {{item1.amount}}</view>
					<view class="detailedChildRight"v-if="item1.outIn == 'out'">{{item1.text}}  {{item1.amount}}</view>
					
					<view class="detailedChildCentre" v-show="showDeleteButton !== item.time+''+index">
						<eventIcon class="icon" :icon="item1" @click="showDeleteButton = (item.time+''+index)"></eventIcon>
					</view>
					<view class="detailedChildCentre" v-show="showDeleteButton == item.time+''+index">
						<eventIcon class="icon" :icon="{icon:'jian',color:'#E01A08'}" @click="operateLedger(item, index)"></eventIcon>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import eventIcon from '@/components/eventIcon/eventIcon'
	import { mapState } from 'vuex'
	export default {
		components:{
			eventIcon
		},
		data() {
			return {
				swiperArr:[], // 轮播图地址		
				detailData:[ // 账单详细数据
					{
						time:20210727,
						data:[
							{text:'娱乐',amount:'200.00',outIn:'out',icon:'yule',color:'#FFA500'},
							{text:'用餐',amount:'100.00',outIn:'out', icon:'yongcan',color:'#64C8C8'},
							{text:'学习',amount:'100.00',outIn:'out', icon:'xuexi',color:'#32CD32'},
							{text:'日用品',amount:'100.00',outIn:'out', icon:'riyongpin',color:'#2F4F4F'},
							{text:'工资',amount:'3000.00',outIn:'in', icon:'gongzi',color:'#FFA500'}
						],
						total:'2500.00'
					},
					{
						time:20210718,
						data:[
							{text:'娱乐',amount:'200.00',outIn:'out',icon:'yule',color:'#FFA500'},
							{text:'一般',amount:'300.00',outIn:'out',icon:'yongcan',color:'#64C896'},
							{text:'学习',amount:'400.00',outIn:'out',icon:'xuexi',color:'#32CD32'},
							{text:'食材',amount:'500.00',outIn:'out',icon:'shicai',color:'#FA8072'},
							{text:'彩票',amount:'30000.00',outIn:'in',icon:'gongzi',color:'#FFA500'}
						],
						total:'28600.00'
					},
					{
						time:20210707,
						data:[
							{text:'娱乐',amount:'200.00',outIn:'out',icon:'yule',color:'#FFA500'},
							{text:'一般',amount:'300.00',outIn:'out',icon:'yongcan',color:'#64C896'},
							{text:'学习',amount:'400.00',outIn:'out',icon:'xuexi',color:'#32CD32'},
							{text:'食材',amount:'500.00',outIn:'out',icon:'shicai',color:'#FA8072'},
							{text:'彩票',amount:'30000.00',outIn:'in',icon:'gongzi',color:'#FFA500'}
						],
						total:'18600.00'
					}
				],
				total:{
					change: 1,
					in: 0,
					out: 0
				}, // 总收支数
				scrollDetailed:0, // 用于更新详细数据列表的key值
				showDeleteButton:'' // 用于表示是否变成删减
			}
		}, 
		watch:{
			'total.change': { // 监听total的数据是否发生变化
				immediate: true,// 加上该属性会直接执行一次
			    handler(newValue) {
					var detailData = this.detailData
					this.total.in = this.total.out = 0
					for(var i = 0; i < detailData.length; i ++){
						for(var j = 0; j < detailData[i].data.length; j++){
							if(detailData[i].data[j].outIn == 'out'){this.total.out += parseFloat(detailData[i].data[j].amount)}
							if(detailData[i].data[j].outIn == 'in'){this.total.in += parseFloat(detailData[i].data[j].amount)}
						}
					}
				}
			}
		},
		onLoad() {
			this.getSwipers() // 获取轮播图方法
			// this.getDetailData()
			uni.$on('addLedger', (data)=>{// 监听添加数据函数
				this.dataPush(data)
			})
		},
		onPageScroll() { // 监听屏幕滚动事件
			if(this.showDeleteButton !== ''){ // 屏幕滚动是就取消删除键
				this.showDeleteButton = ''
			}
		},
		methods: {
			async getSwipers(){ // 获取轮播图方法
				// const res = await this.$myRequest({
				// 	url: ''
				// })
				var arr = [ // 模拟api接口数据 模拟获取图片 uni.getImageInfo
					{id:1,img:'../../static/swiper/food.jpg'},
					{id:2,img:'../../static/swiper/ktv.jpg		'},
					{id:3,img:'../../static/swiper/landscape.jpg'},
					{id:4,img:'../../static/swiper/learn.jpg'},
					{id:5,img:'../../static/swiper/shoppingMall.jpg'}
				]
				const res = await this.$simRequest({arr})
				this.swiperArr = res
			},
			dataPush(data){ //添加数据函数
				if (data.data.amount == '0')return console.log('传了个寂寞') // 添加的金额为零 不做任何操作
				var length = this.detailData.length
				var time = data.time // 从addLedger页面传过来的数据的日期
				var successAdd = false // 用于判断是否存放成功
				for(var i=0; i<length; i++){ // 后续应该改成二分查找提高效率
					if(this.detailData[i].time == time){
						this.detailData[i].data.unshift(data.data) // 添加到该日期的数组最前面,因为数组的数据是倒着写的
						this.scrollDetailed += 1 // 重新渲染详细列表单
						successAdd = true
						break
					}
				}
				if(successAdd == false){ // 没有找到对应日期的话 需要添加一个日期
					var newDate = {
						time: time,
						data: []
					}
					for(var i=0; i<length; i++){
						if(this.detailData[i].time < time){ // 找到对应的位置
							this.detailData.splice(i,0,newDate) // 添加一个日期列表
							this.detailData[i].data.unshift(data.data) // 添加到该日期的数组最前面,因为数组的数据是倒着写的
							this.scrollDetailed += 1 // 重新渲染详细列表单
							successAdd = true
							break
						}
					}
					if(this.detailData[length-1] > time){ // 判断日期是否为最早
						this.detailData.push(newDate)
						this.detailData[i].data.unshift(data.data) // 添加到该日期的数组最前面,因为数组的数据是倒着写的
						this.scrollDetailed += 1 // 重新渲染详细列表单
						successAdd = true
					}
				}
				if(successAdd == true) { // 如果添加成功 则调用重新机选total值的方法.
					this.total.change += 1
					successAdd = false
					console.log( '添加的日期是', this.detailData[i].time)
					this.dateTotal(this.detailData[i].time)
				}
			},
			operateLedger(item, index){ // 修改或者删除账单
				var time = item.time // 当前要修改或者删除的账单日期
				var length = this.detailData.length
				for(var i=0; i<length; i++){
					if(this.detailData[i].time == time){
						
						this.detailData[i].data.splice(index,1) // 删除触发按钮的这一项
						this.total.change += 1 // 页面总计重新计算
						this.dateTotal(time) // 每日总计重新计算
						if(this.detailData[i].data.length == 0) { // 如果没有了数据的话 则删除该天信息
							console.log(this.detailData.splice(i, 1))
						}
						this.showDeleteButton = '' // 重置DeleteButton
						break

					}
				}
			},
			dateTotal(time){ // 计算单日总计的函数
				console.log('计算'+time+'总计')
				var length = this.detailData.length
				for(var i=0; i<length; i++){ // 找到数据当日
					if(this.detailData[i].time == time){ // 找到数据当日
					
						this.detailData[i].total = 0 // 初始化当日总计
						var dataLength = this.detailData[i].data.length
						for(var j=0; j<dataLength; j++){ // 循环当日的账单 out减 in加
							if(this.detailData[i].data[j].outIn =="out"){
								this.detailData[i].total -= parseFloat(this.detailData[i].data[j].amount)
							}
							if(this.detailData[i].data[j].outIn =="in"){
								this.detailData[i].total += parseFloat(this.detailData[i].data[j].amount)
							}
						}
						this.detailData[i].total = this.detailData[i].total.toFixed(2) // 保留俩位小数
						
					}
				}
			},
			toAddLedger(){ // 跳转到AddLedger的函数
				uni.navigateTo({ // 编程式导航普通页方法
					url:'/pages/addLedger/addLedger' ,// 地址
				})
			},
		}
	}
</script>

<style lang="less">
	body{
		font-family: 'KaiTi';
		image{
			width: 100%;
			height: 100%;
		}
		/* swiper轮播图 */
		swiper{
			position: fixed;
			width: 750rpx;
			height: 200rpx;
			z-index: 1000;
		}
		/* total */
		.total{
			position: fixed;
			top: 200rpx;
			z-index: 1000;
			display:flex;
			justify-content:space-between;
			background-color: #fff;
			width: 100%;
			height: 100rpx;
			color: #707070;
			.totalChild{ // 当月收入支出文本
				padding: 10rpx 40rpx;
				box-sizing:border-box;
				width: 250rpx;
				height: 80rpx;
			}
			.rightTotalChild{ // 在右边的支出文本
				view{
					text-align:right;
				}
			}
			.addLedgerButton{
				height: 150rpx;
				width: 150rpx;
				background-color: #FFF;
				border-radius: 50%;
				border: 10rpx solid #707070;
				margin: auto;
				transform: translate(0,-50%);
				image {
					height: 50%;
					width: 50%;
					transform: translate(50%,50%);
				}
			}
		}
		/* midline */
		.midline{
			background-color: #ccc;
			width: 2rpx;
			height: 100%;
			position: fixed;
			right: 50%;
		}
		/* detailed */
		.scrollDetailed{
			padding-top: 300rpx;
			height: 800rpx;
			.detailedChild{
				font-size: 25rpx;
				position: relative;
				margin-bottom: 50rpx;
				/* border-top: 1rpx solid transparent; */
				.detailedChildLeft{
					display: inline-block;
					position: absolute;
					right: 55%;
					height: 40rpx;
					line-height: 40rpx;
				}
				.detailedChildRight{	
					display: inline-block;
					position: absolute;
					left: 55%;
					height: 40rpx;
					line-height: 40rpx;
				}
				.detailedChildCentre{
					height: 40rpx;
					.timeDots{ // 时间小圆点
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						height: 12rpx;
						width: 12rpx;
						border-radius: 50%;
						background-color: #888;
					}
					.dots{ // 事件小圆点
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						height: 40rpx;
						width: 40rpx;
						border-radius: 50%;
						background-color: #556B2F;
					}
					.icon{
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}
				}
			}
			.Time {
				font-size: 20rpx;
				color: #707070;
			}
			/* detailed圣杯布局 */
		}	
	}
</style>
