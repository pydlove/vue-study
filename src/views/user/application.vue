<template>
	<!--eslint-disable-->
	<div>
		<el-dialog class="aiocw-dialog"
		           title="下载申请"
		           :visible.sync="dialogVisible"
		           width="700px"
		           :close-on-click-modal="false"
		           :before-close="close"
		           top="30vh"
		>
			<el-form class="down-form"
			         ref="form"
			         :model="form"
			         :rules="rules"
			         :validate-on-rule-change="false"
			         label-width="120px"
			         label-position="top">
				<el-form-item label="">
					<el-input class="wdi-600 textarea" :autosize="{ minRows: 6, maxRows: 8}"
					          type="textarea" v-model="form.content"
					          placeholder="请填写备注（选填）"
					>
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
              <el-button class="mr-38" type="primary" @click="onSubmit">提 交</el-button>
            </span>
		</el-dialog>
	</div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "application",
        data() {
            return {
                dialogVisible: false,
                form: {
                    content: '',
	                dataId: '',
	                logId: '',
                    tradeNo: '',
                },
                rules: {
                },
            }
        },
        mounted() {

        },
        methods: {
            open(dataId, logId) {
                this.dialogVisible = true;
                this.form.logId = logId;
                this.form.dataId = dataId;
            },

            close() {
                this.dialogVisible = false;
            },


            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$confirm('确定申请下载数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submitRequest();
                        }).catch(() => {
                        });
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                this.form.tradeNo = this.$utils.random_No(6);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_web_application_add, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg("下载申请已经提交，请到我的申请处查看进度！", "success");
                    this.dialogVisible = false;
                    this.clearForm();
                }
            },

            clearForm() {
                this.form = {
                    remark: '',
                };
            },
        }
    }
</script>

<style scoped>
	.down-form {
		text-align: center;
		font-family: 微软雅黑 !important;
		color: #333333 !important;
	}
</style>

<style>
</style>