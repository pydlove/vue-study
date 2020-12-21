<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="绑定证书"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
            <el-card>
                <el-form class="aiocw-form mt-20"
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

                    <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                    <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
                </el-form>

                <el-table
                        border
                        ref="codeTable"
                        :data="tableData"
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                >
                    <el-table-column prop="img" label="证书图片" width="122px" align="center">
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
                    <el-table-column prop="blUserName" label="授予人" :show-overflow-tooltip="true" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" fixed="right">
                        <template slot-scope="scope">
                            <el-tag :type="isNull(scope.row.blUserId) ? 'info':'success'" effect="dark">
                                {{ isNull(scope.row.blUserId)  ? '未绑定':'已绑定' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button v-if=" isNull(scope.row.blUserId)"
                                       class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       type="info"
                                       @click="bindCaRow(scope.row)">绑定证书</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination class="mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>

            <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120"  @click="close">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    export default {
        name: "certificate",
        components: {Pagination},
        mounted() {
        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },

            isNull(value) {
                return (value == '' || value == null || value == undefined);
            },

            bindCaRow(row) {
                this.$confirm('确定将证书授予' + this.student.name + '?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.certificate = row;
                    this.bindCaRequest();
                }).catch(() => {
                });
            },
            async bindCaRequest() {
                this.certificate.blUserId = this.student.id;
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_certificate_edit, this.certificate, "POST");
                if(data.code == 200) {
                    this.$promptMsg("绑定证书成功", "success");
                    this.search(this.acCurrentPage, this.acPageSize);
                }
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("name",  this.searchform.name.trim());
                params.append("uuid",  this.searchform.uuid.trim());
                params.append("studentId",  this.student.id);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_certificate_student_bind_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            reseta() {
                this.searchform = {
                    name: "",
                    uuid: "",
                };
                this.search(this.currentPage, this.pageSize)
            },

            setUser(student) {
                this.student = student;
            },
        },
        data() {
            return {
                dialogVisible: false,
                searchform: {
                    name: "",
                    uuid: "",
                },
                student:"",
                tableData: [],
                pageSize: 10,
                currentPage: 0,
                certificate: "",
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