<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="增加主菜单"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
            <el-card class="auto-card wdi-900 pr">
                <el-form
                        ref="form"
                        :model="form"
                        :inline="true"
                        :rules="rules"
                        :validate-on-rule-change="false"
                        label-width="95px">

                    <el-form-item label="根菜单名称" prop="chName">
                        <el-input class="wdi-300" v-model="form.chName"></el-input>
                    </el-form-item>

                    <el-form-item label="菜单类型" prop="type">
                        <el-select class="wdi-300" v-model="form.type" disabled placeholder="请选择菜单类型">
                            <el-option label="项目" value="project"></el-option>
                            <el-option label="首页" value="index"></el-option>
                            <el-option label="菜单" value="menu"></el-option>
                            <el-option label="按钮" value="button"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="logo" prop="icon">
                        <el-upload
                                class="aiocloud-logo-upload wdi-700"
                                :action="uploadAction"
                                :on-success="onSuccess"
                                :before-upload="beforeUpload"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件</div>
                            <div slot="tip" class="el-upload__tip">上传预览：</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="级别" prop="level">
                        <el-select class="wdi-300" v-model="form.level" disabled placeholder="请选择菜单级别">
                            <el-option label="0" value="project"></el-option>
                            <el-option label="1" value="menu"></el-option>
                            <el-option label="2" value="button"></el-option>
                            <el-option label="3" value="button"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="显示顺序">
                        <el-input class="wdi-300" v-model="form.showOrder"></el-input>
                    </el-form-item>

                    <el-form-item label="是否可用" prop="enabled" required>
                        <el-select class="wdi-300" v-model="form.enabled" placeholder="请选择是否可用">
                            <el-option label="停用" value="0"></el-option>
                            <el-option label="启用" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="描述">
                        <el-input class="wdi-708 textarea" type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button class="wdi-120" @click="close">取 消</el-button>
                <el-button class="wdi-120 aioc-btn1" type="primary" @click="onSubmit">确 定</el-button>
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
                this.fileList = [];
                this.form.icon = "";
                this.deletePhotoRequest(this.fileName);
            },
            open() {
                this.dialogVisible = true;
                this.$refs["form"].clearValidate();
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
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_functions_add, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg("增加根菜单成功！", "success");
                    this.dialogVisible = false;
                    this.$emit("search");
                }
            },

            setForm(form) {
                this.form = form;
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
                    this.form.icon = "";
                    this.deletePhotoRequest(this.fileName);
                }
                this.fileName = response.data.fileName;
                this.fileList.push({name: this.form.chName, url: response.data.fileUrl})
                this.form.icon = response.data.fileUrl;
            },
            beforeUpload(file) {
                if( this.form.chName == null ||  this.form.chName == '') {
                    this.$promptMsg("请先填写根菜单的名称！", "error");
                    return false;
                }

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
                await this.$aiorequest(this.$aiocUrl.console_service_v1_con_functions_logo_delete, params, "POST");
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: '',
                    chName: '',
                    url: '',
                    showOrder: '',
                    level: '',
                    type: '',
                    openType: '',
                    enabled: '',
                    remark: '',
                    icon: '',
                    parentId: '',
                    parentName: '',
                },

                /**
                 * 照片
                 */
                uploadAction: this.$aiocUrl.console_service_v1_con_functions_logo_upload,
                fileList: [],
                fileName: "",

                rules: {
                    chName: [
                        { type: 'string', required: true, message: '请输入菜单名称', trigger: ['change'] },
                    ],
                    url: [
                        { type: 'string', required: true, message: '请输入菜单链接', trigger: ['change']},
                    ],
                    icon: [
                        { type: 'string', required: true, message: '请选择菜单图标', trigger: ['change'] },
                    ],
                    type: [
                        { type: 'string', required: true, message: '请选择菜单类型', trigger: ['change'] }
                    ],
                    enabled: [
                        { type: 'string', required: true, message: '请选择菜单是否启用', trigger: ['change'] }
                    ],
                },
            }
        },
    }
</script>

<style scoped>
    .el-upload__tip {
        color: #f51d37;
    }
</style>

<style>
    .aiocloud-logo-upload .el-upload {
        height: 50px;
        text-align: left;
    }
    .aiocloud-logo-upload .el-upload-list--picture .el-upload-list__item {
        width: 320px !important;
        height: 57px !important;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background: #282d2f;
    }
    .aiocloud-logo-upload .el-upload-list__item-thumbnail {
        width: 42px !important;
        height: 30px !important;
        margin-left: 0px !important;
        background: #282d2f;
    }
    .aiocloud-logo-upload .el-upload-list__item-name {
        line-height: 57px !important;
        font-size: 18px;
        color: #ffffff;

    }
    .aiocloud-logo-upload .el-upload-list__item {
        transition: none;
    }
</style>