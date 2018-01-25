<!--入口页面-->
<template>
	<div class="home-container">
		<mt-button type="default" size="large" @click="toCreate">新建</mt-button>
		<mt-button type="default" size="large" @click="toExhibition">待处理</mt-button>
		<mt-button type="default" size="large" @click="toExhibition">已处理</mt-button>
		<mt-button type="default" size="large" @click="toExhibition">异常处理</mt-button>
		<img :src="test" alt="" />
	</div>
</template>

<script>
	export default {
		//组件名
		name: 'home',
		//实例的数据对象
		data() {
			return {
				test: '',
			}
		},
		//数组或对象，用于接收来自父组件的数据
		props: {

		},
		//计算
		computed: {

		},
		//方法
		methods: {
			toCreate() {
				this.$router.push({
					path: '/create'
				})
			},
			toExhibition(){
				this.$router.push({
					path: '/exhibition'
				})
			},
		},
		//生命周期函数
		created() {
			$http.post('api/setUserIdByCode.do', {
				code: this.$route.query.code,
			}, (res) => {
				sessionStorage.userid = res.userid;
			}, (err) => {

			}, '../')
		},
		beforeMount() {

		},
		mounted() {

		},
		//监视
		watch: {

		},
		//组件
		components: {

		},
		//过滤器
		filters: {

		},
		//自定义指令
		directive: {

		}
	}
</script>

<style lang="less" scoped>
	.home-container {
		padding: 0 20px;
	}
	
	.mint-button {
		margin: 20px 0;
	}
</style>