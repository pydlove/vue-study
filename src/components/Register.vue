<template>
    <div>
        <el-dialog class="aioc-register wow rollIn"
                   :close-on-click-modal="false"
                   :visible.sync="dialogVisible"
                   width="550px"
                   :before-close="close">

            <!--邮箱-->
            <div v-if="showRegisterPage" class="register-main">
                <div class="register-logo">
                    <img :src="logo" alt="logo图">
                    <span>梧桐圈</span>
                </div>
                <div class="register-divider">
                    <el-divider class="wdi-400" content-position="center">使用手机号/邮箱注册</el-divider>
                </div>
                <div class="register-mailboxform">
                    <el-input :class="errorMsg.length > 0 ? 'bor-red mb-10 wdi-400' : 'mb-10 wdi-400'" v-model="form.mailOrPhone"
                              placeholder="请输入手机号码或者邮箱地址"
                              @blur="checkFormat"
                    ></el-input>
                    <div class="errormsg">{{errorMsg}}</div>
                    <div v-show="showVerificationCode" class="verification-main mb-10">
                        <el-input
                                :class="verificationCodeErrorMsg.length > 0 ? 'bor-red verification-in' : 'verification-in'"
                                placeholder="请输入验证码"
                                v-model="form.verificationCode">
                        </el-input>
                        <span v-if="verificationCodeShow" class="verification-send" @click="sendVerificationPrepare" >{{verificationCodeMsg}}</span>
                        <span v-else class="verification-send">（重新发送）{{count}} s</span>
                    </div>
                    <div class="errormsg">{{verificationCodeErrorMsg}}</div>

                    <el-input :class="pwdErrorMsg.length > 0 ? 'bor-red wdi-400' : 'wdi-400'" show-password
                              placeholder="请设置密码,密码不少于8位" v-model="form.password"
                              @blur="checkPwdFormat"
                    ></el-input>
                    <div class="pwdErrormsg">{{pwdErrorMsg}}</div>
                    <el-button class="mti-10 wdi-400" type="primary" @click="submit">注 册</el-button>
                </div>
                <div class="register-ba mt-20">
                    <a class="fr" @click="toLoginPage">登录到梧桐圈</a>
                    <a class="fr">已有账号？</a>
                </div>
            </div>

            <div v-else>
                <div class="slide-title">二次验证</div>
                <div class="slide-main">
                    <slide-verify
                            ref="slideblock"
                            @again="onAgain"
                            @fulfilled="onFulfilled"
                            @success="onSuccess"
                            @fail="onFail"
                            @refresh="onRefresh"
                            :accuracy="accuracy"
                            :slider-text="text"
                            :w="350"
                    ></slide-verify>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Register",
        mounted() {
        },
        methods: {

            /**
             * 关闭当前页面
             */
            close() {
                this.dialogVisible = false;
            },

            /**
             * 初始化打开当前页面
             */
            openRegisterType() {
                this.dialogVisible = true;
            },

            /**
             * 跳转到登录页
             */
            toLoginPage() {
                this.close();
                this.$emit("toLoginPage");
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
                    this.showVerificationCode = true;
                    this.registerType = "mail";
                    return true;
                }
                else if((phoneReg.test(this.form.mailOrPhone))){
                    this.errorMsg = "";
                    this.showVerificationCode = true;
                    this.registerType = "phone";
                    return true;
                }
            },

            /**
             * 密码精度校验
             */
            checkPwdFormat() {
                var pwdReg = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}");
                if(!this.form.password) {
                    this.pwdErrorMsg = "请输入密码";
                    return false;
                }
                else if(!(pwdReg.test(this.form.password))){
                    this.pwdErrorMsg = "您的密码复杂度太低（密码中必须包含字母、数字、特殊字符），至少8个字符，最多30个字符";
                    return false;
                } else {
                    this.pwdErrorMsg = "";
                    return true;
                }
            },

            /**
             * 验证码校验
             */
            checkVerificationCode() {
                if(!this.form.verificationCode) {
                    this.verificationCodeErrorMsg = "请输入验证码";
                    return false;
                } else {
                    this.verificationCodeErrorMsg = "";
                    return true;
                }
            },

            /**
             * 发送验证码
             */
            async sendVerificationPrepare() {
                this.showRegisterPage = false;
            },

            /**
             * 滑块相关方法
             */
            onSuccess(){
                this.showRegisterPage = true;
                this.sendVerificationCode();
            },
            onFail(){
                this.$promptMsg("验证不通过，请再次验证", "error");
                this.onAgain();
            },
            onAgain() {
                // 刷新
                this.$refs.slideblock.reset();
            },

            /**
             * 发送验证码
             */
            sendVerificationCode() {
                if(this.registerType == "mail") {
                    this.sendVerificationCodeToMail();
                }
                else if (this.registerType == "phone") {
                    this.sendVerificationCodeToPhone();
                }
            },

            async sendVerificationCodeToMail() {
                const TIME_COUNT = 60;
                if (!this.timer) {
                    // POST请求以x-www-form-urlencoded格式传输
                    let params = new FormData()
                    params.append("mail", this.form.mailOrPhone);
                    let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_register_mail_sendVerificationCode, params, "POST")
                    if (data.code === 200) {
                        if(data.data == "SUCCESS") {
                            this.errorMsg = "";
                            this.count = TIME_COUNT;
                            this.verificationCodeShow = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count--;
                                } else {
                                    this.verificationCodeShow = true;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000)
                            return true;
                        } else {
                            this.errorMsg = data.msg;
                        }
                    }
                }
            },

            async sendVerificationCodeToPhone() {
                const TIME_COUNT = 60;
                if (!this.timer) {
                    // POST请求以x-www-form-urlencoded格式传输
                    let params = new FormData()
                    params.append("phone", this.form.mailOrPhone);
                    let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_register_phone_sendVerificationCode, params, "POST")
                    if (data.code === 200) {
                        if(data.data == "SUCCESS") {
                            this.errorMsg = "";
                            this.count = TIME_COUNT;
                            this.verificationCodeShow = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count--;
                                } else {
                                    this.verificationCodeShow = true;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000)
                            return true;
                        } else {
                            this.errorMsg = data.msg;
                        }
                    }
                }
            },

            /**
             * 注册
             */
            submit() {
                if(!this.disableSubmit) {
                    this.disableSubmit = true;
                    const checkFormatResult = this.checkFormat();
                    if(!checkFormatResult) {
                        return;
                    }
                    const checkVerificationCodeResult = this.checkVerificationCode();
                    if(!checkVerificationCodeResult) {
                        return;
                    }
                    const checkPwdFormatResult = this.checkPwdFormat();
                    if(!checkPwdFormatResult) {
                        return;
                    }
                    if(this.registerType == "mail") {
                        this.mailRegister();
                    }
                    else if (this.registerType == "phone") {
                        this.phoneRegister();
                    }
                }
            },

            /**
             * 邮箱注册
             */
            async mailRegister() {
                let params = new FormData()
                params.append("mail", this.form.mailOrPhone);
                params.append("password", this.$md5(this.form.password));
                params.append("verificationCode", this.form.verificationCode);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_register_mail, params, "POST");
                this.disableSubmit = false;
                if (data.code === 200) {
                    if(data.data == "SUCCESS") {
                        this.close();
                        this.$promptMsg("注册成功，请登录", "success");
                        var that = this;
                        var toTimer = setTimeout(function(){
                            that.$emit("toLoginPage");
                            clearTimeout(toTimer);
                        }, 2000);
                        return true;
                    } else {
                        this.$promptMsg(data.msg, "error");
                    }
                }
            },

            /**
             * 手机注册
             */
            async phoneRegister() {
                let params = new FormData()
                params.append("phone", this.form.mailOrPhone);
                params.append("password", this.$md5(this.form.password));
                params.append("verificationCode", this.form.verificationCode);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_register_phone, params, "POST");
                this.disableSubmit = false;
                if (data.code === 200) {
                    if(data.data == "SUCCESS") {
                        this.close();
                        this.$promptMsg("注册成功，请登录", "success");
                        var that = this;
                        var toTimer = setTimeout(function(){
                            that.$emit("toLoginPage");
                            clearTimeout(toTimer);
                        }, 2000);
                        return true;
                    } else {
                        this.$promptMsg(data.msg, "error");
                    }
                }
            },

        },
        data() {
            return {
                /* 模态框显示和隐藏 */
                dialogVisible: false,

                /* 显示注册页面还是验证码页面 */
                showRegisterPage: true,

                /* logo图片地址 */
                logo: require('@/assets/img/logo/logo-2.png'),

                /* 是否显示验证码发送 */
                showVerificationCode: false,

                /* 是否显示验证发送 */
                verificationCodeShow: true,
                verificationCodeMsg: "发送验证码",

                /* 计数器 */
                count: "",
                /* 定时器 */
                timer: null,

                /* 手机号码或者邮箱错误提示 */
                errorMsg: "",

                /* 密码精度校验错误提示 */
                pwdErrorMsg: "",

                /* 验证码错误提示 */
                verificationCodeErrorMsg: "",

                /* 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5 */
                accuracy: 2,
                text: '向右滑',

                /* 禁用注册按钮 */
                disableSubmit: false,

                /* 表单 */
                form: {
                    mailOrPhone: "",
                    password: "",
                    verificationCode: "",
                },

                /* 注册方式 */
                registerType: "",
            }
        },

    }
</script>


<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .aioc-register {
            top: 10%;
            padding: 50px;
        }
        .register-main {
            width: 400px;
        }
        .register-logo {
            display: flex;
            justify-content: center;
        }
        .register-logo img {
            margin-top: 5px;
            height: 40px;
        }
        .register-logo span {
            font-size: 22px;
            display: inline-block;
            line-height: 50px;
            width: 80px;
            color: #303133;
        }
        .register-divider {
            display: flex;
            justify-content: center;
        }
        .register-tba a:nth-of-type(1){
            color: #ec414d;
        }
        .register-tba a:nth-of-type(1):hover {
            text-decoration: underline;
        }
        .register-ba a:nth-of-type(1) {
            color: #ec414d;
        }
        .register-ba a:nth-of-type(1):hover {
            text-decoration: underline;
        }
        .verification-main {
            display: flex;
        }
        .verification-in {
            width: 60%;
        }
        .verification-send {
            display: block;
            width: 40%;
            margin-left: 10px;
            line-height: 40px;
            background: #4caf50;
            text-align: center;
            color: #ffffff;
            border-radius: 4px;
        }
        .errormsg {
            text-align: left;
            margin-bottom: 10px;
            padding-left: 5px;
            color: red;
        }
        .pwdErrormsg {
            text-align: left;
            margin-top: 10px;
            padding-left: 5px;
            color: red;
        }
        .slide-title {
            text-align: left;
            margin-bottom: 20px;
            font-size: 18px;
        }
        .slide-main {
            padding: 20px;
            border: 1px solid #eeeeee;
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
        .aioc-register .el-dialog__body {
            padding:0px 20px 30px 20px;
            display: flex;
            justify-content: center;
        }
        .register-type .el-card:nth-of-type(1) > .el-card__body {
            background: #6e2e22;
            color: #ffffff;
        }
        .register-type .el-card:nth-of-type(2) > .el-card__body {
            background: #163e7a;
            color: #ffffff;
        }
        .register-divider .el-divider__text {
            padding: 0 10px !important;
            color: #909399 !important;
        }
        .bor-red > .el-input__inner {border-color: red}
    }
</style>