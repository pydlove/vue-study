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
                title: '南京大学太阳数据中心'
            },
            path: '/home',
            name: 'home',
            component: (resolve) => require(['../views/home/index.vue'], resolve),
        },
        {
            meta: {
                title: '南京大学太阳数据中心'
            },
            path: '/home1',
            name: 'home1',
            component: (resolve) => require(['../views/home/index2.vue'], resolve),
        },
        {
            meta: {
                title: '南京大学太阳数据中心'
            },
            path: '/newsAndResource',
            name: 'newsAndResource',
            component: (resolve) => require(['../views/news/newsAndResource.vue'], resolve),
        },
        {
            meta: {
                title: '南京大学太阳数据中心'
            },
            path: '/detail',
            name: 'detail',
            component: (resolve) => require(['../views/news/detail.vue'], resolve),
        },
    ]
})

// 全局拦截器
router.beforeEach((to, from, next) => {
    next()
})

export default router
