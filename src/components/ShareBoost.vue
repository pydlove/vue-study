<template>
	<!--eslint-disable-->
	<div class="sb_contianer">
		<van-dialog class="ac_dialog1"
		            :style="{ color: colorStyle.main }"
		            use-slot
		            v-model="showInstroduce"
		            :showConfirmButton="false"
		            :showCancelButton="false"
		>
			<div class="cgbg">
				<van-icon class="app_close" name="close" @click="close"/>
				<div class="app_title" :style="{ color: colorStyle.main}">
				</div>
				<div class="zlcg">
					{{voteNum}}
				</div>
				<div class="tl ml-40">
				</div>
			</div>
			<div class="mb-10 mt-10">
				<van-image
						@click="savePoster"
						round
						width="45px"
						height="45px"
						fit="fill"
						:src="require('@/assets/img/icon/wechat.png')"
				/>
				<div class="fs-12 mt-10 color-303133"  @click="savePoster">
					保存分享给好友
				</div>
			</div>
		</van-dialog>

		<van-dialog class="ac_dialog1"
		            use-slot
		            v-model="showVotePoster"
		            :showConfirmButton="false"
		            :showCancelButton="false"
		>
			<van-image class="app_poster" :src="posterImg" height="420px"/>
		</van-dialog>

		<div v-show="showVotePoster" class="app_poster_close">
			<div class="fs-16">
				长按可分享给微信好友
			</div>
			<div @click="closePoster">
				<i class="el-icon-circle-close app_close_icon"></i>
			</div>
		</div>

		<van-overlay class="app_overlay" :show="showOverlay">
			<van-loading class="app_loading" type="spinner" color="#ffffff" vertical>
				生成拉票海报中...
			</van-loading>
		</van-overlay>
	</div>
</template>
<!--eslint-disable-->
<script>
    import html2canvas from "html2canvas";
    export default {
        name: "ShareBoost",
        props: ["colorStyle"],
        data() {
            return {
                showInstroduce: false,
                showVotePoster: false,
                showOverlay: false,
                voteNum: 0,
                posterImg: "",
            }
        },
        methods: {
            open(voteNum) {
                this.showInstroduce = true;
                this.voteNum = voteNum;
            },

            close() {
                this.showInstroduce = false;
            },

            /**
             * 创建海报
             * @param {*} 参数 参数说明
             * @author panyong
             */
            savePoster() {
                // 生成海报
                this.showOverlay = true;
                this.$emit("saveShare");
            },
            closePoster() {
                this.showVotePoster = false;
            },
            showPoster(posterImg) {
                this.showInstroduce = false;
                this.showVotePoster = true;
                this.showOverlay = false;
                this.posterImg = posterImg;
            }
        }
    }
</script>

<style scoped>
	.app_close_icon {
		font-size: 40px;
		margin-top: 20px;
	}

	.app_poster_close {
		position: fixed;
		bottom: 30px;
		left: calc((100% - 200px) / 2);
		color: #ffffff;
		z-index: 2100;
		width: 200px;
		text-align: center;
	}
	.app_loading {
		top: 50%;
	}
	.app_overlay {
		width: 100%;
		height: 100%;
		margin-top: 0px;
		margin-left: 0px;
		position: absolute;
		top: 0px;
		left: 0;
		z-index: 3000;
		background-color: rgba(0, 0, 0, .7);
		position: fixed;
	}

	.cgbg  {
		background-image: url("../assets/img/bg/caidaibg4.png") ;
		background-size: 100% 100%;
		height: 310px;
	}
	.zlcg {
		line-height: 50px;
		font-size: 50px;
		font-weight: 600;
		color: #ffd666 !important;
		position: absolute;
		top: 180px;
		left: 83px;
		width: 113px;
		height: 50px;
		text-align: center;
	}
	.app_close {
		position: absolute;
		top: 3px;
		right: 9px;
		font-size: 20px;
		color: #eeeeee !important;
	}
	.app_title {
		line-height: 50px;
		font-size: 50px;
		font-weight: 600;
		padding-top: 130px;
		color: #fff1b8 !important;
	}
</style>
<style>
	.ac_dialog1 {
		position: fixed;
		top: 45%;
		left: 50%;
		width: 280px !important;
		overflow: hidden;
		font-size: 16px;
		background-color: #fff;
		border-radius: 16px;
		-webkit-transform: translate3d(-50%,-50%,0);
		transform: translate3d(-50%,-50%,0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: .3s;
		transition: .3s;
		-webkit-transition-property: opacity,-webkit-transform;
		transition-property: opacity,-webkit-transform;
		transition-property: transform,opacity;
		transition-property: transform,opacity,-webkit-transform;
	}
</style>