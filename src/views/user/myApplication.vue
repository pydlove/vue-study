<template>
	<!--eslint-disable-->
	<div>
		<el-dialog class="aiocw-dialog"
		           :title="$t('message.MyApplication')"
		           :visible.sync="dialogVisible"
		           width="1000px"
		           :close-on-click-modal="false"
		           :before-close="close"
		           top="30vh"
		>
			<Application></Application>
		</el-dialog>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Application from "@/views/application/application.vue";

    export default {
        name: "application",
	    components: {
            Application
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
                this.search(1, 10);
            },

            close() {
                this.dialogVisible = false;
            },
        }
    }
</script>

<style scoped>
	/*.fitsName {*/
		/*color: #096dd9;*/
		/*text-decoration: underline;*/
	/*}*/
</style>

<style>
	.el-dialog__body {
		font-family: 微软雅黑 !important;
	}
</style>