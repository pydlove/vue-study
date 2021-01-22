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
                    <el-button class="aioc-btn1" v-aiocp="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">增加</el-button>
                    <el-button v-aiocp="['d']" type="danger" icon="el-icon-delete" size="small" @click="deletea">批量删除</el-button>
                    <el-button v-aiocp="['d']" type="warning" icon="el-icon-close" size="small" @click="toggleSelection">取消选择</el-button>
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
                    <el-table-column fixed="right" label="操作" width="380">
                        <template slot-scope="scope">
                            <el-button
                                       size="mini"
                                       @click="detailRow(scope.row)">详情</el-button>
                            <el-button
                                    v-if="scope.row.status == '2'"
                                    size="mini"
                                    type="warning"
                                    icon="el-icon-warning-outline"
                                    @click="returnOpinionRow(scope.row)">驳回原因</el-button>
                            <el-button
                                    v-if="scope.row.status == '3'"
                                    size="mini"
                                    type="danger"
                                    icon="el-icon-warning-outline"
                                    @click="vetoOpinionRow(scope.row)">否决原因</el-button>
                            <el-button
                                    v-aiocp="['e']"
                                    v-if="scope.row.status == '0' || scope.row.status == '2' "
                                    size="mini"
                                    type="success"
                                    @click="editRow(scope.row)">编辑</el-button>
                            <el-button
                                    v-aiocp="['d']"
                                    v-if="scope.row.link == '0'"
                                    size="mini"
                                    type="danger"
                                    @click="deleteRow(scope.row)">删除</el-button>
                            <el-button class="aioc-btn1"
                                    v-aiocp="['cir']"
                                    v-if="scope.row.status == '0' || scope.row.status == '2' "
                                    size="mini"
                                    @click="circulationToNext(scope.row)">流转</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>
        </el-card>
        <Add ref="addRef" @search="search"></Add>
        <Edit ref="editRef" :currentPage="currentPage" :pageSize="pageSize" @search="search"></Edit>
        <ApproveCirculation ref="aproveCirculationRef" :currentPage="currentPage" :pageSize="pageSize" :approver="approver" @search="search"></ApproveCirculation>

        <el-dialog
                class="aiocw-dialog"
                :title="title"
                :visible.sync="opinionDialogVisible"
                :close-on-click-modal="false"
                :before-close="closeOpinion"
                :fullscreen="false"
                width="600px"
                center>
           <el-card>
               <div class="lh-28">{{title}}：{{opinion}}</div>
           </el-card>
        </el-dialog>

        <el-dialog
                class="aiocw-dialog"
                title="详情"
                :visible.sync="detailDialogVisible"
                :close-on-click-modal="false"
                :before-close="closeDetail"
                :fullscreen="false"
                width="800px"
                center>
            <el-card>
                <el-form
                        class= "pt-20 w-50 tapp-form"
                        :rules="rules"
                        ref="form"
                        :model="form"
                        :validate-on-rule-change="false"
                        label-width="120px"
                        label-position="right">
                    <el-form-item class="wp-460" label="审批单号：" prop="name" >
                        <span>{{detail.appNum}}</span>
                    </el-form-item>

                    <el-form-item class="wp-460" label="审批标题：" prop="name" >
                        <span>{{detail.title}}</span>
                    </el-form-item>

                    <el-form-item class="wp-460" label="审批描述：" prop="name" >
                        <span>{{detail.content}}</span>
                    </el-form-item>

                    <el-form-item class="wp-460" label="创建人员：" prop="name">
                        <span>{{detail.createUserName}}</span>
                    </el-form-item>

                    <el-form-item class="wp-460" label="创建时间：" prop="name">
                        <span>{{detail.createTime}}</span>
                    </el-form-item>

                    <el-form-item class="wp-460" label="审批人：" prop="name">
                        <span>{{detail.approverUserName}}</span>
                    </el-form-item>

                    <el-form-item class="wp-460" label="状态：" prop="name">
                        <span> {{formatLinkMethod(detail.status)}}</span>
                    </el-form-item>

                </el-form>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/console/finance/approve/add";
    import Edit from "@/views/console/finance/approve/edit";
    import ApproveCirculation from "@/views/console/finance/approve/approveCirculation";
    export default {
        name: "index",
        components: {Pagination, Add, Edit, ApproveCirculation},
        mounted() {
            this.search(0, 10);
            this.initApproveUser();
        },
        methods: {

            closeDetail() {
                this.detailDialogVisible = false;
                this.detail = {};
            },

            detailRow(row) {
                this.detailDialogVisible = true;
                this.detail = row;
            },

            closeOpinion() {
                this.opinionDialogVisible = false;
                this.opinion = "";
                this.title = "";
            },

            returnOpinionRow(row) {
                this.opinionDialogVisible = true;
                this.opinion = row.opinion;
                this.title = "驳回原因";
            },

            vetoOpinionRow(row) {
                this.opinionDialogVisible = true;
                this.opinion = row.opinion;
                this.title = "否决原因";
            },

            circulationToNext(row) {
                this.$refs.aproveCirculationRef.form = {
                    appNum: row.appNum,
                    title: row.title,
                    content: row.content,
                    createTime: row.createTime,
                    createUserName: row.createUserName,
                    createUser: row.createUser,
                    status: "1",
                    link: "1",
                    approverUser:"",
                    nextLinkName:"总控审批",
                };
                this.$refs.aproveCirculationRef.open();
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
                    appNum: row.appNum,
                    title: row.title,
                    content:  row.content,
                };
                this.$refs.editRef.open();
            },

            /**
             * 批量删除
             * 单行删除
             * 删除请求
             */
            deletea() {
                this.checkRowIds = [];
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for(var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.appNum + "\"");
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
                this.checkRowIds = [];
                this.checkRowIds.push("\"" + row.appNum + "\"");
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
                params.append("appNums", this.checkRowIds.toString());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_approve_delete, params, "POST");
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

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("title",  this.searchform.title);
                params.append("appNum",  this.searchform.appNum);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_approve_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
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
                        return "#999";
                    case "1":
                        return "#999";
                    case "2":
                        return "#E6A23C";
                    case "3":
                        return "red";
                    case "4":
                        return "#67C23A";
                    default :
                        return value;
                }
            },

            reseta() {
                this.searchform = {
                    title: "",
                    appNum: "",
                };
            },

            async initApproveUser() {
                let params = new FormData()
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_user_approver, params, "POST");
                if (data.code === 200) {
                    this.approver = data.data;
                    return true;
                }
            },
        },
        data() {
            return {
                bgClass: "aiocw",
                searchform: {
                    title: "",
                    appNum: "",
                },
                tableData: [],
                approver: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
                opinionDialogVisible: false,
                opinion: "",
                title: "",
                detailDialogVisible: false,
                detail: {},
            }
        },
    }
</script>

<style scoped>

</style>
<style>

</style>