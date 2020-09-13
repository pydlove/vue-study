import Vue from 'vue'
import App from './App.vue'
import './assets/css/reset.css'
import './assets/css/common.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import * as filters from './utils/filters.js'

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
