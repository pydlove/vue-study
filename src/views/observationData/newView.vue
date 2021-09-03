<template>
    <!--eslint-disable-->
    <div class="nv-container">
        <div class="tl mt-20">
            <el-radio-group v-model="form.date">
                <el-radio label="1" @change="week">{{ $t('message.lastWeek') }}</el-radio>
                <el-radio label="2" @change="month">{{ $t('message.lastMonth') }}</el-radio>
            </el-radio-group>
        </div>

        <div class="nd-news-list" v-if="this.tableData.length > 0" >
            <div class="nd-list" v-for="(item, index) in this.tableData" :key="index">
                <el-image
                        class="nd-picture"
                        :src="item.picture"
                        :preview-src-list="[item.picture]"></el-image>

                <div>
                    <div class="nd-list-title">
                        <div class="nd-list-item">
                            <p>{{ $t('message.ObservationTime') }}:</p>
                            <p>{{ item.beginTime }}</p>
                        </div>
                        <div class="nd-list-item">
                            <p>{{ $t('message.ObservationTarget') }}:</p>
                            <p>{{ item.target }}</p>
                        </div>
                    </div>

                    <div class="nd-list-title">
                        <div class="nd-list-item">
                            <p>{{ $t('message.ExposureTime') }}:</p>
                            <p> {{ item.exposureTime }}</p>
                        </div>
                        <div class="nd-list-item">
                            <p>{{ $t('message.ObservationWavelength') }}:</p>
                            <p>{{ item.observationBand }}</p>
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
            </div>

            <Pagination class="pagination" ref="pageRef" @search="search"></Pagination>
        </div>

        <div v-else>
            <van-empty image="search" :description="$t('message.NoObservationDataEmpty')"/>
        </div>

    </div>
</template>
<!--eslint-disable-->
<script>
    import Pagination from "@/components/Pagination";
    import Page from "@/components/Page";

    export default {
        name: "newView",
        components: {Page, Pagination},
        mounted() {
            this.week();
        },
        methods: {
            fmt(item, key) {
                var json = JSON.parse(item.dataDetail);
                return json[key];
            },

            week() {
              this.beginTime = this.$utils.lastWeek();
              this.endTime = this.$utils.nowDate();
              this.search(1, 10);
            },
            month() {
               this.beginTime = this.$utils.lastMonth();
                this.endTime = this.$utils.nowDate();
                this.search(1, 10);
            },

            async search(currentPage, pageSize){
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData();
                params.append("beginTime", this.beginTime);
                params.append("endTime", this.endTime);
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_data_newData, params, "POST");
                if(data.code == 200) {
                    this.tableData = data.data;
                    for( var i = 0; i < this.tableData.length; i++) {
                        var json = JSON.parse(this.tableData[i].dataDetail);
                        this.dataDetail.push(json);
                    }
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },
        },
        data() {
            return {
                beginTime: "",
                endTime: "",
                currentPage: 1,
                pageSize: 10,
                tableData: [],
                radio: '',
                dataDetail: [],
                form: {
                    date: "1",
                }
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {
        .nd-list {
            display: flex;
            flex-wrap: nowrap;
            margin-bottom: 20px;
        }

        .nd-news-list {
            width: 100%;
            margin-top: 40px;
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

        .nd-title div:nth-of-type(1) {
            font-size: 32px;
        }

        .nd-title div:nth-of-type(2) {
            font-size: 18px;
            margin-top: 10px;
        }

        .nd-news-list {
            position: relative;
            width: 900px;
        }

        .myCards1 {
            width: 200px;
            margin-top: 10px;
            font-size: 12px;
            text-align: left;
        }

        .nd-list {
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-picture {
            width: 160px;
            height: 100px;
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

        .nv-container {
            width: 100%;
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