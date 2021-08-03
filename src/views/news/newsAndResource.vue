<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <Header></Header>
            <div class="nd-news-list">
                <el-card style=" width: 140px;;position: absolute; height: 152px;margin-left: 145px; margin-top: 10px;">
                   <div style="text-align: center">新闻与资源</div>
                </el-card>
                <div class="myCard" >
                    <p class="myCards" v-for="item in this.tableData" @click="lookDetail(item)">· {{item.createTime}}  {{item.title}}</p>
                </div>
                <el-pagination
                        :page-size="20"
                        :pager-count="11"
                        layout="prev, pager, next"
                        style="margin-right: 0px; color: #303133; flex-wrap: nowrap; text-align: right;margin-top: 345px;"
                        :total="1000">
                </el-pagination>
            </div>
            <tail style="margin-top: 373px"></tail>
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
        methods: {
            close() {

            },
            open() {

            },

            lookDetail(item){
                this.$router.push({path: '/detail', query: {id: item.id,
                        title: item.title , picture: item.picture,
                        picture: item.picture, content: item.content,
                        status: item.status, displayOrder: item.displayOrder,
                        createTime: item.createTime, enAuthor: item.enAuthor}})
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
            color: white;
            font-size: 13px;
            text-align: left;
            position: absolute;
            width: 1200px;
        }

        .nd-news-list {
            width: 1200px;
            height: 373px;
            background: #9a6e3a;
        }
        .myCard {
            position: absolute;
            width: 680px;
            margin: 10px;
            margin-left: 310px;
            background: #55a532;

        }

        .myCards {
            width: 550px;
            margin-top: 16px;
            font-size: 16px;
        }



    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {
    }
</style>