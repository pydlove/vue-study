import Vue from 'vue'
import App from './App.vue'
import './assets/css/reset.css'
import './assets/css/common.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import * as filters from './utils/filters.js'

import url from '@/service/apiUrl'
Vue.prototype.$aiocUrl = url;

import { aiorequest } from '@/service/api' // 引入需要的调用的接口方法
Vue.prototype.$aiorequest = aiorequest;

Vue.use(ElementUI)

Vue.config.productionTip = false

Object.keys(filters).forEach((key) => {
  // 定义全局过滤器
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
