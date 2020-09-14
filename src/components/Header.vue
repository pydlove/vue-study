<template>
    <div class="header-container">
        <div class="aioc-menu">
            <div class="aiocm-left">
                <div class="aiocm-logo">
                    <img :src="logo" alt="logo图">
                    <span>梧桐圈</span>
                </div>
                <div class="aiocm-page">
                    <router-link
                            :class="activePage == item.name ? 'underline' : '' "
                            v-for="(item, index) in leftMenus" :key="index" :to="item.path"
                    >{{item.name}}</router-link>
                </div>
            </div>

            <div class="aiocm-right">
                <router-link to="">在梧桐圈能干什么？</router-link>
                <button>登录 / 注册</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: ["activePage"],
        mounted() {
        },
        methods: {
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
                ]
            }
        },
    }
</script>

<style scoped>
    .underline {
        border-bottom: 1px solid #ffffff;
    }

    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
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
            color: #ffffff;
        }
        .aiocm-page {
            line-height: 50px;
        }
        .aiocm-page > a {
            font-size: 16px;
            display: inline-block;
            line-height: 35px;
            margin-left: 10px;
            color: #ffffff;
        }
        .aiocm-page > a:hover {
            border-bottom: 1px solid #ffffff;
        }
        .aiocm-right a {
            font-size: 16px;
            display: inline-block;
            line-height: 50px;
            margin-right: 10px;
            color: #ffffff;
        }
        .aiocm-right button {
            height: 34px;
            margin-top: 8px;
            border-radius: 5px;
            border: 1px solid #ec414d;
            background-color: #ec414d;
            color: #ffffff;
            font-size: 14px;
        }
        .aiocm-right button:hover {
            border: 1px solid #f11e26;
            background-color: #f11e26;
        }
    }

    /*媒体查询（平板）*/
    @media screen and (min-width: 769px) and (max-width: 996px) {


    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {


    }
</style>