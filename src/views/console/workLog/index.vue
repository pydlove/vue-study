<template>
    <!--eslint-disable-->
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

                    <el-form-item label="日志标题" prop="name">
                        <el-input
                                v-model="searchform.title"
                                class="wp-180 mr-10"
                                placeholder="请输入日志标题"
                                prefix-icon="el-icon-search">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="领导" prop="name">
                        <el-input
                                v-model="searchform.leader"
                                class="wp-180 mr-10"
                                placeholder="请输入领导姓名"
                                prefix-icon="el-icon-search">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="状态" prop="name">
                        <el-select class="wdi-300" v-model="searchform.status" placeholder="请选择日志状态">
                            <el-option label="草稿" value="0"></el-option>
                            <el-option label="发布" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                    <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
                </el-form>
                <div class="mb-10 mt-40">
                    <el-button v-aiocp="['a']" type="primary" icon="el-icon-plus" size="small"  @click="add()">增加日志</el-button>
                </div>
                <el-table
                        :class="bgClass == 'aiocw' ? '':'aioc-table'"
                        :border="bgClass == 'aiocw'"
                        ref="tableRef"
                        :data="tableData"
                        @selection-change='onTableSelectChange'
                        @row-click='tableRowClick'
                        @cell-dblclick='seeDetail'
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                >
                    <el-table-column fixed="left" type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" align="center" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span :style="'color:' + formatStatusColor(scope.row.status)">
                                {{formatStatusMethod(scope.row.status)}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="日志标题" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="createUserName" label="作者" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="leader" label="领导" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button
                                       size="mini"
                                       type="success"
                                       @click="seeDetail(scope.row)">查看详情</el-button>
                            <el-button class="aioc-btn1"
                                       v-aiocp="['e']"
                                       size="mini"
                                       type="info"
                                       @click="edit(scope.row)">编辑</el-button>
                            <el-button
                                       v-aiocp="['d']"
                                       size="mini"
                                       type="danger"
                                       @click="deletea(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>
        </el-card>
        <Add ref="addRef" :leader="leader" @search="search"></Add>
        <Edit ref="editRef" :leader="leader" :currentPage="currentPage" :pageSize="pageSize" @search="search"></Edit>
        <Detail ref="detailRef" :leader="leader" ></Detail>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/console/workLog/add.vue";
    import Edit from "@/views/console/workLog/edit.vue";
    import Detail from "@/views/console/workLog/detail.vue";
    export default {
        name: "index",
        components: {Pagination, Add, Edit, Detail},
        mounted() {
            this.search(0, 10);
            this.initApproveUser();
        },
        methods: {
            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("leader",  this.searchform.leader.trim());
                params.append("title",  this.searchform.title.trim());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_work_log_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            add() {
                this.$refs.addRef.open();
            },

            edit(row) {
                this.$refs.editRef.form = {
                    id: row.id,
                    title: row.title,
                    content:  row.content,
                    createTime:  row.createTime,
                    updateTime:  row.updateTime,
                    createUser:  row.createUser,
                    createUserName:  row.createUserName,
                    leader:  row.leader,
                    toLeaderId:  row.toLeaderId,
                    remark:  row.remark,
                    status:  row.status,
                };
                this.$refs.editRef.open();
            },

            deletea(row) {
                this.checkRowIds = [];
                this.checkRowIds.push("\"" + row.id + "\"");
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
                params.append("ids", this.checkRowIds.toString());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_work_log_delete, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg("删除成功", "success");
                    this.search(this.currentPage, this.pageSize);
                    return true;
                }
            },

            seeDetail(row) {
                this.$refs.detailRef.form = {
                    id: row.id,
                    title: row.title,
                    content:  row.content,
                    createTime:  row.createTime,
                    updateTime:  row.updateTime,
                    createUser:  row.createUser,
                    createUserName:  row.createUserName,
                    leader:  row.leader,
                    toLeaderId:  row.toLeaderId,
                    remark:  row.remark,
                };
                this.$refs.detailRef.open();
            },

            async initApproveUser() {
                let params = new FormData()
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_user_approver, params, "POST");
                if (data.code === 200) {
                    this.leader = data.data;
                    return true;
                }
            },

            reseta() {
              this.searchform = {
                  leader: "",
                  title: "",
                  status: "",
              }
            },

            formatStatusMethod(value) {
                switch (value) {
                    case "0":
                        return "草稿箱";
                    case "1":
                        return "发布";
                    default :
                        return value;
                }
            },

            formatStatusColor(value) {
                switch (value) {
                    case "0":
                        return "#999";
                    case "1":
                        return "#67C23A";
                    default :
                        return value;
                }
            },
        },
        data() {
            return {
                bgClass: "aiocw",
                clientHeight: document.body.clientHeight-2,
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                currentPage: 0,
                pageSize: 10,
                leader: "",
                searchform: {
                    leader: "",
                    title: "",
                    status: "",
                }
            }
        },
    }
</script>

<style scoped>
</style>

<style>
</style>