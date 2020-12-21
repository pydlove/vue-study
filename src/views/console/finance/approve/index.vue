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

                    <el-form-item label="审批标题" prop="name">
                        <el-input
                                v-model="searchform.name"
                                class="wp-180 mr-10"
                                placeholder="请输入审批标题"
                                prefix-icon="el-icon-search">
                        </el-input>
                    </el-form-item>

                    <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                    <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
                </el-form>

                <div class="mb-10 mt-40">
                    <el-button class="aioc-btn1" v-aba="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">增加</el-button>
                    <el-button v-aba="['d']" type="danger" icon="el-icon-delete" size="small" @click="deletea">批量删除</el-button>
                    <el-button v-aba="['d']" type="warning" icon="el-icon-close" size="small" @click="toggleSelection">取消选择</el-button>
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
                    <el-table-column sortable prop="id" label="审批单号" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column sortable prop="name" label="申请标题" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column sortable prop="remark" label="申请内容" :show-overflow-tooltip="true" :formatter="formatRole"></el-table-column>
                    <el-table-column sortable prop="createUserName" label="申请人" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column sortable prop="createTime" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column sortable prop="approveName" label="审批人" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="link" label="工单状态" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span :style="'color:' + formatLinkColor(scope.row.link)">
                                {{formatLinkMethod(scope.row.link)}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="380">
                        <template slot-scope="scope">
                            <!--<el-button-->
                                    <!--size="mini"-->
                                    <!--type="success"-->
                                    <!--@click="proessDetail(scope.row)">流程</el-button>-->
                            <el-button
                                    v-if="scope.row.link == '0'"
                                    size="mini"
                                    type="success"
                                    @click="editRow(scope.row)">编辑</el-button>
                            <el-button
                                    v-if="scope.row.link == '0'"
                                    size="mini"
                                    type="danger"
                                    @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                            <el-button class="aioc-btn1"
                                    v-if="scope.row.link == '0'"
                                    size="mini"
                                    @click="circulationToNext(scope.row)">流转</el-button>
                            <el-button class="aioc-btn1"
                                       v-if="scope.row.link == '1'"
                                       size="mini"
                                       @click="toApprove(scope.row)">审批</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>
        </el-card>
        <Add ref="addRef"></Add>
        <Edit ref="editRef"></Edit>
        <ApproveCirculation ref="aproveCirculationRef"></ApproveCirculation>
        <Approve ref="approveRef"></Approve>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/console/finance/approve/add";
    import Edit from "@/views/console/finance/approve/edit";
    import ApproveCirculation from "@/views/console/finance/approve/approveCirculation";
    import Approve from "@/views/console/finance/approve/approve";
    export default {
        name: "index",
        components: {Pagination, Add, Edit, ApproveCirculation, Approve},
        mounted() {
            this.search(0, 10);
        },
        methods: {

            toApprove(row) {
                this.$refs.approveRef.form = row;
                this.$refs.approveRef.form.createUserName = row.createUserName;
                this.$refs.approveRef.open();
            },

            circulationToNext(row) {
                this.$refs.aproveCirculationRef.form = row;
                this.$refs.aproveCirculationRef.form.nextLinkName = "总控审批";
                this.$refs.aproveCirculationRef.nextLink = "1";
                this.$refs.aproveCirculationRef.linkLog = "流转到管理员审批环节",
                // this.$refs.approveCirculationRef.approveRole = "0";
                // this.$refs.aproveCirculationRef.form.createUserAccount = row.createUserAccount;
                this.$refs.aproveCirculationRef.form.createUserName = row.createUserName;
                // this.$refs.aproveCirculationRef.form.approveUser = "";
                this.$refs.aproveCirculationRef.open();
            },


            /**
             * 增加
             */
            add() {
                this.$refs.addRef.open();
            },

            /**
             * 编辑
             */
            editRow(row) {
                this.$refs.editRef.form = {
                    id: row.id,
                    name: row.name,
                    remark:  row.remark,
                    createTime:  row.createTime,
                };
                this.$refs.editRef.open();
            },

            /**
             * 批量删除
             * 单行删除
             * 删除请求
             */
            deletea() {
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for(var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.id + "\"");
                }
                this.deleteRequest();
            },
            deleteRow(index, row) {
                this.checkRowIds = [];
                this.checkRowIds.push("\"" + row.id + "\"");
                this.deleteRequest();
            },
            deleteRequest() {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
            },

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
                    var link = "0";
                    var approveName = "";
                    if(i < 3) {
                        link = '0';
                    } else if (i >= 4 && i <5 ) {
                        link = '1';
                        approveName = "曹操";
                    } else if (i >= 5 && i <6 ) {
                        link = '2';
                        approveName = "曹操";
                    } else if (i >= 6 && i <8 ) {
                        link = '3';
                        approveName = "曹操";
                    } else if (i >= 8 && i <11 ) {
                        link = '4';
                        approveName = "曹操";
                    }

                    var uuidObj = {
                        id: this.generateNo("BL", 4),
                        name: "申请采购绘画笔",
                        remark: "申请采购绘画笔",
                        link: link,
                        approveName: approveName,
                        createUserName: "张三",
                        createTime: "2020-11-18 14:00:00",
                    };
                    this.tableData.push(uuidObj);
                }
                this.$refs.pageRef.totalCount = this.tableData.length;
            },

            generateNo(orderPrefix, orderSuffix) {
                var random_no = "";
                for (var i = 0; i < orderSuffix; i++) //j位随机数，用以加在时间戳后面。
                {
                    random_no += Math.floor(Math.random() * 10);
                }
                random_no = orderPrefix + new Date().getTime() + random_no;
                return random_no;
            },

            formatLinkMethod(value) {
                switch (value) {
                    case "0":
                        return "新建";
                    case "1":
                        return "待审批";
                    case "2":
                        return "审批驳回";
                    case "3":
                        return "完成审批";
                    case "4":
                        return "否决";
                    default :
                        return value;
                }
            },

            formatLinkColor(value) {
                switch (value) {
                    case "0":
                        return "#67C23A";
                    case "1":
                        return "#67C23A";
                    case "2":
                        return "#E6A23C";
                    case "3":
                        return "white";
                    case "4":
                        return "red";
                    default :
                        return value;
                }
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
                bgClass: "aiocw",
                searchform: {
                    name: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
            }
        },
    }
</script>

<style scoped>

</style>
<style>

</style>