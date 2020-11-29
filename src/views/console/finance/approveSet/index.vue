<template>
    <div class="f-main">
        <el-card class="aioc-card" :style="'height:' + clientHeight + 'px;'">
            <el-form class="aioc-form mt-20"
                     ref="searchform"
                     :model="searchform"
                     :inline="true"
                     :validate-on-rule-change="false"
                     label-width="80px"
                     label-position="right">

                <el-form-item label="审批角色" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入审批角色"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-button class="ml-20 aioc-btn" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
                <el-button class="aioc-btn1" v-aba="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">增加</el-button>
                <el-button v-aba="['d']" type="danger" icon="el-icon-delete" size="small" @click="deletea">批量删除</el-button>
                <el-button v-aba="['d']" type="warning" icon="el-icon-close" size="small" @click="toggleSelection">取消选择</el-button>
            </div>

            <el-table
                    class="aioc-table"
                    ref="codeTable"
                    :data="tableData"
                    @selection-change='onTableSelectChange'
                    @row-click='tableRowClick'
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'9px 1px'}"
            >
                <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                <el-table-column sortable prop="userName" label="用户名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column sortable prop="approveRole" label="审批角色" :show-overflow-tooltip="true" :formatter="formatRole"></el-table-column>
                <el-table-column sortable prop="createTime" label="更新时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button
                                v-aba="['e']"
                                size="mini"
                                type="success"
                                @click="editRow(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                v-aba="['d']"
                                size="mini"
                                type="danger"
                                @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        </el-card>
        <Add ref="addRef"></Add>
        <Edit ref="editRef"></Edit>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/console/finance/approveSet/add";
    import Edit from "@/views/console/finance/approveSet/edit";
    export default {
        name: "index",
        components: {Pagination, Add, Edit},
        mounted() {
            this.search(0, 10);
        },
        methods: {
            /**
             * 增加
             */
            add() {
                this.$refs.addRef.open();
            },

            /**
             * 编辑
             */
            editRow(row) {
                this.$refs.editRef.form = {
                    id: 1,
                    userName: row.userName,
                    userAccount: row.userAccount,
                    approveRole: row.approveRole,
                    createTime: row.createTime,
                };
                this.$refs.editRef.open();
            },

            /**
             * 批量删除
             * 单行删除
             * 删除请求
             */
            deletea() {
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for(var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.id + "\"");
                }
                this.deleteRequest();
            },
            deleteRow(index, row) {
                this.checkRowIds = [];
                this.checkRowIds.push("\"" + row.id + "\"");
                this.deleteRequest();
            },
            deleteRequest() {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
            },

            tableRowClick(row) {
                this.$refs.codeTable.toggleRowSelection(row);
            },
            onTableSelectChange(rows) {
                this.checkRows = rows;
            },
            toggleSelection() {
                this.$refs.codeTable.clearSelection();
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                // let params = new FormData()
                // params.append("page", this.currentPage);
                // params.append("limit", this.pageSize);
                // params.append("name",  this.searchform.name);
                // let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_role_list, params, "POST");
                // if (data.code === 200) {
                //     this.tableData = data.data;
                //     this.$refs.pageRef.totalCount = data.totalCount;
                //     return true;
                // }
                this.tableData = [
                    {
                        id: 1,
                        userName: "张辽",
                        userAccount: "zhangsan",
                        approveRole: "二级管理员",
                        createTime: "2020-11-21 12:56:16"
                    },
                    {
                        id: 2,
                        userName: "曹操",
                        userAccount: "zhangsan",
                        approveRole: "超级管理员",
                        createTime: "2020-11-21 12:56:16"
                    }
                ];
                this.$refs.pageRef.totalCount = this.tableData.length;
            },

            reseta() {
                this.searchform = {
                    name: "",
                    status: "",
                };
            },
        },
        data() {
            return {
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
            }
        },
    }
</script>

<style scoped>

</style>
<style>

</style>