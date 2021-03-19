<template>
    <!--eslint-disable-->
    <div>
        <el-card class="app_main_card">
            <div slot="header" class="aa_return" @click="toMainPage">
                <i class="el-icon-arrow-left"></i>
                <div>
                    返回活动管理
                </div>
            </div>

            <div class="as_works_continer">
                <div v-show="showWorksDetailFlag" class="as_works_detail_continer">
                    <el-carousel height="160px">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <el-image
                                    style="width: 100%; height: 160px"
                                    :src="require('@/assets/img/em/tp2.png')"
                                    fit="fill"></el-image>
                        </el-carousel-item>
                    </el-carousel>
                    <div class="as_works_info">
                        <div>
                            <div style="font-size: 18px">1</div>
                            <div style="font-size: 16px">排名</div>
                        </div>
                        <div>
                            <div style="font-size: 18px">12530</div>
                            <div style="font-size: 16px">票数</div>
                        </div>
                        <div>
                            <div style="font-size: 18px">榜首</div>
                            <div style="font-size: 16px">当前</div>
                        </div>
                    </div>
                    <div class="as_work_people">1号 徐腾 38岁</div>
                    <div class="as_work_works">作品名称：我为祖国献石油</div>
                    <div class="as_works_fill">
                        <el-image
                                style="width: 100%; height: 400px; border-radius: 5px"
                                :src="require('@/assets/img/avatar/chengxiao.jpg')"
                                fit="fill"></el-image>
                    </div>
                    <div class="as_works_connect">
                        <a href="https://www.aiocloud.ltd/#/" target="_blank" style="color: #0C2AA4">爱启云科技</a>提供支持
                    </div>
                </div>
                <div :class="showWorksDetailFlag ? 'as_works_full_400':'as_works_full'">
                    <el-table
                            class="as_table"
                            :data="tableData"
                            stripe
                            border
                            style="width: 100%">
                        <el-table-column prop="id" label="编号"></el-table-column>
                        <el-table-column prop="author" label="作品">
                            <template slot-scope="scope">
                                <el-image style="width: 40px;height: 40px;" :src="fmtWorkImgs(scope.row)"
                                          fit="fill"></el-image>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="选手"></el-table-column>
                        <el-table-column prop="age" label="年龄"></el-table-column>
                        <el-table-column prop="rank" label="排名">
                            <template slot-scope="scope">
                                {{ scope.$index + 1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="voteNum" label="票数"></el-table-column>
                        <el-table-column prop="option" label="操作" fixed="right" width="120">
                            <template slot-scope="scope">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link"><i class="el-icon-more"></i></span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="showWorksDetail">作品详情</el-dropdown-item>
                                        <el-dropdown-item @click.native="showWorksVoteLog">投票日志</el-dropdown-item>
                                        <el-dropdown-item @click.native="showWorksGiftLog">礼物日志</el-dropdown-item>
                                        <el-dropdown-item @click.native="showWorksAlterTicket">修改票数</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                    <Pagination class="page" ref="pageRef"></Pagination>
                </div>
            </div>
        </el-card>
        <VoteLog ref="voteLogRef"></VoteLog>
        <GiftLog ref="giftLogRef"></GiftLog>
        <AlterTicket ref="alterTicketRef"></AlterTicket>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Pagination from "@/components/Pagination.vue"
    import VoteLog from "@/views/app/activity/voteLog.vue"
    import GiftLog from "@/views/app/activity/giftLog.vue"
    import AlterTicket from "@/views/app/activity/alterTicket.vue"

    export default {
        name: "sign",
        components: {Pagination, VoteLog, GiftLog, AlterTicket},
        mounted() {
        },
        methods: {

            fmtWorkImgs(row) {
                if(row.imgs != null && row.imgs != "") {
                    var imgArray = row.imgs.split(",");
                    return imgArray[0];
                } else {
                    return require('@/assets/img/icon/nopeople.jpg');
                }
            },

            /**
             * @desc 显示作品详情
             * @author lvjian
             */
            showWorksDetail() {
                this.showWorksDetailFlag = true;
            },

            /**
             * @desc 显示投票日志
             * @author lvjian
             */
            showWorksVoteLog() {
                this.showWorksDetailFlag = true;
                this.$refs.voteLogRef.open();
            },
            /**
             * @desc 显示礼物日志
             * @author lvjian
             */
            showWorksGiftLog() {
                this.$refs.giftLogRef.open();
            },
            /**
             * @desc 显示修改票数
             * @author lvjian
             */
            showWorksAlterTicket() {
                this.$refs.alterTicketRef.open();
            },

            toMainPage() {
                this.$emit("toPage", "main");
            },

            /**
             * 刷新页面的数据，从后台获取数据
             */
            async search(currentPage, pageSize, row) {
                this.currentPage = currentPage;
                this.pagesize = pageSize;
                let params = new FormData();
                params.append("page", this.currentPage);
                params.append("limit", this.pagesize);
                params.append("activityId", row.id);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            setFormContent(row) {
                /* console.log("触发setFormContent")
                 console.log(row)*/
                // 传递活动id给 search
                this.search(0, 10, row);


            }

        },
        data() {
            return {
                showWorksDetailFlag: false,
                tableData: [],
                currentPage: 0,
                pageSize: 10,
            }
        }
    }
</script>

<style scoped>
    .as_works_connect {
        margin: 20px;
        font-size: 14px;
        line-height: 40px;
        color: #666;
        font-weight: bold;
        text-align: center;
    }

    .as_works_fill {
        margin: 10px;
        border-radius: 5px
    }

    .as_work_works {
        margin: 10px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        width: 370px;
        font-size: 20px;
    }

    .as_work_people {
        margin: 10px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        width: 370px;
        font-size: 20px;
    }

    .as_works_info {
        height: 50px;
        background: #0C2AA4;
        margin: 10px;

        display: flex;
        flex-wrap: nowrap;
        padding: 10px;
        color: #ffffff;
    }

    .as_works_info > div:nth-of-type(1) {
        /*background: #1f2224;*/
        width: 33.33%;
        height: 50px;
        border-right: 1px solid #ffffff;
        line-height: 25px;
    }

    .as_works_info > div:nth-of-type(2) {
        /*background: #2b90ff;*/
        width: 33.33%;
        height: 50px;
        border-right: 1px solid #ffffff;
        line-height: 25px;
    }

    .as_works_info > div:nth-of-type(3) {
        /*background: #4caf50;*/
        width: 33.33%;
        height: 50px;
        line-height: 25px;
    }

    .as_work_ds_photo {

        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .as_works_full_400 {
        width: calc(100% - 400px);
    }

    .as_works_full {
        width: 100%;
    }

    .as_works_detail_continer {
        width: 370px;
        min-width: 370px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-right: 30px;
    }

    .as_works_continer {
        display: flex;
        flex-wrap: nowrap;
    }

    .el-icon-more {
        font-size: 16px;
        color: #666;
    }

    .el-icon-arrow-left {
        font-size: 18px;
        margin-right: 10px;
    }

    .aa_return {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
        font-size: 16px;
    }

    .aa_return:hover {
        color: #2b90ff;
    }

    .page {
        margin: 20px 0px;
        text-align: left;
    }
</style>