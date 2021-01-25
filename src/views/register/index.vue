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
					<div class="xstd mb-20"> <i class="xuesheng mr-10"></i>账号注册</div>

					<el-form class="register-form" ref="form" :rules="rules" label-width="0px" :model="registerForm">
						<el-form-item label="" prop="phone" required>
							<div class="rsr">
								<span class="phone-icon"></span>
								<el-input class="srin" v-model="registerForm.phone" placeholder="请输入手机号" @blur="checkPhoneIsRegister($event)"></el-input>
							</div>
						</el-form-item>

						<el-form-item label="" prop="password" required>
							<div class="rsr">
								<span class="code-icon"></span>
								<el-input class="srin" v-model="registerForm.password" show-password
								          placeholder="请输入6-16位字母、数字、特殊字符组合的密码"></el-input>
							</div>
						</el-form-item>

						<el-form-item label="" prop="pwdagain" required>
							<div class="rsr">
								<span class="code-icon"></span>
								<el-input class="srin" v-model="registerForm.pwdagain" show-password placeholder="请再次输入密码"></el-input>
							</div>
						</el-form-item>

						<el-form-item label="" prop="registrationCode" required>
							<div class="rsr">
								<span class="code-icon"></span>
								<el-input class="srin" v-model="registerForm.registrationCode"
								          placeholder="请输入注册码"></el-input>
							</div>
						</el-form-item>

						<div class="tl mt-30">
							<el-checkbox @change="check" v-model="userNeedKnow"></el-checkbox>
							<span class="yhxz">
								我已阅读并接受安徽柏林书画研究院<span @click="toSee">用户须知</span>
							</span>
						</div>

						<el-button class="dl-btn" :type="type" @click="register" :disabled="disabled">立即注册</el-button>
					</el-form>

					<div class="rbt-tip bt mt-10">
						<a class="fr" @click="toLogin">去登录»</a>
						<a class="fr">已有账号？</a>
					</div>
				</div>
			</div>
		</div>
		<Footer class="fter"></Footer>
		<UserNotice ref="unRef"></UserNotice>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Footer from "@/components/Footer"
    import UserNotice from "@/views/register/userNotice"
    export default {
        name: "login",
        components: {Footer, UserNotice},
        mounted() {
            new this.$wow.WOW({
                live: false
            }).init();

            this.$nextTick(() => {
                this.$refs["form"].clearValidate();
            });
        },
        methods: {
            toSee() {
				this.$refs.unRef.open();
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

            clearForm() {
                this.registerForm = {
                    phone: "",
                    password: "",
                    pwdagain: "",
                    registrationCode: "",
                };
            },

            register() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                if(!this.phoneIsEffective) {
                    this.$promptMsg("此号码已经被注册，请修改", "error");
                    return false;
                }
                if (this.registerForm.password != this.registerForm.pwdagain) {
                    this.$promptMsg("两次密码不一致，请重新输入", "error")
                    return false;
                }
                let params = new FormData()
                params.append("phone", this.registerForm.phone.trim());
                params.append("password", this.$md5(this.registerForm.password));
                params.append("registrationCode", this.registerForm.registrationCode.trim());
                this.disabled = true;
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_login_register, params, "POST");
                if (data.code == 200) {
                    this.$promptMsg("注册成功，请前去登录！", "success");
                    this.disabled = false;
                    this.clearForm();
                    this.toLogin();
                } else {
                    this.disabled = false;
                }
            },

            async checkPhoneIsRegister(e) {
                let params = new FormData()
                params.append("phone", e.target.value.trim());
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_login_check_phone, params, "POST");
                if (data.code == 200) {
                    if(!data.data) {
						this.phoneIsEffective = false;
                        this.$promptMsg("此号码已经被注册，请修改", "error");
                    } else {
						this.phoneIsEffective = true;
                    }
                }
            },

            toLogin() {
                this.$router.push({name: "studentLogin"});
            },
        },
        data() {
            return {
                // 背景图
                mainBackground: require("../../assets/img/logo/shuhua1.jpg"),
                advertisingBackground: require("../../assets/img/zbsytp.jpg"),
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight,
                advertisingBackgrounds: [
                    require("../../assets/img/em/ls.png"),
                ],
                type: "info",
                disabled: true,
                userNeedKnow: false,
                phoneIsEffective: false,
                registerForm: {
                    phone: "",
                    password: "",
                    pwdagain: "",
                    registrationCode: "",
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
                    registrationCode: [
                        {type: 'string', required: true, message: '请输入注册码', trigger: ['change', 'blur']},
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
	.yhxz {
		margin-left: 5px;
		font-size: 12px;
		color: #999;
		letter-spacing: 0.5px;
	}
	.yhxz > span {
		margin-left: 2px;
		color: #409EFF;
	}
	.yhxz > span:hover {
		text-decoration: underline;
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
		width: 600px;
		height: 600px;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	.gnc {
		width: 600px;
		height: 600px;
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
		margin-top:110px;
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
		right: 0px;
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
		width: 360px;
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

	.register-form .el-form-item {
		margin-bottom: 15px;
	}

	/*媒体查询（电脑）*/
	@media screen and (min-width: 1529px) {
	}
</style>