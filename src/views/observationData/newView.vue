<template>
    <!--eslint-disable-->
    <div>
        <div style="text-align: left; margin-left: 10px">
            <el-radio v-model="radio" label="1" @change = "week">一周以内</el-radio>
            <el-radio v-model="radio" label="2" @change="month">一个月以内</el-radio>
        </div>

        <div class="nd-news-list" v-if="this.tableData.length > 0" >
            <div class="myCard">
                <div class="nd-list" v-for="(item, index) in this.tableData" :key="index">
                    <div class="nd-lists">
                        <el-image
                                class="nd-picture"
                                :src="item.picture"
                                :preview-src-list="[item.picture]"></el-image>
                    </div>
                    <div class="nd-list-title" >
                        <p class="myCards1"> 波长： {{ fmt(item, 'WAVELNTH')}}</p>
                        <p class="myCards1"> 半径： {{ fmt(item, 'CRRADIUS')}}</p>
                    </div>
                    <div  class="nd-list-title" >
                        <p class="myCards1"> 观测目标：{{fmt(item, 'OBJECT')}}</p>
                        <p class="myCards1"> 曝光时间： {{ item.exposureTime}}</p>
                    </div>
                    <div  class="nd-list-title" >
                        <p class="myCards1"> 观测坐标：{{item.coordinates}}</p>
                        <p class="myCards1" v-if="item.video != '' && item.video != null" @click="downLoad"> 观测视频: 下载</p>
                    </div>
                    <div  class="nd-list-title" >
                        <p class="myCards1"> 望远镜：{{fmt(item, 'TELESCOP')}}</p>
                    </div>

                </div>
            </div>
        </div>
        <div v-else>
            <van-empty image="search" description="暂无观测数据"/>
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
            this.initNewData();
        },
        methods: {
            fmt(item, key) {
                var json = JSON.parse(item.dataDetail);
                return json[key];
            },

            week() {
              this.beginTime = this.$utils.lastWeek();
              console.log(this.beginTime);
              this.endTime = this.$utils.nowDate();
              this.initNewData();
            },
            month() {
               this.beginTime = this.$utils.lastMonth();
                console.log(this.beginTime);
                this.endTime = this.$utils.nowDate();
                this.initNewData();
            },

            async initNewData(){
                let params = new FormData();
                params.append("beginTime", this.beginTime);
                params.append("endTime", this.endTime);
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_data_searchNewData, params, "POST");
                if(data.code == 200) {
                    this.tableData = data.data;
                    for( var i = 0; i < this.tableData.length; i++) {
                        var json = JSON.parse(this.tableData[i].dataDetail);
                        this.dataDetail.push(json);
                    }
                    console.log(this.dataDetail);
                    console.log(this.tableData);
                    return true;
                }
            },
        },
        data() {
            return {
                beginTime: "",
                endTime: "",
                currentPage: 1,
                pageSize: 4,
                tableData: [],
                radio: '1',
                dataDetail: [],
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {

        .page {
            text-align: left;
        }
        .nd-breadcrumb-top{
            text-align: left;
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

        .nd-news-list {
            position: relative;
            width: 900px;
        }

        .nd-list-top {
            margin-left: 10px;
            line-height: 2;
        }

        .myCard {
            width: 680px;
            margin-top: 40px;
        }

        .myCards1 {
            width: 200px;
            margin-top: 10px;
            font-size: 12px;
            text-align: left;
        }

        .nd-list {
            width: 600px;
            position: relative;
            height: 130px;
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