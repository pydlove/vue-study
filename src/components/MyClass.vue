<template>
    <div>
        <el-divider content-position="left">
            已选课程
        </el-divider>
        <div>
            <el-table :data="activeClasses" border style="width: 100%">
                <el-table-column prop="name" label="班级名称"
                                 show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="mainName" label="课程大类"
                                 show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="subName" label="课程小类"
                                 show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="地点"
                                 show-overflow-tooltip="true"></el-table-column>
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
                <el-table-column prop="teacherName" label="老师"
                                 show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="score" label="获得学分" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作" width="120px">
                    <template slot-scope="scope">
                        <el-button type="" size="mini" @click="toEvaluation(scope.row)">
                            <div class="dfjc lh-20">
                                <i class="pingjia mr-10"></i>
                                去评价
                            </div>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="fr mt-10" ref="acPage" @search="initActiveClasses"></Pagination>
        </div>

        <el-divider content-position="left" class="mti-80">
            完结课程
        </el-divider>
        <div>
            <el-table :data="endClasses" border style="width: 100%">
                <el-table-column prop="name" label="班级名称"
                                 show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="mainName" label="课程大类"
                                 show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="subName" label="课程小类"
                                 show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="地点"
                                 show-overflow-tooltip="true"></el-table-column>
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
                <el-table-column prop="teacherName" label="老师"
                                 show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="score" label="获得学分" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作" width="120px">
                    <template slot-scope="scope">
                        <el-button type="" size="mini" @click="toEvaluation(scope.row)">
                            <div class="dfjc lh-20">
                                <i class="pingjia mr-10"></i>
                                去评价
                            </div>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="fr mt-10 mb-20" ref="ecPage" @search="initEndClasses"></Pagination>
        </div>
        <TeacherEvaluation ref="teacherEvaluationRef"></TeacherEvaluation>
    </div>
</template>

<script>
    import TeacherEvaluation from "@/components/TeacherEvaluation"
    import Pagination from "@/components/Pagination"

    export default {
        name: "MyClass",
        components: {TeacherEvaluation, Pagination},
        mounted() {
            this.initActiveClasses(0, 10);
            this.initEndClasses(0, 10);
        },
        methods: {

            async initActiveClasses(currentPage, pageSize) {
                this.acCurrentPage = currentPage;
                this.acPageSize = pageSize;
                let params = new FormData();
                params.append("page", this.acCurrentPage);
                params.append("limit", this.acPageSize);
                params.append("status", "0");
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_class_my_list, params, "POST");
                if (data.code === 200) {
                    this.activeClasses = data.data;
                    this.$refs.acPage.totalCount = data.totalCount;
                }
            },

            async initEndClasses(currentPage, pageSize) {
                this.ecCurrentPage = currentPage;
                this.ecPageSize = pageSize;
                let params = new FormData();
                params.append("page", this.ecCurrentPage);
                params.append("limit", this.ecPageSize);
                params.append("status", "1");
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_class_my_list, params, "POST");
                if (data.code === 200) {
                    this.endClasses = data.data;
                    this.$refs.ecPage.totalCount = data.totalCount;
                }
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

            toEvaluation(row) {
                console.log(row)
                this.$refs.teacherEvaluationRef.open();
                this.$refs.teacherEvaluationRef.setClassId(row.id);
                this.$refs.teacherEvaluationRef.setClassName(row.name + "-" + row.mainName + "-" + row.subName);
                this.$refs.teacherEvaluationRef.setTeacherName(row.teacherName);
                this.$refs.teacherEvaluationRef.setTeacherId(row.teacherId);
            },
        },
        data() {
            return {
                activeClasses: [],
                acCurrentPage: 1,
                acPageSize: 10,
                endClasses: [],
                ecCurrentPage: 1,
                ecPageSize: 10,
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
    }

    /*媒体查询（平板）*/
    @media screen and (min-width: 769px) and (max-width: 996px) {

    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {


    }
</style>

<style>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
    }
</style>