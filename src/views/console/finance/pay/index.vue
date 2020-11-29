<template>
    <div class="f-main">
        <el-card class="aioc-card" :style="'height:' + clientHeight + 'px;'">
            <el-form class="aioc-form mt-20"
                     ref="searchform"
                     :model="searchform"
                     :inline="true"
                     :validate-on-rule-change="false"
                     label-width="120px"
                     label-position="right">

                <el-form-item label="支付账户描述" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入支付账户描述"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-button class="ml-20 aioc-btn" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
                <el-button class="aioc-btn1" v-aba="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">配置</el-button>
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
                <el-table-column prop="name" label="支付账户描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="type" label="支付账户类型" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{scope.row.type == 'wx'? '微信':'支付宝'}}
                    </template>
                </el-table-column>
                <el-table-column prop="paySet" label="支付账户参数" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <div v-if="showPaySet(scope.row.id)">
                           <span class="pd-5" v-for="(item, index) in scope.row.paySet" :key="index">
                            {{ index}}: {{item}}<br/>
                            </span>
                            <el-button size="mini" @click="hidePaySet(scope.row.id)">隐藏参数</el-button>
                        </div>

                        <div v-else>
                            <i class="yc"></i> <span class="fb mr-20">* * * * * *</span>
                            <el-button size="mini" @click="showPaySetIds.push(scope.row.id);">查看参数</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == '0'" effect="dark">
                            已启用
                        </el-tag>

                        <el-tag v-else type="info" effect="dark">
                            已停用
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  fixed="right" width="250">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status == '1'">
                            <el-button type="success"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="startPaySet(scope.row)">启用</el-button>
                            <el-button class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="editRow(scope.row)">编辑</el-button>
                            <el-button
                                    v-aba="['d']"
                                    size="mini"
                                    type="danger"
                                    @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                        </div>

                        <div v-else>
                            <el-button type="info"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="stopPaySet(scope.row)">停用</el-button>
                            <el-button class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="editRow(scope.row)">编辑</el-button>
                            <el-button
                                    v-aba="['d']"
                                    size="mini"
                                    type="danger"
                                    @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        </el-card>
        <Add ref="addRef"></Add>
        <Edit ref="editRef"></Edit>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/console/finance/pay/add";
    import Edit from "@/views/console/finance/pay/edit";
    export default {
        name: "index",
        components: {Pagination, Add, Edit},
        mounted() {
            this.search(0, 10);
        },
        methods: {
            startPaySet(row) {
                console.log(row)
            },

            stopPaySet(row) {
                console.log(row)
            },

            showPaySet(id) {
                for(var i in this.showPaySetIds) {
                    if(id == this.showPaySetIds[i]) {
                        return true;
                    }
                }
                return false;
            },

            hidePaySet(id) {
                var temp = [];
                for(var i in this.showPaySetIds) {
                    if(id != this.showPaySetIds[i]) {
                        temp.push(this.showPaySetIds[i]);
                    }
                }
                this.showPaySetIds = temp;
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
                this.tableData = [
                    {
                        id: "wx1",
                        name: "公司微信",
                        type: "wx",
                        paySet: {
                            appid: "aaaaaa",
                            mch_id: "aaaaaa",
                            key: "aaaaaa",
                            secret: "aaaaaa",
                        },
                        createTime: "",
                        status: "0",
                    },
                    {
                        id: "zfb1",
                        name: "公司支付宝",
                        type: "zfb",
                        paySet: {
                            appid: "aaaaaa",
                            RSA_PRIVATE_KEY: "aaaaaa",
                            ALIPAY_PUBLIC_KEY: "aaaaaa",
                        },
                        createTime: "",
                        status: "0",
                    },
                    {
                        id: "wx2",
                        name: "子公司微信",
                        type: "wx",
                        paySet: {
                            appid: "bbbbbbb",
                            mch_id: "bbbbbbb",
                            key: "bbbbbbb",
                            secret: "bbbbbbb",
                        },
                        createTime: "",
                        status: "1",
                    },
                    {
                        id: "zfb2",
                        name: "子公司支付宝",
                        type: "zfb",
                        paySet: {
                            appid: "bbbbbbb",
                            RSA_PRIVATE_KEY: "bbbbbbb",
                            ALIPAY_PUBLIC_KEY: "bbbbbbb",
                        },
                        createTime: "",
                        status: "1",
                    }
                ];
                this.$refs.pageRef.totalCount = this.tableData.length;
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
                    type: row.type,
                    createTime: row.createTime,
                    status: row.status,
                };
                if(row.type == 'wx') {
                    this.$refs.editRef.setWx(row.paySet);
                } else {
                    this.$refs.editRef.setZfb(row.paySet);
                }
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
                    name: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,

                showPaySetIds: [],
            }
        },
    }
</script>

<style scoped>

</style>
<style >
    .aioc-upload .el-upload-list__item-thumbnail {
        vertical-align: middle;
        display: inline-block;
        height: 400px;
        width: 500px;
        float: left;
        position: relative;
        z-index: 1;
        margin-left: -80px;
        background-color: #FFF;
    }
    .aioc-upload .el-upload-list__item {
        overflow: hidden;
        z-index: 0;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        margin-top: 10px;
        padding: 10px 10px 10px 90px;
        height: 420px;
        width: 600px;
    }
    .aioc-upload .el-upload-dragger {
        width: 600px;
        height: 180px;
    }
</style>