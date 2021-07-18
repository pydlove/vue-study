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
    ]
})

// 全局拦截器
router.beforeEach((to, from, next) => {
    next()
})

export default router
