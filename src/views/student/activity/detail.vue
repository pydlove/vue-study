<template>
    <div>
        <div class="aioc-pc">
            <Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'" :bgColor="'bg-black'"></Header>
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
                                    :src="activity.img" :lazy="true"
                                    fit="fill"></el-image>
                            <div class="hdxx">
                                <span class="hdzt">
                                    {{activity.title}}
                                </span>
                                <span class="item"><i class="naoling new-icons"></i>活动时间：{{activity.time}}</span>
                                <span class="item"><i class="weizhi new-icons"></i>活动地点：{{activity.address}}</span>
                                <span class="item"><i class="renshu new-icons"></i>限定人数：{{activity.capacity}} 人</span>
                                <span class="item"><i class="feiyong new-icons"></i>报名费用：{{activity.cost}}元</span>
                                <span class="item"><i class="fenshu new-icons"></i>累计学分：{{activity.score}}</span>
                                <span class="item"><i class="shijian new-icons"></i>报名日期：{{activity.startTime}} 至 {{activity.endTime}}</span>
                                <div>
                                    <span class="hdjxz">活动进行中</span>
                                    <span class="lkbm" @click="sign">立刻报名</span>
                                </div>
                            </div>
                        </div>
                    </el-card>

                    <el-card shadow="hover" class="mt-10">
                        <div slot="header" class="clearfix">
                            <span class="fl color-fa5c26 fb">报名情况</span>
                            <span class="fl color-409EFF fb">
                                （{{signs.length}}）
                            </span>
                        </div>
                        <div class="dffw">
                            <div v-for="(item, index) in signs" :key="index" class="dffc mr-20">
                                <el-avatar :size="50"  :src="item.avatar"></el-avatar>
                                <span class="bmxm">{{item.name}}</span>
                            </div>
                        </div>

                    </el-card>

                    <el-card shadow="hover" class="mt-10 mb-20">
                        <div slot="header" class="clearfix">
                            <span class="fl color-fa5c26 fb">活动介绍</span>
                        </div>
                        <div>
                            <el-image
                                      :src="e1" :lazy="true"
                                      fit="fill"></el-image>
                            <div class="tc" style="line-height: 40px;font-size: 14px;">
                                2019中国交建·汕头国际马拉松<br/>
                                倒计时 <span class="fb">13</span> 天<br/>
                                跑友们期待已久的2019汕马官方训练营<br/>
                                又将如期与大家见面啦<br/><br/>
                                这也是本年度汕马官方训练营的最后一期<br/>
                                届时会有更加系统、科学的赛前训练课程<br/>
                                以及马拉松参赛的经验和技巧分享内容<br/><br/>
                                因市海滨体育场关闭改造<br/>
                                本次2019汕马官方训练营<br/>
                                将在市开放广场进行<br/>
                                跑友们可不要跑错啦<br/>
                            </div>

                            <div class="fb mt-20">
                                <span style="background: #eeeeee; padding: 10px; ">
                                    汕马训练营
                                </span>
                            </div>
                            <div style="display: flex; justify-content: center;">
                                <div class="tc" style="line-height: 30px;font-size: 14px; background: #eeeeee;width: 800px;">
                                    汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动，旨在赛前为跑友们提供专<br/>
                                    业的马拉松训练课程，帮助跑友掌握科学有效的训练方式，合理备战、实现目标。前两期的2019<br/>
                                    汕马官方训练营已分别在10月和11月顺利举行。
                                </div>
                            </div>
                            <div class="mt-20">
                                <span class="fb" style="background-color: rgb(249, 211, 74);">
                                    【2019汕马第三期官方训练营基本信息】
                                </span>
                            </div>
                            <div style="line-height: 40px;font-size: 14px;">
                                <br/><br/>
                                <span class="fb">训练时间</span><br/>
                                12月15日8:30-10:30（周日）<br/><br/>
                                <span class="fb">训练地点</span><br/>
                                市开放广场<br/><br/>
                                <span class="fb">限报人数</span><br/>
                                120人（额满即止）<br/><br/>
                                <span class="fb">时间安排</span><br/>
                                <el-image
                                        :src="e2" :lazy="true"
                                        fit="fill"></el-image>
                            </div>
                            <div>
                                <el-image
                                        :src="e3" :lazy="true"
                                        fit="fill"></el-image>
                                <el-image
                                        :src="e4" :lazy="true"
                                        fit="fill"></el-image>
                                <el-image
                                        :src="e5" :lazy="true"
                                        fit="fill"></el-image>
                                <el-image
                                        :src="e6" :lazy="true"
                                        fit="fill"></el-image>

                            </div>
                        </div>

                        <div>
                            <span class="lkbm">立刻报名</span>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
        <Pay ref="payRef"></Pay>
        <Footer class="fter"></Footer>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import Footer from  "@/components/Footer"
    import Pay from  "@/components/Pay"

    export default {
        name: "activityDetail",
        components: {Header, Pay, Footer},
        mounted() {
            this.activity = this.$utils.getStorage("activity");
            console.log(this.activity)
        },
        methods: {

            sign() {
                this.$refs.payRef.open();
                var order = {
                    title: "参加" + this.activity.title + "活动订单信息",
                    no: "25647892",
                    cost: "100",
                    remark: "参加" + this.activity.title + "活动缴纳的费用",
                };
                this.$refs.payRef.setOrder(order);
                this.$refs.payRef.setTitle("活动订单支付");
            }
        },
        data() {
            return {
                activePage: '活动中心',
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight -50,
                activity: "",
                e1: require("@/assets/img/em/1.png"),
                e2: require("@/assets/img/em/2.png"),
                e3: require("@/assets/img/em/3.png"),
                e4: require("@/assets/img/em/4.png"),
                e5: require("@/assets/img/em/5.png"),
                e6: require("@/assets/img/em/6.png"),
                signs: [
                    {
                        name: "张辽",
                        avatar: require("@/assets/img/avatar/avatar-1.jpg"),
                    },
                    {
                        name: "李清照",
                        avatar: require("@/assets/img/avatar/avatar-1.jpg"),
                    },
                    {
                        name: "王豆豆",
                        avatar: require("@/assets/img/avatar/avatar-1.jpg"),
                    }
                ],
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
            color: #707070;
            font-size: 18px;
            line-height: 31px;
            margin-bottom: 2px;
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