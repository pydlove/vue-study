<template>
    <div :class="bgClass + '-main'">
        <el-card :class="bgClass + '-card'" :style="'height:' + clientHeight + 'px;'">
            <el-card>
                <el-form :class="bgClass + '-form mt-20'"
                         ref="searchform"
                         :model="searchform"
                         :inline="true"
                         :validate-on-rule-change="false"
                         label-width="120px"
                         label-position="right">

                    <el-form-item label="班级名称" prop="name">
                        <el-input
                                v-model="searchform.name"
                                class="wp-180 mr-10"
                                placeholder="请输入班级名称"
                        >
                        </el-input>
                    </el-form-item>

                    <el-form-item label="课程大类名称" prop="name">
                        <el-input
                                v-model="searchform.mainName"
                                class="wp-180 mr-10"
                                placeholder="请输入教师名称"
                        >
                        </el-input>
                    </el-form-item>

                    <el-form-item label="课程小类名称" prop="name">
                        <el-input
                                v-model="searchform.subName"
                                class="wp-180 mr-10"
                                placeholder="请输入教师名称"
                        >
                        </el-input>
                    </el-form-item>

                    <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                    <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
                </el-form>

                <el-table
                        :class="bgClass == 'aiocw' ? '':'aioc-table'"
                        :border="bgClass == 'aiocw'"
                        ref="codeTable"
                        :data="tableData"
                        @selection-change='onTableSelectChange'
                        @row-click='tableRowClick'
                        @cell-dblclick='classStudentManage'
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                >
                    <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                    <el-table-column fixed="left" prop="name" label="班级名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="startDate" label="开始时间" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="endType" label="结束方式" width="200" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{handleEnd(scope.row)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="isRepeat" width="300" label="时间" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{handleTime(scope.row)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="capacity" label="已报名/容量" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span class="color-fa5c26">{{scope.row.used}}</span> / <span class="color-67C23A"> {{scope.row.capacity}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mainName" label="课程大类" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="subName" label="课程小类" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="score" label="获得学分" :show-overflow-tooltip="true" align="center"></el-table-column>
                    <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="操作"  fixed="right" width="120" align="center">
                        <template slot-scope="scope">
                            <el-button class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="classStudentManage(scope.row)">学生管理</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>
        </el-card>
        <Student ref="classStudentRef"></Student>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Student from "@/views/teacher/class/student";
    export default {
        name: "index",
        components: {Pagination, Student},
        mounted() {
            this.search(0, 10);
        },
        methods: {
            classStudentManage(row) {
                this.$refs.classStudentRef.open();
                this.$refs.classStudentRef.classId = row.id;
                this.$refs.classStudentRef.initStudentList(1, 10);
            },

            handleEnd(row) {
                const endType = row.endType;
                if(endType == "0") {
                    const frequency = row.frequency;
                    return "限次数" + "(" + frequency + ")";
                } else if (endType == "1") {
                    const endDate = row.endDate;
                    return "限日期" + "(" + endDate + ")";
                }
            },

            handleTime(row) {
                const isRepeat = row.isRepeat;
                const week = row.whichDay;
                const startTime = row.startTime;
                const endTime = row.endTime;
                if(isRepeat == "0") {
                    return "每天" + " / (" + startTime + " - " + endTime + ")";
                } else if (isRepeat == "1") {
                    return "隔天" + " / (" + startTime + " - " + endTime + ")";
                } else if (isRepeat == "2") {
                    return "每周" + " / " + week + " / (" + startTime + " - " + endTime + ")";
                } else if (isRepeat == "3") {
                    return "隔周" + " / " + week + " / (" + startTime + " - " + endTime + ")";
                }
            },

            async search(currentPage, pageSize) {
                const aioctoken = this.$utils.getStorage("aioctoken");
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("name",  this.searchform.name.trim());
                params.append("mainName",  this.searchform.mainName.trim());
                params.append("subName",  this.searchform.subName.trim());
                params.append("teacherId",  aioctoken.id);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_class_teacher_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            reseta() {
                this.searchform = {
                    name: "",
                    mainName: "",
                    subName: "",
                };
                this.search(this.currentPage, this.pageSize)
            },
        },
        data() {
            return {
                bgClass: "aiocw",
                searchform: {
                    name: "",
                    teacherName: "",
                    mainName: "",
                    subName: "",
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