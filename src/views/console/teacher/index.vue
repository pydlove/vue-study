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

                <el-form-item label="教师名称" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入教师名称">
                    </el-input>
                </el-form-item>

                <el-form-item label="电话号码" prop="name">
                    <el-input
                            v-model="searchform.phone"
                            class="wp-180 mr-10"
                            placeholder="请输入电话号码">
                    </el-input>
                </el-form-item>

                <el-form-item label="状态" prop="name">
                    <el-select v-model="searchform.status" placeholder="请选择状态">
                        <el-option label="离职" value="lock"></el-option>
                        <el-option label="在职" value="active"></el-option>
                    </el-select>
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
                    @expand-change='tableExpand'
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'9px 1px'}"
            >
                <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                <el-table-column prop="img" label="照片" width="121px">
                    <template slot-scope="scope">
                        <el-image
                                :style="'width:' + photoWidth + 'px;height:' + photoHeight + 'px;'"
                                :src="scope.row.avatar"
                                fit="fit"
                                :preview-src-list="[scope.row.avatar]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="sex" label="性别" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.sex == "0" ? "男":"女" }}
                    </template>
                </el-table-column>
                <el-table-column prop="idCard" label="身份证" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="phone" label="联系方式" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="status" label="状态" :show-overflow-tooltip="true" :formatter="statusFormat"></el-table-column>
                <el-table-column label="详情" type="expand" width="85" fixed="right">
                    <template slot-scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <div class="mp-top">
                                <el-divider content-position="left">
                                    教师信息
                                </el-divider>
                            </div>
                            <div class="dffn">
                                <div class="wdi-400">
                                    <div class="xx-lable">
                                        <span>姓 <span class="ml-28"></span> 名</span>
                                        <span>{{ props.row.name }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>性 <span class="ml-28"></span> 别</span>
                                        <span>{{ props.row.sex == "0" ? "男":"女" }}</span>
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
                                        <span>{{ props.row.birthtime }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>地 <span class="ml-28"></span> 址</span>
                                        <span>{{ props.row.address }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>联系方式</span>
                                        <span>{{ props.row.phone }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>状态</span>
                                        <span>{{ statusFormatMethod(props.row.status) }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="xx-lable">
                                    <span class="wdi-220">
                                        老师评价
                                        <span class="color-b83f3f">(评价数量：{{totalAcCount}}个)</span>
                                    </span>
                                <el-card>
                                    <el-table
                                            class="aiocw-table"
                                            ref="activityTableRef"
                                            :data="props.row.comments"
                                            @selection-change='onTableSelectChange'
                                            @row-click='tableRowClick'
                                            :row-style="{height:'20px'}"
                                            :cell-style="{padding:'9px 1px'}"
                                    >
                                        <el-table-column prop="content" label="评价内容" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="author" label="评论人" width="100" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="createTime" label="创建时间" width="160" :show-overflow-tooltip="true"></el-table-column>
                                    </el-table>
                                    <el-pagination
                                            class="mt-10 pb-10 pt-20"
                                            @size-change="acHandleSizeChange"
                                            @current-change="acHandleCurrentChange"
                                            :current-page="acCurrentPage"
                                            :page-sizes="[10]"
                                            :page-size="acPageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="totalAcCount">
                                    </el-pagination>
                                </el-card>
                            </div>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  fixed="right" width="200">
                    <template slot-scope="scope">
                        <el-button class="aioc-btn1"
                                   size="mini"
                                   @click="editRow(scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        </el-card>
        <Add ref="addRef" @search="search"></Add>
        <Edit ref="editRef" @search="search" :currentPage="currentPage" :pageSize="pageSize"></Edit>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/console/teacher/add";
    import Edit from "@/views/console/teacher/edit";

    export default {
        name: "index",
        components: {Pagination, Add, Edit},
        mounted() {
            this.search(0, 10);
        },
        methods: {
            add() {
                this.$refs.addRef.open();
            },

            editRow(row) {
                this.$refs.editRef.form = {
                    id: row.id,
                    name: row.name,
                    account: row.account,
                    phone: row.phone,
                    mail: row.mail,
                    status: row.status,
                    remark: row.remark,
                    avatar: row.avatar,
                    idCard: row.idCard,
                    address: row.address,
                    birthtime: row.birthtime,
                    sex: Number(row.sex),
                };
                if(row.avatar != null && row.avatar != "") {
                    var photoArray = row.avatar.split("/")
                    this.$refs.editRef.fileName = photoArray[photoArray.length -1];
                    this.$refs.editRef.originalFileName = photoArray[photoArray.length -1];
                    this.$refs.editRef.fileList = [{url: row.avatar}];
                    this.$refs.editRef.hideUpload = true;
                } else {
                    this.$refs.editRef.fileName = "";
                    this.$refs.editRef.originalFileName = "";
                    this.$refs.editRef.fileList = [];
                    this.$refs.editRef.hideUpload = false;
                }
                this.$refs.editRef.open();
            },

            deletea() {
                this.checkRowIds = [];
                this.checkRowImgs = [];
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for(var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.id + "\"");
                    var imgArrays = row.avatar.split("/");
                    this.checkRowImgs.push(imgArrays[imgArrays.length - 1]);
                }
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest();
                }).catch(() => {
                });
            },
            deleteRow(index, row) {
                this.checkRowIds = [];
                this.checkRowImgs = [];
                this.checkRowIds.push("\"" + row.id + "\"");
                var imgArrays = row.avatar.split("/");
                this.checkRowImgs.push(imgArrays[imgArrays.length - 1]);
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest();
                }).catch(() => {
                });
            },
            async deleteRequest() {
                let params = new FormData()
                params.append("ids", this.checkRowIds.toString());
                params.append("imgs", this.checkRowImgs);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_user_delete, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg(data.msg, "success");
                    this.search(this.currentPage, this.pageSize);
                    return true;
                }
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
            tableExpand(row) {
                this.totalAcCount = row.comments.length;
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
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("status", this.searchform.status);
                params.append("name",  this.searchform.name.trim());
                params.append("phone",  this.searchform.phone.trim());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_teacher_list, params, "POST");
                if (data.code === 200) {
                    console.log(data);
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            statusFormat(row, column) {
                const value = row[column.property];
                return this.statusFormatMethod(value);
            },
            statusFormatMethod(value) {
                switch (value) {
                    case "active":
                        return "在职";
                    case "lock":
                        return "离职";
                    case "freeze":
                        return "离职";
                    case "expired":
                        return "离职";
                    default :
                        return value;
                }
            },

            reseta() {
                this.searchform = {
                    name: "",
                    status: "",
                    phone: "",
                };
                this.search(this.currentPage, this.pageSize);
            },
        },
        data() {
            return {
                searchform: {
                    name: "",
                    status: "",
                    phone: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                checkRowImgs: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
                totalAcCount: 0,
                acPageSize: 10,
                acCurrentPage: 0,
                areaOptions: [],

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