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
									<el-input class="aa_form_item" v-model="form.name" placeholder="请输入活动名称"></el-input>
								</el-form-item>

								<el-form-item label="活动时间">
									<el-date-picker class="aa_form_item"
									                v-model="form.timeRange"
									                placeholder="请输入活动时间"
									                type="datetimerange"
									                :picker-options="pickerOptions"
									                value-format="yyyy-MM-dd HH:mm:SS"
									                range-separator="至"
									                start-placeholder="开始日期"
									                end-placeholder="结束日期"
									                align="right">
									</el-date-picker>
								</el-form-item>

								<el-form-item label="活动状态">
									<el-switch
											v-model="form.status"
											active-color="#1890ff"
											inactive-color="#bfbfbf"
											active-text="启动活动"
											inactive-text="关闭活动">
									>
									</el-switch>
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
							</el-tab-pane>

							<el-tab-pane label="活动介绍" name="activity">
								<tinymce-text ref="tinymceRef" id="tinymce" @release="release" :btnName="'保存'"></tinymce-text>
							</el-tab-pane>

							<el-tab-pane label="报名设置" name="sign">
								<el-form-item label="报名时间">
									<el-date-picker class="aa_form_item"
									                v-model="form.signTimeRange"
									                placeholder="请输入活动时间"
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
									<el-input-number v-model="form.uploadNum" @change="handleChange" :min="1" :max="10"></el-input-number>
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
							<div class="app_over_rule" :style="{ color: form.color }">
								<div class="app_over_hline" :style="{ borderColor: form.color }"></div>
								活动规则
								<div class="app_over_hline" :style="{ borderColor: form.color }"></div>
							</div>
							<div class="ae_over_time" :style="{ color: form.color }">
								<van-icon class="app_over_rule_icon" name="clock-o" />
								<div>报名时间：{{ form.signTimeRange[0] }} - {{ form.signTimeRange[1] }}</div>
							</div>
							<div class="ae_over_time" :style="{ color: form.color }">
								<van-icon class="app_over_rule_icon" name="clock-o" />
								<div>投票时间：{{ form.timeRange[0] }} - {{ form.signTimeRange[1] }}</div>
							</div>
							<div class="ae_over_time" :style="{ color: form.color }">
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
		    this.setContent();
	    },
        methods: {
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
                    uploadNum: "3",
                    color: "#0C2AA4",
                    name: "默认活动标题",
                    timeRange: ["2021-02-27 14:14:36", "2021-03-27 14:14:36"],
                    signTimeRange: ["2021-02-27 14:14:36", "2021-03-27 14:14:36"],
                    status: "",
                    top: "banner",
	                img: require('@/assets/img/em/tp2.png'),
                    content: "<h1 class=\"ql-align-center\" style=\"margin: 12px 0px; font-size: 18px; font-weight: normal; text-align: center;\"><strong style=\"color: #e60000;\">​活动主题</strong></h1>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">为庆祝XXXX节，弘扬XXXX精神，由XXXX主办的XXXX评选活动。</p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">&nbsp;</p>\n" +
                    "<h1 class=\"ql-align-center\" style=\"margin: 12px 0px; font-size: 18px; font-weight: normal; text-align: center;\"><strong style=\"color: #e60000;\">活动时间</strong></h1>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">报名时间：</p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">2019-05-10 09:00至2019-05-20 20:00</p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\"><strong style=\"color: #e60000;\">投票时间：</strong></p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">2019-05-14 09:00至2019-05-20 20:00</p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">&nbsp;</p>\n" +
                    "<h1 class=\"ql-align-center\" style=\"margin: 12px 0px; font-size: 18px; font-weight: normal; text-align: center;\"><strong style=\"color: #e60000;\">参赛对象</strong></h1>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">XXXXXXXX</p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">&nbsp;</p>\n" +
                    "<h1 class=\"ql-align-center\" style=\"margin: 12px 0px; font-size: 18px; font-weight: normal; text-align: center;\"><strong style=\"color: #e60000;\">活动流程</strong></h1>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">第一阶段：报名阶段</p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">报名时间：5月10日-5月13日</p>\n" +
                    "<ul class=\" list-paddingleft-2\" style=\"margin: 16px 0px 16px 18px; width: 341px; list-style-position: initial; list-style-image: initial; padding-left: 0px; max-width: calc(100% - 18px) !important;\">\n" +
                    "<li style=\"clear: both; list-style: disc;\">\n" +
                    "<p style=\"margin: 10px 0px;\">点击投票页&ldquo;立即报名&rdquo;按钮即可报名；</p>\n" +
                    "</li>\n" +
                    "<li style=\"clear: both; list-style: disc;\">\n" +
                    "<p style=\"margin: 10px 0px;\">禁止上传任何非法、侵权内容。</p>\n" +
                    "</li>\n" +
                    "</ul>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">第二阶段：投票阶段</p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">投票时间：5月14日-5月20日（20日20：00结束投票）</p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">&nbsp;</p>\n" +
                    "<h1 class=\"ql-align-center\" style=\"margin: 12px 0px; font-size: 18px; font-weight: normal; text-align: center;\"><strong style=\"color: #e60000;\">评选规则</strong></h1>\n" +
                    "<ul class=\" list-paddingleft-2\" style=\"margin: 16px 0px 16px 18px; width: 341px; list-style-position: initial; list-style-image: initial; padding-left: 0px; max-width: calc(100% - 18px) !important;\">\n" +
                    "<li style=\"clear: both; list-style: disc;\">\n" +
                    "<p style=\"margin: 10px 0px;\">投票规则：每个微信每天可投3票，只能为同一选手投1票</p>\n" +
                    "</li>\n" +
                    "<li style=\"clear: both; list-style: disc;\">\n" +
                    "<p style=\"margin: 10px 0px;\">投票声明：严禁任何作弊行为，系统会进行自动监测，一经发现立即取消投票资格</p>\n" +
                    "</li>\n" +
                    "</ul>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">&nbsp;</p>\n" +
                    "<h1 class=\"ql-align-center\" style=\"margin: 12px 0px; font-size: 18px; font-weight: normal; text-align: center;\"><strong style=\"color: #e60000;\">奖项设置</strong></h1>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">一等奖X名：奖励XXXX</p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">二等奖X名：奖励XXXX</p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">三等奖X名：奖励XXXX</p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">入围奖X名：奖励XXXX</p>\n" +
                    "<p class=\"ql-align-justify\" style=\"margin: 10px 0px; text-align: justify;\">&nbsp;</p>\n" +
                    "<p class=\"ql-align-center\" style=\"margin: 10px 0px; text-align: center;\">本活动最终解释权归XXX所有</p>\n" +
                    "<p style=\"margin: 10px 0px;\">&nbsp;</p>\n" +
                    "<p style=\"margin: 10px 0px;\">&nbsp;</p>",
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