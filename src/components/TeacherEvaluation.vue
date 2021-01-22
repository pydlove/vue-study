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
                <el-form ref="form" :rules="rules" :model="evaluationForm" label-position="top" label-width="80px" class="mp-base-edit">
                    <el-form-item label-width="100px" :label="'课程评分(' + className + ')'" prop="classStar">
                        <el-rate v-model="evaluationForm.classStar" :colors="colors"></el-rate>
                    </el-form-item>

                    <el-form-item  label-width="100px" :label="'老师评分(' + teacherName + ')'" prop="teacherStar">
                        <el-rate v-model="evaluationForm.teacherStar" :colors="colors"></el-rate>
                    </el-form-item>

                    <el-form-item  label-width="100px" label="老师或者课程的评价" prop="content">
                        <el-input class="textarea" type="textarea"
                                  v-model="evaluationForm.content" :autosize="{ minRows: 4, maxRows: 10}"  maxlength="2000" show-word-limit
                                  placeholder="请写下您对该课程或者该老师的评价，您的评价对我们来说十分宝贵。">
                        </el-input>
                    </el-form-item>
                </el-form>

            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="wdi-270" type="" @click="dialogVisible = false">返 回</el-button>
                <el-button class="wdi-270" type="primary" @click="submit">提 交</el-button>
                <div class="tip">
                    评价时请就事论事，请勿提供对人产生辱骂、人身攻击或冒犯的相关内容段落或其他信息。感谢您与我们共同维护安徽伯林书画研究院的评价氛围。
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
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },

            setClassId(classId) {
                this.classId = classId;
            },

            setClassName(className) {
                this.className = className;
            },

            setTeacherName(teacherName) {
                this.teacherName = teacherName;
            },

            setTeacherId(teacherId) {
                this.teacherId = teacherId;
            },

            setTitle(title) {
                this.title = title;
            },

            clearForm() {
                this.evaluationForm = {
                    classStar: "",
                    teacherStar: "",
                    content: "",
                    teacherId: "",
                    classId: "",
                };
            },

            submit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否确定提交评价?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submitRequest();
                        }).catch(() => {
                        });
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                this.evaluationForm.teacherId = this.teacherId;
                this.evaluationForm.classId = this.classId;
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_teacher_comment_add, this.evaluationForm, "POST");
                if(data.code == 200) {
                    this.$notify({
                        title: '提示',
                        message: '评价成功'
                    });
                    this.dialogVisible = false;
                    this.clearForm();
                }
            },
        },
        data() {
            return {
                // 弹出框显示标志
                dialogVisible: false,
                // 标题
                title: "评价",
                classId: "",
                className: "",
                teacherName: "",
                teacherId: "",
                evaluationForm: {
                    classStar: "",
                    teacherStar: "",
                    content: "",
                    teacherId: "",
                    classId: "",
                },
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],

                rules: {
                    classStar: [
                        {type: 'number', required: true, message: '请选择课程评分', trigger: ['change', 'blur']},
                        {
                            validator: function (rule, value, callback) {
                                if (value == 0) {
                                    callback(new Error("请选择课程评分"));
                                } else {
                                    callback();
                                }
                            }, trigger: ['change', 'blur']
                        }
                    ],
                    teacherStar: [
                        {type: 'number', required: true, message: '请选择老师评分', trigger: ['change', 'blur']},
                        {
                            validator: function (rule, value, callback) {
                                if (value == 0) {
                                    callback(new Error("请选择老师评分"));
                                } else {
                                    callback();
                                }
                            }, trigger: ['change', 'blur']
                        }
                    ],
                    content: [
                        {type: 'string', required: true, message: '请输入评论内容', trigger: ['change', 'blur']},
                    ],
                },
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