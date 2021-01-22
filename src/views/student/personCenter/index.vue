<template>
    <div>
        <div class="aioc-pc">
            <Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'" :bgColor="'bg-black'" :bluser="bluser"></Header>
        </div>
        <div class="aioc-container1" :style="'width:' + clientWidth + 'px; height:' + clientHeight + 'px;'">
            <div class="pc-content-container">
                <el-card class="pc-menu wow bounceInLeft">
                    <ul>
                        <li :class="currentMenu == item.id ? 'activeMenu' : ''"
                            v-for="(item, index) in pcMenus" :key="index"
                            @click="selectMenu(item)"
                        >
                            {{item.name}}
                        </li>
                    </ul>
                </el-card>

                <el-card class="pc-op wow bounceInRight">
                    <!--此处不能用v-if,v-if 导致这个子组件未渲染，ref 就会点击事件selectMenu中失效-->
                    <!--我的资料-->
                    <div v-show="currentMenu == 'myProfile'">
                        <MyProfile ref="myProfileRef"></MyProfile>
                    </div>

                    <!--我的选课-->
                    <div v-show="currentMenu == 'myClass'">
                        <MyClass></MyClass>
                    </div>

                    <!--活动经历-->
                    <div v-show="currentMenu == 'myActivity'">
                        <MyActivity></MyActivity>
                    </div>

                    <!--我的证书-->
                    <div v-show="currentMenu == 'myCertificate'">
                        <MyCertificate></MyCertificate>
                    </div>

                    <!--支付明细-->
                    <div v-show="currentMenu == 'myPay'">
                        <MyPay></MyPay>
                    </div>

                    <!--账号设置-->
                    <div v-show="currentMenu == 'myAccountSet'">
                        <MyAccountSet></MyAccountSet>
                    </div>

                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import MyProfile from  "@/components/MyProfile"
    import MyClass from  "@/components/MyClass"
    import MyActivity from  "@/components/MyActivity"
    import MyCertificate from  "@/components/MyCertificate"
    import MyPay from  "@/components/MyPay"
    import MyAccountSet from  "@/components/MyAccountSet"

    export default {
        name: "index",
        components: {Header, MyProfile, MyClass, MyActivity, MyCertificate, MyPay, MyAccountSet},
        mounted() {
            // 判断用户是否登录
            this.judgeIsLogin();
            new this.$wow.WOW({
                live: false
            }).init();
            let temp = this.$utils.getStorage("currentMenu");
            if(temp == null || temp == "" || temp == undefined) {
                this.currentMenu = "myProfile";
            } else {
                this.currentMenu = this.$utils.getStorage("currentMenu");
            }
        },
        methods: {
            async judgeIsLogin() {
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_login_judgeIsLogin, {}, "GET");
                if (data.code === 200) {
                    if (data.data.isLogin == "login") {
                        this.bluser = data.data.bluser;
                    } else {
                        this.$router.push({name: "studentLogin"});
                    }
                } else {
                    this.$router.push({name: "studentLogin"});
                }
            },

            selectMenu(menu) {
                this.$utils.setStorage("currentMenu", menu.id);
                this.currentMenu = menu.id;
            },
        },
        data() {
            return {
                activePage: '个人中心',
                bluser: "",
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight -100,
                /* 个人中心的菜单 */
                pcMenus: [
                    {name: "我的资料", id: "myProfile"},
                    {name: "我的选课", id: "myClass"},
                    {name: "活动经历", id: "myActivity"},
                    {name: "我的证书", id: "myCertificate"},
                    {name: "支付明细", id: "myPay"},
                    {name: "账号设置", id: "myAccountSet"},
                ],

                /* 当前选中菜单 */
                currentMenu: "myProfile",
                myProfile: "",
            }
        }
    }
</script>

<style scoped>
        .avatar-container {
            background: #333333;
            height: 200px;
            line-height: 200px;
        }
        .avatar-main {
            margin: 0px auto;
            width: 1400px;
            height: 200px;
            display: flex;
            flex-wrap: nowrap;
        }
        .avatar {
            width: 100px;
            border-radius: 50px;
            border: 1px solid #cccccc;
            margin-left: 100px;
            margin-top: 50px;
        }
        .introduction {
            margin-left: 20px;
            color: #ffffff;
            display: flex;
            flex-direction: column;
        }
        .introduction > span {
            line-height: 30px;
            padding-top: 70px;
            text-align: left;
            font-size: 16px;
            font-weight: 600;
        }
        .introduction > p {
            line-height: 30px;
            width: 1000px;
            text-align: left;
            font-size: 14px;
            color: #909399;
        }
        .pc-content-container {
            margin: 10px auto;
            margin-bottom: 20px;
            width: 1400px;
            display: flex;
            flex-wrap: nowrap;
            margin-bottom: 120px;
        }
        .pc-menu {
            width: 180px;
            background: #ffffff;
        }
        .pc-op {
            width: 1210px;
            margin-left: 10px;
        }
        .pc-menu li {
            height: 40px;
            line-height: 40px;
            margin: 10px 0 10px 0;
            text-align: center;
            color: #333333;
            border-radius: 5px;
        }
        .pc-menu li:hover {
            background: #eeeeee;
        }
        .activeMenu {
            background: #409EFF;
            color: #ffffff !important;
        }
        .activeMenu:hover {
            background: #409EFF !important;
            color: #ffffff !important;
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