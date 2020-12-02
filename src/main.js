import Vue from 'vue'
import App from './App.vue'
import './assets/css/reset.css'
import './assets/css/common.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import * as filters from './utils/filters.js'

// md5
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

/* wow 特效依赖 */
import 'wowjs/css/libs/animate.css'
import wow from 'wowjs'
Vue.prototype.$wow = wow

/* 滑块 */
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);

import jquery from 'jquery'
Vue.prototype.$ = jquery;

import url from '@/service/apiUrl'
Vue.prototype.$aiocUrl = url;

import { aiorequest } from '@/service/api' // 引入需要的调用的接口方法
Vue.prototype.$aiorequest = aiorequest;

/* 工具js */
import tools from '@/assets/js/tools.js'
Vue.prototype.$tools = tools

/* 工具js */
import utils from '@/utils/utils.js'
Vue.prototype.$utils = utils

// axios
import axios from 'axios'
Vue.prototype.$axios = axios;

// echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.prototype.$clientHeight = document.body.clientHeight - 57 - 91

/**
 * 权限指令
 */
Vue.directive('aiocp', {
    bind: function (el, value) {
        var activeBtnAuthority = Vue.prototype.$utils.getCookie('activeBtnAuthority');
        if(activeBtnAuthority == "no*aiocloud*p") {
            el.style.display = 'none';
        } else if (activeBtnAuthority.indexOf(("[" + value.value[0] + "]")) == -1) {
            el.style.display = 'none';
        } else {
            el.style.display = 'inline-block';
        }
    }
});

/**
 * 弹出层封装
 */
Vue.prototype.$promptMsg = function(message, type) {
    this.$message({
        dangerouslyUseHTMLString: true,
        showClose: true,
        message: message,
        type: type
    });
};

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
})

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
