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

                <el-form-item label="课程名称" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入课程大类名称"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-button class="ml-20 aioc-btn" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
                <el-button class="aioc-btn1" v-aba="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">增加</el-button>
                <el-button v-aba="['d']" type="danger" icon="el-icon-delete" size="small" @click="deletea">批量删除</el-button>
                <el-button v-aba="['d']" type="warning" icon="el-icon-close" size="small" @click="toggleSelection">取消选择</el-button>
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
                <el-table-column prop="user" label="授予人" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="status" label="状态" fixed="right">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == '0' ? 'info':'success'" effect="dark">
                            {{ scope.row.status == '0' ? '未绑定':'已绑定' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  fixed="right" width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status == '0'">
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
    import Add from "@/views/console/certificate/add";
    import Edit from "@/views/console/certificate/edit";
    export default {
        name: "index",
        components: {Pagination, Add, Edit},
        mounted() {
            this.search(0, 10);
        },
        methods: {
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
                    var status = "1";
                    var user = "赵云";
                    if(i < 5) {
                        status = "0";
                        user = "";
                    }
                    var uuidObj = {
                        id: i+1,
                        uuid: uuid,
                        name: "优秀绘画",
                        unit: "安徽柏林书画研究院",
                        photo: require("@/assets/img/ryzs.jpg"),
                        photos: [require("@/assets/img/ryzs.jpg")],
                        createTime: "2020-11-18 14:00:00",
                        remark: "优秀绘画",
                        status: status,
                        user: user,
                    };
                    this.tableData.push(uuidObj);
                }
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
                    uuid: row.uuid,
                    name: row.name,
                    unit: row.unit,
                    photo: [{name:'', url: row.photo}],
                    createTime: row.createTime,
                    remark: row.remark,
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