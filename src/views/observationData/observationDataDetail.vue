<template>
	<!--eslint-disable-->
	<div class="nd-container">
		<NormalHeader :currentMenu="'observationData'"></NormalHeader>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
			<el-breadcrumb-item :to="{ path: '/home' }">
				<i class="el-icon-s-home"></i>首页
			</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/observationData' }">观测数据</el-breadcrumb-item>
			<el-breadcrumb-item>观测日志详情</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="nd-background">
			<div class="nd-content">
				<el-divider class="mb-40" content-position="left">观测日志</el-divider>

				<div class="aiocloud-card obd-content">
					<div class="dffn-ac obd-item">
						<div>
							观测日期 :
						</div>
						<div>
							{{ observationLog.observerDate }}
						</div>

						<div>
							天气情况 :
						</div>
						<div>
							{{ observationLog.weather }}
						</div>
					</div>

					<div class="dffn-ac obd-item">
						<div>
							观测人 :
						</div>
						<div>
							{{ observationLog.observer }}
						</div>

						<div>
							观测类型 :
						</div>
						<div>
							{{ fmtObserverType(observationLog.observerType) }}
						</div>
					</div>

					<div class="dffn-ac obd-item">
						<div>
							文件数量 :
						</div>
						<div>
							{{ observationLog.clObservationDatas.length }}
						</div>
					</div>

					<div class="dffn obd-item1">
						<div>
							视宁度 :
						</div>
						<div>
							{{ observationLog.seeing }}
						</div>
					</div>

					<div class="dffn obd-item1">
						<div>
							备注 :
						</div>
						<div>
							{{ observationLog.remark }}
						</div>
					</div>
				</div>

				<div class="obd-title">
					<el-divider content-position="left">观测数据</el-divider>
				</div>

				<div v-if="observationLog.clObservationDatas.length > 0" class="pt-20">
					<div v-for="(item, index) in observationLog.clObservationDatas" :key="index" class="dffn obd-data aiocloud-card">
						<van-image class="obd-data-img"
						           width="160px"
						           height="100px"
						           fit="contain"
						           :src="item.picture"
						/>

						<div>
							<div class="dffn obd-data-item">
								<div>
									观测时间:
								</div>
								<div>
									{{ item.beginTime }}
								</div>

								<div>
									观测目标:
								</div>
								<div>
									{{ item.target }}
								</div>
							</div>

							<div class="dffn obd-data-item">
								<div>
									曝光时间:
								</div>
								<div>
									{{ item.exposureTime }}
								</div>

								<div>
									观测波长:
								</div>
								<div>
									{{ item.observationBand }}
								</div>
							</div>

							<div v-if="item.video != '' && item.video != null" class="dffn obd-data-item">
								<div>
									观测视频:
								</div>
								<div>
									{{ item.video }}
								</div>
							</div>
						</div>

						<div class="obd-data-down">
							<el-button class="obd-data-btn" type="primary" size="mini" @click="applicationDownload">申请下载</el-button>
						</div>
					</div>
				</div>

				<div v-else>
					<van-empty image="search" description="暂无观测数据"/>
				</div>
			</div>
		</div>

		<Footer></Footer>

		<LoginDialog ref="loginDialogRef"></LoginDialog>
	</div>
</template>
<!--eslint-disable-->
<script>
    import NormalHeader from "@/components/NormalHeader";
    import Footer from "@/components/Footer";
    import LoginDialog from "@/views/login/loginDialog.vue"

    export default {
        name: "observationDataDetail",
        components: {
            NormalHeader,
            Footer,
            LoginDialog
        },
        data() {
            return {
                observationDataDetail: {
                    date: "",
                },
                observationLog: {
                    observerDate: "",
                    observer: "",
                    observerType: "",
                    applicant: "",
                    weather: "",
                    seeing: "",
                    clObservationDatas: "",
                },
            }
        },
        mounted() {
            this.observationDataDetail = this.$utils.getStorage("observationDataDetail");
            this.search();
        },
        methods: {
            applicationDownload() {
                // 1、确认是否登录
                // 未登录 去登陆
                // 已登录 确定是否申请 确定发起申请工单
                let userToken = this.$utils.getStorage("aiocloudToken");
                if(userToken != undefined && userToken != null && userToken != "") {
                    this.$confirm('确定申请下载数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.sendOrder();
                    }).catch(() => {
                    });
                }
                else {
                    this.$refs.loginDialogRef.open();
                }
            },

            async sendOrder() {

            },

            fmtObserverType(observerType) {
                switch (observerType) {
                    case "0":
                        return "常规观测";
                    case "1":
                        return "偏振）光谱观测";
                    case "2":
                        return "晴天仪器维护";
                    case "3":
                        return "晴天实验观测";
                    default:
                        return observerType;
                }
            },

            /**
             * 查询观测数据
             * @param {*} 参数 参数说明
             * @author panyong
             */
            async search() {
                let params = new FormData();
                params.append("observerDate", this.observationDataDetail.date);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_detail, params, "POST");
                if (data.code == 200) {
                    if (data.data) {
                        this.observationLog = data.data;
                        console.log(this.observationLog)
                    }
                    return true;
                }
            },
        }
    }
</script>

<style scoped>
	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
		.obd-title {
			text-align: right;
			font-size: 16px;
			color: #333333;
			margin-top: 40px;
		}

		.obd-content {
			width: 900px;
		}

		.obd-item, .obd-item1 {
			line-height: 36px;
			font-size: 14px;
		}

		.obd-item > div:nth-of-type(2n) {
			width: 220px;
			text-align: left;
			margin-left: 10px;
			color: #333333;
		}

		.obd-item > div:nth-of-type(2n + 1) {
			width: 100px;
			color: #fa541c;
			font-weight: 600;
			text-align: right;
		}

		.obd-item1 > div:nth-of-type(2n) {
			text-align: left;
			margin-left: 10px;
			color: #333333;
			line-height: 28px;
			padding-top: 5px;
		}

		.obd-item1 > div:nth-of-type(2n + 1) {
			width: 100px;
			min-width: 100px;
			color: #fa541c;
			font-weight: 600;
			text-align: right;
		}

		.obd-data {
			margin-bottom: 20px;
		}

		.obd-data-img {
			min-width: 160px;
		}

		.obd-data-item {
			line-height: 36px;
		}

		.obd-data-item > div:nth-of-type(2n) {
			width: 180px;
			text-align: left;
			margin-left: 10px;
			color: #333333;
		}

		.obd-data-item > div:nth-of-type(2n + 1) {
			width: 100px;
			color: #fa541c;
			font-weight: 600;
			text-align: right;
		}
		.obd-data-down {
			position: relative;
		}

		.obd-data-btn {
			position: absolute;
			bottom: 0px;
			left: 0px;
		}
	}
</style>

<style>
	.el-divider__text {
		font-size: 16px;
		font-weight: 600;
		background: #eeeeee !important;
	}
	.obd-data-btn {
		background: #fa541c;
		border: 1px solid #fa541c;
	}
	.obd-data-btn:hover {
		background: #fa541c;
		border: 1px solid #fa541c;
	}
</style>