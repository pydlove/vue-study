<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <NormalHeader :currentMenu="'observationData'" @initLanguage="initLanguage"></NormalHeader>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
            <el-breadcrumb-item :to="{ path: '/home' }">
                <i class="el-icon-s-home"></i>
                {{ $t('menu.home') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ $t('menu.site') }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="aiocloud-card">
            <div class="friendlyTitle">
                <div class="firstConnect">
                    <div class="nd-picture1"></div>
                    <div class="connectStyle" @click="jumpWeb1">{{ $t('message.VirtualSolarObservatory') }}</div>
                </div>
                <div class="SecondConnect">
                    <div class="nd-picture2"></div>
                    <div class="connectStyle" @click="jumpWeb2">{{ $t('message.JointScienceOperationsCenter') }}</div>
                </div>
                <div class="ThreeConnect">
                    <div class="nd-picture3"></div>
                    <div class="connectStyle" @click="jumpWeb3">{{ $t('message.SolarDynamicsObservatory') }}</div>
                </div>
                <div class="ThreeConnect">
                    <div class="nd-picture4"></div>
                    <div class="connectStyle" @click="jumpWeb4">{{ $t('message.FuxianSolarObservatory') }}</div>
                </div>
                <div class="ThreeConnect">
                    <div class="nd-picture5"></div>
                    <div class="connectStyle" @click="jumpWeb5">{{ $t('message.BigBearSolarObservatory') }}</div>
                </div>
                <div class="ThreeConnect">
                    <div class="nd-picture6"></div>
                    <div class="connectStyle" @click="jumpWeb6">{{ $t('message.HinodeEIS') }}</div>
                </div>
                <div class="ThreeConnect">
                    <div class="nd-picture7"></div>
                    <div class="connectStyle" @click="jumpWeb7">{{ $t('message.InterfaceRegionImagingSpectrograph') }}</div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<!--eslint-disable-->
<script>
    import NormalHeader from "@/components/NormalHeader";
    import Footer from "@/components/Footer";

    export default {
        name: "index",
        components: {NormalHeader, Footer},
        mounted() {
            this.initLanguage();
            if (this.clientWidth < 500) {
                this.client = true;
            }
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
            },

            jumpWeb1() {
                window.open("https://sdac.virtualsolar.org/cgi/search")
            },
            jumpWeb2() {
                window.open("http://jsoc.stanford.edu/")
            },
            jumpWeb3() {
                window.open("https://sdo.gsfc.nasa.gov/")
            },
            jumpWeb4() {
                window.open("http://fso.ynao.ac.cn")
            },
            jumpWeb5() {
                window.open("http://www.bbso.njit.edu")
            },
            jumpWeb6() {
                window.open("http://solarb.mssl.ucl.ac.uk/SolarB")
            },
            jumpWeb7() {
                window.open("https://iris.gsfc.nasa.gov/")
            },

        },

        data() {
            return {
                title: "",
                client: false,
                status: true,
                status1: false,
                tableData: [],
                currentPage: 1,
                language: "zh",
            }
        }

    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {

        .nd-picture1{
            background: url("../../assets/img/background/picture1.png");
            width: 170px;
            height: 170px;
            background-size: 100% 100%;
        }

        .nd-picture2{
            background: url("../../assets/img/background/picture2.png");
            width: 220px;
            height: 170px;
            background-size: 100% 100%;
        }

        .nd-picture3{
            background: url("../../assets/img/background/picture3.png");
            background-size: 100% 100%;
            width: 200px;
            height: 200px;
        }
        .nd-picture4{
            background: url("../../assets/img/background/picture4.png");
            width: 500px;
            height: 170px;
            background-size: 100% 100%;
        }

        .nd-picture5{
            background: url("../../assets/img/background/picture5.png");
            width: 500px;
            height: 170px;
            background-size: 100% 100%;
        }

        .nd-picture6{
            background: url("../../assets/img/background/picture6.png");
            width: 500px;
            height: 170px;
            background-size: 100% 100%;
        }

        .nd-picture7{
            background: url("../../assets/img/background/picture7.png");
            width: 250px;
            height: 250px;
            background-size: 100% 100%;
        }


        .friendlyTitle {
            background: #f0f0f0;
            text-align: left;
        }

        .connectName {
            font-size: 15px;
            color: #fa541c;
        }

        .firstConnect {
            font-size: 16px;
            line-height: 68px;
            margin-left: 10px;
            display: flex;
            flex-wrap: nowrap;

        }

        .connectStyle {
            margin-left: 81px;
            font-size: 27px;
            line-height: 183px;
        }

        .connectStyle:hover {
            color: #fa541c;
            margin-left: 81px;
            font-size: 27px;
            line-height: 183px;
        }

        .SecondConnect {
            font-size: 16px;
            line-height: 50px;
            margin-left: 10px;
            display: flex;
            flex-wrap: nowrap;
        }

        .ThreeConnect {
            font-size: 16px;
            line-height: 62px;
            margin-left: 10px;
            display: flex;
            flex-wrap: nowrap;
        }

        .ForeConnect {
            font-size: 16px;
            line-height: 50px;
            margin-left: 10px;
            display: flex;
            flex-wrap: nowrap;
            margin-bottom: 20px;
        }

        img {
            border-style: none;
            width: 210px;
            height: 306px;
            margin-left: 20px;
            text-align: center;
        }

        .nd-title div:nth-of-type(1) {
            font-size: 32px;
        }

        .nd-title div:nth-of-type(2) {
            font-size: 18px;
            margin-top: 10px;
        }

        .nd-list-title > p:nth-of-type(1) {
            line-height: 45px;
            font-size: 16px;
            color: #333333;
            text-align: left;
        }


        .nd-list-title > p:nth-of-type(1):hover{
            color: #fa541c;
        }
        .nd-list-title > p:nth-of-type(2) {
            line-height: 24px;
            font-size: 14px;
            color: #888888;
            justify-content: flex-start;
        }

    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {

        .nd-card {
            width: 375px;
            background: white;
            background: #f0f0f0;
        }

        .nd-list-top {
            width: 900px;
            margin: 0 auto;
        }

        .nd-news-list {
            position: relative;
            width: 100%;
        }

        .myCard {
            width: 100%;
        }

        .nd-list {
            margin-top: 10px;
            position: relative;
            margin-left: 10px;
            margin-right: 10px;
            height: 100px;
        }

        .nd-lists {
            position: absolute;
        }

        .nd-picture {
            width: 80px;
            height: 60px;
        }

        .nd-list-title {
            margin-left: 20px;
        }

        .pagination {
            margin-top: 20px;
            text-align: right;
        }
    }
</style>