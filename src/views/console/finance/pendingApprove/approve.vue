<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="审批流转"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
            <el-card class="auto-card wdi-800">
                <el-form
                        class= ""
                        :rules="rules"
                        ref="form"
                        :model="form"
                        :validate-on-rule-change="false"
                        label-width="120px"
                        label-position="right">
                    <el-form-item label="审批单号：" prop="name" >
                        <span>{{form.appNum}}</span>
                    </el-form-item>

                    <el-form-item class="" label="审批标题：" prop="name" >
                        <span>{{form.title}}</span>
                    </el-form-item>

                    <el-form-item class="" label="审批描述：" prop="name" >
                        <span>{{form.content}}</span>
                    </el-form-item>

                    <el-form-item class="" label="创建人员：" prop="name">
                        <span>{{form.createUserName}}</span>
                    </el-form-item>

                    <el-form-item class="" label="创建时间：" prop="name">
                        <span>{{form.createTime}}</span>
                    </el-form-item>

                    <el-form-item class="" label="审批意见" prop="opinion">
                        <el-input class="textarea wp-100" type="textarea" :autosize="{ minRows: 5, maxRows: 8}"
                                  placeholder="请输入审批意见" v-model="form.opinion"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>

            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button class="aioc-btn1" @click="onAgree()">同 意</el-button>
                <el-button type="warning" @click="onReturn">驳 回</el-button>
                <el-button type="danger" @click="onVeto">否 决</el-button>
           </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "approveCirculation",
        props: ["currentPage", "pageSize",],
        mounted() {
        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },

            onReturn() {
                this.form.status = "2";
                this.submitRequest()
            },

            onVeto() {
                this.form.status = "3";
                this.submitRequest()
            },

            onAgree() {
                this.form.status = "4";
                this.submitRequest()
            },

            async submitRequest() {
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_approve_review, this.form, "POST");
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
                form: {},
            }
        },
    }
</script>

<style scoped>
</style>

<style >
</style>