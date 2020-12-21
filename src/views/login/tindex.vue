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
                    <p class="dl">教师端登录</p>

                    <el-form class="lform" label-width="0px" ref="loginForm" :model="loginForm" :rules="rules">
                        <div class="sr">
                            <span class="phone-icon"></span>
                            <el-form-item label="" prop="account">
                                <el-input class="srin" v-model="loginForm.account" placeholder="请输入账号"></el-input>
                            </el-form-item>
                        </div>

                        <div class="sr">
                            <span class="code-icon"></span>
                            <el-form-item label="" prop="password">
                                <el-input class="srin" v-model="loginForm.password" show-password placeholder="请输入登录密码"></el-input>
                            </el-form-item>
                        </div>

                        <div class="sr">
                            <span class="code-icon"></span>
                            <el-form-item label="" prop="verificationCode">
                                <el-input class="srin vcf" placeholder="请输入验证码" v-model="loginForm.verificationCode" autocomplete="off"></el-input>
                            </el-form-item>
                            <img id="imgIdentifyingCode" src="/console-service/v1/login/captcha.jpg"
                                 class="vcimg" alt="点击更换" title="点击更换" @click="getIdentifyingCode()" />
                            <!--<div class="testimg">-->
                                <!--<span>5</span>-->
                                <!--<span>9</span>-->
                                <!--<span>a</span>-->
                                <!--<span>h</span>-->
                            <!--</div>-->
                        </div>
                        <el-button class="dl-btn" type="primary" @click="login">立即登录</el-button>
                    </el-form>
                </div>
            </div>
        </div>
        <Footer class="fter"></Footer>
    </div>
</template>

<script>
    import Footer from "@/components/Footer"

    export default {
        name: "tindex",
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
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        this.loginRequest();
                    } else {
                        return false;
                    }
                });
            },

            async loginRequest() {
                let params = new FormData()
                params.append("account", this.loginForm.account);
                params.append("password", this.$md5(this.loginForm.password));
                params.append("verificationCode",  this.loginForm.verificationCode);
                params.append("rememberMe", this.loginForm.rememberMe);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_login, params, "POST");
                console.log(data)
                if (data.code == 200) {
                    this.$utils.setStorage("aioctoken", data.data);
                    this.initStorage();
                    this.$router.push({
                        name: "portal"
                    });
                    return true;
                } else {
                    this.getIdentifyingCode();
                }
            },

            initStorage() {
                this.$utils.removeStorage("activeMenu");
                this.$utils.removeStorage("roleId");
            },

            /**
             * 图片验证码
             */
            getIdentifyingCode: function () {
                let identifyCodeSrc = this.$aiocUrl.console_service_v1_login_captcha + "?" + Math.random();
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
                    account: "panyong",
                    password: "1q2w3e4R!Q",
                    verificationCode: "aaaa",
                    rememberMe: false,
                },
                rules: {
                    account: [
                        { required: true, message: '请填写用户名称', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请填写用户密码', trigger: 'blur' }
                    ],
                    verificationCode: [
                        { required: true, message: '请填写验证码', trigger: 'blur' }
                    ],
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
    .lform .el-form-item {
        margin-bottom: 0px;
    }
    .lform .el-form-item__content {
        line-height: 17px;
    }
    .lform .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 20px;
    }
    .lform .el-input .el-input__clear {
        position: absolute;
        top: -10px;
        left: 10px;
    }
</style>