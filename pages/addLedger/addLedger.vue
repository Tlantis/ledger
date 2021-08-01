<template>
	<view>
		<!-- 收入支出 -->
		<view class="outInButton">
			<view :class="outIn == 'in' ?  'outIn outInChoose' : 'outIn'" @click="outInChoose('in')">收入</view>
			<view :class="outIn == 'out' ?  'outIn outInChoose' : 'outIn'" @click="outInChoose('out')">支出</view>
		</view>
		<!-- 金额 -->
		<view class="money" :style="{backgroundColor:icon.color}">
			<view class="moneyIcon">
				<icon :icon="icon"></icon>
				<view class="text">{{icon.text}}</view>
			</view>
			
			<view class="amountNum">
				￥ {{amount1 + amount2}}
			</view>
		</view>
		<!-- 图标 -->
		<view class="icon">
			<view :class="outIn == 'out' ?  'icon' : 'icon iconHidden'" class="icon">
				<view class="iconChild" v-for="(item,index) in expIconArr" @click="icon = item" :key="index">
					<eventIcon :icon="item"></eventIcon>
					<view class="iconText">{{item.text}}</view>
				</view>
				<view class="iconChild" @click="addIcon(item)">
					<eventIcon :icon="setUpIcon"></eventIcon>
					<view class="iconText">编辑</view>
				</view>
			</view>
			<view :class="outIn == 'in' ?  'icon' : 'icon iconHidden'" class="icon">
				<view class="iconChild" v-for="(item,index) in inIconArr" @click="icon = item" :key="index">
					<eventIcon :icon="item"></eventIcon>
					<view class="iconText">{{item.text}}</view>
				</view>
				<view class="iconChild" @click="addIcon(item)">
					<eventIcon :icon="setUpIcon"></eventIcon>
					<view class="iconText">编辑</view>
				</view>
			</view>
		</view>
		<!-- 控制台 -->
		<view class="console">
			<view class="consoleChild otherButton">
				<view class="dateButton"  @click="$refs.calendar.open()">{{date}}</view>
				<view class="textButton">文本备注</view>
			</view>
			<view class="consoleChild">
				<!-- 数字相关按钮 -->
				<view class="numButton" v-for="item in numButton" :key="item" @click="changeAmount(item)">{{item}}</view>
				<!-- 提交按钮 -->
				<view class="addLedgerButton" @click="addLedger()">添加</view>
			</view>
			<!-- 时间控件插件 -->
			<view>
			    <uni-calendar ref="calendar" :insert="false" @confirm="confirm" :endDate="nowTime" ></uni-calendar>
			</view>
		</view>
	</view>
</template>

<script>
	import eventIcon from '@/components/eventIcon/eventIcon.vue'
	import getDateTime from '@/util/getdateTime.js'; 
	import { mapState } from 'vuex'
	export default {
		components:{
			eventIcon
		},
		onLoad() {
			this.nowTime = getDateTime.dateTimeStr('y-m-d'); // y:年 m:月 d:日 h:时 i:分 s:秒 中间的分割符号可更改
			this.date =  getDateTime.dateTimeStr('ymd');
		},
		data(){
			return{
				nowTime: '', // 今天日期
				date: 20210727, // 日期
				amount1: '0', // 小数点前的数
				point: false, // 小数点标识位
				amount2: '', // 小数点后的数
				outIn: 'out',
				icon: {text:'一般',color: "#64C896",icon:'yiban'},
				setUpIcon: {color: "#FFF",icon:'jia'}, 
				numButton: [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '清零', '.', 0] // 控制台按钮渲染数组
			}
		},
		computed: {
			...mapState(['expIconArr','inIconArr'])
		},
		methods:{	
			confirm(e) { // 日历确认函数
				this.date = e.fulldate.split('-').join('')
			},
			outInChoose(who){ // 支出收入切换事件
				this.outIn = who
				if(who == 'out') return this.icon = this.expIconArr[0]
				if(who == 'in') return this.icon = this.inIconArr[0]
			},
			changeAmount(options){ // 控制台修改金额区金额方法
				if(options == '清零'){
					 this.point = false
					 this.amount1 = '0'
					 this.amount2 = ''
					 return
				} 
				if(this.amount1.length > 7 & options !== '.' | this.amount2.length > 2) return // 要求最长小数点前七位,小数点后俩位
				if(options == '.' & this.point == true) return // 防止多个小数点
				if(options == '.') this.point = true 
				var nums = 'amount1'
				if(this.point == true){ nums = 'amount2'} // 如果小数点标识符为true则进行小数点后赋值
				if(this.amount1 == '0' & this.point == false) this.amount1 = ''
				
				this[nums] = this[nums]+options
			},
			addLedger(){ // 添加并跳转主页的方法
				if(this.amount2=='') this.amount2 = '.00' // 如果小数点后没有金额 则默认为.00
				var data={
					time: this.date,
					data:{
						text: this.icon.text,
						amount: this.amount1 + this.amount2,
						outIn: this.outIn,
						icon: this.icon.icon,
						color: this.icon.color
					}
				}
				uni.$emit('addLedger', data)
				uni.switchTab({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style lang="less">
	body{
		font-family: 'KaiTi';
		.dots{ // 事件小圆点
			margin: 0 20rpx;
			height: 60rpx;
			width: 60rpx;
			border-radius: 50%;
			background-color: #556B2F;
			image{
				/* transform: translate(0,-25%); */
				height: 100%;
				width: 100%;
			}
		}
		
		/* outIn */
		.outInButton{
			display: flex;
			justify-content:center;
			.outIn{
				padding: 20rpx;
				font-weight:900;
			}
			.outInChoose{
				color: #ffaa00;
			}
		}
		/* money */
		.money{
			display: flex;
			justify-content: space-between;
			height: 70rpx;
			background-color: #CCC;
			font-weight:900;
			color: #FFF;
			.moneyIcon{
				display: flex;
				align-items: center;
			}
			.text{
				display: inline-block; 
			}
			.amountNum{
				margin-right: 20rpx;
				line-height: 70rpx;
			}
		}
		/* icon */
		.icon{
			display: flex;
			flex-wrap: wrap;
			/* justify-content:space-evenly; */
			.iconChild{
				display: flex;
				flex-direction: column;
				margin: 20rpx 12rpx;
				.iconText{
					text-align: center;
				}
			}
		}
		.iconHidden{
			display:none;
		}
		/* console */
		.console{
			position: absolute;
			bottom: 0;
			background-color: #ebebeb;
			.consoleChild{
				display: flex;
				flex-wrap: wrap; /* 允许换行 */
				view{
					box-sizing: border-box; /* 盒子模型 */
					width: 187.5rpx;
					display: flex;
					justify-content:center; /* 在水平中线中间 */
				}
				.numButton{
					border-left:  #dddddd 1rpx solid;
					border-bottom: #dddddd 1rpx solid;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					font-size: 50rpx;
				}
				.addLedgerButton{
					border-left:  #dddddd 1rpx solid;
					width: 375rpx;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					font-size: 50rpx;
				}
			}
			.otherButton{
				display: flex;
				justify-content: space-between;	/* 在水平中线的俩边 */
				background-color: #f4f4f4;
				view {
					height: 70rpx;
					line-height: 70rpx;
				}
			}
		}
	}
</style>
