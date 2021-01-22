<template>
	<!--eslint-disable-->
	<div>
		<el-dialog
				class="aiocw-dialog"
				title="设置学期"
				:visible.sync="dialogVisible"
				:close-on-click-modal="false"
				:before-close="close"
				:fullscreen="false"
				width="1200px"
				center>
			<el-card class="auto-card">
				<el-form
						class= "pl-100"
						ref="form"
						:model="form"
						:rules="rules"
						:validate-on-rule-change="false"
						label-width="120px"
						label-position="right">
					<div class="dffn">
						<el-form-item label="学期名称" prop="name" required>
							<el-input class="wdi-300" v-model="form.name" placeholder="请输入学期名称"></el-input>
						</el-form-item>

						<el-form-item label="预警值" prop="score" required>
							低于
							<el-input-number v-model="form.score" size="mini" :step="1" :min="0" :max="100" label="限定分数"></el-input-number>
							分以下，将自动静默
						</el-form-item>
					</div>

					<el-form-item label="时间范围" prop="timeRange" required>
						<el-date-picker class="wdi-720"
						                v-model="form.timeRange"
						                type="datetimerange"
						                :picker-options="pickerMOptions"
						                range-separator="至"
						                start-placeholder="开始日期"
						                end-placeholder="结束日期"
						                value-format="yyyy-MM-dd HH:mm:SS"
						                align="right">
						</el-date-picker>
					</el-form-item>

					<el-form-item label="备注" prop="remark">
						<el-input class="wdi-720" v-model="form.remark" placeholder="请输入备注"></el-input>
					</el-form-item>

					<el-row class="fr mt-20 mr-165 mb-20">
						<el-button type="primary" size="mini" @click="onSubmit">增加学期</el-button>
					</el-row>
				</el-form>

				<el-table
						:data="tableData"
						ref="tableRef"
						tooltip-effect="dark"
						border
						stripe
						class="wp-910"
						@selection-change='selectRow'>
					<el-table-column type="selection" width="45" align="center"></el-table-column>
					<el-table-column prop="name" label="学期名称 " align="center" width="200"></el-table-column>
					<el-table-column prop="startTime" label="时间范围" align="center">
						<template slot-scope="scope">
							{{scope.row.startTime}} - {{scope.row.endTime}}
						</template>
					</el-table-column>
					<el-table-column prop="score" label="预警分数" align="center" width="80"></el-table-column>
					<el-table-column prop="status" label="状态" align="center" width="80">
						<template slot-scope="scope">
							{{fmtStatus(scope.row.status)}}
						</template>
					</el-table-column>
					<el-table-column prop="remark" label="备注" align="center" width="150"></el-table-column>
					<el-table-column label="操作"  fixed="right" width="100">
						<template slot-scope="scope">
							<el-button v-if="scope.row.status == '2'"
									size="mini"
									type="danger"
									@click="deleteRow(scope.row)">删除</el-button>
						</template>
					</el-table-column>

				</el-table>
			</el-card>

			<span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">取 消</el-button>
            </span>
		</el-dialog>
	</div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "semester",
	    mounted() {
			this.search();
	    },
	    methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
                this.clearForm();
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },
            clearForm() {
                this.form = {
                    name: "",
                    startTime: "",
                    endTime: "",
                    remark: "",
                    status: "",
                    score: 0,
                    timeRange: [],
                };
            },

            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                this.form.startTime = this.form.timeRange[0];
                this.form.endTime = this.form.timeRange[1];
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_semester_add, this.form, "POST");
                if(data.code == 200) {
                    this.$notify({
                        title: '提示',
                        message: "增加成功",
                    });
                    this.search();
                }
            },

            async search() {
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_semester_list, {}, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    return true;
                }
            },

            deleteRow(row) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest(row);
                }).catch(() => {
                });
            },
            async deleteRequest(row) {
                let params = new FormData()
                params.append("id", row.id);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_semester_delete, params, "POST");
                if (data.code === 200) {
                    this.$notify({
                        title: '提示',
                        message: "删除成功",
                    });
                    this.search();
                    return true;
                }
            },

            fmtStatus(status) {
                switch (status) {
                    case "0":
                        return "进行中";
                    case "1":
                        return "结束";
                    case "2":
                        return "未开始";
                    default:
                        return status;
                }
            },

        },
	    data() {
            return {
                dialogVisible: false,
                tableData: [],
                form: {
                    name: "",
                    startTime: "",
                    endTime: "",
                    remark: "",
                    status: "",
                    score: 0,
                    timeRange: [],
                },
                rules: {
                    name: [
                        {type: 'string', required: true, message: '请输入学期名称', trigger: ['change', 'blur']},
                    ],
                    score: [
                        {type: 'number', required: true, message: '请输入分数预警值', trigger: ['change', 'blur']},
                    ],
                    timeRange: [
                        {type: 'array', required: true, message: '请输入学期范围', trigger: ['change', 'blur']},
                    ],
                }
            }
	    }
    }
</script>

<style scoped>

</style>