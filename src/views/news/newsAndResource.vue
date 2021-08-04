<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <Header></Header>
        <el-card style="width: 1200px">
            <div class="nd-news-list">
                <el-card style="width: 170px;position: absolute; height: 210px;">
                    <p style="text-align: center; font-size: 16px; font-weight: bolder">新闻与资源</p>
                </el-card>
                <div class="myCard">
                    <el-card style="width: 810px; margin-top: 10px; position: relative; height: 140px"
                             v-for="item in this.tableData" >
                        <div style="position: absolute">
                            <el-image
                                    style="width: 200px; height: 100px; "
                                    :src="item.picture"
                                    :preview-src-list="[item.picture]"
                            ></el-image>
                        </div>
                        <div style="margin-left: 230px;" @click="lookDetail(item)">
                            <p class="myCards">{{item.title }}</p>
                        </div>
                        <div style="margin-left: 230px;">
                            <p class="myCards1">时间 {{item.createTime}}</p>
                        </div>
                    </el-card>
                    <Pagination class="pagination mt-20" style="margin-top: 20px; text-align: right;" ref="pageRef"
                                @search="search"></Pagination>
                </div>
            </div>
        </el-card>
        <tail></tail>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Header from "@/components/headAndTail/head";
    import tail from "@/components/headAndTail/tail";
    import Pagination from "@/components/Pagination";

    export default {
        name: "newsAndResource",
        components: {Header, tail, Pagination},
        mounted() {
            this.search(1, 10);
        },

        filters: {
            ellipsis(value) {
                if (!value) return '';
                if (value.length > 100) {
                    return value.slice(0, 100) + '...'
                }
                return value
            }
        },

        methods: {
            close() {

            },
            open() {

            },

            lookDetail(item) {
                this.$router.push({
                    path: '/detail', query: {
                        id: item.id,
                        title: item.title, picture: item.picture,
                        picture: item.picture, content: item.content,
                        status: item.status, displayOrder: item.displayOrder,
                        createTime: item.createTime, enAuthor: item.enAuthor
                    }
                })
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData();
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("title", this.title);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_new_and_resource_searchAll, params, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    console.log(this.tableData);
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },
        },

        data() {
            return {
                status: true,
                status1: false,
                title: "",
                tableData: [],
                currentPage: 1,
                pageSize: 10,
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
            width: 1200px;
        }

        .myCard {
            width: 680px;
            margin: 10px;
            margin-left: 190px;

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

    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {
    }
</style>