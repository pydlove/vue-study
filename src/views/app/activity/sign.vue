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
                <div class="as_works_full">
                    <el-table
                            class="as_table"
                            :data="tableData"
                            stripe
                            border
                            style="width: 100%">
                        <el-table-column prop="id" label="编号"></el-table-column>
                        <el-table-column prop="author" label="作品">
                            <template slot-scope="scope">
                                <el-image style="width: 40px;height: 40px;" :src="scope.row.imgs[0]"
                                          fit="fill"></el-image>
                            </template>
                        </el-table-column>
                        <el-table-column prop="author" label="选手"></el-table-column>
                        <el-table-column prop="age" label="年龄"></el-table-column>
                        <el-table-column prop="rank" label="排名"></el-table-column>
                        <el-table-column prop="votes" label="票数"></el-table-column>
                        <el-table-column prop="option" label="操作" fixed="right" width="120">
                            <template slot-scope="scope">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link"><i class="el-icon-more"></i></span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="showWorksDetail">作品详情</el-dropdown-item>
                                        <el-dropdown-item @click.native="showWorksVoteLog">投票日志</el-dropdown-item>
                                        <el-dropdown-item>礼物日志</el-dropdown-item>
                                        <el-dropdown-item>修改票数</el-dropdown-item>
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
    </div>
</template>
<!--eslint-disable-->
<script>
    import Pagination from "@/components/Pagination.vue"
    import VoteLog from "@/views/app/activity/voteLog.vue"
    export default {
        name: "sign",
        components: {Pagination,VoteLog},
        methods: {

            /**
             * @desc 显示作品详情
             * @author lvjian
             */
            showWorksDetail() {
                this.showWorksDetailFlag = true;


            },

            showWorksVoteLog() {
                this.showWorksDetailFlag = true;
                this.$refs.voteLogRef.open();
            },

            toMainPage() {
                this.$emit("toPage", "main");
            }
        },
        data() {
            return {
                showWorksDetailFlag: true,
                tableData: [
                    {
                        id: "1",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 1,
                        votes: 12530,
                    },
                    {
                        id: "2",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 2,
                        votes: 10235,
                    },
                    {
                        id: "3",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 3,
                        votes: 9823,
                    },
                    {
                        id: "4",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 4,
                        votes: 9725,
                    },
                    {
                        id: "5",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 5,
                        votes: 9023,
                    },
                    {
                        id: "6",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 6,
                        votes: 8925,
                    },
                    {
                        id: "7",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 7,
                        votes: 8826,
                    },
                    {
                        id: "8",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 8,
                        votes: 8236,
                    },
                    {
                        id: "9",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 9,
                        votes: 8162,
                    },
                    {
                        id: "10",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 10,
                        votes: 7230,
                    },
                ]
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
    .as_works_full {
        width: calc(100% - 400px);
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