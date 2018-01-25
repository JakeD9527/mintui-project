<!-- 图片展示组件，还没写完 -->
<template>
	<div class="img-item">
		<!--图片-->
		<img :src="imageSrc" />
		<div class="button-group">
			<mt-button type="primary" size="small" @click="previewPhoto">预览</mt-button>
			<mt-button type="danger" size="small" @click="deletePhoto">删除</mt-button>
			<label :for="randomId" class="rephoto-btn">
				<div class="mint-button mint-button--default mint-button--small">重拍</div>
			</label>
			<input :id="randomId" class="rephoto-input" type="file" accept="image/*" capture="camera">
		</div>
		
		<!--弹窗-->
		<mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="false">
			<div class="img-preview-container">
				<i class="close-icon" @click="popupVisible=false">x</i>
				<img :src="imageSrc" class="preview-img" />
			</div>
		</mt-popup>		
	</div>
</template>

<script>
	export default {
		//组件名
		name: 'imageUpload',
		//实例的数据对象
		data() {
			return {
				randomId: '',	//input元素ID
				popupVisible : false,
			}
		},
		//数组或对象，用于接收来自父组件的数据
		props: [
			'imageSrc',
			'imageIndex',
		],
		//计算
		computed: {

		},
		//方法
		methods: {
			generateId() {　//生成随机的ID
				var len = 8;　　
				/****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
				var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
				var maxPos = $chars.length;　　
				var pwd = '';　　
				for(let i = 0; i < len; i++) {　　　　
					pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
				}　　
				return pwd;
			},
			previewPhoto(){	//照片预览
				this.popupVisible = true;
			},
			deletePhoto(){	//删除照片
				this.$emit('emitDeletePhoto',this.imageIndex);
			}
		},
		//生命周期函数
		created() {
			console.log(this.imageIndex)
			this.randomId = this.generateId();
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
	.img-item {
		position: relative;
		display: flex;
		justify-content: space-between;
		margin-top: 20/200rem;
		margin-bottom: 20/200rem;
		.rephoto-btn {
			margin-top: 3px;
		}
		.rephoto-btn div {
			line-height: 34px;
		}
		.rephoto-input {
			position: absolute;
			bottom: 0;
			/*visibility: hidden;*/
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
</style>