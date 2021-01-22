<template>
    <!--eslint-disable-->
    <div>
        <el-dialog class="aiCloud-dialog"
                :close-on-click-modal="false"
                :visible.sync="dialogVisible"
                width="900px"
                :title="title"
                :close-on-press-escape="false"
                :show-close="true"
                :before-close="close">
            <div class="zfd">
                {{order.subject}}订单信息
            </div>
            <div>
                <el-card class="mb-10">
                    <div slot="header" class="clearfix">
                        <span class="color-409EFF fb fl">订单编号：{{order.outTradeNo}}</span>
                    </div>
                    <div class="ddxq">
                        <span>报名费用：<span class="jg"> {{order.totalAmount}}元</span></span>
                        <span>费用用途： {{order.description}}</span>
                    </div>
                </el-card>
            </div>
            <el-card class="tr mt-10 mb-10">
                订单费用合计：<span class="fs-20 color-fa5c26 fb">¥ {{order.totalAmount}}</span> 元
            </el-card>
            <el-card>
                <div slot="header" class="clearfix">
                    <span class="fb fl">选择您的支付方式</span>
                    <span class="color-fa5c26 fl mr-10">（提示: 支付过程中，请勿手动关闭任何界面）</span>
                </div>
                <div class="dffn mt-10">
                    <div :class="(payWaySelect == '1' ? 'selected':'') + ' wx' " @click="pay('1')">
                        <i class="wxzf"></i>
                        <span>微信支付</span>
                        <div v-show="payWaySelect == '1'" class="sjx">
                            <i class="el-icon-check dh"></i>
                        </div>
                    </div>
                    <div :class="(payWaySelect == '0' ? 'selected':'') + ' ml-35 zfb'" @click="pay('0')">
                        <i class="zfbzf"></i>
                        <div v-show="payWaySelect == '0'" class="sjx">
                            <i class="el-icon-check dh"></i>
                        </div>
                    </div>
                </div>
            </el-card>

            <el-card class="mt-10" v-if="order.fresult != null && order.fresult != '' && payWaySelect == '1'">
                <div slot="header" class="clearfix">
                    <span class="fb fl">微信支付付款码，请打开微信扫一扫进行扫码付款,</span>
                    <span class="ml-5 color-fa5c26 fl">{{remainingTime}}</span>
                </div>
                <vue-qr class="wximg"
                        :size="191"
                        :margin="0"
                        :auto-color="true"
                        :dot-scale="1"
                        :text="order.fresult"/>
            </el-card>
        </el-dialog>
    </div>
</template>
<!--eslint-disable-->
<script>
    import VueQr from 'vue-qr'
    export default {
        name: "Pay",
        props: ["activity"],
        components: {VueQr},
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
                this.wxPayFlag = false;
                this.remainingTime = "";
                clearInterval(this.timer);
                this.timer = "";
                this.order.fresult = "";
                this.payWaySelect = "";
            },
            open() {
                this.dialogVisible = true;
            },

            setOrder(order) {
                this.order = order;
            },

            setTitle(title) {
                this.title = title;
            },

            /**
             * 时间倒计时
             * @param {*} rTime 剩余时间 秒
             * @author panyong
             */
            timeCount(rTime) {
                if(rTime > 0) {
                    this.remainingTime = "剩余支付时间：" + rTime + "秒";
                } else {
                    this.wxPayFlag = false;
                    this.remainingTime = "";
                    clearInterval(this.timer);
                    this.timer = "";
                    this.order.fresult = "";
                    this.payWaySelect = "";
                }
            },

            async pay(way) {
                this.payWaySelect = way;
                let params = new FormData()
                params.append("outTradeNo", this.order.outTradeNo);
                params.append("subject", this.order.subject);
                params.append("totalAmount", this.order.totalAmount);
                params.append("body", this.order.description);
                params.append("payWay", way);
                if (way == '1') {
                    if(this.wxPayFlag) {
                        return;
                    }
                    this.wxPayFlag = true;
                    params.append("notify_url", this.$aiocUrl.blsh_service_v1_wx_pay_activity_notify_url);
                } else if (way == '0') {
                    if(this.aliPayFlag) {
                        return;
                    }
                    clearInterval(this.timer);
                    this.timer = "";
                    this.aliPayFlag = true;
                    params.append("notify_url", this.$aiocUrl.blsh_service_v1_pay_activity_notify_url);
                    params.append("return_url", this.$aiocUrl.blsh_service_v1_pay_activity_return_url);
                }
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_pay_to, params, "POST");
                if (data.code == 200) {
                    if (way == '1') {
                        this.order.fresult = data.data.code_url;
                        // 3分钟计时
                        var count = 3*60;
                        if(data.data.remainingTime) {
                            count = data.data.remainingTime;
                        }
                        var that = this;
                        this.timer = setInterval (function () {
                            console.log(count)
                            count--;
                            that.timeCount(count);
                            if(count%3 == 0) {
                                that.handlerWxPayOrder(that.order);
                            }
                        }, 1000);
                    } else if (way == '0') {
                        this.aliPayFlag = false;
                        document.querySelector('body').innerHTML = data.data;
                        document.forms[0].submit();
                    }
                    return true;
                }
            },

            async handlerWxPayOrder(order) {
                let params = new FormData()
                params.append("outTradeNo", order.outTradeNo);
                params.append("type", "activity");
                this.$axios.post(
                    this.$aiocUrl.blsh_service_v1_wx_pay_check2, params, {timeout: 200000}
                )
                .then(res => {
                    let data = res.data;
                    if (data.code === 200) {
                        if(data.data == "success") {
                            clearInterval(this.timer);
                            this.timer = "";
                            this.$router.push({
                                name: 'activityDetail'
                            });
                            this.close();
                            this.$notify({
                                title: '提示',
                                message: '订单支付成功'
                            });
                        }
                        // else if(data.data == "fail") {
                        //     this.$notify.error({
                        //         title: '提示',
                        //         message: '订单支付失败'
                        //     });
                        // } else if(data.data == "timeout") {
                        //     this.$notify.error({
                        //         title: '提示',
                        //         message: '订单支付超时'
                        //     });
                        // }
                    }
                })
                .catch(error => {
                    clearInterval(this.timer);
                    this.timer = "";
                    this.$notify.error({
                        title: '提示',
                        message: '订单支付失败'
                    });
                });
            },
        },
        data() {
            return {
                title: "支付订单",
                dialogVisible: false,
                order: {
                    title: "",
                    outTradeNo: "",
                    totalAmount: "",
                    subject: "",
                    description: "",
                    fresult: "",
                },
                payWaySelect: "",
                remainingTime: "",
                timer: "",
                wxPayFlag: false,
                aliPayFlag: false,
            }
        }
    }
</script>

<style scoped>
        .zfd {
            text-align: left;
            padding-bottom: 10px;
            font-weight: 600;
            font-size: 16px;
        }
        .ddxq {
            display: flex;
            flex-direction: column;
            line-height: 40px;
            text-align: left;
            padding-left: 20px;
            color: #606266;
        }
        .jg {
            color: #ff2a24;
            font-size: 16px;
            font-weight: 600;
        }
        .zfb {
            position: relative;
            border: 1px solid #ffffff;
        }
        .wx {
            font-size: 18px;
            display: flex;
            padding-right: 6px;
            position: relative;
            border: 1px solid #ffffff;
        }
        .wx > span {
            display: inline-block;
            line-height: 30px;
            margin-left: 5px;
        }
        .selected {
            border: 1px solid #F56C6C;
        }
        .sjx {
            width: 0;
            height:0;
            border-right: 20px solid #fc5d39;
            border-top: 10px solid transparent;
            border-left: 10px solid transparent;
            position: absolute;
            bottom: 0px;
            right: 0px;
        }
        .dh {
            position: absolute;
            top: -9px;
            left: 9px;
            font-size: 10px;
            color: #ffffff;
        }
        .zft {
            margin-top: 10px;
            color: #fc5d39;
            font-size: 16px;
            font-weight: 600;
            width: 200px;
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