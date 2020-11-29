<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="增加课程大类信息"
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

                    <el-form-item label="证书唯一序列号" prop="name">
                        <el-input class="wdi-460" disabled v-model="form.uuid" placeholder="请生成证书唯一序列号"></el-input>
                        <el-button class="scxlh aioc-btn1" type="primary" size="small" icon="el-icon-plus" @click="createUuid">生成序列号</el-button>
                    </el-form-item>

                    <el-form-item label="证书名称" prop="name">
                        <el-input class="wdi-600" v-model="form.name" placeholder="请输入证书名称"></el-input>
                    </el-form-item>

                    <el-form-item label="颁发机构" prop="name">
                        <el-input class="wdi-600" v-model="form.unit" placeholder="请输入颁发机构"></el-input>
                    </el-form-item>

                    <el-form-item label="活动海报" prop="title">
                        <el-upload
                                class="aioc-upload"
                                drag
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :file-list="form.photo"
                                list-type="picture"
                                multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="备注" prop="remark">
                        <el-input class="textarea wdi-600"
                                  type="textarea" :autosize="{ minRows: 4, maxRows: 4}"
                                  placeholder="输入备注" v-model="form.remark">
                        </el-input>
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
            },
            createUuid() {
                this.form.uuid = this.getUUID();
            },
            getUUID() {
                return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
            },

            onSubmit() {
                this.$promptMsg("增加成功", "success");
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    uuid: "",
                    name: "",
                    unit: "",
                    photo: "",
                    photos: "",
                    createTime: "",
                    remark: "",
                },
            }
        },
    }
</script>

<style scoped>
    .scxlh {
        margin-left: 30px;
        height: 40px;
    }
</style>

<style >
</style>