<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <Header></Header>
        <div class="nd-card">
            <el-breadcrumb v-if="this.client" separator-class="el-icon-arrow-right" class="nd-list-top">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>观测设备</el-breadcrumb-item>
            </el-breadcrumb>
            <div v-else class="nd-news-list">
                <div class="observation">
                    <el-card  class="nd-news-resource">
                        <div class="nd-news-resource-list" @click="chase">CHASE 卫星</div>
                        <div class="nd-news-resource-list" @click="onset">ONSET 望远镜</div>
                        <div class="nd-news-resource-list" @click="weHot">WEHOT 望远镜</div>
                        <div class="nd-news-resource-list" @click="otherDevice">其他设备</div>
                    </el-card>
                </div>
                <div class="myCard">
                    <el-card class="nd-list"
                             v-for="(item, index) in this.tableData" :key="index">
                        <div class="nd-lists">
                            <el-image
                                    class="nd-picture"
                                    :src="item.picture"
                                    :preview-src-list="[item.picture]"
                            ></el-image>
                        </div>
                        <div class="nd-list-title" @click="lookDetail(item)">
                            <p class="myCards">{{item.title }}</p>
                        </div>
                        <div class="nd-list-title">
                            <p class="myCards1"> {{item.createTime}}</p>
                        </div>
                    </el-card>
                </div>
                <Page v-if="this.client" class="page" ref="pageRef" @search="search"></Page>
                <Pagination v-else class="pagination" ref="pageRef" @search="search"></Pagination>
            </div>
        </div>
        <tail></tail>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Header from "@/components/headAndTail/head";
    import tail from "@/components/headAndTail/tail";
    import Page from "@/components/Page";
    import Pagination from "@/components/Pagination";

    export default {
        name: "index",
        components: {Header, tail, Page, Pagination},
        mounted() {
            this.initDataList();
        },

        methods: {
            chase() {
                this.initDataList();
            },
            onset() {
                this.type = "1";
                this.initDataList();
            },
            weHot() {
                this.type = "2";
                this.initDataList();
            },
            otherDevice() {
                this.type = "3";
                this.initDataList();
            },

            async initDataList() {
                let params = new FormData();
                params.append("type", this.type);
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_nd_observation_equipment_searchAll, params, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

        },

        data() {
            return {
                type: "0",
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
            display: flex;
            flex-wrap: nowrap;
            width: 900px;
        }

        .nd-list-top {
            margin-left: 10px;
            line-height: 2;
        }

        .myCard {
            width: 680px;
            margin-left: 10px;
        }

        .nd-card {
            width: 1200px;
            background: #f0f0f0;
        }

        .nd-news-resource {
            width: 170px;
            height: 210px;
            margin-left: 10px;
            margin-top: 10px;
        }

        .nd-news-resource-list {
            text-align: center;
            font-size: 14px;
            text-align: left;
            margin: 10px;
        }

        .myCards {
            width: 550px;
            margin-top: 16px;
            font-size: 16px;
            text-align: left;
        }

        .myCards1 {
            width: 550px;
            margin-top: 16px;
            font-size: 14px;
            text-align: left;
        }

        .nd-list {
            width: 810px;
            margin-top: 10px;
            position: relative;
            height: 140px;
        }

        .nd-lists {
            position: absolute;
        }

        .nd-picture {
            width: 200px;
            height: 100px;
        }

        .nd-list-title {
            margin-left: 230px;
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
        .observation {

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