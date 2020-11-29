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
                        :rules="rules"
                        :validate-on-rule-change="false"
                        label-width="80px">

                    <el-form-item label="菜单名称" prop="chName">
                        <el-input v-model="form.chName"></el-input>
                    </el-form-item>

                    <el-form-item label="菜单类型" prop="type">
                        <el-select class="w-100" v-model="form.type" placeholder="请选择菜单类型">
                            <el-option label="项目" value="project"></el-option>
                            <el-option label="首页" value="index"></el-option>
                            <el-option label="菜单" value="menu"></el-option>
                            <el-option label="按钮" value="button"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="form.type == 'menu' || form.type == 'index'" label="菜单链接" prop="url">
                        <el-input v-model="form.url"></el-input>
                    </el-form-item>

                    <el-form-item v-if="form.type == 'menu'" label="显示图标" prop="icon">
                        <el-select class="w-100" v-model="form.icon" placeholder="请选择菜单类型">
                            <el-option label="el-icon-edit" value="el-icon-edit"><i class="el-icon-edit"></i></el-option>
                            <el-option label="el-icon-delete" value="el-icon-delete"><i class="el-icon-delete"></i></el-option>
                            <el-option label="el-icon-share" value="el-icon-share"><i class="el-icon-share"></i></el-option>
                            <el-option label="el-icon-s-tools" value="el-icon-s-tools"><i class="el-icon-s-tools"></i></el-option>
                            <el-option label="el-icon-phone" value="el-icon-phone"><i class="el-icon-phone"></i></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="级别" prop="level">
                        <el-select class="w-100" v-model="form.level" disabled placeholder="请选择菜单级别">
                            <el-option label="0" value="project"></el-option>
                            <el-option label="1" value="menu"></el-option>
                            <el-option label="2" value="button"></el-option>
                            <el-option label="3" value="button"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="form.type == 'menu' || form.type == 'index'" label="打开方式">
                        <el-select class="w-100" v-model="form.openType" placeholder="请选择打开方式">
                            <el-option label="默认" value="default"></el-option>
                            <el-option label="iframe" value="iframe"></el-option>
                            <el-option label="弹出窗口" value="open"></el-option>
                            <el-option label="打开新的标签页" value="tab"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="显示顺序">
                        <el-input v-model="form.showOrder"></el-input>
                    </el-form-item>

                    <el-form-item label="是否可用" prop="enabled" required>
                        <el-select class="w-100" v-model="form.enabled" placeholder="请选择是否可用">
                            <el-option label="停用" value="0"></el-option>
                            <el-option label="启用" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="父类节点">
                        <el-select class="w-100" v-model="form.parentId" placeholder="请选择父类节点" >
                            <el-option :label="form.parentName" :value="form.parentId" :disabled="true"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
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