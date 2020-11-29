<template>
    <div>
        <el-dialog class="aiCloud-dialog"
                :close-on-click-modal="false"
                :visible.sync="dialogVisible"
                width="900px"
                :title="title"
                :close-on-press-escape="false"
                :show-close="true">
            <div class="zfd">
                {{order.title}}
            </div>
            <div>
                <el-card class="mb-10">
                    <div class="ddxq">
                        <span>订单编号：{{order.no}}</span>
                        <span>报名费用：<span class="jg"> {{order.cost}}元</span></span>
                        <span>费用用途： {{order.remark}}</span>
                    </div>
                </el-card>
            </div>
            <el-card class="tr mt-10 mb-10">
                订单费用合计：<span class="fs-20 color-fa5c26 fb">¥ {{order.cost}}</span> 元
            </el-card>
            <el-card>
                <div class="zfd">
                    选择您的支付方式
                </div>
                <div class="dffn mt-10">
                    <div :class="(payWaySelect == 'wx' ? 'selected':'') + ' wx' " @click="pay('wx')">
                        <i class="wxzf"></i>
                        <span>微信支付</span>
                        <div v-show="payWaySelect == 'wx'" class="sjx">
                            <i class="el-icon-check dh"></i>
                        </div>
                    </div>
                    <div :class="(payWaySelect == 'zfb' ? 'selected':'') + ' ml-35 zfb'" @click="pay('zfb')">
                        <i class="zfbzf"></i>
                        <div v-show="payWaySelect == 'zfb'" class="sjx">
                            <i class="el-icon-check dh"></i>
                        </div>
                    </div>
                </div>
                <div v-show="payWaySelect == 'wx'" class="dffc tl mt-20">
                    <el-image :src="require('@/assets/img/ewm/wxewm.png')" :fit="fit" class="wd-200 hp-200"></el-image>
                    <span class="zft">微信扫码支付</span>
                </div>
                <div v-show="payWaySelect == 'zfb'" class="dffc tl mt-20">
                    <el-image :src="require('@/assets/img/ewm/zfbewm.png')" :fit="fit" class="wd-200 hp-200"></el-image>
                    <span class="zft">支付宝扫码支付</span>
                </div>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Pay",
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
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

            pay(way) {
                this.payWaySelect = way;
                // if(way == 'wx') {
                //
                // } else if (way == 'zfb') {
                //
                // }
            },
        },
        data() {
            return {
                title: "支付订单",
                dialogVisible: false,
                order: {
                    title: "",
                    no: "",
                    cost: "",
                    remark: "",
                },
                payWaySelect: "",
            }
        }
    }
</script>

<style scoped>
        .zfd {
            text-align: left;
            margin-top: 20px;
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