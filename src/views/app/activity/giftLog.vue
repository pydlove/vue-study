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
                                            :src="imgUrl"></el-image> {{ scope.row.nickName }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sex" label="性别"></el-table-column>
                    <el-table-column prop="id" label="平台编号"></el-table-column>
                    <el-table-column prop="createTime" label="赠礼时间">
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

            /**
             * 刷新页面的数据，从后台获取数据
             */
            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pagesize = pageSize;
                let params = new FormData();
                params.append("page", this.currentPage);
                params.append("limit", this.pagesize);
                params.append("signId", this.gift.id);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_gift_list, params, "POST");
                console.log(data);
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },


            setListContent(row) {
                this.gift =(row);
                this.search(0,10);
            },

            close() {
                this.dialogVisible = false;

            },
            open() {
                this.dialogVisible = true;
            },
        },

        data() {
            return {
                imgUrl: require('@/assets/img/icon/nopeople.jpg'),
                gift: "",
                dialogVisible: false,
                tableData: []
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