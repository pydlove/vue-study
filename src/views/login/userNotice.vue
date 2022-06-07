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
			<div>
				<div v-if="language == 'zh'" v-html="userNotice.chContent"></div>
				<div v-if="language == 'en'" v-html="userNotice.enContent"></div>
			</div>
			<span slot="footer" class="tc">
		        <el-button @click="dialogVisible = false">关 闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "userNotice",
        data() {
            return {
                dialogVisible: false,
                userNotice: "",
                language: "zh",
            }
        },
        mounted() {
        },
        methods: {
            open() {
                this.dialogVisible = true;
                this.initLanguage();
                this.searchData();
            },

            close() {
                this.dialogVisible = false;
            },

            initLanguage() {
                console.log( this.language)
                this.language = this.$i18n.locale;
            },

            async searchData() {
                let params = new FormData();
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_web_user_notice, params, "POST");
                if (data.code == 200) {
                    this.userNotice = data.data;
                    console.log(this.userNotice)
                    return true;
                }
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