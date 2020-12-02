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

                <el-form-item label="注册码" prop="name">
                    <el-input
                            v-model="searchform.code"
                            class="wp-180 mr-10"
                            placeholder="请输入注册用户姓名">
                    </el-input>
                </el-form-item>

                <el-form-item label="注册用户" prop="name">
                    <el-input
                            v-model="searchform.username"
                            class="wp-180 mr-10"
                            placeholder="请输入注册用户姓名">
                    </el-input>
                </el-form-item>

                <el-form-item label="状态" prop="name">
                    <el-select v-model="searchform.status" placeholder="请选择状态">
                        <el-option label="可用" value="0"></el-option>
                        <el-option label="已使用" value="1"></el-option>
                    </el-select>
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
                <el-table-column prop="code" label="注册码" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="username" label="注册用户" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="status" label="状态" fixed="right">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == '0' ? 'success':'info'" effect="dark">
                            {{ scope.row.status == '0' ? '可用':'已使用' }}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        </el-card>
        <Add ref="addRef" @search="search"></Add>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/console/registrationCode/add";
    export default {
        name: "index",
        components: {Pagination, Add},
        mounted() {
            this.search(0, 10);
        },
        methods: {
            add() {
                this.$refs.addRef.open();
            },
            deletea() {
                for(var j in this.checkRows) {
                    var ele = this.checkRows[j];
                    if(ele.status == "1") {
                        this.$promptMsg("已注册的注册码不能够删除", "error");
                        return;
                    }
                }
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for(var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.code + "\"");
                }
                this.checkRowIds.push("\"" + row.code + "\"");
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest();
                }).catch(() => {
                });
            },

            async deleteRequest() {
                let params = new FormData()
                params.append("codes", this.checkRowIds.toString());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_code_delete, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg(data.msg, "success");
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

            getUUID() {
                return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("status", this.searchform.status);
                params.append("code",  this.searchform.code.trim());
                params.append("username",  this.searchform.username.trim());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_code_list, params, "POST");
                if (data.code === 200) {
                    console.log(data)
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            reseta() {
                this.searchform = {
                    code: "",
                    username: "",
                    status: "",
                };
                this.search(this.currentPage, this.pageSize);
            },
        },
        data() {
            return {
                searchform: {
                    code: "",
                    username: "",
                    status: "",
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