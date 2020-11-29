<template>
    <div class="header-container">
        <div class="header-main">
            <div class="dfjc bl">
                <div :class="'aioc-menu ' + (bgColor == null ? '':bgColor)">
                    <div class="aiocm-left">
                        <div class="aiocm-logo" @click="toMain">
                            <el-image class="logo" :src="logo"></el-image>
                        </div>
                        <span class="fs-24 ml-5 fb color-white">安徽柏林书画研究院</span>
                        <div class="aiocm-page">
                            <router-link
                                    :class="activePage == item.name ? ((fontColor == null ? ' underline-white ' : ' underline-white color-white ') + (fontColor == null ? 'color-white hover-white' : (fontColor + ' hover-white '))) : (fontColor == null ? 'color-white hover-white' : (fontColor + ' hover-white ')) "
                                    v-for="(item, index) in menus" :key="index" :to="item.path"
                            >{{item.name}}</router-link>
                        </div>
                    </div>

                    <div class="aiocm-right">
                        <div v-if="isLogin" class="login-container">
                            <div class="avatar-main mr-30" @mouseover="showUserMenus = true" @mouseout="showUserMenus = false">
                                <img class="avatar show-avatar"
                                     :src="avatar" alt="用户头像" />
                                <el-card v-show="showUserMenus" class="user-cneter show-avatar">
                                    <ul class="show-avatar">
                                        <li @click="toPersonCenterPage('myProfile')"><span class="people mr-10"></span>个人中心</li>
                                        <li @click="toPersonCenterPage('myAccountSet')"><span class="accountSetting mr-10"></span>账号设置</li>
                                        <li @click="logout"><span class="logout mr-10" ></span>退出</li>
                                    </ul>
                                </el-card>
                            </div>
                        </div>
                        <div v-else class="aiocm-rl">
                            <span @click="toRegisterPage">注册</span>
                            <span :class="fontColor == null ? 'color-white' : fontColor" @click="toLoginPage">登录</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: ["activePage", "fontColor", "bgColor"],
        mounted() {
            this.initLogin();
        },
        methods: {

            toMain() {
                this.$router.push({name: "main"});
            },
            /**
             * 前往登录页
             */
            toLoginPage() {
                this.$router.push({name: "login"});
            },

            /**
             * 前往个人中心
             */
            toPersonCenterPage(currentMenu) {
                this.toNewPage("personCenter", "currentMenu", currentMenu);
            },

            toNewPage(to, key, value) {
                const detail = this.$router.resolve({name: to});
                if(key != undefined && key != null && value != null && value != undefined) {
                    this.$utils.setStorage(key, value);
                }
                window.open(detail.href,'_blank');
            },

            /**
             * 初始化用户数据
             */
            async initLogin() {
            },

            /**
             * 退出
             */
            logout() {
                this.$confirm('确认要退出登录吗？', '确认信息', {
                    closeOnClickModal: false,
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认退出',
                    cancelButtonText: '取消'
                })
                .then(() => {
                    this.$router.push({name: "login"})
                })
                .catch({
                });
            },
            async logoutRequest() {
            }
        },
        data() {
            return {
                /**
                 * 选中的菜单
                 */
                active: "首页",

                /**
                 * 菜单
                 */
                menus: [
                    {
                        name: "首页",
                        path: "/main",
                    },
                    {
                        name: "学科报名",
                        path: "/subject",
                    },
                    {
                        name: "活动中心",
                        path: "/activity",
                    },
                    {
                        name: "学籍信息",
                        path: "/studentStatus",
                    },
                    {
                        name: "个人中心",
                        path: "/personCenter",
                    },
                    {
                        name: "证书信息",
                        path: "/certificate",
                    },
                ],

                /* 是否登录 */
                isLogin: true,

                // 头像
                avatar: require('@/assets/img/avatar/avatar-1.jpg'),

                /* 显示用户菜单 */
                showUserMenus: false,
                logo: require('@/assets/img/logo/logo.png'),
            }
        },
    }
</script>

<style scoped>

    .underline-white {
        border-bottom: 1px solid #ffffff;
    }
    .underline-black {
        border-bottom: 1px solid #303133;
    }
    .hover-black:hover {border-bottom: 1px solid #303133;}
    .hover-white:hover {border-bottom: 1px solid #ffffff;}
    .color-white {color: #ffffff;}
    .color-black {color: #303133;}
    .bg-white {background: #ffffff;}
    .bg-black {background: #303133;}
    a {
        text-decoration: none;
    }
    .logo {
        line-height: 100px;
        width: 62px;
        height: 50px;
    }
    .header-container {
        position: absolute;
        top: 0px;
        width: 100%;
    }
    .header-main {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .aiocm-left {
        float: left;
        display: flex;
        flex-wrap: nowrap;
        line-height: 100px;
    }
    .aiocm-right {
        float: right;
        height: 100px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        margin-top: 30px;
    }
    .bl {
        background: url("../assets/img/nothome_top_bg.webp") center center / cover no-repeat rgb(34, 34, 34);
        width: 100%;
        height: 100px;
    }
    .aioc-menu {
        width: 1500px;
        height: 100px;
        background-color:transparent;
    }
    .aiocm-logo {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .aiocm-page {
        margin-left: 20px;
        line-height: 100px;
        color: #303133;
    }
    .aiocm-page > a {
        font-size: 16px;
        display: inline-block;
        line-height: 35px;
        margin-left: 10px;
    }
    .aiocm-right a {
        font-size: 16px;
        display: inline-block;
        line-height: 50px;
        margin-right: 10px;
    }
    .aiocm-rl span:nth-of-type(1) {
        display: inline-block;
        width: 88px;
        height: 34px;
        line-height: 34px;
        margin-top: 8px;
        border-radius: 5px;
        border: 1px solid #ec414d;
        background-color: #ec414d;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
    }
    .aiocm-rl span:nth-of-type(2) {
        display: inline-block;
        width: 88px;
        height: 34px;
        line-height: 34px;
        margin-top: 8px;
        text-align: center;
        font-size: 14px;
        margin-left: 5px;
    }
    .aiocm-rl span:hover {
        border: 1px solid #f11e26;
        background-color: #f11e26;
        border-radius: 5px;
        color: #ffffff;
    }
    .login-container {
        display: flex;
        flex-wrap: nowrap;
    }
    .avatar {
        margin-top: 5px;
        width: 40px;
        border-radius: 20px;
        border: 1px solid #cccccc;
    }
    .avatar-main, .info-main {
        position: relative;
    }
    .user-cneter, .info-center {
        position: absolute;
        width: 160px;
        right: -4px;
        z-index: 999;
        font-size: 14px;
        text-align: left;
    }
    .info-center {
        top: 45px;
        right: -150px;
        width: 350px;
    }
    .user-cneter li {
        padding: 10px 0 10px 20px;
    }
    .user-cneter li:hover {
        background: #eeeeee;
    }
    .comment, .reply {
        color: #ffffff;
        font-size: 16px;
        display: inline-block;
        width: 40px;
        line-height: 50px;
        margin-right: 20px;
    }
    .comment > .el-button,.reply > .el-button {
        width: 42px;
        height: 42px;
    }
    .rcontent {
        font-size: 14px;
        color: #999999;
        position: relative;
    }

    .rcontent > span:nth-of-type(1) {
        color: #409EFF;
        position: absolute;
        right: 40px;
    }
    .rcontent > span:hover {
       text-decoration: underline;
    }
    .rcontent > span:nth-of-type(2) {
        color: #909399;
        position: absolute;
        right: 5px;
    }
    .infinite-list {
        height: 300px;
        padding: 0;
        margin: 0;
        list-style: none;
    }
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
    }

    /*媒体查询（平板）*/
    @media screen and (min-width: 769px) and (max-width: 996px) {


    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {


    }
</style>

<style>
        .user-cneter .el-card__body{
            padding: 10px 0 10px 0;
        }
        .comment .el-badge__content.is-fixed,.reply .el-badge__content.is-fixed {
            top: 17px;
            right: 23px;
        }
        .info-center .el-tabs__item {
            padding: 0 20px;
            height: 45px;
            box-sizing: border-box;
            line-height: 41px;
            display: inline-block;
            list-style: none;
            font-size: 14px;
            font-weight: 500;
            color: #303133;
            position: relative;
            width: 117px;
        }
        .rinfo .el-card__body{
            padding: 5px;
        }

        /*媒体查询（电脑）*/
        @media screen and (min-width: 1529px) {
        }
</style>