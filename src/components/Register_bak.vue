<template>
    <div>
        <el-dialog class="aioc-register wow rollIn"
                   :close-on-click-modal="false"
                   :visible.sync="dialogVisible"
                   width="550px"
                   :before-close="close">

            <!--方式选择-->
            <div v-if="showRegister == 'type'" class="register-typemain">
                <div class="register-logo">
                    <img :src="logo" alt="logo图">
                    <span>梧桐圈</span>
                </div>
                <div class="register-divider">
                    <el-divider class="wdi-420" content-position="center">请选择使用手机号/邮箱注册</el-divider>
                </div>
                <div class="register-type">
                    <el-card shadow="hover" @click.native="showPhoneRegister">
                        <div class="rtp">
                            <span class="phone mr-10"></span>
                            使用手机号码注册
                        </div>
                    </el-card>

                    <el-card shadow="hover" @click.native="showMailboxRegister">
                        <div class="rtm">
                            <span class="mailbox mr-10"></span>
                            使用邮箱注册
                        </div>
                    </el-card>
                </div>
                <div class="register-tba mt-20">
                    <a class="fr" @click="toLoginPage">登录到梧桐圈</a>
                    <a class="fr">已有账号？</a>
                </div>
            </div>

            <!--手机-->
            <div v-else-if="showRegister == 'phone'" class="register-main">
                <div class="register-logo">
                    <img :src="logo" alt="logo图">
                    <span>梧桐圈</span>
                </div>
                <div class="register-divider">
                    <el-divider class="wdi-400" content-position="center">使用手机号注册</el-divider>
                </div>
                <div class="register-phoneform">
                    <el-input class="mb-10 wdi-400" v-model="form.phone" placeholder="请输入手机号码"></el-input>
                    <el-button class="mti-10 wdi-400" type="primary">注 册</el-button>
                </div>
                <div class="register-ba mt-20">
                    <a class="fl" @click="showRegisterType">重新选择注册方式»</a>
                    <a class="fr" @click="toLoginPage">登录到梧桐圈</a>
                    <a class="fr">已有账号？</a>
                </div>
            </div>

            <!--邮箱-->
            <div v-else-if="showRegister == 'mailbox'" class="register-main">
                <div class="register-logo">
                    <img :src="logo" alt="logo图">
                    <span>梧桐圈</span>
                </div>
                <div class="register-divider">
                    <el-divider class="wdi-400" content-position="center">使用邮箱注册</el-divider>
                </div>
                <div class="register-mailboxform">
                    <el-input class="mb-10 wdi-400" v-model="form.mail" placeholder="请输入邮箱地址"></el-input>

                    <div class="validcode-main mb-10">
                        <el-input
                                class="validcode-in"
                                placeholder="请输入验证码"
                                v-model="form.validateCode">
                        </el-input>
                        <span v-if="validShow" class="validcode-send" @click="sendValidCode" >{{validMsg}}</span>
                        <span v-else class="validcode-send">（重新发送）{{count}} s</span>
                    </div>

                    <el-input class="wdi-400" show-password
                              placeholder="请设置密码" v-model="form.password">
                    </el-input>
                    <!--<el-button class="mti-10 wdi-400" type="primary" @click="">注 册</el-button>-->
                </div>
                <div class="register-ba mt-20">
                    <a class="fl" @click="showRegisterType">重新选择注册方式»</a>
                    <a class="fr" @click="toLoginPage">登录到梧桐圈</a>
                    <a class="fr">已有账号？</a>
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
                this.showRegister = "type";
            },

            /**
             * 跳转到登录页
             */
            toLoginPage() {
                this.close();
                this.$emit("toLoginPage");
            },

            /**
             * 显示手机号码方式注册
             */
            showPhoneRegister() {
                this.showRegister = "phone";
            },

            /**
             * 显示邮箱方式注册
             */
            showMailboxRegister() {
                this.showRegister = "mailbox";
            },

            /**
             * 显示注册方法选择
             */
            showRegisterType() {
                this.showRegister = "type";
            },

            /**
             * 发送验证码
             */
            async sendValidCode() {
                const TIME_COUNT = 60;
                if (!this.timer) {
                    console.log(this.form.mobile)
                    var reg = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$");
                    if(!this.form.mail) {
                        this.$promptMsg("请填写邮箱地址", "error");
                        return;
                    }
                    else if(!(reg.test(this.form.mail))){
                        this.$promptMsg("请填写正确的邮箱地址", "error");
                        return false;
                    }
                    var params = {
                        mail: this.form.mail,
                    }
                    let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_register_mail_sendValidCode, params, "GET") // 调用接口得到返回值处理
                    if (data.code === "200") {
                        this.count = TIME_COUNT;
                        this.validShow = false;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                            } else {
                                this.validShow = true;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                        return true;
                    }
                }
            },
        },
        data() {
            return {
                /* 模态框显示和隐藏 */
                dialogVisible: true,

                /* logo图片地址 */
                logo: require('@/assets/img/logo/logo-2.png'),

                /* 显示选择注册类型界面 type phone mailbox */
                showRegister: 'mailbox',

                /* 是否显示验证发送 */
                validShow: true,
                validMsg: "发送验证码",

                /* 计数器 */
                count: "",
                /* 定时器 */
                timer: null,

                form: {
                    phone: "",
                    mail: "",
                    validateCode: "",
                }
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
        .register-typemain {
            width: 420px;
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
        .register-type {
            display: flex;
            flex-wrap: nowrap;
        }
        .register-type .el-card {
            width: 200px;
        }
        .register-type .el-card:nth-of-type(1) {
            margin-right: 10px;
        }
        .register-type .el-card:nth-of-type(2) {
            margin-left: 10px;
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
        .register-ba a:nth-of-type(2) {
            color: #ec414d;
        }
        .register-ba a:nth-of-type(1):hover {
            text-decoration: underline;
        }
        .register-ba a:nth-of-type(2):hover {
            text-decoration: underline;
        }
        .rtp,.rtm {
            display: flex;
            justify-content: center;
            line-height: 32px;
        }
        .validcode-main {
            display: flex;
        }
        .validcode-in {
            width: 60%;
        }
        .validcode-send {
            display: block;
            width: 40%;
            margin-left: 10px;
            line-height: 40px;
            background: #4caf50;
            text-align: center;
            color: #ffffff;
            border-radius: 4px;
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
    }
</style>