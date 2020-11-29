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

                <el-form-item label="注册用户" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入注册用户姓名"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-form-item label="状态" prop="name">
                    <el-select v-model="searchform.status" placeholder="请选择状态">
                        <el-option label="未使用" value="0"></el-option>
                        <el-option label="已使用" value="1"></el-option>
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
                                :src="scope.row.photo"
                                fit="fit"
                                :preview-src-list="scope.row.srcList"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="sex" label="性别" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="idCard" label="身份证" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="phone" label="联系方式" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="age" label="年龄" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="status" label="状态" :show-overflow-tooltip="true"></el-table-column>
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
                                        <span>联系方式</span>
                                        <span>{{ props.row.phone }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>状态</span>
                                        <span>{{ props.row.status }}</span>
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
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        </el-card>
        <Add ref="addRef"></Add>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/console/registrationCode/add";
    export default {
        name: "index",
        components: {Pagination, Add},
        mounted() {
            this.search(0, 10);
        },
        methods: {
            add() {
                this.$refs.addRef.open();
            },
            deletea() {
                for(var j in this.checkRows) {
                    var ele = this.checkRows[j];
                    if(ele.status == "1") {
                        this.$promptMsg("已注册的注册码不能够删除", "error");
                        return;
                    }
                }
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for(var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.id + "\"");
                }
                this.checkRowIds.push("\"" + row.id + "\"");
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
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
                    var uuidObj = {
                        id: i+1,
                        name: "郭嘉",
                        sex: "男",
                        idCard: "210448196602231235",
                        birth: "1988-06-15",
                        age: "33",
                        address: "安徽省合肥市包河区",
                        phone: "13588400659",
                        status: "在职",
                        photo: require("@/assets/img/guojia.jpg"),
                        srcList: [
                            require("@/assets/img/guojia.jpg"),
                        ],
                        comments: [
                            {id: i+1, content: "老师上课很精彩，老师上课很精彩，老师上课很精彩，", author: "夏侯惇", createTime: "2020-11-20 10:00:00",},
                            {id: i+1, content: "老师上课很精彩，老师上课很精彩，老师上课很精彩，", author: "夏侯惇", createTime: "2020-11-20 10:00:00",},
                            {id: i+1, content: "老师上课很精彩，老师上课很精彩，老师上课很精彩，", author: "夏侯惇", createTime: "2020-11-20 10:00:00",},
                            {id: i+1, content: "老师上课很精彩，老师上课很精彩，老师上课很精彩，", author: "夏侯惇", createTime: "2020-11-20 10:00:00",},
                            {id: i+1, content: "老师上课很精彩，老师上课很精彩，老师上课很精彩，", author: "夏侯惇", createTime: "2020-11-20 10:00:00",},
                            {id: i+1, content: "老师上课很精彩，老师上课很精彩，老师上课很精彩，", author: "夏侯惇", createTime: "2020-11-20 10:00:00",},
                            {id: i+1, content: "老师上课很精彩，老师上课很精彩，老师上课很精彩，", author: "夏侯惇", createTime: "2020-11-20 10:00:00",},
                            {id: i+1, content: "老师上课很精彩，老师上课很精彩，老师上课很精彩，", author: "夏侯惇", createTime: "2020-11-20 10:00:00",},
                            {id: i+1, content: "老师上课很精彩，老师上课很精彩，老师上课很精彩，", author: "夏侯惇", createTime: "2020-11-20 10:00:00",},
                            {id: i+1, content: "老师上课很精彩，老师上课很精彩，老师上课很精彩，", author: "夏侯惇", createTime: "2020-11-20 10:00:00",},
                        ]
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
                    name: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
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