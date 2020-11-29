<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="增加课程大类信息"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="true"
                center>
            <el-card class="aiocw-card">
                <el-form class="aiocw-form mt-20"
                         ref="searchform"
                         :model="searchform"
                         :inline="true"
                         :validate-on-rule-change="false"
                         label-width="80px"
                         label-position="right">

                    <el-form-item label="序列号" prop="name">
                        <el-input
                                v-model="searchform.uuid"
                                class="wp-180 mr-10"
                                placeholder="请输入序列号"
                                prefix-icon="el-icon-search">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证书名称" prop="name">
                        <el-input
                                v-model="searchform.name"
                                class="wp-180 mr-10"
                                placeholder="请输入证书名称"
                                prefix-icon="el-icon-search">
                        </el-input>
                    </el-form-item>

                    <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                    <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
                </el-form>

                <div class="mb-10 mt-20">
                    <el-button class="aioc-btn1" v-aba="['a']" type="primary" icon="el-icon-plus" size="small" @click="bindCa">绑定证书</el-button>
                </div>

                <el-table
                        class="aiocw-table"
                        ref="codeTable"
                        :data="tableData"
                        @selection-change='onTableSelectChange'
                        @row-click='tableRowClick'
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                >
                    <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                    <el-table-column prop="img" label="活动海报" width="122px">
                        <template slot-scope="scope">
                            <el-image
                                    style="width: 100px; height: 50px"
                                    :src="scope.row.photo"
                                    fit="fit"
                                    :preview-src-list="scope.row.photos"
                            ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="uuid" label="序列号" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="name" label="证书名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="unit" label="颁发机构" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="status" label="状态" fixed="right">
                        <el-tag type="info" effect="dark">
                            未绑定
                        </el-tag>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       type="info"
                                       @click="bindCaRow(scope.row)">绑定证书</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        class="pb-10 pt-20"
                        @size-change="acHandleSizeChange"
                        @current-change="acHandleCurrentChange"
                        :current-page="acCurrentPage"
                        :page-sizes="[10]"
                        :page-size="acPageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalAcCount">
                </el-pagination>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "index",
        mounted() {
            this.search(0, 10);
        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },


            /**
             * 分页方法
             */
            acHandleSizeChange(val) {
                this.acPageSize = val;
                this.acCurrentPage = 1;
            },
            acHandleCurrentChange(val) {
                this.acCurrentPage = val;
            },

            bindCa() {
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for(var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.id + "\"");
                }
                this.bindCaRequest();
            },
            bindCaRow(row) {
                this.checkRowIds = [];
                this.checkRowIds.push("\"" + row.id + "\"");
                this.bindCaRequest();
            },
            bindCaRequest() {
                this.$confirm('确定将证书授予' + this.user.name + '?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
            },


            getUUID() {
                return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
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
                    const uuid = this.getUUID();
                    var uuidObj = {
                        id: i+1,
                        uuid: uuid,
                        name: "优秀绘画",
                        unit: "安徽柏林书画研究院",
                        photo: require("@/assets/img/ryzs.jpg"),
                        photos: [require("@/assets/img/ryzs.jpg")],
                        createTime: "2020-11-18 14:00:00",
                        remark: "优秀绘画",
                        status: "0",
                        user: "",
                    };
                    this.tableData.push(uuidObj);
                }
                this.totalAcCount = this.tableData.length;
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
                    uuid: row.uuid,
                    name: row.name,
                    unit: row.unit,
                    photo: [{name:'', url: row.photo}],
                    createTime: row.createTime,
                    remark: row.remark,
                };
                this.$refs.editRef.open();
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

            setUser(user) {
                this.user = user;
            },
        },
        data() {
            return {
                dialogVisible: false,
                searchform: {
                    name: "",
                    uuid: "",
                },
                user: {
                    id: "",
                    name: "姜维",
                    sex: "男",
                    idCard: "210448196602231235",
                    birth: "2016-06-15",
                    age: "5",
                    address: "安徽省合肥市经开区",
                    phone: "13588400659",
                    score: "58",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],

                totalAcCount: 0,
                acPageSize: 10,
                acCurrentPage: 0,
                areaOptions: [],
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