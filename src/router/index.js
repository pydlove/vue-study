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
        }
    ]
})
// 全局拦截器
router.beforeEach((to, from, next) => {
    next()
})

export default router
