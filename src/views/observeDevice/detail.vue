<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <NormalHeader :currentMenu="'observeDevice'"></NormalHeader>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
            <el-breadcrumb-item :to="{ path: '/home' }">
                <i class="el-icon-s-home"></i>
                {{ $t('menu.home') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/observeDevice' }">
                {{ $t('menu.observationEquipment') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ $t('message.EquipmentDetail') }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="nd-background">
            <div class="nd-content aiocloud-card">
                <div v-if="language == 'zh'" class="nd-new-title">
                    <div  class="nd-news-title">{{this.form.title}}</div>
                    <div class="nd-news-content" v-html="form.content"></div>
                </div>

                <div v-else-if="language == 'en'" class="nd-new-title">
                    <div  class="nd-news-title">{{this.form.enTitle}}</div>
                    <div class="nd-news-content" v-html="form.enContent"></div>
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
        name: "observationDeviceDetail",
        components: {NormalHeader, Footer},
        mounted() {
            this.initLanguage();
            this.minHeight = this.clientHeight - 180 - 260;
            let newsDetail = this.$utils.getStorage("observeDeviceDetail");
            if(newsDetail) {
                this.form = newsDetail
            }
            this.index = this.$route.query.index;
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
            },
        },
        data() {
            return {
                language: "zh",
                equipments: [
                    {
                        name: this.$t('message.CHASESatellite'),
                        type: "0",
                    },
                    {
                        name: this.$t('message.OnsetSatellite'),
                        type: "1",
                    },
                    {
                        name: this.$t('message.WEHOTSatellite'),
                        type: "2",
                    },
                    {
                        name: this.$t('message.OtherEquipment'),
                        type: "3",
                    }
                ],
                index: 0,
                type: "",
                form: {
                    id: "",
                    title: "",
                    picture: "",
                    content: "",
                    status: "",
                    type: "",
                    displayOrder: "",
                    createTime: "",
                },
                clientHeight: document.body.clientHeight,
                clientWidth: document.body.clientWidth,
                minHeight: "",
            }

        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    /*@media screen and (min-width: 768px) {*/
        .el-upload__tip {
            color: #f51d37;
        }

        .nd-detail-box {
            background: #eeeeee;
        }

        .nd-news-list {
            width: 1000px;
            margin: 0px auto;
            padding: 20px 0;
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-new-title {
            margin-top: 10px;
        }

        .nd-new-left {
            background: #ffffff;
            width: 230px;
            height: 200px;
            margin-right: 20px;
            border-radius: 5px;
        }

        .nd-list {
            text-align: center;
            font-size: 16px;
            font-weight: bolder;
            margin-top: 10px;

        }

        .nd-news-title {
            text-align: center;
            font-size: 20px;
        }

        .nd-news-time {
            text-align: center;
            margin-top: 10px;
        }

        .nd-news-content {
            margin-top: 20px;
            align-content: center;
        }

        .nd-new-right {
            background: #ffffff;
            width: 750px;
            border-radius: 5px;
        }
    /*}*/

    /*媒体查询（手机）*/
    /*@media screen and (max-width: 768px) {*/
        /*.nd-detail-box {*/
            /*background: #eeeeee;*/
        /*}*/

        /*.nd-news-list {*/
            /*width: 100%;*/
            /*background: #f0f0f0;*/
            /*margin: 0px auto;*/
            /*display: flex;*/
            /*flex-wrap: nowrap;*/
            /*padding: 10px 0;*/
        /*}*/

        /*.nd-list {*/
            /*text-align: center;*/
            /*font-size: 5px;*/
            /*font-weight: bolder;*/
            /*margin-top: 10px;*/
        /*}*/

        /*.nd-news-title {*/
            /*text-align: center;*/
            /*margin-top: 5px;*/
        /*}*/

        /*.nd-news-title {*/
            /*text-align: center;*/
            /*font-size: 16px;*/
            /*line-height: 1;*/
        /*}*/

        /*.nd-news-time {*/
            /*text-align: center;*/
            /*margin-top: 10px;*/
        /*}*/

        /*.nd-new-left {*/
            /*background: #ffffff;*/
            /*width: 100px;*/
            /*height: 200px;*/
            /*margin-right: 10px;*/
            /*border-radius: 5px;*/
            /*margin-left: 10px;*/
        /*}*/

        /*.nd-news-content {*/
            /*margin-top: 20px;*/
            /*align-content: center;*/
            /*font-size: 3px;*/
        /*}*/


        /*.nd-new-right {*/
            /*background: #ffffff;*/
            /*width: calc(100% - 130px);*/
            /*border-radius: 5px;*/
            /*margin-right: 10px;*/
        /*}*/
    /*}*/
</style>

<style>
    .aioc-ac-upload .el-upload-list__item-thumbnail {
        vertical-align: middle;
        display: inline-block;
        width: 500px;
        height: 300px;
        float: left;
        position: relative;
        z-index: 1;
        margin-left: 40px;
        margin-top: 30px;
        background-color: #FFF;
    }

    .aioc-ac-upload .el-upload-list__item {
        overflow: hidden;
        z-index: 0;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        margin-top: 10px;
        padding: 0px;
        height: 360px !important;
        width: 600px !important;
        transition: none;
    }

    .aioc-ac-upload .el-upload-dragger {
        width: 600px;
        height: 180px;
    }

    .aioc-ac-upload .el-upload-list__item-name {
        display: none;
    }

</style>