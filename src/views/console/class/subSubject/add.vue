<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="增加课程大类信息"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
            <el-card class="auto-card wdi-800">
                <el-form
                        class= "pt-20 pl-20"
                        ref="form"
                        :model="form"
                        :rules="rules"
                        :validate-on-rule-change="false"
                        label-width="120px"
                        label-position="right">

                    <el-form-item label="课程小类名称" prop="name" required>
                        <el-input class="wdi-600" v-model="form.name" placeholder="请输入课程大类名称"></el-input>
                    </el-form-item>

                    <el-form-item label="所属课程大类" prop="mainId" required>
                        <el-select class="wdi-600" v-model="form.mainId" placeholder="请选择所属课程大类" clearable >
                            <el-option
                                    v-for="item in mainSubjects"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <div class="dffn">
                        <el-form-item label="年龄条件" prop="cond" required>
                            <el-select class="wdi-120" v-model="form.cond" placeholder="请选择条件" >
                                <el-option
                                        v-for="item in conds"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <div v-if="form.cond != '5'" class="dffn">
                            <el-form-item label-width="0" prop="age" required>
                                <el-input class="ml-10 wdi-120" v-model="form.age" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入年龄"></el-input>
                            </el-form-item>
                        </div>

                        <div v-if="form.cond == '5'" class="dffn">
                            <el-form-item label-width="0" prop="startAge" required>
                                <el-input class="ml-10 wdi-120" v-model="form.startAge" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入年龄"></el-input>
                            </el-form-item>
                            <span class="lh-40">至</span>
                            <el-form-item label-width="0" prop="endAge" required>
                                <el-input class="wdi-120" v-model="form.endAge" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入年龄"></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <el-form-item label="备注" prop="remark">
                        <el-input class="textarea wdi-600" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="输入备注" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">取 消</el-button>
              <el-button class="wdi-120" type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "student",
        props: ["mainSubjects"],
        components: {},
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
            clearForm() {
                this.form = {
                    id: "",
                    name: "",
                    mainId: "",
                    mainName: "",
                    cond: "",
                    age: "",
                    createTime: "",
                    updateTime: "",
                    remark: "",

                    startAge: "",
                    endAge: "",
                };
            },

            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                if(this.form.cond == "5") {
                    this.form.age = this.form.startAge + "," + this.form.endAge;
                }
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_sub_subject_add, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg(data.msg, "success");
                    this.dialogVisible = false;
                    this.clearForm();
                    this.$emit("search", 1, 10);
                }
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    name: "",
                    mainId: "",
                    mainName: "",
                    cond: "",
                    age: "",
                    createTime: "",
                    updateTime: "",
                    remark: "",

                    startAge: "",
                    endAge: "",
                },

                rules: {
                    name: [
                        {type: 'string', required: true, message: '请输入课程小类名称', trigger: ['change', 'blur']},
                    ],
                    mainId: [
                        {type: 'string', required: true, message: '请选择课程大类', trigger: ['change', 'blur']},
                    ],
                    cond: [
                        {type: 'string', required: true, message: '请选择条件', trigger: ['change', 'blur']},
                    ],
                    age: [
                        {type: 'string', required: true, message: '请输入年龄', trigger: ['change', 'blur']},
                    ],

                    startAge: [
                        {type: 'string', required: true, message: '请输入年龄区间', trigger: ['change', 'blur']},
                    ],
                    endAge: [
                        {type: 'string', required: true, message: '请输入年龄区间', trigger: ['change', 'blur']},
                    ],
                },

                conds: [
                    {value:"0", label:"大于"},
                    {value:"1", label:"大于等于"},
                    {value:"2", label:"等于"},
                    {value:"3", label:"小于"},
                    {value:"4", label:"小于等于"},
                    {value:"5", label:"区间"},
                ]
            }
        },
    }
</script>

<style scoped>
</style>

<style >
</style>