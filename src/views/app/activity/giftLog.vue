<template>
    <div>
        <el-dialog
                class="aiovl-dialog"
                title="礼物日志信息"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
                <el-table class="as_table"
                          :data="tableData"
                          stripe
                          border
                          style="width: 100%">
                    <el-table-column prop="headImgUrlNickName" label="微信头像/昵称" width="200">
                        <template slot-scope="scope">
                            <div>
                                <div class="dffn ac">
                                    <el-image
                                            style="width: 50px; height: 50px; margin: 10px"
                                            :src="scope.row.headImgUrl"></el-image> {{ scope.row.nickName }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sex" label="性别"></el-table-column>
                    <el-table-column prop="platId" label="平台编号"></el-table-column>
                    <el-table-column prop="giftTime" label="赠礼时间">
                        <template slot-scope="scope">
                            <div style="width: 150px">{{scope.row.giftTime}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="gift" label="赠送的礼物"></el-table-column>
                    <el-table-column prop="giftNum" label="礼物数量"></el-table-column>
                </el-table>
                <Pagination class="page" ref="pageRef"></Pagination>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination.vue"

    export default {
        name: "giftLog",
        components: {Pagination},

        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;

            },
            open() {
                this.dialogVisible = true;
            },
        },

        data() {
            return {
                dialogVisible: false,
                tableData: [
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        giftTime: "2021.3.16 15:26:00",
                        gift: "花",
                        giftNum: "5",

                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        giftTime: "2021.3.16 15:26:00",
                        gift: "花",
                        giftNum: "5",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        giftTime: "2021.3.16 15:26:00",
                        gift: "花",
                        giftNum: "5",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        giftTime: "2021.3.16 15:26:00",
                        gift: "花",
                        giftNum: "5",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        giftTime: "2021.3.16 15:26:00",
                        gift: "花",
                        giftNum: "5",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        giftTime: "2021.3.16 15:26:00",
                        gift: "花",
                        giftNum: "5",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        giftTime: "2021.3.16 15:26:00",
                        gift: "花",
                        giftNum: "5",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        giftTime: "2021.3.16 15:26:00",
                        gift: "花",
                        giftNum: "5",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        giftTime: "2021.3.16 15:26:00",
                        gift: "花",
                        giftNum: "5",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        giftTime: "2021.3.16 15:26:00",
                        gift: "花",
                        giftNum: "5",
                    },

                ]
            }
        }
    }

</script>

<style scoped>
    .page {
        margin: 10px 0px;
        text-align: left;
    }
</style>