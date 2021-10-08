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
        <div class="si-main">
            <div class=" aiocloud-card friendlyTitle">
                <div class="ThreeConnect dffn-ac">
                    <el-avatar :src="require('../../assets/img/background/picture1.png')"></el-avatar>
                    <div class="connectStyle" @click="jumpWeb1">{{ $t('message.VirtualSolarObservatory') }}</div>
                </div>

                <div class="ThreeConnect dffn-ac">
                    <el-avatar :src="require('../../assets/img/background/picture2.png')"></el-avatar>
                    <div class="connectStyle" @click="jumpWeb2">{{ $t('message.JointScienceOperationsCenter') }}</div>
                </div>
                <div class="ThreeConnect dffn-ac">
                    <div>
                        <el-avatar :src="require('../../assets/img/background/picture3.png')"></el-avatar>
                    </div>
                    <div class="connectStyle" @click="jumpWeb3">{{ $t('message.SolarDynamicsObservatory') }}</div>
                </div>
                <div class="ThreeConnect dffn-ac">
                    <div>
                        <el-avatar :src="require('../../assets/img/background/picture4.png')"></el-avatar>
                    </div>
                    <div class="connectStyle" @click="jumpWeb4">{{ $t('message.FuxianSolarObservatory') }}</div>
                </div>
                <div class="ThreeConnect dffn-ac">
                    <div>
                        <el-avatar :src="require('../../assets/img/background/picture5.png')"></el-avatar>
                    </div>
                    <div class="connectStyle" @click="jumpWeb5">{{ $t('message.BigBearSolarObservatory') }}</div>
                </div>
                <div class="ThreeConnect dffn-ac">
                    <div>
                        <el-avatar :src="require('../../assets/img/background/picture6.png')"></el-avatar>
                    </div>
                    <div class="connectStyle" @click="jumpWeb6">{{ $t('message.HinodeEIS') }}</div>
                </div>
                <div class="ThreeConnect dffn-ac">
                    <div>
                        <el-avatar :src="require('../../assets/img/background/picture7.png')"></el-avatar>
                    </div>
                    <div class="connectStyle" @click="jumpWeb7">{{ $t('message.InterfaceRegionImagingSpectrograph') }}
                    </div>
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
        .si-main {
            background: #eeeeee;
            padding-top: 20px;
            padding-bottom: 20px;
        }

        .friendlyTitle {
            text-align: left;
            width: 900px;
            margin: 0 auto;
        }

        .nd-breadcrumb-top{
            width: 900px;
        }

        .connectStyle {
            margin-left: 10px;
            font-size: 16px;
            line-height: 40px;
        }

        .connectStyle:hover {
            color: #fa541c;
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

        .nd-list-title > p:nth-of-type(1):hover {
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