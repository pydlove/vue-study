<template>
	<!--eslint-disable-->
	<div>
		<div class="app_al"  @click="returnPage">
			<van-icon name="arrow-left"/>
			<span>
				返回
			</span>
		</div>
		<el-carousel class="app_el_carousel" height="200px">
			<el-carousel-item v-for="(item, index) in activityBanners" :key="index">
				<van-image
						width="100%"
						height="200px"
						fit="fill"
						:src="item"
				/>
			</el-carousel-item>
		</el-carousel>

		<el-card class="app_card">
			<div class="app_tit">
				{{ activity.title }}
			</div>
			<div class="app_tit_container">
				<div class="app_tit_item app_item_bl" :style="{ background: colorStyle.total }">
					<div>{{ activity.totalVoteNum }}</div>
					<div>总票数</div>
				</div>
				<div class="app_vline"></div>
				<div class="app_tit_item" :style="{ background: colorStyle.player }">
					<div>{{ activity.totalPlayersNum }}</div>
					<div>选手数</div>
				</div>
				<div class="app_vline"></div>
				<div class="app_tit_item app_item_br" :style="{ background: colorStyle.access }">
					<div>{{ activity.accessNum }}</div>
					<div>访问量</div>
				</div>
			</div>
			<div class="app_status" :style="{ color: fmtStatusColor(activity.status) }">
				{{ fmtStatus(activity.status) }}
			</div>
		</el-card>

		<el-card class="app_card">
			<div class="app_rule_item">
				<van-icon class="app_rule_icon" name="clock-o" :style="{ color: colorStyle.main }"/>
				报名开始：
				{{ activity.signStart }}
			</div>
			<div class="app_rule_item">
				<van-icon class="app_rule_icon" name="clock-o" :style="{ color: colorStyle.main }"/>
				报名截止：
				{{ activity.signEnd }}
			</div>
		</el-card>

		<el-card class="app_card">
			<el-form class="app_form"
			         ref="form"
			         :model="form"
			         label-position="left"
			         :validate-on-rule-change="false"
			         label-width="80px">
				<div v-if="next == 1">
					<el-form-item label="姓名" required>
						<el-input class="aa_form_item" v-model="form.name" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<van-divider/>

					<el-form-item label="年龄" required>
						<el-input class="aa_form_item" v-model="form.age" placeholder="请输入年龄"></el-input>
					</el-form-item>
					<van-divider/>

					<el-form-item label="性别" required>
						<el-radio-group v-model="form.sex">
							<el-radio label="0">男</el-radio>
							<el-radio label="1">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<van-divider/>

					<el-form-item label="所在地" required>
						<van-cell v-if="form.area.length > 0" class="app_vcell" is-link @click="showPopup"
						          v-model="form.area"></van-cell>
						<van-cell v-else class="app_vcell" is-link @click="showPopup" v-model="form.area">
								<span class="app_vcell1">
									选择需要显示的城市
								</span>
						</van-cell>
						<van-popup
								v-model="showArea"
								position="bottom">
							<van-area
									:area-list="areaList" :columns-num="3" ref="myArea"
									:value="form.areaCode"
									title="选择所在地"
									@change="onChange"
									@confirm="onConfirm"
									@cancel="onCancel"
							/>
						</van-popup>
					</el-form-item>
					<van-divider/>

					<el-form-item label="手机号码" required>
						<el-input ref="asPhoneRef" class="aa_form_item"
						          v-model="form.phone" placeholder="请输入联系方式"></el-input>
					</el-form-item>
					<van-divider/>

					<div class="app_next">
						<el-button class="app_next_btn" @click="toNext"
						           :style="{ borderColor: colorStyle.main,  background: colorStyle.main }">
							下一步
						</el-button>
					</div>
				</div>

				<div v-else-if="next == 2">
					<el-form-item label="作品名称" required>
						<el-input class="aa_form_item" v-model="form.worksName" placeholder="请输入作品名称"></el-input>
					</el-form-item>

					<el-form-item label="指导老师" required>
						<el-input class="aa_form_item" v-model="form.teacher" placeholder="请输入指导老师姓名"></el-input>
					</el-form-item>

					<el-form-item class="app_up_eitem" :label="'上传作品（最多上传'+ activity.uploadLimit +'张）'"
					              required>
						<van-uploader :file-list="form.fileList" accept="image/*"
						              :max-count="activity.uploadLimit"
						              :after-read="uploadImgs"
						              @delete="uploadDelete"
						/>
					</el-form-item>

					<van-divider/>

					<div class="app_next">
						<el-button class="app_next_btn" @click="toPrevious"
						           :style="{ borderColor: colorStyle.main,  background: colorStyle.main }">
							上一步
						</el-button>

						<el-button class="app_next_btn" @click="submit" :disabled="submitDisabled"
						           :style="{ borderColor: colorStyle.main,  background: colorStyle.main }">
							报名
						</el-button>
					</div>
				</div>
			</el-form>
		</el-card>

		<div class="app_bot">
			<a href="https://www.aiocloud.ltd/#/mainApp" :style="{ color: colorStyle.main, }">爱启云科技</a>提供支持
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Area from '@/assets/json/area.js'
    import * as imageConversion from 'image-conversion';

    export default {
        name: "AppSign",
        props: ["activity", "activityBanners", "colorStyle", "originalHeight", "clientHeight"],
        watch: {
            clientHeight: function () {
                if (this.originalHeight != this.clientHeight) {
                    //键盘弹出操作
                    setTimeout(() => {
                        document.activeElement.scrollIntoView(false);
                        window.scrollTo(0, 50);
                    }, 200)
                } else {
                    //键盘收起操作
                }
            }
        },
        mounted() {
            this.areaList = Area;
        },
        methods: {
            /**
             * 返回投票页
             * @param {*} 参数 参数说明
             * @author panyong
             */
            returnPage() {
                this.$emit("changePage", "returnPage");
            },

            changeHeight() {
                // document.getElementsByClassName("app_container")[0].scrollTop = 500;
            },

            /**
             * 提交
             * @param {*} 参数 参数说明
             * @author panyong
             */
            submit() {
                if (this.form.worksName == null || this.form.worksName == "") {
                    this.$toast.fail('请输入作品名称');
                    return false;
                }
                if (this.form.teacher == null || this.form.teacher == "") {
                    this.$toast.fail('请输入指导老师姓名');
                    return false;
                }
                if (this.form.fileList == null || this.form.fileList == "" || this.form.fileList.length == 0) {
                    this.$toast.fail('请上传作品');
                    return false;
                }
                this.submitRequest();
            },
            async submitRequest() {
                for (var i in this.form.fileList) {
                    var item = this.form.fileList[i];
                    this.form.worksImage = this.form.worksImage + "," + item.url;
                }
                this.form.worksImage = this.form.worksImage.substring(1, this.form.worksImage.length)
                this.form.acitvityId = this.activity.id;
                this.submitDisabled = true;
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_sign, this.form, "POST");
                if (data.code == 200) {
                    let signer = data.data;
                    this.$toast.success('报名成功');
                    this.submitDisabled = false;
                    this.clearForm();
                    this.$emit("toDetail", signer);
                }
            },

            clearForm() {
                this.form = {
                    areaCode: "",
                    area: "",
                    phone: "",
                    sex: "",
                    age: "",
                    name: "",
                    worksName: "",
                    fileList: [],
                    worksImage: "",
                    acitvityId: "",
                };
            },

            toNext() {
                if (this.form.name == null || this.form.name == "") {
                    this.$toast.fail('请输入姓名');
                    return false;
                }
                if (this.form.age == null || this.form.age == "") {
                    this.$toast.fail('请输入年龄');
                    return false;
                }
                // if (!this.isAge(this.form.age)) {
                //     this.$toast.fail('请输入正确的年龄');
                //     return false;
                // }
                if (this.form.sex == null || this.form.sex == "") {
                    this.$toast.fail('请选择性别');
                    return false;
                }
                if (this.form.area == null || this.form.area == "") {
                    this.$toast.fail('请选择所在地');
                    return false;
                }
                if (this.form.phone == null || this.form.phone == "") {
                    this.$toast.fail('请输入手机号码');
                    return false;
                } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.form.phone))) {
                    this.$toast.fail('请输入正确的手机号码');
                    return false;
                }
                this.next = 2;
            },

            isAge(str) {
                var age = parseInt(str);
                let pattern = /^(([0-9]|[1-9][1-9]|1[0-7][0-9])(\\.[0-9]+)?|180)$/;
                return pattern.test(age);
            },

            toPrevious() {
                this.next = 1;
            },

            /**
             * 图片上传 删除 审计
             * @param {*} 参数 参数说明
             * @author panyong
             */
            uploadImgs(file) {
                let upFile = file.file;
                console.log(upFile.size)
	            console.log(0.5 * 1024 * 1024)
                let isLt2M = upFile.size < (0.5 * 1024 * 1024);
                if (isLt2M) {
                   this.uploadImgsRequest(upFile);
                } else {
                    imageConversion.compressAccurately(upFile, 200).then(res => {
                        console.log(res)
                        const newFile = new window.File(
                            [res],
                            upFile.name,
                            { type: upFile.type },
                        );
                        this.uploadImgsRequest(newFile);
                    })
                }
            },
	        async uploadImgsRequest(file) {
                let params = new FormData();
                params.append("file", file);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_upload, params, "POST");
                if (data.code === 200) {
                    this.form.fileList.push({url: data.data.fileUrl, name: data.data.fileName});
                    return true;
                }
	        },
            async uploadDelete(file) {
                let params = new FormData();
                params.append("fileName", file.name);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_works_delete, params, "POST");
                if (data.code === 200) {
                    var files = [];
                    for (var i in this.form.fileList) {
                        var item = this.form.fileList[i];
                        if (file.name != item.name) {
                            files.push(item);
                        }
                    }
                    this.form.fileList = files;
                    return true;
                }
            },

            /**
             * 显示区域地理选择栏
             * @param {*} 参数 参数说明
             * @author panyong
             */
            showPopup() {
                this.showArea = true;
            },

            //value=0改变省，1改变市，2改变区
            onChange(picker) {
                let val = picker.getValues();
                let areaName = ''
                for (var i = 0; i < val.length; i++) {
                    areaName = areaName + (i == 0 ? '' : '/') + val[i].name
                }
                this.form.area = areaName;
            },
            //确定选择城市
            onConfirm(val) {
                this.showArea = false;
                let areaName = ''
                for (var i = 0; i < val.length; i++) {
                    areaName = areaName + (i == 0 ? '' : '/') + val[i].name
                }
                this.form.area = areaName;
            },
            //取消选中城市
            onCancel() {
                this.showArea = false;
                this.$refs.myArea.reset();
            },

            /**
             * 格式化状态
             * @param {*} 参数 参数说明
             * @author panyong
             */
            fmtStatus(status) {
                switch (status) {
                    case "0":
                        return "活动未开始";
                    case "1":
                        return "活动进行中";
                    case "2":
                        return "活动已结束";
                    default:
                        break;
                }
            },

            fmtStatusColor(status) {
                switch (status) {
                    case "0":
                        return "#bfbfbf";
                    case "1":
                        return "#52c41a";
                    case "2":
                        return "#c4192a";
                    default:
                        break;
                }
            },

        },
        data() {
            return {
                submitDisabled: false,
                showArea: false,
                areaList: "",
                next: 1,
                form: {
                    age: "",
                    area: "",
                    areaCode: "340000",
                    phone: "",
                    sex: "",
                    name: "",
                    worksName: "",
                    fileList: [],
                    worksImage: "",
                    acitvityId: "",
                    teacher: "",
                },
            }
        }
    }
</script>

<style scoped>

	.app_al {
		height: 30px;
		line-height: 30px;
		width: 60px;
		border-radius: 15px;
		opacity: 0.8;
		background: rgba(0, 0, 0, .4);
		color: #ffffff;
		font-size: 18px;
		position: fixed;
		top: 10px;
		left: 10px;
		z-index: 3000;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}
	.app_al > span  {
		font-size: 14px;
	}

	.app_poster_bottom > div:nth-of-type(1) {
		min-width: 150px;
	}

	.app_next_btn {
		width: 150px;
		color: #ffffff;
		border-radius: 20px;
	}

	.app_next {
		text-align: center;
	}

	.app_vcell1 {
		color: #909399;
	}

	.app_form {
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: left;
	}

	.app_bot {
		font-size: 14px;
		line-height: 40px;
		color: #666;
	}

	.app_bot a {
		font-weight: 600;
	}

	.app_witem_zan {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}

	.app_flower {
		width: 18px;
		height: 18px;
		margin-right: 5px;
	}

	.app_witem {
		width: 50%;
		height: 40px;
		line-height: 40px;
		color: #ffffff;
		font-size: 14px;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.app_works_info {
		font-size: 14px;
		text-align: left;
		line-height: 22px;
	}

	.app_works_container {
		/*background: #0C2AA4;*/
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		height: 30px;
		font-size: 14px;
	}

	.app_rank_img {
		border-radius: 3px;
		width: 40px;
		min-width: 40px;
		height: 40px;
	}

	.app_works_img {
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
	}

	.app_works_item {
		width: 48%;
		margin-bottom: 20px;
		position: relative;
	}

	.app_works {
		display: flex;
		flex-wrap: wrap;
		margin: 10px;
	}

	.app_search_prefix {
		width: 70px;
		height: 40px;
		line-height: 40px;
		border: 1px solid;
		/*border: 1px solid #0C2AA4;*/
		/*background: #0C2AA4;*/
		color: #ffffff;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
		margin-right: 10px;
	}

	.el-icon-trophy, .el-icon-edit-outline {
		margin-right: 5px;
	}

	.app_fun_item {
		width: 50%;
		height: 40px;
		line-height: 40px;
		color: #ffffff;
		font-size: 14px;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.app_vline1 {
		border-left: 1px solid #FFFFFF;
		height: 15px;
	}

	.app_fun_container {
		/*background: #0C2AA4;*/
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		height: 40px;
		margin: 10px;
		font-size: 14px;
	}

	.app_rule_icon {
		/*font-weight: 600;*/
		margin-right: 5px;
	}

	.app_rule_item {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
		font-size: 14px;
		color: #595959;
		margin-top: 5px;
		height: 22px;
	}

	.app_card {
		margin: 15px 10px;
		border-radius: 10px;
	}

	.app_tit {
		padding: 10px 0;
		text-align: left;
	}

	.app_status {
		padding: 10px;
		text-align: center;
		font-size: 14px;
		color: #999;
	}

	.app_vline {
		border-left: 1px solid #FFFFFF;
	}

	.app_tit_container {
		/*background: #0C2AA4;*/
		display: flex;
		flex-wrap: nowrap;
		padding: 15px;
	}

	.app_tit_item {
		text-align: center;
		width: 33%;
		height: 60px;
		line-height: 20px;
		color: #ffffff;
		font-size: 14px;
		padding: 10px 0;
	}

	.app_tit_item div:nth-of-type(1) {
		font-size: 18px;
	}

	div::-webkit-scrollbar {
		width: 0;
	}

	.van-popup {
		position: fixed !important;
	}
</style>
