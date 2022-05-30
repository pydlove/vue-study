<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <NormalHeader ref="normalHeaderRef" :currentMenu="'observationData'"></NormalHeader>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
            <el-breadcrumb-item :to="{ path: '/home' }">
                <i class="el-icon-s-home"></i>
                {{ $t('menu.home') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/observationData' }">
                {{ $t('menu.observationData') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ $t('menu.LogDetail') }}
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="nd-background">
            <div class="nd-content">
                <el-divider class="mb-40" content-position="left">
                    {{ $t('message.ObservationLog') }}
                </el-divider>
                <div class="aiocloud-card obd-content">
                    <div class="dffn-ac obd-item">
                        <div>
                            {{ $t('message.ObservationDate') }}:
                        </div>
                        <div>
                            {{ observationLog.observerDate }}
                        </div>

                        <div>
                            {{ $t('message.WeatherConditions') }}:
                        </div>
                        <div>
                            {{ fmtWeather(observationLog.weather) }}
                        </div>
                    </div>

                    <div class="dffn-ac obd-item">
                        <div>
                            {{ $t('message.Observer') }}:
                        </div>
                        <div>
                            {{ observationLog.observer }}
                        </div>

                        <div>
                            {{ $t('message.ObservationType') }}:
                        </div>
                        <div>
                            {{ fmtObserverType(observationLog.observerType) }}
                        </div>
                    </div>

                    <div class="dffn-ac obd-item">
                        <div>
                            {{ $t('message.NumberOfFiles') }} :
                        </div>
                        <div>
                            {{ observationLog.clObservationDatas }}
                        </div>
                    </div>

                    <div class="dffn obd-item1">
                        <div>
                            {{ $t('message.Seeing') }}:
                        </div>
                        <div>
                            {{ observationLog.seeing }}
                        </div>
                    </div>

                    <div class="dffn obd-item1">
                        <div>
                            {{ $t('message.Remark') }}:
                        </div>
                        <div>
                            {{ observationLog.remark }}
                        </div>
                    </div>
                </div>

                <div class="obd-title">
                    <el-divider content-position="left">
                        {{ $t('menu.observationData') }}
                    </el-divider>
                </div>

                <div class="aiocloud-card1">
                    <div class="nd-search-data">
                        <el-table
                                ref="tableRef"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%"
                                @select="handleSelection"
                        >
                            <el-table-column
                                    show-overflow-tooltip="true"
                                    prop="fitsName"
                                    :label="$t('message.fitsName')"
                                    width="300"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    show-overflow-tooltip="true"
                                    prop="obsTime"
                                    :label="$t('message.obsTime')"
                                    width="150"
                                    align="center">
                            </el-table-column>
                            <!--<el-table-column-->
                                    <!--show-overflow-tooltip="true"-->
                                    <!--prop="startTime"-->
                                    <!--:label="$t('message.startTime')"-->
                                    <!--width="120"-->
                                    <!--align="center">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--show-overflow-tooltip="true"-->
                                    <!--prop="endTime"-->
                                    <!--:label="$t('message.endTime')"-->
                                    <!--width="120"-->
                                    <!--align="center">-->
                            <!--</el-table-column>-->
                            <el-table-column
                                    show-overflow-tooltip="true"
                                    prop="target"
                                    width="100px"
                                    :label="$t('message.ObservationTarget')"
                                    align="center">
                            </el-table-column>
                            <!--<el-table-column-->
                                    <!--show-overflow-tooltip="true"-->
                                    <!--prop="lineSpectrum"-->
                                    <!--width="150px"-->
                                    <!--:label="$t('message.LineSpectrum')"-->
                                    <!--align="center">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--show-overflow-tooltip="true"-->
                                    <!--prop="observationPattern"-->
                                    <!--width="100px"-->
                                    <!--:label="$t('message.obsPattern')"-->
                                    <!--align="center">-->
                            <!--</el-table-column>-->
                            <el-table-column
                                    show-overflow-tooltip="true"
                                    prop="offBand"
                                    width="100px"
                                    :label="$t('message.offBand')"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    show-overflow-tooltip="true"
                                    prop="exposureTime"
                                    width="150px"
                                    :label="$t('message.expTime')"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    show-overflow-tooltip="true"
                                    prop="observationWaveLength"
                                    :label="$t('message.observationWaveLength')"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    show-overflow-tooltip="true"
                                    prop="picture"
                                    :label="$t('message.image')"
                                    align="center"
                                    width="150px">
                                <template slot-scope="scope">
                                    <el-button class="wdi-120" type="primary" plain @click="previewImage(scope.row)">
                                        {{$t('message.preview')}}
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    show-overflow-tooltip="true"
                                    prop="video"
                                    :label="$t('message.video')"
                                    align="center"
                                    width="150px">
                                <template slot-scope="scope">
                                    <a :href="scope.row.video" target="_blank"
                                       v-if="scope.row.video != null && scope.row.video.length > 0"
                                       :download="getName(scope.row.video)">
                                        {{$t('message.downloadObsVideo')}}
                                    </a>
                                </template>
                            </el-table-column>
                            <!--<el-table-column-->
                                    <!--show-overflow-tooltip="true"-->
                                    <!--prop="coordinates"-->
                                    <!--width="150px"-->
                                    <!--:label="$t('message.ObsCoordinate')"-->
                                    <!--align="center">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--show-overflow-tooltip="true"-->
                                    <!--prop="observationBand"-->
                                    <!--width="100px"-->
                                    <!--:label="$t('message.obsBand')"-->
                                    <!--align="center">-->
                            <!--</el-table-column>-->
                        </el-table>
                    </div>
                    <Pagination class="pagination" ref="pageRef" @search="search"></Pagination>
                </div>
            </div>
        </div>

        <Footer ref="footerRef"></Footer>
        <Application ref="appref"></Application>
        <Preview ref="previewRef"></Preview>
    </div>
</template>
<!--eslint-disable-->
<script>
    import NormalHeader from "@/components/NormalHeader";
    import Footer from "@/components/Footer";
    import Application from "@/views/user/application.vue";
    import Page from "@/components/Page";
    import Pagination from "@/components/Pagination";
    import Preview from "@/views/observationData/previewDialog.vue";

    export default {
        name: "observationDataDetail",
        components: {
            NormalHeader,
            Footer,
            Application,
            Page,
            Pagination,
            Preview
        },
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                tableData: [],
                language: "zh",
                observationDataDetail: "",
                observationLog: {
                    observerDate: "",
                    observer: "",
                    observerType: "",
                    applicant: "",
                    weather: "",
                    seeing: "",
                    clObservationDatas: "",
                },
            }
        },
        mounted() {
            this.initLanguage();
            this.observationDataDetail = this.$utils.getStorage("observationDataDetail");
            this.searchLogData();
            this.search(1, 10);
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
                this.$refs.footerRef.initLanguage();
            },

            previewImage(row){
                this.$refs.previewRef.open(row);
            },

            getName(url){
                if(url != null && url != "" && url != undefined){
                    var fileName = url.substring(url.lastIndexOf("/") + 1);
                    return fileName;
                }
            },
            async applicationDownload(item) {
                let params = new FormData();
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_login_getUser, params, "POST");
                if (data.code == 200) {
                    let res = data.data;
                    this.isLogin = res.isLogin;
                    if (res.isLogin) {
                        this.sendOrder(item.id, item.logId);
                    }
                    else {
                        this.$refs.normalHeaderRef.toLogin();
                    }
                    return true;
                }
            },

            async sendOrder(dataId, logId) {
                this.$refs.appref.open(dataId, logId);
            },

            fmtObserverType(observerType) {
                switch (observerType) {
                    case "0":
                        return this.$t('message.RoutineObservation');
                    case "1":
                        return this.$t('message.SpectralObservation');
                    case "2":
                        return this.$t('message.SunnyDayInstrumentMaintenance');
                    case "3":
                        return this.$t('message.ObservationSun');
                    default:
                        return observerType;
                }
            },

            fmtWeather(weather) {
                switch (weather) {
                    case "晴":
                        return this.$t('message.Clear');
                    case "阴":
                        return this.$t('message.Negative');
                    case "多云":
                        return this.$t('message.cloudy');
                    case "雨":
                        return this.$t('message.Rain');
                    case "雪":
                        return this.$t('message.Snow');
                    default:
                        return weather;
                }
            },

            /**
             * 查询观测数据
             * @param {*} 参数 参数说明
             * @author panyong
             */
            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("observerDate", this.observationDataDetail);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_data_detail, params, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                }
            },

            //根据 logId去查询
            async searchLogData() {
                let param = new FormData();
                param.append("observerDate", this.observationDataDetail);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_searchData, param, "POST");
                if (data.code == 200) {
                    if(data.data != null){
                        this.observationLog = data.data;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    /*@media screen and (min-width: 768px) {*/
        .obd-title {
            text-align: right;
            font-size: 16px;
            color: #333333;
            margin-top: 40px;
        }

        .obd-content {
            width: 900px;
        }

        .obd-item, .obd-item1 {
            line-height: 36px;
            font-size: 14px;
        }

        .obd-item > div:nth-of-type(2n) {
            width: 220px;
            text-align: left;
            margin-left: 10px;
            color: #333333;
        }

        .obd-item > div:nth-of-type(2n + 1) {
            width: 100px;
            color: #fa541c;
            font-weight: 600;
            text-align: right;
        }

        .obd-item1 > div:nth-of-type(2n) {
            text-align: left;
            margin-left: 10px;
            color: #333333;
            line-height: 28px;
            padding-top: 5px;
        }

        .obd-item1 > div:nth-of-type(2n + 1) {
            width: 100px;
            min-width: 100px;
            color: #fa541c;
            font-weight: 600;
            text-align: right;
        }

        .obd-data {
            margin-bottom: 20px;
        }

        .obd-data-img {
            min-width: 160px;
        }

        .obd-data-item {
            line-height: 36px;
        }

        .obd-data-item > div:nth-of-type(2n) {
            width: 180px;
            text-align: left;
            margin-left: 10px;
            color: #333333;
        }

        .obd-data-item > div:nth-of-type(2n + 1) {
            width: 100px;
            color: #fa541c;
            font-weight: 600;
            text-align: right;
        }

        .obd-data-down {
            position: relative;
        }

        .obd-data-btn {
            position: absolute;
            bottom: 0px;
            left: 0px;
        }
    /*}*/
</style>

<style>
    .el-divider__text {
        font-size: 16px;
        font-weight: 600;
        background: #eeeeee !important;
    }

    .obd-data-btn {
        background: #fa541c;
        border: 1px solid #fa541c;
    }

    .obd-data-btn:hover {
        background: #fa541c;
        border: 1px solid #fa541c;
    }
</style>