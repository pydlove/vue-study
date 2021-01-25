<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="编辑日志"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="900px"
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

                    <el-form-item label="日志标题" prop="title">
                        <el-input class="wdi-600" v-model="form.title" placeholder="请输入日志标题" ></el-input>
                    </el-form-item>

                    <el-form-item label="日志正文" prop="content">
                        <el-input class="wdi-600 textarea" type="textarea" :autosize="{ minRows: 10, maxRows: 12}"
                                  placeholder="请输入日志正文内容" v-model="form.content"></el-input>
                    </el-form-item>

                    <el-form-item class="w-100" label="日志审批领导" prop="approverUser">
                        <el-select class="wdi-300" v-model="form.toLeaderId"
                                   filterable clearable placeholder="请选择日志审批领导" >
                            <el-option v-for="(item, index) in leader"
                                       :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
               <el-button class="wdi-120" @click="close">取 消</el-button>
               <el-button class="wdi-120" type="primary" @click="onSubmit">发 布</el-button>
               <el-button class="wdi-120" type="info" @click="onDraft">草稿箱</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "edit",
        props: ['leader', "currentPage", "pageSize",],
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
                    title: "",
                    content: "",
                    toLeaderId: "",
                };
            },

            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.form.status = "1";
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            onDraft() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.form.status = "0";
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_work_log_edit, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg("编辑成功", "success");
                    this.dialogVisible = false;
                    this.clearForm();
                    this.$emit("search", this.currentPage, this.pageSize);
                }
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    title: "",
                    content: "",
                    createTime: "",
                    updateTime: "",
                    createUser: "",
                    createUserName: "",
                    leader: "",
                    toLeaderId: "",
                    remark: "",
                    status: "",
                },
                rules: {
                    title: [
                        {type: 'string', required: true, message: '请输入日志标题', trigger: ['change', 'blur']},
                    ],
                    content: [
                        {type: 'string', required: true, message: '请输入日志正文内容', trigger: ['change', 'blur']},
                    ],
                    toLeaderId: [
                        {type: 'string', required: true, message: '请选择日志审批领导', trigger: ['change', 'blur']},
                    ],
                }
            }
        },
    }
</script>

<style scoped>
</style>

<style >
</style>