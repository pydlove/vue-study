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
                    <p class="dl">账号注册</p>

                    <el-form class="rform" label-width="80px" :model="registerForm">
                        <div class="rsr">
                            <span class="phone-icon"></span>
                            <el-input class="srin" v-model="registerForm.name" placeholder="请输入手机号"></el-input>
                        </div>

                        <div class="rsr">
                            <span class="code-icon"></span>
                            <el-input class="srin vcf" v-model="registerForm.verificationCode" placeholder="请输入4位短信验证码"></el-input>
                            <el-button class="hqyzm" disabled>获取验证码</el-button>
                        </div>

                        <div class="rsr">
                            <span class="code-icon"></span>
                            <el-input class="srin" v-model="registerForm.password" placeholder="请输入6-16位字母、数字、下划线组合的密码"></el-input>
                        </div>

                        <div class="rsr">
                            <span class="code-icon"></span>
                            <el-input class="srin" v-model="registerForm.password" placeholder="请再次输入密码"></el-input>
                        </div>

                        <div class="rsr">
                            <span class="code-icon"></span>
                            <el-input class="srin" v-model="registerForm.registrationCode" placeholder="请输入注册码"></el-input>
                        </div>

                        <el-button class="dl-btn" type="primary">立即注册</el-button>
                    </el-form>

                    <div class="rbt-tip bt mt-10 wd-350">
                        <a class="fr" @click="toLogin">去登录»</a>
                        <a class="fr">已有账号？</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        mounted() {
            this.clientWidth = document.body.clientWidth;
            this.clientHeight = document.body.clientHeight;
            new this.$wow.WOW({
                live: false
            }).init();
        },
        methods: {

            toLogin() {
                this.$router.push({name: "studentLogin"});
            },
        },
        data() {
            return {
                // 背景图
                mainBackground: require("../../assets/img/logo/shuhua1.jpg"),
                advertisingBackground: require("../../assets/img/zbsytp.jpg"),
                clientWidth: 1580,
                clientHeight: 980,
                advertisingBackgrounds: [
                    require("../../assets/img/huangshan.jpg"),
                    require("../../assets/img/daozi.jpg"),
                    require("../../assets/img/reqiqiu.jpg"),
                    require("../../assets/img/badalag.jpg"),
                    require("../../assets/img/shuig.jpg"),
                ],
                registerForm: {
                    name: "",
                    password: "",
                    verificationCode: "",
                    registrationCode: "",
                },
            }
        },
    }
</script>

<style scoped>
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
            padding-top: 20px;
            position: relative;
        }
        .dl {
            font-size: 20px;
            color: #606266;
            margin-top: 55px;
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
            width: 220px;
        }
        .hqyzm {
            border: 0px;
            color: #606266;
            font-size: 14px;
            width: 100px;
            height: 20px;
            line-height: 20px;
            padding: 0;
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
        .rbt-tip a:nth-of-type(1) {
            color: #ec414d;
        }
        .rbt-tip a:nth-of-type(1):hover {
            text-decoration: underline;
        }
        .rform {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0px 40px 20px 40px;
        }
        .rsr {
            display: flex;
            flex-wrap: nowrap;
            width:100%;
            border-bottom: 1px solid #DCDFE6;
            padding-bottom: 15px;
            margin: 10px 0 10px 0;

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