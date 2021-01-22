<template>
    <div>
        <el-divider content-position="left">
            我参与的活动
        </el-divider>
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
            <Pagination class="fr mb-20 mt-20" ref="orPage" @search="initOrder"></Pagination>
        </div>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination"
    export default {
        name: "MyPay",
        components: {Pagination},
        mounted() {
            this.initOrder(0, 10);
        },
        methods: {
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
                orders: [],
                orCurrentPage: 1,
                orPageSize: 10,
            }
        }
    }
</script>

<style scoped>
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