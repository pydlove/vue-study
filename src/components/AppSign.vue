<template>
	<!--eslint-disable-->
	<div>
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
			<div class="app_tit_container" :style="{ background: color }">
				<div class="app_tit_item">
					<div>{{ activity.totalVoteNum }}</div>
					<div>总票数</div>
				</div>
				<div class="app_vline"></div>
				<div class="app_tit_item">
					<div>{{ activity.totalPlayersNum }}</div>
					<div>选手数</div>
				</div>
				<div class="app_vline"></div>
				<div class="app_tit_item">
					<div>{{ activity.accessNum }}</div>
					<div>访问量</div>
				</div>
			</div>
			<div class="app_status">
				活动未开始
			</div>
		</el-card>

		<el-card class="app_card">
			<div class="app_rule_item">
				<van-icon class="app_rule_icon" name="clock-o" :style="{ color: color }" />报名开始：
				{{ activity.signStart }}
			</div>
			<div class="app_rule_item">
				<van-icon class="app_rule_icon" name="clock-o" :style="{ color: color }" />报名截止：
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
						<el-input class="aa_form_item" v-model="form.phone" placeholder="请输入联系方式"></el-input>
					</el-form-item>
					<van-divider/>

					<div class="app_next">
						<el-button class="app_next_btn" @click="toNext"
						           :style="{ borderColor: color,  background: color }">
							下一步
						</el-button>
					</div>
				</div>

				<div v-else-if="next == 2">
					<el-form-item label="作品名称" required>
						<el-input class="aa_form_item" v-model="form.worksName" placeholder="请输入作品名称"></el-input>
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
						           :style="{ borderColor: color,  background: color }">
							上一步
						</el-button>

						<el-button class="app_next_btn" @click="submit" :disabled="submitDisabled"
						           :style="{ borderColor: color,  background: color }">
							报名
						</el-button>
					</div>
				</div>
			</el-form>
		</el-card>

		<div class="app_bot">
			<a href="https://www.aiocloud.ltd/#/mainApp" :style="{ color: color, }">爱启云科技</a>提供支持
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Area from '@/assets/json/area.js'

    export default {
        name: "AppSign",
        props: [ "activity", "activityBanners", "color" ],
	    mounted() {
            this.areaList = Area;
	    },
	    methods: {
            /**
             * 提交
             * @param {*} 参数 参数说明
             * @author panyong
             */
            submit() {
                if(this.form.worksName == null || this.form.worksName == "") {
                    this.$toast.fail('请输入作品名称');
                    return false;
                }
                if(this.form.fileList == null || this.form.fileList == "" || this.form.fileList.length == 0) {
                    this.$toast.fail('请上传作品');
                    return false;
                }
                this.submitRequest();
            },
            async submitRequest() {
                for(var i in this.form.fileList) {
                    var item = this.form.fileList[i];
                    this.form.worksImage = this.form.worksImage + "," + item.url;
                }
                this.form.worksImage = this.form.worksImage.substring(1, this.form.worksImage.length)
                this.form.acitvityId = this.activity.id;
                console.log(this.form)
                this.submitDisabled = true;
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_sign, this.form, "POST");
                if(data.code == 200) {
                    this.$toast.success('报名成功');
                    this.submitDisabled = false;
                    this.clearForm();
                    this.$emit("changePage", "detail");
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
                if(this.form.name == null || this.form.name == "") {
                    this.$toast.fail('请输入姓名');
					return false;
                }
                if(this.form.age == null || this.form.age == "") {
                    this.$toast.fail('请输入年龄');
                    return false;
                }
                if(this.form.sex == null || this.form.sex == "") {
                    this.$toast.fail('请选择性别');
                    return false;
                }
                if(this.form.area == null || this.form.area == "") {
                    this.$toast.fail('请选择所在地');
                    return false;
                }
                if(this.form.phone == null || this.form.phone == "") {
                    this.$toast.fail('请输入手机号码');
                    return false;
                } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.form.phone))) {
                    this.$toast.fail('请输入正确的手机号码');
                    return false;
                }
                this.next = 2;
            },

            toPrevious() {
                this.next = 1;
            },

		    /**
		     * 图片上传 删除 审计
		     * @param {*} 参数 参数说明
		     * @author panyong
		     */
            async uploadImgs(file) {
                let params = new FormData();
                params.append("file", file.file);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_upload, params, "POST");
                if (data.code === 200) {
	                this.form.fileList.push({ url: data.data.fileUrl, name: data.data.fileName });
                    return true;
                }
            },
		    async uploadDelete(file) {
                let params = new FormData();
                params.append("fileName", file.name);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_works_delete, params, "POST");
                if (data.code === 200) {
	                var files = [];
	                for(var i in this.form.fileList) {
                        var item = this.form.fileList[i];
                        if(file.name != item.name) {
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
                },
                // rules: {
                //     name: [
                //         {type: 'string', required: true, message: '请输入姓名', trigger: ['change', 'blur']},
                //     ],
                //     sex: [
                //         {type: 'string', required: true, message: '请选择性别', trigger: ['change', 'blur']},
                //     ],
                //     area: [
                //         {type: 'string', required: true, message: '请选择所在地', trigger: ['change', 'blur']},
                //     ],
                //     phone: [
                //         {type: 'string', required: true, message: '请输入手机号码', trigger: ['change', 'blur'], validator: validPhone},
                //     ],
                //     worksName: [
                //         {type: 'string', required: true, message: '请输入作品名称', trigger: ['change', 'blur']},
                //     ],
                //     fileList: [
                //         {type: 'array', required: true, message: '请上传作品', trigger: ['change', 'blur']},
                //     ],
                // },
            }
	    }
    }
</script>

<style scoped>

	.app_poster_bottom > div:nth-of-type(1) {
		min-width: 150px;
	}


	.app_next_btn {
		width: 150px;
		color: #ffffff;
	}

	.app_next {
		text-align: center;
	}

	.app_vcell1 {
		color: #909399;
	}

	.app_form {
		padding-top: 20px;
		padding-bottom: 20px;
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
		border-left: 1px solid #bfbfbf;
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
		border-left: 1px solid #bfbfbf;
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
		height: 40px;
		line-height: 20px;
		color: #ffffff;
		font-size: 14px;
	}

	.app_tit_item div:nth-of-type(1) {
		font-size: 18px;
	}

	div::-webkit-scrollbar {
		width: 0;
	}
</style>

<style>
	.app_code_in .van-field__control {
		height: 43px !important;
		line-height: 43px !important;
	}

	.app_code_dialog {
		position: absolute !important;
		top: 45%;
		left: 50%;
		width: 320px;
		overflow: hidden;
		font-size: 16px;
		background-color: #fff;
		border-radius: 3px;
		-webkit-transform: translate3d(-50%, -50%, 0);
		transform: translate3d(-50%, -50%, 0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: .3s;
		transition: .3s;
		-webkit-transition-property: opacity, -webkit-transform;
		transition-property: opacity, -webkit-transform;
		transition-property: transform, opacity;
		transition-property: transform, opacity, -webkit-transform;
	}

	.app_code_dialog .van-dialog__header {
		padding-top: 0px;
		font-weight: 500;
		line-height: 50px;
		text-align: center;
		background: #eeeeee;
	}

	.app_poster_card .el-card__header {
		background: #ffffff;
	}

	.app_poster_card .el-card__body {
		background: #ffffff;
	}

	.app_poster_dialog {
		position: absolute !important;
		top: 40% px;
		left: 50%;
		width: 320px;
		overflow: hidden;
		font-size: 16px;
		background-color: #fff;
		border-radius: 3px;
		-webkit-transform: translate3d(-50%, -50%, 0);
		transform: translate3d(-50%, -50%, 0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: .3s;
		transition: .3s;
		-webkit-transition-property: opacity, -webkit-transform;
		transition-property: opacity, -webkit-transform;
		transition-property: transform, opacity;
		transition-property: transform, opacity, -webkit-transform;

	}

	.app_dialog .van-dialog__header {
		padding: 20px;
		color: #f5222d;
	}

	.app_dialog {
		position: absolute !important;
		top: 45%;
		left: 50%;
		width: 320px;
		overflow: hidden;
		font-size: 16px;
		background-color: #fff;
		border-radius: 16px;
		-webkit-transform: translate3d(-50%, -50%, 0);
		transform: translate3d(-50%, -50%, 0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: .3s;
		transition: .3s;
		-webkit-transition-property: opacity, -webkit-transform;
		transition-property: opacity, -webkit-transform;
		transition-property: transform, opacity;
		transition-property: transform, opacity, -webkit-transform;
	}

	.app_up_eitem .el-form-item__label {
		float: none;
	}

	.app_vcell {
		padding: 10px 0px;
	}

	.van-cell::after {
		position: absolute;
		box-sizing: border-box;
		content: ' ';
		pointer-events: none;
		right: 16px;
		bottom: 0;
		left: 16px;
		border-bottom: 0px solid #ebedf0;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
	}

	.app_form .el-input__inner {
		border-radius: 0px;
		border: 0px;
		padding: 0px;
	}

	.app_form .el-form-item__content {
		position: unset;
	}

	.app_form .el-form-item {
		margin-bottom: 10px !important;
		/*position: relative;*/
	}
	.app_form .el-form-item__error {
		position: absolute;
		top: 12px;
		right: 20px;
		left: unset;
	}

	.el-dropdown-menu {
		z-index: 2010 !important;
		padding: 0px;
		margin: 20px 0;
	}

	.el-dropdown-menu__item {
		width: 60px !important;
		text-align: center;
		border-bottom: 1px solid #eee;
	}

	.van-popup {
		position: absolute;
		bottom: 0px;
	}

	.van-search__action {
		padding: 0px;
	}

	.app_search .van-search__content {
		height: 40px;
		background-color: #ffffff;
		border: 1px solid #d9d9d9;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
		border-right: 0px;
	}

	.app_search .van-field__left-icon {
		line-height: 30px;
	}

	.app_search .van-field__control {
		line-height: 30px;
	}

	[class*=" el-icon-"], [class^=el-icon-] {
		/*font-weight: 500 !important;*/
	}

	.app_card1 .el-card__body {
		padding: 0px;
		padding-bottom: 10px;
	}

	.app_card .el-card__body {
		padding: 0 10px;
	}
</style>