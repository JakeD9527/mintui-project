<!--填完信息预览，上传照片-->
<template>
	<div class="preview-container">

		<section class="page-content">
			<mt-field label="姓名" disabled placeholder="请输入姓名" v-model="username"></mt-field>
			<mt-field label="身份证号" disabled placeholder="请输入身份证号" v-model="IdNumber"></mt-field>
			<mt-radio title="信用报告来源" :disabled="true" v-model="reporttype_no" :options="reportType"></mt-radio>

			<div class="img-list-container">
				<div v-for="(item,index) in imgSrc" class="img-list-item">
					<img :src="item" alt="" />
					<div class="button-group">
						<mt-button type="primary" size="small" @click="previewPhoto(index)">预览</mt-button>
						<mt-button type="danger" size="small" @click="deletePhoto(index)">删除</mt-button>
						<label :for="index+'-re-take-picture'">
							<div class="rephoto-btn mint-button mint-button--default mint-button--small">重拍</div>
						</label>
						<input :id="index+'-re-take-picture'" class="rephoto-input" type="file" accept="image/*" capture="camera">
					</div>
				</div>
			</div>

		</section>

		<footer class="page-footer">
			<label for="take-picture">
				<div class="mint-button mint-button--default mint-button--normal">增加</div>
			</label>
			<div>
				<div class="mint-button mint-button--default mint-button--normal" size="small" @click="temporarySave">暂存</div>
				<div class="mint-button mint-button--default mint-button--normal submit-button" size="small" @click="submit">提交报告</div>
			</div>
			<input id="take-picture" type="file" accept="image/*" capture="camera">
		</footer>

		<mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="false">
			<div class="img-preview-container">
				<i class="close-icon" @click="popupVisible=false">x</i>
				<img :src="previewImgSrc" class="preview-img" />
			</div>
		</mt-popup>

	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import REG from '@/assets/js/reg-config.js'
	import imageUpload from '../common/imageUpload.vue'
	import axios from 'axios'

	export default {
		//组件名
		name: 'create',
		//实例的数据对象
		data() {
			return {
				popupVisible: false,
				imgSrc: [], //图片base64数组
				imgFileArr: [], //图片file文件数组
				imgParamArr: [], //最后要传的图片参数数组
				previewImgSrc: '',
				reportType: [{
						label: '合作机构',
						value: '001',
						disabled: true
					},
					{
						label: '第三方查询',
						value: '002',
						disabled: true
					},
					{
						label: '陪同查询',
						value: '003',
						disabled: true
					},
					{
						label: '自带征信',
						value: '004',
						disabled: true
					}
				],
			}
		},
		//数组或对象，用于接收来自父组件的数据
		props: {

		},
		//计算
		computed: {
			...mapState(['username', 'IdNumber', 'reporttype_no'])
		},
		//方法
		methods: {
			previewPhoto(index) { //预览
				this.popupVisible = true;
				this.previewImgSrc = this.imgSrc[index];
			},
			deletePhoto(index) { //删除
				this.imgSrc.splice(index, 1)
				this.imgFileArr.splice(index, 1)
				console.log("imgSrc", this.imgSrc);
				console.log("imgFileArr", this.imgFileArr);
			},
			applyInput() { //给图片列表里的input绑定功能
				var _this = this;
				var rePhotoArr = document.getElementsByClassName("rephoto-input");
				for(var i = 0; i < rePhotoArr.length; i++) {
					rePhotoArr[i].onchange = function(event) {
						var index = this.getAttribute("id").split("-")[0];
						var file = this.files[0];

						_this.imgFileArr.splice(index, 1)
						_this.imgFileArr.splice(index, 0, file);
						console.log("修改文件后imgFileArr:", _this.imgFileArr);

						if(file && window.FileReader) {
							var reader = new FileReader();
							reader.readAsDataURL(file);
							//监听文件读取结束后事件    
							reader.onloadend = function(e) {
								if(e.target.result) {
									_this.imgSrc.splice(index, 1)
									_this.imgSrc.splice(index, 0, e.target.result);
									console.log("修改文件后imgSrc:", _this.imgSrc);
								}
							};
						}
					}
				}
			},
			uploadImg(fn) { //上传图片
				let index = 0;
				let _this = this
				uploadSingePic(index)

				function uploadSingePic(imgIndex) {
					var formData = new FormData();
					formData.append("file", _this.imgFileArr[imgIndex]); //这里是要上传的文件，其他属性也是append
					console.log('第' + (parseInt(imgIndex)+1) + '次上传图片')

					$http.post('api/uploadSingePic.do', formData, (res) => {
						_this.imgParamArr.push(res.data);
						if(imgIndex < _this.imgFileArr.length - 1) {
							imgIndex++;
							uploadSingePic(imgIndex);
						} else {
							console.log("调表单接口",'\n','imgParamArr:',_this.imgParamArr)
							fn();
						}
					}, (err) => {

					})
				}
			},
			sendToOcr() {	
				$http.post('api/sendToOCR.do', {
					baseNo: '111111111',
					idcardNo: this.IdNumber,
					idcardName: this.username,
					reportSource: this.reporttype_no,
					imageArr: this.imgParamArr,
					format: 'vertical', //默认竖版
					userNo: sessionStorage.userid,
				}, (res) => {
					this.$indicator.close();
					this.$messagebox.alert(res.message)
				}, (err) => {
					this.$indicator.close();
					this.$messagebox.alert(err.message)
				})
			},
			addDataRequest(){
				$http.post('api/addData.do', {
					idcardNo: this.IdNumber,
					idcardName: this.username,
					reportSource: this.reporttype_no,
					imageArr: this.imgParamArr,
					format: 'vertical', //默认竖版
					userNo: sessionStorage.userid,
				}, res => {
					this.$indicator.close();
					this.$toast({
						message: '已保存',
						duration: 1500,
					})
				}, err => {

				})				
			},
			submit() { //提交报告点击事件
				if(this.imgSrc.length > 0) {
					this.$indicator.open('请稍等...')
					this.uploadImg(this.sendToOcr);
				} else {
					this.$toast({
						message: '请上传图片',
						duration: 1500,
					})
				}
			},
			temporarySave() { //暂存
				if(this.imgSrc.length > 0) {
					this.$indicator.open('请稍等...')
					this.uploadImg(this.addDataRequest);
				} else {
					this.$toast({
						message: '请上传图片',
						duration: 1500,
					})
				}
			}
		},
		//生命周期函数
		created() {

		},
		beforeMount() {

		},
		mounted() {
			var takePicture = document.querySelector("#take-picture"); //进入页面内，获取到增加按钮的input
			let _this = this;
			takePicture.onchange = function(event) {
				var file = this.files[0]; //当拍照完毕获取到文件
				_this.imgFileArr.push(file) //把文件push进入数组
				console.log("上传文件后imgFileArr", _this.imgFileArr);
				if(file && window.FileReader) {
					var reader = new FileReader();
					reader.readAsDataURL(file);
					//监听文件读取结束后事件    
					reader.onloadend = function(e) {
						if(e.target.result) {
							_this.imgSrc.push(e.target.result);
							console.log(_this.imgSrc);
						}
					};
				}
			};
		},
		//监视
		watch: {
			imgSrc(newVal, oldVal) {
				//当新增图片dom元素发生改变，重新给input绑定事件
				let _this = this;
				setTimeout(function() {
					_this.applyInput()
				}, 100)
			},
		},
		//组件
		components: {
			imageUpload,
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
	.preview-container {
		padding-bottom: 62px;
		overflow: auto;
		height: 100%;
	}
	
	.scroll-container {
		height: 100%;
		overflow: auto;
	}
	
	.img-list-item {
		position: relative;
		display: flex;
		justify-content: space-between;
		margin: 20/200rem 10px;
		input[type=file] {
			position: absolute;
			visibility: hidden;
			width: 100%;
			/*display: none;*/
		}
		img {
			width: 300/200rem;
			height: 300/200rem;
		}
		.button-group {
			position: relative;
			display: flex;
			align-items: center;
		}
		.mint-button {
			margin-left: 20/200rem;
		}
	}
	
	#re-take-picture {
		display: none;
	}
	
	.rephoto-btn {
		margin-top: 2px;
		line-height: 35px;
	}
	
	.mint-popup {
		background: transparent;
		width: 100%;
		height: 100%;
		.close-icon {
			padding: 0 20/200rem;
			font-size: 50/200rem;
			position: absolute;
			right: 0;
			top: 0;
		}
		.preview-img {
			width: 100%;
		}
	}
	
	footer {
		display: flex;
		justify-content: space-between;
		input[type=file] {
			position: absolute;
			visibility: hidden;
		}
		.mint-button {
			line-height: 41px;
		}
		.submit-button {
			margin-left: 10px;
		}
	}
</style>