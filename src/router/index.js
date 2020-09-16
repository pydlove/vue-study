import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        name: 'HelloWorld',
        component: (resolve) => require(['../components/HelloWorld'], resolve),
    },
    {
        meta: {
            title: '梧桐圈人才政策'
        },
        path: '/policy',
        name: 'Policy',
        component: (resolve) => require(['../views/policy/index'], resolve),
    },
    {
        meta: {
            title: '梧桐圈人才政策查询'
        },
        path: '/policyInquire',
        name: 'policyInquire',
        component: (resolve) => require(['../views/policy/policyInquire'], resolve),
    },
  ],
})

// 全局拦截器
router.beforeEach((to, from, next) => {
  next()
})

export default router
