<template>
	<!--eslint-disable-->
	<div>
		<div class="aioc-theme">
			<div class="dffn ac">
				<el-card class="wd-50" :style="background=='#ffffff'?'background:#606266':'background:#eeeeee'">
					<i class="el-icon-s-tools fs-22 color-fa5c26"></i>
				</el-card>
				<el-card class="wdi-220" :style="background=='#ffffff'?'background:#606266':'background:#eeeeee'">
					<div class="dffw">
						<div class="bgs" style="background:#ffffff; color:#000000" @click="selectBg('white')">白色主题</div>
						<div class="bgs" style="background:#000000" @click="selectBg('black')">黑色主题</div>
						<div class="bgs" style="background:#D24D57" @click="selectBg('D24D57')">红色主题</div>
						<div class="bgs" style="background:#84AF9B" @click="selectBg('84AF9B')">暗绿主题</div>
						<div class="bgs" style="background:#9F5F9F" @click="selectBg('9F5F9F')">蓝紫色主题</div>
						<div class="bgs" style="background:#97694F" @click="selectBg('97694F')">深棕褐色主题</div>
					</div>
				</el-card>
			</div>
		</div>

		<!-- 头部 -->
		<header>
			<!-- logo -->
			<div class="am-fl tpl-header-logo"
			     :style="'background:' + background + ';color:' + color + ';border:' + border">
				<a class="mr-5" href="javascript:;">
					<img class="logo" :src="logo" fit="fill"></img>
					<!--<el-image :src="project.icon" style="width: 38px; height: 38px;" alt=""> </el-image>-->
				</a>
				<!--<span class="main-title">{{project.chName}}</span>-->
			</div>
			<!-- 右侧内容 -->
			<div class="tpl-header-fluid"
			     :style="'background:' + background + ';color:' + color + ';border-top:' + border + ';border-right:' + border">
				<!-- 侧边切换 -->
				<div class=" fl tpl-header-switch-button">
					<span v-if="!closeLfetFlag" class="el-icon-s-fold fs-30 mt-15 color-999" @click="closeLeft"></span>
					<span v-else class="el-icon-s-unfold fs-30 mt-15 color-999" @click="closeLeft"></span>
				</div>

				<div class="aioc-area">
					<el-cascader :class="background == '#ffffff'?'aiocw-cascader':'aioc-cascader'"
					             :style="{background: background, width: (area.length == 0? '200px':((area.toString().length*16 + 80) + 'px'))}"
					             ref="areaCascaderRef"
					             size="large"
					             :props="{ checkStrictly: true }"
					             :options="areaOptions"
					             v-model="area"
					             @change="handleAreaCascader"
					             placeholder="请选择区域">
					</el-cascader>
				</div>

				<!-- 其它功能-->
				<div class="fr tpl-header-navbar">
					<ul class="dffn">
						<!-- 欢迎语 -->
						<li class="am-text-sm fs-15 mr-20">
							欢迎你, <span>{{user.name}}</span>
						</li>

						<li class="am-text-sm fs-15 dffn ac jc mr-20" @click="toHelp">
							<i class="el-icon-question fs-20 mr-5 color-67C23A"></i>
							<span>帮助文档</span>
						</li>

						<!--<el-dropdown>-->
						<!--<li class="wdi-80">-->
						<!--<el-badge :value="remindNotice.length" :max="99" class="item">-->
						<!--<i class="el-icon-message"-->
						<!--:style="background == '#ffffff' ? 'color:#333':'color:#ffffff'"></i>-->
						<!--</el-badge>-->
						<!--</li>-->
						<!--<el-dropdown-menu slot="dropdown">-->
						<!--<el-dropdown-item v-for="(item, index) in remindNotice" :key="index">-->
						<!--<div class="noice-list" @click="toNoticeDetail(item)">-->
						<!--<div class="dffn">-->
						<!--<div class="dfac mr-20">-->
						<!--<el-avatar size="small" :src="item.userAvatar"></el-avatar>-->
						<!--</div>-->
						<!--<div class="lh-20">-->
						<!--<div class="fs-14 color-303133">{{item.username}}</div>-->
						<!--<div :style="{color: fmtLevelColor(item.level)}"-->
						<!--class="fs-12 color-999">{{item.title}}-->
						<!--</div>-->
						<!--</div>-->
						<!--</div>-->
						<!--</div>-->
						<!--</el-dropdown-item>-->
						<!--</el-dropdown-menu>-->
						<!--</el-dropdown>-->

						<li>
							<el-dropdown split-button type="primary" size="mini" trigger="click">
								角色：	{{defaultRole.name}}
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-for="(item, index) in roles" :key="index" @click.native="switchRole(item)">
										<div class="wdi-120 pd-5">
											{{item.name}}
										</div>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</li>

						<li class="tuc" @click="logout">
							<i :style="background == '#ffffff' ? 'color:#333':'color:#ffffff'"
							   class="el-icon-switch-button fs-20 mt-17"></i>
							<span class="fs-14 ml-5">退出</span>
						</li>
					</ul>
				</div>
			</div>
		</header>
		<!-- 侧边导航栏 -->
		<div :class="closeLfetFlag ? 'left-sidebar close-left1':'left-sidebar'">
			<!-- 用户信息 -->
			<div class="tpl-sidebar-user-panel"
			     :style="'background:' + background + ';color:' + color + ';border:' + border">
				<div class="dffc tl">
					<div class="tpl-user-panel-profile-picture">
						<img class="ava" :size="avatarSize" :src="user.avatar"/>
					</div>
					<span class="user-panel-logged-in-text">
                        <i v-if="user.sex == '1'" class="el-icon-female"></i>
                        <i v-else class="el-icon-male"></i>
                        <span class="color-606266 ml-10" :style="background=='#ffffff'?'color:#606266':'color:#ffffff'">{{user.name}}</span>
					</span>
					<div class="tpl-user-panel-action-link mt-10" @click="setAccount">
						<span class="el-icon-edit"></span>
						账号设置
					</div>
				</div>
			</div>

			<el-menu :style="'height:' + (clientHeight-104) + 'px;overflow: auto;'"
			         :default-active="activeMenuId"
			         class="el-menu-vertical aioc-scroll aioc-white"
			         @open="handleOpen"
			         @close="handleClose"
			         :background-color="background"
			         :text-color="textColor"
			         :active-text-color="activeColor"
			         :collapse="isCollapse">
				<div v-for="(item, index) in project.children" :key="index">
					<el-submenu v-if="item.children.length > 0" :index="item.id">
						<template slot="title">
							<i :style="{color: textColor}" :class="item.icon + ' fs-18'"></i>
							<span slot="title">{{item.chName}}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item :index="sub.id" v-for="(sub, subIndex) in item.children" :key="subIndex"
							              @click="selectSubMenu(item, sub)">
								{{sub.chName}}
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>

					<el-menu-item v-else :index="item.id" @click="selectMenu(item)">
						<i :style="{color: textColor}" :class="item.icon + ' fs-18'"></i>
						<span slot="title">
                            {{item.chName}}
                        </span>
					</el-menu-item>
				</div>

			</el-menu>
		</div>

		<!--tab页形式-->
		<!--<div v-show="rightMenuVisible" ref="rightMenuRef">-->
		<!--<ul class="right-menu" :style="'top:' + rightTop + 'px;left:' + rightLeft + 'px;'">-->
		<!--<li class="menu__item" @click="closeCurrentTab">关闭当前页面</li>-->
		<!--<li class="menu__item" @click="closeOtherTab">关闭其他页面</li>-->
		<!--<li class="menu__item" @click="closeRightTab">关闭右侧页面</li>-->
		<!--<li class="menu__item" @click="closeLeftTab">关闭左侧页面</li>-->
		<!--<li class="menu__item" @click="closeAllTab">关闭全部页面</li>-->
		<!--</ul>-->
		<!--</div>-->

		<!-- 内容区域 -->
		<div :class="closeLfetFlag ? 'tpl-content-wrapper close-left':'tpl-content-wrapper'"
		     :style="'background:' + background + ';color:' + color + ';border:' + border">

			<!--tab页形式-->
			<!--<el-tabs class="t" v-model="editableTabsValue" type="card"-->
			<!--closable @tab-remove="removeMenuTab" @contextmenu.prevent.stop.native="rightClick($event)">-->
			<!--<el-tab-pane-->
			<!--:key="index"-->
			<!--v-for="(item, index) in menuHises"-->
			<!--:label="item.chName"-->
			<!--:name="item.id"-->
			<!--&gt;-->
			<!--&lt;!&ndash;<iframe id="iframe" class="frame-con" :src="'http://www.aiocloud.ltd/#/' + item.url" scrolling="no" :style="'height:' + clientHeight + 'px;'">&ndash;&gt;-->
			<!--<iframe id="iframe" class="frame-con" :src="'http://localhost:8080/#' + item.url" scrolling="no" :style="'height:' + clientHeight + 'px;'">-->
			<!--</iframe>-->
			<!--</el-tab-pane>-->
			<!--</el-tabs>-->

			<!--面包屑形式-->
			<el-breadcrumb class="breadcrumb" separator="/"
			               :style="'background:' + background + ';color:' + textColor + ' !important;border:' + border">
				<el-breadcrumb-item>
					<span :style="{color: textColor}">您的当前位置：{{project.chName}}</span>
				</el-breadcrumb-item>
				<el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
					<span :style="{color: textColor}">{{item}}</span>
				</el-breadcrumb-item>
			</el-breadcrumb>

			<iframe id="iframe" class="frame-con" :src="currentUrl" scrolling="no" allowtransparency="true"
			        :style="'height:' + clientHeight + 'px;'">
			</iframe>
		</div>
		<AccountSet ref="accountSetRef"></AccountSet>
	</div>
</template>
<!--eslint-disable-->
<script>

    import AccountSet from "@/views/portal/user/accountSet.vue"
    import areaData from '@/assets/json/areaData.json'

    export default {
        name: "index",
        components: {AccountSet},
        created() {
            this.baseUrl = this.$aiocUrl.baseUrl;
            // 判断用户是否登录
            this.judgeIsLogin();
            document.addEventListener('click', (e) => {
                if (this.$refs.rightMenuRef) {
                    let isSelf = this.$refs.rightMenuRef.contains(e.target)
                    if (!isSelf) {
                        this.rightMenuVisible = false;
                    }
                }
            });
        },
        mounted() {
            const roleId = this.$utils.getStorage("roleId");
            this.loadUserAndAuthority(roleId);
            this.initAreaOptions(areaData);
            this.initArea();
        },
        methods: {
            toHelp() {
                const detail = this.$router.resolve({name: 'operation'});
                window.open(detail.href,'_blank');
            },

            switchRole(item) {
                this.defaultRole = item;
                this.$utils.setStorage("roleId", item.id);
                this.$utils.removeStorage("activeMenu");
                location.reload();
            },

            initArea() {
                const areaEle = this.$utils.getStorage("area");
                if (areaEle != null && areaEle != undefined) {
                    this.area = areaEle;
                } else {
                    this.$utils.setStorage("area", this.area);
                }
            },

            /**
             * 处理地区条件选择变化
             */
            handleAreaCascader() {
                if (this.$refs.areaCascaderRef) {
                    this.$refs.areaCascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
                }
                this.$utils.setStorage("area", this.area);
                location.reload();
            },

            /**
             * 初始化地域数据
             */
            initAreaOptions(area) {
                for (let key in area) {
                    let province = area[key];
                    if (key == '安徽省') {
                        var provinceObj = {
                            label: key,
                            value: key,
                            children: []
                        }
                        this.areaOptions.push(provinceObj);
                        for (let cityKey in province) {
                            let city = province[cityKey];
                            var cityObj = {
                                label: cityKey,
                                value: cityKey,
                                children: []
                            }
                            provinceObj.children.push(cityObj);
                            for (let areaKey in city) {
                                var areaObj = {
                                    label: areaKey,
                                    value: areaKey,
                                }
                                cityObj.children.push(areaObj);
                            }
                        }
                    }
                }
            },

            selectBg(bg) {
                this.setBgColor(bg);
                this.setBgColorRequest(bg);
            },

            setBgColor(bg) {
                var theme = "";
                var themeBg = "";
                if (bg == null || bg == undefined || bg == '' || bg == 'white') {
                    theme = 'aiocw';
                    themeBg = {
                        background: "#ffffff",
                        color: "#333",
                        activeColor: "#409EFF",
                        border: "1px solid #eeeeee",
                        textColor: "#868E8E",
                    }
                }
                else if (bg == 'black') {
                    theme = 'aioc';
                    themeBg = {
                        background: "#333",
                        color: "#ffffff",
                        activeColor: "#409EFF",
                        border: "1px solid #999",
                        textColor: "#868E8E",
                    }
                } else {
                    theme = 'aioc-' + bg;
                    themeBg = {
                        background: "#" + bg,
                        color: "#ffffff",
                        activeColor: "#409EFF",
                        border: "1px solid #eeeeee",
                        textColor: "#eeeeee",
                    }
                }
                this.background = themeBg.background;
                this.color = themeBg.color;
                this.activeColor = themeBg.activeColor;
                this.border = themeBg.border;
                this.textColor = themeBg.textColor;
                this.theme = theme;
            },

            async setBgColorRequest(bg) {
                this.form = {
                    id: this.user.id,
                    bgColor: bg,
                }
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_user_edit, this.form, "POST");
                if (data.code == 200) {
                    return true;
                }
            },

            setAccount() {
                var row = this.user;
                this.$refs.accountSetRef.form = {
                    id: row.id,
                    name: row.name,
                    account: row.account,
                    phone: row.phone,
                    mail: row.mail,
                    remark: row.remark,
                    avatar: row.avatar,
                    idCard: row.idCard,
                    address: row.address,
                    birthtime: row.birthtime,
                    sex: Number(row.sex),
                    password: "",
                };
                if (row.avatar != null && row.avatar != "") {
                    var photoArray = row.avatar.split("/")
                    this.$refs.accountSetRef.fileName = photoArray[photoArray.length - 1];
                    this.$refs.accountSetRef.originalFileName = photoArray[photoArray.length - 1];
                    this.$refs.accountSetRef.fileList = [{url: row.avatar}];
                    this.$refs.accountSetRef.hideUpload = true;
                } else {
                    this.$refs.accountSetRef.fileName = "";
                    this.$refs.accountSetRef.originalFileName = "";
                    this.$refs.accountSetRef.fileList = [];
                    this.$refs.accountSetRef.hideUpload = false;
                }
                this.$refs.accountSetRef.open();
            },

            toNoticeDetail(item) {
                this.$refs.noticeDetailRef.open(item, true);
            },

            fmtLevelColor(value) {
                switch (value) {
                    case "0":
                        return "#606266";
                    case "1":
                        return "#E6A23C";
                    case "2":
                        return "#F56C6C";
                    default :
                        return value;
                }
            },

            async loadUserAndAuthority(roleId) {
                let params = new FormData()
                if(roleId != null && roleId != undefined) {
                    params.append("roleId", roleId);
                }
                let res = await this.$aiorequest(this.$aiocUrl.console_service_v1_login_user_authority, params, "POST");
                if (res.code === 200) {
                    var data = res.data;
                    this.user = res.data;
                    this.setBgColor(this.user.bgColor);
                    if (data.roles.length > 0) {
                        this.roles = data.roles;
                        var isSwitchRole = false;
                        var role = "";
                        for(var i in this.roles) {
                            if(this.roles[i].id == roleId) {
                                isSwitchRole = true;
                                role = this.roles[i];
                            }
                        }
                        if(isSwitchRole) {
                            this.defaultRole = role;
                        } else {
                            this.defaultRole = data.roles[0];
                        }
                    }
                    if (data.projectlFuns != null && data.projectlFuns.length > 0) {
                        this.project = data.projectlFuns[0];
                        if (this.project.children != null && this.project.children.length > 0) {
                            var menu = "";
                            const menuEle = this.$utils.getStorage("activeMenu");
                            if (menuEle != null && menuEle != undefined) {
                                menu = menuEle;
                            } else {
                                menu = this.project.children[0];
                            }
                            this.breadcrumbs = [];
                            this.breadcrumbs.push(menu.chName);
                            if (menu.children != null && menu.children.length > 0) {
                                this.activeMenuId = menu.children[0].id;
                                this.currentUrl = this.baseUrl + menu.children[0].url;
                                this.breadcrumbs.push(menu.children[0].chName);
                            } else {
                                this.activeMenuId = menu.id;
                                this.currentUrl = this.baseUrl + menu.url;
                            }
                        }
                    }
                }
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
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_login_logout, {}, "GET");
                if (data.code === 200) {
                    this.$utils.removeStorage("aioctoken");
                    this.$router.push({name: "teacherLogin"});
                }
            },

            async judgeIsLogin() {
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_login_judgeIsLogin, {}, "GET");
                if (data.code === 200) {
                    if(data.data != "login") {
                        this.$router.push({name: "teacherLogin"});
                    }
                } else {
                    this.$router.push({name: "studentLogin"});
                }
            },

            selectSubMenu(menuItem, subMenuItem) {
                this.currentUrl = this.baseUrl + subMenuItem.url;
                this.breadcrumbs = [];
                this.breadcrumbs.push(menuItem.chName);
                this.breadcrumbs.push(subMenuItem.chName);
                this.setButtonPermissions(subMenuItem);
                this.$utils.setStorage("activeMenu", subMenuItem);
            },

            selectMenu(menuItem) {
                this.currentUrl = this.baseUrl + menuItem.url;
                this.breadcrumbs = [];
                this.breadcrumbs.push(menuItem.chName);
                this.setButtonPermissions(menuItem);
                this.$utils.setStorage("activeMenu", menuItem);
            },

            setButtonPermissions(item) {
                const activeBtnAuthority = item.btns;
                if (activeBtnAuthority != "" && activeBtnAuthority != null && activeBtnAuthority != undefined) {
                    this.$utils.setCookie('activeBtnAuthority', activeBtnAuthority, 10000000);
                } else {
                    this.$utils.setCookie('activeBtnAuthority', "no*aiocloud*p", 10000000);
                }
            },

            // tab 页形式的方法
            // selectMenu(menuItem) {
            //     this.currentMenu = menuItem;
            //     var contain = false;
            //     for(var i in this.menuHises) {
            //         const menuHiseElement = this.menuHises[i];
            //         if(menuHiseElement.id == menuItem.id) {
            //             contain = true;
            //         }
            //     }
            //     if(!contain) {
            //         this.menuHises.push(menuItem);
            //     }
            //     this.editableTabsValue = menuItem.id;
            // },

            closeAllTab() {
                this.menuHises = [];
                this.editableTabsValue = "";
                this.rightMenuVisible = false;
            },

            closeLeftTab() {
                var temp = [];
                var conatinInLeft = false;
                var start = false;
                for (var i in this.menuHises) {
                    const menuHiseElement = this.menuHises[i];
                    if (this.editableTabsValue == menuHiseElement.id) {
                        conatinInLeft = true;
                    }
                    if (menuHiseElement.chName == this.currentRightMenuName) {
                        if (conatinInLeft) {
                            this.editableTabsValue = menuHiseElement.id;
                        }
                        start = true;
                    }
                    if (start) {
                        temp.push(menuHiseElement);
                    }
                }
                this.menuHises = temp;
                this.rightMenuVisible = false;
            },

            closeRightTab() {
                var temp = [];
                var conatinInLeft = false;
                for (var i in this.menuHises) {
                    const menuHiseElement = this.menuHises[i];
                    if (this.editableTabsValue == menuHiseElement.id) {
                        conatinInLeft = true;
                    }
                    if (menuHiseElement.chName == this.currentRightMenuName) {
                        if (!conatinInLeft) {
                            this.editableTabsValue = menuHiseElement.id;
                        }
                        temp.push(menuHiseElement);
                        break;
                    }
                    temp.push(menuHiseElement);
                }
                this.menuHises = temp;
                this.rightMenuVisible = false;
            },

            closeOtherTab() {
                var temp = [];
                for (var i in this.menuHises) {
                    const menuHiseElement = this.menuHises[i];
                    if (menuHiseElement.chName == this.currentRightMenuName) {
                        temp.push(menuHiseElement);
                        this.menuHises = temp;
                        this.editableTabsValue = menuHiseElement.id;
                        this.rightMenuVisible = false;
                        return;
                    }
                }
            },

            removeMenuTab(targetName) {
                if (this.menuHises.length == 1) {
                    this.menuHises = [];
                    this.editableTabsValue = "";
                }
                var temp = [];
                for (var i in this.menuHises) {
                    const menuHiseElement = this.menuHises[i];
                    if (menuHiseElement.id == targetName) {
                        if (this.editableTabsValue == menuHiseElement.id) {
                            if (i == 0) {
                                this.editableTabsValue = this.menuHises[1].id;
                            } else {
                                this.editableTabsValue = this.menuHises[i - 1].id;
                            }
                        }
                    } else {
                        temp.push(menuHiseElement);
                    }
                }
                this.menuHises = temp;
                this.rightMenuVisible = false;
            },

            closeCurrentTab() {
                if (this.menuHises.length == 1) {
                    this.menuHises = [];
                    this.editableTabsValue = "";
                }
                var temp = [];
                for (var i in this.menuHises) {
                    const menuHiseElement = this.menuHises[i];
                    if (menuHiseElement.chName == this.currentRightMenuName) {
                        if (this.editableTabsValue == menuHiseElement.id) {
                            if (i == 0) {
                                this.editableTabsValue = this.menuHises[1].id;
                            } else {
                                this.editableTabsValue = this.menuHises[i - 1].id;
                            }
                        }
                    } else {
                        temp.push(menuHiseElement);
                    }
                }
                this.menuHises = temp;
                this.rightMenuVisible = false;
            },
            rightClick(e) {
                if (e.target.className.indexOf("el-tabs__item") != -1) {
                    this.rightMenuVisible = true;
                    this.rightTop = e.clientY;
                    this.rightLeft = e.clientX + 10;
                    this.currentRightMenuName = e.target.textContent;
                }
            },

            closeRightMenu() {
                this.rightMenuVisible = false;
            },

            closeLeft() {
                this.closeLfetFlag = this.closeLfetFlag ? false : true;
            },

        },
        data() {
            return {
                clientHeight: document.body.clientHeight - 57 - 88,
                logo: require('@/assets/img/logo/22.png'),
                avatar: require('@/assets/img/ouynn.jpg'),
                avatarSize: "80",
                menuShow: false,
                isCollapse: false,
                roles: [],
                menus: [],
                defaultRole: "",
                tabIndex: 1,
                closeLfetFlag: false,
                currentRightMenuName: "",
                menuHises: [],
                editableTabsValue: '0',
                rightMenuVisible: true,
                rightTop: 0,
                rightLeft: 0,
                user: "",

                firstLevelFuns: [],
                secondLevelFuns: [],
                buttonMap: [],
                indexList: [],
                project: "",
                breadcrumbs: [],
                currentUrl: "",
                activeMenuId: "",
                // baseUrl: "http://localhost:8080",
                baseUrl: "http://www.aiocloud.ltd",
                background: "#F9F9F9",
                color: "#333",
                activeColor: "#409EFF",
                border: "1px solid #eeeeee",
                textColor: "#868E8E",
                theme: "",
                remindNotice: [],
                areaOptions: [],
                area: ["安徽省"],
            }
        },
    }
</script>

<style scoped>
	.logo {
		line-height: 100px;
		width: 200px;
		height: 45px;
	}
	a {
		text-decoration: none;
	}

	header {
		z-index: 1200;
		position: relative;
	}

	.tpl-header-logo {
		width: 240px;
		height: 57px;
		position: relative;
		z-index: 1300;
		/*background: #282d2f;*/
		display: flex;
		justify-content: center;
		align-items: center;
		float: left;
	}

	/*.tpl-header-logo img {*/
	/*width: 42px;*/
	/*height: 30px;*/
	/*}*/

	.main-title {
		text-decoration: none;
		font-weight: 700;
		word-break: break-word;
		font-family: 华文行楷;
		font-size: 19px;
	}

	.tpl-header-fluid {
		background: #2f3638;
		margin-left: 240px;
		height: 57px;
		padding-left: 20px;
		padding-right: 20px;
	}

	.tpl-header-switch-button {
		width: 30px;
		height: 57px;
		line-height: 57px;
	}

	.tpl-header-navbar li {
		line-height: 57px;
	}

	.am-text-sm a {
		display: block;
		padding: 0 16px;
		position: relative;
		text-decoration: none;
		font-size: 14px;
	}

	.el-icon-message {
		font-size: 22px;
	}

	.tuc {
		width: 80px;
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
	}

	.tuichub {
		margin-top: 20px;
	}

	.left-sidebar {
		padding-top: 57px;
		transition: all 0.4s ease-in-out;
		width: 242px;
		min-height: 100%;
		position: absolute;
		z-index: 1104;
		top: 0;
		left: 0px;
	}

	.tpl-sidebar-user-panel {
		padding: 22px;
		padding-top: 28px;
	}

	.tpl-user-panel-profile-picture {
		border-radius: 50%;
		width: 82px;
		height: 82px;
		margin-bottom: 10px;
		overflow: hidden;
	}

	.ava {
		width: 82px;
		height: 82px;
	}

	.el-icon-female {
		color: #c23b85;
	}

	.el-icon-male {
		color: #409EFF;
	}

	.user-panel-logged-in-text {
		color: #cfcfcf;
		font-size: 14px;
		margin-bottom: 10px;
	}

	.tpl-user-panel-action-link {
		color: #a2aaad;
		font-size: 12px;
	}

	.el-menu-vertical {
		text-align: left;
	}

	.tpl-content-wrapper {
		transition: all 0.4s ease-in-out;
		position: relative;
		margin-left: 240px;
		z-index: 1101;
		padding: 10px;
	}

	.frame-con {
		width: 100%;
		background: #ffffff;
		height: 100px;
		overflow: auto;
	}

	.breadcrumb {
		height: 50px;
		line-height: 50px;
		/*background: #1f2224;*/
		margin-bottom: 10px;
		border-radius: 3px;
		padding-left: 20px;
		color: #eeeeee !important;
	}

	.aioc-theme {
		border-radius: 4px;
		position: fixed;
		top: 67px;
		right: -250px;
		/*right: 0px;*/
		/*height: 50px;*/
		line-height: 50px;
		z-index: 1999;
		padding: 10px;
		border: 0px;
		transition: .3s;
	}

	.aioc-theme:hover {
		right: 0px;
	}

	.bgs {
		width: 90px;
		height: 30px;
		line-height: 30px;
		color: #ffffff;
		font-size: 12px;
		border-radius: 2px;
		margin: 5px;
	}

	.noice-list {
		width: 400px;
		padding: 10px;

	}

	.aioc-area {
		display: inline-block;
		position: absolute;
		left: 400px;
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
	.breadcrumb .el-breadcrumb__inner {
		color: #999999;
	}

	.breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
		color: #aaaaaa;
	}

	.el-badge__content.is-fixed {
		position: absolute;
		top: 18px;
		right: 12px;
		transform: translateY(-50%) translateX(100%);
	}

	.el-tabs__nav-scroll {
		overflow: hidden;
		border-radius: 3px;
		padding: 10px 0px;
		background: #1f2224;
	}

	.el-tabs--card > .el-tabs__header .el-tabs__nav {
		border: 0px !important;
	}

	.el-tabs--card > .el-tabs__header {
		border: 0px !important;
	}

	.el-tabs__item {
		background: #C0C4CC;
		margin-left: 10px;
		height: 34px;
		line-height: 34px;
		color: #606266;
	}

	.el-tabs--card > .el-tabs__header {
		border: 0px !important;
	}

	.el-tabs__item.is-active {
		color: #303133;
		background: #ffffff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}

	.close-left {
		margin-left: 0px !important;
	}

	.close-left1 {
		left: -241px !important;
	}

	.el-submenu .el-menu-item {
		padding-left: 70px !important;
	}

	.aioc-white .el-menu-item.is-active {
		background-color: #ecf5ff !important;
		border-left: 3px solid #409EFF;
		font-weight: 600;
	}

	.el-menu {
		border-right: solid 1px #eeeeee !important;
		border-left: solid 1px #eeeeee !important;
		border-bottom: solid 1px #eeeeee !important;
	}

	.aioc-theme .el-card__body {
		padding: 10px;
	}

	.aioc-cascader .el-input__inner {
		border: 0px;
		border-bottom: 3px solid #409EFF;
		border-radius: 0px;
		height: 56px;
		font-size: 16px;
		font-family: FangSong_GB2312;
		background: none;
		color: #ffffff;
	}

	.aiocw-cascader .el-input__inner {
		border: 0px;
		border-bottom: 3px solid #409EFF;
		border-radius: 0px;
		height: 56px;
		font-size: 16px;
		font-family: FangSong_GB2312;
		background: none;
		color: #333;
	}

	.el-cascader-node .el-radio {
		margin-top: 2px;
	}

	.el-cascader-menu__list {
		padding-top: 10px;
		padding-bottom: 30px;
	}

	.aioc-area .el-submenu__title {
		height: 55px !important;
	}

	/*媒体查询（电脑）*/
	@media screen and (min-width: 1529px) {
	}
</style>