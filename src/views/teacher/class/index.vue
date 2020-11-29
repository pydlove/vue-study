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

                <el-form-item label="班级名称" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入班级名称"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-button class="ml-20 aioc-btn" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
            </div>

            <el-table
                    class="aioc-table"
                    ref="roleTable"
                    :data="tableData"
                    @selection-change='onTableSelectChange'
                    @row-click='tableRowClick'
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'9px 1px'}"
            >
                <el-table-column prop="className" label="班级名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="subSubject" label="课程名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="schooltime" label="上课时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="上课地点" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="used" label="学生数量" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button class="aioc-btn1"
                                v-aba="['e']"
                                size="mini"
                                @click="classStudentManage(scope.row)">学生管理</el-button>
                        <!--<el-button  class="aioc-btn2"-->
                                   <!--v-aba="['e']"-->
                                   <!--size="mini"-->
                                   <!--@click="activityStudentManage(scope.row)">活动学生管理</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
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
                this.$refs.classStudentRef.initStudentList(row);
            },

            activityStudentManage(row) {
                this.$refs.activityStudentRef.open();
                this.$refs.activityStudentRef.initStudentList(row);
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
                        id: "1",
                        className: "涂鸦一班",
                        subSubject: "涂鸦4-6岁",
                        schooltime: "每周一上午9点",
                        address: "杭州市美都广场C座511",
                        used: 12,
                        capacity: 15,
                        unitTime: 2,
                        remainingTime: 10,
                        totalTime: 100,
                        status: "0",
                    },
                    {
                        id: "1",
                        className: "涂鸦一班",
                        subSubject: "涂鸦4-6岁",
                        schooltime: "每周一上午9点",
                        address: "杭州市美都广场C座511",
                        used: 12,
                        capacity: 15,
                        unitTime: 1,
                        remainingTime: 90,
                        totalTime: 100,
                        status: "0",
                    },
                    {
                        id: "1",
                        className: "涂鸦一班",
                        subSubject: "涂鸦4-6岁",
                        schooltime: "每周一上午9点",
                        address: "杭州市美都广场C座511",
                        used: 12,
                        capacity: 15,
                        unitTime: 1,
                        remainingTime: 90,
                        totalTime: 100,
                        status: "0",
                    },
                    {
                        id: "1",
                        className: "涂鸦一班",
                        subSubject: "涂鸦4-6岁",
                        schooltime: "每周一上午9点",
                        address: "杭州市美都广场C座511",
                        used: 12,
                        capacity: 15,
                        unitTime: 1,
                        remainingTime: 90,
                        totalTime: 100,
                        status: "0",
                    },
                    {
                        id: "1",
                        className: "涂鸦一班",
                        subSubject: "涂鸦4-6岁",
                        schooltime: "每周一上午9点",
                        address: "杭州市美都广场C座511",
                        used: 12,
                        capacity: 15,
                        unitTime: 1,
                        remainingTime: 90,
                        totalTime: 100,
                        status: "0",
                    },
                    {
                        id: "1",
                        className: "涂鸦一班",
                        subSubject: "涂鸦4-6岁",
                        schooltime: "每周一上午9点",
                        address: "杭州市美都广场C座511",
                        used: 12,
                        capacity: 15,
                        unitTime: 1,
                        remainingTime: 90,
                        totalTime: 100,
                        status: "0",
                    },
                    {
                        id: "1",
                        className: "涂鸦一班",
                        subSubject: "涂鸦4-6岁",
                        schooltime: "每周一上午9点",
                        address: "杭州市美都广场C座511",
                        used: 12,
                        capacity: 15,
                        unitTime: 1,
                        remainingTime: 90,
                        totalTime: 100,
                        status: "0",
                    },
                    {
                        id: "1",
                        className: "涂鸦一班",
                        subSubject: "涂鸦4-6岁",
                        schooltime: "每周一上午9点",
                        address: "杭州市美都广场C座511",
                        used: 12,
                        capacity: 15,
                        unitTime: 1,
                        remainingTime: 90,
                        totalTime: 100,
                        status: "0",
                    },
                    {
                        id: "1",
                        className: "涂鸦一班",
                        subSubject: "涂鸦4-6岁",
                        schooltime: "每周一上午9点",
                        address: "杭州市美都广场C座511",
                        used: 12,
                        capacity: 15,
                        unitTime: 1,
                        remainingTime: 0,
                        totalTime: 100,
                        status: "1",
                    },
                    {
                        id: "1",
                        className: "涂鸦一班",
                        subSubject: "涂鸦4-6岁",
                        schooltime: "每周一上午9点",
                        address: "杭州市美都广场C座511",
                        used: 12,
                        capacity: 15,
                        unitTime: 1,
                        remainingTime: 0,
                        totalTime: 100,
                        status: "1",
                    },
                ];
                this.$refs.pageRef.totalCount = this.tableData.length;
            },

            reseta() {
                this.searchform = {
                    name: "",
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