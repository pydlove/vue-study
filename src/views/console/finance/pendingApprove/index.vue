<template>
    <div :class="bgClass + '-main'">
        <el-card :class="bgClass + '-card'" :style="'height:' + clientHeight + 'px;'">
            <el-card>
                <el-form :class="bgClass + '-form mt-20'"
                         ref="searchform"
                         :model="searchform"
                         :inline="true"
                         :validate-on-rule-change="false"
                         label-width="80px"
                         label-position="right">

                    <el-form-item label="审批标题" prop="name">
                        <el-input
                                v-model="searchform.title"
                                class="wp-180 mr-10"
                                placeholder="请输入审批标题"
                                prefix-icon="el-icon-search">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="审批单号" prop="name">
                        <el-input
                                v-model="searchform.appNum"
                                class="wp-180 mr-10"
                                placeholder="请输入审批单号"
                                prefix-icon="el-icon-search">
                        </el-input>
                    </el-form-item>

                    <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                    <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
                </el-form>

                <div class="mb-10 mt-40">
                </div>

                <el-table
                        :class="bgClass == 'aiocw' ? '':'aioc-table'"
                        :border="bgClass == 'aiocw'"
                        ref="codeTable"
                        :data="tableData"
                        @selection-change='onTableSelectChange'
                        @row-click='tableRowClick'
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                >
                    <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                    <el-table-column prop="appNum" label="审批单号" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="title" label="申请标题" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="content" label="申请内容" :show-overflow-tooltip="true" :formatter="formatRole"></el-table-column>
                    <el-table-column prop="createUserName" label="申请人" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="approverUserName" label="审批人" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="status" label="工单状态" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span :style="'color:' + formatLinkColor(scope.row.status)">
                                {{formatLinkMethod(scope.row.status)}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button
                                    v-aiocp="['apr']"
                                    size="mini"
                                    type="primary"
                                    @click="toApprove(scope.row)">审批</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>
        </el-card>
        <Approve ref="approveRef" :currentPage="currentPage" :pageSize="pageSize" @search="search"></Approve>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Approve from "@/views/console/finance/pendingApprove/approve";
    export default {
        name: "index",
        components: {Pagination, Approve},
        mounted() {
            this.search(0, 10);
        },
        methods: {

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_approve_master_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            reseta() {
                this.searchform = {
                    appNum: "",
                    title: "",
                };
            },

            toApprove(row) {
                this.$refs.approveRef.form = {
                    appNum: row.appNum,
                    title: row.title,
                    content: row.content,
                    createTime: row.createTime,
                    createUserName: row.createUserName,
                    createUser: row.createUser,
                    status: "",
                    link: "1",
                    opinion:"",
                };
                this.$refs.approveRef.open();
            },

            formatLinkMethod(value) {
                switch (value) {
                    case "0":
                        return "新建";
                    case "1":
                        return "待审批";
                    case "2":
                        return "审批驳回";
                    case "3":
                        return "否决";
                    case "4":
                        return "通过";
                    default :
                        return value;
                }
            },

            formatLinkColor(value) {
                switch (value) {
                    case "0":
                        return "#67C23A";
                    case "1":
                        return "#67C23A";
                    case "2":
                        return "#E6A23C";
                    case "3":
                        return "red";
                    case "4":
                        return "black";
                    default :
                        return value;
                }
            },
        },
        data() {
            return {
                bgClass: "aiocw",
                searchform: {
                    appNum: "",
                    title: "",
                },
                tableData: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
            }
        },
    }
</script>

<style scoped>

</style>
<style>

</style>