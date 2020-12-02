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

                <el-form-item label="活动名称" prop="name">
                    <el-input
                            v-model="searchform.title"
                            class="wp-180 mr-10"
                            placeholder="请输入活动名称"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-button class="ml-20 aioc-btn" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
                <el-button class="aioc-btn1" v-aba="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">增加</el-button>
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
                <el-table-column prop="img" label="活动海报" width="122px">
                    <template slot-scope="scope">
                        <el-image
                                style="width: 100px; height: 50px"
                                :src="scope.row.poster"
                                fit="fit"
                                :preview-src-list="[scope.row.poster]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="活动主题" show-overflow-tooltip="true" width="150px"></el-table-column>
                <el-table-column prop="description" label="活动描述" show-overflow-tooltip="true" width="150px"></el-table-column>
                <el-table-column prop="time" label="活动时间" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="活动地点" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="peopleLimit" label="活动总人数" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="score" label="累计学分" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="cost" label="报名费用(¥)" show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isFree == '0'">
                            {{scope.row.cost}}
                        </div>
                        <div v-else>
                            {{免费}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="signupStart" label="报名开始时间" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="signupEnd" label="报名结束时间" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="teachers" label="负责人" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="status" label="活动状态" show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == 0 ? 'success':'info'" class="fb" effect="dark">
                            {{fmtActivityStatus(scope.row.status)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  fixed="right" width="260">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status == '1'">
                            <el-button class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="editRow(scope.row)">编辑</el-button>
                            <el-button
                                    v-aba="['d']"
                                    size="mini"
                                    type="danger"
                                    @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                            <el-button class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="preview(scope.row)">预览</el-button>
                        </div>
                        <div v-else>
                            <el-button class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="seeSignInfo(scope.row)">查看报名信息</el-button>
                            <el-button class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="preview(scope.row)">预览</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        </el-card>
        <Add ref="addRef" @search="search" :activeTeachers="activeTeachers"></Add>
        <Edit ref="editRef" @search="search" :activeTeachers="activeTeachers" :currentPage="currentPage" :pageSize="pageSize"></Edit>
        <SignInfo ref="signRef"></SignInfo>
        <Detail ref="detailRef"></Detail>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/console/activity/add";
    import Edit from "@/views/console/activity/edit";
    import SignInfo from "@/views/console/activity/signInfo";
    import Detail from "@/views/console/activity/detail";

    export default {
        name: "index",
        components: {Pagination, Add, Edit, SignInfo, Detail},
        mounted() {
            this.search(0, 10);
            this.initActiveTeacher();
        },
        methods: {

            add() {
                this.$refs.addRef.open();
            },

            async initActiveTeacher() {
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_teacher_active, {}, "GET");
                if (data.code === 200) {
                    this.activeTeachers = data.data;
                    return true;
                }
            },

            preview(row) {
                console.log(row)
                this.$refs.detailRef.open();
                this.$refs.detailRef.setActivity(row);
            },

            seeSignInfo(row) {
                console.log(row)
                this.$refs.signRef.open();
            },

            editRow(row) {
                var timeRange = [];
                timeRange.push(row.signupStart);
                timeRange.push(row.signupEnd);
                this.$refs.editRef.form = {
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    poster: row.poster,
                    startTime: row.startTime,
                    endTime: row.endTime,
                    address: row.address,
                    peopleLimit: row.peopleLimit,
                    score: row.score,
                    isFree: row.isFree,
                    cost: row.cost,
                    signupStart: row.signupStart,
                    signupEnd: row.signupEnd,
                    content: row.content,
                    status: row.status,
                    teacherIds: row.teacherIds.split(","),
                    timeRange: timeRange,
                };
                var posterArrays = row.poster.split("/");
                this.$refs.editRef.originalFileName = posterArrays[posterArrays.length - 1];
                this.$refs.editRef.fileName = posterArrays[posterArrays.length - 1];
                this.$refs.editRef.fileList = [{name: "", url: row.poster}];
                this.$refs.editRef.open();
            },

            /**
             * 批量删除
             * 单行删除
             * 删除请求
             */
            deletea() {
                this.checkRowIds = [];
                this.checkRowImgs = [];
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for(var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.id + "\"");
                    var imgArrays = row.poster.split("/");
                    this.checkRowImgs.push(imgArrays[imgArrays.length - 1]);
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
            deleteRow(index, row) {
                this.checkRowIds = [];
                this.checkRowImgs = [];
                this.checkRowIds.push("\"" + row.id + "\"");
                var imgArrays = row.poster.split("/");
                this.checkRowImgs.push(imgArrays[imgArrays.length - 1]);
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
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_activity_delete, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg("删除活动成功", "success");
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
                params.append("title",  this.searchform.title.trim());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_activity_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            reseta() {
                this.searchform = {
                    title: "",
                };
                this.search(this.currentPage, this.pageSize)
            },

            fmtActivityStatus(status) {
                switch (status) {
                    case "0":
                        return "报名中";
                    case "1":
                        return "未发布";
                    case "2":
                        return "进行中";
                    case "3":
                        return "已结束";
                    default:
                        return status;
                }
            },
        },
        data() {
            return {
                searchform: {
                    title: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                checkRowImgs: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,

                activeTeachers: "",
            }
        },
    }
</script>

<style scoped>

</style>
<style>
    .el-table__expanded-cell:hover {
        background: #ffffff !important;
    }
</style>