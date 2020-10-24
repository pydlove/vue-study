<template>
    <div>
        <div class="aioc-pc">
            <Header ref="headerRef" :fontColor="fontColor = 'color-black'"></Header>
        </div>
        <div class="aioc-container1" :style="'width:' + clientWidth + 'px; height:' + clientHeight + 'px;'">
            <div class="avatar-container">
                <div class="avatar-main">
                    <div>
                        <img class="avatar"
                             :src="user.avatar == null ? defaultAvatar :  user.avatar" alt="用户头像"/>
                    </div>
                    <div class="introduction">
                        <span>{{user.nickname}}</span>
                        <p>
                            {{user.introduction}}
                        </p>
                    </div>
                </div>
            </div>

            <div class="pc-content-container">
                <el-card class="pc-menu">
                    <ul>
                        <li :class="currentMenu == item.id ? 'activeMenu' : ''"
                            v-for="(item, index) in pcMenus" :key="index"
                            @click="selectMenu(item)"
                        >
                            {{item.name}}
                        </li>
                    </ul>
                </el-card>

                <el-card class="pc-op">
                    <!--此处不能用v-if,v-if 导致这个子组件未渲染，ref 就会点击事件selectMenu中失效-->
                    <!--我的资料-->
                    <div v-show="currentMenu == 'myProfile'">
                        <MyProfile ref="myProfileRef"></MyProfile>
                    </div>

                    <!--我的人脉-->
                    <div v-show="currentMenu == 'myConnections'">
                        b
                    </div>

                    <!--我的关注-->
                    <div v-show="currentMenu == 'myFocus'">
                        c
                    </div>

                    <!--我的粉丝-->
                    <div v-show="currentMenu == 'myFans'">
                        d
                    </div>

                    <!--我的收藏-->
                    <div v-show="currentMenu == 'myCollection'">
                        e
                    </div>

                    <!--我的博客-->
                    <div v-show="currentMenu == 'myBlog'">
                        v
                    </div>

                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import MyProfile from  "@/components/personCenter/MyProfile.vue"

    export default {
        name: "index",
        components: {Header, MyProfile},
        mounted() {
            this.clientWidth = document.body.clientWidth;
            this.clientHeight = document.body.clientHeight -50;
            this.initUser();
        },
        methods: {
            async initUser() {
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_login_currentuser, {}, "GET", false);
                if (data.code === 200) {
                    this.user = data.data;
                    this.transferUser();
                    return this.user;
                }
            },

            selectMenu(menu) {
                this.currentMenu = menu.id
                if(this.currentMenu == "myProfile") {
                   this.transferUser()
                }
            },

            /**
             * 传递User 信息
             */
            transferUser() {
                this.$refs.myProfileRef.handleUser(this.user);
            },
        },
        data() {
            return {
                clientWidth: 1800,
                clientHeight: 970,

                /* 用户信息 */
                user: {
                    nickname: "",
                    introduction: "",
                    avatar: require('@/assets/img/avatar/avatar-1.jpg'),
                    name: "",
                    sex: "",
                    mail: "",
                },

                /* 个人中心的菜单 */
                pcMenus: [
                    {name: "我的资料", id: "myProfile"},
                    {name: "我的人脉", id: "myConnections"},
                    {name: "我的关注", id: "myFocus"},
                    {name: "我的粉丝", id: "myFans"},
                    {name: "我的收藏", id: "myCollection"},
                    {name: "我的博客", id: "myBlog"},
                ],

                /* 当前选中菜单 */
                currentMenu: "myProfile",

                defaultAvatar: require('@/assets/img/avatar/avatar-1.jpg'),

                myProfile: "",
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
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
    }

    /*媒体查询（平板）*/
    @media screen and (min-width: 769px) and (max-width: 996px) {


    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {


    }
</style>