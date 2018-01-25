<!--新建填信息-->
<template>
	<div class="home-container has-footer">

		<section class="page-content">
			<mt-field label="姓名" placeholder="请输入姓名" v-model="username"></mt-field>
			<mt-field label="身份证号" placeholder="请输入身份证号" v-model="IdNumber"></mt-field>
			<mt-radio title="信用报告来源" v-model="reporttype_no" :options="reportType"></mt-radio>
		</section>

		<footer class="page-footer">
			<mt-button type="default" size="large" @click="toNext">下一步</mt-button>
		</footer>

	</div>
</template>

<script>
	export default {
		//组件名
		name: 'create',
		//实例的数据对象
		data() {
			return {
				username: '', 	//姓名
				IdNumber: '',	//身份证
				reporttype_no: '', //信用报告来源
				reportType: [{
						label: '合作机构',
						value: '001',
					},
					{
						label: '第三方查询',
						value: '002'
					},
					{
						label: '陪同查询',
						value: '003'
					},
					{
						label: '自带征信',
						value: '004'
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
			toNext() {	//下一步
				if(this.checkForm()){ 
					let formObj = {
						username: this.username, 	//姓名
						IdNumber: this.IdNumber,	//身份证
						reporttype_no: this.reporttype_no, //信用报告来源
					}
					this.$store.commit('saveUserInfo', formObj)
					console.log('状态已修改-',this.$store.state)	
					this.$router.push({
						path: '/preview'
					})
				}
			},
			checkForm() {	//校验用户输入
				let nameReg = /^[\u4e00-\u9fa5]{2,6}$/;
				let IdReg = /^\d{6}((?:19|20)((?:\d{2}(?:0[13578]|1[02])(?:0[1-9]|[12]\d|3[01]))|(?:\d{2}(?:0[13456789]|1[012])(?:0[1-9]|[12]\d|30))|(?:\d{2}02(?:0[1-9]|1\d|2[0-8]))|(?:(?:0[48]|[2468][048]|[13579][26])0229)))\d{2}(\d)[xX\d]$/;
				let formItem = [{
					item: 'username',
					tips: '请输入姓名',
					reg: nameReg,
					regTips: '姓名格式不正确'
				}, {
					item: 'IdNumber',
					tips: '请输入身份证号',
					reg: IdReg,
					regTips: '身份证格式不正确'
				}, {
					item: 'reporttype_no',
					tips: '请选择信用报告来源',
					reg: '',
					regTips: ''
				}];

				for(var i in formItem) {
					let ele = formItem[i];
					if(this[ele.item].length > 0) {
						if(ele.reg) {
							if(!ele.reg.test(this[ele.item])) {
								this.$toast({
									message: ele.regTips,
									duration: 1500,
								})
								return false;
							}
						}
					} else {
						this.$toast({
							message: ele.tips,
							duration: 1500,
						})
						return false;
					}
				}

				return true;
			},
		},
		//生命周期函数
		created() {
			console.log("初始化-",this.$store.state)
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

</style>