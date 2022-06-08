<template>
	<!--eslint-disable-->
	<div class="loginc">
		<div class="na-close" @click="closeHtml"></div>
		<!--登录-->
		<div v-if="showLogin == 'login'" class="content">
			<div class="content_input">
				<div class="lgrc">
					<div class="gnc">
						<div class="gnm">
							<div class="glkzt">
								{{ $t('message.Welcome') }}
							</div>
							<div class="glkzt1" style="width: 420px !important;">
								{{ $t('message.SystemName') }}
							</div>

							<el-form class="lform" label-width="0px" ref="loginForm" :model="loginForm" :rules="rules">
								<div class="sr">
									<span class="phone-icon"></span>
									<el-form-item label="" prop="email">
										<el-input class="srin" v-model="loginForm.email" :placeholder="$t('message.InEmail')"></el-input>
									</el-form-item>
								</div>

								<div class="sr">
									<span class="pwd-icon"></span>
									<el-form-item class="wp-100" label="" prop="password">
										<el-input class="srin" v-model="loginForm.password" :placeholder="$t('message.InPassword')" show-password></el-input>
									</el-form-item>
								</div>

								<div class="sr">
									<span class="code-icon"></span>
									<el-form-item label="" prop="verificationCode">
										<el-input class="srin vcf" :placeholder="$t('message.inVerificationCode')" v-model="loginForm.verificationCode" autocomplete="off"></el-input>
									</el-form-item>
									<img id="imgIdentifyingCode" src="/web-service/v1/login/captcha.jpg" class="vcimg" :alt="$t('message.ClickChange')" :title="$t('message.ClickChange')" @click="getIdentifyingCode()"/>
								</div>

								<el-button class="dl-btn" type="primary" @click="login">
									{{ $t('message.Login') }}
								</el-button>

								<div class="lbt-tip bt mt-15">
									<a class="fl" @click="forgetPwd">{{ $t('message.ForgetPwd') }}»</a>
									<a class="fr" @click="toRegister">{{ $t('message.ClickRegister') }}»</a>
									<a class="fr">{{ $t('message.NoAccount') }}？</a>
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
							<div class="rglkzt">
								{{ $t('message.WelcomeToRegister') }}
							</div>
							<div class="glkzt1" style="width: 420px !important;">
								{{ $t('message.SystemName') }}
							</div>

							<el-form class="lform rform" ref="regForm" :rules="rules" label-width="0px" :model="registerForm">
								<div class="srr">
									<span class="phone-icon"></span>
									<el-form-item label="" prop="regEmail" required>
										<el-input class="srin" v-model="registerForm.regEmail" :placeholder="$t('message.InEmail')" @blur="checkPhoneIsRegister($event, 'register')"></el-input>
									</el-form-item>
								</div>

								<div class="srr">
									<span class="pwd-icon"></span>
									<el-form-item class="wp-100" label="" prop="regPwd" required>
										<el-input class="srin" v-model="registerForm.regPwd"
										          :placeholder="$t('message.InPassword')" show-password @blur="checkPwd()"></el-input>
									</el-form-item>
								</div>

								<div class="srr">
									<span class="pwd-icon"></span>
									<el-form-item class="wp-100" label="" prop="pwdagain" required>
										<el-input class="srin" v-model="registerForm.pwdagain" :placeholder=" $t('message.InPasswordAgain')" show-password @blur="checkPwdAgain()"></el-input>
									</el-form-item>
								</div>

								<div class="srr">
									<span class="code-icon"></span>
									<el-form-item label="" prop="registrationCode">
										<el-input class="srin vcf" :placeholder="$t('message.inVerificationCode')" v-model="registerForm.registrationCode"
										          autocomplete="off"></el-input>
									</el-form-item>
									<span class="dx-code aiocloud-cursor" @click="getCode('register')" :disabled="count > 0">
								{{ countMsg }}
								</span>
									<!--<img id="imgIdentifyingCode" src="/blsh-service/v1/login/captcha.jpg" class="vcimg" alt="点击更换" title="点击更换" @click="getIdentifyingCode()"/>-->
								</div>

								<div class="tl mt-30">
									<el-checkbox @change="check" v-model="userNeedKnow"></el-checkbox>
									<span class="yhxz">
										{{ $t('message.ReadNd') }}<span @click="toSee">{{ $t('message.UserNotice') }}</span>
									</span>
								</div>

								<el-button class="dl-btn" type="primary" @click="register" :disabled="disabled">
									{{ $t('message.Register') }}
								</el-button>

								<div class="lbt-tip1 bt mt-15">
									<a class="fr colori-ffffff" @click="toLogin">{{ $t('message.ToLogin') }}»</a>
									<a class="fr">{{ $t('message.HaveAccount') }}？</a>
								</div>
							</el-form>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!--忘记密码-->
		<div v-else-if="showLogin == 'forget'" class="reg_content">
			<div class="reg_content_input">
				<div class="lgrc">
					<div class="reg_gnc">
						<div class="gnm">
							<div class="rglkzt">
								{{ $t('message.ForgetThePassword') }}
							</div>
							<div class="glkzt1" style="width: 375px !important;">
								{{ $t('message.SystemName') }}
							</div>

							<el-form class="lform rform" ref="forgetForm" :rules="rules" label-width="0px" :model="forgetForm">
								<div class="srr">
									<span class="phone-icon"></span>
									<el-form-item label="" prop="fgEmail" required>
										<el-input class="srin" v-model="forgetForm.fgEmail" :placeholder="$t('message.InEmail')" @blur="checkPhoneIsRegister($event, 'forget')"></el-input>
									</el-form-item>
								</div>

								<div class="srr">
									<span class="pwd-icon"></span>
									<el-form-item class="wp-100" label="" prop="fgPwd" required>
										<el-input class="srin" v-model="forgetForm.fgPwd"
										          :placeholder="$t('message.InPasswordRegister')" show-password></el-input>
									</el-form-item>
								</div>

								<div class="srr">
									<span class="pwd-icon"></span>
									<el-form-item class="wp-100" label="" prop="fgPwdAgain" required>
										<el-input class="srin" v-model="forgetForm.fgPwdAgain" :placeholder="$t('message.InPasswordAgain')" show-password></el-input>
									</el-form-item>
								</div>

								<div class="srr">
									<span class="code-icon"></span>
									<el-form-item label="" prop="fgCode">
										<el-input class="srin vcf" :placeholder="$t('message.inVerificationCode')" v-model="forgetForm.fgCode"
										          autocomplete="off"></el-input>
									</el-form-item>
									<span class="dx-code aiocloud-cursor" @click="getCode('forget')" :disabled="forgetcount > 0">
									{{ forgetcountMsg }}
									</span>
								</div>

								<el-button class="dl-btn" type="primary" @click="forget">
									{{ $t('message.Reset') }}
								</el-button>

								<div class="lbt-tip1 bt mt-15">
									<a class="fr colori-ffffff" @click="toLogin">{{ $t('message.ToLogin') }}»</a>
									<a class="fr">{{ $t('message.RememberedPwd') }}？</a>
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
    import UserNotice from "@/views/login/userNotice.vue";

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
            //页面关闭
            closeHtml(){
                this.$emit("closeNotConfirm");
			},

            initLanguage() {
                this.language = this.$i18n.locale;
            },

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
                if(this.loginForm.verificationCode.length != 4) {
                    // this.$promptMsg("请输入正确的验证码", "error");

                    this.$message({
                        message: this.$t('message.inRightCode'),
                        type: 'error'
                    });
                    return;
                }
                let params = new FormData()
                params.append("email", this.loginForm.email.trim());
                params.append("password", this.$md5(this.loginForm.password));
                params.append("verificationCode", this.loginForm.verificationCode.trim());
                params.append("rememberMe", this.loginForm.rememberMe);
                params.append("language", this.language);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_login, params, "POST");
                if (data.code == 200) {
                    this.$utils.setStorage("aiocloudToken", data.data);
                    this.user = data.data;
                    this.$emit("setUser", this.user);
                    this.$emit("closeNotConfirm");
                    return true;
                } else {
                    this.getIdentifyingCode();
                }
            },

            /**
             * 图片验证码
             */
            getIdentifyingCode: function () {
                let identifyCodeSrc = this.$aiocUrl.web_service_v1_login_captcha + "?" + Math.random();
                let objs = document.getElementById("imgIdentifyingCode");
                objs.src = identifyCodeSrc;
            },

            toRegister() {
                this.$nextTick(() => {
                    this.$refs["regForm"].clearValidate();
                    this.$refs["loginForm"].clearValidate();
                    this.$refs["forgetForm"].clearValidate();
                });
                this.showLogin = "register";
            },

            toLogin() {
                this.$nextTick(() => {
                    this.$refs["regForm"].clearValidate();
                    this.$refs["loginForm"].clearValidate();
                    this.$refs["forgetForm"].clearValidate();
                });
                this.showLogin = "login";
            },

            forgetPwd() {
                this.$nextTick(() => {
                    this.$refs["regForm"].clearValidate();
                    this.$refs["loginForm"].clearValidate();
                    this.$refs["forgetForm"].clearValidate();
                });
                this.showLogin = "forget";
            },

            getCode(type){
                if(type == 'register') {
                    this.$refs['regForm'].validateField(('regEmail'), errMsg => {
                        if (errMsg) {
                            return false;
                        } else {
                            if(this.emailIsRegister) {
                                // this.$promptMsg(this.$t('message.HasRegister'), "error");

                                this.$message({
                                    message: this.$t('message.HasRegister'),
                                    type: 'error'
                                });
                                return false;
                            } else {
                                this.sendCode(type);
                            }
                        }
                    });
                }
                if(type == 'forget') {
                    this.$refs['forgetForm'].validateField(('fgEmail'), errMsg => {
                        if (errMsg) {
                            return false;
                        } else {
                            this.sendForgetCode(type);
                        }
                    });
                }
            },

	        sendCode(type) {
                if (this.count == 0) {
                    const TIME_COUNT = 60;
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.countMsg = this.count-- + "s";
                            } else {
                                clearInterval(this.timer);
                                this.timer = null;
                                this.countMsg = this.$t('message.VerificationCode');
                            }
                        }, 1000);
                        this.sendCodeRequest(type);
                    }
                }
	        },

            sendForgetCode(type) {
                if (this.forgetcount == 0) {
                    const TIME_COUNT = 60;
                    if (!this.forgettimer) {
                        this.forgetcount = TIME_COUNT;
                        this.forgettimer = setInterval(() => {
                            if (this.forgetcount > 0 && this.forgetcount <= TIME_COUNT) {
                                this.forgetcountMsg = this.forgetcount-- + "s";
                            } else {
                                clearInterval(this.forgettimer);
                                this.forgettimer = null;
                                this.forgetcountMsg = this.$t('message.VerificationCode');
                            }
                        }, 1000);
                        this.sendCodeRequest(type);
                    }
                }
	        },

            async sendCodeRequest(type){
                let params = new FormData();
                if(type == 'register') {
                    params.append("email", this.registerForm.regEmail);
                }
                else if(type == 'forget') {
                    params.append("email", this.forgetForm.fgEmail);
                }
                params.append("type", type);
                params.append("language", this.language);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_email_send, params, "POST");
                if(data.code == 200){
                    // this.$promptMsg(this.$t('message.sendCode'), "success");

                    this.$message({
                        message: this.$t('message.sendCode'),
                        type: 'success'
                    });
                    return true;
                }
            },

            async checkPhoneIsRegister(e, type) {
                let params = new FormData()
                if(type == 'register') {
                    params.append("email", this.registerForm.regEmail);
                }
                else if(type == 'forget') {
                    params.append("email", this.forgetForm.fgEmail);
                }
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_login_check_email, params, "POST");
                if (data.code == 200) {
                    if(data.data) {
                        this.emailIsRegister = true;
                    } else {
                        this.emailIsRegister = false;
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

            checkPwd() {
              var pwdReg = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}");
              if (this.registerForm.regPwd.length < 6) {
                // this.$notify({
                //     position: 'top',
                //     title: this.$t('message.Error'),
                //     message: this.$t('message.InPassword6'),
                //     type: "error"
                // });

                this.$message({
                  message: this.$t('message.InPassword6'),
                  type: 'error'
                });
                return false;
              } else if(!(pwdReg.test(this.registerForm.regPwd))) {
                // this.$notify({
                //     title: this.$t('message.Error'),
                //     message: this.$t('message.InPasswordLow'),
                //     type: "error"
                // });

                this.$message({
                  message: this.$t('message.InPasswordLow'),
                  type: 'error'
                });
                return false;
              }
            },

            checkPwdAgain() {
              if (this.registerForm.regPwd != this.registerForm.pwdagain) {
                // this.$notify({
                //     title: this.$t('message.Error'),
                //     message: this.$t('message.pwdNotSame'),
                //     type: "error"
                // });

                this.$message({
                  message: this.$t('message.pwdNotSame'),
                  type: 'error'
                });
                return false;
              }
            },

            register() {
                this.$refs['regForm'].validate((valid) => {
                    if (valid) {
                        if(this.emailIsRegister) {
                            // this.$notify({
                            //     title: this.$t('message.Error'),
                            //     message: this.$t('message.HasRegister'),
                            //     type: "error"
                            // });

                            this.$message({
                                message: this.$t('message.HasRegister'),
                                type: 'error'
                            });
                            return false;
                        }

                        var strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                        if(!strRegex.test(this.registerForm.regEmail)){
                            // this.$notify({
                            //     title: this.$t('message.Error'),
                            //     message: this.$t('message.InRightEmail'),
                            //     type: "error"
                            // });

                            this.$message({
                                message: this.$t('message.InRightEmail'),
                                type: 'error'
                            });
                            return false;
                        }

                        var pwdReg = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}");
                        if (this.registerForm.regPwd.length < 6) {
                            // this.$notify({
                            //     position: 'top',
                            //     title: this.$t('message.Error'),
                            //     message: this.$t('message.InPassword6'),
                            //     type: "error"
                            // });

                            this.$message({
                                message: this.$t('message.InPassword6'),
                                type: 'error'
                            });
                            return false;
                        } else if(!(pwdReg.test(this.registerForm.regPwd))) {
                            // this.$notify({
                            //     title: this.$t('message.Error'),
                            //     message: this.$t('message.InPasswordLow'),
                            //     type: "error"
                            // });

                            this.$message({
                                message: this.$t('message.InPasswordLow'),
                                type: 'error'
                            });
                            return false;
                        }
                        if (this.registerForm.regPwd != this.registerForm.pwdagain) {
                            // this.$notify({
                            //     title: this.$t('message.Error'),
                            //     message: this.$t('message.pwdNotSame'),
                            //     type: "error"
                            // });

                            this.$message({
                                message: this.$t('message.pwdNotSame'),
                                type: 'error'
                            });
                            return false;
                        }
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                let params = new FormData()
                params.append("email", this.registerForm.regEmail.trim());
                params.append("password", this.$md5(this.registerForm.regPwd));
                params.append("verificationCode", this.registerForm.registrationCode.trim());
                params.append("language", this.language);
                this.disabled = true;
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_email_register, params, "POST");
                if (data.code == 200) {
                    // this.$promptMsg(this.$t('message.RegisterSuccess'), "success");

                    this.$message({
                        message: this.$t('message.RegisterSuccess'),
                        type: 'success'
                    });

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

            forget() {
                this.$refs['forgetForm'].validate((valid) => {
                    if (valid) {
                        if(!this.emailIsRegister) {
                            this.$promptMsg(this.$t('message.HasRegister'), "error");
                            return false;
                        }
                        if(this.forgetForm.fgPwd != this.forgetForm.fgPwdAgain) {
                            this.$promptMsg(this.$t('message.pwdNotSame'), "error");
                            return false;
                        }
                        this.forgetRequest();
                    } else {
                        return false;
                    }
                });
            },

            async forgetRequest() {
                let params = new FormData()
                params.append("email", this.forgetForm.fgEmail.trim());
                params.append("password", this.$md5(this.forgetForm.fgPwd));
                params.append("verificationCode", this.forgetForm.fgCode.trim());
                params.append("language", this.language);
                console.log( this.forgetForm)
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_email_forget, params, "POST");
                if (data.code == 200) {
                    this.$promptMsg(this.$t('message.ResetSuccess'), "success");
                    this.toLogin();
                    this.clearForgetForm();
                }
            },

            clearForgetForm() {
                this.forgetForm = {
                    fgEmail: "",
                    fgPwd: "",
                    fgPwdAgain: "",
                    fgCode: "",
                };
            },

        },
        data() {
            return {
                language: "zh",
                userNeedKnow: "",
                isExist: false,
                timer: "",
                count: "",
                countMsg: this.$t('message.VerificationCode'),
                forgettimer: "",
                forgetcount: "",
                forgetcountMsg: this.$t('message.VerificationCode'),
                // 忘记密码
                forgetForm: {
                    fgEmail: "",
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
                emailIsRegister: false,
                showLogin: "login",
                type: "info",
                disabled: true,

                // 背景图
                mainBackground: require("../../assets/img/background/bg1.png"),
                clientWidth: 1580,
                clientHeight: 980,
                loginForm: {
                    // email: "py_world@163.com",
                    // password: "1q2w!Q",
                    // verificationCode: "aaaa",
                    email: "",
                    password: "",
                    verificationCode: "",
                    rememberMe: false,
                },
                rules: {
                    email: [
                        {type: 'string', required: true, message: this.$t('message.InEmail'), trigger: ['change', 'blur']},
                        {
                            validator: function (rule, value, callback) {
                                var strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                                if(!strRegex.test(value)){
                                    callback(new Error(this.$t('message.InRightEmail')));
                                    return false;
                                }
                                else{
                                    callback();
                                }
                            }, trigger: ['change', 'blur']
                        }
                    ],
                    password: [
                        {required: true, message: this.$t('message.InPassword'), trigger: 'blur'}
                    ],
                    verificationCode: [
                        {required: true, message: this.$t('message.inVerificationCode'), trigger: 'blur'}
                    ],

	                // 注册
                    regEmail: [
                        {type: 'string', required: true, message: this.$t('message.InEmail'), trigger: ['change', 'blur']},
                        {
                            validator: function (rule, value, callback) {
                                // var strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                                // if(!strRegex.test(value)){
                                //     callback(new Error(this.$t('message.InRightEmail')));
                                //     return false;
                                // }
                                // else{
                                //     callback();
                                // }
                                callback();
                            }, trigger: ['change', 'blur']
                        }
                    ],
                    regPwd: [
                        {type: 'string', required: true, message: this.$t('message.InPassword'), trigger: ['change', 'blur']},
                        {
                            validator: function (rule, value, callback) {
                                // var pwdReg = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}");
                                // if (value.length < 6) {
                                //     callback(new Error(this.$t('message.InPassword6')));
                                // } else if(!(pwdReg.test(value))) {
                                //     var pwdErrorMsg = this.$t('message.InPasswordLow');
                                //     callback(new Error(pwdErrorMsg));
                                // } else {
                                //     callback();
                                // }
                                callback();
                            }, trigger: ['change', 'blur']
                        }
                    ],
                    pwdagain: [
                        {type: 'string', required: true, message: this.$t('message.InPasswordAgain'), trigger: ['change', 'blur']},
                    ],
                    registrationCode: [
                        {type: 'string', required: true, message: this.$t('message.inVerificationCode'), trigger: ['change', 'blur']},
                    ],

                    // 忘记密码
                    fgEmail: [
                        {type: 'string', required: true, message: this.$t('message.InEmail'), trigger: ['change', 'blur']},
                        {
                            validator: function (rule, value, callback) {
                                var strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                                if(!strRegex.test(value)){
                                    callback(this.$t('message.InRightEmail'));
                                    return false;
                                }
                                else{
                                    callback();
                                }
                            }, trigger: ['change', 'blur']
                        }
                    ],
                    fgPwd: [
                        {type: 'string', required: true, message: this.$t('message.InPassword'), trigger: ['change', 'blur']},
                        {
                            validator: function (rule, value, callback) {
                                var pwdReg = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}");
                                if (value.length < 6) {
                                    callback(new Error(this.$t('message.InPassword6')));
                                } else if(!(pwdReg.test(value))) {
                                    var pwdErrorMsg = this.$t('message.InPasswordLow');
                                    callback(new Error(pwdErrorMsg));
                                } else {
                                    callback();
                                }
                            }, trigger: ['change', 'blur']
                        }
                    ],
                    fgPwdAgain: [
                        {type: 'string', required: true, message: this.$t('message.InPasswordAgain'), trigger: ['change', 'blur']},
                    ],
                    fgCode: [
                        {type: 'string', required: true, message: this.$t('message.inVerificationCode'), trigger: ['change', 'blur']},
                    ],
                },

            }
        },
    }
</script>

<style scoped>

	/*媒体查询（电脑）*/
	/*@media screen and (min-width: 768px) {*/
		.na-close{
			position: absolute;
			right: 0;
			background-image: url("../../assets/img/icon/delete.png");
			height: 25px;
			width: 25px;
			background-size: 100% 100%;
		}
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
			height: 540px;
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
			height: 580px;
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
			height: 630px;
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
			height: 690px;
		}
	/*}*/

	/*媒体查询（手机）*/
	/*@media screen and (max-width: 768px) {*/
		/*.dx-code {*/
			/*width: 90px;*/
			/*height: 30px;*/
			/*background: #fa541c;*/
			/*border-radius: 3px;*/
			/*font-size: 14px;*/
			/*color: #FFFFFF;*/
			/*line-height: 30px;*/
			/*text-align: center;*/
		/*}*/
		/*.lbt-tip, .lbt-tip1 {*/
			/*font-size: 14px;*/
		/*}*/
		/*.lbt-tip a:nth-of-type(1) {*/
			/*color: #ffc069 !important;*/
		/*}*/

		/*.lbt-tip a:nth-of-type(2) {*/
			/*color: #ffc069 !important;*/
		/*}*/

		/*.lbt-tip a:nth-of-type(3) {*/
			/*color: #FFFFFF !important;*/
		/*}*/

		/*.lbt-tip a:nth-of-type(1):hover {*/
			/*text-decoration: underline;*/
		/*}*/
		/*.glkzt {*/
			/*font-size: 16px;*/
			/*margin-top: 50px;*/
			/*display: flex;*/
			/*align-items: center;*/
			/*justify-content: flex-start;*/
			/*font-family: 方正黑体 !important;*/
			/*color: #ffffff;*/
			/*width: 100%;*/
			/*letter-spacing: 2px;*/
			/*padding-left: 67px;*/
		/*}*/
		/*.glkzt-forget {*/
			/*font-size: 16px;*/
			/*margin-top: 60px;*/
			/*display: flex;*/
			/*align-items: center;*/
			/*justify-content: flex-start;*/
			/*font-family: 方正黑体 !important;*/
			/*color: #ffffff;*/
			/*width: 100%;*/
			/*letter-spacing: 2px;*/
			/*padding-left: 67px;*/
		/*}*/
		/*.rglkzt {*/
			/*font-size: 16px;*/
			/*margin-top: 20px;*/
			/*display: flex;*/
			/*align-items: center;*/
			/*justify-content: flex-start;*/
			/*font-family: 方正黑体 !important;*/
			/*color: #ffffff;*/
			/*width: 100%;*/
			/*letter-spacing: 2px;*/
			/*padding-left: 67px;*/
		/*}*/
		/*.glkzt1 {*/
			/*font-size: 18px;*/
			/*margin-top: 10px;*/
			/*display: flex;*/
			/*align-items: center;*/
			/*justify-content: flex-start;*/
			/*font-weight: 600;*/
			/*font-family: 方正黑体 !important;*/
			/*color: #ffffff;*/
			/*width: 100%;*/
			/*letter-spacing: 2px;*/
			/*padding: 0 10px;*/
		/*}*/

		/*.lgrc {*/
		/*}*/

		/*.gnc {*/
		/*}*/

		/*.lform {*/
			/*padding:10px;*/
		/*}*/
		/*.sr {*/
			/*display: flex;*/
			/*flex-wrap: nowrap;*/
			/*margin: 10px 0 20px 0;*/
			/*background: rgba(255, 255, 255, 0.3);*/
			/*align-items: center;*/
			/*height: 40px;*/
			/*line-height: 40px;*/
			/*padding-left: 10px;*/
			/*border-radius: 3px;*/
		/*}*/

		/*.phone-icon {*/
			/*display: block;*/
			/*height: 16px;*/
			/*width: 16px;*/
			/*min-width: 16px;*/
			/*background-size: 100% 100%;*/
			/*background-image: url("../../assets/img/icon/shouji.png");*/
		/*}*/

		/*.pwd-icon {*/
			/*display: block;*/
			/*height: 16px;*/
			/*width: 16px;*/
			/*min-width: 16px;*/
			/*background-size: 100% 100%;*/
			/*background-image: url("../../assets/img/icon/mima.png");*/
		/*}*/

		/*.code-icon {*/
			/*display: block;*/
			/*height: 16px;*/
			/*width: 16px;*/
			/*min-width: 16px;*/
			/*background-size: 100% 100%;*/
			/*background-image: url("../../assets/img/icon/yanzhengma.png");*/
		/*}*/

		/*.srin {*/
			/*height: 17px;*/
		/*}*/

		/*.vcf {*/
		/*}*/

		/*.vcimg {*/
			/*width: 90px;*/
			/*height: 25px;*/
			/*margin-right: 10px;*/
		/*}*/

		/*.dl-btn {*/
			/*width: 100%;*/
			/*margin-top: 15px;*/
			/*background: linear-gradient(to bottom, #03db6c, #03bc5e) !important;*/
			/*border: 0px;*/
			/*font-size: 15px;*/
			/*border-radius: 20px;*/
		/*}*/

		/*.lbt-tip {*/
			/*font-size: 14px;*/
		/*}*/

		/*.lbt-tip a:nth-of-type(1) {*/
			/*color: #ec414d;*/
		/*}*/

		/*.lbt-tip a:nth-of-type(2) {*/
			/*color: #ec414d;*/
		/*}*/

		/*.lbt-tip a:nth-of-type(1):hover {*/
			/*text-decoration: underline;*/
		/*}*/

		/*.lbt-tip a:nth-of-type(2):hover {*/
			/*text-decoration: underline;*/
		/*}*/

		/*.lbt-tip1 a:nth-of-type(1) {*/
			/*color: #ffc069 !important;*/
		/*}*/

		/*.lbt-tip1 a:nth-of-type(2) {*/
			/*color: #ffffff !important;*/
		/*}*/

		/*!*注册*!*/
		/*.reg_content {*/
			/*width: 90%;*/
			/*height: 490px;*/
			/*box-sizing: border-box;*/
			/*border-radius: 5px;*/
			/*box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);*/
			/*background: rgba(255, 255, 255, 0.26);*/
			/*transform: translate(0%, 10%);*/
			/*animation: mymove 1s ease-in-out  alternate;*/
			/*overflow: hidden;*/
			/*transition: 1.5s;*/
			/*margin: 0px auto;*/
		/*}*/
		/*.forget_content {*/
			/*width: 90%;*/
			/*height: 440px;*/
			/*box-sizing: border-box;*/
			/*border-radius: 5px;*/
			/*box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);*/
			/*background: rgba(255, 255, 255, 0.26);*/
			/*transform: translate(0%, 10%);*/
			/*animation: mymove 1s ease-in-out  alternate;*/
			/*overflow: hidden;*/
			/*transition: 1.5s;*/
			/*margin: 0px auto;*/
		/*}*/
		/*.reg_content_input {*/
			/*transform: translate(0%, 0%);*/
		/*}*/
		/*.reg_gnc {*/
		/*}*/

		/*.rform {*/
			/*padding: 10px;*/
		/*}*/

		/*.yhxz {*/
			/*margin-left: 5px;*/
			/*font-size: 12px;*/
			/*color: #cccccc;*/
			/*letter-spacing: 0.5px;*/
		/*}*/
		/*.yhxz > span {*/
			/*margin-left: 2px;*/
			/*color: #fa541c;*/
		/*}*/
		/*.yhxz > span:hover {*/
			/*text-decoration: underline;*/
		/*}*/

		/*@keyframes mymove {*/
			/*0% {*/
				/*width: 0px;*/
				/*height: 5px;*/
			/*}*/

			/*10% {*/
				/*width: 50px;*/
				/*height: 5px;*/
			/*}*/

			/*15% {*/
				/*width: 100px;*/
				/*height: 5px;*/
			/*}*/

			/*20% {*/
				/*width: 150px;*/
				/*height: 5px;*/
			/*}*/

			/*25% {*/
				/*width: 200px;*/
				/*height: 5px;*/
			/*}*/

			/*30% {*/
				/*width: 250px;*/
				/*height: 5px;*/
			/*}*/

			/*35% {*/
				/*width: 300px;*/
				/*height: 5px;*/
			/*}*/

			/*40% {*/
				/*width: 350px;*/
				/*height: 5px;*/
			/*}*/

			/*45% {*/
				/*width: 450px;*/
				/*height: 5px;*/
			/*}*/

			/*50% {*/
				/*width: 500px;*/
				/*height: 5px;*/
			/*}*/

			/*55% {*/
				/*height: 30px;*/
			/*}*/

			/*60% {*/
				/*height: 60px;*/
			/*}*/

			/*65% {*/
				/*height: 90px;*/
			/*}*/

			/*70% {*/
				/*height: 120px;*/
			/*}*/

			/*75% {*/
				/*height: 150px;*/
			/*}*/

			/*80% {*/
				/*height: 180px;*/
			/*}*/

			/*85% {*/
				/*height: 210px;*/
			/*}*/

			/*90% {*/
				/*height: 240px;*/
			/*}*/

			/*95% {*/
				/*height: 240px;*/
			/*}*/

			/*100% {*/
				/*height: 300px;*/
			/*}*/
		/*}*/

		/*.phone_logo {*/
			/*width: 36px !important;*/
			/*height: 36px !important;*/
		/*}*/
		/*.content_input {*/
			/*transform: translate(0%, -10%);*/
		/*}*/

		/*.content {*/
			/*width: 90%;*/
			/*height: 400px;*/
			/*box-sizing: border-box;*/
			/*border-radius: 5px;*/
			/*box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);*/
			/*background: rgba(255, 255, 255, 0.26);*/
			/*transform: translate(0%, 20%);*/
			/*animation: mymove 1s ease-in-out  alternate;*/
			/*overflow: hidden;*/
			/*transition: 1.5s;*/
			/*margin: 0 auto;*/
		/*}*/

		/*.loginc {*/
			/*background-repeat: no-repeat;*/
			/*background-size: cover;*/
			/*position: relative;*/
			/*background-image:url('../../assets/img/background/bg1.png');*/
		/*}*/
		/*.fter {*/
			/*display: none;*/
		/*}*/
	/*}*/
</style>

<style>
	/*媒体查询（电脑）*/
	/*@media screen and (min-width: 768px) {*/
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
	/*}*/

	/*媒体查询（手机）*/
	/*@media screen and (max-width: 768px) {*/
		/*.lform input::-webkit-input-placeholder{*/
			/*color: #ffffff !important;*/
		/*}*/

		/*.srin .el-input__inner {*/
			/*height: 17px;*/
			/*border: 0px;*/
			/*color: #ffffff;*/
			/*height: 17px;*/
			/*line-height: 17px;*/
			/*outline: 0;*/
			/*padding: 0 10px;*/
			/*margin-left: 10px;*/
			/*width: 100%;*/
		/*}*/
		/*.lform .el-input__inner {*/
			/*background-color: transparent;*/
		/*}*/

		/*.lform .el-form-item {*/
			/*margin-bottom: 0px;*/
		/*}*/

		/*.lform .el-form-item__content {*/
			/*line-height: 17px;*/
		/*}*/

		/*.lform .el-form-item__error {*/
			/*color: #ff0300;*/
			/*font-size: 12px;*/
			/*line-height: 1;*/
			/*padding-top: 4px;*/
			/*position: absolute;*/
			/*top: 168%;*/
			/*left: -27px;*/
		/*}*/

		/*.lform .el-input .el-input__clear {*/
			/*position: absolute;*/
			/*top: -10px;*/
			/*left: -30px;*/
			/*color: #ffffff;*/
		/*}*/
	/*}*/

	/*.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {*/
		/*background-color: #fa541c;*/
		/*border-color: #fa541c;*/
	/*}*/
	/*.el-checkbox__inner:hover {*/
		/*border-color: #fa541c !important;*/
	/*}*/
	/*.el-checkbox__inner {*/
		/*border-color: #fa541c !important;*/
	/*}*/
</style>
