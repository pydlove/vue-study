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

                <el-form-item label="用户名称" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入用户名称"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-form-item label="用户账号" prop="name">
                    <el-input
                            v-model="searchform.account"
                            class="wp-180 mr-10"
                            placeholder="请输入用户账号"
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
                <el-table-column prop="name" label="角色名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="createTime" label="时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="remark" label="描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column fixed="right" label="操作" width="400">
                    <template slot-scope="scope">
                        <el-button class="aioc-btn1"
                                v-aba="['e']"
                                size="mini"
                                @click="editRow(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                v-aba="['d']"
                                size="mini"
                                type="danger"
                                @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                        <el-button
                                v-aba="['sf']"
                                size="mini"
                                type="success"
                                @click="userConfig(scope.$index, scope.row)">人员配置</el-button>
                        <el-button
                                v-aba="['pc']"
                                size="mini"
                                type="success"
                                @click="authorityConfig(scope.$index, scope.row)">权限配置</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        </el-card>
        <UserRoleConfig ref="userRoleConfigRef"></UserRoleConfig>
        <MenuAuthorityConfig ref="menuAuthorityConfigRef"></MenuAuthorityConfig>
        <Add ref="addRef"></Add>
        <Edit ref="editRef"></Edit>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import UserRoleConfig from "@/views/portal/role/userRoleConfig"
    import MenuAuthorityConfig from "@/views/portal/role/menuAuthorityConfig"
    import Add from "@/views/portal/role/add"
    import Edit from "@/views/portal/role/edit"

    export default {
        name: "index",
        components: {Pagination, UserRoleConfig, Add, Edit, MenuAuthorityConfig},
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
                    id: row.id,
                    name: '曹操',
                    createTime: '2020-11-22 11:22:11',
                };
                this.$refs.editRef.open();
            },

            userConfig(index, row) {
                this.$refs.userRoleConfigRef.lastCheckId = row.id;
                this.$refs.userRoleConfigRef.lastCheckName = row.name;
                this.$refs.userRoleConfigRef.dialogVisible = true;
                this.$refs.userRoleConfigRef.search();
            },

            authorityConfig(index, row) {
                this.$refs.menuAuthorityConfigRef.lastCheckId = row.id;
                this.$refs.menuAuthorityConfigRef.lastCheckName = row.name;
                this.$refs.menuAuthorityConfigRef.dialogVisible = true;
                this.$refs.menuAuthorityConfigRef.initCheckMenus();
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

            search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                this.tableData = [];
                for(var i=0; i < 10; i++) {
                    var uuidObj = {
                        id: i,
                        name: '超级管理员',
                        createTime: '2020-11-22 11:22:11',
                    };
                    this.tableData.push(uuidObj);
                }
                this.$refs.pageRef.totalCount = this.tableData.length;
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

            statusFormat(row, column) {
                const value = row[column.property];
                switch (value) {
                    case "active":
                        return "已激活";
                    case "lock":
                        return "已锁定";
                    case "freeze":
                        return "已冻结";
                    case "expired":
                        return "已过期";
                    default :
                        return value;
                }
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
                    account: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
                photoWidth: 50,
                photoHeight: 50,

            }
        },
    }
</script>


<style scoped>
    .xx-lable > span:nth-of-type(1) {
        display: inline-block;
        width: 90px;
        color: #99a9bf;
    }
    .xx-lable > span:nth-of-type(2) {
        display: inline-block;
        color: #303133;
    }
    .xx-lable {
        line-height: 40px;
    }
    .xx-text {
        width: 600px;
    }
</style>

<style>
    .el-table__expanded-cell:hover {
        background: #ffffff !important;
    }
</style>