<template>
	<!--eslint-disable-->
	<div>
		<el-dialog class="aiocw-dialog"
		           :title="$t('message.userInfo')"
		           :visible.sync="dialogVisible"
		           width="800px"
		           :close-on-click-modal="false"
		           :before-close="close"
		           top="12vh"
		>
			<el-form class="user-f"
			         ref="form"
			         :model="form"
			         :rules="rules"
			         :validate-on-rule-change="false"
			         label-width="120px"
			         label-position="right">
				<el-form-item class="upload-item" :label="$t('message.avatar')" prop="avatar">
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
						           :class="(hideUpload ? 'hide':'') + ' photo-up'"
						>
							<i class="el-icon-camera-solid talent-photo"></i>
						</el-upload>
					</div>
				</el-form-item>

				<div class="dffn">
					<el-form-item :label="$t('message.email')" prop="mail" required>
						<el-input class="wdi-240" v-model="form.mail" :placeholder="$t('message.InEmail')" readonly></el-input>
					</el-form-item>

					<el-form-item :label="$t('message.Nickname')" prop="name" required>
						<el-input class="wdi-240" v-model="form.name" :placeholder="$t('message.inNickname')"></el-input>
					</el-form-item>
				</div>

				<div class="dffn">
					<el-form-item :label="$t('message.DateOfBirth')" prop="birthtime">
						<el-date-picker class="wdi-240" type="date" :placeholder="$t('message.SelectDateOfBirth')"
						                value-format="yyyy-MM-dd"
						                v-model="form.birthtime" :picker-options="pickerOptions"
						></el-date-picker>
					</el-form-item>

					<el-form-item :label="$t('message.sex')" prop="sex">
						<el-radio-group class="wdi-240" v-model="form.sex">
							<el-radio class="nn" :label="0">男</el-radio>
							<el-radio class="nn" :label="1">女</el-radio>
						</el-radio-group>
					</el-form-item>
				</div>

				<div class="dffn">
					<el-form-item :label="$t('message.Contact')" prop="phone">
						<el-input class="wdi-240" v-model="form.phone" :placeholder="$t('message.InContact')"></el-input>
					</el-form-item>

					<el-form-item :label="$t('message.ResearchInstitution')" prop="address">
						<el-input class="wdi-240" v-model="form.address" :placeholder="$t('message.InResearchInstitution')"></el-input>
					</el-form-item>
				</div>

				<el-form-item :label="$t('message.PersonalDescription')">
					<el-input class="wdi-600 textarea" :autosize="{ minRows: 6, maxRows: 8}"
					          type="textarea" v-model="form.remark"
					          :placeholder="$t('message.InPersonalDescription')"
					>
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
              <el-button class="mr-38" type="primary" @click="onSubmit">{{ $t('message.Save') }}</el-button>
            </span>
		</el-dialog>
	</div>
</template>
<!--eslint-disable-->
<script>
    import * as imageConversion from 'image-conversion';

    export default {
        name: "userInfo",
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    name: "",
                    account: "",
                    phone: '',
                    mail: '',
                    status: '',
                    remark: '',
                    avatar: '',
                    address: '',
                    birthtime: '',
                    sex: '',
                },
                rules: {
                    name: [
                        { type: 'string', required: true, message: '请输入昵称', trigger: ['change', 'blur'] },
                    ],
                    mail: [
                        { type: 'string', required: true, message: '请输入邮箱', trigger: ['change', 'blur'] }
                    ],
                    address: [
                        { type: 'string', required: true, message: '请输入所在研究机构', trigger: ['change', 'blur'] }
                    ],
                },

                /**
                 * 照片
                 */
                uploadAction: this.$aiocUrl.web_service_v1_web_user_photo_upload,
                hideUpload: false,
                dialogImageUrl: "",
                photoDialogVisible: false,
                fileName: "",
                fileList: [],
            }
        },
        mounted() {

        },
        methods: {
            open(row) {
                this.dialogVisible = true;
                this.form = row;
                this.form.sex = Number(row.sex);
                console.log(this.form)
                if (row.avatar != null && row.avatar != "" && row.avatar != undefined) {
                    var photoArray = row.avatar.split("/")
                    this.fileName = photoArray[photoArray.length - 1];
                    this.originalFileName = photoArray[photoArray.length - 1];
                    this.fileList = [{url: row.avatar}];
                    this.hideUpload = true;
                } else {
                    this.fileName = "";
                    this.originalFileName = "";
                    this.fileList = [];
                    this.hideUpload = false;
                }

            },

            close() {
                this.$confirm('确定关闭？, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dialogVisible = false;
                    if(this.fileName != this.originalFileName) {
                        this.deletePhotoRequest(this.fileName);
                    }
                    this.clearForm();
                    // location.reload();
                }).catch(() => {
                });
            },

            /**
             * 照片上传、删除
             */
            beforeRemove() {
                this.$confirm(this.$t('message.DeleteAvatar'), this.$t('message.Hint'), {
                    confirmButtonText: this.$t('message.Sure'),
                    cancelButtonText: this.$t('message.Cancle'),
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
                console.log(this.fileName != this.originalFileName)
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
                    this.$promptMsg(this.$t('message.Photo'), "error");
                    return false;
                }
                let isLt2M = file.size > (0.5 * 1024 * 1024);
                if(isLt2M) {
                    return new Promise((resolve) => {
                        // 压缩到100KB,这里的100就是要压缩的大小,可自定义
                        imageConversion.compressAccurately(file, 200).then(res => {
                            resolve(res);
                        });
                    });
                }
            },
            async deletePhotoRequest(fileName) {
                let params = new FormData();
                params.append("fileName", fileName);
                await this.$aiorequest(this.$aiocUrl.web_service_v1_web_user_photo_delete, params, "POST");
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
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_web_user_edit, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg(this.$t('message.SaveInfoSuccess'), "success");
                    this.dialogVisible = false;
                    this.clearForm();
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
                    address: '',
                    birthtime: '',
                    sex: '',
                };
                this.fileName = "";
                this.fileList = [];
                this.originalFileName = "";
            },
        }
    }
</script>

<style scoped>
</style>

<style>
	.hide .el-upload--picture-card {
		display: none !important;
	}
	.user-f {
		text-align: left;
		font-family: 微软雅黑 !important;
		color: #333333 !important;
	}
	.el-form-item__label {
		font-family: 微软雅黑 !important;
	}
	.el-upload--picture-card,.el-upload-list__item-thumbnail {
		border-radius: 100px !important;
		width: 100px !important;
		height: 100px !important;
		line-height: 100px !important;
	}
	.el-upload-list__item {
		border-radius: 100px !important;
		width: 100px !important;
		height: 100px !important;
		line-height: 100px !important;
		border: 0px !important;
	}
	.photo-up .el-icon-check {
		display: none !important;
	}
</style>