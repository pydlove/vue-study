<template>
    <div>
        <div class="header">
            <Header ref="headerRef" :activePage="activePage"></Header>
        </div>
        <div class="aioc-container" :style="'width:' + clientWidth + 'px; height:' + clientHeight + 'px;'">
            <div class="aioc-container">
                <div>
                    <el-card shadow="hover" class="aioc-card-1100 mt-20 wow bounceInLeft">
                        <div class="dffn">
                            <div>
                                <el-avatar v-if="problem.avatar == null || problem.avatar == undefined || problem.avatar == ''"
                                        :size="200" shape="square">
                                    未设置头像
                                </el-avatar>
                                <el-image v-else
                                       class="wd-200 hp-200"
                                        :src="problem.avatar"
                                        :preview-src-list="srcList">
                                </el-image>
                                <p class="mt-10 preq-bame">{{problem.requester}}</p>
                            </div>
                            <div class="ml-10">
                                <p class="pbs">
                                    <span class="shangjin-icon"></span>
                                    <span>
                                        赏金：{{problem.bounty.replace(/\D/g,'').replace(/...(?!$)/g,'$&,')}}元
                                    </span>

                                    <span class="ren-icon"></span>
                                    <span>报名人数 <span>2</span>人</span>
                                    <img class="tj" src="@/assets/img/yongjin.png" alt="">
                                </p>

                                <div class="title-main">
                                    <span class="ptitle">{{problem.title}}</span>
                                    <p class="djs">
                                        <i class="el-icon-info mr-5 color-F56C6C"></i>
                                        <span class="fs-14">距离截止日期：</span>
                                        <span class="fs-14 color-F56C6C">{{currentTime}}</span>
                                     </p>
                                </div>
                                <p class="pf">需求明细</p>
                                <p class="pcontent">
                                    {{problem.content}}
                                </p>
                                <el-button class="wdi-100" type="success" @click="search(0, 10)">报名</el-button>
                                <el-button type="primary" @click="resetCond">发布类似需求</el-button>
                            </div>
                        </div>

                        <div>
                            <el-steps class="step" :active="activeStep" simple finish-status="success" >
                                <el-step title="发布需求" description="2020-10-22"></el-step>
                                <span v-show="activeStep >= 1" class="ftime" :style="'left:' + pleft + 'px'">2020-10-22</span>

                                <el-step title="公开投标" description=""></el-step>
                                <span v-show="activeStep >= 2" class="ftime" :style="'left:' + (pleft + base) + 'px'">2020-10-22</span>

                                <el-step title="需求方选标" description=""></el-step>
                                <span v-show="activeStep >= 3" class="ftime" :style="'left:' + (pleft + base) + 'px'">2020-10-22</span>

                                <el-step title="托管赏金" description=""></el-step>
                                <span v-show="activeStep >= 4" class="ftime" :style="'left:' + (pleft + base) + 'px'">2020-10-22</span>

                                <el-step title="中标方工作" description=""></el-step>
                                <span v-show="activeStep >= 5" class="ftime" :style="'left:' + (pleft + base) + 'px'">2020-10-22</span>

                                <el-step title="验收付款" description=""></el-step>
                                <span v-show="activeStep >= 6" class="ftime" :style="'left:' + (pleft + base) + 'px'">2020-10-22</span>
                            </el-steps>
                        </div>

                        <div class="pbottom">
                            <p class="wd-200">
                                <i class="fs-14 color-F56C6C el-icon-tickets"></i>
                                <span>
                                    <span>任务编号:</span>
                                    {{problem.id}}
                                </span>
                            </p>
                            <p class="wd-200">
                                <i class="fs-14 color-F56C6C el-icon-time"></i>
                                <span>
                                    <span>发布日期:</span>
                                    {{problem.startTime}}
                                </span>
                            </p>
                            <p class="wd-200">
                                <i class="fs-14 color-F56C6C el-icon-time"></i>
                                <span>
                                    <span>截止日期:</span>
                                    {{problem.startTime}}
                                </span>
                            </p>
                            <p class="wd-300">
                                <i class="fs-14 color-F56C6C el-icon-location-information"></i>
                                <span>
                                     <span>地区:</span>
                                    {{problem.address}}
                                </span>
                            </p>
                            <p class="wdi-80">
                                <i class="fs-14 color-F56C6C el-icon-star-off"></i>
                                <span>收藏</span>
                            </p>
                        </div>

                        <div class="bottom-tip">
                            <p>温馨提示：</p>
                            <p>1、请勿轻信需要交钱（报名费、抵押金等）才能承接的任务，如遇到请第一时间联系客服。</p>
                            <p>2、雇主对您工作的满意度评价，关系着您收到的赏金数额。点击了解</p>
                            <p>收费需知：招标任务、雇佣任务收取平台服务费，普通威客10%，V客优享0%。</p>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from  "@/components/Header"

    export default {
        name: "problemDetail",
        components: {Header},
        mounted() {
            this.clientWidth = document.body.clientWidth;
            this.clientHeight = document.body.clientHeight -50;
            new this.$wow.WOW({
                live: false
            }).init();

            var that = this;
            setInterval (function () {
                that.timeCount(that.problem.endTime);
            }, 1000);
        },
        methods: {
            timeCount(finalEndTime) {
                var nowtime = new Date(),  //获取当前时间
                    endtime = new Date(finalEndTime);  //定义结束时间
                var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
                    leftd = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
                    lefth = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
                    leftm = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
                    lefts = Math.floor(lefttime/1000%60);  //计算秒数
                this.currentTime = leftd + "天" + lefth + "时" + leftm + "分" + lefts + "秒";  //返回倒计时的字符串
            },

        },
        data() {
            return {
                srcList: [
                    '/cpcm-service/img/chengxiao.jpg',
                ],

                clientWidth: 1800,
                clientHeight: 970,
                /*当前选中菜单*/
                activePage: '难题求解',
                // 疑难问题
                problem: {
                    id: "329863",
                    avatar: "/cpcm-service/img/chengxiao.jpg",
                    // avatar: "",
                    requester: '浙江新和成股份有限公司',
                    requesterType: "企业",
                    isAnonymous: '0',
                    address: "浙江省,杭州市,拱墅区",
                    title: "工程机械/非开挖市政工程设备",
                    content: "双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降，双臂钻杆密封技术；双臂钻杆焊接工艺；切削机头切削排泥与地面沉降",
                    industry: "地产建筑,建筑设备",
                    bounty: "1000000",
                    createTime: "2020-10-22",
                    startTime: "2020-10-22",
                    endTime: "2020-11-22",
                    createUser: "张学良",
                    phone: "13588654502",
                },
                pleft:108,
                base:160,
                activeStep: 2,
                // 当前时间
                currentTime: "",
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .preq-bame {
            width: 200px;
            font-size: 16px;
            color: #409EFF;
        }
        .preq-bame:hover {
            text-decoration: underline;
        }
        .pbs {
            display: flex;
            margin-bottom: 40px;
            color: #999999;
        }
        .pbs > span {
            display: inline-block;
            line-height: 40px;
            margin-left: 10px;
            font-size: 14px;
        }
        .ptitle {
            font-size: 22px;
            font-weight: 600;
        }
        .pf {
            text-align: left;
            margin-left: 20px;
            padding-left: 5px;
            border-left: 5px solid #f84e22;
            font-weight: 600;
        }
        .pcontent {
            margin-top: 10px;
            text-align: left;
            line-height: 28px;
            font-size: 16px;
            color: #666;
            padding: 10px 20px 20px 20px;
        }
        .tj {
            margin-left: 20px;
        }
        .pbottom {
            display: flex;
            flex-wrap: nowrap;
            line-height: 40px;
            padding-top: 20px;
            height: 50px;
        }
        .pbottom > p > span {
            font-size: 14px;
            margin-left: 5px;
        }
        .pbottom > p > span > span {
            font-weight: 600;
        }
        .pbottom > p {
            text-align: left;
            width: 25%;
        }
        .bottom-tip {
            background: #E6A23C;
            text-align: left;
            padding: 10px;
        }
        .bottom-tip p {
            color: #eeeeee;
            font-size: 14px;
            line-height: 28px;
        }
        .step {
            position: relative;
            height: 50px;
            margin-top: 40px;
        }
        .ftime {
            position: absolute;
            bottom: 10px;
            font-size: 12px;
            color: #67C23A;
        }
        .title-main {
            position: relative;
        }
        .djs {
            position: absolute;
            top: 5px;
            right: 40px;
        }
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
        .el-step.is-simple .el-step__title {
            font-size: 14px;
        }
        .el-step.is-simple:not(:last-of-type) .el-step__title {
            max-width: 100%;
        }
    }
</style>