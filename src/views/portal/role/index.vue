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

                <el-form-item label="角色名称" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入内容"
                    >
                    </el-input>
                </el-form-item>
                <el-button class="ml-20 aioc-btn" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
                <el-button class="aioc-btn1" v-aiocp="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">增加</el-button>
                <el-button v-aiocp="['d']" type="danger" icon="el-icon-delete" size="small" @click="deletea">批量删除</el-button>
                <el-button v-aiocp="['d']" type="warning" icon="el-icon-close" size="small" @click="toggleSelection">取消选择</el-button>
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
                <el-table-column prop="name" label="角色名称" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div v-if="scope.row.name != '运维管理员aioc'">
                            {{scope.row.name}}
                        </div>
                        <div v-else @click="judgeIsAdmin">
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="remark" label="描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column fixed="right" label="操作" width="400">
                    <template slot-scope="scope">
                       <div v-if="scope.row.name != '运维管理员aioc'">
                           <el-button v-if="scope.row.name != '教师'"
                                      class="aioc-btn1"
                                      v-aiocp="['e']"
                                      size="mini"
                                      @click="editRow(scope.row)">编辑</el-button>
                           <el-button v-if="scope.row.name != '教师'"
                                   v-aiocp="['d']"
                                   size="mini"
                                   type="danger"
                                   @click="deleteRow(scope.row)">删除</el-button>
                           <el-button
                                   v-aiocp="['sf']"
                                   size="mini"
                                   type="success"
                                   @click="userConfig(scope.row)">人员配置</el-button>
                           <el-button
                                   v-aba="['pc']"
                                   size="mini"
                                   type="success"
                                   @click="authorityConfig(scope.row)">权限配置</el-button>
                       </div>
                        <div v-else-if="scope.row.name == '运维管理员aioc' && isAdmin">
                            <el-button class="aioc-btn1"
                                       size="mini"
                                       @click="editRow(scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="success"
                                    @click="userConfig(scope.row)">人员配置</el-button>
                            <el-button
                                    size="mini"
                                    type="success"
                                    @click="authorityConfig(scope.row)">权限配置</el-button>
                            <el-button
                                    size="mini"
                                    type="success"
                                    @click="closeIsAdmin">关闭权限</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        </el-card>
        <UserRoleConfig ref="userRoleConfigRef"></UserRoleConfig>
        <MenuAuthorityConfig ref="menuAuthorityConfigRef"></MenuAuthorityConfig>
        <Add ref="addRef" @search="search" ></Add>
        <Edit ref="editRef" @search="search" :currentPage="currentPage" :pageSize="pageSize"></Edit>
        <IsAdmin ref="isAdminRef" @setIsAdmin="setIsAdmin"></IsAdmin>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import UserRoleConfig from "@/views/portal/role/userRoleConfig"
    import MenuAuthorityConfig from "@/views/portal/role/menuAuthorityConfig"
    import Add from "@/views/portal/role/add"
    import Edit from "@/views/portal/role/edit"
    import IsAdmin from "@/views/portal/role/isAdmin"

    export default {
        name: "index",
        components: {Pagination, UserRoleConfig, Add, Edit, MenuAuthorityConfig, IsAdmin},
        mounted() {
            this.search(0, 10);
        },
        methods: {
            judgeIsAdmin() {
                this.$refs.isAdminRef.form.pwd = "aiocloud@admin";
                this.$refs.isAdminRef.open();
            },

            setIsAdmin() {
                this.isAdmin = true;
            },

            closeIsAdmin() {
                this.isAdmin = false;
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("name",  this.searchform.name);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_role_list, params, "POST");
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
                    name: row.name,
                    remark: row.remark,
                };
                this.$refs.editRef.open();
            },

            userConfig(row) {
                this.$refs.userRoleConfigRef.lastCheckId = row.id;
                this.$refs.userRoleConfigRef.lastCheckName = row.name;
                this.$refs.userRoleConfigRef.open();
                this.$refs.userRoleConfigRef.search();
            },

            authorityConfig(row) {
                this.$refs.menuAuthorityConfigRef.lastCheckId = row.id;
                this.$refs.menuAuthorityConfigRef.lastCheckName = row.name;
                this.$refs.menuAuthorityConfigRef.initCheckMenus();
                this.$refs.menuAuthorityConfigRef.initTreeData();
                this.$refs.menuAuthorityConfigRef.open();
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
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest();
                }).catch(() => {
                });

            },
            deleteRow(row) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checkRowIds = [];
                    this.checkRowIds.push("\"" + row.id + "\"");
                    this.deleteRequest();
                }).catch(() => {
                });
            },
            async deleteRequest() {
                let params = new FormData()
                params.append("ids", this.checkRowIds.toString());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_role_delete, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg("删除角色成功", "success");
                    this.search(this.currentPage, this.pageSize);
                    return true;
                }
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
                isAdmin: false,
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