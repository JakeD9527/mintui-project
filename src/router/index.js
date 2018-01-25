import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/page/home.vue'
import create from '@/components/page/create.vue'
import preview from '@/components/page/preview.vue'
import exhibition from '@/components/page/exhibition.vue'
import singleInfo from '@/components/page/singleInfo.vue'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'home',
		meta: {
			title: 'home'
		},
		component: home
	},{
		path: '/create',
		name: 'create',
		meta: {
			title: 'create'
		},
		component: create
	},{
		path: '/preview',
		name: 'preview',
		meta: {
			title: 'preview'
		},
		component: preview
	},{
		path: '/exhibition',
		name: 'exhibition',
		meta: {
			title: 'exhibition'
		},
		component: exhibition
	},{
		path: '/singleInfo',
		name: 'singleInfo',
		meta: {
			title: 'singleInfo'
		},
		component: singleInfo
	}]
})