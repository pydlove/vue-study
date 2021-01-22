<template>
	<!--eslint-disable-->
    <div>
        <div class="aioc-pc">
            <Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'" :bgColor="'bg-black'" :bluser="bluser"></Header>
        </div>
        <div class="aioc-container1" :style="'width:' + clientWidth + 'px; height:' + clientHeight + 'px;'">
            <div class="hdxqc">
                <div class="hdxq">
                    <el-card shadow="hover">
                        <div slot="header" class="clearfix">
                            <span class="fl color-fa5c26 fb">活动详情</span>
                        </div>
                        <div class="dffn">
                            <el-image style="width: 550px;height: 300px;border-radius: 3px;"
                                    :src="activity.poster" fit="fill" :preview-src-list="[activity.poster]"></el-image>
                            <div class="hdxx">
                                <span class="hdzt">
                                    {{activity.title}}
                                </span>
                                <span class="item"><i class="el-icon-alarm-clock color-409EFF mr-20"></i>活动时间：{{activity.startTime}} 至 {{activity.endTime}} </span>
                                <span class="item"><i class="el-icon-map-location color-409EFF mr-20"></i>活动地点：
                                {{ activity.province }}{{ activity.city }}{{ activity.county }}({{ activity.address }})
                                </span>
                                <span class="item"><i class="el-icon-user color-409EFF mr-20"></i>限定人数：{{activity.peopleLimit}} 人</span>
                                <span class="item"><i class="el-icon-coin color-409EFF mr-20"></i>报名费用：
                                     <div v-if="activity.isFree == '0'">
                                        {{activity.cost}}元
                                     </div>
                                     <div v-else-if="activity.isFree == '1'">
                                        <span class="color-67C23A">免费</span>
                                     </div>
                                </span>
                                <span class="item"><i class="el-icon-star-off color-409EFF mr-20"></i>累计学分：{{activity.score}}</span>
                                <span class="item"><i class="el-icon-time color-409EFF mr-20"></i>报名日期：{{activity.signupStart}} 至 {{activity.signupEnd}}</span>
                                <div>
                                    <span class="hdjxz">{{fmtActivityStatus(activity.status)}}</span>
                                    <el-button class="lkbm" v-show="activity.status == '4'" @click="sign" :disabled="signupDisabled">立刻报名</el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>

                    <el-card shadow="hover" class="mt-10">
                        <div slot="header" class="clearfix">
                            <span class="fl color-fa5c26 fb">报名情况</span>
                            <span class="fl color-409EFF fb">
                                （{{signupStudents.length}}）
                            </span>
                        </div>
                        <div class="dffw">
                            <div v-for="(item, index) in signupStudents" :key="index" class="dffc mr-20 mt-10">
                                <el-avatar :size="50"  :src="item.photo" fit="fill"></el-avatar>
                                <span class="bmxm">{{item.name}}</span>
                            </div>
                        </div>
                    </el-card>

                    <el-card shadow="hover" class="mt-10 mb-20">
                        <div slot="header" class="clearfix">
                            <span class="fl color-fa5c26 fb">活动介绍</span>
                        </div>
                        <div class="ql-container ql-snow">
                            <div class="ql-editor">
                                <div class="ct" v-html="activity.content"></div>
                            </div>
                        </div>
                    </el-card>

                    <div>
                        <span class="lkbm" v-show="activity.status == '4'" @click="sign">立刻报名</span>
                    </div>
                </div>
            </div>
        </div>
        <Pay ref="payRef" :activity="activity"></Pay>
        <Footer class="fter"></Footer>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Header from  "@/components/Header"
    import Footer from  "@/components/Footer"
    import Pay from  "@/components/Pay"

    export default {
        name: "activityDetail",
        components: {Header, Pay, Footer},
        created() {
            // 判断用户是否登录
            this.judgeIsLogin();
        },
        mounted() {
        },
        methods: {
            async judgeIsLogin() {
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_login_judgeIsLogin, {}, "GET");
                if (data.code === 200) {
                    if (data.data.isLogin == "login") {
                        this.bluser = data.data.bluser;
                        this.activity = this.$utils.getStorage("activity");
                        this.checkOrder();
                    } else {
                        this.$router.push({name: "studentLogin"});
                    }
                } else {
                    this.$router.push({name: "studentLogin"});
                }
            },

            async getSignupInfo() {
                let params = new FormData()
                params.append("activityId", this.activity.id);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_user_signup_info, params, "POST");
                if (data.code === 200) {
                    this.signupStudents = data.data;
                    return true;
                }
            },

            async checkOrder() {
                let params = new FormData()
                params.append("activityId", this.activity.id);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_order_check_activity, params, "POST");
                if (data.code === 200) {
                    this.getSignupInfo();
                    return true;
                }
            },

            async sign() {
	            // 1 判断是否重复报名
	            // 2 判断人数是否上限
	            // 3 报名成功/付费报名
	            // 4 更新累计学分
                for(var i in this.signupStudents) {
                    if(this.signupStudents[i].id == this.bluser.id) {
                        this.$notify.error({
                            title: '提示',
                            message: '您已经报过名，请勿重复报名，谢谢'
                        });
                        return false;
                    }
                }
                let params = new FormData()
                params.append("activityId", this.activity.id);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_user_signup_info, params, "POST");
                if (data.code === 200) {
                    this.signupStudents = data.data;
                    if(this.signupStudents.length < this.activity.peopleLimit) {
						this.toSign();
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: '报名人数已达上限，不能继续报名，谢谢'
                        });
                    }
                    return true;
                }
            },

            async toSign() {
                this.signupDisabled = true;
                if(this.activity.isFree == "1") {
                    let params = new FormData()
                    params.append("activityId", this.activity.id);
                    let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_activity_sign, params, "POST");
                    if (data.code === 200) {
                        this.$notify({
                            title: '提示',
                            message: '活动报名成功'
                        });
                        this.getSignupInfo();
                        this.addScore();
                        this.signupDisabled = false;
                        return true;
                    }
                } else {
                    var order = {
                        outTradeNo: this.$utils.random_No(4),
                        totalAmount: this.activity.cost,
                        subject: "参加" + this.activity.title + "活动",
                        description: "参加" + this.activity.title + "活动的费用",
                        fresult: "",
                    };
                    let params = new FormData()
                    params.append("activityId", this.activity.id);
                    params.append("outTradeNo", order.outTradeNo);
                    params.append("totalAmount", order.totalAmount);
                    params.append("subject", order.subject);
                    params.append("description", order.description);
                    let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_order_create_activity, params, "POST");
                    if (data.code === 200) {
                        if(data.data != "new") {
                            order = data.data;
                        }
                        this.signupDisabled = false;
                        this.$refs.payRef.open();
                        this.$refs.payRef.setOrder(order);
                        this.$refs.payRef.setTitle("活动订单支付");
                    }
                }
            },

            addScore() {
                let params = new FormData()
                params.append("activityId", this.activity.id);
                params.append("score", this.activity.score);
                this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_score_activity_set, params, "POST");
            },

            fmtActivityStatus(status) {
                switch (status) {
                    case "0":
                        return "活动已发布";
                    case "1":
                        return "活动未发布";
                    case "2":
                        return "活动进行中";
                    case "3":
                        return "活动已结束";
                    case "4":
                        return "活动报名中";
                    case "5":
                        return "活动报名结束";
                    default:
                        return status;
                }
            },
        },
        data() {
            return {
                activePage: '活动中心',
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight -50,
                activity: "",
                bluser: "",
                signupStudents: [],
                signupDisabled: false,
            }
        },
    }
</script>

<style scoped>
        .hdxqc {
            display: flex;
            justify-content: center;
            margin-bottom: 160px;
        }
        .hdxq {
            width: 1500px;
            margin-top: 10px;
        }
        .hdxx {
            display: flex;
            flex-direction: column;
            text-align: left;
            margin-left: 50px;
        }
        .hdzt {
            font-size: 26px;
            margin-bottom: 10px;
            margin-left: 10px;
            font-weight: 600;
        }
        .item {
            display: flex;
            align-items: center;
            color: #707070;
            font-size: 20px;
            line-height: 31px;
            margin-bottom: 2px;
            margin-left: 20px;
        }
        .new-icons {
            width: 25px !important;
            height: 25px !important;
        }
        .new-icons1 {
            width: 23px !important;
            height: 23px !important;
        }
        .hdjxz {
            margin-top: 10px;
            display: inline-block;
            padding: 15px 50px 15px 50px;
            border: 3px solid #da231c;
            margin-left: 10px;
            border-radius: 3px;
            color: #da231c;
            font-size: 22px;
            font-weight: 600;
        }
        .lkbm {
            margin-top: 10px;
            display: inline-block;
            padding: 15px 50px 15px 50px;
            border: 3px solid #01da03;
            margin-left: 10px;
            border-radius: 3px;
            color: #01da03;
            font-size: 22px;
            font-weight: 600;
        }
        .bmxm {
            font-size: 12px;
            color: #606266;
            margin-top: 5px;
            text-align: center;
        }
        .ct {
            padding: 50px;
            line-height: 20px;
            text-align: unset;
        }
        .ql-container.ql-snow {
            border: 0px;
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
    .el-avatar img {
        width: 50px;
        height: 50px;
    }

    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {

    }

</style>