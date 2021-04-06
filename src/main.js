// 解决360不兼容问题
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import './assets/css/reset.css'
import './assets/css/common.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import * as filters from './utils/filters.js'
import "./assets/icon/iconfont.css"

// 骨架屏
// import Skeleton from './components/Skeleton/skeleton-2';

// Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import { Toast } from "vant";
Vue.use(Toast);
Vue.prototype.$toast = Toast;

import { Notify } from "vant";
Vue.use(Notify);
Vue.prototype.$notify = Notify;

// 微信
import wx from 'weixin-js-sdk'
Vue.use(wx);
Vue.prototype.$wx = wx;

// md5
import md5 from 'js-md5'
/* wow 特效依赖 */
import 'wowjs/css/libs/animate.css'
import wow from 'wowjs'
/* 滑块 */
import SlideVerify from 'vue-monoplasty-slide-verify';
import jquery from 'jquery'
import url from '@/service/apiUrl'
import {aiorequest} from '@/service/api' // 引入需要的调用的接口方法
/* 工具js */
import utils from '@/utils/utils.js'
// axios
import axios from 'axios'
// echarts
import echarts from 'echarts'

Vue.prototype.$md5 = md5

Vue.prototype.$wow = wow

Vue.use(SlideVerify);

Vue.prototype.$ = jquery;

Vue.prototype.$aiocUrl = url;

Vue.prototype.$aiorequest = aiorequest;

Vue.prototype.$utils = utils

Vue.prototype.$axios = axios;

Vue.prototype.$echarts = echarts

Vue.prototype.$clientHeight = document.body.clientHeight - 57 - 91;

Vue.prototype.$blshUrl = "http://localhost:9091";

/**
 * 权限指令
 */
Vue.directive('aiocp', {
    bind: function (el, value) {
        var activeBtnAuthority = Vue.prototype.$utils.getCookie('activeBtnAuthority');
        if (activeBtnAuthority == "no*aiocloud*p") {
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
Vue.prototype.$promptMsg = function (message, type) {
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
    // components: {
    //     Skeleton,
    // },
    router,
    store,
    // render: h => h(Skeleton),
    render: (h) => h(App),
}).$mount('#app')
