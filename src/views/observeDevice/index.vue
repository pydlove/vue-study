<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <NormalHeader :currentMenu="'observeDevice'" @initLanguage="initLanguage"></NormalHeader>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
            <el-breadcrumb-item :to="{ path: '/home' }">
                <i class="el-icon-s-home"></i>
                {{ $t('menu.home') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ $t('menu.observationEquipment') }}
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="nd-background">
            <div class="nd-content dffn">
                <div class="aiocloud-card">
                    <div :class="(type==item.type?'nd-eq-active':'') + ' nd-eq-item'"
                         v-for="(item, index) in equipments" :key="index"
                         @click="selectEq(item)"
                    >{{ item.name }}
                    </div>
                </div>
                <div >
                    <Chase v-if="type == 1"></Chase>
                    <OnSet v-if="type == 2"></OnSet>
                    <WeHot v-if="type == 3"></WeHot>
                    <Friendly v-if="type == 0"></Friendly>
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
    import Friendly from "@/views/observationData/friendly.vue";
    import Chase from "@/views/observeDevice/chase.vue";
    import OnSet from "@/views/observeDevice/onSet.vue";
    import WeHot from "@/views/observeDevice/weHot.vue";

    export default {
        name: "index",
        components: {NormalHeader, Footer, Friendly, Chase, OnSet, WeHot},
        mounted() {
            this.initLanguage();
            const observeDeviceIndex = this.$utils.getStorage("observeDeviceIndex");
            if (observeDeviceIndex != undefined) {
                this.type = observeDeviceIndex;
                console.log(this.type)
            }
        },

        methods: {
            initLanguage() {
                this.equipments[0].name = this.$t('message.CHASESatellite');
                this.equipments[1].name = this.$t('message.OnsetSatellite');
                this.equipments[2].name = this.$t('message.WEHOTSatellite');
                this.equipments[3].name = this.$t('message.Links');
                this.language = this.$i18n.locale;
            },

            selectEq(item) {
                this.type = item.type;
                this.equipment = item;
                this.$utils.setStorage("observeDevicesIndex", this.type);
            },
        },
        data() {
            return {
                checkType: true,
                language: "zh",
                equipment: {
                    name: this.$t('message.CHASESatellite'),
                    type: "0",
                },
                equipments: [
                    {
                        name: this.$t('message.CHASESatellite'),
                        type: "1",
                    },
                    {
                        name: this.$t('message.OnsetSatellite'),
                        type: "2",
                    },
                    {
                        name: this.$t('message.WEHOTSatellite'),
                        type: "3",
                    },
                    {
                        name: this.$t('message.Links'),
                        type: "0",
                    }
                ],
                type: "1",
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                clientWidth: document.body.clientWidth,
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {
        .nd-eq-active {
            color: #fa541c !important;
        }
        .nd-eq-item {
            line-height: 40px;
            font-family: SC-Bold;
            font-size: 16px;
            color: #333333;
        }

        .nd-eq-item:hover {
            color: #fa541c;
        }

        .nd-obd-item {
            width: calc(50% - 5px);
            margin-bottom: 10px;
        }

        .nd-content >div:nth-of-type(1) {
            width: 200px;
            min-width: 200px;
            height: 300px;
            margin-right: 20px;
        }

        .nd-content >div:nth-of-type(2) {
            width: calc(100% - 220px);
        }

        .nd-title div:nth-of-type(1) {
            font-size: 32px;
        }

        .nd-title div:nth-of-type(2) {
            font-size: 18px;
            margin-top: 10px;
        }

        .nd-list-title > p {
            margin-top: 10px;
            font-size: 14px;
            text-align: left;
            padding-left: 10px;
        }

        .nd-list-title > p:hover {
            color: #fa541c;
            text-decoration: underline;
        }

        .nd-picture {
            width: 100%;
            height: 280px;
        }

        .pagination {
            margin-top: 20px;
            text-align: right;
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
            margin-left: 10px;
            line-height: 2;
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

        .myCards {
            width: 200px;
            margin-top: 10px;
            font-size: 5px;
            text-align: left;
            margin-left: 68px;
        }

        .myCards1 {
            width: 150px;
            margin-top: 5px;
            font-size: 5px;
            text-align: left;
            margin-left: 68px;
        }
    }
</style>