<template>
    <!--eslint-disable-->
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

                    <el-form-item label="商户订单号" prop="outTradeNo" label-width="130px">
                        <el-input
                                v-model="searchform.outTradeNo"
                                class="wp-180 mr-10"
                                placeholder="请输入订单号"
                        >
                        </el-input>
                    </el-form-item>

                    <el-form-item  prop="dateTimeRange">
                        <el-date-picker  v-model="searchform.financialStatistics"
                                        type="datetimerange"
                                        value-format="yyyy-MM-dd HH:mm:SS"
                                        :picker-options="pickerOptions"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :clearable="true"
                                        align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search"
                               @click="search(0, 10)">搜索
                    </el-button>
                    <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
                </el-form>

                <div class="mb-10 mt-40">
                </div>

                <el-table
                        :class="bgClass == 'aiocw' ? '':'aioc-table'"
                        :border="bgClass == 'aiocw'"
                        ref="table"
                        :data="tableData"
                        @selection-change='onTableSelectChange'
                        @row-click='tableRowClick'
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                        >
                    <el-table-column prop="outTradeNo" label="商户订单号" width="121px"></el-table-column>
                    <el-table-column prop="status" label="支付状态" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="subject" label="订单名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="totalAmount" label="订单金额" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="description" label="订单描述" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="payTime" label="支付时间" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="payWay" label="支付方式" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="tradeNo" label="支付平台号" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="gift" label="礼物" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="giftNum" label="礼物数量" :show-overflow-tooltip="true"></el-table-column>

                </el-table>
                <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>
        </el-card>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";

    export default {
        name: "financial",
        components: {Pagination},

        mounted() {
            this.search(0, 10);
        },

        methods: {
            async search(currentPage, pageSize) {
                //1.拿到outTradeNo商户订单编号
                //2.拿到起末时间
                //3.页码  页数据

                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("outTradeNo", this.searchform.outTradeNo);
                if(this.searchform.financialStatistics.length > 0 && this.searchform.financialStatistics != null){
                    params.append("startTime",this.searchform.financialStatistics[0]);
                    params.append("endTime",this.searchform.financialStatistics[1]);
                }
                /*params.append("startTime",this.searchform.financialStatistics[0]);
                console.log(this.searchform.financialStatistics[0]);
                params.append("endTime",this.searchform.financialStatistics[1]);
                console.log(this.searchform.financialStatistics[1]);*/
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_gift_census, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            tableRowClick(row) {
                this.$refs.table.toggleRowSelection(row);
            },
            onTableSelectChange(rows) {
                this.checkRows = rows;
            },
            toggleSelection() {
                this.$refs.table.clearSelection();
            },

            reseta() {
                this.searchform = {
                    financialStatistics: [],
                    outTradeNo: "",
                };
                this.search(this.currentPage, this.pageSize)
            },
        },
        data() {
            return {
                bgClass: "aiocw",
                searchform: {
                    financialStatistics: [],
                    outTradeNo: "",
                },
                tableData: [],

                checkRows: [],
                checkRowIds: [],

                clientWidth: 1800,
                clientHeight: document.body.clientHeight - 2,

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
    .xx-lable > span:nth-of-type(1) {
        display: inline-block;
        width: 90px;
        color: #99a9bf;
    }

    .xx-lable > span:nth-of-type(2) {
        display: inline-block;
        color: #303133;
    }

    .xx-lable {
        line-height: 40px;
    }

    .xx-text {
        width: 600px;
    }
</style>

<style>
    .el-table__expanded-cell:hover {
        background: #ffffff !important;
    }
</style>