<template>
	<view class="">
		<!-- {{detailData[2019][0][25].data[0].color}} -->
		我是cart
	</view>
</template>

<script>
	// import data from '../../static/json/data.json'
	// export default  {
	// 	async onLoad() {
	// 		await this.getDetailData()
	// 		this.initDetaiData()
	// 	},
	// 	data(){
	// 		return{
	// 			detailData:{},
	// 			showData:[]
	// 		}
	// 	},
	// 	methods: {
	// 		async getDetailData(){ // 获取具体数据
	// 			const res = await this.$requestJson()
	// 			// console.log(res)
	// 			this.detailData = res
	// 		},
	// 		initDetaiData(){ // 初始化具体数据
	// 			for(let i=11; i>=0; i--){ // 月份循环
	// 				let detaiData = this.detailData[2019][i]
					
	// 				var month = String(i+1)
	// 				if(month.length<2){ // 让月份都是长度为2的字符串
	// 					month = '0' + month
	// 				}
					
	// 				var date
	// 				for(let key in detaiData){
	// 					date = String(key)
	// 					if(date.length<2){ // 让日都是长度为2的字符串
	// 						date = '0' + date
	// 					}
	// 					console.log(month+date)
	// 					console.log(detaiData[key])
	// 				}
	// 			}
	// 		}
	// 	}
	// }
</script>

<style>
</style>
