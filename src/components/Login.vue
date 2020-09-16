<template>
    <div>
        <el-dialog class="aioc-login wow rollIn"
                :close-on-click-modal="false"
                :visible.sync="dialogVisible"
                width="500px"
                :before-close="close">
            <div class="login-main">
                <div class="login-logo">
                    <img :src="logo" alt="logo图">
                    <span>梧桐圈</span>
                </div>
                <div class="login-divider">
                    <el-divider class="wdi-350" content-position="center">使用手机号/邮箱登录</el-divider>
                </div>
                <div class="login-form">

                    <el-input :class="errorMsg.length > 0 ? 'bor-red mb-10 wd-350' : 'mb-10 wd-350'" v-model="form.mailOrPhone"
                              placeholder="请输入手机号码或者邮箱地址"
                              @blur="checkFormat"
                    ></el-input>
                    <div class="errormsg">{{errorMsg}}</div>

                    <el-input class="mb-10" v-model="form.password"
                              placeholder="请输入密码" show-password="true"
                              @blur="checkPassword"
                    ></el-input>
                    <div class="pwdErrormsg">{{pwdErrorMsg}}</div>

                    <div class="verification-main mb-5">
                        <el-input class="verification-in" placeholder="请输入验证码" v-model="form.verificationCode" autocomplete="off"></el-input>
                        <img id="imgIdentifyingCode" src="/cpcm-service/v1/login/captcha.jpg"
                             class="verification" alt="点击更换" title="点击更换" @click="getIdentifyingCode()" />
                    </div>

                    <el-button class="mti-10 wd-350" type="primary" @click="submit">登 录</el-button>
                </div>
                <div class="login-ba mt-10 wd-350">
                    <a class="fl" @click="toForgetPage">忘记密码»</a>
                    <a class="fr" @click="toRegisterPage">点击注册»</a>
                    <a class="fr">还没有梧桐圈帐号？</a>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "login",
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },

            /**
             * 图片验证码
             */
            getIdentifyingCode: function () {
                let identifyCodeSrc = this.$aiocUrl.cpcm_service_v1_login_captcha + "?" + Math.random();
                let objs = document.getElementById("imgIdentifyingCode");
                objs.src = identifyCodeSrc;
            },

            /**
             * 检测格式
             */
            checkFormat() {
                var mailReg = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$");
                var phoneReg = new RegExp("^[1][3-8]\\d{9}$|^([6|9])\\d{7}$|^[0][9]\\d{8}$|^[6]([8|6])\\d{5}$");
                if(!this.form.mailOrPhone) {
                    this.errorMsg = "请输入手机号或者邮箱地址";
                    return false;
                }
                else if(!(mailReg.test(this.form.mailOrPhone)) && !(phoneReg.test(this.form.mailOrPhone))){
                    this.errorMsg = "请输入正确的手机号码（支持澳门台湾）或邮箱";
                    return false;
                }
                else if((mailReg.test(this.form.mailOrPhone))){
                    this.errorMsg = "";
                    this.loginType = "mail";
                    return true;
                }
                else if((phoneReg.test(this.form.mailOrPhone))){
                    this.errorMsg = "";
                    this.loginType = "phone";
                    return true;
                }
            },

            /**
             * 密码校验
             */
            checkPassword() {
                if(!this.form.password) {
                    this.pwdErrorMsg = "请输入密码";
                    return false;
                } else {
                    this.pwdErrorMsg = "";
                    return true;
                }
            },

            /**
             * 跳转到注册界面
             */
            toRegisterPage() {
                this.close();
                this.$emit("toRegisterPage");
            },

             /**
             * 跳转到忘记密码界面
             */
             toForgetPage() {
                this.close();
                this.$emit("toForgetPage");
            },

            /**
             * 登陆
             */
            async submit() {
                const checkFormatResult = this.checkFormat();
                if(!checkFormatResult) {
                    return;
                }
                const checkPasswordResult = this.checkPassword();
                if(!checkPasswordResult) {
                    return;
                }
                let params = new FormData()
                params.append("principal", this.form.mailOrPhone);
                params.append("password", this.$md5(this.form.password));
                params.append("verificationCode",  this.form.verificationCode);
                params.append("type", this.loginType);
                params.append("rememberMe", this.form.rememberMe);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_login, params, "POST");
                if (data.code === 200) {
                    this.close();
                    console.log(data.data)
                    return true;
                } else {
                    this.getIdentifyingCode();
                }
            },
        },
        data() {
            return {
                /* 模态框显示和隐藏 */
                dialogVisible: false,

                /* logo图片地址 */
                logo: require('@/assets/img/logo/logo-2.png'),

                /* 手机号码或者邮箱错误提示 */
                errorMsg: "",

                /* 密码校验错误提示 */
                pwdErrorMsg: "",

                /* 注册方式 */
                loginType: "",

                form: {
                    mailOrPhone: "py_world@163.com",
                    password: "1q2w3e4r!@",
                    verificationCode: "",
                    rememberMe: false,
                }
            }
        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .aioc-login {
            top: 10%;
            padding: 50px;
        }
        .login-main {
            /*padding:0px 40px 0px 40px;*/
            width: 350px;
        }
        .login-logo {
            display: flex;
            justify-content: center;
        }
        .login-logo img {
            margin-top: 5px;
            height: 40px;
        }
        .login-logo span {
            font-size: 22px;
            display: inline-block;
            line-height: 50px;
            width: 80px;
            color: #303133;
        }
        .login-divider {
            display: flex;
            justify-content: center;
            color: #909399;
        }
        .login-form .el-input {
            width: 350px;
        }
        .login-ba a:nth-of-type(1) {
            color: #ec414d;
        }
        .login-ba a:nth-of-type(2) {
            color: #ec414d;
        }
        .login-ba a:nth-of-type(1):hover {
            text-decoration: underline;
        }
        .login-ba a:nth-of-type(2):hover {
            text-decoration: underline;
        }
        .verification-main {
            display: flex;
        }
        .verification-in {
            width: 60%;
        }
        .verification {
            width: 40%;
            height: 40px;
            margin-left: 10px;
            border-radius: 4px;
        }
        .errormsg {
            text-align: left;
            margin-bottom: 5px;
            padding-left: 5px;
            color: red;
        }
        .pwdErrormsg {
            text-align: left;
            padding-left: 5px;
            margin-bottom: 5px;
            color: red;
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
    @media screen and (min-width: 1529px) {
        .aioc-login .el-dialog__body {
            padding:0px 20px 30px 20px;
            display: flex;
            justify-content: center;
        }
        .login-divider .el-divider__text {
            color: #909399 !important;
        }
    }
</style>