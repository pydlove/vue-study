<template>
	<!--eslint-disable-->
	<div>
		<el-dialog class="aiocw-dialog"
		           title="我的申请"
		           :visible.sync="dialogVisible"
		           width="700px"
		           :close-on-click-modal="false"
		           :before-close="close"
		           top="30vh"
		>

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
                tableData: [],
                searchform: {
                    name: "",
                    status: "",
                    phone: "",
                },
                pageSize: 10,
                totalAcCount: 0,
            }
        },
        mounted() {
			this.search(1, 10);
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

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("status", this.searchform.status);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_web_application_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
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