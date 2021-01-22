<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="审批申请"
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

                    <el-form-item label="审批单号" prop="appNum">
                        <el-input class="wp-214" v-model="form.appNum" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="审批标题" prop="title">
                        <el-input class="wp-620" v-model="form.title" placeholder="请输入申请工单标题" ></el-input>
                    </el-form-item>

                    <el-form-item label="申请内容" prop="content">
                        <el-input class="wp-620 textarea" type="textarea" :autosize="{ minRows: 10, maxRows: 12}"
                                  placeholder="请输入申请工单内容" v-model="form.content"></el-input>
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
        components: {},
        mounted() {
        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
                this.setId();
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },

            clearForm() {
                this.form = {
                    appNum: "",
                    title: "",
                    content: "",
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
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_approve_add, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg(data.msg, "success");
                    this.dialogVisible = false;
                    this.clearForm();
                    this.$emit("search", 1, 10);
                }
            },

            setId() {
              this.form.appNum = this.generateNo("BL", 4);
            },

            generateNo(orderPrefix, orderSuffix) {
                var random_no = "";
                for (var i = 0; i < orderSuffix; i++) //j位随机数，用以加在时间戳后面。
                {
                    random_no += Math.floor(Math.random() * 10);
                }
                random_no = orderPrefix + new Date().getTime() + random_no;
                return random_no;
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    appNum: "",
                    title: "",
                    content: "",
                },
                rules: {
                    title: [
                        {type: 'string', required: true, message: '请输入申请工单标题', trigger: ['change', 'blur']},
                    ],
                    content: [
                        {type: 'string', required: true, message: '请输入申请工单内容', trigger: ['change', 'blur']},
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