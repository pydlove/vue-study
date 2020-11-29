<template>
    <div class="loginc" :style="'background-image:url(' + mainBackground + '); height:' + clientHeight + 'px; width:' + clientWidth + 'px;'">
        <div class="lgrc">
            <el-carousel class="tpc wow bounceInLeft" direction="vertical" ndicator-position="outside" interval="2000" autoplay="true">
                <el-carousel-item class="tpc" v-for="item in advertisingBackgrounds" :key="item" >
                    <el-image class="tpc"
                            :src="item"
                            :fit="fit"></el-image>
                </el-carousel-item>
            </el-carousel>
            <div class="gnc wow bounceInRight">
                <div class="gnm">
                    <span class="lotitle">安徽柏林书画研究院网络管理系统</span>
                    <p class="dl">学生端登录</p>

                    <el-form class="lform" label-width="80px" :model="loginForm">
                        <div class="sr">
                            <span class="phone-icon"></span>
                            <el-input class="srin" v-model="loginForm.name" placeholder="请输入手机号"></el-input>
                        </div>

                        <div class="sr">
                            <span class="code-icon"></span>
                            <el-input class="srin" v-model="loginForm.password" placeholder="请输入登录密码"></el-input>
                        </div>

                        <div class="sr">
                            <span class="code-icon"></span>
                            <el-input class="srin vcf" placeholder="请输入验证码" v-model="loginForm.verificationCode" autocomplete="off"></el-input>
                            <!--<img id="imgIdentifyingCode" src="/cpcm-service/v1/login/captcha.jpg"-->
                                 <!--class="vcimg" alt="点击更换" title="点击更换" @click="getIdentifyingCode()" />-->
                            <div class="testimg">
                                <span>5</span>
                                <span>9</span>
                                <span>a</span>
                                <span>h</span>
                            </div>
                        </div>

                        <el-button class="dl-btn" type="primary" @click="login">立即登录</el-button>
                    </el-form>

                    <div class="lbt-tip bt mt-10 wd-350">
                        <a class="fl" @click="toForget">忘记密码»</a>
                        <a class="fr" @click="toRegister">点击注册»</a>
                        <a class="fr">还没有帐号？</a>
                    </div>
                </div>
            </div>
        </div>
        <Footer class="fter"></Footer>
    </div>
</template>

<script>
    import Footer from "@/components/Footer"

    export default {
        name: "sindex",
        components: {Footer},
        mounted() {
            this.clientWidth = document.body.clientWidth;
            this.clientHeight = document.body.clientHeight;
            new this.$wow.WOW({
                live: false
            }).init();
        },
        methods: {
            login() {
                this.$router.push({name: "main"});
            },

            toForget() {
                this.$router.push({name: "forgetPwd"});
            },

            toRegister() {
                this.$router.push({name: "register"});
            },

            /**
             * 图片验证码
             */
            getIdentifyingCode: function () {
                let identifyCodeSrc = this.$aiocUrl.cpcm_service_v1_login_captcha + "?" + Math.random();
                let objs = document.getElementById("imgIdentifyingCode");
                objs.src = identifyCodeSrc;
            },
        },
        data() {
            return {
                // 背景图
                mainBackground: require("../../assets/img/logo/shuhua1.jpg"),
                advertisingBackgrounds: [
                    require("../../assets/img/huangshan.jpg"),
                    require("../../assets/img/daozi.jpg"),
                    require("../../assets/img/reqiqiu.jpg"),
                    require("../../assets/img/badalag.jpg"),
                    require("../../assets/img/shuig.jpg"),
                ],
                clientWidth: 1580,
                clientHeight: 980,
                loginForm: {
                    name: "",
                    password: "",
                    verificationCode: "",
                },
            }
        },
    }
</script>

<style scoped>
        .testimg {
            width: 85px;
            height: 20px;
            background: #ffac56;
            margin-left: 13px;
            line-height: 20px;
            font-size: 12px;
            letter-spacing: 2px;
        }
        .testimg > span:nth-of-type(1) {
            color: #aec2b3;
        }
        .testimg > span:nth-of-type(2) {
            color: #4f77c2;
        }
        .testimg > span:nth-of-type(3) {
            color: #c28122;
        }
        .testimg > span:nth-of-type(4) {
            color: #c20921;
        }
        .loginc {
            background-repeat: no-repeat;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .lgrc {
            min-width: 500px;
            display: flex;
            flex-wrap: nowrap;
        }
        .tpc {
            width: 500px;
            height: 500px;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }
        .gnc {
            width: 500px;
            height: 500px;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            background: #ffffff;
            display: flex;
            justify-content: center;
        }
        .gnm{
            width: 320px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 50px;
            position: relative;
        }
        .dl {

            font-size: 20px;
            color: #606266;
            margin-top: 40px;
        }
        .lform {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px;
            width: 100%;
        }
        .sr {
            display: flex;
            flex-wrap: nowrap;
            width:100%;
            border-bottom: 1px solid #DCDFE6;
            padding-bottom: 20px;
            margin: 10px 0 10px 0;
        }
        .phone-icon {
            display: block;
            width: 14px;
            height: 17px;
            background-size: 100% 100%;
            background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjNEM0QzRDIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHJlY3QgeD0iMSIgeT0iMSIgd2lkdGg9IjExIiBoZWlnaHQ9IjE1IiByeD0iMiIvPjxwYXRoIGQ9Ik02IDEzaDEiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiLz48L2c+PC9zdmc+");
        }
        .code-icon {
            display: block;
            height: 17px;
            width: 17px;
            background-size: 100% 100%;
            background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjNEM0QzRDIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHJlY3QgeD0iMSIgeT0iNyIgd2lkdGg9IjE0IiBoZWlnaHQ9IjkiIHJ4PSIyIi8+PHBhdGggZD0iTTMgN2gxMFY1YTQgNCAwIDAwLTQtNEg3YTQgNCAwIDAwLTQgNHYyeiIvPjxwYXRoIGQ9Ik03IDEzaDIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiLz48L2c+PC9zdmc+");
        }
        .srin {
            height: 17px;
        }
        .vcf {
            width: 200px;
        }
        .vcimg {
            width: 90px;
            height: 25px;
            margin-left: 10px;
        }
        .dl-btn {
            width: 100%;
            padding: 15px 20px;
            margin-top: 20px;
        }
        .bt {
            width: 100%;
            font-size: 14px;
            position: absolute;
            bottom: 40px;
        }
        .lbt-tip a:nth-of-type(1) {
            color: #ec414d;
        }
        .lbt-tip a:nth-of-type(2) {
            color: #ec414d;
        }
        .lbt-tip a:nth-of-type(1):hover {
            text-decoration: underline;
        }
        .lbt-tip a:nth-of-type(2):hover {
            text-decoration: underline;
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
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .srin .el-input__inner {
            height: 17px;
            border: 0px;
            color: #606266;
            height: 17px;
            line-height: 17px;
            outline: 0;
            padding: 0 10px;
            margin-left: 10px;
            width: 100%;
        }
    }
</style>