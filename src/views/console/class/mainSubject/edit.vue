<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="编辑课程大类信息"
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

                    <el-form-item label="课程大类名称" prop="name" required>
                        <el-input class="wdi-600" v-model="form.name" placeholder="请输入课程大类名称"></el-input>
                    </el-form-item>

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
        name: "edit",
        props: ["currentPage", "pageSize"],
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
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_main_subject_edit, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg(data.msg, "success");
                    this.dialogVisible = false;
                    this.$emit("search", this.currentPage, this.pageSize);
                }
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    name: "",
                    createTime: "",
                    updateTime: "",
                    remark: "",
                },

                rules: {
                    name: [
                        {type: 'string', required: true, message: '请输入课程大类名称', trigger: ['change', 'blur']},
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