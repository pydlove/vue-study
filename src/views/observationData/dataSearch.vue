<template>
    <!--eslint-disable-->
    <div class="dataHead">
        <div class="dataTitle">
            数据查询
        </div>

        <div class="observationData">
            <div>
                <div class="timeSelect">
                    观测时间：
                    <el-date-picker
                            v-model="observationTime"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="[]">
                    </el-date-picker>
                </div>

                <div class="observeDetail">
                    <div class="observeIcon">
                        <div class="coordinate">观测坐标：</div>
                        <el-input placeholder="请输入观测坐标" v-model="observationCoordinate"></el-input>
                    </div>
                    <div class="observeTail">
                        <div class="coordinate">观测目标：</div>
                        <el-input placeholder="请输入观测目标" v-model="observationTarget"></el-input>
                    </div>
                </div>

                <div class="observeSelect">
                    <div class="observeIcon">
                        <div class="coordinate">观测波段：</div>
                        <el-select v-model="form.band" placeholder="请选择观测波段">
                            <el-option label="ALL" value="ALL"></el-option>
                            <el-option label="HalpHa" value="HalpHa"></el-option>
                            <el-option label="Tio" value="Tio"></el-option>
                            <el-option label="G-band" value="G-band"></el-option>
                        </el-select>
                    </div>
                    <div class="observeTail">
                        <div class="coordinate">偏带状态：</div>
                        <el-select v-model="form.status" placeholder="请选择偏带状态">
                            <el-option label="ALL" value="ALL"></el-option>
                            <el-option label="off-band" value="off-band"></el-option>
                            <el-option label="Center" value="Center"></el-option>
                        </el-select>
                    </div>
                </div>

                <div class="activityView">
                    <div class="coordinate">活动现象：</div>
                    <el-input v-model="activityViews"></el-input>
                </div>
            </div>

            <div class="searchBtn">
                <el-button type="warning" plain  @click="toSearch">查询</el-button>
            </div>
        </div>

        <div class="nd-news-list" v-if="this.tableData.length > 0" >
            <div class="myCard">
                <div class="nd-list" v-for="(item, index) in this.tableData" :key="index">
                    <div>
                        <div class="nd-lists">
                            <el-image
                                    class="nd-picture"
                                    :src="item.picture"
                                    :preview-src-list="[item.picture]"></el-image>
                        </div>
                        <div class="nd-list-title" >
                            <p class="myCards1"> 观测时间起： {{item.beginTime }}</p>
                            <p class="myCards1"> 观测时间止： {{item.endTime}}</p>
                        </div>
                        <div  class="nd-list-title" >
                            <p class="myCards2"> 观测目标：{{item.target}}</p>
                            <p class="myCards2"> 观测坐标：{{ item.coordinates}}</p>
                        </div>
                        <div  class="nd-list-title" >
                            <p class="myCards2"> 观测波段：{{item.observationBand}}</p>
                            <p class="myCards2"> 偏带状态：{{item.offBand}}</p>
                        </div>
                        <div  class="nd-list-title" >
                            <p class="myCards2"> 曝光时间：{{item.exposureTime}}</p>
                            <p class="myCards2" v-if="item.video != '' && item.video != null" @click="downLoad(item)"> 观测视频: 下载</p>
                        </div>
                        <div  class="nd-list-title" >
                            <p class="myCards2"> 活动现象：{{item.descriptionTarget}}</p>
                            <p class="myCards2"> 备注：{{item.remark}}</p>
                        </div>
                    </div>

                    <div class="searchDay">
                        <el-button type="primary" plain @click="lookDay(item)">查看全天</el-button>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <van-empty image="search" description="暂无观测数据"/>
        </div>

        <div class="pageStyle">
            <Page v-if="this.client" class="page"  ref="pageRef" @search="search"></Page>
            <Pagination v-else class="pagination"  ref="pageRef" @search="search"></Pagination>
        </div>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Page from "@/components/Page";
    import Pagination from "@/components/Pagination";
    export default {
        name: "dataSearch",
        components: { Page, Pagination},
        data() {
            return {
                tableData: [],
                beginTime: null,
                endTime: null,
                currentPage: 1,
                pageSize: 10,
                observationTime:  [],
                observationCoordinate: '',
                observationTarget: '',
                activityViews: '',
                form: {
                    band: '',
                    status: '',
                }
            }
        },
        mounted() {

        },

        methods: {

            //跳转
            lookDay(item) {
                //拿到观测时间日期和day
                this.$utils.setStorage("observationDataDetail", );
                let routeData = this.$router.resolve({
                    path: "/observationDataDetail"
                });
                window.open(routeData.href, '_blank');
            },

           async  toSearch() {
               let params = new FormData();
               if(this.observationTime != null && this.observationTime.length > 0 ) {
                   this.beginTime = new Date(this.observationTime[0]);
                   this.endTime = new Date(this.observationTime[1]);
                   params.append("beginTime",this.beginTime);
                   params.append("endTime", this.endTime);
               }
               params.append("observationCoordinate", this.observationCoordinate);
               params.append("observationTarget", this.observationTarget);
               params.append("activityViews", this.activityViews);
               params.append("band", this.form.band);
               params.append("status", this.form.status);
               params.append("page", this.currentPage);
               params.append("limit", this.pageSize);
               let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_data_searchData, params, "POST");
               if(data.code == 200) {
                   this.tableData = data.data;
                   this.$refs.pageRef.totalCount = data.totalCount;
                   console.log(this.tableData);
               }
            }
        },


    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {

        .observationData {
            display: flex;
            flex-wrap: nowrap;
        }

        .dataTitle {
            font-size: 18px;
            margin-top: 10px;
            text-align: left;
        }

        .timeSelect {
            margin-top: 10px;
            font-size: 14px;
            text-align: left;
            margin-left: 30px;
        }

        .observeDetail {
            display: flex;
            flex-wrap: nowrap;
            margin-left: 26px;
        }

        .observeIcon {
            display: flex;
            flex-wrap: nowrap;
            width: 220px;
            margin-top: 10px;
        }

        .observeTail {
            display: flex;
            flex-wrap: nowrap;
            margin-left: 28px;
            width: 220px;
            margin-top: 10px;
        }

        .coordinate {
            width: 120px;
            font-size: 14px;
            margin-top: 13px;
        }

        .observeSelect {
            display: flex;
            flex-wrap: nowrap;
            margin-left: 26px;
            margin-top: 10px;
        }

        .activityView {
            display: flex;
            flex-wrap: nowrap;
            margin-left: 16px;
            margin-top: 10px;
        }

        .nd-news-list {
            position: relative;
            width: 900px;
        }

        .nd-list {
            width: 600px;
            height: 130px;
            display: flex;
            flex-wrap: nowrap;
        }

        .myCard {
            width: 680px;
            margin-top: 60px;
        }

        .searchBtn {
            margin-left: 20px;
            margin-top: 85px;
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

        .myCards1 {
            width: 170px;
            font-size: 12px;
            text-align: left;
        }

        .myCards2 {
            width: 170px;
            margin-top: 10px;
            font-size: 12px;
            text-align: left;
        }

        .nd-lists {
            position: absolute;
        }

        .nd-picture {
            width: 200px;
            height: 100px;
        }


        .nd-list-title {
            margin-left: 210px;
            display: flex;
            flex-wrap: nowrap;
        }

        .searchDay{
            margin-top: 20px;
        }

        .pageStyle {
            text-align: left;
        }

        .pagination {
            text-align: left;
        }
    }

</style>