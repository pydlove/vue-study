<template>
    <div>
        <div class="aioc-pc">
            <Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'" :bgColor="'bg-black'" :bluser="bluser"></Header>
        </div>

        <div class="aioc-container1" :style="' height:' + clientHeight + 'px;'">
            <div class="tl xjxx" :style="'width:' + cardWidth + 'px;'">
                <div class="dffn">
                    <el-card class="mr-10 fs-15 color-303133 wow bounceInLeft" :style="'width:' + (photoWidth + 40) + 'px;'">
                        <el-image
                                :src="bluser.photo"
                                :style="'width:' + photoWidth + 'px;height:' + photoHeight + 'px;'"
                                alt="" @click="showUpPhoto = true" :preview-src-list="[bluser.photo]"></el-image>
                         <div class="mt-20 lh-20">
                             <span class="fb">
                                 姓<span class="zwf"></span>名：
                             </span>
                             <span>{{bluser.name}}</span>
                         </div>

                         <div class="mt-20 lh-20">
                            <span class="fb">
                                性<span class="zwf"></span>别：
                            </span>
                            <span>{{bluser.sex == "0" ? "男":"女"}}</span>
                         </div>

                         <div class="mt-20 lh-20">
                            <span class="fb">出生年月：</span>
                            <span>{{bluser.birth}}</span>
                         </div>

                         <div class="mt-20 lh-20">
                            <span class="fb">联系方式：</span>
                            <span>{{bluser.phone}}</span>
                         </div>

                         <div class="mt-20 lh-20">
                            <span class="fb">
                                身<span class="zwf1"></span>份<span class="zwf1"></span>证：
                            </span>
                            <div>{{bluser.idcard}}</div>
                         </div>

                         <div class="mt-20 lh-20">
                            <span class="fb">家庭住址：</span>
                            <div>{{ bluser.province }}{{ bluser.city }}{{ bluser.county }}({{ bluser.address }})</div>
                         </div>
                    </el-card>

                    <div class=" wow bounceInRight">
                        <el-card class="mb-10" :style="'width:' + (cardWidth - photoWidth - 80 - 10) + 'px;'">
                            <div class="xf dffn">
                                <Score class="ml-50" :score="bluser.score"></Score>
                                <div class="tl xfts">
                                    <div class="mt-20 ml-20">
                                        <span class="fs-20">{{bluser.name}}</span>，你好，本学期的累计学分为<span class="fs-30 color-fa5c26">{{bluser.score}}</span>分
                                    </div>
                                    <div class="mt-20 fs-12 lh-20 color-ae0000a6 dffn">
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
                        </el-card>

                        <el-card class="mb-10" :style="'width:' + (cardWidth - photoWidth - 80 - 10) + 'px;'">
                            <div slot="header" class="clearfix">
                                <span class="fl fb">已选课程</span>
                            </div>
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
                            </el-table>
                            <Pagination class="fr mt-10 mb-20" ref="acPage" @search="initActiveClasses"></Pagination>
                        </el-card>

                        <el-card class="mb-10" :style="'width:' + (cardWidth - photoWidth - 80 - 10) + 'px;'">
                            <div slot="header" class="clearfix">
                                <span class="fl fb">完结课程</span>
                            </div>
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
                            </el-table>
                            <Pagination class="fr mt-10 mb-20" ref="ecPage" @search="initEndClasses"></Pagination>
                        </el-card>

                        <el-card class="mb-10" :style="'width:' + (cardWidth - photoWidth - 80 - 10) + 'px;'">
                            <div slot="header" class="clearfix">
                                <span class="fl fb">活动经历</span>
                            </div>
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
                                        <el-tag :type="scope.row.status == 0 ? 'success':'info'" class="fb" effect="dark">
                                            {{fmtActivityStatus(scope.row.status)}}
                                        </el-tag>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <Pagination class="fr mb-20 mt-20" ref="atPage" @search="initActivities"></Pagination>
                        </el-card>


                        <el-card class="mb-10" :style="'width:' + (cardWidth - photoWidth - 80 - 10) + 'px;'">
                            <div slot="header" class="clearfix">
                                <span class="fl fb">获奖情况</span>
                            </div>
                            <el-table :data="certificates" border size="mini" style="width: 100%">
                                <el-table-column prop="uuid" label="证书编号" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="name" label="证书名称" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="unit" label="颁发机构" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="createTime" label="获得时间" :show-overflow-tooltip="true"></el-table-column>
                            </el-table>
                            <Pagination class="fr mb-20 mt-20" ref="cePage" @search="initCertificates"></Pagination>
                        </el-card>

                        <el-card :style="'width:' + (cardWidth - photoWidth - 80 - 10) + 'px;'">
                            <div slot="header" class="clearfix">
                                <span class="fl fb">缴费情况</span>
                            </div>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import Score from  "@/components/Score"
    import Pagination from  "@/components/Pagination"

    export default {
        name: "index",
        components: {Header, Score, Pagination},
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
                        this.getScore();
                        this.initActiveClasses(0, 10);
                        this.initEndClasses(0, 10);
                        this.initActivities(0, 10);
                        this.initCertificates(0, 10);
                        this.initOrder(0, 10);
                    } else {
                        this.$router.push({name: "studentLogin"});
                    }
                } else {
                    this.$router.push({name: "studentLogin"});
                }
            },

            async getScore() {
                let params = new FormData()
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_score_student_score, params, "POST");
                if (data.code === 200) {
                    this.bluser.score = data.data;
                    return true;
                }
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

            fmtActivityStatus(status) {
                switch (status) {
                    case "0":
                        return "报名中";
                    case "1":
                        return "未发布";
                    case "2":
                        return "进行中";
                    case "3":
                        return "已结束";
                    default:
                        return status;
                }
            },

            async initCertificates(currentPage, pageSize) {
                this.ceCurrentPage = currentPage;
                this.cePageSize = pageSize;
                let params = new FormData();
                params.append("page", this.ceCurrentPage);
                params.append("limit", this.cePageSize);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_certificate_my_page_list, params, "POST");
                if (data.code === 200) {
                    this.certificates = data.data;
                    this.$refs.cePage.totalCount = data.totalCount;
                }
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
        },
        data() {
            return {
                activePage: '学籍信息',
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight -100,
                photoWidth: 207,
                photoHeight: 313,
                bluser: "",
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
                ceCurrentPage: 1,
                cePageSize: 10,
                orders: [],
                orCurrentPage: 1,
                orPageSize: 10,
                cardWidth: 1450,
            }
        },
    }
</script>

<style scoped>
        .circle-credit{
            position:relative;

        }
        .circle-container{
            position:absolute;
            left:calc((100% - 130px) / 2);
            top:20px;
            width:130px;
            height:130px;
            transform:rotate(-135deg);
            -ms-transform:rotate(-135deg); /* Internet Explorer */
            -moz-transform:rotate(-135deg); /* Firefox */
            -webkit-transform:rotate(-135deg); /* Safari 和 Chrome */
            -o-transform:rotate(-135deg); /* Opera */
        }
        .zwf {
           margin-left: 28px;
        }
        .zwf1 {
           margin-left: 7px;
        }
        .fitem {
            width: 300px;
        }
        .xjxx {
            margin: 10px auto;
            margin-bottom: 20px;
            width: 1200px;
            display: flex;
            flex-wrap: nowrap;
        }
        .xf {
            background-image: linear-gradient(#5dd9ff, #1979ff);
            width: 100%;
            height: 166px;
            padding-top: 10px;
            text-align: center;
        }
        .xfts {
            width: 500px;
            margin-left: 100px;
            color: #ffffff;
            letter-spacing: 2px;
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