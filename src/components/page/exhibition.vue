<!--待处理、已处理、异常处理页面-->
<template>
	<div>
		<div class="list-item" v-for="item in dataList">
			<span>
				{{item.idcardName}}
			</span>
			<span @click="toSingleInfo(item)">
				{{item.baseNo}} >
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		//组件名
		name: 'exhibition',
		//实例的数据对象
		data() {
			return {
				dataList: [],
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
			toSingleInfo(baseNo){
				this.$router.push({
					path : '/singleInfo',
					query : {
						baseNo : JSON.stringify(baseNo),
					}
				})
			}
		},
		//生命周期函数
		created() {
			$http.post('api/getDatas.do', {
				status: 0,
				page: 0,
				size: 10,
				userNo: 2,
			}, (res) => {
				if(res.data.length<1){
					this.$toast({
						message: '暂无数据',
						duration: 1500,
					})					
				}else{
					this.dataList = res.data
				}
			}, (err) => {

			})
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
	.list-item {
		padding: 20/200rem;
		font-size: 30/200rem;
		line-height: 2em;
		display: flex;
		justify-content: space-between;
		span:last-of-type{
			color: green;
		}
	}
</style>