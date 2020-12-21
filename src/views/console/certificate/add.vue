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

                    <el-form-item label="证书唯一序列号" prop="uuid">
                        <el-input class="wdi-453" disabled v-model="form.uuid" placeholder="请生成证书唯一序列号"></el-input>
                        <el-button class="scxlh aioc-btn1" type="primary" size="small" @click="createUuid">重新生成序列号</el-button>
                    </el-form-item>

                    <el-form-item label="证书名称" prop="name">
                        <el-input class="wdi-600" v-model="form.name" placeholder="请输入证书名称"></el-input>
                    </el-form-item>

                    <el-form-item label="颁发机构" prop="unit">
                        <el-input class="wdi-600" v-model="form.unit" placeholder="请输入颁发机构"></el-input>
                    </el-form-item>

                    <el-form-item label="证书图片" prop="img">
                        <el-upload
                                class="aioc-ac-upload"
                                drag
                                :action="uploadAction"
                                :on-success="onSuccess"
                                :before-upload="beforeUpload"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                list-type="picture"
                                multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
                            <div slot="tip" class="el-upload__tip">上传预览：</div>
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
        name: "add",
        components: {},
        mounted() {
            this.form.uuid = this.getUUID();
        },
        methods: {
            close() {
                this.dialogVisible = false;
                this.fileList = [];
                this.form.img = "";
                this.deletePhotoRequest(this.fileName);
            },
            open() {
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },
            clearForm() {
                this.form = {
                    uuid: "",
                    name: "",
                    unit: "",
                    img: "",
                    remark: "",
                };
                this.fileList = [];
                this.fileName = "";
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
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_certificate_add, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg(data.msg, "success");
                    this.dialogVisible = false;
                    this.clearForm();
                    this.$emit("search", 1, 10);
                }
            },

            /**
             * 照片上传、删除
             */
            handleRemove() {
                this.fileList = [];
                this.deletePhotoRequest(this.fileName);
            },
            onSuccess(response) {
                if(this.fileList != [] && this.fileList.length > 0) {
                    this.fileList = [];
                    this.form.img = "";
                    this.deletePhotoRequest(this.fileName);
                }
                this.fileName = response.data.fileName;
                this.fileList.push({name: response.data.fileName, url: response.data.fileUrl})
                this.form.img = response.data.fileUrl;
            },
            beforeUpload(file) {
                // 上传格式做限制
                var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'png'
                const extension2 = testmsg === 'jpg'
                const extension3 = testmsg === 'jpeg'
                if(!extension && !extension2 && !extension3) {
                    this.$promptMsg("图片仅支持png、jpg、jpeg格式，请选择正确的格式！", "error");
                    return false;
                }
            },
            async deletePhotoRequest(fileName) {
                let params = new FormData();
                params.append("fileName", fileName);
                await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_certificate_certificate_delete, params, "POST");
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    uuid: "",
                    name: "",
                    unit: "",
                    img: "",
                    remark: "",
                },

                rules: {
                    name: [
                        {type: 'string', required: true, message: '请输入证书名称', trigger: ['change', 'blur']},
                    ],
                    unit: [
                        {type: 'string', required: true, message: '请输入颁发机构', trigger: ['change', 'blur']},
                    ],
                    img: [
                        {type: 'string', required: true, message: '请选择上传证书图片', trigger: ['change', 'blur']},
                    ],
                },

                /**
                 * 照片
                 */
                uploadAction: this.$aiocUrl.console_service_v1_bl_certificate_certificate_upload,
                fileList: [],
                fileName: "",

            }
        },
    }
</script>

<style scoped>
    .scxlh {
        margin-left: 30px;
        height: 40px;
    }
    .el-upload__tip {
        color: #f51d37;
    }
</style>

<style >
    .aioc-ac-upload .el-upload-list__item-thumbnail {
        vertical-align: middle;
        display: inline-block;
        width: 500px;
        height: 300px;
        float: left;
        position: relative;
        z-index: 1;
        margin-left: 40px;
        margin-top: 30px;
        background-color: #FFF;
    }
    .aioc-ac-upload .el-upload-list__item {
        overflow: hidden;
        z-index: 0;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        margin-top: 10px;
        padding: 0px;
        height: 360px;
        width: 600px;
        transition: none;
    }
    .aioc-ac-upload .el-upload-dragger {
        width: 600px;
        height: 180px;
    }
    .aioc-ac-upload .el-upload-list__item-name {
        display: none;
    }

</style>