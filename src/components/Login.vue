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
                    <el-input class="mb-10" v-model="form.phoneOrMailbox" placeholder="请输入手机号码或邮箱"></el-input>
                    <el-input class="mb-10" v-model="form.password" placeholder="密码" show-password="true"></el-input>
                    <slide-verify v-show="showSlide"
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
                    <div>{{msg}}</div>
                    <el-button class="mti-10 wd-350" type="primary">登 录</el-button>
                </div>
                <div class="login-ba mt-10 wd-350">
                    <a class="fl">忘记密码»</a>
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
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },

            /**
             * 跳转到注册界面
             */
            toRegisterPage() {
                this.close();
                this.$emit("toRegisterPage");
            },

            /**
             * 滑块相关方法
             */
            onSuccess(){
                console.log('验证通过');
                this.msg = 'login success'
            },
            onFail(){
                console.log('验证不通过');
                this.msg = ''
            },
            onRefresh(){
                console.log('点击了刷新小图标');
                this.msg = ''
            },
            onFulfilled() {
                console.log('刷新成功啦！');
            },
            onAgain() {
                console.log('检测到非人为操作的哦！');
                this.msg = 'try again';
                // 刷新
                this.$refs.slideblock.reset();
            },
        },
        data() {
            return {
                /* 模态框显示和隐藏 */
                dialogVisible: false,

                /* logo图片地址 */
                logo: require('@/assets/img/logo/logo-2.png'),

                /* 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5 */
                accuracy: 1,
                msg: '',
                text: '向右滑',
                /* slide的显示和隐藏 */
                showSlide: true,

                form: {
                    phoneOrMailbox: "",
                    password: "",
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