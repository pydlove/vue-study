<template>
    <div :class="bgClass + '-main'">
        <el-card :class="bgClass + '-card'" :style="'height:' + clientHeight + 'px;'">
            <el-card>
                <el-form :class="bgClass + '-form mt-20'"
                         ref="searchform"
                         :model="searchform"
                         :inline="true"
                         :validate-on-rule-change="false"
                         label-width="100px"
                         label-position="right">
                    <el-form-item label="活动名称" prop="name">
                        <el-input
                                v-model="searchform.title"
                                class="wp-180 mr-10"
                                placeholder="请输入活动名称"
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
                        ref="roleTable"
                        :data="tableData"
                        @selection-change='onTableSelectChange'
                        @row-dblclick='showDetail'
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                >

                    <el-table-column prop="img" label="活动海报" width="140px" align="center">
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
                    <el-table-column prop="description" label="活动描述" show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="startTime" label="活动开始时间" show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="endTime" label="活动结束时间" show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="address" label="活动地点" show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="peopleLimit" label="活动总人数" show-overflow-tooltip="true" align="center"></el-table-column>
                    <el-table-column prop="score" label="累计学分" show-overflow-tooltip="true" align="center"></el-table-column>
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
                    <el-table-column prop="teachers" label="负责人" show-overflow-tooltip="true" align="center"></el-table-column>
                    <el-table-column prop="status" label="活动状态" show-overflow-tooltip="true" align="center">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status == 0 ? 'success':'info'" class="fb" effect="dark">
                                {{fmtActivityStatus(scope.row.status)}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button v-aba="['e']"
                                       size="mini"
                                       type="text"
                                       @click="showDetail(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>
        </el-card>
        <Detail ref="detailRef"></Detail>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Detail from "@/views/teacher/activity/detail";

    export default {
        name: "index",
        components: {Pagination, Detail},
        mounted() {
            this.search(0, 10);
        },
        methods: {
            showDetail(row) {
                this.$refs.detailRef.open();
                this.$refs.detailRef.setActivity(row);
                if(row.status != '1') {
                    this.$refs.detailRef.search();
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
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_activity_teacher_list, params, "POST");
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
                bgClass: "aiocw",
                searchform: {
                    title: "",
                },
                tableData: [],
                checkRows: [],
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