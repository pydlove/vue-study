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

// Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//head
import head from '@/components/headAndTail/head';
Vue.use(head);/*使用自定义的公共组件*/
Vue.component('head',head);/*初始化公共组件*/

//tail
import tail from '@/components/headAndTail/tail';
Vue.use(tail);/*使用自定义的公共组件*/
Vue.component('tail',tail);/*初始化公共组件*/

//视频播放器
import  VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

// iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import { Toast } from "vant";
Vue.use(Toast);
Vue.prototype.$toast = Toast;

import { Notify } from "vant";
Vue.use(Notify);
Vue.prototype.$notify = Notify;

// 图片压缩
import imageConversion from 'image-conversion';
Vue.prototype.$imageConversion = imageConversion;

// 微信
import wx from 'weixin-js-sdk'
Vue.use(wx);
Vue.prototype.$wx = wx;

// md5
import md5 from 'js-md5'

import jquery from 'jquery'
import url from '@/service/apiUrl'
import {aiorequest} from '@/service/api' // 引入需要的调用的接口方法

/* 工具js */
import utils from '@/utils/utils.js'

// axios
import axios from 'axios'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

// 国际化
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

// 使用语言包
const i18n = new VueI18n({
    locale: 'zh',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        'zh': require('./assets/lang/zh'),   // 中文语言包
        'en': require('./assets/lang/en')    // 英文语言包
    }
});
import ElementLocale from 'element-ui/lib/locale';
ElementLocale.i18n((key, value) => i18n.t(key, value));

Vue.prototype.$md5 = md5

Vue.prototype.$ = jquery;

Vue.prototype.$aiocUrl = url;

Vue.prototype.$aiorequest = aiorequest;

Vue.prototype.$utils = utils

Vue.prototype.$axios = axios;

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

Vue.directive('aiocp2', {
    bind: function (el, value) {
        var activeBtnAuthority = Vue.prototype.$utils.getCookie('activeBtnAuthority');
        if (activeBtnAuthority == "no*aiocloud*p") {
            el.style.display = 'none';
        } else if (activeBtnAuthority.indexOf(("[" + value.value[0] + "]")) == -1) {
            el.style.display = 'none';
        } else {
            el.style.display = 'block';
        }
    }
});

/**
 * 弹出层封装
 */
Vue.prototype.$promptMsg = function (message, type) {
    // this.$message({
    //     dangerouslyUseHTMLString: true,
    //     showClose: true,
    //     message: message,
    //     type: type
    // });
    let title = "成功";
    switch (type) {
        case "success":
            title = "成功";
            this.$notify({
                title: title,
                message: message,
                type: type
            });
            break;
        case "warning":
            title = "警告";
            this.$notify({
                title: title,
                message: message,
                type: type
            });
            break;
        case "info":
            title = "消息";
            this.$notify({
                title: title,
                message: message,
            });
            break;
        case "error":
            this.$notify.error({
                title: '错误',
                message: message
            });
            break;
        default:
            title = "提示";
            this.$notify({
                title: title,
                message: message,
            });
    }
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
    i18n,
    render: (h) => h(App),
}).$mount('#app')
