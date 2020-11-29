<template>
    <div class="f-main">
        <el-card class="aioc-card" :style="'height:' + clientHeight + 'px;'">
            <el-form class="aioc-form mt-20"
                     ref="searchform"
                     :model="searchform"
                     :inline="true"
                     :validate-on-rule-change="false"
                     label-width="80px"
                     label-position="right">

                <el-form-item label="月份" prop="name">
                    <el-date-picker
                            v-model="searchform.month"
                            type="month"
                            placeholder="请选择月份">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="时间区间" prop="name">
                    <el-date-picker
                            v-model="searchform.dateRange"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-button class="ml-20 aioc-btn" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
            </div>

            <el-table
                    class="aioc-table"
                    ref="codeTable"
                    :data="tableData"
                    @selection-change='onTableSelectChange'
                    @row-click='tableRowClick'
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'9px 1px'}"
            >
                <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                <el-table-column prop="no" label="订单号" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="cost" label="金额（¥）" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="status" label="支付状态" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="time" label="支付时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="desc" label="收入描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="to" label="付款人" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="type" label="支付方式" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
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
                // let params = new FormData()
                // params.append("page", this.currentPage);
                // params.append("limit", this.pageSize);
                // params.append("name",  this.searchform.name);
                // let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_role_list, params, "POST");
                // if (data.code === 200) {
                //     this.tableData = data.data;
                //     this.$refs.pageRef.totalCount = data.totalCount;
                //     return true;
                // }
                this.tableData = [];
                for(var i=0; i < 10; i++) {
                    var uuidObj = {
                        id: "1",
                        no: "20200506898989",
                        cost: "100",
                        status: "已支付",
                        time: "2020-11-5 15:30:16",
                        desc: " 用于支付报名参加绘画-中国画12岁以上、摄影-摄影入门12岁以上学习所产生的报名费用",
                        to: "典韦",
                        type: "支付宝支付",
                    };
                    this.tableData.push(uuidObj);
                }
                this.$refs.pageRef.totalCount = this.tableData.length;
            },

            reseta() {
                this.searchform = {
                    name: "",
                    status: "",
                };
            },
        },
        data() {
            return {
                searchform: {
                    month: "",
                    dateRange: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,pickerOptions: {
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