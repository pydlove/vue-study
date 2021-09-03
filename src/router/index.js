import Vue from 'vue'
import Router from 'vue-router'
// import head from '@/components/headAndTail/head'
// import tail from '@/components/headAndTail/tail'


// 解决vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
/*Vue.use(head)
Vue.use(tail)*/


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/home'
        },
        {
            meta: {
                title: 'nav.Home'
            },
            path: '/home',
            name: 'home',
            component: (resolve) => require(['../views/home/index.vue'], resolve),
        },
        {
            meta: {
                title: '南京大学太阳数据中心新闻与资源'
            },
            path: '/newsAndResource',
            name: 'newsAndResource',
            component: (resolve) => require(['../views/news/index.vue'], resolve),
        },
        {
            meta: {
                title: '南京大学太阳数据中心新闻与资源'
            },
            path: '/newsDetail',
            name: 'newsDetail',
            component: (resolve) => require(['../views/news/detail.vue'], resolve),
        },
        {
            meta: {
                title: '南京大学太阳数据中心观测设备'
            },
            path: '/observeDevice',
            name: 'observeDevice',
            component: (resolve) => require(['../views/observeDevice/index.vue'], resolve),
        },
        {
            meta: {
                title: '南京大学太阳数据中心观测设备详情'
            },
            path: '/observeDeviceDetail',
            name: 'observeDeviceDetail',
            component: (resolve) => require(['../views/observeDevice/detail.vue'], resolve),
        },
        {
            meta: {
                title: '南京大学太阳数据中心图片与成果'
            },
            path: '/pictureAndAchievement',
            name: 'pictureAndAchievement',
            component: (resolve) => require(['../views/pictureAndAchievement/index.vue'], resolve),
        },
        {
            meta: {
                title: '南京大学太阳数据中心观测数据'
            },

            path: '/observationData',
            name: 'observationData',
            component: (resolve) => require(['../views/observationData/index.vue'], resolve),
        },
        {
            meta: {
                title: '南京大学太阳数据中心观测数据详情'
            },

            path: '/observationDataDetail',
            name: 'observationDataDetail',
            component: (resolve) => require(['../views/observationData/observationDataDetail.vue'], resolve),
        },
        {
            meta: {
                title: '南京大学太阳数据中心观测申请'
            },

            path: '/application',
            name: 'application',
            component: (resolve) => require(['../views/application/index.vue'], resolve),
        },
        {
            meta: {
                title: '南京大学太阳数据中心关于我们'
            },

            path: '/aboutWe',
            name: 'aboutWe',
            component: (resolve) => require(['../views/aboutWe/index.vue'], resolve),
        },
]
})
// 全局拦截器
router.beforeEach((to, from, next) => {
    next()
})

export default router
