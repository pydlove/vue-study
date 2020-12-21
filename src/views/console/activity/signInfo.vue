<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="报名信息"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
            <el-card>
                <el-form class="aiocw-form mt-20"
                        ref="searchform"
                        :model="searchform"
                        :inline="true"
                        :validate-on-rule-change="false"
                        label-width="80px"
                        label-position="right">

                    <el-form-item label="用户名称" prop="name">
                        <el-input
                                v-model="searchform.name"
                                class="wp-180 mr-10"
                                placeholder="请输入用户姓名"
                        >
                        </el-input>
                    </el-form-item>

                    <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                    <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
                </el-form>

                <div class="mb-10 mt-10">
                    <el-button class="aiocw-btn1" v-aba="['a']" type="primary" icon="el-icon-plus" size="small" @click="exporta()">导出报名信息</el-button>
                </div>

                <el-table
                        border
                        ref="codeTable"
                        :data="tableData"
                        @selection-change='onTableSelectChange'
                        @row-click='tableRowClick'
                        @expand-change='tableExpand'
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                >
                    <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                    <el-table-column prop="img" label="照片" width="100px" align="center">
                        <template slot-scope="scope">
                            <el-image
                                    :style="'width:' + photoWidth + 'px;height:' + photoHeight + 'px;'"
                                    :src="scope.row.photo"
                                    fit="fit"
                                    :preview-src-list="[scope.row.photo]"
                            ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true" align="center"></el-table-column>
                    <el-table-column prop="sex" label="性别" :show-overflow-tooltip="true" align="center">
                        <template slot-scope="scope">
                            {{ scope.row.sex == "0" ? "男":"女" }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="idcard" label="身份证" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="phone" label="联系方式" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="age" label="年龄" :show-overflow-tooltip="true" align="center"></el-table-column>
                    <el-table-column prop="score" label="学分" :show-overflow-tooltip="true" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status == '0' ? 'success':'info'" effect="dark">
                                {{ scope.row.status == '0' ? '活跃':'静默' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    export default {
        name: "signInfo",
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

            exporta() {
                window.open(this.$aiocUrl.console_service_v1_bl_user_export+ "?activityId=" + this.activity.id);
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("name",  this.searchform.name.trim());
                params.append("activityId", this.activity.id);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_user_signup_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            reseta() {
                this.searchform = {
                    name: "",
                };
                this.search(this.currentPage, this.pageSize)
            },
        },
        data() {
            return {
                dialogVisible: false,
                searchform: {
                    name: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
                photoWidth: 207*0.2,
                photoHeight: 313*0.2,
            }
        },
    }
</script>

<style scoped>
</style>

<style>
</style>