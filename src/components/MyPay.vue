<template>
    <div>
        <el-divider content-position="left">
            我参与的活动
        </el-divider>
        <div>
            <el-table :data="orders" border size="mini" style="width: 100%">
                <el-table-column prop="no" label="订单编号" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="cost" label="报名费用" show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span class="color-fa5c26 fb">{{scope.row.cost}}元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span class="color-67C23A fb">{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="desc" label="费用用途" show-overflow-tooltip="true"></el-table-column>
            </el-table>
            <Pagination class="fr mb-20 mt-20" ref="sPaginationRef"></Pagination>
        </div>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination"

    export default {
        name: "MyPay",
        components: {Pagination},
        mounted() {

        },
        methods: {
        },
        data() {
            return {
                orders: [
                    {
                        id: "1",
                        no: "20200506898989",
                        cost: "100",
                        status: "已支付",
                        time: "2020-11-5 15:30:16",
                        desc: " 用于支付报名参加绘画-中国画12岁以上、摄影-摄影入门12岁以上学习所产生的报名费用",
                    }
                ],
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