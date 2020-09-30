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
    {
        meta: {
            title: '梧桐圈人才政策详情'
        },
        path: '/policyDetail',
        name: 'policyDetail',
        component: (resolve) => require(['../views/policy/policyDetail'], resolve),
    },
    {
      meta: {
          title: '梧桐圈个人中心'
      },
      path: '/personCenter',
      name: 'personCenter',
      component: (resolve) => require(['../views/personCenter/index'], resolve),
    },
      {
      meta: {
          title: '梧桐圈个人中心'
      },
      path: '/Header',
      name: 'Header',
      component: (resolve) => require(['../components/Header'], resolve),
    },
  ],
})

// 全局拦截器
router.beforeEach((to, from, next) => {
  next()
})

export default router
