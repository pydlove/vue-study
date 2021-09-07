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
                title: this.$t('menu.home'),
            },
            path: '/home',
            name: 'home',
            component: (resolve) => require(['../views/home/index.vue'], resolve),
        },
        {
            meta: {
                title: this.$t('menu.newsResources'),
            },
            path: '/newsAndResource',
            name: 'newsAndResource',
            component: (resolve) => require(['../views/news/index.vue'], resolve),
        },
        {
            meta: {
                title: this.$t('menu.newsResources'),
            },
            path: '/newsDetail',
            name: 'newsDetail',
            component: (resolve) => require(['../views/news/detail.vue'], resolve),
        },
        {
            meta: {
                title: this.$t('menu.observationEquipment'),
            },
            path: '/observeDevice',
            name: 'observeDevice',
            component: (resolve) => require(['../views/observeDevice/index.vue'], resolve),
        },
        {
            meta: {
                title: this.$t('menu.observationEquipment'),
            },
            path: '/observeDeviceDetail',
            name: 'observeDeviceDetail',
            component: (resolve) => require(['../views/observeDevice/detail.vue'], resolve),
        },
        {
            meta: {
                title: this.$t('menu.galleryAchievement'),
            },
            path: '/pictureAndAchievement',
            name: 'pictureAndAchievement',
            component: (resolve) => require(['../views/pictureAndAchievement/index.vue'], resolve),
        },
        {
            meta: {
                title: this.$t('menu.observationData'),
            },

            path: '/observationData',
            name: 'observationData',
            component: (resolve) => require(['../views/observationData/index.vue'], resolve),
        },
        {
            meta: {
                title: this.$t('menu.observationData'),
            },

            path: '/observationDataDetail',
            name: 'observationDataDetail',
            component: (resolve) => require(['../views/observationData/observationDataDetail.vue'], resolve),
        },
        {
            meta: {
                title: this.$t('menu.observationApplication'),
            },

            path: '/application',
            name: 'application',
            component: (resolve) => require(['../views/application/index.vue'], resolve),
        },
        {
            meta: {
                title: this.$t('menu.AboutUs'),
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
