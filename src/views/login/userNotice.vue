<template>
	<!--eslint-disable-->
	<div>
		<el-dialog class="notice-dialog aiocw-dialog"
		           title="用户须知"
		           :visible.sync="dialogVisible"
		           :append-to-body="true"
		           width="800px"
		           :before-close="close"
					top="12vh"
		>
			<UseRule></UseRule>
			<span slot="footer" class="tc">
		        <el-button @click="dialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<!--eslint-disable-->
<script>
    import UseRule from "@/views/observationData/useRule.vue"

    export default {
        name: "userNotice",
        components: {
            UseRule
        },
        data() {
            return {
                dialogVisible: false,
            }
        },
        mounted() {

        },
        methods: {
            open() {
                this.dialogVisible = true;
            },

            close() {
                this.dialogVisible = false;
            },
        }
    }
</script>

<style scoped>

</style>

<style>
	.notice-dialog .el-dialog__body {
		padding: 20px !important;
	}

	.notice-dialog .el-dialog__header {
		padding: 20px 20px 10px !important;
	}
	.notice-dialog .el-dialog {
		overflow: hidden;
		margin-top: 12vh !important;
	}
</style>