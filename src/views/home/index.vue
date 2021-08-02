<template>
    <!--eslint-disable-->
    <div class="nd-container" :style="scaleFun">
        <div class="nd-top">
            <div class="nd-top-main">
                <div class="nd-tm-left">
                    <van-image class="nd-logo" :src="require('@/assets/img/logo/logo@2x.png')"/>
                    <div class="nd-title">
                        <div>太阳数据分析中心</div>
                        <div>Sun data analysis center</div>
                    </div>
                </div>

                <div class="nd-tm-right">
                    <div class="ml-20">
                        <div class="nd-menu-header1">
                            首页
                        </div>
                    </div>
                    <div class="ml-20">
                        <div class="nd-menu-header2">
                            观测设备
                        </div>
                        <div class="nd-menu-header3">
                            观测数据
                        </div>
                        <div class="nd-menu-header3">
                            观测申请
                        </div>
                    </div>
                    <div class="ml-20">
                        <div class="nd-menu-header2">
                            图库与成功
                        </div>
                        <div class="nd-menu-header3" @click="newsAndResource">
                            新闻与资源
                        </div>
                        <div class="nd-menu-header3">
                            中/EN
                        </div>
                    </div>
                </div>
            </div>

            <!--资讯-->
            <div class="nd-zx-box" v-if="news">
                <div class="nd-zx-main">
                    <div class="nd-left">
                        <div class="nd-left-title">
                            <div class="nd-zx-title">资讯</div>
                            <div class="nd-news1">NEWS</div>
                            <div class="nd-more">更多
                                <van-image class="nd-logo1" :src="require('@/assets/img/logo/more.png')"/>
                            </div>
                            <div class="nd-menu-header4"></div>
                        </div>

                        <div class="nd-zx-bg">
                            <div class="nd-zb-bottom1">
                                <div class="nd-time">
                                    <div class="time-style">FE XVIII 94 A</div>
                                    <div class="time-style">2021年07月06日 06.05.59</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="nd-right">
                        <div class="nd-right-title1">
                            <div class="nd-news-list">新闻列表</div>
                        </div>
                        <div class="nd-news">
                            <div class="news-list">
                                <div class="news-text">1. M型亚矮星是小质量螺栓中的贫金属成员</div>
                                <div class="news-text">2. 国家天文台LAMOST数据部团队基于LAMOST数据构建***</div>
                                <div class="news-text">3. 国家天文台LAMOST数据部团队基于LAMOST数据构建***</div>
                                <div class="news-text">4. 国家天文台LAMOST数据部团队基于LAMOST数据构建***</div>
                            </div>
                        </div>
                        <div class="nd-news-bg"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nd-next1"></div>
        <div class="nd-next2"></div>
        <div class="nd-introduction">
            <div class="nd-in-style">
                <div class="nd-introduction-style">介绍</div>
                <div class="in-style">introduction</div>
            </div>
            <div class="in-more">
                <div class="nd-more1">更多
                    <van-image class="nd-logo1" :src="require('@/assets/img/logo/more.png')"/>
                </div>
                <div class="nd-menu-header41"></div>
            </div>
        </div>

        <div class="nd-fl">
            <div class="pics6">
                <div class="status4_pics">
                    <ul class="pics6_status4">
                        <li>
                            <img class="status4-pic1"
                                 src="http://shopimg.weimob.com/100507453/Goods/1701191815042349.png">
                        </li>
                    </ul>
                </div>
                <div class="status4_pics">
                    <ul class="pics6_status4">
                        <li>
                            <img class="status4-pic1"
                                 src="http://shopimg.weimob.com/100507453/Goods/1701191815042349.png">
                        </li>
                    </ul>
                </div>
                <div class="status4_pics">
                    <ul class="pics6_status4">
                        <li>
                            <img class="status4-pic1"
                                 src="http://shopimg.weimob.com/100507453/Goods/1701191815042349.png">
                        </li>
                    </ul>
                </div>
                <div class="status4_pics">
                    <ul class="pics6_status4">
                        <li>
                            <img class="status4-pic1"
                                 src="http://shopimg.weimob.com/100507453/Goods/1701191815042349.png">
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="nd-footer" style="position: relative">
            <div class="nd-info" style="position: absolute; margin-top: 10px">
                <div class="nd-detail">
                    <div class="nd-address" style="text-align: left; margin-top: 25px; margin-left: 150px">地址:
                        江苏省南京市栖霞区仙林大道163号天文楼
                    </div>
                    <div style="margin-top: 25px; display: flex; flex-wrap: nowrap; margin-left: 150px; position: relative">
                        电话热线: (86)- 18012012539
                    </div>
                    <div style="margin-top: 25px; display: flex; flex-wrap: nowrap; margin-left: 150px">邮编: 210023</div>
                    <div class="nd-about"
                         style="display: flex; flex-wrap: nowrap; margin-left: 150px; margin-top: 25px;">关于我们
                        <div class="nd-tail" style="margin-left: 50px">联系我们</div>
                    </div>
                </div>
                <div class="nd-tech-support"
                     style=" border-top: 1px solid #f5f5f5; margin-left: 150px; margin-top: 20px; width: 900px"></div>
                <div style="display: flex; flex-wrap: nowrap; margin-left: 150px; margin-top: 20px; position: relative">
                    技术支持: 杭州爱启云网络科技有限公司
                    <div style="margin-left: 100px"> 苏ICP备 05002851 号</div>
                    <div style="margin-left: 90px">Copyright @ 南京大学天文与空间科学学院 All Rights Reserved 版权所有</div>
                </div>
                <div class="nd-tech-support"
                     style=" border-top: 1px solid #f5f5f5; margin-left: 150px; margin-top: 20px; width: 900px"></div>
            </div>
            <van-image style="position: absolute; width: 290px; height: 55px;margin-top: 45px"
                       :src="require('@/assets/img/logo/logo@2x.png')"/>
        </div>
        <News ref="newsRef"></News>
    </div>
</template>
<!--eslint-disable-->
<script>
    import News from "@/views/home/newsAndResource";
    export default {
        name: "index",
        components: {News},

        data() {
            return {
                scale: 0.5,
            }
        },
        mounted() {
             this.initNewsData();
        },
        methods: {

            async initNewsData(){
              let params = new FormData();
              params.append("title", this.title);
              let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_new_and_resource_search, params, "POST");
              if(data.code == 200){
                  this.tableData = data.data;
                  console.log(this.tableData);
                  return true;
              }
            },

            scaleFun: function () {
                var scale = this.scale;
                return `transform:scale(${scale})`
            },

            //新闻与资源
            newsAndResource() {
                this.$refs.newsRef.open();
            },
        },

        data() {
            return {
                news: true,
                tableData: [],
                title: "",
            }
        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {

        .nd-zx-title {
            color: white;
            text-align: left;
            font-size: 24px;
            line-height: 80px;
            margin-left: 26px;
            width: 80px;
            height: 70px;
        }

        .pics6 {
            position: absolute;
            margin: 20px;
            display: flex;
            flex-wrap: nowrap;
            margin-left: 135px;

        }

        .pics6_status4 {
            display: flex;
            flex-wrap: nowrap;
        }

        img {
            border-style: none;
            width: 210px;
            height: 306px;
            margin-left: 20px;
            text-align: center;
        }

        .nd-news1 {
            color: white;
            font-size: 1px;
            text-align: left;
            margin-left: 24px;
            width: 80px;
        }

        .nd-more {
            position: relative;
            font-size: 1px;
            color: white;
            text-align: right;
            margin-right: 80px;
        }

        .nd-more1 {
            position: relative;
            font-size: 1px;
            color: white;
            text-align: right;
            margin-right: 70px;
        }

        .nd-menu-header41 {
            border-top: 2px solid #ffffff;
            font-size: 16px;
            line-height: 40px;
            width: 98px;
            margin-left: 310px;
            margin-top: 8px;
        }

        .nd-logo1 {
            position: absolute;
            width: 50px;
            margin-left: 20px;
            height: 15px;
        }

        .news-list {
            margin: 20px;
            position: absolute;
        }

        .news-text {
            color: white;
            font-size: 10px;
            margin-top: 10px;
            text-align: left;
        }

        .nd-menu-header4 {
            border-top: 2px solid #ffffff;
            font-size: 16px;
            line-height: 40px;
            width: 93px;
            margin-left: 345px;
            margin-top: 8px;
        }

        .nd-time {
            margin-top: 18px;
        }

        .time-style {
            color: white;
            font-size: 10px;
            margin-top: 10px;
            text-align: left;
            margin-left: 20px;
        }

        .nd-in-style {
            position: absolute;
            margin-top: 35px;
            margin-left: 145px;
        }

        .in-more {
            position: absolute;
            padding-top: 60px;
            margin-left: 630px;
        }

        .nd-introduction-style {
            color: white;
            font-size: 40px;
        }

        .in-style {
            color: #ffffff;
            font-size: 10px;
            margin-top: 10px;
        }

        .nd-menu-header1 {
            border-top: 2px solid #ffffff;
            font-size: 16px;
            line-height: 40px;
            width: 100px;
        }

        .nd-menu-header2 {
            border-top: 2px solid #ffffff;
            font-size: 16px;
            line-height: 40px;
            margin-left: 40px;
            width: 100px;
        }

        .nd-menu-header3 {
            border-top: 1px solid #f5f5f5;
            font-size: 16px;
            margin-left: 40px;
            line-height: 40px;
            width: 100px;
        }

        .nd-tm-right {
            display: flex;
            flex-wrap: nowrap;
            padding-top: 20px;
        }

        .nd-title div:nth-of-type(1) {
            font-size: 32px;
        }

        .nd-title div:nth-of-type(2) {
            font-size: 18px;
            margin-top: 10px;
        }

        .nd-title {
            margin-top: 100px;
        }

        .nd-tm-left, .nd-tm-right {
            width: 50%;
            text-align: left;
        }

        .nd-logo {
            height: 44px;
            width: 224px;
            margin-top: 10px;
        }

        .nd-top-main {
            display: flex;
            flex-wrap: nowrap;
            width: 900px;
            margin: 0px auto;
            font-family: "SC-Bold";
            color: #ffffff;
        }

        .nd-top {
            background: url("../../assets/img/background/banner@3x.png");
            background-size: 100% 100%;
            height: 325px;
            width: 100%;
            min-width: 1200px;
            position: relative;
        }

        .nd-zx-box {
            width: 100%;
            min-width: 1200px;
            height: 500px;
            position: absolute;
            top: 285px;
            left: 0px;
        }

        .nd-zx-main {
            width: 900px;
            height: 100%;
            margin: 0px auto;
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-next1 {
            background: #181617;
            height: 80px;
            width: 100%;
            min-width: 1200px;
        }

        .nd-next2 {
            background: #252022;
            height: 380px;
            width: 100%;
            min-width: 1200px;
        }

        .nd-next3 {
            background: white;
            height: 380px;
            width: 100%;
            min-width: 1200px;
        }

        .nd-left, .nd-right {
            width: 50%;
        }

        .nd-left-title {
            width: 100%;
            height: 120px;
            background: #252022;
        }

        .nd-right-title1 {
            height: 80px;
            width: 100%;
            margin-top: 40px;
            position: relative;
        }

        .nd-news-list {
            color: white;
            font-size: 13px;
            text-align: left;
            position: absolute;
            margin-top: 40px;
            margin-left: 30px;
        }

        .nd-zx-bg {
            background: url("../../assets/img/background/zx.png");
            background-size: 100% 100%;
            height: 337.5px;
            width: 100%;
            position: relative;
        }

        .nd-zb-bottom1 {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            height: 75px;
            background: #2520228a;
        }

        .nd-news {
            width: calc(100% - 30px);
            height: 139px;
            border: 2px solid #ffffff;
            margin: 30px;
            position: relative;
        }

        .nd-news-bg {
            background: url("../../assets/img/background/news.png");
            background-size: 100% 100%;
            height: 143px;
            width: calc(100% - 30px);
            margin-left: 30px;
        }

        .nd-introduction {
            background: #181617;
            height: 114px;
            width: 100%;
            min-width: 1200px;
            position: relative;
        }

        .nd-fl {
            background: #252022;
            height: 348px;
            width: 100%;
            min-width: 1200px;
            position: relative;
        }

        .nd-footer {
            background: #181617;
            height: 262px;
            width: 100%;
            min-width: 1200px;
        }
    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {
        .nd-top {
            background: url("../../assets/img/background/banner@3x.png");
            background-size: 100% 100%;
            height: 150px;
            width: 100%;
            position: relative;
        }

        .nd-zx-box {
            width: 100%;
            height: 180px;
            position: absolute;
            top: 130px;
            left: 0px;
        }

        .nd-zx-main {
            width: 340px;
            height: 100%;
            margin: 0px auto;
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-next1 {
            background: #181617;
            height: 30px;
            width: 100%;
        }

        .nd-next2 {
            background: #252022;
            height: 130px;
            width: 100%;
        }

        .nd-left, .nd-right {
            width: 50%;
        }

        .nd-left-title {
            width: 100%;
            height: 50px;
            background: #252022;
        }

        .nd-right-title {
            height: 30px;
            width: 100%;
            margin-top: 20px;
        }

        .nd-zx-bg {
            background: url("../../assets/img/background/zx.png");
            background-size: 100% 100%;
            height: 112px;
            width: 100%;
            position: relative;
        }

        .nd-zb-bottom {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            height: 25px;
            background: rgba(37, 32, 34, 0.76);
        }

        /* .nd-news {
             width: calc(100% - 10px);
             height: 46px;
             border: 2px solid #ffffff;
             margin: 10px;
         }*/
        .nd-news-bg {
            background: url("../../assets/img/background/news.png");
            background-size: 100% 100%;
            height: 47px;
            width: calc(100% - 10px);
            margin-left: 10px;
        }

        .nd-introduction1 {
            background: #181617;
            height: 40px;
            width: 100%;
        }

        .nd-fl {
            background: #252022;
            height: 116px;
            width: 100%;
        }

        .nd-footer {
            position: relative;
            background: #181617;
            height: 88px;
            width: 100%;
        }

        .nd-logo3.van-image {
            position: relative;
            display: inline-block;
            width: 295px;
            height: 60px;
            margin-top: 55px;
            margin-left: 225px;
        }

        .nd-news-resource {
            background-color: white;

        }

    }
</style>