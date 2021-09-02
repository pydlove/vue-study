<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <NormalHeader :currentMenu="'newsAndResource'"></NormalHeader>
        <div class="nd-card" >
            <el-breadcrumb v-if="this.client"  separator-class="el-icon-arrow-right" class="nd-list-top">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>新闻与资源</el-breadcrumb-item>
            </el-breadcrumb>

            <el-card v-else class="nd-news-resource">
                <div class="nd-news-resource-list">新闻与资源</div>
            </el-card>

            <div class="nd-news-list">
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
                        <div class="nd-list-title"  @click="lookDetail(item)">
                            <p class="myCards">{{item.title }}</p>
                        </div>
                        <div  class="nd-list-title" >
                            <p class="myCards1"> {{item.createTime}}</p>
                        </div>
                    </el-card>
                    <Page v-if="this.client" class="page"  ref="pageRef" @search="search"></Page>
                    <Pagination v-else class="pagination"  ref="pageRef" @search="search"></Pagination>
                </div>
            </div>

        </div>
        <Footer></Footer>
    </div>
</template>
<!--eslint-disable-->
<script>
    import NormalHeader from "@/components/NormalHeader.vue";
    import Footer from "@/components/Footer";
    import Page from "@/components/Page";
    import Pagination from "@/components/Pagination";

    export default {
        name: "newsAndResource",
        components: {NormalHeader, Footer, Page, Pagination},
        mounted() {
            if(this.clientWidth < 500){
                this.client = true;
            }
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
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_new_and_resource_searchAll, params, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },
        },

        data() {
            return {
                title: "",
                client: false,
                status: true,
                status1: false,
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
            width: 900px;
        }

        .nd-list-top {
            margin-left: 10px;
            line-height: 2;
        }

        .myCard {
            width: 680px;
            margin-left: 100px;

        }

        .nd-card {
            width: 1200px;
            background: #f0f0f0;
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-news-resource {
            width: 170px;
            height: 210px;
            margin-left: 10px;
            margin-top: 10px;
        }

        .nd-news-resource-list {
            text-align: center;
            font-size: 16px;
            font-weight: bolder;
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