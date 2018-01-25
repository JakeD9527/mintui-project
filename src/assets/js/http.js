// 封装ajax请求
import axios from 'axios'

let ipConfig = ''	

if(process.env.NODE_ENV == 'production') { //判断生产或开发环境避免手动改ip前缀
	ipConfig = '../IdentityConfirmPlatform/'
} else if(process.env.NODE_ENV == 'development') {
	//	ipConfig = "http://10.1.114.165:8989/" //潘佛堡
		ipConfig = "http://10.1.114.179:8090/" //刘恒弥
	//	ipConfig = "http://10.1.114.0:8080/"   //姜强
} else {
	alert('node_env 获取错误', process.env.NODE_ENV)
	ipConfig = '/';
}

const getRequest = (url, param, fnSuccess, fnFail) => {

	axios.get(`${ipConfig}${url}`, {
		params: param
	}).then(function(res) {
		console.log(url, res.data);
		if(parseInt(res.data.code) == 0) {
			fnSuccess(res.data);
		} else {
			window.globalVue.$toast({
				message: res.data.message,
				duration: 2000
			});
			fnFail && fnFail(res.data);
		}
	}).catch(function(res) {
		console.log("fail", res)
		fnFail && fnFail(res.data);
		window.globalVue.$toast({
			message: '服务异常',
			duration: 2000
		});
	});
}

const postRequest = (url, param, fnSuccess, fnFail, ipElse) => {
	//全局的代码引入后只会执行一次
	let ipAddress = ipElse ? ipElse : ipConfig;
	axios({
		method: 'post',
		url: `${ipAddress}${url}`,
		data: param
	}).then(res => {
		console.log(`${ipAddress}${url}`, res.data);
		if(parseInt(res.data.code) == 0) { //code为0则判断为接口正常
			fnSuccess && fnSuccess(res.data);
		} else {	//code不为0弹出后台给出的错误信息
			window.globalVue.$indicator.close(); //有弹窗关掉弹窗
			window.globalVue.$toast({
				message: res.data.message,
				duration: 2000
			});
			fnFail && fnFail(res.data);
		}
	}).catch(err => {	//接口不通统一处理，提示服务异常
		window.globalVue.$indicator.close(); 
		console.log('进入失败回调', '\n', `${ipAddress}${url}`, '\n', err);
		window.globalVue.$toast({
			message: '服务异常',
			duration: 2000
		});
	})

}

//挂载请求方法到全局下
window.$http = {}
$http.get = getRequest
$http.post = postRequest
$http.ipConfig = ipConfig