<template>
    <div>
        <el-dialog
            class="aiovl-dialog"
            title="投票日志信息"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :before-close="close"
            :fullscreen="false"
            width="1000px"
            center>
        <el-card class="auto-card wdi-900 pr">
            <el-table class="as_table"
                      :data="tableData"
                      stripe
                      border
                      style="width: 100%">
                <el-table-column prop="headImgUrlNickName" label="微信头像/昵称" width="400">
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
                <el-table-column prop="voteTime" label="投票时间"></el-table-column>
            </el-table>
            <Pagination class="page" ref="pageRef"></Pagination>
        </el-card>
             <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">取 消</el-button>
              <el-button class="wdi-120 aioc-btn1" type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
      import Pagination from "@/components/Pagination.vue"

      export default {
          name: "log",
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
                    voteTime: "2021.3.16",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        voteTime: "2021.3.16",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        voteTime: "2021.3.16",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        voteTime: "2021.3.16",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        voteTime: "2021.3.16",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        voteTime: "2021.3.16",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        voteTime: "2021.3.16",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        voteTime: "2021.3.16",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        voteTime: "2021.3.16",
                    },
                    {
                        headImgUrl: require('@/assets/img/avatar/longmao.png'),
                        nickName: "吕建",
                        sex: "男",
                        platId: "1",
                        voteTime: "2021.3.16",
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