<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="增加角色"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="true"
                center>
            <el-card class="auto-card wdi-900 pr">
                <el-form
                        ref="form"
                        :model="form"
                        :rules="rules"
                        :validate-on-rule-change="false"
                        label-width="80px">

                    <el-form-item label="角色名称" prop="name" required>
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="描述" prop="remark">
                        <el-input v-model="form.remark"></el-input>
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
        name: "add",
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
                    remark: '',
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
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_role_add, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg("增加角色成功！", "success");
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
                    remark: '',
                },
                rules: {
                    name: [
                        {type: 'string', required: true, message: '请输入角色名称', trigger: ['change', 'blur']},
                    ],
                }
            }
        },
    }
</script>

<style scoped>
</style>

<style>
</style>