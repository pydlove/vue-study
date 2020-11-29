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

                <el-form-item label="用户名称" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入用户名称"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-form-item label="用户账号" prop="name">
                    <el-input
                            v-model="searchform.account"
                            class="wp-180 mr-10"
                            placeholder="请输入用户账号"
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
                <el-table-column prop="img" label="照片" width="121px">
                    <template slot-scope="scope">
                        <el-image
                                :style="'width:' + photoWidth + 'px;height:' + photoHeight + 'px;'"
                                :src="scope.row.photo"
                                fit="fit"
                                :preview-src-list="scope.row.srcList"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="account" label="账号" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="phone" label="电话" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="email" label="邮箱" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="status" label="状态" :show-overflow-tooltip="true" :formatter="statusFormat"></el-table-column>
                <el-table-column prop="createTime" label="时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="详情" type="expand" width="85" fixed="right">
                    <template slot-scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <div class="mp-top">
                                <el-divider content-position="left">
                                    用户信息
                                </el-divider>
                            </div>
                            <div class="dffn">
                                <div class="wdi-400">
                                    <div class="xx-lable">
                                        <span>账 <span class="ml-28"></span> 号</span>
                                        <span>{{ props.row.account }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>姓 <span class="ml-28"></span> 名</span>
                                        <span>{{ props.row.name }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>性 <span class="ml-28"></span> 别</span>
                                        <span>{{ props.row.sex }}</span>
                                    </div>
                                    <div class="xx-lable">
                                            <span>
                                                身<span class="ml-5"></span>
                                                份<span class="ml-5"></span>
                                                证
                                            </span>
                                        <span>{{ props.row.idCard }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>出生年月</span>
                                        <span>{{ props.row.birth }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>地 <span class="ml-28"></span> 址</span>
                                        <span>{{ props.row.address }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>手机号码</span>
                                        <span>{{ props.row.phone }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>电子邮箱</span>
                                        <span>{{ props.row.email }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>状 <span class="ml-28"></span> 态</span>
                                        <span>{{ props.row.status }}</span>
                                    </div>
                                </div>

                            </div>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作"  fixed="right" width="200">
                    <template slot-scope="scope">
                            <el-button class="aioc-btn1"
                                    v-aba="['e']"
                                    size="mini"
                                    @click="editRow(scope.row)">编辑</el-button>
                            <el-button
                                    v-aba="['d']"
                                    size="mini"
                                    type="danger"
                                    @click="deleteRow(scope.$index, scope.row)">删除</el-button>
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
    import Add from "@/views/portal/user/add"
    import Edit from "@/views/portal/user/edit"

    export default {
        name: "index",
        components: {Pagination, Add, Edit},
        mounted() {
            this.search(0, 10);
        },
        methods: {

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
                    name: '曹操',
                    account: 'caomd',
                    password: '123456',
                    phone: '13584695986',
                    email: '13584695986@186.com',
                    status: '活跃',
                    remark: '曹操',
                    sex: '0',
                    idCard: '34290119924165986',
                    address: '安徽合肥',
                    birth: '1992-11-11',
                    createTime: '2020-11-22 11:22:11',
                    photo: require("@/assets/img/guojia.jpg"),
                    srcList: [
                        require("@/assets/img/guojia.jpg"),
                    ],
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

            search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                this.tableData = [];
                for(var i=0; i < 10; i++) {
                    var uuidObj = {
                        id: i+1,
                        name: '曹操',
                        account: 'caomd',
                        password: '123456',
                        phone: '13584695986',
                        email: '13584695986@186.com',
                        status: '活跃',
                        remark: '曹操',
                        sex: '男',
                        idCard: '34290119924165986',
                        address: '安徽合肥',
                        birth: '1992-11-11',
                        createTime: '2020-11-22 11:22:11',
                        photo: require("@/assets/img/guojia.jpg"),
                        srcList: [
                            require("@/assets/img/guojia.jpg"),
                        ],
                    };
                    this.tableData.push(uuidObj);
                }
                this.$refs.pageRef.totalCount = this.tableData.length;
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

            statusFormat(row, column) {
                const value = row[column.property];
                switch (value) {
                    case "active":
                        return "已激活";
                    case "lock":
                        return "已锁定";
                    case "freeze":
                        return "已冻结";
                    case "expired":
                        return "已过期";
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
                searchform: {
                    name: "",
                    account: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
                photoWidth: 50,
                photoHeight: 50,

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