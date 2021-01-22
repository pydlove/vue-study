<template>
	<!--eslint-disable-->
	<div>
		<el-dialog
				class="aiocw-dialog"
				title="教师详情"
				:visible.sync="dialogVisible"
				:close-on-click-modal="false"
				:before-close="close"
				:fullscreen="false"
				width="1200px"
				center>
			<el-form label-position="left" class="demo-table-expand">
				<div class="mp-top">
					<el-divider content-position="left">
						教师信息
					</el-divider>
				</div>
				<div class="dffn">
					<div class="wdi-400 ml-35">
						<div class="xx-lable">
							<span>姓 <span class="ml-28"></span> 名</span>
							<span>{{ teacher.name }}</span>
						</div>
						<div class="xx-lable">
							<span>性 <span class="ml-28"></span> 别</span>
							<span>{{ teacher.sex == "0" ? "男":"女" }}</span>
						</div>
						<div class="xx-lable">
                                                <span>
                                                    身<span class="ml-5"></span>
                                                    份<span class="ml-5"></span>
                                                    证
                                                </span>
							<span>{{ teacher.idCard }}</span>
						</div>
						<div class="xx-lable">
							<span>出生年月</span>
							<span>{{ teacher.birthtime }}</span>
						</div>
						<div class="xx-lable">
							<span>地 <span class="ml-28"></span> 址</span>
							<span> {{ teacher.province }}{{ teacher.city }}{{ teacher.county }}({{ teacher.address }})</span>
						</div>
						<div class="xx-lable">
							<span>联系方式</span>
							<span>{{ teacher.phone }}</span>
						</div>
						<div class="xx-lable">
							<span>状态</span>
							<span>{{ statusFormatMethod(teacher.status) }}</span>
						</div>
					</div>
					<div>
						<el-image
								style="width: 200px;height:200px;"
								:src="teacher.avatar"
								fit="fit"
								:preview-src-list="[teacher.avatar]"
						></el-image>
					</div>
				</div>

				<div class="mp-top">
					<el-divider content-position="left">
						教师评价
					</el-divider>
				</div>
				<div class="xx-lable">
					<el-card>
						<el-table
								class="aiocw-table"
								ref="activityTableRef"
								:data="comments"
								@selection-change='onTableSelectChange'
								@row-click='tableRowClick'
								:row-style="{height:'20px'}"
								:cell-style="{padding:'9px 1px'}"
						>
							<el-table-column prop="content" label="评价内容" :show-overflow-tooltip="true"></el-table-column>
							<el-table-column prop="teacherStar" label="老师评分" :show-overflow-tooltip="true">
								<template slot-scope="scope">
									<el-rate v-model="scope.row.teacherStar" :colors="colors"></el-rate>
								</template>
							</el-table-column>
							<el-table-column prop="classStar" label="课程评分" :show-overflow-tooltip="true">
								<template slot-scope="scope">
									<el-rate v-model="scope.row.classStar" :colors="colors"></el-rate>
								</template>
							</el-table-column>
							<el-table-column prop="className" label="班级名称" width="100" :show-overflow-tooltip="true"></el-table-column>
							<el-table-column prop="studentName" label="评论人" width="100" :show-overflow-tooltip="true"></el-table-column>
							<el-table-column prop="createTime" label="评价时间" width="160" :show-overflow-tooltip="true"></el-table-column>
						</el-table>
						<Pagination class="mt-20" ref="pageRef" @search="initComment"></Pagination>
					</el-card>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Pagination from "@/components/Pagination";
    export default {
        name: "detail",
	    components: {Pagination},
        mounted() {
        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
                this.initComment(0, 10);
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

            async initComment(currentPage, pageSize) {
                this.coCurrentPage = currentPage;
                this.coPageSize = pageSize;
                let params = new FormData()
                params.append("page", this.coCurrentPage);
                params.append("limit", this.coPageSize);
                params.append("teacherId", this.teacher.id);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_teacher_comment_list, params, "POST");
                if (data.code === 200) {
                    this.comments = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },
        },
        data() {
            return {
                dialogVisible: false,
                teacher: {},
                comments: [],
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
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