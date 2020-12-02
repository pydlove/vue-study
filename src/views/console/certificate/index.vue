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

                <el-form-item label="证书名称" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入证书名称">
                    </el-input>
                </el-form-item>

                <el-form-item label="证书编号" prop="name">
                    <el-input
                            v-model="searchform.uuid"
                            class="wp-180 mr-10"
                            placeholder="请输入证书编号">
                    </el-input>
                </el-form-item>

                <el-form-item label="获得学生姓名" prop="name">
                    <el-input
                            v-model="searchform.blUserName"
                            class="wp-180 mr-10"
                            placeholder="请输入获得学生姓名">
                    </el-input>
                </el-form-item>

                <el-button class="ml-20 aioc-btn" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
                <el-button class="aioc-btn1" v-aba="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">增加</el-button>
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
                <el-table-column prop="img" label="证书图片" width="122px">
                    <template slot-scope="scope">
                        <el-image
                                style="width: 100px; height: 50px"
                                :src="scope.row.img"
                                fit="fit"
                                :preview-src-list="[scope.row.img]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="uuid" label="序列号" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="name" label="证书名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="unit" label="颁发机构" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="blUserName" label="授予人" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="status" label="状态" fixed="right">
                    <template slot-scope="scope">
                        <el-tag :type="isNull(scope.row.blUserId) ? 'info':'success'" effect="dark">
                            {{ isNull(scope.row.blUserId)  ? '未绑定':'已绑定' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  fixed="right" width="200">
                    <template slot-scope="scope">
                        <div v-if="isNull(scope.row.blUserId)">
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
        <Add ref="addRef" @search="search"></Add>
        <Edit ref="editRef" @search="search" :currentPage="currentPage" :pageSize="pageSize"></Edit>
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
            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("blUserName",  this.searchform.blUserName.trim());
                params.append("name",  this.searchform.name.trim());
                params.append("uuid",  this.searchform.uuid.trim());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_certificate_list, params, "POST");
                if (data.code === 200) {
                    console.log(data.data)
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
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
                    uuid: row.uuid,
                    name: row.name,
                    unit: row.unit,
                    img: row.img,
                    updateTime: row.updateTime,
                    createTime: row.createTime,
                    remark: row.remark,
                    blUserId: row.blUserId,
                };
                var imgArrays = row.img.split("/");
                this.$refs.editRef.originalFileName = imgArrays[imgArrays.length - 1];
                this.$refs.editRef.fileName = imgArrays[imgArrays.length - 1];
                this.$refs.editRef.fileList = [{name: "", url: row.img}];
                this.$refs.editRef.open();
            },

            /**
             * 批量删除
             * 单行删除
             * 删除请求
             */
            deletea() {
                this.checkRowIds = [];
                this.checkRowImgs = [];
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for(var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.uuid + "\"");
                    var imgArrays = row.img.split("/");
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
                this.checkRowIds.push("\"" + row.uuid + "\"");
                var imgArrays = row.img.split("/");
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
                params.append("uuids", this.checkRowIds.toString());
                params.append("imgs", this.checkRowImgs);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_certificate_delete, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg("删除证书成功", "success");
                    this.search(this.currentPage, this.pageSize);
                    return true;
                }
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
                    blUserName: "",
                    name: "",
                    uuid: "",
                };
                this.search(this.currentPage, this.pageSize)
            },

            isNull(value) {
                return (value == '' || value == null || value == undefined);
            },
        },
        data() {
            return {
                searchform: {
                    blUserName: "",
                    name: "",
                    uuid: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                checkRowImgs: [],
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