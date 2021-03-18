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
						<el-button class="ae_btn_item" type="primary">发布活动</el-button>
						<el-button class="ae_btn_item" type="primary" @click="showPoster">活动海报</el-button>
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
								<el-form-item label="活动名称">
									<el-input class="aa_form_item" v-model="form.title" placeholder="请输入活动名称"></el-input>
								</el-form-item>

								<el-form-item label="报名时间">
									<el-date-picker class="aa_form_item"
									                v-model="form.signTimeRange"
									                type="datetimerange"
									                :picker-options="pickerOptions"
									                value-format="yyyy-MM-dd HH:mm:SS"
									                range-separator="至"
									                start-placeholder="开始日期"
									                end-placeholder="结束日期"
									                align="right">
									</el-date-picker>
								</el-form-item>


								<el-form-item label="投票时间">
									<el-date-picker class="aa_form_item"
													v-model="form.voteTimeRange"
													type="datetimerange"
													:picker-options="pickerOptions"
													value-format="yyyy-MM-dd HH:mm:SS"
													range-separator="至"
													start-placeholder="开始日期"
													end-placeholder="结束日期"
													align="right">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="上传数量">
									<el-input-number v-model="form.uploadLimit" @change="handleChange" :min="1" :max="10"></el-input-number>
								</el-form-item>


								<el-form-item label="类型">
									<el-radio-group v-model="form.top">
										<el-radio label="banner">banner模式</el-radio>
										<el-radio label="single">单图模式</el-radio>
									</el-radio-group>
								</el-form-item>

								<el-upload
										class="ae_upload"
										action="https://jsonplaceholder.typicode.com/posts/"
										:on-change="handleChange"
										:file-list="fileList">
									<el-button size="small" type="primary">点击上传顶部图片</el-button>
									<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过3M</div>
								</el-upload>

								<el-form-item label="颜色风格">
									<el-color-picker v-model="form.color" @change="setColor"></el-color-picker>
								</el-form-item>

								<span slot="footer" class="dialog-footer">
						        <el-button @click="close" >取 消</el-button>
						        <el-button type="primary" @click="onSubmit" >保 存</el-button>
					        </span>

							</el-tab-pane>
							<el-tab-pane label="活动介绍" name="activity">
								<tinymce-text ref="tinymceRef" id="tinymce" @release="release" :btnName="'保存'"></tinymce-text>
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
			<div class="ae_overapp_container" v-show="showOverApp">
				<div class="ae_over_app" ref="overImageWrapper">
					<el-image style="border-top-left-radius: 3px; border-top-right-radius: 3px;" :src="form.img" fit="fill"></el-image>
					<div class="ae_over_tc">
						<div class="ae_over_title">
							{{ form.name }}
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
	    mounted() {
	    },
        methods: {
			setFormContent(row) {
        		this.form.title = row.title;
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
                this.showOverlay = true;
                this.$nextTick(function () {
                    this.posterQrcode = new QRCode(this.$refs.posterQrcodeRef, {
                        width: 160,
                        height: 160,
                        text: this.rootUrl + "/#/am",
                        colorDark : this.form.color,
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
            },

            toMainPage() {
                this.$emit("toPage", "main");
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
                rootUrl: "http://192.168.1.6:8080/",
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
                    uploadLimit: 3,
                    colorStyle: "#0C2AA4",
                    title: "",
					voteTimeRange: [],
                    signTimeRange: [],
                    status: "",
                    top: "banner",
	                img: require('@/assets/img/em/tp2.png'),
                    content: "",
                },
                rules: [],
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

</style>