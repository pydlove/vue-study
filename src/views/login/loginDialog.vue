<template>
	<!--eslint-disable-->
	<div>
		<el-dialog class="login-dialog"
		           :visible.sync="dialogVisible"
		           :append-to-body="true"
		           width="800px"
		           :before-close="close">
			<Login></Login>
		</el-dialog>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Login from "@/views/login/index.vue"

    export default {
        name: "loginDialog",
        components: {
            Login
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
	.login-dialog .el-dialog__body {
		padding: 0px ;
	}

	.login-dialog .el-dialog__header {
		padding: 0px;
	}
	.login-dialog .el-dialog {
		overflow: hidden;
		margin-top: 12vh !important;
	}
</style>