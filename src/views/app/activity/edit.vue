<template>
	<!--eslint-disable-->
	<div>
		<el-card class="app_main_card">
			<div slot="header" class="aa_return" @click="toMainPage">
				<i class="el-icon-arrow-left"></i>
				<div>
					返回活动管理
				</div>
			</div>

			<div class="dffn">
				<div class="ae_appc" v-show="showActivityApp">
					<div class="ae_app">
						<ac-app ref="acAppRef" :activityForm="form"></ac-app>
					</div>
					<div class="ae_btn">
						<el-button class="ae_btn_item" type="primary" @click="releaseActivity">发布活动</el-button>
						<el-button class="ae_btn_item" type="primary" @click="showPoster" >活动海报</el-button>
					</div>
				</div>

				<div class="ae_tabs">
					<el-form class="ae_form"
					         ref="form"
					         :model="form"
					         :rules="rules"
					         label-position="left"
					         :validate-on-rule-change="false"
					         label-width="80px">
						<el-tabs v-model="activeName" @tab-click="handleClick">
							<el-tab-pane label="基本设置" name="base">
								<el-form-item label="活动名称" prop="title">
									<el-input class="aa_form_item" v-model="form.title" placeholder="请输入活动名称" @change="handlerTitle"></el-input>
								</el-form-item>

								<el-form-item label="报名时间" prop="signTimeRange">
									<el-date-picker class="aa_form_item" @change="handlerSignTime"
									                v-model="form.signTimeRange"
									                type="datetimerange"
									                value-format="yyyy-MM-dd HH:mm:SS"
									                :picker-options="pickerOptions"
									                range-separator="至"
									                start-placeholder="开始日期"
									                end-placeholder="结束日期"
									                :clearable="true"
									                align="right">
									</el-date-picker>
								</el-form-item>

								<el-form-item label="投票时间" prop="voteTimeRange">
									<el-date-picker class="aa_form_item" @change="handlerVoteTime"
									                v-model="form.voteTimeRange"
									                value-format="yyyy-MM-dd HH:mm:SS"
									                type="datetimerange"
									                :picker-options="pickerOptions"
									                range-separator="至"
									                start-placeholder="开始日期"
									                end-placeholder="结束日期"
									                :clearable="true"
									                align="right">
									</el-date-picker>
								</el-form-item>

								<el-form-item label="顶部图片" prop="fileList">
									<el-upload
											class="ae_upload"
											:action="uploadAction"
											:before-remove="beforeRemove"
											:on-success="onSuccess"
											:before-upload="beforeUpload"
											:file-list="form.fileList"
											list-type="picture">
										<el-button size="small" type="primary">点击上传顶部图片</el-button>
										<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过3M</div>
									</el-upload>
								</el-form-item>

								<el-form-item label="颜色风格" prop="colorStyle">
									<el-color-picker v-model="form.colorStyle" @change="setColor"></el-color-picker>
								</el-form-item>

								<el-form-item class="ae_limit_label" label="上传作品数量限制" prop="uploadLimit">
									<el-input-number v-model="form.uploadLimit" @change="handleChange" size="small" :min="1" :max="100"></el-input-number>
								</el-form-item>

							</el-tab-pane>
							<el-tab-pane label="活动介绍" name="activity">
								<el-form-item class="ae_limit_label ae_ef_content" label="活动介绍" prop="content" label-width="120px">
									<tinymce-text ref="tinymceRef" id="tinymce" @release="saveContent" :btnName="'保存'"></tinymce-text>
								</el-form-item>
							</el-tab-pane>
						</el-tabs>
					</el-form>

					<div class="ae_preview">
						预览设置：
						<el-switch @change="onPreview"
								v-model="showAppPreview"
								active-color="#1890ff"
								inactive-color="#bfbfbf">
						</el-switch>
					</div>
				</div>
			</div>
		</el-card>

		<van-overlay class="ae_overlay" :show="showOverlay" :style="{ width:clientWidth + 'px !important', height:clientHeight + 'px !important'  }">
			<van-loading v-show="showLoading" class="app_loading" type="spinner" color="#ffffff" vertical
			             :style="{
			             height:clientHeight + 'px !important',
			             paddingTop: (clientHeight/2) + 'px !important',
			             }">
				保存海报中，请稍后...
			</van-loading>
			<div class="ae_overapp_container" v-if="showOverApp">
				<div class="ae_over_app" ref="overImageWrapper">
					<el-image style="border-top-left-radius: 3px; border-top-right-radius: 3px; height: 200px;" :src="form.fileList.length == 0? (''):(form.fileList[0].url)" fit="fill"></el-image>
					<div class="ae_over_tc">
						<div class="ae_over_title">
							{{ form.title.length >= 20 ? (form.title.substring(0, 20)+"..."):(form.title) }}
						</div>
					</div>
					<div class="ae_over_qc">
						<div id="qrcode" class="ae_over_qrcode" ref="posterQrcodeRef"></div>
						<div class="ae_over_tip">
							扫码参与活动/投票
						</div>
					</div>
					<div class="ae_over_tc">
						<div class="ae_over_rc">
							<div class="app_over_rule" :style="{ color: form.colorStyle }">
								<div class="app_over_hline" :style="{ borderColor: form.colorStyle }"></div>
								活动规则
								<div class="app_over_hline" :style="{ borderColor: form.colorStyle }"></div>
							</div>
							<div class="ae_over_time" :style="{ color: form.colorStyle }">
								<van-icon class="app_over_rule_icon" name="clock-o" />
								<div>报名时间：{{ form.signTimeRange[0] }} - {{ form.signTimeRange[1] }}</div>
							</div>
							<div class="ae_over_time" :style="{ color: form.colorStyle }">
								<van-icon class="app_over_rule_icon" name="clock-o" />
								<div>投票时间：{{ form.voteTimeRange[0] }} - {{ form.voteTimeRange[1] }}</div>
							</div>
							<div class="ae_over_time" :style="{ color: form.colorStyle }">
								<van-icon class="app_over_rule_icon" name="info-o" />
								投票规则：每个微信号每天限制投三票
							</div>
						</div>
					</div>
				</div>
				<el-button class="ae_over_btn" type="primary" @click="savePoster">保存海报</el-button>
				<el-button class="ae_over_btn" @click="closeOverlay">关 闭</el-button>
			</div>
		</van-overlay>
	</div>
</template>
<!--eslint-disable-->
<script>
    import AcApp from "@/views/app/activity/app.vue"
    import TinymceText from '@/components/TinymceText'
    import QRCode from 'qrcodejs2'
    import html2canvas from "html2canvas";

    export default {
        name: "add",
        components: { 'tinymce-text':TinymceText, 'ac-app':AcApp, },
	    props: ["currentPage", "pageSize"],
	    mounted() {
	    },
	    watch: {
            "form.signTimeRange"(newVal) {
                if(newVal == null) {
                    this.form.signTimeRange = [];
                }
            },
            "form.voteTimeRange"(newVal) {
				if(newVal == null) {
				    this.form.voteTimeRange = [];
				}
		    }
	    },
        methods: {
            releaseActivity() {
                this.$confirm('确认是否发布活动？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=> {
                    this.releaseRequest();
                }).catch(()=> {
                });
            },

            async releaseRequest() {
                let params = {
                    id: this.form.id,
                    status: "1",
                };
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_activity_edit, params, "POST");
                if (data.code == 200) {
                    this.$notify({
                        title: '成功',
                        message: '活动发布成功！',
                        type: 'success'
                    });
                    this.search(this.currentPage, this.pageSize);
                }
            },

            saveContent(content) {
                this.form.content = content;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let params = {
                            id: this.form.id,
                            content: this.form.content,
                        };
                        this.updateRequest(params);
                    } else {
                        this.$notify({
                            title: '必填提示',
                            message: '请输入活动介绍',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },

            handlerTitle() {
                if(this.form.title == "") {
                    this.$notify({
                        title: '必填提示',
                        message: '请输入活动标题',
                        type: 'warning'
                    });
                    return false;
                }
                let params = {
                    id: this.form.id,
                    title: this.form.title,
                };
                this.updateRequest(params);
            },

            handlerSignTime() {
                if(this.form.signTimeRange != null && this.form.signTimeRange.length > 0) {
                    let params = {};
                    params.id = this.form.id;
                    params.signStart = this.form.signTimeRange[0];
                    params.signEnd = this.form.signTimeRange[1];
                    this.updateRequest(params);
                } else {
                    this.$notify({
                        title: '必填提示',
                        message: '请输入活动报名时间',
                        type: 'warning'
                    });
                    return false;
                }
            },

            handlerVoteTime() {
                if(this.form.voteTimeRange != null && this.form.voteTimeRange.length > 0) {
                    let params = {};
                    params.id = this.form.id;
                    params.voteStart = this.form.voteTimeRange[0];
                    params.voteEnd = this.form.voteTimeRange[1];
                    this.updateRequest(params);
                } else {
                    this.$notify({
                        title: '必填提示',
                        message: '请输入活动投票时间',
                        type: 'warning'
                    });
                    return false;
                }
            },

            handleChange() {
                let params = {
                    id: this.form.id,
                    uploadLimit: this.form.uploadLimit,
                };
                this.updateRequest(params);
            },

            /**
             * 照片上传、删除
             */
            beforeRemove(file) {
                if (file && file.status==="success") {
                    this.$confirm('确认要删除该照片吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: false
                    })
                    .then(() => {
                        this.handleRemove(file);
                    })
                    .catch(() => {
                    });
                    return false;
                }
            },
            handleRemove(file) {
                let fileListTemp = this.form.fileList.filter(function (item) {
                    if(item.name == file.name) {
                        return false;
                    }
                    return true;
                });
                this.form.fileList = fileListTemp;
                this.deletePhotoRequest(file.name);
                // 更新到数据库
	            if(this.form.fileList.length == 0) {
                    this.form.imgs = "";
	            } else {
                    for(var i in this.form.fileList) {
                        let fileListElement = this.form.fileList[i];
                        this.form.imgs = this.form.imgs + "," + fileListElement.url;
                    }
                    this.form.imgs = this.form.imgs.substring(1 , this.form.imgs.length);
	            }
                let params = {
                    id: this.form.id,
                    imgs: this.form.imgs,
                };
                this.updateRequest(params);
            },
            onSuccess(response) {
                this.form.fileList.push({name: response.data.fileName, url: response.data.fileUrl});
                // 更新到数据库
                this.form.imgs = "";
                for(var i in this.form.fileList) {
                    let fileListElement = this.form.fileList[i];
                    this.form.imgs = this.form.imgs + "," + fileListElement.url;
                }
                this.form.imgs = this.form.imgs.substring(1 , this.form.imgs.length);
	            let params = {
					id: this.form.id,
		            imgs: this.form.imgs,
	            };
	            this.updateRequest(params);
            },
            beforeUpload(file) {
                // 上传格式做限制
                var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'png'
                const extension2 = testmsg === 'jpg'
                const extension3 = testmsg === 'jpeg'
                if(!extension && !extension2 && !extension3) {
                    this.$notify({
                        title: '错误格式',
                        message: '图片仅支持png、jpg、jpeg格式，请选择正确的格式！',
                        type: 'error'
                    });
                    return false;
                }
            },
	        async updateRequest(params) {
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_activity_edit, params, "POST");
                if (data.code == 200) {
                    this.$notify({
                        title: '成功',
                        message: '保存成功！',
                        type: 'success'
                    });
                }
	        },
            async deletePhotoRequest(fileName) {
                let params = new FormData();
                params.append("fileName", fileName);
                await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_activity_top_delete, params, "POST");
            },

			setFormContent(row) {
        		this.form = {
                    id: row.id,
                    accessNum: row.accessNum,
                    uploadLimit: row.uploadLimit,
                    colorStyle: row.colorStyle,
                    title: row.title,
                    voteTimeRange: [row.voteStart, row.voteEnd],
                    signTimeRange: [row.signStart, row.signEnd],
                    status: row.status,
                    imgType: row.imgType,
                    imgs: row.imgs,
                    fileList: [],
                    content: row.content,
		        }
		        if(this.form.imgs != "" && this.form.imgs != null ) {
                    let imgArrTemp = this.form.imgs.split(",");
                    for(var i in imgArrTemp) {
                        let imgItem = imgArrTemp[i]
                        var photoArray = imgItem.split("/")
                        let fileName = photoArray[photoArray.length - 1];
                        this.form.fileList.push({ name: fileName, url: imgItem });
                    }
		        }
                this.$refs.acAppRef.setColor();
                this.$refs.tinymceRef.setContent(this.form.content);
			},

			onSubmit() {
				this.showOverlay = false;
			},
			close() {
				this.showOverlay = false;
			},
			open() {
				this.showOverlay = true;
			},

			savePoster() {
                // 保存海报
				this.showLoading = true;
                var vm = this;
                setTimeout(function(){
                    html2canvas(vm.$refs.overImageWrapper,
                    ).then(canvas => {
                        let dataURL = canvas.toDataURL("image/png");
                        vm.posterImg = dataURL;
                        vm.showLoading = false;
                        var a = document.createElement("a"); // 生成一个a元素
                        var event = new MouseEvent("click"); // 创建一个单击事件
                        a.download = name || "photo"; // 设置图片名称
                        a.href = vm.posterImg; // 将生成的URL设置为a.href属性
                        a.dispatchEvent(event); // 触发a的单击事件
                    });
                }, 1000);
			},

            closeOverlay() {
                this.showOverlay = false;
                this.$refs.posterQrcodeRef.innerHTML = '';
            },

            showPoster() {
			    // 1、校验是否提供数据  【 顶部图片、颜色风格、报名时间、投票时间 】
	            if(this.form.fileList.length == 0 || this.form.colorStyle == "" || this.form.signTimeRange.length == 0 || this.form.voteTimeRange.length == 0 ) {
                    this.$notify({
                        title: '必填提示',
                        message: '请补充顶部图片、颜色风格、报名时间、投票时间数据',
                        type: 'warning'
                    });
	                return false;
	            }
                this.showOverlay = true;
                this.$nextTick(function () {
                    this.posterQrcode = new QRCode(this.$refs.posterQrcodeRef, {
                        width: 160,
                        height: 160,
                        text: this.$aiocUrl.rootUrl + "am?activityId=" + this.form.id,
                        colorDark : this.form.colorStyle,
                        colorLight : "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                });
            },

            onPreview() {
                if(this.showAppPreview) {
					this.showActivityApp = true;
                } else {
					this.showActivityApp = false;
                }
            },

            setColor() {
                this.$refs.acAppRef.setColor();
                let params = {
                    id: this.form.id,
	                colorStyle: this.form.colorStyle,
                };
                this.updateRequest(params);
            },

            toMainPage() {
                this.$emit("toPage", "main");
                this.$emit("search", this.currentPage, this.pageSize);
            },

            release(content) {
				this.form.content = content;
            },

	        setContent() {
                this.$refs.tinymceRef.setContent(this.form.content);
	        }
        },
        data() {
            return {
                uploadAction: this.$aiocUrl.blsh_h5_service_v1_bh_activity_top_upload,
                showLoading: false,
                showOverApp: true,
                posterQrcode: "",
                clientHeight: document.body.clientHeight,
                clientWidth: document.body.clientWidth,
                showOverlay: false,
                showActivityApp: true,
                showAppPreview: true,
                activeName: 'base',
                form: {
					id: "",
					accessNum: "",
					createUser: "",
					remark: "",
                    uploadLimit: "",
                    colorStyle: "",
                    title: "",
					voteTimeRange: [],
                    signTimeRange: [],
                    status: "",
                    imgType: "",
                    imgs: "",
                    fileList: [],
                    content: "",
                },
                rules: {
                    title: [
                        {type: 'string', required: true, message: '请输入活动名称', trigger: ['change', 'blur']},
                    ],
                    signTimeRange: [
                        {type: 'array', required: true, message: '请输入报名时间', trigger: ['change', 'blur']},
                    ],
                    voteTimeRange: [
                        {type: 'array', required: true, message: '请输入投票时间', trigger: ['change', 'blur']},
                    ],
                    uploadLimit: [
                        {type: 'number', required: true, message: '请输入上传作品数量限制', trigger: ['change', 'blur']},
                    ],
                    colorStyle: [
                        {type: 'string', required: true, message: '请输入上传作品数量限制', trigger: ['change', 'blur']},
                    ],
                    fileList: [
                        {type: 'array', required: true, message: '请上传顶部图片', trigger: ['change', 'blur']},
                    ],
                    content: [
                        {type: 'string', required: true, message: '请输入活动介绍', trigger: ['change', 'blur']},
                    ],
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        }
    }
</script>

<style scoped>
	.app_over_rule {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		padding: 10px;
		line-height: 22px;
	}
	.app_over_hline {
		border-top: 1px solid;
		width: 40px;
		margin: 0 5px;
	}
	.ae_over_time {
		display: flex;
		flex-wrap: nowrap;
		text-align: left;
		font-size: 12px;
		margin-top: 5px;
		height: 22px;
	}
	.app_over_rule_icon  {
		margin-right: 5px;
	}
	.ae_over_tip {
		color: #999;
		font-size: 14px;
		margin-bottom: 30px;
	}
	.ae_over_qrcode {
		margin: 10px auto;
		margin-top: 20px;
	}
	.ae_over_qc {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background: #ffffff;
	}
	.ae_over_rc {
	}
	.ae_over_title {
		height: 40px;
		line-height: 40px;
		text-align: left;
	}
	.ae_over_tc {
		padding: 0px 10px;
	}
	.ae_over_btn {
		width: 100px;
		margin-top: 10px;
	}
	.ae_over_app {
		width: 100%;
		height: 616px;
		background: #eeeeee;
		border-radius: 4px;
	}
	.ae_overapp_container {
		width: 376px;
		height: 100%;
		margin: 0px auto;
		margin-top: 50px;
		margin-bottom: 100px;
	}
	.ae_overlay {
		z-index: 3000 !important;
		margin: 0px !important;
		overflow: auto;
	}
	.ae_upload {
		margin-bottom: 20px
	}
	.aa_form_item {
		width: 100%;
		max-width: 600px;
	}
	.ae_form {
		text-align: left;
	}
	.ae_preview {
		position: absolute;
		top: 10px;
		right: 10px;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		font-size: 14px;
		color: #999;
	}
	.ae_appc {
		margin-left: 20px;
	}
	.ae_tabs {
		margin-left: 20px;
		width: 100%;
		position: relative;
	}
	.ae_btn_item {
		padding: 10px 20px !important;
		width: 100px;
	}
	.ae_btn {
		width: 370px;
		margin-top: 10px;
	}
	.ae_app {
		width: 370px;
		height: 640px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
	.el-icon-arrow-left {
		font-size: 18px;
		margin-right: 10px;
	}
	.aa_return {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
		font-size: 16px;
	}
	.aa_return:hover {
		color: #2b90ff;
	}
</style>

<style>
	.ae_limit_label .el-form-item__label {
		line-height: 20px !important;
	}
	.ae_ef_content {
		position: relative;
	}
	.ae_ef_content .el-form-item__error {
		position: absolute;
		top: 26px !important;
		left: -110px !important;
	}
</style>