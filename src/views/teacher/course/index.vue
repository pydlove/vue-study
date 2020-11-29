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

                <el-form-item label="课程名称" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入课程名称"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-form-item label="课程状态" prop="name">
                    <el-select v-model="searchform.status" placeholder="请选择">
                        <el-option label="持续中" value="0"></el-option>
                        <el-option label="已结课" value="1"></el-option>
                    </el-select>
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
                <el-table-column prop="endType" label="结束方式" width="280" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{handleEnd(scope.row)}}
                    </template>
                </el-table-column>
                <!--<el-table-column prop="unitTime" label="单节时长" >-->
                    <!--<template slot-scope="scope">-->
                        <!--{{scope.row.unitTime + "（" + (scope.row.unitTime * 60) + "分钟）"}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="consumptionTime" label="已消费课时" >-->
                    <!--<template slot-scope="scope">-->
                        <!--{{scope.row.totalTime - scope.row.remainingTime}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="remainingTime" label="剩余课时" ></el-table-column>-->
                <!--<el-table-column prop="totalTime" label="总课时" ></el-table-column>-->
                <el-table-column prop="status" label="状态" >
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == '0' ? 'success':'info'" effect="dark">
                            {{ scope.row.status == '0' ? '持续中':'已结课' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button class="aioc-btn"
                                v-aba="['e']"
                                size="mini"
                                type="primary"
                                @click="carryOutClass(scope.row)">已上课</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        </el-card>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    export default {
        name: "index",
        components: {Pagination},
        mounted() {
            this.search(0, 10);
        },
        methods: {
            handleEnd(row) {
                const endType = row.endType;
                if(endType == "1") {
                    const frequency = row.frequency;
                    return "限次数" + "(剩余次数/总次数 - " + frequency + "/" + row.remainingTime + ")";
                } else if (endType == "2") {
                    const endTime = row.endTime;
                    return "限日期" + "(" + endTime + ")";
                }
            },

            carryOutClass(row) {
                var temp = [];
                var remainingTime = row.remainingTime - row.unitTime;
                if(remainingTime <= 0) {
                    this.$promptMsg("课程已结束", "info");
                }
                row.remainingTime = remainingTime;
                for(var i in this.tableData) {
                    if(this.tableDat[i].id == row.id ){
                        temp.push(row);
                    } else {
                        temp.push(this.tableDat[i]);
                    }
                }
                this.tableData = temp;
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
                        schooltime: "每周 / 周一 / 08:00:00-09:00:00",
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
                        schooltime: "每周 / 周一 / 08:00:00-09:00:00",
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
                        schooltime: "每周 / 周一 / 08:00:00-09:00:00",
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
                        schooltime: "每周 / 周一 / 08:00:00-09:00:00",
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
                        schooltime: "每周 / 周一 / 08:00:00-09:00:00",
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
                        schooltime: "每周 / 周一 / 08:00:00-09:00:00",
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
                        schooltime: "每周 / 周一 / 08:00:00-09:00:00",
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
                        schooltime: "每周 / 周一 / 08:00:00-09:00:00",
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
                        schooltime: "每周 / 周一 / 08:00:00-09:00:00",
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
                        schooltime: "每周 / 周一 / 08:00:00-09:00:00",
                        address: "杭州市美都广场C座511",
                        used: 12,
                        capacity: 15,
                        status: "1",
                    },
                ];
                this.$refs.pageRef.totalCount = this.tableData.length;
                this.tableData = [];
                for(var i=0; i < 10; i++) {
                    var endType = "";
                    var endTime = "";
                    var frequency = "";
                    var status = "1";
                    if (i>=0 && i<=5) {
                        endType = "1";
                        frequency = 12;
                        status = "0";
                    } else if (i>=5) {
                        endType = "2";
                        endTime = "2021-11-1";
                    }


                    var uuidObj = {
                        id: "1",
                        className: "涂鸦一班",
                        mainSubjects: "绘画",
                        subSubject: "涂鸦4-6岁",
                        schooltime: "每周 / 周一 / 08:00:00-09:00:00",
                        address: "杭州市美都广场C座511",
                        capacity: 15,
                        used: 12,
                        teacher: "郭嘉",

                        startTime: "2020-11-1",
                        endTime: endTime,
                        endType: endType,
                        frequency: frequency,
                        remainingTime: 10,

                        status: status,
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