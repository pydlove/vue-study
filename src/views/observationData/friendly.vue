<!--<template>-->
    <!--&lt;!&ndash;eslint-disable&ndash;&gt;-->
    <!--<div class="friendlyTitle">-->
            <!--<div class="firstConnect">-->
                <!--<div class="connectName">中国科学院国家天文台明安图观测基地：</div>-->
                <!--<div class="connectStyle" @click="jumpWeb1">http://mos.bao.ac.cn</div>-->
            <!--</div>-->
            <!--<div class="SecondConnect">-->
                <!--<div class="connectName">中国虚拟天文台明安图观测基地：</div>-->
                <!--<div class="connectStyle" @click="jumpWeb2">https://nadc.china-vo.org/s/static/mingantu/muser.html</div>-->
            <!--</div>-->
            <!--<div class="ThreeConnect">-->
                <!--<div class="connectName">中国科学院国家天文台怀柔观测基地：</div>-->
                <!--<div class="connectStyle" @click="jumpWeb3">https://sun10.bao.ac.cn</div>-->
            <!--</div>-->
            <!--<div class="ThreeConnect">-->
                <!--<div class="connectName">先进天基太阳天文台：</div>-->
                <!--<div class="connectStyle" @click="jumpWeb4">http://aso-s.pmo.ac.cn</div>-->
            <!--</div>-->
        <!--<div class="ThreeConnect">-->
            <!--<div class="connectName">国家空间天气监测预警中心-NSMC：</div>-->
            <!--<div class="connectStyle" @click="jumpWeb5">http://www.nsmc.org.cn/nsmc/channels/spaceweather.html</div>-->
        <!--</div>-->

    <!--</div>-->
<!--</template>-->
<!--&lt;!&ndash;eslint-disable&ndash;&gt;-->
<!--<script>-->
    <!--export default {-->
        <!--name: "friendly",-->
        <!--methods: {-->
            <!--jumpWeb1() {-->
                <!--window.open("http://mos.bao.ac.cn")-->
            <!--},-->
            <!--jumpWeb2() {-->
                <!--window.open("https://nadc.china-vo.org/s/static/mingantu/muser.html")-->
            <!--},-->
            <!--jumpWeb3() {-->
                <!--window.open("https://sun10.bao.ac.cn")-->
            <!--},-->
            <!--jumpWeb4() {-->
                <!--window.open("http://aso-s.pmo.ac.cn")-->
            <!--},-->
            <!--jumpWeb5() {-->
                <!--window.open("http://www.nsmc.org.cn/nsmc/channels/spaceweather.html")-->
            <!--},-->

        <!--},-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->

    <!--/*媒体查询（电脑）*/-->
    <!--@media screen and (min-width: 768px) {-->

        <!--.friendlyTitle {-->
            <!--background: white;-->
            <!--text-align: left;-->
        <!--}-->

        <!--.connectName {-->
            <!--font-size: 15px;-->
            <!--color: #fa541c;-->
        <!--}-->

        <!--.firstConnect {-->
            <!--font-size: 16px;-->
            <!--line-height: 68px;-->
            <!--margin-left: 10px;-->
            <!--display: flex;-->
            <!--flex-wrap: nowrap;-->
        <!--}-->

        <!--.connectStyle {-->
            <!--margin-left: 10px;-->
            <!--font-size: 16px;-->
        <!--}-->

        <!--.connectStyle:hover {-->
            <!--color: #fa541c;-->
            <!--font-size: 16px;-->
            <!--margin-left: 10px;-->
        <!--}-->

        <!--.SecondConnect {-->
            <!--font-size: 16px;-->
            <!--line-height: 50px;-->
            <!--margin-left: 10px;-->
            <!--display: flex;-->
            <!--flex-wrap: nowrap;-->
        <!--}-->

        <!--.ThreeConnect {-->
            <!--font-size: 16px;-->
            <!--line-height: 62px;-->
            <!--margin-left: 10px;-->
            <!--display: flex;-->
            <!--flex-wrap: nowrap;-->
        <!--}-->

        <!--.ForeConnect {-->
            <!--font-size: 16px;-->
            <!--line-height: 50px;-->
            <!--margin-left: 10px;-->
            <!--display: flex;-->
            <!--flex-wrap: nowrap;-->
            <!--margin-bottom: 20px;-->
        <!--}-->

    <!--}-->

<!--</style>-->



<template>
    <!--eslint-disable-->
    <div class="nd-container">
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
    </div>
</template>
<!--eslint-disable-->
<script>

    export default {
        name: "index",
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