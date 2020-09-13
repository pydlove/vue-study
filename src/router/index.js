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
  ],
})

// 全局拦截器
router.beforeEach((to, from, next) => {
  next()
})

export default router
