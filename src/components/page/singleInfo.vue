<!--exhibiton入口进入单条信息页面-->
<template>
	<div>
		<mt-field label="姓名" placeholder="请输入姓名" v-model="info.idcardName"></mt-field>
		<mt-field label="身份证号" placeholder="请输入身份证号" v-model="info.idcardNo"></mt-field>
		<mt-radio title="信用报告来源" v-model="info.reportSource" :options="reportType"></mt-radio>
		<div class="img-list">
			<img v-for="imgItem in imgArr" :src="imgItem" alt="" />
		</div>
	</div>
</template>

<script>
	export default {
		//组件名
		name: '',
		//实例的数据对象
		data() {
			return {
				info: {},
				imgArr: [],
				reportType: [{
						label: '合作机构',
						value: '001',
					},
					{
						label: '第三方查询',
						value: '002',
					},
					{
						label: '陪同查询',
						value: '003',
					},
					{
						label: '自带征信',
						value: '004',
					}
				],
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

		},
		//生命周期函数
		created() {

		},
		beforeMount() {

		},
		mounted() {
			this.info = JSON.parse(this.$route.query.baseNo)
			this.info.imageArr = JSON.parse(this.info.imageArr)
			console.log(this.info)
			for(let i = 0; i < this.info.imageArr.length; i++) {
				this.imgArr.push("http://10.1.114.179:8090/api/getImage.do?fileId=" + this.info.imageArr[i]);
			}
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
	.img-list {
		margin: 20/200rem;
		img {
			display: block;
			margin: 20/200rem 0;
			width: 300/200rem;
			height: 300/200rem;
		}
	}
</style>