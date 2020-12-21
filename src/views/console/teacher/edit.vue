<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="编辑教师信息"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
            <el-card class="auto-card wdi-900 pr">
                <el-form class="user-f"
                         ref="form"
                         :model="form"
                         :rules="rules"
                         :validate-on-rule-change="false"
                         label-width="100px"
                         label-position="right">
                    <el-form-item class="upload-item" label="两寸蓝底证件照" label-width="80px" prop="avatar" required>
                        <div class="grxx">
                            <el-dialog :visible.sync="photoDialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                            <el-upload class="photo-up"
                                       ref="photoUploadRef"
                                       :action="uploadAction"
                                       list-type="picture-card"
                                       :fileList="fileList"
                                       :on-success="onSuccess"
                                       :before-upload="beforeUpload"
                                       :on-preview="handlePictureCardPreview"
                                       :before-remove="beforeRemove"
                                       :on-remove="handleRemove"
                                       :limit="1"
                                       :class="(hideUpload ? 'talentPhotoHide':'') + ' zpcc'"
                            >
                                <i class="el-icon-camera-solid talent-photo"></i>
                            </el-upload>
                        </div>
                    </el-form-item>

                    <el-form-item label="账号" prop="account" required>
                        <el-input class="wdi-300" v-model="form.account" placeholder="请填写账号"></el-input>
                    </el-form-item>

                    <el-form-item label="姓名" prop="name" required>
                        <el-input class="wdi-300" v-model="form.name" placeholder="请填写姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="性别" prop="sex" required>
                        <el-radio-group class="wdi-300" v-model="form.sex" >
                            <el-radio class="nn" :label="0" border>男</el-radio>
                            <el-radio class="nn" :label="1" border>女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="出生年月" prop="birthtime" required>
                        <el-date-picker class="wdi-300" type="date" placeholder="选择出生日期"
                                        value-format="yyyy-MM-dd"
                                        v-model="form.birthtime"  :picker-options="pickerOptions"
                        ></el-date-picker>
                    </el-form-item>

                    <div class="dffn">
                        <el-form-item label="手机号码" prop="phone" required>
                            <el-input class="wdi-300" v-model="form.phone" placeholder="请填写手机号码"></el-input>
                        </el-form-item>

                        <el-form-item label="邮箱"  prop="mail" required>
                            <el-input class="wdi-300" v-model="form.mail"></el-input>
                        </el-form-item>
                    </div>

                    <div class="dffn">
                        <el-form-item label="身份证号码" prop="idCard" required>
                            <el-input class="wdi-300" v-model="form.idCard" placeholder="请填写身份证号码"></el-input>
                        </el-form-item>

                        <el-form-item label="账号状态" prop="status" required>
                            <el-select class="wdi-300" v-model="form.status" placeholder="请选择是否可用">
                                <el-option label="在职" value="active"></el-option>
                                <el-option label="离职" value="lock"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="dffn">
                        <el-form-item label="所在区域" prop="area" required>
                            <el-cascader  class="wdi-300"
                                          ref="areaCascaderRef"
                                          size="large"
                                          :props="{ checkStrictly: true }"
                                          :options="areaOptions"
                                          v-model="form.area"
                                          @change="handleAreaCascader"
                                          placeholder="请选择区域">
                            </el-cascader>
                        </el-form-item>

                        <el-form-item label="详细住址" prop="address" required>
                            <el-input class="wdi-300" v-model="form.address" placeholder="请填写详细住址"></el-input>
                        </el-form-item>
                    </div>

                    <el-form-item label="描述">
                        <el-input class="wdi-700 textarea" :autosize="{ minRows: 6, maxRows: 8}"
                                  type="textarea" v-model="form.remark">
                        </el-input>
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
        name: "edit",
        components: {},
        props: ["currentPage", "pageSize", "areaOptions"],
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
                if(this.fileName != this.originalFileName) {
                    this.deletePhotoRequest(this.fileName);
                }
                this.clearForm();
            },
            open() {
                this.dialogVisible = true;
            },

            /**
             * 处理地区条件选择变化
             */
            handleAreaCascader() {
                if (this.$refs.areaCascaderRef) {
                    this.$refs.areaCascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
                }
            },

            clearForm() {
                this.form = {
                    id: "",
                    name: "",
                    account: "",
                    phone: '',
                    mail: '',
                    status: '',
                    remark: '',
                    avatar: '',
                    idCard: '',
                    address: '',
                    birthtime: '',
                    sex: '',
                    province: '',
                    city: '',
                    county: '',
                    township: '',
                    area: [],
                };
                this.fileName = "";
                this.fileList = [];
                this.originalFileName = "";
            },

            onSubmit() {
                console.log(this.form)
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                if(this.form.area.length == 1) {
                    this.form.province = this.form.area[0];
                }
                if(this.form.area.length == 2) {
                    this.form.province = this.form.area[0];
                    this.form.city = this.form.area[1];
                }
                if(this.form.area.length == 3) {
                    this.form.province = this.form.area[0];
                    this.form.city = this.form.area[1];
                    this.form.county = this.form.area[2];
                }
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_user_edit, this.form, "POST");
                if(data.code == 200) {
                    if(this.fileName != this.originalFileName) {
                        this.deletePhotoRequest(this.originalFileName);
                    }
                    this.$promptMsg("编辑用户成功！", "success");
                    this.dialogVisible = false;
                    this.clearForm();
                    this.$emit("search", this.currentPage, this.pageSize);
                }
            },

            setForm(form) {
                this.form = form;
            },

            /**
             * 照片上传、删除
             */
            beforeRemove() {
                this.$confirm('确认要删除该照片吗？','提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: false
                })
                    .then(() => {
                        this.$refs.photoUploadRef.clearFiles();
                        this.handleRemove();
                    })
                    .catch(() => {
                    });
                return false;
            },
            handleRemove() {
                this.hideUpload = false;
                if(this.fileName != this.originalFileName) {
                    this.deletePhotoRequest(this.fileName);
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.photoDialogVisible = true;
            },
            onSuccess(response) {
                if(this.fileName != null && this.fileName != "") {
                    this.form.avatar = "";
                    if(this.fileName != this.originalFileName) {
                        this.deletePhotoRequest(this.fileName);
                    }
                }
                if(response.data != null) {
                    this.form.avatar = response.data.fileUrl;
                    this.fileName = response.data.fileName;
                }
                this.hideUpload = true;
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
                await this.$aiorequest(this.$aiocUrl.console_service_v1_con_user_photo_delete, params, "POST");
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    name: "",
                    account: "",
                    password: '',
                    pwdagain: '',
                    phone: '',
                    mail: '',
                    status: '',
                    remark: '',
                    avatar: '',
                    idCard: '',
                    address: '',
                    birthtime: '',
                    sex: '',
                    province: '',
                    city: '',
                    county: '',
                    township: '',
                    area: [],
                },
                rules: {
                    name: [
                        { type: 'string', required: true, message: '请输入姓名', trigger: ['change', 'blur'] },
                    ],
                    account: [
                        { type: 'string', required: true, message: '请输入账号', trigger: ['change', 'blur']},
                    ],
                    password: [
                        { type: 'string', required: true, message: '请输入密码', trigger: ['change', 'blur'] },
                    ],
                    pwdagain: [
                        { type: 'string', required: true, message: '请再次输入密码', trigger: ['change', 'blur'] }
                    ],
                    phone: [
                        { type: 'string', required: true, message: '请输入电话号码', trigger: ['change', 'blur'] }
                    ],
                    mail: [
                        { type: 'string', required: true, message: '请输入邮箱', trigger: ['change', 'blur'] }
                    ],
                    birthtime: [
                        { type: 'string', required: true, message: '请输入出生年月', trigger: ['change', 'blur'] }
                    ],
                    idCard: [
                        { type: 'string', required: true, message: '请输入身份证号码', trigger: ['change', 'blur'] }
                    ],
                    area: [
                        { type: 'array', required: true, message: '请选择所在区域', trigger: ['change', 'blur'] }
                    ],
                    address: [
                        { type: 'string', required: true, message: '请输入居住地址', trigger: ['change', 'blur'] }
                    ],
                    sex: [
                        { type: 'number', required: true, message: '请选择性别', trigger: ['change', 'blur'] }
                    ],
                    avatar: [
                        { type: 'string', required: true, message: '请上传个人照片', trigger: ['change', 'blur'] }
                    ],
                    status: [
                        { type: 'string', required: true, message: '请选择账号状态', trigger: ['change', 'blur'] }
                    ],
                },


                /**
                 * 照片
                 */
                uploadAction: this.$aiocUrl.console_service_v1_con_user_photo_upload,
                hideUpload: false,
                dialogImageUrl: "",
                photoDialogVisible: false,
                fileName: "",
                fileList: [],
                originalFileName: "",

                /**
                 * 日期工具
                 */
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
    }
</script>

<style scoped>
    .pr {
        position: relative;
    }
    .upload-item {
        position: absolute;
        top: 20px;
        right: -35px;
    }
</style>

<style>
    .talentPhotoHide .el-upload--picture-card {
        display: none;
    }
    .user-f .el-form-item {
        width: 400px;
    }
    .photo-up .el-upload-list--picture-card .el-upload-list__item-thumbnail {
        width: 200px !important;
        height: 200px !important;
    }
    .photo-up .el-upload-list--picture-card .el-upload-list__item {
        width: 200px !important;
        height: 200px !important;
    }
    .photo-up .el-upload {
        width: 200px !important;
        height: 200px !important;
        line-height: 200px !important;
    }
    .photo-up .el-upload-list__item {
        transition: none;
    }
</style>