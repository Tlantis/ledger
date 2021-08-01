import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		expIconArr:[ // 支出图标
			{text:'一般',icon:'yiban',color:'#64C896'},
			{text:'用餐',icon:'yongcan',color:'#64C8C8'},
			{text:'交通',icon:'jiaotong',color:'#4C9FD0'},
			{text:'服饰',icon:'fushi',color:'#C89FD0'},
			{text:'化妆品',icon:'huazhuangpin',color:'#FFC0CB'},
			{text:'日用品',icon:'riyongpin',color:'#2F4F4F'},
			{text:'娱乐',icon:'yule',color:'#FFA500'},
			{text:'食材',icon:'shicai',color:'#FA8072'},
			{text:'零食',icon:'lingshi',color:'#8B4513'},
			{text:'酒水',icon:'jiushui',color:'#A9A9A9'},
			{text:'住房',icon:'zhufang',color:'#FFD700'},
			{text:'通信',icon:'tongxin',color:'#191970'},
			{text:'家居',icon:'jiaju',color:'#3CB371'},
			{text:'人情',icon:'renqing',color:'#FF69B4'},
			{text:'学习',icon:'xuexi',color:'#32CD32'},
			{text:'医疗',icon:'yiliao',color:'#FFB6C1'},
			{text:'旅游',icon:'lvyou',color:'#006400'},
			{text:'数码',icon:'shuma',color:'#BDB76B'},
		],
		inIconArr:[ // 收入图标
			{text:'一般',icon:'yule',color:'#E1D444'},
			{text:'报销',icon:'baoxiao',color:'#E15344'},
			{text:'工资',icon:'gongzi',color:'#E0B500'},
			{text:'红包',icon:'hongbao',color:'#E01A08'},
			{text:'兼职',icon:'jianzhi',color:'#D17A88'},
			{text:'奖金',icon:'jiangjin',color:'#BDB76B'},
			{text:'投资',icon:'touzi',color:'#EB3F56'}
		],
		publicIconArr:[
			{text:'加',icon:'jia',color:'#FFF'},
			{text:'减',icon:'jian',color:'#E01A08'},
			{text:'设置',icon:'shezhi',color:'#222'},
		]
	},
	mutations:{}
})