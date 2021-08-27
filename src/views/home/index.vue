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

                <Header></Header>
            </div>
            <!--资讯-->
            <div class="nd-zx-box">
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
                                <div class="news-text" @click="checkDetail()" >1. {{this.tableData[0].title | ellipsis }}
                                </div>
                                <div class="news-text" @click="checkDetail1()">2. {{this.tableData[1].title | ellipsis
                                    }}
                                </div>
                                <div class="news-text" @click="checkDetail2()">3. {{this.tableData[2].title | ellipsis
                                    }}
                                </div>
                                <div class="news-text" @click="checkDetail3()">4. {{this.tableData[3].title | ellipsis
                                    }}
                                </div>
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
                <div>
                    <ul class="pics6_status4">
                        <li>
                            <van-image class="nd-logo2" :src="require('@/assets/img/logo/卫星.png')"/>
                        </li>
                        <div class="nd-sate">
                            <div class="nd-sate1">卫星</div>
                            <div class="nd-sate2">Satellit</div>
                        </div>
                    </ul>
                </div>
                <div>
                    <ul class="pics6_status4">
                        <li>
                            <van-image class="nd-logo2" :src="require('@/assets/img/logo/望远镜.png')"/>
                        </li>
                        <div class="nd-sate">
                            <div class="nd-sate1">望远镜</div>
                            <div class="nd-sate2">Telescope</div>
                        </div>
                    </ul>
                </div>
                <div>
                    <ul class="pics6_status4">
                        <li>
                            <van-image class="nd-logo2" :src="require('@/assets/img/logo/仪器.png')"/>
                        </li>
                        <div class="nd-sate">
                            <div class="nd-sate1">仪器</div>
                            <div class="nd-sate2">Instrument</div>
                        </div>
                    </ul>
                </div>
                <div>
                    <ul class="pics6_status4">
                        <li>
                            <van-image class="nd-logo2" :src="require('@/assets/img/logo/站点.png')"/>
                        </li>
                        <div class="nd-sate">
                            <div class="nd-sate1">站点</div>
                            <div class="nd-sate2">Site</div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <tail></tail>
    </div>

</template>
<!--eslint-disable-->
<script>
    import tail from "@/components/headAndTail/tail";
    import Header from "@/components/Header";

    export default {
        name: "index",
        components: {
            Header, tail
        },

        data() {
            return {
                scale: 0.5,
                tableData: [],
                title: "",
                clientHeight: document.body.clientHeight,
            }
        },

        filters: {
            ellipsis(value) {
                if (!value) return '';
                if (value.length > 10) {
                    return value.slice(0, 10) + '...'
                }
                return value
            }
        },

        mounted() {
            this.initNewsData();
        },
        methods: {

            //超链接跳转
            checkDetail() {
                this.$router.push({
                    path: '/detail', query: {
                        id: this.tableData[0].id,
                        title: this.tableData[0].title, picture: this.tableData[0].picture,
                        picture: this.tableData[0].picture, content: this.tableData[0].content,
                        status: this.tableData[0].status, displayOrder: this.tableData[0].displayOrder,
                        createTime: this.tableData[0].createTime, enAuthor: this.tableData[0].enAuthor
                    }
                })
            },

            checkDetail1() {
                this.$router.push({
                    path: '/detail', query: {
                        id: this.tableData[1].id,
                        title: this.tableData[1].title, picture: this.tableData[1].picture,
                        picture: this.tableData[1].picture, content: this.tableData[1].content,
                        status: this.tableData[1].status, displayOrder: this.tableData[1].displayOrder,
                        createTime: this.tableData[1].createTime, enAuthor: this.tableData[1].enAuthor
                    }
                })
            },

            checkDetail2() {
                this.$router.push({
                    path: '/detail', query: {
                        id: this.tableData[2].id,
                        title: this.tableData[2].title, picture: this.tableData[2].picture,
                        picture: this.tableData[2].picture, content: this.tableData[2].content,
                        status: this.tableData[2].status, displayOrder: this.tableData[2].displayOrder,
                        createTime: this.tableData[2].createTime, enAuthor: this.tableData[2].enAuthor
                    }
                })
            },

            checkDetail3() {
                this.$router.push({
                    path: '/detail', query: {
                        id: this.tableData[3].id,
                        title: this.tableData[3].title, picture: this.tableData[3].picture,
                        picture: this.tableData[3].picture, content: this.tableData[3].content,
                        status: this.tableData[3].status, displayOrder: this.tableData[3].displayOrder,
                        createTime: this.tableData[3].createTime, enAuthor: this.tableData[3].enAuthor
                    }
                })
            },

            async initNewsData() {
                let params = new FormData();
                params.append("title", this.title);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_new_and_resource_search, params, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    return true;
                }
            },

            scaleFun: function () {
                var scale = this.scale;
                return `transform:scale(${scale})`
            },

        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {

        .nd-logo2 {
            margin-left: 20px;
            height: 280px;
            width: 210px;
            margin-top: 20px;
        }

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
            position: relative;
        }

        .nd-logo2:hover {
            background: red;
            border: 1px solid #eeeeee;
        }

        .nd-sate {
            position: absolute;
            margin-left: 50px;
            margin-top: 220px;
        }

        .nd-sate1 {
            font-size: 25px;
            color: #e6e6e6;
        }

        .nd-sate2 {
            margin-top: 10px;
            font-size: 15px;
            color: #e6e6e6;
            text-align: left;
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

        .news-text:hover {
            text-decoration: underline;
            color: #096dd9;
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

    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {
        .nd-top {
            background: url("../../assets/img/background/banner@3x.png");
            background-size: 100% 100%;
            height: 100%;
            width: 100%;
            position: relative;
        }

        .nd-title {
            margin-top: 10px;
            margin-left: 10px;
            width: 200px;
        }

        .nd-top-main {
            display: flex;
            flex-wrap: nowrap;
            width: 900px;
            margin: 0px auto;
            font-family: "SC-Bold";
            color: #ffffff;
        }

        .nd-tm-right {
            width: 200px;
            margin-left: 5px;
            height: 120px;
            margin-top: 10px;
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-menu-header1 {
            border-top: 2px solid #ffffff;
            font-size: 1px;
            line-height: 30px;
            width: 50px;
            color: #bfbfbf;;
        }

        .nd-menu-header2 {
            border-top: 2px solid #ffffff;
            font-size: 1px;
            margin-left: 10px;
            line-height: 30px;
            width: 60px;
            color: #bfbfbf;
        }

        .nd-menu-header3 {
            border-top: 2px solid #f5f5f5;
            font-size: 1px;
            margin-left: 10px;
            line-height: 30px;
            width: 60px;
            color: #bfbfbf;
        }

        .nd-left-title {
            width: 100%;
            height: 80px;
            background: #252022;
        }

        .nd-zx-title {
            color: white;
            text-align: left;
            font-size: 10px;
            line-height: 35px;
            margin-left: 15px;
            width: 80px;
            height: 29px;
        }

        .nd-news1 {
            color: white;
            text-align: left;
            width: 20px;
            margin-left: 15px;
        }

        .nd-more {
          margin-top: 50px;
        }


        .time-style {
            color: white;
            font-size: 1px;
            margin-top: 8px;
            text-align: left;
            margin-left: 8px;
        }

        .nd-zb-bottom1 {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            height: 40px;
            background: #2520228a;
        }

        .nd-right-title1 {
            height: 16px;
            width: 100%;
            margin-top: 22px;
            position: relative;
        }

        .nd-news-list {
            color: white;
            font-size: 1px;
            text-align: left;
            position: absolute;
            margin-top: -10px;
            margin-left: 13px;
        }

        .nd-news {
            width: calc(100% - 10px);
            height: 60px;
            border: 2px solid #ffffff;
            position: relative;
            margin-left: 10px;
        }

        .news-list {
            margin-top: 3px;
            margin-left: 5px;
            position: absolute;
        }

        .news-text {
            color: white;
            margin-top: 1px;
            text-align: left;
        }

        .nd-introduction {
            background: #181617;
            height: 70px;
            width: 100%;
            min-width: 357px;
            position: relative;
        }

        .nd-in-style {
            position: absolute;
            margin-top: 20px;
            margin-left: 20px;
        }

        .nd-introduction-style {
            color: white;
            font-size: 20px;
        }

        .in-style {
            color: #ffffff;
            font-size: 3px;
            margin-top: 7px;
        }

        .in-more {
            position: absolute;
            padding-top: 33px;
            margin-left: 280px;
        }

        .nd-more1 {
            position: relative;
            color: white;
            text-align-last: left;
        }

        .nd-logo1 {
            position: absolute;
            width: 30px;
            margin-left: 10px;
            height: 10px;
        }

        .nd-menu-header41 {
            border-top: 1px solid #ffffff;
            width: 70px;
            margin-top: 8px;
        }

        .nd-tm-left, .nd-tm-right {
            width: 17%;
            text-align: left;
        }

        .nd-logo {
            width: 120px;
            height: 60px;
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

        .nd-zx-bg {
            background: url("../../assets/img/background/zx.png");
            background-size: 100% 100%;
            height: 112px;
            width: 100%;
            position: relative;
        }

        .nd-news-bg {
            background: url("../../assets/img/background/news.png");
            background-size: 100% 100%;
            height: 47px;
            width: calc(100% - 10px);
            margin-left: 10px;
        }

        .nd-fl {
            background: #252022;
            height: 116px;
            width: 100%;
        }

        .pics6 {
            margin-top: 7px;
            display: flex;
            flex-wrap: nowrap;
            margin-left: 10px;
        }

        .nd-logo2 {
            margin-left: 20px;
            width: 65px;
            height: 88px;
            margin-top: 10px;
        }

        .pics6_status4 {
            display: flex;
            flex-wrap: nowrap;
            position: relative;
        }

        .nd-sate {
            position: absolute;
            margin-left: 25px;
            margin-top: 72px;
        }

        .nd-sate1 {
            font-size: 10px;
            color: #e6e6e6;
        }

        .nd-sate2 {
            margin-top: 2px;
            font-size: 1px;
            color: #e6e6e6;
            text-align: left;
        }

    }
</style>