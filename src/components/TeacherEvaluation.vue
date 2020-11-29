<template>
    <div>
        <el-dialog class="complain-dialog aiCloud-dialog"
                   :title="title"
                   :close-on-click-modal="false"
                   :visible.sync="dialogVisible"
                   width="600px"
                   center="true"
                   :before-close="close">
            <div>
                <el-form ref="form" :model="evaluationForm" label-position="top" label-width="80px" class="mp-base-edit">
                    <el-form-item label-width="100px" label="课程评分" prop="name">
                        <el-rate v-model="evaluationForm.classRate" :colors="colors"></el-rate>
                    </el-form-item>

                    <el-form-item  label-width="100px" label="老师评分" prop="name">
                        <el-rate v-model="evaluationForm.teacherRate" :colors="colors"></el-rate>
                    </el-form-item>

                    <el-form-item  label-width="100px" label="老师或者课程的评价" prop="name">
                        <el-input class="textarea" type="textarea"
                                  v-model="evaluationForm.evaluation" :autosize="{ minRows: 4, maxRows: 10}"  maxlength="2000" show-word-limit
                                  placeholder="请写下您对该课程或者该老师的评价，您的评价对我们来说十分宝贵。">
                        </el-input>
                    </el-form-item>
                </el-form>

            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="wdi-270" type="" @click="dialogVisible = false">返 回</el-button>
                <el-button class="wdi-270" type="primary" @click="submit">提 交</el-button>
                <div class="tip">
                    评价时请就事论事，请勿提供对人产生辱骂、人身攻击或冒犯的相关内容段落或其他信息。感谢您与我们共同维护安徽柏林书画研究院的评价氛围。
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "TeacherEvaluation",
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },

            setClassId(classId) {
                this.classId = classId;
            },

            setClassName(className) {
                this.className = className;
            },

            setTeacher(teacher) {
                this.teacher = teacher;
            },

            setTitle(title) {
                this.title = title;
            },

            submit() {

            },
        },
        data() {
            return {
                // 弹出框显示标志
                dialogVisible: false,
                // 标题
                title: "评价",
                evaluation: "",
                classId: "",
                className: "",
                teacher: "",
                evaluationForm: {
                    classRate: "",
                    teacherRate: "",
                    evaluation: "",
                },
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            }
        }
    }
</script>

<style scoped>
        .tip {
            margin-top: 10px;
            font-size: 12px;
            line-height: 20px;
            color: #999999;
        }

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
        .complain-dialog .el-dialog__body {
            padding: 0px 25px 0px;
        }
    }
</style>