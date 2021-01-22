<template>
	<!--eslint-disable-->
	<div class="loginc"
	     :style="'background-image:url(' + mainBackground + '); height:' + clientHeight + 'px; width:' + clientWidth + 'px;'">
		<div class="lgrc">
			<el-carousel class="tpc wow bounceInLeft" direction="vertical" ndicator-position="outside" interval="2000"
			             autoplay="true">
				<el-carousel-item class="tpc" v-for="item in advertisingBackgrounds" :key="item">
					<el-image class="tpc"
					          :src="item"
					          :fit="fit"></el-image>
				</el-carousel-item>
			</el-carousel>
			<div class="gnc wow bounceInRight">
				<div class="gnm">
					<div class="xstd">安徽省伯林书画研究院</div>
					<div class="xstd mb-20"> <i class="xuesheng mr-10"></i>学生天地</div>

					<el-form class="login-form" ref="form" :rules="rules" label-width="0px" :model="loginForm">
						<el-form-item label="" prop="phone" required>
							<div class="rsr">
								<span class="phone-icon"></span>
								<el-input class="srin" v-model="loginForm.phone" placeholder="请输入手机号"></el-input>
							</div>
						</el-form-item>

						<el-form-item label="" prop="password" required>
							<div class="rsr">
								<span class="phone-icon"></span>
								<el-input class="srin" v-model="loginForm.password" placeholder="请输入登录密码" show-password></el-input>
							</div>
						</el-form-item>

						<el-form-item label="" prop="verificationCode" required>
							<div class="sr">
								<span class="code-icon"></span>
								<el-input class="srin vcf" placeholder="请输入验证码" v-model="loginForm.verificationCode"
								          autocomplete="off"></el-input>
								<img id="imgIdentifyingCode" src="/blsh-service/v1/login/captcha.jpg"
								     class="vcimg" alt="点击更换" title="点击更换" @click="getIdentifyingCode()"/>
							</div>
						</el-form-item>

						<el-button class="dl-btn" type="primary" @click="login">立即登录</el-button>
					</el-form>

					<div class="lbt-tip bt mt-10 wd-350">
						<!--<a class="fl" @click="toForget">忘记密码»</a>-->
						<a class="fr" @click="toRegister">点击注册»</a>
						<a class="fr">还没有帐号？</a>
					</div>
				</div>
			</div>
		</div>

		<div class="zc">
			目前不支持IE、360浏览器，建议使用谷歌、火狐、Microsoft Edge等浏览器访问
		</div>
		<Footer class="fter"></Footer>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Footer from "@/components/Footer"

    export default {
        name: "sindex",
        components: {Footer},
        mounted() {
            new this.$wow.WOW({
                live: false
            }).init();

            this.$nextTick(() => {
                this.$refs["form"].clearValidate();
            });
        },
        methods: {
            clearForm() {
                this.loginForm = {
                    name: "",
                    password: "",
                    verificationCode: "",
                    rememberMe: false,
                };
            },

            login() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                let params = new FormData()
                params.append("phone", this.loginForm.phone.trim());
                params.append("password", this.$md5(this.loginForm.password));
                params.append("verificationCode", this.loginForm.verificationCode.trim());
                params.append("rememberMe", this.loginForm.rememberMe);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_login, params, "POST");
                if (data.code == 200) {
                    this.initStorage();
                    console.log(data.data)
                    this.$utils.setStorage("staioctoken", data.data);
					this.user = data.data;
                    // == 2 去首次登录
	                // else 去首页
                    if(this.user.status == "2") {
                        this.$router.push({
                            name: "firstLogin"
                        });
                    } else if(this.user.status == "0") {
                        this.$router.push({
                            name: "main"
                        });
                    } else if(this.user.status == "1") {
                        this.$notify.error({
                            title: '提示',
                            message: '您的账号目前处于静默状态，不能正常访问登录，请联系客服'
                        });
                        this.$router.push({
                            name: "silent"
                        });
                    }
                    return true;
                } else {
                    this.getIdentifyingCode();
                }
            },

            initStorage() {
                this.$utils.removeStorage("bluserForm");
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
                let identifyCodeSrc = this.$aiocUrl.blsh_service_v1_login_captcha + "?" + Math.random();
                let objs = document.getElementById("imgIdentifyingCode");
                objs.src = identifyCodeSrc;
            },
        },
        data() {
            return {
                user: "",
                // 背景图
                title: require("../../assets/img/logo/17.png"),
                mainBackground: require("../../assets/img/logo/shuhua1.jpg"),
                advertisingBackgrounds: [
                    require("../../assets/img/em/ls.png"),
                ],
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight,
                loginForm: {
                    // phone: "13588404613",
                    // password: "1q2w3e4R!Q",
                    // verificationCode: "xxxx",
                    phone: "",
                    password: "",
                    verificationCode: "",
                    rememberMe: false,
                },
                rules: {
                    phone: [
                        {type: 'string', required: true, message: '请输入手机号', trigger: ['change', 'blur']},
                        {
                            validator: function (rule, value, callback) {
                                if (/^1[34578]\d{9}$/.test(value) == false) {
                                    callback(new Error("请输入正确的手机号"));
                                } else {
                                    callback();
                                }
                            }, trigger: ['change', 'blur']
                        }
                    ],
                    password: [
                        {type: 'string', required: true, message: '请输入密码', trigger: ['change', 'blur']},
                    ],
                    verificationCode: [
                        {type: 'string', required: true, message: '请输入验证码', trigger: ['change', 'blur']},
                    ],
                },
            }
        },
    }
</script>

<style scoped>
	.xstd {
		font-size: 26px;
		color: #000000;
		margin-top: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 800;
		font-family: 华文行楷;
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
	.gnm {
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
		margin-top: 80px;
	}
	.sr {
		display: flex;
		flex-wrap: nowrap;
		width: 100%;
		border-bottom: 1px solid #DCDFE6;
		padding-bottom: 10px;
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
		display: flex;
	}

	.vcf {
		width: 230px;
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

	/*.lbt-tip a:nth-of-type(2) {*/
		/*color: #ec414d;*/
	/*}*/

	.lbt-tip a:nth-of-type(1):hover {
		text-decoration: underline;
	}

	/*.lbt-tip a:nth-of-type(2):hover {*/
		/*text-decoration: underline;*/
	/*}*/

	.rsr {
		display: flex;
		flex-wrap: nowrap;
		width: 360px;
		border-bottom: 1px solid #DCDFE6;
		padding-bottom: 15px;
		margin: 10px 0 10px 0;
	}
	.zc {
		position: absolute;
		bottom: 60px;
		right: 10px;
		color: #000000;
		font-weight: 600;
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

	.login-form .el-form-item {
		margin-bottom: 15px;
	}

	/*媒体查询（电脑）*/
	@media screen and (min-width: 1529px) {

	}
</style>