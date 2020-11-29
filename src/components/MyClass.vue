<template>
    <div>
        <el-divider content-position="left">
            已选课程
        </el-divider>
        <div>
            <el-table :data="subjects" border style="width: 100%">
                <el-table-column prop="main" label="课程大类" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="sub" label="课程小类" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="地点" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="time" label="时间" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="remainingClassTime" label="剩余课时（时）" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="classTime" label="总课时（时）" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="teacher" label="老师" show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作">
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
            <Pagination class="fr mt-10" ref="sPaginationRef"></Pagination>
        </div>

        <el-divider content-position="left" class="mti-80">
            完结课程
        </el-divider>
        <div>
            <el-table :data="endSubjects" border style="width: 100%">
                <el-table-column prop="main" label="课程大类" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="sub" label="课程小类" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="classTime" label="总课时（时）" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="score" label="课程学分" show-overflow-tooltip="true">
                    <template slot-scope="scope">
                                        <span :class="scope.row.score > 60 ? 'color-67C23A':'color-fa5c26'">
                                            {{scope.row.score}}
                                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="证书数量" show-overflow-tooltip="true">
                    <template slot-scope="scope">
                                        <span :class="scope.row.certificates.length > 0 ? 'color-67C23A':'color-fa5c26'">
                                            {{scope.row.certificates.length}}
                                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="teacher" label="授课老师" show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作">
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
            <Pagination class="fr mt-10 mb-20" ref="ePaginationRef"></Pagination>
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

        },
        methods: {
            toEvaluation(row) {
                this.$refs.teacherEvaluationRef.open();
                this.$refs.teacherEvaluationRef.setClassId(row.id);
                this.$refs.teacherEvaluationRef.setClassName(row.main + "-" + row.sub);
                this.$refs.teacherEvaluationRef.setTeacher(row.teacher);
            },
        },
        data() {
            return {
                subjects: [
                    {
                        id: "1",
                        main: "绘画",
                        sub: "中国画12岁以上",
                        address: "美都广场C座511",
                        time: "每周一下午两点",
                        teacher: "欧阳修",
                        classTime: "40",
                        remainingClassTime: "20",
                    },
                    {
                        id: "2",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        address: "丁兰广场C座511",
                        time: "每周一下午两点",
                        teacher: "欧阳修",
                        classTime: "40",
                        remainingClassTime: "20",
                    },
                    {
                        id: "2",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        address: "丁兰广场C座511",
                        time: "每周一下午两点",
                        teacher: "欧阳修",
                        classTime: "40",
                        remainingClassTime: "20",
                    },
                    {
                        id: "2",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        address: "丁兰广场C座511",
                        time: "每周一下午两点",
                        teacher: "欧阳修",
                        classTime: "40",
                        remainingClassTime: "20",
                    },
                    {
                        id: "2",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        address: "丁兰广场C座511",
                        time: "每周一下午两点",
                        teacher: "欧阳修",
                        classTime: "40",
                        remainingClassTime: "20",
                    },
                ],
                endSubjects: [
                    {
                        id: "3",
                        main: "绘画",
                        sub: "中国画12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "86",
                        certificates: [
                            {
                                id: "1",
                                no: "20200506898989",
                                name: "安徽柏林书画研究院三好学生",
                                getTime: "2020-11-6",
                            }
                        ],
                        teacher: "欧阳修",
                    },
                    {
                        id: "4",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "58",
                        certificates: [],
                        teacher: "李清照",
                    },
                    {
                        id: "4",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "58",
                        certificates: [],
                        teacher: "李清照",
                    },
                    {
                        id: "4",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "58",
                        certificates: [],
                        teacher: "李清照",
                    },
                    {
                        id: "4",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "58",
                        certificates: [],
                        teacher: "李清照",
                    },
                    {
                        id: "4",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "58",
                        certificates: [],
                        teacher: "李清照",
                    },
                    {
                        id: "4",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "58",
                        certificates: [],
                        teacher: "李清照",
                    },
                ],
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