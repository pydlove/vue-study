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

                <el-form-item label="教师名称" prop="name">
                    <el-input
                            v-model="searchform.teacher"
                            class="wp-180 mr-10"
                            placeholder="请输入教师名称"
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
                <el-table-column prop="name" label="班级名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="startTime" label="开始时间" :show-overflow-tooltip="true"></el-table-column>
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
                <el-table-column prop="teacher" label="老师" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="capacity" label="已报名/容量" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                       <span class="color-fa5c26">{{scope.row.used}}</span> / <span class="color-67C23A"> {{scope.row.capacity}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="mainSubjects" label="课程大类" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="subSubjects" label="课程小类" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作"  fixed="right" width="200">
                    <template slot-scope="scope">
                            <el-button class="aioc-btn1"
                                    v-aba="['e']"
                                    size="mini"
                                    @click="editRow(scope.row)">编辑</el-button>
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
    import Add from "@/views/console/class/class/add";
    import Edit from "@/views/console/class/class/edit";
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
                var times = row.time.split("-");
                console.log(row)
                this.$refs.editRef.form = {
                    id: row.id,
                    name: row.name,
                    startTime: row.startTime,
                    endType: row.endType,
                    endTime: row.endTime,
                    frequency: row.frequency,
                    isRepeat: row.isRepeat,
                    week: row.week,
                    time: times,
                    teacher: row.teacher,
                    address: row.address,
                    capacity: row.capacity,
                    mainSubject: row.mainSubject,
                    subSubject: row.subSubject,
                    remark: row.remark,
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

            handleEnd(row) {
                const endType = row.endType;
                if(endType == "1") {
                    const frequency = row.frequency;
                    return "限次数" + "(" + frequency + ")";
                } else if (endType == "2") {
                    const endTime = row.endTime;
                    return "限日期" + "(" + endTime + ")";
                }
            },

            handleTime(row) {
                const isRepeat = row.isRepeat;
                const week = row.week;
                const time = row.time;
                if(isRepeat == "0") {
                    return "每天" + " / " + time;
                } else if (isRepeat == "1") {
                    return "隔天" + " / " + time;
                } else if (isRepeat == "2") {
                    return "每周" + " / " + week + " / " + time;
                } else if (isRepeat == "3") {
                    return "隔周" + " / " + week + " / " + time;
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
                this.tableData = [];
                for(var i=0; i < 10; i++) {
                    var endType = "";
                    var endTime = "";
                    var frequency = "";
                    var isRepeat = "0";
                    if (i>=0 && i<=5) {
                        endType = "1";
                        frequency = 12;
                    } else if (i>=5) {
                        endType = "2";
                        endTime = "2021-11-1";
                    }

                    if (i>=0 && i<=3) {
                        isRepeat = "0";
                    } else if (i>=3 && i <5) {
                        isRepeat = "1";
                    } else if (i>=5 && i <8) {
                        isRepeat = "2";
                    } else if (i>=8 && i <11) {
                        isRepeat = "3";
                    }

                    var uuidObj = {
                        id: "1",
                        name: "涂鸦一班",
                        startTime: "2020-11-1",
                        endTime: endTime,
                        endType: endType,
                        frequency: frequency,
                        isRepeat: isRepeat,
                        week: "周一",
                        time: "08:00:00-09:00:00",
                        teacher: "郭嘉",
                        address: "杭州市美都广场C座511",
                        capacity: 15,
                        used: 12,
                        mainSubjects: "绘画",
                        subSubjects: "涂鸦4-6",
                        remark: "绘画",
                        createTime: "2020-11-18 14:00:00",
                    };
                    this.tableData.push(uuidObj);
                }
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
                    teacher: "",
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