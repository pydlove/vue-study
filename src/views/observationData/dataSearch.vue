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
                            placeholder="选择观测时间">
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
                    <el-checkbox-group v-model="checkList1">
                        <el-checkbox label="3600"> {{3600}}</el-checkbox>
                        <el-checkbox label="4250"> {{4250}}</el-checkbox>
                        <el-checkbox label="6563"> {{6563}}</el-checkbox>
                        <el-checkbox label="10830"> {{10830}}</el-checkbox>
                    </el-checkbox-group>
                </div>

                <div class="dffn-ac mt-20">
                    <div class="ds-lable">
                        {{ $t('message.ObservationPartialBand') }}：
                    </div>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="蓝翼"> {{ $t('message.blueWing') }}</el-checkbox>
                        <el-checkbox label="线心"> {{ $t('message.lineHeart') }}</el-checkbox>
                        <el-checkbox label="红翼"> {{ $t('message.redWing') }}</el-checkbox>
                    </el-checkbox-group>
                </div>

                <div class="ds-search">
                    <el-button class="wdi-120" type="primary" plain @click="onSubmit">
                        {{ $t('message.Search') }}
                    </el-button>

                    <el-button class="wdi-120" type="" plain @click="reset">
                        {{ $t('message.Reset') }}
                    </el-button>
                </div>

            </div>
        </div>
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
                checkList1:[],
                checkList: [],
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
        },

        methods: {
            reset() {
                this.form = {
                    band: '',
                    startTime: null,
                    endTime: null,
                    observationTarget: '',
                };
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

            onSubmit() {
                console.log(this.form.startTime);
                //判断 观测时间是否选择
                if (this.form.startTime != "" && this.form.startTime != null ) {
                    this.search(1, 10);
                } else {
                    this.$message('请选择观测时间');
                }
            },

            async search(currentPage, pageSize) {
                console.log(this.checkList1.toString());
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData();
                if (this.form.startTime != null && this.form.startTime != "") {
                    let beginTime = new Date(this.form.startTime);
                    params.append("beginTime", beginTime);
                }
                params.append("offBandList", this.checkList.toString());
                params.append("waveLengthList", this.checkList1.toString());
                params.append("observationTarget", this.form.observationTarget);
                params.append("band", this.form.band);
                params.append("dataType", "onset");
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_data_searchDataOn, params, "POST");
                if (data.code == 200) {
                    this.$emit("setTableData", data);
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
            text-align: left;
        }

        .timeSelect {
            margin-top: 10px;
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
        }
    }

</style>