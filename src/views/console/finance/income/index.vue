<template>
    <div :class="bgClass + '-main'">
        <el-card :class="bgClass + '-card'" :style="'height:' + clientHeight + 'px;'">
            <el-card>
                <el-form :class="bgClass + '-form mt-20'"
                         ref="searchform"
                         :model="searchform"
                         :inline="true"
                         :validate-on-rule-change="false"
                         label-width="80px"
                         label-position="right">

                    <el-form-item label="时间区间" prop="name">
                        <el-date-picker
                                v-model="searchform.dateRange"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                    <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
                </el-form>

                <div class="mb-10 mt-40">
                </div>

                <el-table
                        :class="bgClass == 'aiocw' ? '':'aioc-table'"
                        :border="bgClass == 'aiocw'"
                        ref="codeTable"
                        :data="tableData"
                        @selection-change='onTableSelectChange'
                        @row-click='tableRowClick'
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                >
                    <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                    <el-table-column prop="outTradeNo" label="订单号" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="totalAmount" label="金额（¥）" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span class="color-fa5c26 fb">{{scope.row.totalAmount}}元</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="支付状态" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span :class="fmtOrderStatusColor(scope.row.status) + ' fb'">
                                {{fmtOrderStatus(scope.row.status)}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="payTime" label="支付时间" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="description" label="收入描述" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="createUserName" label="客户姓名" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="payWay" label="支付方式" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span >{{fmtPayWay(scope.row.payWay)}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>
        </el-card>
        <Add ref="addRef"></Add>
        <Edit ref="editRef"></Edit>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    export default {
        name: "index",
        components: {Pagination},
        mounted() {
            this.search(0, 10);
        },
        methods: {
            tableRowClick(row) {
                this.$refs.codeTable.toggleRowSelection(row);
            },
            onTableSelectChange(rows) {
                this.checkRows = rows;
            },
            toggleSelection() {
                this.$refs.codeTable.clearSelection();
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", currentPage);
                params.append("limit", pageSize);
                if(this.searchform.dateRange != null && this.searchform.dateRange.length == 2) {
                    params.append("startTime", this.searchform.dateRange[0]);
                    params.append("endTime", this.searchform.dateRange[1]);
                }
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_order_flow_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                }
            },

            reseta() {
                this.searchform = {
                    dateRange: "",
                };
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
                bgClass: "aiocw",
                searchform: {
                    dateRange: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },

            }
        },
    }
</script>

<style scoped>

</style>
<style>

</style>