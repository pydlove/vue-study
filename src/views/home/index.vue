<template>
    <!--eslint-disable-->
    <div class="nd-container" :style="scaleFun">
        <div class="nd-top">
            <div class="nd-top-main">
                <div class="nd-tm-left">
                    <van-image class="nd-logo" :src="require('@/assets/img/logo/logo@2x.png')"/>
                    <div class="nd-title">
                        <div> {{ $t('message.SolarData') }}</div>
                    </div>
                </div>

                <Header :currentMenu="'index'"  @initLanguage="initLanguage"></Header>
            </div>
            <!--资讯-->
            <div class="nd-zx-box">
                <div class="nd-zx-main">
                    <div class="nd-left">
                        <div class="nd-left-title">
                            <div class="nd-result">
                                <div> {{ $t('message.results') }}</div>
                               <!-- <div>Results</div>-->
                            </div>
                            <div class="nd-result-more cursor">
                                <div class="dffn-ac">
                                    <div class="mr-20 " @click="toPictureAndVideo(0)">
                                        {{ $t('message.more') }}
                                    </div>
                                    <div class="nd-more-arrow">
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                                <div class="nd-line"></div>
                            </div>
                        </div>

                        <div class="nd-zx-bg">
                            <el-carousel >
                                <el-carousel-item v-for="(item,index) in pictureData" v-if="index < 6" :key="index">
                                    <viewer>
                                        <el-image
                                                class="nd-picture"
                                                :src="item.picture"
                                                fit="contain"></el-image>
                                    </viewer>
                                    <div class="nd-zb-bottom1">
                                        <div class="nd-time">
                                            <div v-if="language == 'zh'" class="time-style">{{item.title}}</div>
                                            <div v-else-if="language == 'en'" class="time-style">{{item.enTitle}}</div>
                                            <!--<div class="time-style">{{item.createTime == null ? item.createTime:item.createTime.substring(0, 10)}}</div>-->
                                        </div>
                                    </div>
                                </el-carousel-item>
                            </el-carousel>

                        </div>

                    </div>

                    <div class="nd-right">
                        <div class="nd-right-title1">
                            <div class="nd-news-list">
                                {{ $t('message.news') }}
                            </div>
                            <div class="nd-new-more cursor">
                                <div class="dffn-ac">
                                    <div class="mr-20" @click="toMessage()">
                                        {{ $t('message.more') }}
                                    </div>
                                    <div class="nd-more-arrow">
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                                <div class="nd-line"></div>
                            </div>
                        </div>
                        <div class="nd-news">
                            <div class="news-list cursor" v-for="(item, index) in tableData" :key="index">
                                <div v-if="language == 'zh'" class="news-text"   @click="toDetail(item)">
                                    {{ index + 1}}. {{ item.title.length > 27 ? (item.title.substring(0, 27) + "..."):item.title }}
                                </div>
                                <div v-else-if="language == 'en'" class="news-text"  @click="toDetail(item)">
                                    {{ index + 1}}. {{ item.enTitle | ellipsis }}
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
        <!--<div class="nd-introduction">-->
            <!--<div class="nd-in-style">-->
                <!--<div class="nd-introduction-title">-->
                    <!--<div>{{ $t('message.introduction') }}</div>-->
                  <!--&lt;!&ndash;  <div>Introduction</div>&ndash;&gt;-->
                <!--</div>-->
                <!--<div class="nd-result-more">-->
                    <!--<div class="dffn-ac">-->
                        <!--<div class="mr-20 cursor" @click="toObservationDevice(0)">-->
                            <!--{{ $t('message.more') }}-->
                        <!--</div>-->
                        <!--<div class="nd-more-arrow">-->
                            <!--<div></div>-->
                            <!--<div></div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="nd-line"></div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!--<div class="nd-fl">-->
            <!--<div class="pics6">-->
                <!--<div>-->
                    <!--<ul class="pics6_status4 cursor" @click="jumpWeb(1, 'equipment')">-->
                        <!--<li>-->
                            <!--<van-image class="nd-logo2" :src="require('@/assets/img/logo/卫星.png')"/>-->
                        <!--</li>-->
                        <!--<div class="nd-sate" >-->
                            <!--<div class="nd-sate1">{{ $t('message.satellit') }}</div>-->
                        <!--</div>-->
                    <!--</ul>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<ul class="pics6_status5 cursor" @click="jumpWeb(2, 'equipment')">-->
                        <!--<li>-->
                            <!--<van-image class="nd-logo2" :src="require('@/assets/img/logo/望远镜.png')"/>-->
                        <!--</li>-->
                        <!--<div class="nd-sate">-->
                            <!--<div class="nd-sate1">{{ $t('message.telescope') }}</div>-->
                        <!--</div>-->
                    <!--</ul>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<ul class="pics6_status6 cursor" @click="jumpWeb(3, 'equipment')">-->
                        <!--<li>-->
                            <!--<van-image class="nd-logo2" :src="require('@/assets/img/logo/仪器.png')"/>-->
                        <!--</li>-->
                        <!--<div class="nd-sate">-->
                            <!--<div class="nd-sate1">{{ $t('message.instrument') }}</div>-->
                        <!--</div>-->
                    <!--</ul>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<ul class="pics6_status7 cursor" @click="jumpWeb(4, 'data')">-->
                        <!--<li>-->
                            <!--<van-image class="nd-logo2" :src="require('@/assets/img/logo/站点.png')"/>-->
                        <!--</li>-->
                        <!--<div class="nd-sate">-->
                            <!--<div class="nd-sate1">{{ $t('message.site') }}</div>-->
                        <!--</div>-->
                    <!--</ul>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <Footer></Footer>
    </div>

</template>
<!--eslint-disable-->
<script>
    import Footer from "@/components/Footer.vue";
    import Header from "@/components/Header";

    export default {
        name: "index",
        components: {
            Header, Footer
        },

        data() {
            return {
                pictureData: [],
                scale: 0.5,
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                title: "",
                language: "zh",
                clientHeight: document.body.clientHeight,
                name: this.$t('message.Links'),
            }
        },

        filters: {
            ellipsis(value) {
                if (!value) return '';
                if (value.length > 30) {
                    return value.slice(0, 30) + '...'
                }
                return value
            }
        },

        mounted() {
            this.initLanguage();
            this.initNewsData();
            this.initBannerPicture();
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale ;
            },

            toObservationDevice(index) {
                this.$utils.setStorage("observationDataIndex", index);
                let routeData = this.$router.resolve({
                    path: "/observeDevice",
                });
                window.open(routeData.href, '_blank');
            },

            toPictureAndVideo(index) {
                this.$utils.setStorage("imageIndex", index);
                let routeData = this.$router.resolve({
                    path: "/pictureAndAchievement",
                });
                window.open(routeData.href, '_blank');
            },

            jumpWeb(index, page){
                if(page == "data"){
                    //站点
                    this.$utils.setStorage("siteIndex", index);
                    let routeData = this.$router.resolve({
                        path: "/site",
                    });
                    window.open(routeData.href, '_blank');
                }

                if(page == "equipment"){
                    //不跳转 仪器
                    this.$utils.setStorage("observeDeviceIndex", index);
                    let routeData = this.$router.resolve({
                        path: "/observeDevice"
                    });
                    window.open(routeData.href, '_blank');
                }
            },

            toDetail(item) {
                // this.$utils.setStorage("newsDetail", item);
                // let routeData = this.$router.resolve({
                //     path: "/newsDetail",
                // });
                // window.open(routeData.href, '_blank');
                this.$router.push({
                    path: "/newsDetail",
                    query: {
                        id: item.id,
                    },

                });
            },

            toMessage() {
                this.$router.push({
                    path: "/newsAndResource",

                });
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

            async initBannerPicture() {
                //查询精美图片
                let param = new FormData();
                param.append("page", this.currentPage);
                param.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_nd_gallery_achievement_searchList, param, "POST");
                if (data.code == 200) {
                    this.pictureData = data.data;
                    console.log(this.pictureData);
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

<style>
    .el-carousel__indicators {
        position: absolute;
        list-style: none;
        margin: 0;
        padding: 0;
        z-index: 2;
        width: 300px;
    }
</style>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {

     .nd-picture{
         border-style: none;
         width: 410px;
         height: 306px;
         margin-left: 6px;
         text-align: center;
     }

        .nd-logo2 {
            margin-left: 20px;
            height: 280px;
            width: 210px;
            margin-top: 20px;
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
        .pics6_status5 {
            display: flex;
            flex-wrap: nowrap;
            position: relative;
        }
        .pics6_status6 {
            display: flex;
            flex-wrap: nowrap;
            position: relative;
        }
        .pics6_status7 {
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
            font-family: SC-Bold;
            text-align: left;
        }

        .nd-sate2 {
            margin-top: 10px;
            font-size: 15px;
            color: #e6e6e6;
            text-align: left;
            font-family: SC-Light;
        }

        img {
            border-style: none;
            width: 210px;
            height: 306px;
            margin-left: 20px;
            text-align: center;
        }

        .nd-more1 {
            position: relative;
            font-size: 1px;
            color: white;
            text-align: right;
            margin-right: 70px;
        }

        .nd-new-more {
            position: absolute;
            right: 0px;
            top: 6px;
            color: #ffff;
        }
        .nd-new-more > div:nth-of-type(1) {
            line-height: 36px;
        }

        .news-list {
        }

        .news-text {
            color: #ffffff;
            font-size: 10px;
            margin-top: 10px;
            text-align: left;
            font-family: SC-Light;
        }

        .news-text:hover {
            text-decoration: underline;
            color: #fa541c;
        }

        .nd-time {
            margin-top: 18px;
            /*margin-left: 10px;*/
            text-align: center;
        }

        .time-style {
            color: white;
            font-size: 10px;
            margin-top: 10px;
            text-align: center;
            font-size: 16px;
            /*margin-left: 20px;*/
        }

        .nd-in-style {
            width: 900px;
            height: 114px;
            margin: 0px auto;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            position: relative;
            color: #ffffff;
        }

        .nd-introduction-title {
            font-family: SC-Bold;
            text-align: left;
        }
        .nd-introduction-title >div:nth-of-type(1) {
            font-size: 26px;
            margin-left: 20px;
            line-height: 40px;
        }
        .nd-introduction-title >div:nth-of-type(2) {
            font-size: 10px;
            line-height: 20px;
            height: 20px;
            font-family: SC-Light;
            margin-left: 23px;
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
            /*height: 55px;*/
            /*width: 180px;*/
            height: 55px;
            width: 280px;
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
            height: 440px;
            width: 100%;
            min-width: 1200px;
        }

        .nd-left, .nd-right {
            width: 50%;
        }

        .nd-left-title {
            height: 120px;
            background: #252022;
            font-family: SC-Bold;
            text-align: left;
            color: #ffffff;
            padding-left: 20px;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            position: relative;
        }
        .nd-result {
            min-width: 100px;
        }
        .nd-result > div:nth-of-type(1) {
            font-size: 24px;
            line-height: 40px;
            height: 40px;
            letter-spacing: 2px;
        }
        .nd-result > div:nth-of-type(2) {
            font-size: 10px;
            line-height: 20px;
            height: 20px;
            font-family: SC-Light;
            margin-left: 3px;
        }

        .nd-result-more:hover {
            color: #fa541c;
        }
        .nd-result-more {
            position: absolute;
            right: 20px;
            top: 50px;
            font-family: SC-Light;
        }
        .nd-result-more > div:nth-of-type(1) {
            line-height: 36px;
        }
        .nd-right-title1 {
            height: 80px;
            width: 100%;
            margin-top: 40px;
            position: relative;
        }
        .nd-more-arrow {
            width: 30px;
            position: relative;
        }
        .nd-more-arrow > div:nth-of-type(1) {
            width: 30px;
            border-top: 1px solid #ffffff;
        }
        .nd-more-arrow > div:nth-of-type(2) {
            width: 5px;
            border-top: 1px solid #ffffff;
            transform: rotate(
                    25deg
            );
            position: absolute;
            top: -2px;
            right: 0px;
        }

        .nd-line {
            border-top: 1px solid #ffffff;
        }

        .nd-news-list {
            color: white;
            font-size: 15px;
            text-align: left;
            position: absolute;
            margin-top: 40px;
            margin-left: 30px;
            font-family: SC-Bold;
            letter-spacing: 1px;
        }

        .nd-zx-bg {
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
            z-index: 3000;
        }

        .nd-news {
            width: calc(100% - 30px);
            height: 139px;
            border: 2px solid #ffffff;
            margin: 30px;
            padding: 20px;
        }

        .nd-news-bg {
            background: url("../../assets/img/background/new2.png");
            background-size: 100% 100%;
            height: 200px;
            width: calc(100% - 30px);
            margin-left: 30px;
        }

        .nd-introduction {
            background: #181617;
            height: 114px;
            width: 100%;
            min-width: 1200px;
            position: relative;
            font-family: SC-Bold;
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
    /*@media screen and (max-width: 768px) {*/
    /*.nd-top {*/
    /*background: url("../../assets/img/background/banner@3x.png");*/
    /*background-size: 100% 100%;*/
    /*height: 100%;*/
    /*width: 100%;*/
    /*position: relative;*/
    /*}*/

    /*.nd-title {*/
    /*margin-top: 10px;*/
    /*margin-left: 10px;*/
    /*width: 200px;*/
    /*}*/

    /*.nd-top-main {*/
    /*display: flex;*/
    /*flex-wrap: nowrap;*/
    /*width: 900px;*/
    /*margin: 0px auto;*/
    /*font-family: "SC-Bold";*/
    /*color: #ffffff;*/
    /*}*/

    /*.nd-left-title {*/
    /*width: 100%;*/
    /*height: 80px;*/
    /*background: #252022;*/
    /*}*/

    /*.nd-more {*/
    /*margin-top: 50px;*/
    /*}*/


    /*.time-style {*/
    /*color: white;*/
    /*font-size: 1px;*/
    /*margin-top: 8px;*/
    /*text-align: left;*/
    /*margin-left: 8px;*/
    /*}*/

    /*.nd-zb-bottom1 {*/
    /*position: absolute;*/
    /*bottom: 0px;*/
    /*left: 0px;*/
    /*width: 100%;*/
    /*height: 40px;*/
    /*background: #2520228a;*/
    /*}*/

    /*.nd-right-title1 {*/
    /*height: 16px;*/
    /*width: 100%;*/
    /*margin-top: 22px;*/
    /*position: relative;*/
    /*}*/

    /*.nd-news-list {*/
    /*color: white;*/
    /*font-size: 1px;*/
    /*text-align: left;*/
    /*position: absolute;*/
    /*margin-top: -10px;*/
    /*margin-left: 13px;*/
    /*}*/

    /*.nd-news {*/
    /*width: calc(100% - 10px);*/
    /*height: 60px;*/
    /*border: 2px solid #ffffff;*/
    /*position: relative;*/
    /*margin-left: 10px;*/
    /*}*/

    /*.news-list {*/
    /*}*/

    /*.news-text {*/
    /*color: white;*/
    /*margin-top: 1px;*/
    /*text-align: left;*/
    /*}*/

    /*.nd-introduction {*/
    /*background: #181617;*/
    /*height: 70px;*/
    /*width: 100%;*/
    /*min-width: 357px;*/
    /*position: relative;*/
    /*}*/

    /*.nd-in-style {*/
    /*position: absolute;*/
    /*margin-top: 20px;*/
    /*margin-left: 20px;*/
    /*}*/

    /*.nd-introduction-style {*/
    /*color: white;*/
    /*font-size: 20px;*/
    /*}*/

    /*.in-style {*/
    /*color: #ffffff;*/
    /*font-size: 3px;*/
    /*margin-top: 7px;*/
    /*}*/

    /*.in-more {*/
    /*position: absolute;*/
    /*padding-top: 33px;*/
    /*margin-left: 280px;*/
    /*}*/

    /*.nd-more1 {*/
    /*position: relative;*/
    /*color: white;*/
    /*text-align-last: left;*/
    /*}*/

    /*.nd-logo1 {*/
    /*position: absolute;*/
    /*width: 30px;*/
    /*margin-left: 10px;*/
    /*height: 10px;*/
    /*}*/

    /*.nd-menu-header41 {*/
    /*border-top: 1px solid #ffffff;*/
    /*width: 70px;*/
    /*margin-top: 8px;*/
    /*}*/

    /*.nd-tm-left, .nd-tm-right {*/
    /*width: 17%;*/
    /*text-align: left;*/
    /*}*/

    /*.nd-logo {*/
    /*width: 120px;*/
    /*height: 60px;*/
    /*}*/
    /*.nd-zx-box {*/
    /*width: 100%;*/
    /*height: 180px;*/
    /*position: absolute;*/
    /*top: 130px;*/
    /*left: 0px;*/
    /*}*/

    /*.nd-zx-main {*/
    /*width: 340px;*/
    /*height: 100%;*/
    /*margin: 0px auto;*/
    /*display: flex;*/
    /*flex-wrap: nowrap;*/
    /*}*/

    /*.nd-next1 {*/
    /*background: #181617;*/
    /*height: 30px;*/
    /*width: 100%;*/
    /*}*/

    /*.nd-next2 {*/
    /*background: #252022;*/
    /*height: 130px;*/
    /*width: 100%;*/
    /*}*/

    /*.nd-left, .nd-right {*/
    /*width: 50%;*/
    /*}*/

    /*.nd-left-title {*/
    /*width: 100%;*/
    /*height: 50px;*/
    /*background: #252022;*/
    /*}*/

    /*.nd-zx-bg {*/
    /*background: url("../../assets/img/background/zx.png");*/
    /*background-size: 100% 100%;*/
    /*height: 112px;*/
    /*width: 100%;*/
    /*position: relative;*/
    /*}*/

    /*.nd-news-bg {*/
    /*background: url("../../assets/img/background/news.png");*/
    /*background-size: 100% 100%;*/
    /*height: 47px;*/
    /*width: calc(100% - 10px);*/
    /*margin-left: 10px;*/
    /*}*/

    /*.nd-fl {*/
    /*background: #252022;*/
    /*height: 116px;*/
    /*width: 100%;*/
    /*}*/

    /*.pics6 {*/
    /*margin-top: 7px;*/
    /*display: flex;*/
    /*flex-wrap: nowrap;*/
    /*margin-left: 10px;*/
    /*}*/

    /*.nd-logo2 {*/
    /*margin-left: 20px;*/
    /*width: 65px;*/
    /*height: 88px;*/
    /*margin-top: 10px;*/
    /*}*/

    /*.pics6_status4 {*/
    /*display: flex;*/
    /*flex-wrap: nowrap;*/
    /*position: relative;*/
    /*}*/

    /*.nd-sate {*/
    /*position: absolute;*/
    /*margin-left: 25px;*/
    /*margin-top: 72px;*/
    /*}*/

    /*.nd-sate1 {*/
    /*font-size: 10px;*/
    /*color: #e6e6e6;*/
    /*}*/

    /*.nd-sate2 {*/
    /*margin-top: 2px;*/
    /*font-size: 1px;*/
    /*color: #e6e6e6;*/
    /*text-align: left;*/
    /*}*/

    /*}*/
</style>