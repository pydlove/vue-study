<template>
    <div class="footer tc">
       <div class="dffn">
            <div class="lh-40">
                <el-image class="logo" :src="logo"></el-image>
            </div>
            <div class="lh-30 tl ml-20 fs-14 xqgs">
                公司备案：<a href="">皖ICP备13074983号</a> <a href="">合肥林切文旅开发有限责任公司</a>
                Copyright © 2018－2020 xxxx.cn All Rights Reserved
                <a class="ml-20" href="">技术支持：杭州爱启云网络科技有限公司</a>
            </div>
       </div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        mounted() {

        },
        methods: {


        },
        data() {
            return {
                logo: require('@/assets/img/logo/logo.png'),
            }
        }
    }
</script>

<style scoped>
    .footer {
        height: 30px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        line-height: 20px;
        background: #272935;
        padding-top: 10px;
    }
    .logo {
        line-height: 30px;
        width: 32px;
        height: 20px;
    }
    .xqgs {
        color: #666;
    }
    .xqgs a, .footer a {
        text-decoration: none;
        color: #888;
    }
    .footer a:hover {
        color: #409EFF;
    }
</style>