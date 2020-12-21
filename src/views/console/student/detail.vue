<template>
	<!--eslint-disable-->
	<div>
		<el-dialog
				class="aiocw-dialog"
				title="学生详情"
				:visible.sync="dialogVisible"
				:close-on-click-modal="false"
				:before-close="close"
				:fullscreen="false"
				width="1200px"
				center>
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
							<span>{{ student.name }}</span>
						</div>
						<div class="xx-lable">
							<span>性 <span class="ml-28"></span> 别</span>
							<span> {{ student.sex == "0" ? "男":"女" }} </span>
						</div>
						<div class="xx-lable">
                                            <span>
                                                身<span class="ml-5"></span>
                                                份<span class="ml-5"></span>
                                                证
                                            </span>
							<span>{{ student.idcard }}</span>
						</div>
						<div class="xx-lable">
							<span>出生年月</span>
							<span>{{ student.birth }}</span>
						</div>
						<div class="xx-lable">
							<span>地 <span class="ml-28"></span> 址</span>
							<span>
                                {{ student.province }}{{ student.city }}{{ student.county }}({{ student.address }})
                            </span>
						</div>
						<div class="xx-lable">
							<span>电话号码</span>
							<span>{{ student.phone }}</span>
						</div>
						<div class="xx-lable">
							<span>学 <span class="ml-28"></span> 分</span>
							<span>{{student.score}} 分</span>
						</div>
						<div class="xx-lable">
							<span>状 <span class="ml-28"></span> 态</span>
							<el-tag class="wd-80 tc colori-ffffff" :type="student.status == '0' ? 'success':'info'" effect="dark">
								{{ student.status == '0' ? '活跃':'静默' }}
							</el-tag>
						</div>
					</div>


					<div class="ml-50 wp-50">
						<el-form-item label="备注">
							<el-input
									disabled
									class="textarea xx-text"
									type="textarea"
									:autosize="{ minRows: 16, maxRows: 18}"
									placeholder="暂无评语"
									maxlength="3000"
									show-word-limit
									v-model="student.remark">
							</el-input>
						</el-form-item>
					</div>
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
								ref="activityTableRef"
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
									<el-tag :type="scope.row.status == 0 ? 'success':'info'" class="fb" effect="dark">
										{{fmtActivityStatus(scope.row.status)}}
									</el-tag>
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

			<span slot="footer" class="dialog-footer">
              <el-button class="wdi-120"  @click="close">取 消</el-button>
            </span>
		</el-dialog>
	</div>
</template>

<script>
    export default {
        name: "detail",
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
                this.searchActivity(0, 10);
                this.searchClass(0, 10);
            },

            async searchActivity(currentPage, pageSize) {
                this.acCurrentPage = currentPage;
                this.acPageSize = pageSize;
                let params = new FormData()
                params.append("page", this.acCurrentPage);
                params.append("limit", this.acPageSize);
                params.append("studentId", this.student.id);
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
                params.append("studentId", this.student.id);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_class_student_list, params, "POST");
                if (data.code === 200) {
                    this.classes = data.data;
                    this.totalClCount = data.totalCount;
                    return true;
                }
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

            fmtActivityStatus(status) {
                switch (status) {
                    case "0":
                        return "报名中";
                    case "1":
                        return "未发布";
                    case "2":
                        return "进行中";
                    case "3":
                        return "已结束";
                    default:
                        return status;
                }
            },
        },
        data() {
            return {
                dialogVisible: false,
                student: {

                },
                activities: [],
                totalAcCount: 0,
                acPageSize: 10,
                acCurrentPage: 0,

                classes: [],
                totalClCount: 0,
                clPageSize: 10,
                clCurrentPage: 0,
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