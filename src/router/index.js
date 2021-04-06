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
            redirect: '/login'
        },
        {
            meta: {
                title: '安徽伯林书画研究院H5投票系统登录'
            },
            path: '/',
            name: 'login',
            component: (resolve) => require(['../views/portal/login/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院H5投票系统登录'
            },
            path: '/login',
            name: 'login',
            component: (resolve) => require(['../views/portal/login/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院H5投票系统'
            },
            path: '/main',
            name: 'main',
            component: (resolve) => require(['../views/portal/main/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台用户管理'
            },
            path: '/user',
            name: 'user',
            component: (resolve) => require(['../views/portal/user/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台菜单管理'
            },
            path: '/menu',
            name: 'menu',
            component: (resolve) => require(['../views/portal/menu/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台角色管理'
            },
            path: '/role',
            name: 'role',
            component: (resolve) => require(['../views/portal/role/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台审计日志'
            },
            path: '/log',
            name: 'log',
            component: (resolve) => require(['../views/portal/log/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院H5投票系统'
            },
            path: '/activity',
            name: 'activity',
            component: (resolve) => require(['../views/app/activity/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院投票活动'
            },
            path: '/am',
            name: 'am',
            component: (resolve) => require(['../views/app/activity/main.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院投票活动'
            },
            path: '/amVote',
            name: 'amVote',
            component: (resolve) => require(['../views/app/activity/mainVote.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院投票活动'
            },
            path: '/voteApp',
            name: 'voteApp',
            component: (resolve) => require(['../views/app/activity/app.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院投票活动'
            },
            path: '/skeleton',
            name: 'skeleton',
            component: (resolve) => require(['../components/Skeleton/skeleton-2.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院投票活动'
            },
            path: '/errorPage',
            name: 'errorPage',
            component: (resolve) => require(['../components/WxErrorPage.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院财务统计'
            },
            path: '/financial',
            name: 'financial',
            component: (resolve) => require(['../views/app/activity/financial.vue'], resolve),
        },
    ]
})

// 全局拦截器
router.beforeEach((to, from, next) => {
    next()
})

export default router
