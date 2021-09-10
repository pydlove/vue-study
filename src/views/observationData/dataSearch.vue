<template>
    <!--eslint-disable-->
    <div class="ds-container">
        <div class="dataTitle">
            {{ $t('menu.observationData') }}
        </div>

        <div class="observationData">
            <div>
                <div class="timeSelect dffn-ac">
                    <div class="ds-lable">
                        {{ $t('message.ObservationTime') }}：
                    </div>
                    <el-date-picker
                            class="ds-date1"
                            v-model="form.startTime"
                            type="datetime"
                            placeholder="选择开始时间">
                    </el-date-picker>
                    <div class="nd-line">-</div>
                    <el-date-picker
                            class="ds-date2"
                            v-model="form.endTime"
                            type="datetime"
                            placeholder="选择结束时间"
                            @change="checkTime">
                    </el-date-picker>
                </div>

                <div class="dffn-ac mt-20">
                    <div class="ds-lable">
                        {{ $t('message.ObservationTarget') }}：
                    </div>
                    <el-input class="ds-date" :placeholder="$t('message.inputObsTarge')"
                              v-model="form.observationTarget"></el-input>
                </div>

                <div class="dffn-ac mt-20">
                    <div class="ds-lable">
                        {{ $t('message.ObservationWavelength') }}：
                    </div>
                    <el-input class="ds-date" :placeholder="$t('message.inputObsWaveLength')"
                              v-model="form.band"></el-input>
                </div>

                <div class="ds-search">
                    <el-button class="wdi-120" type="primary" plain @click="search(1, 10)">
                        {{ $t('message.Search') }}
                    </el-button>

                    <el-button class="wdi-120" type="" plain @click="reset">
                        {{ $t('message.Reset') }}
                    </el-button>
                </div>

                <!--<div class="observeIcon">-->
                <!--<div class="coordinate">观测坐标：</div>-->
                <!--<el-input placeholder="请输入观测坐标" v-model="observationCoordinate"></el-input>-->
                <!--</div>-->

                <!--<div class="observeTail">-->
                <!--<div class="coordinate">偏带状态：</div>-->
                <!--<el-select v-model="form.status" placeholder="请选择偏带状态">-->
                <!--<el-option label="ALL" value="ALL"></el-option>-->
                <!--<el-option label="off-band" value="off-band"></el-option>-->
                <!--<el-option label="Center" value="Center"></el-option>-->
                <!--</el-select>-->
                <!--</div>-->

                <!--<div class="activityView">-->
                <!--<div class="coordinate">活动现象：</div>-->
                <!--<el-input v-model="activityViews"></el-input>-->
                <!--</div>-->
            </div>
        </div>

        <div class="nd-news-list" v-if="this.tableData.length > 0">
            <div class="nd-list" v-for="(item, index) in this.tableData" :key="index">
                <el-image
                        class="nd-picture"
                        :src="item.picture"
                        :preview-src-list="[item.picture]"></el-image>
                <div>
                    <div class="nd-list-title">
                        <div class="nd-list-item">
                            <p>{{ $t('message.ObservationTime') }}:</p>
                            <p>{{item.beginTime }}</p>
                        </div>
                        <div class="nd-list-item">
                            <p>{{ $t('message.ObservationTarget') }}:</p>
                            <p>{{item.target}}</p>
                        </div>
                    </div>
                    <div class="nd-list-title">
                        <div class="nd-list-item">
                            <p>{{ $t('message.ExposureTime') }}:</p>
                            <p>{{item.exposureTime}}</p>
                        </div>
                        <div class="nd-list-item">
                            <p>{{ $t('message.ObservationWavelength') }}:</p>
                            <p>{{item.observationBand}}</p>
                        </div>
                    </div>
                    <div v-if="item.video != '' && item.video != null" class="nd-list-title">
                        <div class="nd-list-item">
                            <p>{{ $t('message.ObservationVideo') }}:</p>
                            <p>
                                <a :href="item.video" :download="item.video">
                                    {{ $t('message.downloadObsVideo') }}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="obd-data-down">
                    <el-button class="obd-data-btn" type="primary" size="mini" @click="lookDay(item)">
                        {{ $t('message.AllDay') }}
                    </el-button>
                </div>
            </div>
        </div>

        <div v-else>
            <van-empty image="search" :description="$t('message.NoObservationDataEmpty')"/>
        </div>

        <Pagination class="pagination" ref="pageRef" @search="search"></Pagination>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Page from "@/components/Page";
    import Pagination from "@/components/Pagination";

    export default {
        name: "dataSearch",
        components: {Page, Pagination},
        data() {
            return {
                observationDate: "",
                logId: "",
                date: null,
                yearMonth: '',
                tableData: [],
                clObservationLog: [],
                currentPage: 1,
                pageSize: 10,
                client: false,
                clientWidth: document.body.clientWidth,
                observationCoordinate: '',
                activityViews: '',
                form: {
                    band: '',
                    startTime: '',
                    endTime: '',
                    observationTarget: '',
                },
            }
        },
        mounted() {
            if (this.clientWidth < 500) {
                this.client = true;
            }
            this.search(1, 10);
        },

        methods: {
            reset() {
                this.form = {
                    band: '',
                    startTime: null,
                    endTime: null,
                    observationTarget: '',
                };
                this.search(this.currentPage, this.pageSize);
            },

            //跳转
            lookDay(item) {
                this.searchLogTime(item);
            },

            async searchLogTime(item) {
                let params = new FormData();
                params.append("logId", item.logId);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_searchDate, params, "POST");
                if (data.code == 200) {
                    this.clObservationLog = data.data;
                    let observationDataDetail = {
                        date: this.clObservationLog.observerDate,
                    };
                    this.$utils.setStorage("observationDataDetail", observationDataDetail);
                    let routeData = this.$router.resolve({
                        path: "/observationDataDetail"
                    });
                    window.open(routeData.href, '_blank');
                }
            },

            checkTime() {
                if (this.form.startTime != null && this.form.endTime != null) {
                    let beginTime = new Date(this.form.startTime);
                    let endTime = new Date(this.form.endTime);
                    if (beginTime.getTime() >= endTime.getTime()) {
                        alert("时间选择错误，请重新选择");
                        this.form.endTime = null;
                    }
                }
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData();
                if (this.form.startTime != null && this.form.startTime != "" && this.form.endTime != null  && this.form.endTime != "") {
                    let beginTime = new Date(this.form.startTime);
                    let endTime = new Date(this.form.endTime);
                    params.append("beginTime", beginTime);
                    params.append("endTime", endTime);
                }
                params.append("observationTarget", this.form.observationTarget);
                params.append("band", this.form.band);
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_data_searchData, params, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            }
        },


    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {
        .ds-container {
            width: 100%;
        }

        .dataTitle {
            font-size: 18px;
            margin-top: 10px;
            text-align: left;
        }

        .timeSelect {
            margin-top: 40px;
            font-size: 14px;
            text-align: left;
        }

        .nd-news-list {
            width: 100%;
            margin-top: 40px;
        }

        .nd-title div:nth-of-type(1) {
            font-size: 32px;
        }

        .nd-title div:nth-of-type(2) {
            font-size: 18px;
            margin-top: 10px;
        }

        .nd-list {
            display: flex;
            flex-wrap: nowrap;
            margin-bottom: 20px;
        }

        .nd-list-title {
            font-size: 14px;
            font-family: 微软雅黑 !important;
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-list-title > div {
            min-width: 220px;
            width: 220px;
            font-size: 12px;
            color: #fa541c;
            text-align: left;
            line-height: 36px;
        }

        .nd-list-item {
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-list-item > p:nth-of-type(1) {
            width: 100px;
            min-width: 100px;
            text-align: right;
            font-weight: 600;
        }

        .nd-list-item > p:nth-of-type(2) {
            width: 120px;
            min-width: 120px;
            margin-left: 10px;
            color: #333333;
        }

        .nd-picture {
            width: 160px;
            height: 100px;
            min-width: 160px;
        }

        .pagination {
            margin-top: 20px;
            text-align: left;
        }

        .obd-data-down {
            position: relative;
        }

        .obd-data-btn {
            position: absolute;
            bottom: 0px;
            right: -40px;
        }

        .ds-date {
            width: 430px;
        }

        .ds-date1 {
            width: 200px;
        }

        .ds-date2 {
            width: 200px;
        }

        .nd-line {
            margin: 10px;
            font-size: 30px;
        }

        .ds-lable {
            width: 130px;
            text-align: right;
            margin-right: 10px;
            font-size: 14px;
        }

        .ds-search {
            text-align: right;
            padding-right: 17px;
            margin-top: 20px;
        }
    }

</style>