<template>
	<!--eslint-disable-->
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="课程学生管理"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
            <el-form class="aiocw-form mt-20"
                     ref="searchform"
                     :model="searchform"
                     :inline="true"
                     :validate-on-rule-change="false"
                     label-width="80px"
                     label-position="right">

                <el-form-item label="学员名称" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入学员名称"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-button class="ml-20 aiocw-btn1" type="primary" size="small" icon="el-icon-search" @click="initStudentList(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
            </div>

            <el-table
                    class="student"
                    ref="table"
                    :data="tableData"
                    @selection-change='onTableSelectChange'
                    @row-click='tableRowClick'
                    @expand-change='tableExpand'
                    border
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'9px 1px'}"
            >
                <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                <el-table-column prop="img" label="照片" width="121px" align="center">
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
	                <template slot-scope="props">
		                {{ props.row.sex == "0" ? "男":"女" }}
	                </template>
                </el-table-column>
                <el-table-column prop="idcard" label="身份证" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="phone" label="联系方式" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
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
                        <el-tag class=" tc" :type="scope.row.status == '0' ? 'success':'info'" effect="dark">
                            {{ scope.row.status == '0' ? '活跃':'静默' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button class="pd-10" type="text" @click="expand(scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column type="expand" width="1">
                    <template slot-scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <div class="mp-top">
                                <el-divider content-position="left">
                                    学籍信息
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
                                        <span> {{ props.row.sex == "0" ? "男":"女" }} </span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>
                                            身<span class="ml-5"></span>
                                            份<span class="ml-5"></span>
                                            证
                                        </span>
                                        <span>{{ props.row.idcard }}</span>
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
                                        <span>本学期学分</span>
                                        <el-input-number v-model="score" controls-position="right" :min="oldScore - addScore" :max="oldScore - addScore + 3" size="mini"></el-input-number>
                                        <div class="color-fa5c26 fs-13">可手动增加3个学分，已经增加 <span class="fs-15 fb">{{Number(score) - Number(oldScore) + Number(addScore)}}</span> 分</div>
                                    </div>
                                    <div class="xx-lable">
                                        <span>上学期学分</span>
                                        <span>{{props.row.lastScore}} 分</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>上学期预警学分</span>
                                        <span>{{props.row.standardScore}} 分</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>状 <span class="ml-28"></span> 态</span>
                                        <span class="fb" :style="{color: props.row.status == '0' ? '#67C23A':'#606266'}">
                                            {{ props.row.status == '0' ? '活跃':'静默' }}
                                        </span>
                                    </div>
                                </div>

                                <div class="ml-20">
                                    <el-form-item label="备注">
                                        <el-input
                                                class="textarea wdi-460"
                                                type="textarea"
                                                :autosize="{ minRows: 16, maxRows: 18}"
                                                placeholder="请输入内容"
                                                maxlength="3000"
                                                show-word-limit
                                                v-model="remark">
                                        </el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div>
                                <el-button class="ml-20 wdi-120 aioc-btn1" type="primary" size="small" @click="submit" :disabled="inSubmit">提交</el-button>
                                <span class="ml-10 color-fa5c26">修改了学分和备注记得点击提交！</span>
                            </div>

                            <div class="mp-top mti-40">
                                <el-divider content-position="left">
                                    购买学习用品
                                </el-divider>
                            </div>
                            <div class="xx-lable">
                                <el-card>
                                    <el-table
                                            class="aiocw-table"
                                            ref="commodityTableRef"
                                            :data="commodities"
                                            :row-style="{height:'20px'}"
                                            :cell-style="{padding:'9px 1px'}"
                                    >
                                        <el-table-column prop="name" label="学习用品名称" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="num" label="购买数量" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="unitPrice" label="单价（¥）" :show-overflow-tooltip="true"></el-table-column>
                                    </el-table>
                                    <el-pagination
                                            background
                                            class="mt-10 pb-10 pt-20"
                                            @size-change="coHandleSizeChange"
                                            @current-change="coHandleCurrentChange"
                                            :current-page="coCurrentPage"
                                            :page-sizes="[10]"
                                            :page-size="coPageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="totalCoCount">
                                    </el-pagination>
                                </el-card>
                            </div>

                            <div class="mp-top mti-40">
                                <el-divider content-position="left">
                                    班级信息
                                </el-divider>
                            </div>
                            <div class="xx-lable">
                                <el-card>
                                    <el-table
                                            class="aiocw-table"
                                            ref="classTableRef"
                                            :data="classes"
                                            :row-style="{height:'20px'}"
                                            :cell-style="{padding:'9px 1px'}"
                                    >
                                        <el-table-column fixed="left" prop="name" label="班级名称" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="teacherName" label="老师" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="mainName" label="课程大类" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="subName" label="课程小类" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
                                    </el-table>
                                    <el-pagination
                                            background
                                            class="mt-10 pb-10 pt-20"
                                            @size-change="clHandleSizeChange"
                                            @current-change="clHandleCurrentChange"
                                            :current-page="clCurrentPage"
                                            :page-sizes="[10]"
                                            :page-size="clPageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="totalClCount">
                                    </el-pagination>
                                </el-card>
                            </div>

                            <div class="mp-top mti-40">
                                <el-divider content-position="left">
                                    参加活动信息
                                </el-divider>
                            </div>
                            <div class="xx-lable">
                                <el-card>
                                    <el-table
                                            class="aiocw-table"
                                            ref="activityTableRef"
                                            :data="activities"
                                            :row-style="{height:'20px'}"
                                            :cell-style="{padding:'9px 1px'}"
                                    >
                                        <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="time" label="活动时间" :show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                {{scope.row.startTime}} - {{scope.row.endTime}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="address" label="活动地点" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="teachers" label="负责老师" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="peopleLimit" label="活动总人数" show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="score" label="累计学分" show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="signupStart" label="报名开始时间" show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="signupEnd" label="报名结束时间" show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="teachers" label="负责人" show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="status" label="活动状态" show-overflow-tooltip="true">
                                            <template slot-scope="scope">
                                                {{fmtActivityStatus(scope.row.status)}}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination
                                            background
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
            <el-pagination
                    class="mt-10 pb-10 pt-20"
                    @size-change="stHandleSizeChange"
                    @current-change="stHandleCurrentChange"
                    :current-page="stCurrentPage"
                    :page-sizes="[10]"
                    :page-size="stPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalStCount">
            </el-pagination>
        </el-dialog>
    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "student",
        components: {},
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },

            async submit() {
                this.inSubmit = true;
                let params = new FormData()
	            if(this.scoreId == "") {
                    params.append("addScoreType", "add");
                    params.append("classId", this.classId);
	            } else {
                    params.append("addScoreType", "update");
                    params.append("scoreId", this.scoreId);
	            }
                params.append("score",  Number(this.score) - Number(this.oldScore) + Number(this.addScore));
                params.append("studentId", this.studentId);
                params.append("remark", this.remark);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_user_score_remark_update, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg("提交成功", "success");
                    this.initStudentList(this.stCurrentPage, this.stPageSize);
                }
                this.inSubmit = false;
            },

            /**
             * 分页方法
             */
            stHandleSizeChange(val) {
                this.stPageSize = val;
                this.stCurrentPage = 1;
                this.initStudentList(this.stCurrentPage, this.stPageSize);
            },
            stHandleCurrentChange(val) {
                this.stCurrentPage = val;
                this.initStudentList(this.stCurrentPage, this.stPageSize);
            },
            acHandleSizeChange(val) {
                this.acPageSize = val;
                this.acCurrentPage = 1;
                this.searchActivity(this.acCurrentPage, this.acPageSize);
            },
            acHandleCurrentChange(val) {
                this.acCurrentPage = val;
                this.searchActivity(this.acCurrentPage, this.acPageSize);
            },
            clHandleSizeChange(val) {
                this.clPageSize = val;
                this.clCurrentPage = 1;
                this.searchClass(this.clCurrentPage, this.clPageSize);
            },
            clHandleCurrentChange(val) {
                this.clCurrentPage = val;
                this.searchClass(this.clCurrentPage, this.clPageSize);
            },
            coHandleSizeChange(val) {
                this.coPageSize = val;
                this.coCurrentPage = 1;
                this.searchCommodity(this.coCurrentPage, this.coPageSize);
            },
            coHandleCurrentChange(val) {
                this.coCurrentPage = val;
                this.searchCommodity(this.coCurrentPage, this.coPageSize);
            },
            expand(row) {
                let $table = this.$refs.table;
                this.tableData.map((item) => {
                    if (row.id != item.id) {
                        $table.toggleRowExpansion(item, false)
                        item.expansion = false;
                    }
                    else{
                        item.expansion = !item.expansion;
                    }
                });
                $table.toggleRowExpansion(row);
            },
            tableExpand(row) {
                if(row.id != this.studentId) {
                    this.score = row.score == null || row.score == "" ? "0":row.score;
                    this.oldScore = row.score == null || row.score == "" ? "0":row.score;
                    this.studentId = row.id;
                    this.remark = row.remark;
                    this.searchActivity(0, 10);
                    this.searchClass(0, 10);
                    this.searchCommodity(0, 10);
                    this.searchClassStudentScore();
                }
            },

            async searchActivity(currentPage, pageSize) {
                this.acCurrentPage = currentPage;
                this.acPageSize = pageSize;
                let params = new FormData()
                params.append("page", this.acCurrentPage);
                params.append("limit", this.acPageSize);
                params.append("studentId", this.studentId);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_activity_list, params, "POST");
                if (data.code === 200) {
                    this.activities = data.data;
                    this.totalAcCount = data.totalCount;
                    return true;
                }
            },

            async searchClass(currentPage, pageSize) {
                this.clCurrentPage = currentPage;
                this.clPageSize = pageSize;
                let params = new FormData()
                params.append("page", this.clCurrentPage);
                params.append("limit", this.clPageSize);
                params.append("studentId", this.studentId);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_class_student_list, params, "POST");
                if (data.code === 200) {
                    this.classes = data.data;
                    this.totalClCount = data.totalCount;
                    return true;
                }
            },

            async searchCommodity(currentPage, pageSize) {
                this.coCurrentPage = currentPage;
                this.coPageSize = pageSize;
                let params = new FormData()
                params.append("page", this.coCurrentPage);
                params.append("limit", this.coPageSize);
                params.append("studentId", this.studentId);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_commodity_list, params, "POST");
                if (data.code === 200) {
                    this.commodities = data.data;
                    this.totalCoCount = data.totalCount;
                    return true;
                }
            },

            async initStudentList(currentPage, pageSize) {
                this.stCurrentPage = currentPage;
                this.stPageSize = pageSize;
                let params = new FormData()
                params.append("page", this.stCurrentPage);
                params.append("limit", this.stPageSize);
                params.append("name",  this.searchform.name.trim());
                params.append("classId",  this.classId);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_user_class_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.totalStCount = data.totalCount;
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
                this.initStudentList(this.stCurrentPage, this.stPageSize)
            },

            async searchClassStudentScore() {
                let params = new FormData()
                params.append("studentId",  this.studentId);
                params.append("classId",  this.classId);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_score_teacher_set, params, "POST");
                if (data.code === 200) {
	                if(data.data != null && data.data != "" && data.data != undefined) {
                        this.addScore = data.data.score;
                        this.scoreId = data.data.id;
	                } else {
                        this.addScore = "0";
                    }
                    return true;
                }
            },

            fmtActivityStatus(status) {
                switch (status) {
                    case "0":
                        return "已发布";
                    case "1":
                        return "未发布";
                    case "2":
                        return "进行中";
                    case "3":
                        return "已结束";
                    case "4":
                        return "报名中";
                    case "5":
                        return "报名结束";
                    default:
                        return status;
                }
            },
        },
        data() {
            return {
                dialogVisible: false,
                photoWidth: 50,
                photoHeight: 50,
                searchform: {
                    name: "",
                    phone: "",
                    status: "",
                    area: "",
                },
                tableData: [],
                totalStCount: 0,
                stPageSize: 10,
                stCurrentPage: 0,
                activities: [],
                totalAcCount: 0,
                acPageSize: 10,
                acCurrentPage: 0,
                classes: [],
                totalClCount: 0,
                clPageSize: 10,
                clCurrentPage: 0,
                commodities: [],
                totalCoCount: 0,
                coPageSize: 10,
                coCurrentPage: 0,
                studentId: "",
                score: "0",
                oldScore: "0",
                addScore:"0",
                remark: "",
                scoreId: "",
                classId: "",
                inSubmit: false,
            }
        },
    }
</script>

<style scoped>
    .xx-lable > span:nth-of-type(1) {
        display: inline-block;
        width: 120px;
        color: #99a9bf;
    }
    .xx-lable {
        line-height: 40px;
    }
</style>

<style >
    .aiocw-table .el-form-item__label {
        width: 90px;
        color: #99a9bf;
    }
    .student .el-table__expand-column .cell {
        display: none;
    }
</style>