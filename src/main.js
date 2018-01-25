import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import Mint from 'mint-ui'
import $ from 'jquery'
import _ from 'lodash'
import vueWechatTitle from 'vue-wechat-title'


import './assets/js/rem.js'
import './assets/js/http.js'

import '../static/css/reset.less'
import '@/assets/less/common.less'
import 'mint-ui/lib/style.css'

Vue.use(Mint)
Vue.use(Vuex)
Vue.use(vueWechatTitle)

//vuex
const store = new Vuex.Store({
	state: {
		username: '',
		IdNumber : '',
		reporttype_no : '',
	},
	mutations: {
		saveUserInfo(state,payload) {	//保存create页面用户所填表单信息
			console.log("提交状态修改-",payload)
			for(var key in payload){
				state[key] = payload[key];
			}
		}
	}
})

var globalVue = new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})

window.globalVue = globalVue;