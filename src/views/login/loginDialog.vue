<template>
	<!--eslint-disable-->
	<div>
		<el-dialog class="login-dialog"
		           :visible.sync="dialogVisible"
		           :append-to-body="true"
		           width="800px"
		           :before-close="close">
			<Login ref="loginRef" @closeNotConfirm="closeNotConfirm" @setUser="setUser"></Login>
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
                this.$refs.loginRef.initLanguage();
            },

            close() {
                this.$confirm(this.$t('message.outLoginAndRegister'), this.$t('message.Hint'), {
                    confirmButtonText: this.$t('message.Sure'),
                    cancelButtonText: this.$t('message.Cancle'),
                    type: 'warning'
                }).then(() => {
                    this.dialogVisible = false;
                }).catch(() => {
                });
            },

            closeNotConfirm(){
                this.dialogVisible = false;
            },

            setUser(user) {
                this.$emit("setUser", user);
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