<template>
    <div>
        <div class="aioc-pc">
            <Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'" :bgColor="'bg-black'" :bluser="bluser"></Header>
        </div>
        <div class="aioc-container1" :style="'height:' + clientHeight + 'px;'">
            <div class="dfjc">
                <div class="hdm">
                    <el-card shadow="always">
                        <el-autocomplete
                                class="wd-900 mb-50"
                                v-model="searchForm.value"
                                :trigger-on-focus="true"
                                :fetch-suggestions="querySearch"
                                clearable
                                placeholder="请输入活动名称进行搜索（支持名称模糊搜索），如：活动"
                        >
                            <template slot="prepend">活动标题</template>
                            <el-button slot="append" icon="el-icon-search" @click="initActivities(0, 10)">搜索</el-button>
                        </el-autocomplete>


                        <el-card class="mb-10 hdcard" v-for="item in activities" :key="item.id" @click.native="toActivityDetailPage(item)">
                            <div class="hdlb">
                                <el-image
                                        style="width: 250px;height: 160px;border-radius: 3px;"
                                        :src="item.poster"
                                        fit="fill"></el-image>
                                <div class="hdxx">
                                    <span class="hdzt">
                                        {{item.title.length >= 40 ? (item.title.substring(0, 40) + "..."):item.title}}
                                    </span>
                                    <span class="item color-409EFF"><i class="el-icon-alarm-clock fs-16 mr-10"></i>活动时间：{{item.startTime}} - {{item.endTime}}</span>
                                    <span class="item color-409EFF">
                                        <i class="el-icon-map-location fs-16 mr-10"></i>
                                        活动地点：{{ item.province }}{{ item.city }}{{ item.county }}({{ item.address }})
                                    </span>
                                    <span class="item color-409EFF"><i class="el-icon-user fs-16 mr-10"></i>限定人数：{{item.peopleLimit}} 人</span>
                                    <span class="item color-409EFF"><i class="el-icon-coin fs-16 mr-10"></i>报名费用：
                                        <div v-if="item.isFree == '0'">
                                            {{item.cost}}元
                                        </div>
                                        <div v-else-if="item.isFree == '1'">
                                            <span class="color-67C23A">免费</span>
                                        </div>
                                    </span>
                                    <span class="item color-409EFF"><i class="el-icon-time fs-16 mr-10"></i>报名日期：{{item.signupStart}} 至 {{item.signupEnd}}</span>
                                </div>
                                <span :class="((item.status == '4' || item.status == '2' || item.status == '5' || item.status == '0') ? 'hdbqg':'hdbqgr') + ' hdbq'">
                                    {{fmtActivityStatus(item.status)}}
                                </span>
                                <span class="ckxq ahover">查看详情</span>
                            </div>
                        </el-card>

                        <el-pagination
                                class="pb-10 pt-20"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="pageSizes"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalCount">
                        </el-pagination>
                    </el-card>
                </div>
            </div>
            <Footer></Footer>
        </div>
        <Pay ref="orderPayRef"></Pay>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import Pay from  "@/components/Pay"
    import Footer from "@/components/Footer"
    export default {
        name: "index",
        components: {Header, Pay, Footer},
        created() {
            // 判断用户是否登录
            this.judgeIsLogin();
        },
        mounted() {
        },
        methods: {
            toActivityDetailPage(item) {
                const detail = this.$router.resolve({name: 'activityDetail'});
                this.$utils.setStorage("activity", item);
                window.open(detail.href,'_blank');
            },

            async judgeIsLogin() {
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_login_judgeIsLogin, {}, "GET");
                if (data.code === 200) {
                    if (data.data.isLogin == "login") {
                        this.bluser = data.data.bluser;
                        // this.checkOrder();
                        this.initActivities(0, 10);
                        this.initCond("title");
                    } else {
                        this.$router.push({name: "studentLogin"});
                    }
                } else {
                    this.$router.push({name: "studentLogin"});
                }
            },

            async checkOrder() {
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_order_check_activity, {}, "POST");
                if (data.code === 200) {
                    if(data.data.check) {
                        this.$confirm('检查到您有未支付的订单，是否继续支付？', '提示', {
                            confirmButtonText: '继续支付',
                            cancelButtonText: '否，取消订单',
                            type: 'info'
                        }).then(() => {
                            this.$refs.orderPayRef.open();
                            this.$refs.orderPayRef.setOrder(data.data.order);
                            this.$refs.orderPayRef.setTitle("活动订单支付");
                        }).catch(() => {
                            this.destroyOrder(data.data.order.outTradeNo);
                        });
                    }
                }
            },

            async destroyOrder(outTradeNo) {
                let param = new FormData();
                param.append("outTradeNo", outTradeNo)
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_order_destroy, param, "POST");
                if (data.code === 200 && data.data == 'success') {
                    this.$notify({
                        title: '提示',
                        message: '订单取消成功'
                    });
                    return true;
                }
            },

            async initCond(cond) {
                let params = new FormData()
                params.append("cond", cond);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_cond, params, "POST");
                if (data.code === 200) {
                    this.conds = data.data;
                    return true;
                }
            },

            querySearch(queryString, cb) {
                this.searchCond(queryString, cb);
            },
            createFilter(queryString) {
                return (item) => {
                    if(item.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1) {
                        return item.value;
                    }
                    return "";
                };
            },
            async searchCond(queryString, cb) {
                var results = queryString ? this.conds.filter(this.createFilter(queryString)) : this.conds;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },

            /**
             * 分页方法
             */
            handleSizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;
                this.initActivities(this.currentPage, this.pageSize);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.initActivities(this.currentPage, this.pageSize);
            },

            async initActivities(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData();
                params.append("title", this.searchForm.value.trim());
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_activity_center_list, params, "POST");
                if (data.code === 200) {
                    this.activities = data.data;
                    this.totalCount = data.totalCount;
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
                        return "待开始";
                    default:
                        return status;
                }
            },
        },
        data() {
            return {
                activePage: '活动中心',
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight -100,
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 50, 100],
                totalCount: 0,
                searchForm: {
                    value: "",
                    param: "name",
                },
                conds:[],
                searchs: [],
                titles: [],

                activities: [],
            }
        },
    }
</script>

<style scoped>

        .hdm {
            width: 1200px;
            margin-top: 10px;
            padding-bottom: 30px;
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
            font-size: 22px;
            margin-bottom: 10px;
            margin-left: 20px;
            font-weight: 600;
        }
        .ckxq {
            position: absolute;
            bottom: 0px;
            right: 0px;
            font-size: 14px;
            color: #409EFF;
        }
        .item {
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 2px;
            margin-left: 30px;
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
    .el-message-box__btns .el-button {
        height: 40px;
        width: 100px !important;
    }
</style>