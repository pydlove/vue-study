<template>
    <div class="footer tc">
       <div class="footer1">
            <!--<div class="lh-40">-->
                <!--<el-image class="logo" :src="logo"></el-image>-->
            <!--</div>-->
            <!--<div class="lh-30 tl ml-20 fs-14 xqgs">-->
                <!--公司备案：<a href="">皖ICP备13074983号</a> <a href="">合肥林切文旅开发有限责任公司</a>-->
                <!--Copyright © 2018－2020 xxxx.cn All Rights Reserved-->
                <!--<a class="ml-20" href="">技术支持：杭州爱启云网络科技有限公司</a>-->
            <!--</div>-->
            <div  class="footer2">
                <div class="footer3">
                    <span>友情链接</span>
                    <div class="footer4">
                        <a href="http://www.ah.gov.cn/" target="_blank">安徽省人民政府</a>
                        <a href="http://www.ahxf.gov.cn/" target="_blank">安徽先锋网</a>
                        <a href="http://www.ahswhg.cn/" target="_blank">安徽省公共文化云</a>
                        <a href="http://www.qstheory.cn/" target="_blank">求是网</a>
                        <a href="http://www.gmw.cn/" target="_blank">光明网</a>
                        <a href="http://www.xinhuanet.com/" target="_blank">新华网</a>
                        <a href="http://www.ahwl.org.cn/welcome/" target="_blank">安徽省文学艺术界联合会华网</a>
                    </div>
                </div>
                <div class="footer5">
                    <div>
                        版权所有 copy right: 安徽省伯林书画研究院
                    </div>
                    <div class="dffn jc">
                        <div>
                            皖Icp备16024606号-2
                        </div>
                       <div class="ml-10">
                           公安备案：34019102000254
                       </div>
                    </div>
                    <div>
                        <a href="http://www.aiocloud.ltd" target="_blank">技术支持：杭州爱启云科技</a>
                    </div>
                </div>
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
    .footer5 {
        text-align: center;
        line-height: 22px;
        color: #cccccc !important;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #cccccc;
    }
    .footer3 {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
    }
    .footer4 {
        display: flex;
        flex-wrap: wrap;
    }
    .footer4 a {
        text-decoration: none;
        color: #cccccc !important;
        padding: 5px 20px;
    }
    .footer3 span {
        text-decoration: none;
        color: #ffffff !important;
        padding: 5px 20px;
        width: 80px;
        min-width: 80px;
    }
    .footer2 {
        width: 600px;
        margin: 0px auto;
        color: #FFFFFF;
        text-align: left;
        font-size: 14px;
    }
    .footer1 {
        height: 150px;
        width: 100%;
        background: #333333;
        padding: 30px 0px;
    }
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
        color: #409EFF !important;
    }
</style>