import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import './plugins/element.js'
import 'normalize.css/normalize.css'
import '@/assets/css/base.css'
import api from './api'
Vue.prototype.$api = api;
// import * as echarts  from 'echarts'
// Vue.prototype.$echarts = echarts
//注册全局组件
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)
//面包屑
import Breadcrumb from './components/Breadcrumb/Breadcrumb.vue'
Vue.component('Breadcrumb', Breadcrumb)
import i18n from './lang'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

NProgress.configure({
  easing: 'ease',  // 动画方式，和css动画属性一样（默认：ease）
  speed: 500,  // 递增进度条的速度，单位ms（默认： 200）
  showSpinner: false, // 是否显示加载ico
  trickle: true,//是否自动递增
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比，0-1（默认：0.08）
  parent: '#container'//指定此选项以更改父容器（默认：body）
})