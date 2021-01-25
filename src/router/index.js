import Vue from 'vue'
import Router from 'vue-router'

// 解决vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            meta: {
                title: '安徽伯林书画研究院学生端登录'
            },
            path: '/',
            name: 'studentLogin',
            component: (resolve) => require(['../views/login/sindex.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院系统向导'
            },
            path: '/guide',
            name: 'guide',
            component: (resolve) => require(['../views/guide.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院学生端登录'
            },
            path: '/studentLogin',
            name: 'studentLogin',
            component: (resolve) => require(['../views/login/sindex.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院老师端登录'
            },
            path: '/teacherLogin',
            name: 'teacherLogin',
            component: (resolve) => require(['../views/login/tindex.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台登录'
            },
            path: '/consoleLogin',
            name: 'consoleLogin',
            component: (resolve) => require(['../views/login/cindex.vue'], resolve),
        },

        {
            meta: {
                title: '安徽伯林书画研究院控制台静默页面'
            },
            path: '/silent',
            name: 'silent',
            component: (resolve) => require(['../views/student/silent/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院登录'
            },
            path: '/studentLogin',
            name: 'studentLogin',
            component: (resolve) => require(['../views/login/sindex.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院注册'
            },
            path: '/register',
            name: 'register',
            component: (resolve) => require(['../views/register/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院首此登录'
            },
            path: '/firstLogin',
            name: 'firstLogin',
            component: (resolve) => require(['../views/student/firstLogin/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院首页'
            },
            path: '/main',
            name: 'main',
            component: (resolve) => require(['../views/student/main/index.vue'], resolve),
        },{
            meta: {
                title: '安徽伯林书画研究院活动详情'
            },
            path: '/activityDetail',
            name: 'activityDetail',
            component: (resolve) => require(['../views/student/activity/detail.vue'], resolve),
        },{
            meta: {
                title: '安徽伯林书画研究院活动中心'
            },
            path: '/activity',
            name: 'activity',
            component: (resolve) => require(['../views/student/activity/index.vue'], resolve),
        },{
            meta: {
                title: '安徽伯林书画研究院个人中心'
            },
            path: '/personCenter',
            name: 'personCenter',
            component: (resolve) => require(['../views/student/personCenter/index.vue'], resolve),
        },{
            meta: {
                title: '安徽伯林书画研究院学籍信息'
            },
            path: '/studentStatus',
            name: 'studentStatus',
            component: (resolve) => require(['../views/student/studentStatus/index.vue'], resolve),
        },{
            meta: {
                title: '安徽伯林书画研究院科目续注册'
            },
            path: '/subject',
            name: 'subject',
            component: (resolve) => require(['../views/student/subject/index.vue'], resolve),
        },{
            meta: {
                title: '安徽伯林书画研究院证书信息'
            },
            path: '/certificate',
            name: 'certificate',
            component: (resolve) => require(['../views/student/certificate/index.vue'], resolve),
        },{
            meta: {
                title: '安徽伯林书画研究院证书查询'
            },
            path: '/certificateSearch',
            name: 'certificateSearch',
            component: (resolve) => require(['../views/student/certificate/search.vue'], resolve),
        },



        {
            meta: {
                title: '安徽伯林书画研究院管理控制台'
            },
            path: '/portal',
            name: 'portal',
            component: (resolve) => require(['../views/portal/main/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院教师端我的课程'
            },
            path: '/course',
            name: 'course',
            component: (resolve) => require(['../views/teacher/course/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院教师端我的活动'
            },
            path: '/tactivity',
            name: 'tactivity',
            component: (resolve) => require(['../views/teacher/activity/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院教师端我的活动'
            },
            path: '/tclass',
            name: 'tclass',
            component: (resolve) => require(['../views/teacher/class/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台注册码管理'
            },
            path: '/registrationCode',
            name: 'registrationCode',
            component: (resolve) => require(['../views/console/registrationCode/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台首页'
            },
            path: '/comain',
            name: 'comain',
            component: (resolve) => require(['../views/console/main/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台学员管理'
            },
            path: '/studentm',
            name: 'studentm',
            component: (resolve) => require(['../views/console/student/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台学员管理'
            },
            path: '/teacherm',
            name: 'teacherm',
            component: (resolve) => require(['../views/console/teacher/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台课程管理'
            },
            path: '/mainSubject',
            name: 'mainSubject',
            component: (resolve) => require(['../views/console/class/mainSubject/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台课程管理'
            },
            path: '/subSubject',
            name: 'subSubject',
            component: (resolve) => require(['../views/console/class/subSubject/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台课程管理'
            },
            path: '/classm',
            name: 'classm',
            component: (resolve) => require(['../views/console/class/class/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台活动管理'
            },
            path: '/activitym',
            name: 'activitym',
            component: (resolve) => require(['../views/console/activity/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台活动管理'
            },
            path: '/certificatem',
            name: 'certificatem',
            component: (resolve) => require(['../views/console/certificate/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台财务管理'
            },
            path: '/pay',
            name: 'pay',
            component: (resolve) => require(['../views/console/finance/pay/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台财务管理'
            },
            path: '/income',
            name: 'income',
            component: (resolve) => require(['../views/console/finance/income/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台财务管理'
            },
            path: '/pendingApprove',
            name: 'pendingApprove',
            component: (resolve) => require(['../views/console/finance/pendingApprove/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台财务管理'
            },
            path: '/approve',
            name: 'approve',
            component: (resolve) => require(['../views/console/finance/approve/index.vue'], resolve),
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
                title: '安徽伯林书画研究院控制台工作日志'
            },
            path: '/workLog',
            name: 'workLog',
            component: (resolve) => require(['../views/console/workLog/index.vue'], resolve),
        },
        {
            meta: {
                title: '安徽伯林书画研究院控制台工作审阅'
            },
            path: '/workReview',
            name: 'workReview',
            component: (resolve) => require(['../views/console/workLog/review.vue'], resolve),
        },


        {
            meta: {
                title: '安徽伯林书画研究院控制台操作说明'
            },
            path: '/operation',
            name: 'operation',
            component: (resolve) => require(['../views/console/operation/index.vue'], resolve),
        },
    ],
})

// 全局拦截器
router.beforeEach((to, from, next) => {
    next()
})

export default router
