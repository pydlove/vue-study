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
            <el-card class="auto-card wdi-900 pr">
                <el-form
                        ref="form"
                        :model="form"
                        :validate-on-rule-change="false"
                        label-width="100px"
                        label-position="right">
                    <el-form-item class="upload-item" label="两寸蓝底证件照" label-width="80px" prop="photo">
                        <div class="grxx">
                            <el-dialog :visible.sync="photoDialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                            <el-upload
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
                                    :class="{talentPhotoHide:hideUpload} + ' zpcc'"
                            >
                            <i class="el-icon-camera-solid talent-photo"></i>
                            </el-upload>
                        </div>
                    </el-form-item>

                    <el-form-item label="账号" prop="name">
                        <el-input class="wdi-300" v-model="form.name" placeholder="请填写账号"></el-input>
                    </el-form-item>

                    <el-form-item label="姓名" prop="name">
                        <el-input class="wdi-300" v-model="form.name" placeholder="请填写姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="用户密码" prop="password" required>
                        <el-input class="wdi-300" placeholder="请输入密码" v-model="form.password" show-password></el-input>
                    </el-form-item>

                    <el-form-item label="再次输入" prop="pwdagain" required>
                        <el-input class="wdi-300" placeholder="请再次输入密码" v-model="form.pwdagain" show-password></el-input>
                    </el-form-item>

                    <el-form-item label="性别" prop="subName">
                        <el-radio-group class="wdi-300" v-model="form.sex" >
                            <el-radio class="nn" :label="0" border>男</el-radio>
                            <el-radio class="nn" :label="1" border>女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="出生年月" prop="idCard">
                        <el-date-picker class="wdi-300" type="date" placeholder="选择出生日期" v-model="form.birth" @blur="calculationAge()"></el-date-picker>
                    </el-form-item>

                   <div class="dffn">
                       <el-form-item label="手机号码" prop="idCard">
                           <el-input class="wdi-300" v-model="form.phone" placeholder="请填写手机号码"></el-input>
                       </el-form-item>

                       <el-form-item label="邮箱"  prop="email">
                           <el-input class="wdi-300" v-model="form.email"></el-input>
                       </el-form-item>
                   </div>

                    <div class="dffn">
                        <el-form-item label="身份证号码" prop="idCard">
                            <el-input class="wdi-300" v-model="form.idCard" placeholder="请填写身份证号码"></el-input>
                        </el-form-item>

                        <el-form-item label="家庭住址" prop="idCard">
                            <el-input class="wdi-300" v-model="form.address" placeholder="请填写家庭住址"></el-input>
                        </el-form-item>
                    </div>

                    <el-form-item label="账号状态" prop="status" required>
                        <el-select class="wdi-300" v-model="form.status" placeholder="请选择是否可用">
                            <el-option label="已激活" value="active"></el-option>
                            <el-option label="已锁定" value="lock"></el-option>
                            <el-option label="已冻结" value="freeze"></el-option>
                            <el-option label="已过期" value="expired"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="描述">
                        <el-input class="wdi-700 textarea" :autosize="{ minRows: 6, maxRows: 8}"
                                  type="textarea" v-model="form.remark">
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

        },
        methods: {
            close() {
                console.log(this.form)
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },
            onSubmit() {
                this.$promptMsg("增加成功", "success");
            },

            /**
             * 照片上传、删除
             */
            beforeRemove(file, fileList) {
                this.$confirm('确认要删除该照片吗？','提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: false
                })
                    .then(() => {
                        this.$refs.photoUploadRef.clearFiles();
                        this.handleRemove(file, fileList);
                    })
                    .catch(() => {
                    });
                return false;
            },
            handleRemove(file, fileList) {
                this.hideUpload = false;
                console.log(file,fileList)
                // this.deletePhotoRequest(this.fileName);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.photoDialogVisible = true;
            },
            onSuccess(response, file, fileList) {
                this.showUpPhoto = false;
                // if(response.data != null) {
                //     this.form.photo = response.data.fileUrl;
                //     this.fileName = response.data.fileName;
                // }
                // this.hideUpload = true;
                console.log(response, file,fileList)
            },
            beforeUpload(file) {
                this.showUpPhoto = false;
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
                    email: '',
                    status: '',
                    remark: '',
                    photo: '',
                    birth: '',
                    idCard: '',
                    address: '',
                },
                /**
                 * 照片
                 */
                // uploadAction: this.$talentUrl.talent_service_v1_ta_talent_info_photo_upload,
                uploadAction: require('@/assets/img/avatar/avatar-1.jpg'),
                hideUpload: false,
                dialogImageUrl: "",
                photoDialogVisible: false,
                fileList: [],
                fileName: "",
                showUpPhoto: true,

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
        top: 50px;
        right: 80px;
    }
</style>

<style>
    .zpcc .el-upload {
        width: 180px;
        height: 250px;
        line-height: 250px;
    }
</style>