<template>
	<!--eslint-disable-->
	<div>
		<div class="aioc-pc">
			<Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'"
			        :bgColor="'bg-black'" :bluser="bluser"></Header>
		</div>
		<div class="aioc-container1" :style="'width:' + clientWidth + 'px; height:' + clientHeight + 'px;'">
			<div class="main">
				<div class="hdt mt-40">
					<i class="huodong"></i>
					<span class="fs-20 fb ml-5 mr-20">活动中心</span>
					<i class="huo"></i>
					<span class="ml-5 fs-14 color-606266">2021年最热门的活动看这里</span>
				</div>

				<div class="top1">
					<el-carousel class="elca" interval="5000" :autoplay="true" @mouseover.native="showMore = true;" @mouseout.native="showMore = false;">
						<el-carousel-item v-if="index < 4" v-for="(item, index) in adActivities" :key="item.id" @click.native="toActivityDetailPage(item)">
							<el-image
									style="width: 600px; height: 300px"
									:src="item.poster"
									fit="fill"></el-image>
							<span class="title">{{item.title.length > 19 ? (item.title.substring(0,19) + "..."):(item.title)}}</span>
							<span class="title-container"></span>
						</el-carousel-item>
						<span v-show="showMore" class="more" @click="toActivityPage">更多 <i class="el-icon-arrow-right"></i></span>
						<span v-show="showMore" class="more-container" @click="toActivityPage"></span>
					</el-carousel>

					<div class="tl1">
						<div class="pr" v-for="(item, index) in adActivities" :key="index" @click="toActivityDetailPage(item)">
							<el-image :class="(index < 4 ? 'mb-5':'mt-5') + ' ml-10'"
									style="width: 215px; height: 145px"
									:src="item.poster"
									fit="fill"></el-image>
							<span class="title1">{{item.title.length > 13 ? (item.title.substring(0,13) + "..."):(item.title)}}</span>
							<span class="title-container1"></span>
						</div>
					</div>
				</div>

				<div class="dffn">
					<div>
						<div class="hdt mt-40">
							<i class="rongyu1"></i>
							<span class="fs-20 fb ml-5 mr-20">年度累计评分</span>
							<span class="ml-5 fs-14 color-606266">你本学期累计获得的学分</span>
						</div>

						<div class="xf dffn">
							<Score class="ml-50" :score="bluser.score"></Score>
							<div class="tl xfts">
								<div class="mt-20 ml-90">
									<span class="fs-20">{{bluser.name}}</span>，你好，本学期的累计学分为<span class="fs-30 color-fa5c26">{{bluser.score}}</span>分
								</div>
								<div class="mt-20 fs-12 lh-20 color-ec2c2c dffn">
									<div>
										<el-image :src="require('@/assets/img/avatar/longmao.png')"></el-image>
									</div>
									<div class="ml-20">
										<div class="fb">学分须知：</div>
										<div>
											如果您的学分低于60分，您本学年的成绩将评估为不及格，
											对于不及格的学生，账号将在下学年给予一整年的静默惩戒，即下学年不能够报名科目学习和活动。
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div>
						<div class="hdt mt-40">
							<i class="zhengshu"></i>
							<span class="fs-20 fb ml-5 mr-20">荣誉角</span>
							<span class="ml-5 fs-14 color-606266">你累计获得的证书</span>
						</div>

						<el-card class="ce-card">
							<div class="zwhdzs" v-if="certificates.length == 0">
								<i class="baoqian mr-10"></i><span>暂未获得证书</span>
							</div>
							<el-carousel v-else :autoplay="false" type="card">
								<el-carousel-item v-for="(item, key) in certificates" :key="item.id" @click.native="toSeeCertificates(item)">
									<div :id="key" class="ce">
										<div class="cet">
											{{item.name}}<br/>
										</div>
										<div class="ryzs">
											荣誉证书
										</div>
										<i class="rongyu cei"></i>
										<div class="cejg">
											{{item.unit}}
										</div>
										<div v-show="certificateSelect == item.uuid" class="sjx">
											<i class="el-icon-check dh"></i>
										</div>
									</div>
								</el-carousel-item>
							</el-carousel>
						</el-card>
					</div>
				</div>

				<div class="hdt mt-40">
					<i class="kecheng"></i>
					<span class="fs-20 fb ml-5 mr-20">已选课程</span>
					<span class="ml-5 fs-14 color-606266">你本学期已选课程信息</span>
				</div>

				<el-card class="mt-10">
					<el-table :data="activeClasses" border size="mini">
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
						<el-table-column prop="score" label="获得学分" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column label="操作" width="120px">
							<template slot-scope="scope">
								<el-button type="" size="mini" @click="toEvaluation(scope.row)">
									<div class="dfjc lh-20">
										<i class="pingjia mr-10"></i>
										去评价
									</div>
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<Pagination class="fr mt-10 mb-20" ref="acPage" @search="initActiveClasses"></Pagination>
				</el-card>

				<div class="hdt mt-40">
					<i class="kecheng"></i>
					<span class="fs-20 fb ml-5 mr-20">完结课程</span>
					<span class="ml-5 fs-14 color-606266">你的历史完结课程信息</span>
				</div>

				<el-card class="mt-10">
					<el-table :data="endClasses" border size="mini">
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
						<el-table-column prop="score" label="获得学分" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column label="操作" width="120px">
							<template slot-scope="scope">
								<el-button type="" size="mini" @click="toEvaluation(scope.row)">
									<div class="dfjc lh-20">
										<i class="pingjia mr-10"></i>
										去评价
									</div>
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<Pagination class="fr mt-10 mb-20" ref="ecPage" @search="initEndClasses"></Pagination>
				</el-card>

				<div class="hdt mt-40">
					<i class="huodong1"></i>
					<span class="fs-20 fb ml-5 mr-20">活动经历</span>
					<span class="ml-5 fs-14 color-606266">你的历史活动经历信息</span>
				</div>

				<el-card class="mt-10">
					<el-table :data="activities" size="small" border style="width: 100%">
						<el-table-column prop="img" label="活动海报" width="140px" align="center">
							<template slot-scope="scope">
								<el-image
										style="width: 100px; height: 50px"
										:src="scope.row.poster"
										fit="fit"
										:preview-src-list="[scope.row.poster]"
								></el-image>
							</template>
						</el-table-column>
						<el-table-column prop="title" label="活动主题" show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="startTime" label="活动时间" show-overflow-tooltip="true">
							<template slot-scope="scope">
								{{ scope.row.startTime }} - {{ scope.row.endTime }}
							</template>
						</el-table-column>
						<el-table-column prop="address" label="活动地点" show-overflow-tooltip="true">
							<template slot-scope="scope">
								{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.county }}({{ scope.row.address }})
							</template>
						</el-table-column>
						<el-table-column prop="peopleLimit" label="活动总人数" show-overflow-tooltip="true" align="center"></el-table-column>
						<el-table-column prop="score" label="累计学分" show-overflow-tooltip="true" align="center"></el-table-column>
						<el-table-column prop="cost" label="报名费用(¥)" show-overflow-tooltip="true" align="center">
							<template slot-scope="scope">
								<div v-if="scope.row.isFree == '0'">
									{{scope.row.cost}}
								</div>
								<div v-else-if="scope.row.isFree == '1'">
									免费
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="signupStart" label="报名开始时间" show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="signupEnd" label="报名结束时间" show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="teachers" label="负责人" show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="status" label="活动状态" show-overflow-tooltip="true" align="center">
							<template slot-scope="scope">
								{{fmtActivityStatus(scope.row.status)}}
							</template>
						</el-table-column>
					</el-table>
					<Pagination class="fr mb-20 mt-20" ref="atPage" @search="initActivities"></Pagination>
				</el-card>

				<div class="hdt mt-40">
					<i class="jiaofei"></i>
					<span class="fs-20 fb ml-5 mr-20">缴费流水</span>
					<span class="ml-5 fs-14 color-606266">你的历史缴费流水信息</span>
				</div>

				<el-card class="mt-10 mb-20">
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
					<Pagination class="fr mb-20 mt-20" ref="orPage" @search="initOrder"></Pagination>
				</el-card>
				<TeacherEvaluation ref="teacherEvaluationRef"></TeacherEvaluation>
			</div>

			<Footer></Footer>

			<div v-show="congratulate" class="zbz" :style="{width: clientWidth + 'px', height: clientHeight + 'px',}"></div>
			<Special v-show="congratulate" class="spec" :style="{left: ((clientWidth-640)/2) + 'px', top: ((clientHeight + 100 - 630)/2) + 'px',}"></Special>
			<i v-show="congratulate" class="el-icon-error con-close" :style="{right: ((clientWidth-640)/2 - 50) + 'px', top: ((clientHeight + 100 - 630)/2) + 'px',}"
				@click="closeCon"
			></i>
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Header from "@/components/Header"
    import Footer from "@/components/Footer"
    import Score from  "@/components/Score"
    import Pagination from  "@/components/Pagination"
    import TeacherEvaluation from "@/components/TeacherEvaluation"
    import Special from "@/views/student/main/special.vue"
    export default {
        name: "index",
        components: {Header, Score, Pagination, TeacherEvaluation, Footer, Special},
        created() {
            // 判断用户是否登录
        },
        mounted() {
            this.judgeIsLogin();
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
                        if(this.bluser.status == "2") {
                            this.$router.push({
                                name: 'firstLogin'
                            });
                        } else if (this.bluser.status == "0") {
                            this.getScore();
                            this.initAdActivities();
                            this.initActiveClasses(0, 10);
                            this.initEndClasses(0, 10);
                            this.initActivities(0, 10);
                            this.initCertificates();
                            this.initOrder(0, 10);

                            // 判断注册学科时间
                            const cong = this.$utils.getStorage("congratulate");
                            if(cong != true) {
                                const date = new Date();
                                const current = date.getTime();
                                const time = this.bluser.updateTime.replace("/-/g", "/");
                                const updateTime = new Date(time);
                                const hour = (current - updateTime.getTime())/1000/60/60;
                                console.log(hour)
                                if(hour <= 3) {
                                    this.congratulate = true;
                                }
                            }
                        } else if (this.bluser.status == "1") {
                            this.$router.push({
                                name: 'slient'
                            });
                        } else {
                            this.$router.push({
                                name: 'firstLogin'
                            });
	                    }
                    } else {
                        this.$router.push({name: "studentLogin"});
                    }
                } else {
                    this.$router.push({name: "studentLogin"});
                }
            },

            closeCon() {
                this.congratulate = false;
                this.$utils.setStorage("congratulate", true);
            },

            async getScore() {
                let params = new FormData()
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_score_student_score, params, "POST");
                if (data.code === 200) {
                    this.bluser.score = data.data;
                    return true;
                }
            },

            async initAdActivities() {
                let params = new FormData()
                params.append("page", 0);
                params.append("limit", 8);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_activity_top, params, "POST");
                if (data.code === 200) {
                    this.adActivities = data.data;
                }
            },

            toActivityDetailPage(item) {
                const detail = this.$router.resolve({name: 'activityDetail'});
                this.$utils.setStorage("activity", item);
                window.open(detail.href,'_blank');
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

            toActivityPage() {
                this.toNewPage("activity");
            },

            async initActiveClasses(currentPage, pageSize) {
                this.acCurrentPage = currentPage;
                this.acPageSize = pageSize;
                let params = new FormData();
                params.append("page", this.acCurrentPage);
                params.append("limit", this.acPageSize);
                params.append("status", "0");
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_class_my_list, params, "POST");
                if (data.code === 200) {
                    this.activeClasses = data.data;
                    this.$refs.acPage.totalCount = data.totalCount;
                }
            },

            async initEndClasses(currentPage, pageSize) {
                this.ecCurrentPage = currentPage;
                this.ecPageSize = pageSize;
                let params = new FormData();
                params.append("page", this.ecCurrentPage);
                params.append("limit", this.ecPageSize);
                params.append("status", "1");
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_class_my_list, params, "POST");
                if (data.code === 200) {
                    this.endClasses = data.data;
                    this.$refs.ecPage.totalCount = data.totalCount;
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

            async initActivities(currentPage, pageSize) {
                this.atCurrentPage = currentPage;
                this.atPageSize = pageSize;
                let params = new FormData();
                params.append("page", this.atCurrentPage);
                params.append("limit", this.atPageSize);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_activity_my_list, params, "POST");
                if (data.code === 200) {
                    this.activities = data.data;
                    this.$refs.atPage.totalCount = data.totalCount;
                }
            },

            async initCertificates() {
                let params = new FormData();
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_certificate_my_list, params, "POST");
                if (data.code === 200) {
                    this.certificates = data.data;
                }
            },

            toSeeCertificates(row) {
                this.toNewPage("certificateSearch");
                this.$utils.setStorage("currentCertificate", row);
            },

            toNewPage(to, key, value) {
                const detail = this.$router.resolve({name: to});
                if(key != undefined && key != null && value != null && value != undefined) {
                    this.$utils.setStorage(key, value);
                }
                window.open(detail.href,'_blank');
            },

            async initOrder(currentPage, pageSize) {
                this.orCurrentPage = currentPage;
                this.orPageSize = pageSize;
                let params = new FormData()
                params.append("page", currentPage);
                params.append("limit", pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_order_my_list, params, "POST");
                if (data.code === 200) {
                    this.orders = data.data;
                    this.$refs.orPage.totalCount = data.totalCount;
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

            toEvaluation(row) {
                this.$refs.teacherEvaluationRef.open();
                this.$refs.teacherEvaluationRef.setClassId(row.id);
                this.$refs.teacherEvaluationRef.setClassName(row.name + "-" + row.mainName + "-" + row.subName);
                this.$refs.teacherEvaluationRef.setTeacherName(row.teacherName);
                this.$refs.teacherEvaluationRef.setTeacherId(row.teacherId);
            },

        },
        data() {
            return {
                activePage: '首页',
                bluser: "",
                congratulate: false,
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight - 100,
                adActivities: [],
                showMore: false,
                activeClasses: [],
                acCurrentPage: 1,
                acPageSize: 10,
                endClasses: [],
                ecCurrentPage: 1,
                ecPageSize: 10,
                activities:[],
                atCurrentPage: 1,
                atPageSize: 10,
                certificates: [],
                orders: [],
                orCurrentPage: 1,
                orPageSize: 10,
            }
        },
    }
</script>

<style scoped>
	.main {
		width: 1500px;
		margin: 10px auto;
	}
	.hdt {
		height: 40px;
		line-height: 40px;
		display: flex;
		align-items: center;
		justify-content: left;
	}
	.top1 {
		height: 300px;
		display: flex;
		flex-wrap: nowrap;
		justify-content: left;
		margin-top: 10px;
	}
	.elca {
		width: 600px;
		height: 300px;
		position: relative;
	}
	.title {
		position: absolute;
		bottom: 16px;
		left: 20px;
		color: #ffffff;
		z-index: 999;
	}
	.title-container {
		position: absolute;
		bottom: 10px;
		left: 10px;
		display: inline-block;
		width: 300px;
		height: 30px;
		line-height: 30px;
		background: #000000;
		opacity: 0.4;
	}
	.more {
		position: absolute;
		top: 16px;
		right: 16px;
		color: #ffffff;
		z-index: 1000;
	}
	.more-container {
		position: absolute;
		top: 10px;
		right: 10px;
		display: inline-block;
		width: 68px;
		height: 30px;
		line-height: 30px;
		background: #000000;
		opacity: 0.6;
		z-index: 999;
		border-radius: 3px;
	}
	.tl1 {
		display: flex;
		flex-wrap: wrap;
		width: 900px;
	}
	.pr {
		position: relative;
	}
	.title1 {
		position: absolute;
		bottom: 19px;
		left: 25px;
		color: #ffffff;
		z-index: 999;
		font-size: 14px;
	}
	.title-container1 {
		position: absolute;
		bottom: 15px;
		left: 20px;
		display: inline-block;
		width: 195px;
		height: 20px;
		line-height: 20px;
		background: #000000;
		opacity: 0.4;
	}
	.xf {
		background-image: linear-gradient(#1979ff, #5dd9ff);
		width: 800px;
		height: 200px;
		padding-top: 10px;
		text-align: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
		margin-top: 10px;
	}
	.xfts {
		width: 500px;
		margin-left: 100px;
		color: #ffffff;
		letter-spacing: 2px;
		padding-right: 10px;
	}
	.ce-card {
		margin-top: 10px;
		margin-left: 10px;
		width: 690px;
		height: 210px;
		background-image: linear-gradient(#1979ff, #5dd9ff);
	}
	.zwhdzs {
		height: 210px;
		font-size: 20px;
		color: #eeeeee;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ce {
		width: 140px;
		height: 180px;
		text-align: center;
		background: #a3010e;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 5px;
		position: relative;
	}
	.cet {
		font-size: 16px;
		color: #bf954b;
		font-family: 华文宋体;
		font-weight: 800;
		position: absolute;
		top: 30px;
		padding: 0px 10px;
	}
	.ryzs {
		font-size: 14px;
		color: #bf954b;
		font-family: 华文宋体;
		font-weight: 800;
		position: absolute;
		bottom: 100px;
		padding: 0px 10px;
	}
	.cei {
		width: 40px;
		height: 40px;
		margin-top: 10px;
		position: absolute;
		bottom: 50px;
	}
	.cejg {
		font-size: 6px;
		color: #bf954b;
		line-height: 20px;
		position: absolute;
		bottom: 20px;
	}
	.spec {
		position: absolute;
		z-index: 3000;
		border-radius: 50px;
	}
	.zbz {
		z-index: 2000;
		position: absolute;
		top: 0px;
		left: 0px;
		background: #000000;
		opacity: 0.5;
	}
	.con-close {
		position: absolute;
		z-index: 3000;
		font-size: 40px;
		color: #f51d37;
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
	.elca .el-carousel__item {
		height: 300px !important;
	}
	.elca .el-carousel__indicators--horizontal {
		bottom: 0;
		left: 480px !important;
		transform: translateX(-50%);
	}
	.elca .el-carousel__button {
		width: 20px;
		height: 20px;
		border-radius: 10px;
		background: #409EFF;
	}
	.ce-card .el-carousel__item {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ce-card .el-carousel__container {
		height: 210px !important;
	}
	.ce-card .el-carousel__indicators--horizontal {
		bottom: 0;
		left: 480px !important;
		transform: translateX(-50%);
		display: none;
	}
	.ce-card .el-carousel__button {
		width: 20px;
		height: 20px;
		border-radius: 10px;
		background: #409EFF;
		display: none;
	}
	.ce-card .el-carousel__mask {
		background: none;
	}
	.ce-card .el-card__body {
		padding: 0px;
	}

	/*媒体查询（电脑）*/
	@media screen and (min-width: 1529px) {
	}

</style>