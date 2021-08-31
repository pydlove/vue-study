<template>
	<!--eslint-disable-->
	<div class="loginc">
		<!--登录-->
		<div v-if="showLogin == 'login'" class="content">
			<div class="content_input">
				<div class="lgrc">
					<div class="gnc">
						<div class="gnm">
							<div class="glkzt">欢迎使用</div>
							<div class="glkzt1">
								南京大学太阳数据中心
							</div>

							<el-form class="lform" label-width="0px" ref="loginForm" :model="loginForm" :rules="rules">
								<div class="sr">
									<span class="phone-icon"></span>
									<el-form-item label="" prop="phone">
										<el-input class="srin" v-model="loginForm.phone" placeholder="请输入手机号码"></el-input>
									</el-form-item>
								</div>

								<div class="sr">
									<span class="pwd-icon"></span>
									<el-form-item class="wp-100" label="" prop="password">
										<el-input class="srin" v-model="loginForm.password" placeholder="请输入登录密码" show-password></el-input>
									</el-form-item>
								</div>

								<div class="sr">
									<span class="code-icon"></span>
									<el-form-item label="" prop="verificationCode">
										<el-input class="srin vcf" placeholder="请输入验证码" v-model="loginForm.verificationCode" autocomplete="off"></el-input>
									</el-form-item>
									<img id="imgIdentifyingCode" src="/web-service/v1/login/captcha.jpg" class="vcimg" alt="点击更换" title="点击更换" @click="getIdentifyingCode()"/>
								</div>

								<el-button class="dl-btn" type="primary" @click="login">
									登 <span class="ml-40"></span> 录
								</el-button>

								<div class="lbt-tip bt mt-15">
									<a class="fl" @click="forgetPwd">忘记密码»</a>
									<a class="fr" @click="toRegister">点击注册»</a>
									<a class="fr">还没有帐号？</a>
								</div>
							</el-form>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!--注册-->
		<div v-else-if="showLogin == 'register'" class="reg_content">
			<div class="reg_content_input">
				<div class="lgrc">
					<div class="reg_gnc">
						<div class="gnm">
							<div class="rglkzt">欢迎注册</div>
							<div class="glkzt1">
								南京大学太阳数据中心
							</div>

							<el-form class="lform rform" ref="regForm" :rules="rules" label-width="0px" :model="registerForm">
								<div class="srr">
									<span class="phone-icon"></span>
									<el-form-item label="" prop="regEmail" required>
										<el-input class="srin" v-model="registerForm.regEmail" placeholder="请输入邮箱" @blur="checkPhoneIsRegister($event)"></el-input>
									</el-form-item>
								</div>

								<div class="srr">
									<span class="pwd-icon"></span>
									<el-form-item class="wp-100" label="" prop="regPwd" required>
										<el-input class="srin" v-model="registerForm.regPwd"
										          placeholder="请输入6-16位字母、数字、特殊字符组合的密码" show-password></el-input>
									</el-form-item>
								</div>

								<div class="srr">
									<span class="pwd-icon"></span>
									<el-form-item class="wp-100" label="" prop="pwdagain" required>
										<el-input class="srin" v-model="registerForm.pwdagain" placeholder="请再次输入密码" show-password></el-input>
									</el-form-item>
								</div>

								<div class="srr">
									<span class="code-icon"></span>
									<el-form-item label="" prop="regCode">
										<el-input class="srin vcf" placeholder="请输入短信验证码" v-model="registerForm.regCode"
										          autocomplete="off"></el-input>
									</el-form-item>
									<span class="dx-code aiocloud-cursor" @click="getCode" :disabled="count > 0">
								{{ countMsg }}
								</span>
									<!--<img id="imgIdentifyingCode" src="/blsh-service/v1/login/captcha.jpg" class="vcimg" alt="点击更换" title="点击更换" @click="getIdentifyingCode()"/>-->
								</div>

								<div class="tl mt-30">
									<el-checkbox @change="check" v-model="userNeedKnow"></el-checkbox>
									<span class="yhxz">
										我已阅读并接受南京大学太阳数据中心<span @click="toSee">用户须知</span>
									</span>
								</div>

								<el-button class="dl-btn" type="primary" @click="register" :disabled="disabled">
									注 <span class="ml-40"></span> 册
								</el-button>

								<div class="lbt-tip1 bt mt-15">
									<a class="fr colori-ffffff" @click="toLogin">去登录»</a>
									<a class="fr">已有账号？</a>
								</div>
							</el-form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<UserNotice ref="userNoticeRef"></UserNotice>
	</div>
</template>
<!--eslint-disable-->
<script>
    import UserNotice from "@/views/login/userNotice.vue"

    export default {
        name: "tindex",
	    components: {
            UserNotice
	    },
        mounted() {
            this.clientWidth = document.body.clientWidth;
            this.clientHeight = document.body.clientHeight;
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
                params.append("phone", this.loginForm.phone.trim());
                params.append("password", this.$md5(this.loginForm.password));
                params.append("verificationCode", this.loginForm.verificationCode.trim());
                params.append("rememberMe", this.loginForm.rememberMe);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_login, params, "POST");
                if (data.code == 200) {
                    this.initStorage();
                    this.$utils.setStorage("staioctoken", data.data);
                    this.user = data.data;
                    // == 2 去首次登录
                    // else 去首页
                    if(this.user.status == "2") {
                        this.$router.push({
                            name: "firstLogin"
                        });
                    } else if(this.user.status == "0") {
                        const page = this.$utils.getStorage("page");
                        if(page != undefined && page != null && page != "") {
                            window.location.href = page;
                        } else {
                            this.$router.push({
                                name: "index"
                            });
                        }
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

            /**
             * 图片验证码
             */
            getIdentifyingCode: function () {
                let identifyCodeSrc = this.$aiocUrl.blsh_service_v1_login_captcha + "?" + Math.random();
                let objs = document.getElementById("imgIdentifyingCode");
                objs.src = identifyCodeSrc;
            },

            toRegister() {
                this.$nextTick(() => {
                    this.$refs["regForm"].clearValidate();
                    this.$refs["loginForm"].clearValidate();
                });
                this.showLogin = "register";
            },

            toLogin() {
                this.$nextTick(() => {
                    this.$refs["regForm"].clearValidate();
                    this.$refs["loginForm"].clearValidate();
                });
                this.showLogin = "login";
            },

            getCode(){
                this.$refs['regForm'].validateField(('regEmail'), errMsg => {
                    if (errMsg) {
	                    return false;
                    } else {
                        if(this.emailIsEffective) {
                            if(this.count == 0) {
                                const TIME_COUNT = 60;
                                if (!this.timer) {
                                    this.count = TIME_COUNT;
                                    this.timer = setInterval(() => {
                                        if (this.count > 0 && this.count <= TIME_COUNT) {
                                            this.countMsg = this.count-- + "秒";
                                        } else {
                                            clearInterval(this.timer);
                                            this.timer = null;
                                            this.countMsg = "验证码";
                                        }
                                    }, 1000);
                                    this.sendCode();
                                }
                            }
                        } else {
                            this.$promptMsg("此邮箱已经被注册，请修改", "error");
                        }
                    }
                });
            },

            async sendCode(){
                let params = new FormData();
                params.append("email", this.registerForm.regEmail);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_email_send, params, "POST");
                if(data.code == 200){
                    return true;
                }
            },

            async checkPhoneIsRegister(e) {
                console.log(this.registerForm.regEmail)
                let params = new FormData()
                params.append("email", this.registerForm.regEmail);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_login_check_email, params, "POST");
                if (data.code == 200) {
                    if(data.data) {
                        this.emailIsEffective = false;
                        this.$promptMsg("此邮箱已经被注册，请修改", "error");
                    } else {
                        this.emailIsEffective = true;
                    }
                }
            },

            check() {
                if(this.userNeedKnow) {
                    this.disabled = false;
                    this.type = "primary";
                } else {
                    this.disabled = true;
                    this.type = "info";
                }
            },

            toSee() {
                this.$refs.userNoticeRef.open();
            },

            register() {
                this.$refs['regForm'].validate((valid) => {
                    if (valid) {
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                if(!this.emailIsEffective) {
                    this.$promptMsg("此号码已经被注册，请修改", "error");
                    return false;
                }
                if (this.registerForm.regPwd != this.registerForm.pwdagain) {
                    this.$promptMsg("两次密码不一致，请重新输入", "error")
                    return false;
                }
                let params = new FormData()
                params.append("phone", this.registerForm.regPhone.trim());
                params.append("password", this.$md5(this.registerForm.regPwd));
                params.append("registrationCode", this.registerForm.registrationCode.trim());
                this.disabled = true;
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_login_register, params, "POST");
                if (data.code == 200) {
                    this.$promptMsg("注册成功，请前去登录！", "success");
                    this.disabled = false;
                    this.clearRegForm();
                    this.toLogin();
                } else {
                    this.disabled = false;
                }
            },

            clearRegForm() {
                this.registerForm = {
                    regPhone: "",
                    regPwd: "",
                    pwdagain: "",
                    registrationCode: ""
                };
            },

        },
        data() {
            return {
                userNeedKnow: "",
                isExist: false,
                timer: "",
                count: "",
                countMsg: "验证码",
                // 忘记密码
                forgetForm: {
                    fgPhone: "",
                    fgPwd: "",
                    fgPwdAgain: "",
                    fgCode: "",
                },

                // 注册
                registerForm: {
                    regEmail: "",
                    regPwd: "",
                    pwdagain: "",
                    registrationCode: "",
                },
                phoneIsEffective: false,
                emailIsEffective: false,
                showLogin: "login",
                type: "info",
                disabled: true,

                // 背景图
                mainBackground: require("../../assets/img/background/bg1.png"),
                clientWidth: 1580,
                clientHeight: 980,
                loginForm: {
                    // phone: "13588404606",
                    // password: "1234!q",
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
                        {required: true, message: '请填写用户密码', trigger: 'blur'}
                    ],
                    verificationCode: [
                        {required: true, message: '请填写验证码', trigger: 'blur'}
                    ],

	                // 注册
                    regEmail: [
                        {type: 'string', required: true, message: '请输入邮箱', trigger: ['change', 'blur']},
                        {
                            validator: function (rule, value, callback) {
                                var strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                                if(!strRegex.test(value)){
                                    callback(new Error("请输入正确的邮箱"));
                                    return false;
                                }
                                else{
                                    callback();
                                }
                            }, trigger: ['change', 'blur']
                        }
                    ],
                    regPwd: [
                        {type: 'string', required: true, message: '请输入密码', trigger: ['change', 'blur']},
                        {
                            validator: function (rule, value, callback) {
                                var pwdReg = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}");
                                if (value.length < 6) {
                                    callback(new Error("密码至少设置6位字符"));
                                } else if(!(pwdReg.test(value))) {
                                    var pwdErrorMsg = "您的密码复杂度太低（密码中必须包含字母、数字、特殊字符）";
                                    callback(new Error(pwdErrorMsg));
                                } else {
                                    callback();
                                }
                            }, trigger: ['change', 'blur']
                        }
                    ],
                    pwdagain: [
                        {type: 'string', required: true, message: '请再次输入密码', trigger: ['change', 'blur']},
                    ],
                    regCode: [
                        {type: 'string', required: true, message: '请输入验证码', trigger: ['change', 'blur']},
                    ],

                    // 忘记密码
                    fgPhone: [
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
                    fgPwd: [
                        {type: 'string', required: true, message: '请输入登录密码', trigger: ['change', 'blur']},
                        {
                            validator: function (rule, value, callback) {
                                var pwdReg = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}");
                                if (value.length < 6) {
                                    callback(new Error("密码至少设置6位字符"));
                                } else if(!(pwdReg.test(value))) {
                                    var pwdErrorMsg = "您的密码复杂度太低（密码中必须包含字母、数字、特殊字符）";
                                    callback(new Error(pwdErrorMsg));
                                } else {
                                    callback();
                                }
                            }, trigger: ['change', 'blur']
                        }
                    ],
                    fgPwdAgain: [
                        {type: 'string', required: true, message: '请再次输入登录密码', trigger: ['change', 'blur']},
                    ],
                    fgCode: [
                        {type: 'string', required: true, message: '请输入验证码', trigger: ['change', 'blur']},
                    ],
                },

            }
        },
    }
</script>

<style scoped>

	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
		.dx-code {
			width: 90px;
			height: 30px;
			background: #fa541c;
			border-radius: 3px;
			font-size: 14px;
			color: #FFFFFF;
			line-height: 30px;
			text-align: center;
		}
		.lbt-tip a:nth-of-type(1) {
			color: #ffc069 !important;
		}

		.lbt-tip a:nth-of-type(2) {
			color: #ffc069 !important;
		}

		.lbt-tip a:nth-of-type(3) {
			color: #ffffff !important;
		}

		.lbt-tip a:nth-of-type(1):hover {
			text-decoration: underline;
		}

		.lbt-tip1 a:nth-of-type(1) {
			color: #ffc069 !important;
		}

		.lbt-tip1 a:nth-of-type(2) {
			color: #ffffff !important;
		}

		.glkzt {
			font-size: 20px;
			margin-top: 50px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-family: SC-Bold !important;
			color: #ffffff;
			width: 100%;
			letter-spacing: 2px;
			padding-left: 40px;
		}
		.rglkzt {
			font-size: 20px;
			margin-top: 50px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-family: SC-Bold !important;
			color: #ffffff;
			width: 100%;
			letter-spacing: 2px;
			padding-left: 40px;
		}
		.glkzt-forget {
			font-size: 20px;
			margin-top: 20px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-family: SC-Bold !important;
			color: #ffffff;
			width: 100%;
			letter-spacing: 2px;
			padding-left: 40px;
		}
		.glkzt1 {
			font-size: 26px;
			margin-top: 10px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-weight: 600;
			font-family: SC-Bold !important;
			color: #ffffff;
			width: 100%;
			letter-spacing: 2px;
			padding: 0 40px;
		}

		.lgrc {
			min-width: 500px;
			display: flex;
			flex-wrap: nowrap;
		}

		.gnc {
			width: 500px;
			height: 500px;
			display: flex;
			justify-content: center;
		}

		.gnm {
		}

		.lform {
			padding: 40px 40px 20px 40px;
		}

		.rform {
			padding: 40px 40px 20px 40px;
			width: 440px;
		}

		.sr {
			display: flex;
			flex-wrap: nowrap;
			margin: 10px 0 20px 0;
			background: rgba(255, 255, 255, 0.3);
			align-items: center;
			height: 40px;
			line-height: 40px;
			padding-left: 10px;
			border-radius: 3px;
		}
		.srr {
			display: flex;
			flex-wrap: nowrap;
			margin: 10px 0 20px 0;
			background: rgba(255, 255, 255, 0.3);
			align-items: center;
			height: 40px;
			line-height: 40px;
			padding-left: 10px;
			border-radius: 3px;
			width: 360px;
		}

		.phone-icon {
			display: block;
			height: 20px;
			width: 20px;
			background-size: 100% 100%;
			background-image: url("../../assets/img/icon/shouji.png");
		}

		.pwd-icon {
			display: block;
			height: 20px;
			width: 20px;
			background-size: 100% 100%;
			background-image: url("../../assets/img/icon/mima.png");
		}

		.code-icon {
			display: block;
			height: 20px;
			width: 20px;
			background-size: 100% 100%;
			background-image: url("../../assets/img/icon/yanzhengma.png");
		}

		.srin {
			height: 17px;
			width: 320px;
		}

		.vcf {
			width: 220px;
		}

		.vcimg {
			width: 90px;
			height: 25px;
			margin-right: 10px;
		}

		.dl-btn {
			width: 100%;
			padding: 15px 20px;
			margin-top: 20px;
			background: linear-gradient(to bottom, #fa541c, #fa541c) !important;
			border: 0px;
			font-size: 16px;
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

		.content {
			width: 480px;
			height: 480px;
			box-sizing: border-box;
			padding: 0 50px;
			border-radius: 5px;
			box-shadow: 0px 2px 12px 0px rgb(105 105 105 / 7%);
			/*background: rgb(12 2 6 / 83%);*/
			background: #17030b;
			position: absolute;
			top: 50%;
			right: -10%;
			transform: translate(-50%, -50%);
			-webkit-animation: mymove-data-v-37dfd6fc 1s ease-in-out alternate;
			animation: mymove-data-v-37dfd6fc 1s ease-in-out alternate;
			overflow: hidden;
			transition: 1.5s;
		}

		/*忘记密码*/
		.fg_content {
			width: 480px;
			height: 480px;
			box-sizing: border-box;
			padding: 0 50px;
			border-radius: 5px;
			box-shadow: 0px 2px 12px 0px rgb(105 105 105 / 7%);
			/*background: rgb(12 2 6 / 83%);*/
			background: #17030b;
			position: absolute;
			top: 50%;
			right: -10%;
			transform: translate(-50%, -50%);
			-webkit-animation: mymove-data-v-37dfd6fc 1s ease-in-out alternate;
			animation: mymove-data-v-37dfd6fc 1s ease-in-out alternate;
			overflow: hidden;
			transition: 1.5s;
		}

		/*注册*/
		.reg_content {
			width: 480px;
			height: 530px;
			box-sizing: border-box;
			padding: 0 50px;
			border-radius: 5px;
			box-shadow: 0px 2px 12px 0px rgb(105 105 105 / 7%);
			/*background: rgb(12 2 6 / 83%);*/
			background: #17030b;
			position: absolute;
			top: 50%;
			right: -10%;
			transform: translate(-50%, -50%);
			-webkit-animation: mymove-data-v-37dfd6fc 1s ease-in-out alternate;
			animation: mymove-data-v-37dfd6fc 1s ease-in-out alternate;
			overflow: hidden;
			transition: 1.5s;
		}

		.forget_content {
			width: 480px;
			height: 520px;
			box-sizing: border-box;
			padding: 0 50px;
			border-radius: 5px;
			box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
			background: rgba(255, 255, 255, 0.26);
			position: absolute;
			top: 45%;
			right: 0%;
			transform: translate(-50%, -50%);
			animation: mymove 1s ease-in-out  alternate;
			overflow: hidden;
			transition: 1.5s;
		}
		.reg_content_input {
			width: 500px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

		}
		.reg_gnc {
			width: 500px;
			height: 580px;
			display: flex;
			justify-content: center;
		}

		.yhxz {
			margin-left: 5px;
			font-size: 12px;
			color: #cccccc;
			letter-spacing: 0.5px;
		}
		.yhxz > span {
			margin-left: 2px;
			color: #fa541c;
		}
		.yhxz > span:hover {
			text-decoration: underline;
		}

		@keyframes mymove {
			0% {
				width: 0px;
				height: 5px;
			}

			10% {
				width: 50px;
				height: 5px;
			}

			15% {
				width: 100px;
				height: 5px;
			}

			20% {
				width: 150px;
				height: 5px;
			}

			25% {
				width: 200px;
				height: 5px;
			}

			30% {
				width: 250px;
				height: 5px;
			}

			35% {
				width: 300px;
				height: 5px;
			}

			40% {
				width: 350px;
				height: 5px;
			}

			45% {
				width: 450px;
				height: 5px;
			}

			50% {
				width: 500px;
				height: 5px;
			}

			55% {
				height: 30px;
			}

			60% {
				height: 60px;
			}

			65% {
				height: 90px;
			}

			70% {
				height: 120px;
			}

			75% {
				height: 150px;
			}

			80% {
				height: 180px;
			}

			85% {
				height: 210px;
			}

			90% {
				height: 240px;
			}

			95% {
				height: 240px;
			}

			100% {
				height: 300px;
			}
		}

		.content_input {
			width: 500px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

		}
		.loginc {
			background-repeat: no-repeat;
			background-size: cover;
			position: relative;
			background-image:url('../../assets/img/background/bg1.png');
			width: 800px;
			height: 600px;
		}
	}

	/*媒体查询（手机）*/
	@media screen and (max-width: 768px) {
		.dx-code {
			width: 90px;
			height: 30px;
			background: #fa541c;
			border-radius: 3px;
			font-size: 14px;
			color: #FFFFFF;
			line-height: 30px;
			text-align: center;
		}
		.lbt-tip, .lbt-tip1 {
			font-size: 14px;
		}
		.lbt-tip a:nth-of-type(1) {
			color: #ffc069 !important;
		}

		.lbt-tip a:nth-of-type(2) {
			color: #ffc069 !important;
		}

		.lbt-tip a:nth-of-type(3) {
			color: #FFFFFF !important;
		}

		.lbt-tip a:nth-of-type(1):hover {
			text-decoration: underline;
		}
		.glkzt {
			font-size: 16px;
			margin-top: 50px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-family: 方正黑体 !important;
			color: #ffffff;
			width: 100%;
			letter-spacing: 2px;
			padding-left: 67px;
		}
		.glkzt-forget {
			font-size: 16px;
			margin-top: 60px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-family: 方正黑体 !important;
			color: #ffffff;
			width: 100%;
			letter-spacing: 2px;
			padding-left: 67px;
		}
		.rglkzt {
			font-size: 16px;
			margin-top: 20px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-family: 方正黑体 !important;
			color: #ffffff;
			width: 100%;
			letter-spacing: 2px;
			padding-left: 67px;
		}
		.glkzt1 {
			font-size: 18px;
			margin-top: 10px;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-weight: 600;
			font-family: 方正黑体 !important;
			color: #ffffff;
			width: 100%;
			letter-spacing: 2px;
			padding: 0 10px;
		}

		.lgrc {
		}

		.gnc {
		}

		.lform {
			padding:10px;
		}
		.sr {
			display: flex;
			flex-wrap: nowrap;
			margin: 10px 0 20px 0;
			background: rgba(255, 255, 255, 0.3);
			align-items: center;
			height: 40px;
			line-height: 40px;
			padding-left: 10px;
			border-radius: 3px;
		}

		.phone-icon {
			display: block;
			height: 16px;
			width: 16px;
			min-width: 16px;
			background-size: 100% 100%;
			background-image: url("../../assets/img/icon/shouji.png");
		}

		.pwd-icon {
			display: block;
			height: 16px;
			width: 16px;
			min-width: 16px;
			background-size: 100% 100%;
			background-image: url("../../assets/img/icon/mima.png");
		}

		.code-icon {
			display: block;
			height: 16px;
			width: 16px;
			min-width: 16px;
			background-size: 100% 100%;
			background-image: url("../../assets/img/icon/yanzhengma.png");
		}

		.srin {
			height: 17px;
		}

		.vcf {
		}

		.vcimg {
			width: 90px;
			height: 25px;
			margin-right: 10px;
		}

		.dl-btn {
			width: 100%;
			margin-top: 15px;
			background: linear-gradient(to bottom, #03db6c, #03bc5e) !important;
			border: 0px;
			font-size: 15px;
			border-radius: 20px;
		}

		.lbt-tip {
			font-size: 14px;
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

		.lbt-tip1 a:nth-of-type(1) {
			color: #ffc069 !important;
		}

		.lbt-tip1 a:nth-of-type(2) {
			color: #ffffff !important;
		}

		/*注册*/
		.reg_content {
			width: 90%;
			height: 490px;
			box-sizing: border-box;
			border-radius: 5px;
			box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
			background: rgba(255, 255, 255, 0.26);
			transform: translate(0%, 10%);
			animation: mymove 1s ease-in-out  alternate;
			overflow: hidden;
			transition: 1.5s;
			margin: 0px auto;
		}
		.forget_content {
			width: 90%;
			height: 440px;
			box-sizing: border-box;
			border-radius: 5px;
			box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
			background: rgba(255, 255, 255, 0.26);
			transform: translate(0%, 10%);
			animation: mymove 1s ease-in-out  alternate;
			overflow: hidden;
			transition: 1.5s;
			margin: 0px auto;
		}
		.reg_content_input {
			transform: translate(0%, 0%);
		}
		.reg_gnc {
		}

		.rform {
			padding: 10px;
		}

		.yhxz {
			margin-left: 5px;
			font-size: 12px;
			color: #cccccc;
			letter-spacing: 0.5px;
		}
		.yhxz > span {
			margin-left: 2px;
			color: #fa541c;
		}
		.yhxz > span:hover {
			text-decoration: underline;
		}

		@keyframes mymove {
			0% {
				width: 0px;
				height: 5px;
			}

			10% {
				width: 50px;
				height: 5px;
			}

			15% {
				width: 100px;
				height: 5px;
			}

			20% {
				width: 150px;
				height: 5px;
			}

			25% {
				width: 200px;
				height: 5px;
			}

			30% {
				width: 250px;
				height: 5px;
			}

			35% {
				width: 300px;
				height: 5px;
			}

			40% {
				width: 350px;
				height: 5px;
			}

			45% {
				width: 450px;
				height: 5px;
			}

			50% {
				width: 500px;
				height: 5px;
			}

			55% {
				height: 30px;
			}

			60% {
				height: 60px;
			}

			65% {
				height: 90px;
			}

			70% {
				height: 120px;
			}

			75% {
				height: 150px;
			}

			80% {
				height: 180px;
			}

			85% {
				height: 210px;
			}

			90% {
				height: 240px;
			}

			95% {
				height: 240px;
			}

			100% {
				height: 300px;
			}
		}

		.phone_logo {
			width: 36px !important;
			height: 36px !important;
		}
		.content_input {
			transform: translate(0%, -10%);
		}

		.content {
			width: 90%;
			height: 400px;
			box-sizing: border-box;
			border-radius: 5px;
			box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
			background: rgba(255, 255, 255, 0.26);
			transform: translate(0%, 20%);
			animation: mymove 1s ease-in-out  alternate;
			overflow: hidden;
			transition: 1.5s;
			margin: 0 auto;
		}

		.loginc {
			background-repeat: no-repeat;
			background-size: cover;
			position: relative;
			background-image:url('../../assets/img/background/bg1.png');
		}
		.fter {
			display: none;
		}
	}
</style>

<style>
	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
		.lform input::-webkit-input-placeholder{
			color: #ffffff !important;
		}

		.srin .el-input__inner {
			height: 17px;
			border: 0px;
			color: #ffffff;
			height: 17px;
			line-height: 17px;
			outline: 0;
			padding: 0 10px;
			margin-left: 10px;
			width: 100%;
		}
		.lform .el-input__inner {
			background-color: transparent;
		}

		.lform .el-form-item {
			margin-bottom: 0px;
		}

		.lform .el-form-item__content {
			line-height: 17px;
		}

		.lform .el-form-item__error {
			color: #ff0300;
			font-size: 12px;
			line-height: 1;
			padding-top: 4px;
			position: absolute;
			top: 168%;
			left: -27px;
		}

		.lform .el-input .el-input__clear {
			position: absolute;
			top: -10px;
			left: -30px;
			color: #ffffff;
		}
	}

	/*媒体查询（手机）*/
	@media screen and (max-width: 768px) {
		.lform input::-webkit-input-placeholder{
			color: #ffffff !important;
		}

		.srin .el-input__inner {
			height: 17px;
			border: 0px;
			color: #ffffff;
			height: 17px;
			line-height: 17px;
			outline: 0;
			padding: 0 10px;
			margin-left: 10px;
			width: 100%;
		}
		.lform .el-input__inner {
			background-color: transparent;
		}

		.lform .el-form-item {
			margin-bottom: 0px;
		}

		.lform .el-form-item__content {
			line-height: 17px;
		}

		.lform .el-form-item__error {
			color: #ff0300;
			font-size: 12px;
			line-height: 1;
			padding-top: 4px;
			position: absolute;
			top: 168%;
			left: -27px;
		}

		.lform .el-input .el-input__clear {
			position: absolute;
			top: -10px;
			left: -30px;
			color: #ffffff;
		}
	}

	.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
		background-color: #fa541c;
		border-color: #fa541c;
	}
	.el-checkbox__inner:hover {
		border-color: #fa541c !important;
	}
	.el-checkbox__inner {
		border-color: #fa541c !important;
	}
</style>
