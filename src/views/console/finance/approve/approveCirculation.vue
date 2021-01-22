<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="审批流转"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="900px"
                center>
            <el-card class="auto-card wdi-800">
                <div class="dffn">
                    <el-form
                            class= "pt-20 w-50 tapp-form"
                            :rules="rules"
                            ref="form"
                            :model="form"
                            :validate-on-rule-change="false"
                            label-width="120px"
                            label-position="right">
                        <el-form-item class="wp-460" label="审批单号：" prop="name" >
                            <span>{{form.appNum}}</span>
                        </el-form-item>

                        <el-form-item class="wp-460" label="审批标题：" prop="name" >
                            <span>{{form.title}}</span>
                        </el-form-item>

                        <el-form-item class="wp-460" label="审批描述：" prop="name" >
                            <span>{{form.content}}</span>
                        </el-form-item>

                        <el-form-item class="wp-460" label="创建人员：" prop="name">
                            <span>{{form.createUserName}}</span>
                        </el-form-item>

                        <el-form-item class="wp-460" label="创建时间：" prop="name">
                            <span>{{form.createTime}}</span>
                        </el-form-item>

                        <el-form-item class="wp-460" label="下个环节：" prop="name">
                            <span>{{form.nextLinkName}}</span>
                        </el-form-item>

                        <el-form-item class="w-100" label="环节审批人：" prop="approverUser">
                            <el-select class="wp-340" v-model="form.approverUser"
                                       filterable clearable placeholder="请选择下阶段审批人" >
                                <el-option v-for="(item, index) in approver"
                                           :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>

            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="close">取 消</el-button>
                <el-button type="primary" @click="onSubmit">流 转</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "approveCirculation",
        props: ["currentPage", "pageSize", "approver"],
        mounted() {
        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },
            clearForm() {
                this. form = {
                    appNum:"",
                    title:"",
                    content:"",
                    createTime:"",
                    createUserName:"",
                    createUser:"",
                    status:"",
                    link:"",
                    approverUser:"",
                    nextLinkName:"",
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
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_approve_circulation, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg(data.msg, "success");
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
                    appNum:"",
                    title:"",
                    content:"",
                    createTime:"",
                    createUserName:"",
                    createUser:"",
                    status:"",
                    link:"",
                    approverUser:"",
                    nextLinkName:"",
                },
                rules: {
                    approverUser: [
                        {type: 'string', required: true, message: '请选择下阶段审批人', trigger: ['change', 'blur']},
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