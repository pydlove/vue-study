<template>
	<!--eslint-disable-->
	<div>
		<van-dialog class="ac_dialog"
		            :style="{ color: colorStyle.main }"
		            use-slot
		            v-model="showInstroduce"
		            :showConfirmButton="false"
		            :showCancelButton="false"
		>
			<van-icon class="app_close" name="close" :style="{ color: colorStyle.main}" @click="close"/>
			<div class="app_title" :style="{ color: colorStyle.main}">
				投票成功
			</div>
			<div class="zlcg">
				您已成功投票！您还可以为好友助力更多票数哦！
			</div>
			<van-image
					class="gw"
					radius="20px"
					width="60px"
					height="60px"
					fit="fill"
					:src="require('@/assets/img/logo/maomi1.png')"
			/>
			<div class="zl" :style="{ background: colorStyle.main }" @click="help">
				更 多 助 力
			</div>
		</van-dialog>
	</div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "BoostDialog",
	    props: ["colorStyle"],
	    data() {
            return {
                showInstroduce: false,
            }
	    },
	    methods: {
            open() {
                this.showInstroduce = true;
            },

            close() {
                this.showInstroduce = false;
            },

            help() {
                this.$emit("help");
            }
 	    }
    }
</script>

<style scoped>
	.gw {
		position: absolute;
		bottom: 10px;
		right: 10px;
	}
	.zl {
		width: 80px;
		height: 30px;
		line-height: 30px;
		border-radius: 15px;
		margin: 0 auto;
		color: #ffffff;
		font-size: 14px;
		margin-bottom: 10px;
	}
	.zlcg {
		margin: 10px;
		line-height: 24px;
		font-size: 14px;
		color: #333;
		margin-bottom: 40px;
	}
	.app_close {
		position: absolute;
		top: 3px;
		right: 9px;
		font-size: 20px;
	}
	.app_title {
		line-height: 30px;
	}
</style>