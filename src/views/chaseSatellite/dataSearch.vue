<template>
    <!--eslint-disable-->
    <div class="ds-container">
        <div class="dataTitle">
            {{ $t('menu.chaseSatellite') }}
        </div>

        <div class="observationData">
            <div class="timeSelect dffn-ac" required>
                <div class="ds-lable">
                    {{ $t('message.ObservationTime') }}：
                </div>

                <el-date-picker class="ds-date1" v-model="form.startTime" type="datetime" :placeholder="$t('message.startDate')"></el-date-picker>
                <div :span="11" class="nd-line">-</div>
                <el-date-picker class="ds-date2" v-model="form.endTime" type="datetime" :placeholder="$t('message.endDate')" @change="checkTime">
                </el-date-picker>
            </div>

            <div class="dffn-ac mt-20">
                <div class="ds-lable">
                    {{ $t('message.observingPattern') }}：
                </div>
                <el-checkbox-group v-model="checkList" @change="select(checkList)">
                    <el-checkbox label="RSM"></el-checkbox>
                    <el-checkbox label="CIM"></el-checkbox>
                </el-checkbox-group>

                <div class="ds-linespectrum" v-if="line">
                    {{ $t('message.lineSpectrum') }}：
                </div>
                <el-checkbox-group v-model="checkList1" v-if="line">
                    <el-checkbox label="Hα"></el-checkbox>
                    <el-checkbox label="Fe"></el-checkbox>
                </el-checkbox-group>
            </div>

            <div class="dffn-ac mt-20">
                <div class="ds-lable">
                    {{ $t('message.ObservationTarget') }}：
                </div>
                <el-checkbox-group v-model="checkList2">
                    <el-checkbox label="全日面"> {{ $t('message.fullDisk') }}</el-checkbox>
                    <el-checkbox label="局部"> {{ $t('message.partDisk') }}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="ds-search">
                <el-button class="wdi-120" type="primary" @click="onSubmit">
                    {{ $t('message.Search') }}
                </el-button>

                <el-button class="wdi-120" type="" @click="reset">
                    {{ $t('message.Reset') }}
                </el-button>
            </div>
        </div>

    </div>
</template>
<!--eslint-disable-->

<script>
    import Page from "@/components/Page";
    import Pagination from "@/components/Pagination";

    export default {
        name: "DataSearch",
        components: {Page, Pagination},
        data() {
            return {
                checkList: [],
                checkList2: [],
                checkList1: [],
                tableData:[],
                observationDate: "",
                logId: "",
                date: null,
                yearMonth: '',
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
                    coordinate: '',
                    exposureTime: '',
                },

                line: false,
            }
        },
        mounted() {
            if (this.clientWidth < 500) {
                this.client = true;
            }
        },
        methods: {
            select(item) {
                if (item.valueOf() == "RSM" || item[0] == "RSM" || item[1] == "RSM") {
                    this.line = true;
                } else {
                    this.line = false;
                }
            },

            reset() {
                this.form = {
                    band: '',
                    startTime: null,
                    endTime: null,
                    observationTarget: '',
                };
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

            onSubmit() {
                //判断 观测时间是否选择
                if (this.form.startTime != "" && this.form.startTime != null && this.form.endTime != "" && this.form.endTime != null) {
                    this.search(1, 10);
                } else {
                    this.$message('请选择观测时间');
                }
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData();
                if (this.form.startTime != null && this.form.startTime != "" && this.form.endTime != null && this.form.endTime != "") {
                    let beginTime = new Date(this.form.startTime);
                    let endTime = new Date(this.form.endTime);
                    params.append("beginTime", beginTime);
                    params.append("endTime", endTime);
                }
                params.append("patternList", this.checkList.toString());
                params.append("lineSpectrumList", this.checkList1.toString());
                params.append("targetList", this.checkList2.toString());
                params.append("dataType", "chase");
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_data_searchDataS, params, "POST");
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
            margin-top: 10px;
            text-align: left;
        }

        .timeSelect {
            margin-top: 40px;
            font-size: 14px;
            text-align: left;
        }

        .nd-title div:nth-of-type(1) {
            font-size: 32px;
        }

        .nd-title div:nth-of-type(2) {
            font-size: 18px;
            margin-top: 10px;
        }

        .nd-list-title > div {
            min-width: 220px;
            width: 220px;
            font-size: 12px;
            color: #fa541c;
            text-align: left;
            line-height: 36px;
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

        .pagination {
            margin-top: 20px;
            text-align: left;
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

        .ds-linespectrum {
            width: 110px;
            text-align: right;
            margin-right: 10px;
            font-size: 14px;
            margin-left: 25px;
        }

        .ds-search {
            text-align: right;
            padding-right: 17px;
            margin-top: 20px;
        }
    }
</style>