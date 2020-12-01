<template>
    <div>
        <!-- 头部 -->
        <header>
            <!-- logo -->
            <div class="am-fl tpl-header-logo">
                <a href="javascript:;">
                    <img :src="project.icon" alt="">
                </a>
                <span class="main-title">{{project.chName}}</span>
            </div>
            <!-- 右侧内容 -->
            <div class="tpl-header-fluid">
                <!-- 侧边切换 -->
                <div class=" fl tpl-header-switch-button">
                    <span class="fenlie mt-15" @click="closeLeft"></span>
                </div>

                <!-- 其它功能-->
                <div class="fr tpl-header-navbar">
                    <ul class="dffn">
                        <!-- 欢迎语 -->
                        <li class="am-text-sm">
                            <a href="javascript:;">欢迎你, <span>{{user.name}}</span> </a>
                        </li>

                        <li class="wdi-80">
                            <el-badge :value="4" :max="99" class="item">
                                <i class="el-icon-message"></i>
                            </el-badge>
                        </li>

                        <li class="tuc" @click="logout">
                            <i class="tuichu"></i>
                            <span class="fs-14 ml-5">退出</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <!-- 侧边导航栏 -->
        <div :class="closeLfetFlag ? 'left-sidebar close-left1':'left-sidebar'">
            <!-- 用户信息 -->
            <div class="tpl-sidebar-user-panel">
                <div class="dffc tl">
                    <div class="tpl-user-panel-profile-picture">
                        <el-avatar class="ava" :size="avatarSize" :src="user.avatar"></el-avatar>
                    </div>
                    <span class="user-panel-logged-in-text">
                      <i class="el-icon-female"></i>
                      {{user.name}}
                    </span>
                    <div class="tpl-user-panel-action-link">
                        <span class="el-icon-edit"></span>
                        账号设置
                    </div>
                </div>
            </div>

            <el-menu :style="'height:' + (clientHeight-100) + 'px;overflow: auto;'"
                    :default-active="activeMenuId"
                    class="el-menu-vertical aioc-scroll"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#282d2f"
                    text-color="#868E8E"
                    active-text-color="#ffffff"
                    :collapse="isCollapse">
                <div v-for="(item, index) in project.children" :key="index">
                    <el-submenu v-if="item.children.length > 0" :index="item.id">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.chName}}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item  :index="sub.id" v-for="(sub, subIndex) in item.children" :key="subIndex"  @click="selectSubMenu(item, sub)">
                                {{sub.chName}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-menu-item v-else :index="item.id" @click="selectMenu(item)">
                        <i :class="item.icon"></i>
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
        <div :class="closeLfetFlag ? 'tpl-content-wrapper close-left':'tpl-content-wrapper'">

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
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item> 您的当前位置：{{project.chName}}</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>

            <iframe id="iframe" class="frame-con" :src="currentUrl" scrolling="no" :style="'height:' + clientHeight + 'px;'">
            </iframe>
        </div>
    </div>
</template>

<script>

    export default {
        name: "index",
        created(){
            // 判断用户是否登录
            this.judgeIsLogin();
            document.addEventListener('click',(e)=>{
                if(this.$refs.rightMenuRef){
                    let isSelf = this.$refs.rightMenuRef.contains(e.target)
                    if(!isSelf){
                        this.rightMenuVisible = false;
                    }
                }
            });
        },
        mounted() {
            this.loadUserAndAuthority();
            new this.$wow.WOW({
                live: false
            }).init();
        },
        methods: {
            async loadUserAndAuthority() {
                let params = new FormData()
                let res = await this.$aiorequest(this.$aiocUrl.console_service_v1_login_user_authority, params, "POST");
                if (res.code === 200) {
                    var data = res.data;
                    this.user = res.data;
                    if (data.roles.length > 0) {
                        this.roles = data.roles;
                    }
                    if (data.projectlFuns != null && data.projectlFuns.length > 0) {
                        this.project = data.projectlFuns[0];
                        if(this.project.children != null && this.project.children.length > 0) {
                            const menu = this.project.children[0];
                            this.breadcrumbs.push(menu.chName);
                            if(menu.children != null && menu.children.length > 0) {
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
                if(data.code === 200) {
                    this.$utils.removeStorage("aioctoken");
                    this.$router.push({name: "teacherLogin"});
                }
            },

            async judgeIsLogin() {
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_login_judgeIsLogin, {}, "GET");
                if(data.code === 200 && data.data != "login") {
                    this.$router.push({name: "teacherLogin"});
                }
            },

            selectSubMenu(menuItem, subMenuItem) {
                this.currentUrl = this.baseUrl + subMenuItem.url;
                this.breadcrumbs = [];
                this.breadcrumbs.push(menuItem.chName);
                this.breadcrumbs.push(subMenuItem.chName);
                this.setButtonPermissions(subMenuItem);
            },

            selectMenu(menuItem) {
                this.currentUrl = this.baseUrl + menuItem.url;
                this.breadcrumbs = [];
                this.breadcrumbs.push(menuItem.chName);
                this.setButtonPermissions(menuItem);
            },

            setButtonPermissions(item) {
                const activeBtnAuthority = item.btns;
                if(activeBtnAuthority != "" && activeBtnAuthority != null && activeBtnAuthority != undefined) {
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
                for(var i in this.menuHises) {
                    const menuHiseElement = this.menuHises[i];
                    if(this.editableTabsValue == menuHiseElement.id)  {
                        conatinInLeft = true;
                    }
                    if(menuHiseElement.chName == this.currentRightMenuName) {
                        if(conatinInLeft) {
                            this.editableTabsValue = menuHiseElement.id;
                        }
                        start = true;
                    }
                    if(start) {
                        temp.push(menuHiseElement);
                    }
                }
                this.menuHises = temp;
                this.rightMenuVisible = false;
            },

            closeRightTab() {
                var temp = [];
                var conatinInLeft = false;
                for(var i in this.menuHises) {
                    const menuHiseElement = this.menuHises[i];
                    if(this.editableTabsValue == menuHiseElement.id)  {
                        conatinInLeft = true;
                    }
                    if(menuHiseElement.chName == this.currentRightMenuName) {
                        if(!conatinInLeft) {
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
                for(var i in this.menuHises) {
                    const menuHiseElement = this.menuHises[i];
                    if(menuHiseElement.chName == this.currentRightMenuName) {
                        temp.push(menuHiseElement);
                        this.menuHises = temp;
                        this.editableTabsValue = menuHiseElement.id;
                        this.rightMenuVisible = false;
                        return;
                    }
                }
            },

            removeMenuTab(targetName) {
                console.log(targetName)
                if(this.menuHises.length == 1) {
                    this.menuHises = [];
                    this.editableTabsValue = "";
                }
                var temp = [];
                for(var i in this.menuHises) {
                    const menuHiseElement = this.menuHises[i];
                    if(menuHiseElement.id == targetName) {
                        if(this.editableTabsValue == menuHiseElement.id) {
                            if(i == 0) {
                                this.editableTabsValue = this.menuHises[1].id;
                            } else {
                                this.editableTabsValue = this.menuHises[i-1].id;
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
                if(this.menuHises.length == 1) {
                    this.menuHises = [];
                    this.editableTabsValue = "";
                }
                var temp = [];
                for(var i in this.menuHises) {
                    const menuHiseElement = this.menuHises[i];
                    if(menuHiseElement.chName == this.currentRightMenuName) {
                        if(this.editableTabsValue == menuHiseElement.id) {
                            if(i == 0) {
                                this.editableTabsValue = this.menuHises[1].id;
                            } else {
                                this.editableTabsValue = this.menuHises[i-1].id;
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
                if(e.target.className.indexOf("el-tabs__item") != -1) {
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
                this.closeLfetFlag = this.closeLfetFlag ? false:true;
            },

                // let params = new FormData()
                // let res = await this.$aiorequest(this.$aiocUrl.console_service_v1_login_user_authority, params, "POST");
                // if (res.code === 200) {
                //     var data = res.data;
                //     var data1 = {
                //         roles: [
                //
                //         ],
                //         projectlFuns: [
                //             {
                //                 chName: "安徽省柏林书画研究院",
                //             }
                //         ],
                //         menus: [
                //             // {
                //             //     id: "1",
                //             //     chName: "首页",
                //             //     icon: "el-icon-location",
                //             //     url: "",
                //             //     children: [],
                //             // },
                //             {
                //                 id: "1",
                //                 chName: "我的课程",
                //                 icon: "el-icon-location",
                //                 url: "course",
                //                 children: [],
                //             },
                //             {
                //                 id: "2",
                //                 chName: "我的活动",
                //                 icon: "el-icon-location",
                //                 url: "tactivity",
                //                 children: [],
                //             },
                //             {
                //                 id: "3",
                //                 chName: "我的班级",
                //                 icon: "el-icon-location",
                //                 url: "tclass",
                //                 children: [],
                //             },
                //             {
                //                 id: "4-2",
                //                 chName: "唯一注册码管理",
                //                 icon: "el-icon-location",
                //                 url: "registrationCode",
                //                 children: [],
                //             },
                //             {
                //                 id: "4-3",
                //                 chName: "注册学员管理",
                //                 icon: "el-icon-location",
                //                 url: "studentm",
                //                 children: [],
                //             },
                //             {
                //                 id: "4-4",
                //                 chName: "老师管理",
                //                 icon: "el-icon-location",
                //                 url: "teacherm",
                //                 children: [],
                //             },
                //             {
                //                 id: "4-5",
                //                 chName: "活动管理",
                //                 icon: "el-icon-location",
                //                 url: "activitym",
                //                 children: [],
                //             },
                //             {
                //                 id: "4-6",
                //                 chName: "证书管理",
                //                 icon: "el-icon-location",
                //                 url: "certificatem",
                //                 children: [],
                //             },
                //             {
                //                 id: "4-7",
                //                 chName: "财务管理",
                //                 icon: "el-icon-location",
                //                 children: [
                //                     {
                //                         id: "5-1-1",
                //                         url: "pay",
                //                         chName: "收支账户配置",
                //                     },
                //                     {
                //                         id: "5-1-2",
                //                         url: "income",
                //                         chName: "收入明细",
                //                     },
                //                     {
                //                         id: "5-1-3",
                //                         url: "approveSet",
                //                         chName: "审批配置",
                //                     },
                //                     {
                //                         id: "5-1-3",
                //                         url: "approve",
                //                         chName: "审批申请",
                //                     },
                //                 ],
                //             },
                //             {
                //                 id: "5-1",
                //                 chName: "课程管理",
                //                 icon: "el-icon-location",
                //                 children: [
                //                     {
                //                         id: "5-1-1",
                //                         url: "mainSubject",
                //                         chName: "课程大类管理",
                //                     },
                //                     {
                //                         id: "5-1-2",
                //                         url: "subSubject",
                //                         chName: "课程小类管理",
                //                     },
                //                     {
                //                         id: "5-1-3",
                //                         url: "classm",
                //                         chName: "班级配置",
                //                     },
                //                 ],
                //             },
                //             {
                //                 id: "5",
                //                 chName: "系统设置",
                //                 icon: "el-icon-location",
                //                 children: [
                //                     {
                //                         id: "5-1-3",
                //                         url: "user",
                //                         chName: "用户管理",
                //                     },
                //                     {
                //                         id: "6",
                //                         url: "role",
                //                         chName: "角色管理",
                //                     },
                //                     {
                //                         id: "7",
                //                         url: "menu",
                //                         chName: "菜单管理",
                //                     },
                //                 ],
                //             }
                //         ],
                //     };
                //
                //     if(data1.roles.length > 0) {
                //         this.roles = data1.roles;
                //     }
                //     if(data1.projectlFuns != null && data1.projectlFuns.length > 0 ) {
                //         this.projectName = data1.projectlFuns[0].chName;
                //     }
                //     if(data1.menus != null && data1.menus.length > 0) {
                //         this.menus = data.menus;
                //         this.menuHises.push(this.menus[0]);
                //         this.editableTabsValue = this.menus[0].id;
                //     }
                // }
        },
        data() {
            return {
                clientHeight : document.body.clientHeight - 57 - 83,
                logo: require('@/assets/img/logo/logo.png'),
                avatar: require('@/assets/img/ouynn.jpg'),
                avatarSize: "80",
                menuShow: false,
                isCollapse: false,
                roles: [],
                menus: [],
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
                baseUrl: "http://localhost:8080/#",

            }
        },
    }
</script>

<style scoped>
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
        background: #282d2f;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
    }
    .tpl-header-logo img {
        width: 42px;
        height: 30px;
    }
    .main-title {
        color: #ffffff;
        text-decoration: none;
        font-size: 18px;
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
        color: #ffffff;
    }
    .am-text-sm a {
        display: block;
        padding: 0 16px;
        position: relative;
        color: #ffffff;
        text-decoration: none;
        font-size: 14px;
    }
    .el-icon-message {
        font-size: 22px;
        color: #ffffff;
    }
    .tuc {
        width: 80px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
    }
    .tuichu {
        margin-top: 17px;
    }
    .left-sidebar {
        padding-top: 57px;
        background: #282d2f;
        transition: all 0.4s ease-in-out;
        width: 240px;
        min-height: 100%;
        position: absolute;
        z-index: 1104;
        top: 0;
        left: 0px;
    }
    .tpl-sidebar-user-panel {
        background: #1f2224;
        border-bottom: 1px solid #1f2224;
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
        background: #3a4144;
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
    .right-menu {
        position: absolute;
        z-index: 1102;
        background: #eeeeee;
        border: 1px solid #eeeeee;
        padding: 10px 5px;
    }
    .menu__item {
        font-size: 12px;
        line-height: 12px;
        text-align: left;
        padding: 5px 10px;
        color: #606266;
    }
    .menu__item:hover {
        color: #409EFF;
    }
    .breadcrumb {
        height: 50px;
        line-height: 50px;
        background: #1f2224;
        margin-bottom: 10px;
        border-radius: 3px;
        padding-left: 20px;
        color: #eeeeee !important;
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
    .breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
        color: #aaaaaa;
    }
    .el-badge__content.is-fixed {
        position: absolute;
        top: 18px;
        right: 12px;
        transform: translateY(-50%) translateX(100%);
    }
    .el-menu {
        border-right: solid 0px #e6e6e6;
    }
    .el-tabs__nav-scroll {
        overflow: hidden;
        border-radius: 3px;
        padding: 10px 0px;
        background: #1f2224;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: 0px !important;
    }
    .el-tabs--card>.el-tabs__header {
        border: 0px !important;
    }
    .el-tabs__item {
        background: #C0C4CC;
        margin-left: 10px;
        height: 34px;
        line-height: 34px;
        color: #606266;
    }
    .el-tabs--card>.el-tabs__header {
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
        left: -240px !important;
    }
    .el-submenu .el-menu-item {
        padding-left: 70px !important;
    }

    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
    }
</style>