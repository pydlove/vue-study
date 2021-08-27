<template>
	<!--eslint-disable-->
	<div>
		<div class="nd-tm-right">
			<div class="ml-20">
				<div class="nd-menu-header">
					首页
				</div>
			</div>
			<div class="ml-20">
				<div class="nd-menu-header"  @click="observeDevice" >
					观测设备
				</div>
				<div class="nd-menu-header">
					观测数据
				</div>
				<div class="nd-menu-header">
					观测申请
				</div>
			</div>
			<div class="ml-20">
				<div class="nd-menu-header">
					图库与成功
				</div>
				<div class="nd-menu-header" @click="newsAndResource">
					新闻与资源
				</div>
				<div class="nd-menu-header">
					中/EN
				</div>
			</div>
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "Header",
	    data() {
            return {

            }
	    },
	    mounted() {

	    },
	    methods: {
            //新闻与资源
            newsAndResource() {
                this.$router.push({path: '/newsAndResource'})
            },

            //观测设备
            observeDevice() {
                this.$router.push({path: "/observeDevice"})
            },

	    }
    }
</script>

<style scoped>
	@media screen and (min-width: 768px) {
		.nd-menu-header {
			border-top: 2px solid #ffffff;
			font-size: 16px;
			line-height: 40px;
			width: 100px;
		}

		.nd-tm-right {
			display: flex;
			flex-wrap: nowrap;
			padding-top: 20px;
			font-family: 黑体;
		}
	}
</style>