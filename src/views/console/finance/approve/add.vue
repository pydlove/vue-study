<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="审批申请"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="true"
                center>
            <el-card class="auto-card wdi-800">
                <el-form
                        class= "pt-20 pl-20"
                        ref="form"
                        :model="form"
                        :validate-on-rule-change="false"
                        label-width="120px"
                        label-position="right">

                    <el-form-item label="审批单号" prop="id">
                        <el-input class="wp-214" v-model="form.id" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="审批标题" prop="name">
                        <el-input class="wp-620" v-model="form.name" placeholder="请输入审批标题" ></el-input>
                    </el-form-item>

                    <el-form-item label="申请内容" prop="remark">
                        <el-input class="wp-620 textarea" type="textarea" :autosize="{ minRows: 10, maxRows: 12}"
                                  placeholder="请输入申请内容" v-model="form.remark"></el-input>
                    </el-form-item>

                    <el-form-item label="附件上传" prop="remark">
                        <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
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
            this.setId();
        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },
            onSubmit() {
                this.$promptMsg("增加成功", "success");
            },

            setId() {
              this.form.id = this.generateNo("BL", 4);
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
                    id: "",
                    name: "",
                    createTime: "",
                    remark: "",
                },
            }
        },
    }
</script>

<style scoped>
</style>

<style >
</style>