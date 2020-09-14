<template>
    <div>
        <el-dialog class="aioc-register wow rollIn"
                   :close-on-click-modal="false"
                   :visible.sync="dialogVisible"
                   width="550px"
                   :before-close="close">
            <div v-if="showRegister == 'type'" class="register-typemain">
                <div class="register-logo">
                    <img :src="logo" alt="logo图">
                    <span>梧桐圈</span>
                </div>
                <div class="register-divider">
                    <el-divider class="wdi-420" content-position="center">请选择使用手机号/邮箱注册</el-divider>
                </div>
                <div class="register-type">
                    <el-card shadow="hover" class="wow bounceInLeft" @click.native="showPhoneRegister">
                        <div class="rtp">
                            <span class="phone mr-10"></span>
                            使用手机号码注册
                        </div>
                    </el-card>

                    <el-card shadow="hover" class="wow bounceInLeft" @click.native="showMailboxRegister">
                        <div class="rtm">
                            <span class="mailbox mr-10"></span>
                            使用邮箱注册
                        </div>
                    </el-card>
                </div>
                <div class="register-ba mt-20">
                    <a class="fr" @click="toLoginPage">登录到梧桐圈</a>
                    <a class="fr">已有账号？</a>
                </div>
            </div>

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
                    <slide-verify v-show="showSlide"
                                  ref="slideblock"
                                  @again="onAgain"
                                  @fulfilled="onFulfilled"
                                  @success="onSuccess"
                                  @fail="onFail"
                                  @refresh="onRefresh"
                                  :accuracy="accuracy"
                                  :slider-text="text"
                                  :w="400"
                    ></slide-verify>
                    <div>{{msg}}</div>
                    <el-button class="mti-10 wdi-400" type="primary">登 录</el-button>
                </div>
                <div class="register-ba mt-20">
                    <a class="fl" @click="showRegisterType">重新选择注册方式»</a>
                    <a class="fr" @click="toLoginPage">登录到梧桐圈</a>
                    <a class="fr">已有账号？</a>
                </div>
            </div>

            <div v-else-if="showRegister == 'mailbox'" class="register-main">
                <div class="register-logo">
                    <img :src="logo" alt="logo图">
                    <span>梧桐圈</span>
                </div>
                <div class="register-divider">
                    <el-divider class="wdi-400" content-position="center">使用邮箱注册</el-divider>
                </div>
                <div class="register-mailboxform">
                    <el-input class="mb-10 wdi-400" v-model="form.mailbox" placeholder="请输入邮箱地址"></el-input>
                    <slide-verify v-show="showSlide"
                                  class="login-slide"
                                  ref="slideblock"
                                  @again="onAgain"
                                  @fulfilled="onFulfilled"
                                  @success="onSuccess"
                                  @fail="onFail"
                                  @refresh="onRefresh"
                                  :accuracy="accuracy"
                                  :slider-text="text"
                                  :w="400"
                    ></slide-verify>
                    <div>{{msg}}</div>
                    <el-button class="mti-10 wdi-400" type="primary">登 录</el-button>
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
            close() {
                this.dialogVisible = false;
            },
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

            showRegisterType() {
                this.showRegister = "type";
            }
        },
        data() {
            return {
                /* 模态框显示和隐藏 */
                dialogVisible: false,

                /* logo图片地址 */
                logo: require('@/assets/img/logo/logo-2.png'),

                /* 显示选择注册类型界面 type phone mailbox */
                showRegister: 'type',

                /* 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5 */
                accuracy: 1,
                msg: '',
                text: '向右滑',
                /* slide的显示和隐藏 */
                showSlide: false,

                form: {
                    phone: "",
                    mailbox: "",
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