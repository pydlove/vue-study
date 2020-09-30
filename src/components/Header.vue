<template>
    <div class="header-container">
        <div class="aioc-menu">
            <div class="aiocm-left">
                <div class="aiocm-logo">
                    <img :src="logo" alt="logo图">
                    <span :class="fontColor == null ? 'color-white' : fontColor">梧桐圈</span>
                </div>
                <div class="aiocm-page">
                    <router-link
                            :class="activePage == item.name ? ((fontColor == null ? ' underline-white ' : ' underline-black ') + (fontColor == null ? 'color-white hover-white' : (fontColor + ' hover-black '))) : (fontColor == null ? 'color-white hover-white' : (fontColor + ' hover-black ')) "
                            v-for="(item, index) in leftMenus" :key="index" :to="item.path"
                    >{{item.name}}</router-link>
                </div>
            </div>

            <div class="aiocm-right">
                <router-link :class="fontColor == null ? 'color-white' : fontColor" to="">在梧桐圈能干什么？</router-link>
                <div class="avatar-main" v-if="isLogin"  @mouseover="showUserMenus = true" @mouseout="showUserMenus = false">
                    <img class="avatar"
                         :src="avatar" alt="用户头像"/>
                    <el-card v-show="showUserMenus" class="user-cneter">
                        <ul>
                            <li @click="toPersonCenterPage"><span class="people mr-10"></span>个人中心</li>
                            <li><span class="attention mr-10"></span>我的人脉</li>
                            <li><span class="favorites mr-10"></span>我的关注</li>
                            <li><span class="fans mr-10"></span>我的粉丝</li>
                            <li><span class="contacts mr-10"></span>我的收藏</li>
                            <li><span class="blog mr-10"></span>我的博客</li>
                            <li><span class="accountSetting mr-10"></span>账号设置</li>
                            <li @click="logout"><span class="logout mr-10" ></span>退出</li>
                        </ul>
                    </el-card>
                </div>
                <div v-else class="aiocm-rl">
                    <span @click="toRegisterPage">注册</span>
                    <span :class="fontColor == null ? 'color-white' : fontColor" @click="toLoginPage">登录</span>
                </div>
            </div>
        </div>
        <Login ref="loginRef" @toRegisterPage="toRegisterPage" @toForgetPage="toForgetPage" @initLogin="initLogin"></Login>
        <Register ref="registerRef" @toLoginPage="toLoginPage"></Register>
        <Forget ref="forgetRef" @toLoginPage="toLoginPage"></Forget>
    </div>
</template>

<script>
    import Login from "@/components/Login"
    import Register from "@/components/Register"
    import Forget from "@/components/Forget"

    export default {
        name: "Header",
        props: ["activePage", "fontColor"],
        components: {Login, Register, Forget},
        mounted() {
            this.initLogin();
        },
        methods: {
            /**
             * 前往注册页
             */
            toRegisterPage() {
                this.$refs.registerRef.openRegisterType();
            },
            /**
             * 前往登录页
             */
            toLoginPage() {
                this.$refs.loginRef.open();
            },
            /**
             * 前往忘记密码界面
             */
            toForgetPage() {
                this.$refs.forgetRef.open();
            },

            /**
             * 前往个人中心
             */
            toPersonCenterPage() {
                this.$router.push(
                    { path: '/personCenter' }
                );
            },

            /**
             * 初始化用户数据
             */
            async initLogin() {
                const aioctoken = this.$utils.getCookie("aioctoken");
                const userAvatar = this.$utils.getStorage("avatar");
                if(aioctoken != null && aioctoken != "" && aioctoken != undefined) {
                    this.isLogin = true;
                }
                if(userAvatar != null && userAvatar != "" && userAvatar != undefined) {
                    this.avatar = userAvatar;
                }
            },

            /**
             * 退出
             */
            logout() {
                this.$confirm('确认要退出登录吗？', '确认信息', {
                    closeOnClickModal: false,
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认删除',
                    cancelButtonText: '取消'
                })
                .then(() => {
                    this.logoutRequest();
                })
                .catch({
                });
            },
            async logoutRequest() {
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_login_logout, {}, "GET");
                if (data.code === 200) {
                    this.$utils.removeCookie("aioctoken");
                    this.$utils.removeStorage("avatar");
                    this.isLogin = false;
                    this.avatar = require('@/assets/img/logo/logo-2.png');
                    return true;
                }
            }
        },
        data() {
            return {
                /**
                 * logo图片地址
                 */
                logo: require('@/assets/img/logo/logo-2.png'),

                /**
                 * 选中的菜单
                 */
                active: "首页",

                /**
                 * 菜单
                 */
                leftMenus: [
                    {
                        name: "首页",
                        path: "",
                    },
                    {
                        name: "人才政策",
                        path: "/policy",
                    },
                    {
                        name: "发现",
                        path: "",
                    },
                ],

                /* 是否登录 */
                isLogin: false,

                // 头像
                avatar: require('@/assets/img/logo/logo-2.png'),

                /* 显示用户菜单 */
                showUserMenus: false,
            }
        },
    }
</script>

<style scoped>

    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
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
        a {
            text-decoration: none;
        }

        .header-container {
            display: flex;
            justify-content: center;
        }
        .aiocm-left {
            float: left;
            display: flex;
            flex-wrap: nowrap;
        }
        .aiocm-right {
            float: right;
            height: 50px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
        }
        .aioc-menu {
            width: 1500px;
            height: 50px;
        }
        .aiocm-logo {
            display: flex;
            justify-content: center;
        }
        .aiocm-logo img {
            margin-top: 5px;
            height: 40px;
        }
        .aiocm-logo span {
            font-size: 22px;
            display: inline-block;
            line-height: 50px;
            width: 80px;
        }
        .aiocm-page {
            line-height: 50px;
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
        .avatar {
            margin-top: 5px;
            width: 40px;
            border-radius: 20px;
            border: 1px solid #cccccc;
        }
        .avatar-main {
            position: relative;
        }
        .user-cneter {
            position: absolute;
            width: 160px;
            right: -4px;
            z-index: 999;
            font-size: 14px;
            text-align: left;
        }
        .user-cneter li {
            padding: 10px 0 10px 20px;
        }
        .user-cneter li:hover {
            background: #eeeeee;
        }
    }

    /*媒体查询（平板）*/
    @media screen and (min-width: 769px) and (max-width: 996px) {


    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {


    }
</style>

<style>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .user-cneter .el-card__body{
            padding: 10px 0 10px 0;
        }
    }
</style>