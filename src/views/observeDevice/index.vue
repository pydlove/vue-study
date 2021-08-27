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
                    <el-card class="nd-news-resource">
                        <div :style="active"  @mouseover="mouseOver" @mouseleave="mouseLeave"  @click="chase">CHASE 卫星</div>
                        <div :style="active1" @mouseover="mouseOver1" @mouseleave="mouseLeave1" @click="onset">ONSET 望远镜</div>
                        <div :style="active2" @mouseover="mouseOver2" @mouseleave="mouseLeave2" @click="weHot">WEHOT 望远镜</div>
                        <div :style="active3" @mouseover="mouseOver3" @mouseleave="mouseLeave3" @click="otherDevice">其他设备</div>
                    </el-card>
                </div>

                <div class="myCard">
                    <el-card class="nd-list"
                             v-for="(item, index) in this.tableData" :key="index">
                        <div class="nd-lists">
                            <el-image
                                    @click="lookDetail(item)"
                                    class="nd-picture"
                                    :src="item.picture"
                                    :preview-src-list="[item.picture]"
                            ></el-image>
                        </div>
                        <div class="nd-list-title" @click="lookDetail(item)">
                            <p class="myCards">{{item.title }}</p>
                        </div>
                    </el-card>

                </div>
            </div>
            <Page v-if="this.client" class="page" ref="pageRef" @search="search"></Page>
            <Pagination style="text-align: center" v-else class="pagination" ref="pageRef"
                        @search="search"></Pagination>
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
            let type = this.$route.query.type;
            if(type != null){
                this.type = type;
            }
            this.initDataList();
        },

        methods: {
            mouseOver: function(){
                this.active = 'color: #40a9ff; text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseLeave: function () {
                this.active = 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseOver1: function(){
                this.active1 = 'color: #40a9ff; text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseLeave1: function () {
                this.active1 = 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseOver2: function(){
                this.active2 = 'color: #40a9ff; text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseLeave2: function () {
                this.active2 = 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseOver3: function(){
                this.active3 = 'color: #40a9ff; text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },
            mouseLeave3: function () {
                this.active3 = 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px';
            },

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

            lookDetail(item) {
                this.$router.push({
                    path: '/observeDeviceDetail', query: {
                        id: item.id,
                        title: item.title, picture: item.picture,
                        picture: item.picture, content: item.content,
                        status: item.status, displayOrder: item.displayOrder,
                        createTime: item.createTime, enAuthor: item.enAuthor,
                        type: item.type,
                    }
                })
            },

            async initDataList() {
                let params = new FormData();
                params.append("type", this.type);
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_nd_observation_equipment_searchAll, params, "POST");
                if (data.code == 200) {
                    console.log(data.data);
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },
        },

        data() {
            return {
                active: 'text-align: center; font-size: 14px; text-align: left;  margin: 15px;',
                active1: 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px',
                active2: 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px',
                active3: 'text-align: center; font-size: 14px; text-align: left;  margin: 15px; margin-top: 30px',
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
            text-align: center;
        }

        .nd-list-top {
            margin-left: 10px;
            line-height: 2;
        }

        .myCard {
            display: flex;
            flex-wrap: wrap;
            width: 810px;
            margin-left: 10px;
        }

        .nd-card {
            width: 1200px;
            background: #f0f0f0;
        }

        .nd-news-resource {
            width: 170px;
            height: 230px;
            margin-left: 100px;
            margin-top: 10px;
        }

        .myCards {
            width: 200px;
            margin-top: 10px;
            font-size: 14px;
            text-align: left;
        }

    .myCards1 {
        width: 550px;
        margin-top: 16px;
        font-size: 14px;
        text-align: left;
    }

    .nd-list {
        width: calc(25% - 7.5px);
        margin-top: 10px;
        height: 230px;
        margin-left: 10px;
    }

   /* .nd-lists {
        position: absolute;
    }*/

    .nd-picture {
        width: 150px;
        height: 170px;
    }

    .nd-list-title {
       /* margin-left: 20px;*/
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