<template>
    <!--eslint-disable-->
    <div>
        <!--<div class="dffn">-->
            <!--<div :class="(index%2 == 0?'mr-10':'') + ' aiocloud-card nd-obd-item'"-->
                 <!--v-for="(item, index) in tableData" :key="index">-->
                <!--<el-image-->
                        <!--class="nd-picture"-->
                        <!--:src="item.picture"-->
                <!--&gt;</el-image>-->
                <!--<div v-if="language == 'zh'" class="nd-list-title" @click="lookDetail(item, index)">-->
                    <!--<p>{{item.title }}</p>-->
                <!--</div>-->
                <!--<div v-else-if="language == 'en'" class="nd-list-title" @click="lookDetail(item, index)">-->
                    <!--<p>{{item.enTitle }}</p>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
            <!--<Pagination style="text-align: center" class="pagination" ref="pageRef"-->
                        <!--@search="search"></Pagination>-->


        <div class="nd-content1 aiocloud-card">
            <div v-if="language == 'zh'">
                <div  class="nd-news-title">{{this.form.title}}</div>
                <div class="nd-news-content" v-html="form.content"></div>
            </div>

            <div v-else-if="language == 'en'" >
                <div  class="nd-news-title">{{this.form.enTitle}}</div>
                <div class="nd-news-content" v-html="form.enContent"></div>
            </div>
        </div>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Page from "@/components/Page";
    import Pagination from "@/components/Pagination";

    export default {
        name: "OnSet",
        components: {Pagination},
        data() {
            return {
                language: "zh",
                type: "2",
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                clientWidth: document.body.clientWidth,

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
            }
        },
        mounted() {
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
                this.search(1, 10);
            },

            lookDetail(item, index) {
                this.$utils.setStorage("observeDeviceDetail", item);
                let routeData = this.$router.resolve({
                    path: "/observeDeviceDetail",
                    query: {
                        index: index,
                    }
                });
                window.open(routeData.href, '_blank');
            },


            async search(currentPage, pageSize) {
                this.pageSize = pageSize;
                this.currentPage = currentPage;
                let params = new FormData();
                params.append("type", "2");
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_nd_observation_equipment_searchListByType, params, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    if(this.tableData != null && this.tableData.length > 0) {
                        this.form = this.tableData[0];
                    }
                    // this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },
        },
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

        .nd-content > div:nth-of-type(1) {
            width: 200px;
            min-width: 200px;
            height: 300px;
            margin-right: 20px;
        }

        .nd-content > div:nth-of-type(2) {
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