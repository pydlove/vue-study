import Vue from 'vue'
import Router from 'vue-router'

// 解决vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)



const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: (resolve) => require(['../views/home/index.vue'], resolve),
        },
        {
            path: '/newsAndResource',
            name: 'newsAndResource',
            component: (resolve) => require(['../views/news/index.vue'], resolve),
        },
        {
            path: '/newsDetail',
            name: 'newsDetail',
            component: (resolve) => require(['../views/news/detail.vue'], resolve),
        },
        {
            path: '/observeDevice',
            name: 'observeDevice',
            component: (resolve) => require(['../views/observeDevice/index.vue'], resolve),
        },
        {
            path: '/observeDeviceDetail',
            name: 'observeDeviceDetail',
            component: (resolve) => require(['../views/observeDevice/detail.vue'], resolve),
        },
        {
            path: '/pictureAndAchievement',
            name: 'pictureAndAchievement',
            component: (resolve) => require(['../views/pictureAndAchievement/index.vue'], resolve),
        },
        {
            path: '/observationData',
            name: 'observationData',
            component: (resolve) => require(['../views/observationData/index.vue'], resolve),
        },
        {
            path: '/observationDataDetail',
            name: 'observationDataDetail',
            component: (resolve) => require(['../views/observationData/observationDataDetail.vue'], resolve),
        },
        {
            path: '/application',
            name: 'application',
            component: (resolve) => require(['../views/application/index.vue'], resolve),
        },
        {
            path: '/aboutWe',
            name: 'aboutWe',
            component: (resolve) => require(['../views/aboutWe/index.vue'], resolve),
        },
        {
            path: '/chaseSatellite',
            name: 'chaseSatellite',
            component: (resolve) => require(['../views/chaseSatellite/index.vue'], resolve),
        },

]
})
// 全局拦截器
router.beforeEach((to, from, next) => {
    next()
})

export default router
