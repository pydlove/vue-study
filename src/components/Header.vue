<template>
	<!--eslint-disable-->
	<div class="nd-header-container">
		<div class="nd-tm-right">
			<div class=" nd-menu-header">
				<div :class="currentMenu=='index'?'nd-menu-active':''" @click="selectMenu('index')">
					首页
				</div>
			</div>
			<div class="nd-menu-header">
				<div :class="currentMenu=='observeDevice'?'nd-menu-active':''" @click="selectMenu('observeDevice')">
					观测设备
				</div>
				<div :class="currentMenu=='observationData'?'nd-menu-active':''" @click="selectMenu('observationData')">
					观测数据
				</div>
				<div :class="currentMenu=='application'?'nd-menu-active':''" @click="selectMenu('application')">
					观测申请
				</div>
			</div>
			<div>
				<div class="nd-menu-header">
					<div :class="currentMenu=='pictureAndAchievement'?'nd-menu-active':''"
					     @click="selectMenu('pictureAndAchievement')">
						图库与成果
					</div>
					<div :class="currentMenu=='newsAndResource'?'nd-menu-active':''"
					     @click="selectMenu('newsAndResource')">
						新闻与资源
					</div>
				</div>
				<div class="nd-language" @click="switchLang">
					<span :class="language == 'ch'?'nd-lang-active':''">中</span>/<span
						:class="language == 'en'?'nd-lang-active':''">EN</span>
				</div>
			</div>
		</div>

		<div class="nd-header-userinfo">
			<div v-if="isLogin">
				<div>
					<el-dropdown>
						<span class="el-dropdown-link nd-header-name">
							<van-image class="nd-header-avatar"
							           round
							           width="50px"
							           height="50px"
							           :src="user.avatar"
							/>
							<div>
								{{ showUserInfo() }}
							</div>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="showMyInfo">个人信息</el-dropdown-item>
							<el-dropdown-item @click.native="showMyApplication">我的申请</el-dropdown-item>
							<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>

			<div v-else class="nd-header-lr aiocloud-cursor" @click="toLogin">
				登录/注册
			</div>
		</div>

		<LoginDialog ref="loginDialogRef" @setUser="setUser"></LoginDialog>
		<UserInfo ref="userInfoRef"></UserInfo>
		<MyApplication ref="myApplicationRef"></MyApplication>
	</div>
</template>
<!--eslint-disable-->
<script>
    import LoginDialog from "@/views/login/loginDialog.vue"
    import UserInfo from "@/views/user/userInfo.vue"
    import MyApplication from "@/views/user/myApplication.vue"

    export default {
        name: "Header",
        components: {
            LoginDialog,
            UserInfo,
            MyApplication
        },
        data() {
            return {
                language: 'ch',
                user: {
                    id: "",
                    name: "",
                    account: "",
                    password: '',
                    pwdagain: '',
                    phone: '',
                    mail: '',
                    status: '',
                    remark: '',
                    avatar: '',
                    idCard: '',
                    address: '',
                    birthtime: '',
                    sex: '',
                    area: [],
                    province: '',
                    city: '',
                    county: '',
                    township: '',
                    wxcode: '',
                },
                isLogin: false,
            }
        },
        props: ['currentMenu'],
        mounted() {
            // 判断是否登录
            this.getUserInfo();
        },
        methods: {
            showMyApplication() {
				this.$refs.myApplicationRef.open();
            },

            showMyInfo() {
				this.$refs.userInfoRef.open(this.user);
            },

            logout() {
                this.$confirm('请确定是否要退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.logoutRequest();
                }).catch(() => {
                });
            },
            async logoutRequest() {
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_login_logout, {}, "GET");
                if (data.code === 200) {
                    this.$utils.removeStorage("aiocloudToken");
                    this.getUserInfo();
                }
            },

            showUserInfo() {
                return this.user.name.substring(0, 6) + '...';
            },

            setUser(user) {
                this.user = user;
                this.isLogin = true;
                // 判断必要信息是否填写，为填写弹出填写框
                if(this.$utils.checkIsNull(this.user.name) && this.$utils.checkIsNull(this.user.address)) {
                    this.$refs.userInfoRef.open(this.user);
                }
                if (this.user.avatar == "" || this.user.avatar == undefined) {
                    this.user.avatar = require('@/assets/img/background/avatar.jpg');
                }
                if(this.user.name == null || this.user.name == undefined || this.user.name == "") {
                    this.user.name = this.user.mail;
                }
                if(this.currentMenu == 'application') {
                    this.$emit("reloadApplications");
                }
            },

            toLogin() {
                this.$refs.loginDialogRef.open();
            },

            async getUserInfo() {
                let params = new FormData();
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_login_getUser, params, "POST");
                if (data.code == 200) {
                    let res = data.data;
                    this.isLogin = res.isLogin;
                    if (res.isLogin) {
                        this.user = res.user;
                        if (this.user.avatar == "" || this.user.avatar == undefined) {
                            this.user.avatar = require('@/assets/img/background/avatar.jpg');
                        }
                        if(this.user.name == null || this.user.name == undefined || this.user.name == "") {
                            this.user.name = this.user.mail;
                        }
                    }
                    return true;
                }
            },

            /**
             * 切换语言
             */
            switchLang() {
                this.language = this.language == 'ch' ? 'en' : 'ch';
            },

            /**
             * 选择菜单
             */
            selectMenu(menu) {
                this.currentMenu = menu;
                switch (menu) {
                    case 'index':
                        this.$router.push({path: '/home'})
                        break;
                    case 'newsAndResource':
                        this.$router.push({path: '/newsAndResource'})
                        break;
                    case 'observeDevice':
                        this.$router.push({path: '/observeDevice'})
                        break;
                    case 'pictureAndAchievement':
                        this.$router.push({path: '/pictureAndAchievement'})
                        break;
                    case 'observationData':
                        this.$router.push({path: '/observationData'})
                        break;
                    case 'application':
                        this.$router.push({path: '/application'})
                        break;
                    default:
                        this.$router.push({path: '/home'})
                        break;
                }
            },
        }
    }
</script>

<style scoped>
	@media screen and (min-width: 768px) {
		.nd-header-name {
			color: #ffffff !important;
			font-family: SC-Light !important;

		}
		.nd-header-avatar {
			margin-bottom: 5px;
		}
		.nd-header-lr {
			font-size: 14px;
			font-family: SC-Light;
		}

		.nd-header-lr:hover {
			border: 1px solid #fa541c;
			padding: 10px;
			border-radius: 3px;
		}

		.nd-header-container {
			position: relative;
		}

		.nd-header-userinfo {
			position: absolute;
			right: -100px;
			top: 20px;
		}

		.nd-lang-active {
			color: #fa541c;
		}

		.nd-menu-active {
			color: #fa541c;
			font-size: 16px !important;
		}

		.nd-language > span:nth-of-type(1) {
			margin-right: 5px;
		}

		.nd-language > span:nth-of-type(2) {
			margin-left: 5px;
		}

		.nd-language {
			border-top: 1pt solid #8c8c8c;
			font-size: 15px;
			line-height: 40px;
			width: 120px;
			text-align: left;
			margin-left: 50px;
		}

		.nd-menu-header {
			margin-left: 50px;
		}

		.nd-menu-header > div {
			font-size: 15px;
			line-height: 40px;
			width: 120px;
			text-align: left;
		}

		.nd-menu-header > div:hover {
			color: #fa541c;
			font-size: 16px;
		}

		.nd-menu-header > div:nth-of-type(1) {
			border-top: 2px solid #ffffff;
		}

		.nd-menu-header > div:nth-of-type(n+2) {
			border-top: 1pt solid #8c8c8c;
		}

		.nd-tm-right {
			display: flex;
			flex-wrap: nowrap;
			padding-top: 20px;
			font-family: SC-Light;
		}
		.el-dropdown-menu__item:hover {
			background: #fa541c !important;
			color: #ffffff;
		}
	}
</style>