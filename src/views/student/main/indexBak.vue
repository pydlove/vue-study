<template>
	<!--eslint-disable-->
	<div>
		<div class="aioc-pc">
			<Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'"
			        :bgColor="'bg-black'" :bluser="bluser"></Header>
		</div>
		<div class="aioc-container1" :style="'width:' + clientWidth + 'px; height:' + clientHeight + 'px;'">
			<div class="main">
				<el-card class="mb-5 mcard">
					<div slot="header" class="clearfix">
						<span class="fl fb">已选课程</span>
						<span class="gd ahover fs-12" @click="toPersonCenterPage('myClass')">查看更多</span>
					</div>
					<div class="wdxk">
						<el-table :data="activeClasses" border size="mini" style="width: 100%">
							<el-table-column prop="name" label="班级名称"
							                 show-overflow-tooltip="true"></el-table-column>
							<el-table-column prop="mainName" label="课程大类"
							                 show-overflow-tooltip="true"></el-table-column>
							<el-table-column prop="subName" label="课程小类"
							                 show-overflow-tooltip="true"></el-table-column>
							<el-table-column prop="address" label="地点"
							                 show-overflow-tooltip="true"></el-table-column>
							<el-table-column prop="endType" label="结束方式" width="200" :show-overflow-tooltip="true">
								<template slot-scope="scope">
									{{handleEnd(scope.row)}}
								</template>
							</el-table-column>
							<el-table-column prop="isRepeat" width="300" label="时间" :show-overflow-tooltip="true">
								<template slot-scope="scope">
									{{handleTime(scope.row)}}
								</template>
							</el-table-column>
							<el-table-column prop="teacherName" label="老师"
							                 show-overflow-tooltip="true"></el-table-column>
							<el-table-column prop="score" label="完成学习获得学分" :show-overflow-tooltip="true"></el-table-column>
						</el-table>
					</div>
				</el-card>

				<div class="dffn">
					<el-card class="mc1 wow bounceInLeft">
						<div slot="header" class="clearfix">
							<span class="fl fb">活动列表</span>
							<span class="gd ahover fs-12" @click="toActivityPage">查看更多</span>
						</div>
						<div class="hdbox">
							<el-card class="mb-10 hdcard" v-for="item in activities" :key="item.id">
								<div class="hdlb">
									<el-image
											style="width: 180px;height: 130px;border-radius: 3px;"
											:src="item.poster"
											fit="fill" :preview-src-list="[item.poster]"></el-image>
									<div class="hdxx">
                                    <span class="hdzt">
                                        {{item.title.length >= 26 ? (item.title.substring(0, 26) + "..."):item.title}}
                                    </span>
										<span class="hdms">
                                        {{item.description.length > 100 ? (item.description.substring(0, 80) + "...") : item.description}}
                                    </span>
										<div class="item"><i class="naozhongb"></i>活动时间：{{ item.startTime }} - {{
											item.endTime }}
										</div>
										<div class="item"><i class="weizhib"></i>
											活动地点：
											{{ item.province }}{{ item.city }}{{ item.county }}({{ item.address }})
										</div>
									</div>
									<span :class="(item.status != '3'? 'hdbqg':'hdbqgr') + ' hdbq'">
                                        {{fmtActivityStatus(item.status)}}
                                   </span>
									<span class="ckxq ahover" @click="toActivityDetailPage(item)">查看详情</span>
								</div>
							</el-card>
						</div>
					</el-card>

					<div class="mc2 wow bounceInRight">
						<el-card class="mb-5 mcard">
							<div slot="header" class="clearfix">
								<span class="fl fb">完结课程</span>
								<span class="gd ahover fs-12" @click="toPersonCenterPage('myClass')">查看更多</span>
							</div>
							<div class="wdxk">
								<el-table :data="endClasses" border size="mini" style="width: 100%">
									<el-table-column prop="name" label="班级名称"
									                 show-overflow-tooltip="true"></el-table-column>
									<el-table-column prop="mainName" label="课程大类"
									                 show-overflow-tooltip="true"></el-table-column>
									<el-table-column prop="subName" label="课程小类"
									                 show-overflow-tooltip="true"></el-table-column>
									<el-table-column prop="endType" label="结束方式" width="100" :show-overflow-tooltip="true">
										<template slot-scope="scope">
											{{handleEnd(scope.row)}}
										</template>
									</el-table-column>
									<el-table-column prop="teacherName" label="老师"
									                 show-overflow-tooltip="true"></el-table-column>
									<el-table-column prop="score" label="获得学分" :show-overflow-tooltip="true"></el-table-column>
								</el-table>
							</div>
						</el-card>

						<el-card class="mb-5 mcard">
							<div slot="header" class="clearfix">
								<span class="fl fb">证书获得</span>
								<span class="gd ahover fs-12" @click="toPersonCenterPage('myCertificate')">查看更多</span>
							</div>
							<div>
								<el-table :data="certificates" border size="mini" style="width: 100%">
									<el-table-column prop="uuid" label="证书编号"
									                 show-overflow-tooltip="true"></el-table-column>
									<el-table-column prop="name" label="证书名称"
									                 show-overflow-tooltip="true"></el-table-column>
									<el-table-column prop="unit" label="颁发机构"
									                 show-overflow-tooltip="true"></el-table-column>
									<el-table-column prop="updateTime" label="获得时间"
									                 show-overflow-tooltip="true"></el-table-column>
									<el-table-column label="操作">
										<template slot-scope="scope">
											<el-button type="primary" size="mini" class="aioc-btn1"
											           @click="toSee(scope.$index, scope.row)">
												<i class="el-icon-right"></i>
												去查看
											</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</el-card>

						<el-card class="mcard">
							<div slot="header" class="clearfix">
								<span class="fl fb">支付订单</span>
								<span class="gd ahover fs-12" @click="toPersonCenterPage('myPay')">查看更多</span>
							</div>
							<div>
								<el-table :data="orders" border size="mini" style="width: 100%">
									<el-table-column prop="outTradeNo" label="订单编号" show-overflow-tooltip="true"></el-table-column>
									<el-table-column prop="totalAmount" label="报名费用" show-overflow-tooltip="true">
										<template slot-scope="scope">
											<span class="color-fa5c26 fb">{{scope.row.totalAmount}}元</span>
										</template>
									</el-table-column>
									<el-table-column prop="status" label="状态" show-overflow-tooltip="true">
										<template slot-scope="scope">
											<span :class="fmtOrderStatusColor(scope.row.status) + ' fb'">
												{{fmtOrderStatus(scope.row.status)}}
											</span>
										</template>
									</el-table-column>
									<el-table-column prop="payWay" label="支付方式" show-overflow-tooltip="true">
										<template slot-scope="scope">
											<span >{{fmtPayWay(scope.row.payWay)}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="description" label="费用用途"
									                 show-overflow-tooltip="true"></el-table-column>
								</el-table>
							</div>
						</el-card>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Header from "@/components/Header"

    export default {
        name: "index",
        components: {Header},
        created() {
            // 判断用户是否登录
            this.judgeIsLogin();
        },
        mounted() {
            new this.$wow.WOW({
                live: false
            }).init();
        },
        methods: {
            async judgeIsLogin() {
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_login_judgeIsLogin, {}, "GET");
                if (data.code === 200) {
                    if (data.data.isLogin == "login") {
                        this.bluser = data.data.bluser;
                        this.initActivities();
                        this.initActiveClasses();
                        this.initEndClasses();
                        this.initCertificates();
                        this.initOrder();
                    } else {
                        this.$router.push({name: "studentLogin"});
                    }
                } else {
                    this.$router.push({name: "studentLogin"});
                }
            },

            async initActivities() {
                let params = new FormData()
                params.append("page", 0);
                params.append("limit", 3);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_activity_top, params, "POST");
                if (data.code === 200) {
                    this.activities = data.data;
                    console.log(this.activities)
                }
            },

            fmtActivityStatus(status) {
                switch (status) {
                    case "0":
                        return "已发布";
                    case "1":
                        return "未发布";
                    case "2":
                        return "进行中";
                    case "3":
                        return "已结束";
                    case "4":
                        return "报名中";
                    case "5":
                        return "报名结束";
                    default:
                        return status;
                }
            },

            async initActiveClasses() {
                let params = new FormData()
                params.append("page", 0);
                params.append("limit", 2);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_class_active, params, "POST");
                if (data.code === 200) {
                    this.activeClasses = data.data;
                }
            },

            async initEndClasses() {
                let params = new FormData()
                params.append("page", 0);
                params.append("limit", 2);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_class_end, params, "POST");
                if (data.code === 200) {
                    this.endClasses = data.data;
                }
            },

            handleEnd(row) {
                const endType = row.endType;
                if(endType == "0") {
                    const frequency = row.frequency;
                    return "限次数" + "(" + frequency + ")";
                } else if (endType == "1") {
                    const endDate = row.endDate;
                    return "限日期" + "(" + endDate + ")";
                }
            },

            handleTime(row) {
                const isRepeat = row.isRepeat;
                const week = row.whichDay;
                const startTime = row.startTime;
                const endTime = row.endTime;
                if(isRepeat == "0") {
                    return "每天" + " / (" + startTime + " - " + endTime + ")";
                } else if (isRepeat == "1") {
                    return "隔天" + " / (" + startTime + " - " + endTime + ")";
                } else if (isRepeat == "2") {
                    return "每周" + " / " + week + " / (" + startTime + " - " + endTime + ")";
                } else if (isRepeat == "3") {
                    return "隔周" + " / " + week + " / (" + startTime + " - " + endTime + ")";
                }
            },

            async initCertificates() {
                let params = new FormData()
                params.append("page", 0);
                params.append("limit", 2);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_certificate_my, params, "POST");
                if (data.code === 200) {
                    this.certificates = data.data;
                }
            },

			async initOrder() {
                let params = new FormData()
                params.append("page", 0);
                params.append("limit", 2);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_order_my, params, "POST");
                if (data.code === 200) {
                    this.orders = data.data;
                }
            },

            fmtOrderStatus(status) {
				switch (status) {
					case "00":
					    return "未支付";
                    case "01":
                        return "已成功";
                    case "10":
                        return "订单关闭";
                    case "02":
                        return "支付失败";
                    case "03":
                        return "已下单";
                    case "04":
                        return "申请退款";
                    case "05":
                        return "退款成功";
					case "06":
                        return "退款失败";
                    default:
						return status;
				}
            },

            fmtOrderStatusColor(status) {
                switch (status) {
                    case "00":
                        return "color-fa5c26";
                    case "01":
                        return "color-67C23A";
                    case "10":
                        return "color-909399";
                    case "02":
                        return "color-fa5c26";
                    case "03":
                        return "color-606266";
                    default:
                        return status;
                }
            },

            fmtPayWay(payWay) {
                switch (payWay) {
                    case "0":
                        return "支付宝";
                    case "1":
                        return "微信";
                    default:
                        return "";
                }
            },

            toActivityPage() {
                this.toNewPage("activity");
            },

            toPersonCenterPage(currentMenu) {
                this.toNewPage("personCenter", "currentMenu", currentMenu);
            },

            toActivityDetailPage(item) {
                this.toNewPage("activityDetail", "activity", item);
            },

            toNewPage(to, key, value) {
                const detail = this.$router.resolve({name: to});
                if (key != undefined && key != null && value != null && value != undefined) {
                    this.$utils.setStorage(key, value);
                }
                window.open(detail.href, '_blank');
            },

            toSee() {
                this.toNewPage("certificate");
            },

        },
        data() {
            return {
                activePage: '首页',
                bluser: "",

                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight - 100,
                certificates: [],
                activities: [],
                activeClasses: [],
                endClasses: [],
                orders: [],
            }
        },
    }
</script>

<style scoped>
	.main {
		width: 1500px;
		margin: 10px auto;
	}

	.mc1 {
		width: 60%;
	}

	.mc2 {
		margin-left: 5px;
		width: 40%;
	}

	.gd {
		float: right;
		font-size: 12px;
		color: #2b90ff;
	}

	.ahover:hover {
		color: #ff7521;
	}

	.hdlb {
		display: flex;
		flex-wrap: nowrap;
		position: relative;
	}

	.hdxx {
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	.hdzt {
		font-size: 18px;
		margin-bottom: 10px;
		margin-left: 20px;
		font-weight: 600;
	}

	.hdms {
		margin-left: 20px;
		font-size: 14px;
		width: 645px;
		height: 50px;
		line-height: 25px;
		color: #707070;
	}

	.item {
		display: flex;
		color: #1296db;
		font-size: 14px;
		line-height: 24px;
		margin-bottom: 2px;
		margin-left: 10px;
	}

	.ckxq {
		position: absolute;
		bottom: 0px;
		right: 0px;
		font-size: 14px;
		color: #409EFF;
	}

	.wdxk {
		text-align: left;
		font-size: 14px;
	}

	.hdcard {
		position: relative;
	}

	.hdbq {
		display: inline-block;
		width: 50px;
		height: 16px;
		font-size: 12px;
		font-weight: 600;
		color: #ffffff;
		padding: 5px 5px 12px 5px;
		position: absolute;
		top: -20px;
		right: 5px;
	}

	.hdbqg {
		background: url("../../../assets/img/biaoqiang.png") 0 0 no-repeat;
		background-size: 100% 100%;
	}

	.hdbqgr {
		background: url("../../../assets/img/biaoqiangr.png") 0 0 no-repeat;
		background-size: 100% 100%;
	}

	.mcard {
		/*height: 210px;*/
		min-height: 210px;
	}

	/*媒体查询（电脑）*/
	@media screen and (min-width: 1529px) {
	}

	/*媒体查询（平板）*/
	@media screen and (min-width: 769px) and (max-width: 996px) {

	}

	/*媒体查询（手机）*/
	@media screen and (max-width: 768px) {

	}
</style>

<style>
	/*媒体查询（电脑）*/
	@media screen and (min-width: 1529px) {
	}

</style>