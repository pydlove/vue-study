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

                <el-form-item label="学员姓名" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入用户姓名"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-form-item label="状态" prop="name">
                    <el-select v-model="searchform.status" placeholder="请选择状态">
                        <el-option label="活跃" value="0"></el-option>
                        <el-option label="静默" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
                <el-button v-aiocp="['ses']" type="primary" icon="el-icon-video-pause" size="small"  @click="setSemester()">学期设置</el-button>
            </div>

            <el-table
                    :class="bgClass == 'aiocw' ? '':'aioc-table'"
                    :border="bgClass == 'aiocw'"
                    ref="tableRef"
                    :data="tableData"
                    @selection-change='onTableSelectChange'
                    @row-click='tableRowClick'
                    @cell-dblclick='seeDetail'
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'9px 1px'}"
            >
                <el-table-column fixed="left" type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="img" label="照片" width="120px" align="center">
                    <template slot-scope="scope">
                        <el-image
                                :style="'width:' + photoWidth + 'px;height:' + photoHeight + 'px;'"
                                :src="scope.row.photo"
                                fit="fit"
                                :preview-src-list="[scope.row.photo]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" :show-overflow-tooltip="true" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.sex == "0" ? "男":"女" }}
                    </template>
                </el-table-column>
                <el-table-column prop="idcard" label="身份证" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="phone" label="联系方式" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="地址" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.province }}{{ scope.row.city }}{{ scope.row.county }}({{ scope.row.address }})
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄" :show-overflow-tooltip="true" align="center"></el-table-column>
                <el-table-column prop="score" label="本学期学分" :show-overflow-tooltip="true" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.score == null ? 0:scope.row.score }}
                    </template>
                </el-table-column>
                <el-table-column prop="lastScore" label="上学期学分" :show-overflow-tooltip="true" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.lastScore == null ? 0:scope.row.lastScore }}
                    </template>
                </el-table-column>
                <el-table-column prop="standardScore" label="上学期预警分数" :show-overflow-tooltip="true" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == '0' ? 'success':'info'" effect="dark">
                            {{ scope.row.status == '0' ? '活跃':'静默' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button
                                   size="mini"
                                   type="success"
                                   @click="seeDetail(scope.row)">查看详情</el-button>
                        <el-button class="aioc-btn1"
                                   v-aiocp="['bc']"
                                   size="mini"
                                   type="info"
                                   @click="setCertificate(scope.row)">绑定证书</el-button>
                        <el-button v-if="scope.row.status == '0'"
                                   v-aiocp="['si']"
                                   size="mini"
                                   type="info"
                                   @click="setDisableRow(scope.row)">静默TA</el-button>
                        <el-button v-else-if="scope.row.status == '1'"
                                v-aiocp="['ac']"
                                size="mini"
                                type="success"
                                @click="setAbleRow(scope.row)">激活</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>
        </el-card>
        <Certificate ref="certificateRef"></Certificate>
        <AutoDisable ref="autoDisableRef"></AutoDisable>
        <Detail ref="detailRef"></Detail>
        <Semester ref="semesterRef"></Semester>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Certificate from '@/views/console/student/certificate'
    import AutoDisable from '@/views/console/student/autoDisable'
    import Detail from '@/views/console/student/detail'
    import Semester from '@/views/console/student/semester'
    export default {
        name: "index",
        components: {Pagination, Certificate, AutoDisable, Detail, Semester},
        mounted() {
            this.area = this.$utils.getStorage("area");
            this.search(0, 10);
        },
        methods: {
            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                if(this.area != null && this.area != "" && this.area != undefined) {
                    if(this.area.length == 1) {
                        params.append("province", this.area[0]);
                    }
                    if(this.area.length == 2) {
                        params.append("province", this.area[0]);
                        params.append("city", this.area[1]);
                    }
                    if(this.area.length == 3) {
                        params.append("province", this.area[0]);
                        params.append("city", this.area[1]);
                        params.append("county", this.area[2]);
                    }
                } else {
                    params.append("province", "安徽省");
                }
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("name",  this.searchform.name.trim());
                params.append("phone",  this.searchform.phone.trim());
                params.append("status",  this.searchform.status.trim());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_user_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            reseta() {
                this.searchform = {
                    name: "",
                    phone: "",
                    status: "",
                    area: "",
                };
                this.search(this.currentPage, this.pageSize)
            },

            seeDetail(row) {
                this.$refs.detailRef.student = row;
                this.$refs.detailRef.open();
            },

            setCertificate(row) {
                this.$refs.certificateRef.open();
                this.$refs.certificateRef.setUser(row);
                this.$refs.certificateRef.search(0, 10);
            },

            setDisableRow(row) {
                this.$confirm('静默后将不能使用系统，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checkRowIds = [];
                    this.checkRowIds.push("\"" + row.id + "\"");
                    this.setDisableRequest();
                }).catch(() => {
                });
            },
            setDisable() {
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                this.$confirm('静默后将不能使用系统，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checkRowIds = [];
                    for(var i in this.checkRows) {
                        var row = this.checkRows[i];
                        this.checkRowIds.push("\"" + row.id + "\"");
                    }
                    this.setDisableRequest();
                }).catch(() => {
                });
            },
            async setDisableRequest() {
                let params = new FormData()
                params.append("ids", this.checkRowIds.toString());
                params.append("status", "1");
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_user_setStatus, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg("静默成功", "success");
                    this.search(this.currentPage, this.pageSize);
                    return true;
                }
            },

            setAbleRow(row) {
                this.$confirm('激活后将正常使用系统，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checkRowIds = [];
                    this.checkRowIds.push("\"" + row.id + "\"");
                    this.setAbleRequest();
                }).catch(() => {
                });
            },
            async setAbleRequest() {
                let params = new FormData()
                params.append("ids", this.checkRowIds.toString());
                params.append("status", "0");
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_user_setStatus, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg("激活成功", "success");
                    this.search(this.currentPage, this.pageSize);
                    return true;
                }
            },

            setSemester() {
                this.$refs.semesterRef.open();
            },

            /**
             * 分页方法
             */
            tableRowClick(row) {
                this.$refs.tableRef.toggleRowSelection(row);
            },
            onTableSelectChange(rows) {
                this.checkRows = rows;
            },
            toggleSelection() {
                this.$refs.tableRef.clearSelection();
            },

        },
        data() {
            return {
                bgClass: "aiocw",
                clientHeight: document.body.clientHeight-2,
                searchform: {
                    name: "",
                    phone: "",
                    status: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                currentPage: 0,
                pageSize: 10,
                photoWidth: 80,
                photoHeight: 80,
                area: [],
            }
        },
    }
</script>

<style scoped>
</style>

<style>
</style>