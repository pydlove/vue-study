<template>
	<div class="error_container">
		<div>
			<i class="el-icon-warning"></i>
		</div>
		<div>
			请用微信客户端打开链接
		</div>
	</div>
</template>

<script>
    export default {
        name: "WxErrorPage"
    }
</script>

<style scoped>
	.error_container {
		text-align: center;
		line-height: 50px;
		padding-top: 50px;
	}
	.el-icon-warning {
		font-size: 40px;
		color: #409EFF;
	}
</style>