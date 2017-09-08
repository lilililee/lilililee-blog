// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import 'babel-polyfill'				// 解决ie报错：polyfill-eventsource added missing EventSource to window

// element-ui
import '../theme/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

// 自定义样式
import './assets/styles/blog.scss'

// 全局注册组件
import vHeader from '@/components/vHeader'
import vMain from '@/components/vMain'
import vFooter from '@/components/vFooter'
Vue.component('v-header',vHeader);
Vue.component('v-main',vMain);
Vue.component('v-footer',vFooter);

// 配置vuex
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		isShowMenu: false,
		progress: 0
	},
	mutations: {
		updateIsShowMenu(state, isShowMenu) {
			state.isShowMenu = isShowMenu;
		},
		updateProgress(state, progress) {
			state.progress = progress;
		}
	}
})


// 使用highlight.js 实现代码高亮
// 已通过cdn引入
hljs.initHighlightingOnLoad();
Vue.prototype.$hljs = hljs;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
