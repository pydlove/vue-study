<template>
	<!--eslint-disable-->
	<div>
		<div class="app_al">
			<van-icon name="arrow-left" @click="returnPage"/>
		</div>
		<el-carousel class="app_el_carousel" height="200px">
			<el-carousel-item v-for="(item, index) in activityBanners" :key="index">
				<van-image
						width="100%"
						height="200px"
						fit="fill"
						:src="item"
				/>
			</el-carousel-item>
		</el-carousel>

		<div class="app_tit_container1" :style="{ background: color }">
			<div class="app_tit_item">
				<div>{{ signPlayer.rank }}</div>
				<div>排名</div>
			</div>
			<div class="app_vline"></div>
			<div class="app_tit_item">
				<div>{{ signPlayer.voteNum }}</div>
				<div>票数</div>
			</div>
			<div class="app_vline"></div>
			<div class="app_tit_item">
				<div>{{ handleRank() }}</div>
				<div>{{ handleRankDesc() }}</div>
			</div>
		</div>

		<div class="app_work_author">
			{{ signPlayer.no }}号 {{ signPlayer.name }} {{ signPlayer.age }}岁
		</div>
		<div class="app_work_author">
			作品名称：{{ signPlayer.worksName }}
		</div>
		<div v-for="( item, index ) in playerWorks" :key="index">
			<el-image class="app_work_img"
			          width="100%"
			          height="200px"
			          fit="fill"
			          :src="item"
			/>
		</div>

		<div class="app_work_btn_main" :style="{ background: color }">
			<div class="app_work_item" @click="giveVote">
				<div>投 票</div>
			</div>
			<div class="app_vline"></div>
			<div class="app_work_item" @click="createPoster">
				<div>为 我 拉 票</div>
			</div>
		</div>

		<div class="app_bot">
			<a href="https://www.aiocloud.ltd/#/mainApp" :style="{ color: color, }">爱启云科技</a>提供支持
		</div>

		<!--投 票-->
		<van-dialog class="app_code_dialog"
		            use-slot
		            title="验证码"
		            v-model="showVerificationCode"
		            :showConfirmButton="true"
		            :showCancelButton="true"
		            confirmButtonText="投票"
		            @close="onClose"
		            @confirm="confirmVote"
		>
			<div class="app_code_box">
				<van-field class="app_code_in"
				           v-model="verificationCode"
				           label=""
				           type="textarea"
				           placeholder="请输入验证码"
				           autosize
				           :border="false"
				/>
				<img id="imgIdentifyingCode" src="/console-service/v1/login/captcha.jpg"
				     class="app_code_img" alt="点击更换" title="点击更换" @click="getIdentifyingCode()"/>
			</div>
		</van-dialog>

		<!--为 我 拉 票 海报-->
		<!--<div ref="imageWrapper" v-show="showPosterScreenshot" id="appPosterMain"-->
		     <!--:style="{ background: color, padding: '15px', margin: '15px', height: '442px'}">-->
			<!--<van-image :style="{ width: '100%', height: '160px', marginBottom: '10px', }"-->
			           <!--:src="require('@/assets/img/em/tp2.png')"/>-->

			<!--<el-card class="app_poster_card">-->
				<!--<div slot="header" class="app_poster_header">-->
					<!--<span>{{ activity.title }}</span>-->
				<!--</div>-->

				<!--<div class="app_poster_author">-->
					<!--<div :style="{ border: '2px solid ' + color , borderRadius: '3px',}">-->
						<!--<van-image :style="{ width: '50px', height: '50px', display: 'block', }"-->
						           <!--:src="work.imgs[0]"/>-->
					<!--</div>-->
					<!--<div class="app_poster_aname">-->
						<!--{{ work.author }}-->
					<!--</div>-->
				<!--</div>-->

				<!--<div>-->
					<!--<div class="app_poster_bottom">-->
						<!--<div>-->
							<!--<div class="app_ca">-->
								<!--长按识别二维码-->
							<!--</div>-->

							<!--<div class="app_tp" :style="{ background: color, }">-->
								<!--请帮我投一票-->
								<!--<div class="app_poster_right">-->
									<!--<i class="el-icon-caret-right"></i>-->
									<!--<i class="el-icon-caret-right app_r1"></i>-->
									<!--<i class="el-icon-caret-right"></i>-->
								<!--</div>-->
							<!--</div>-->
						<!--</div>-->

						<!--<div id="voteQrcode" ref="voteQrcodeRef"-->
						     <!--:style="{ width: '80px', height: '80px', marginLeft: '20px' }"></div>-->
					<!--</div>-->
				<!--</div>-->
			<!--</el-card>-->
		<!--</div>-->

		<van-dialog class="app_poster_dialog"
		            use-slot
		            v-model="showVotePoster"
		            :showConfirmButton="false"
		            :showCancelButton="false"
		>
			<van-image class="app_poster" :src="posterImg"/>
		</van-dialog>

		<div v-show="showVotePoster" class="app_poster_close">
			<div>
				长按可保存图片
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
    export default {
        name: "AppTop1",
        props: [ "activity", "activityBanners", "color", "signPlayer", "playerWorks" ],
	    methods: {
            async giveVote(item) {
                // 校验是否有票权
                let params = new FormData()
                params.append("voteUserId", this.voteUser.id);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_vote_check, params, "POST");
                if (data.code === 200) {
                    if(data.data) {
                        this.showVerificationCode = true;
                        this.signPlayer = item;
                    } else {
                        this.$toast('您当日投票次数已达上限');
                    }
                    return true;
                }
            },
            async confirmVote() {
                let params = new FormData()
                params.append("voteUserId", this.voteUser.id);
                params.append("signId", this.signPlayer.id);
                params.append("verificationCode", this.verificationCode);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_vote_giveVote, params, "POST");
                if (data.code === 200) {
                    if(data.data == "codeError") {
                        this.showVerificationCode = false;
                        this.getIdentifyingCode();
                        this.$toast.success('验证码错误，投票失败');
                    } else {
                        this.showVerificationCode = false;
                        this.verificationCode = "";
                        this.getIdentifyingCode();
                        this.$toast.success('投票成功');
                        this.searchPlayer();
                    }
                    return true;
                }
            },
            onClose() {
                this.showVerificationCode = false;
            },
            getIdentifyingCode: function () {
                let identifyCodeSrc = this.$aiocUrl.console_service_v1_login_captcha + "?" + Math.random();
                let objs = document.getElementById("imgIdentifyingCode");
                objs.src = identifyCodeSrc;
            },


            returnPage() {
                this.page = "vote";
            },
            handleRank() {
                if (this.work.rank == 1) {
                    return "榜首";
                }
                for (var i in this.rankings) {
                    let ranking = this.rankings[i];
                    if (ranking.rank == (this.work.rank - 1)) {
                        return (ranking.votes - this.work.votes) + "票";
                    }
                }
            },

            handleRankDesc() {
                if (this.work.rank == 1) {
                    return "当前";
                } else {
                    return "距上一名";
                }
            },

            createPoster() {
                this.getQrcode(
                    this.rootUrl + "/#/am?page=detail&workId=" + this.work.id,
                    this.$refs.voteQrcodeRef,
                    90, 90
                );
                // 生成海报
                this.showPosterScreenshot = true;
                this.showOverlay = true;
                var vm = this;
                setTimeout(function () {
                    html2canvas(vm.$refs.imageWrapper,
                    ).then(canvas => {
                        let dataURL = canvas.toDataURL("image/png");
                        vm.posterImg = dataURL;
                        vm.showPosterScreenshot = false;
                        vm.showOverlay = false;
                        vm.showVotePoster = true;
                    });
                }, 1000);
            },

            closePoster() {
                this.showVotePoster = false;
                this.$refs.voteQrcodeRef.innerHTML = '';
            },

            getQrcode(url, ref, width, height) {
                this.$nextTick(function () {
                    this.qrcode = new QRCode(ref, {
                        width: width,
                        height: height,
                        text: url,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                });
            },
        },
	    data() {
            return {
                qrcode: "",
                showOverlay: false,
                showPosterScreenshot: false,
                posterImg: "",
                showVotePoster: false,
                verificationCode: "",
                showVerificationCode: false,
            }
	    }
    }
</script>


<style scoped>
	.app_code_img {
		min-width: 150px;
		height: 43px;
	}

	.app_code_box {
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		padding: 10px;
	}

	.app_loading {
		top: 50%;
	}

	.app_overlay {
		width: 370px;
		height: 640px;
		margin-top: 0px;
		margin-left: 0px;
		position: absolute;
		top: 0px;
		left: 0;
		z-index: 2000;
		background-color: rgba(0, 0, 0, .7);
	}

	.app_close_icon {
		font-size: 40px;
		margin-top: 20px;
	}

	.app_poster_close {
		position: absolute;
		bottom: 30px;
		left: calc((100% - 100px) / 2);
		color: #ffffff;
		z-index: 2100;
		width: 120px;
		text-align: center;
	}

	.app_poster {
		display: block;
	}

	.app_ca {
		font-size: 16px;
		font-weight: 600;
		line-height: 32px;
	}

	.app_poster_bottom {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.app_poster_bottom > div:nth-of-type(1) {
		min-width: 150px;
	}

	.app_tp {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		height: 30px;
		line-height: 30px;
		width: 100%;
		border-radius: 15px;
		color: #ffffff;
		font-size: 14px;
		font-weight: 600;
	}

	.app_poster_aname {
		font-size: 15px;
		font-weight: 600;
		margin-left: 10px;
	}

	.app_poster_author {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		padding-bottom: 20px;
		border-bottom: 1px dashed #EBEEF5;
	}

	.app_poster_header {
		text-align: left;
		font-size: 14px;
	}

	.app_al {
		height: 30px;
		line-height: 30px;
		width: 30px;
		border-radius: 15px;
		opacity: 0.8;
		background: rgba(0, 0, 0, .4);
		color: #ffffff;
		font-size: 18px;
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 3000;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.app_work_btn_main {
		display: flex;
		flex-wrap: nowrap;
		margin: 10px;
		padding: 15px;
		border-radius: 5px;
	}

	.app_work_item {
		color: #ffffff;
		width: 50%;
	}

	.app_work_author {
		height: 50px;
		line-height: 50px;
	}

	.app_work_img {
		border-radius: 5px;
	}

	.app_tit_container1 {
		display: flex;
		flex-wrap: nowrap;
		margin: 10px;
		padding: 15px;
	}

	.app_bot {
		font-size: 14px;
		line-height: 40px;
		color: #666;
	}

	.app_bot a {
		font-weight: 600;
	}

	.app_vline {
		border-left: 1px solid #bfbfbf;
	}

	.app_tit_item {
		text-align: center;
		width: 33%;
		height: 40px;
		line-height: 20px;
		color: #ffffff;
		font-size: 14px;
	}

	.app_tit_item div:nth-of-type(1) {
		font-size: 18px;
	}

	div::-webkit-scrollbar {
		width: 0;
	}
</style>

<style>
	.app_code_in .van-field__control {
		height: 43px !important;
		line-height: 43px !important;
	}

	.app_code_dialog {
		position: absolute !important;
		top: 45%;
		left: 50%;
		width: 320px;
		overflow: hidden;
		font-size: 16px;
		background-color: #fff;
		border-radius: 3px;
		-webkit-transform: translate3d(-50%, -50%, 0);
		transform: translate3d(-50%, -50%, 0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: .3s;
		transition: .3s;
		-webkit-transition-property: opacity, -webkit-transform;
		transition-property: opacity, -webkit-transform;
		transition-property: transform, opacity;
		transition-property: transform, opacity, -webkit-transform;
	}

	.app_code_dialog .van-dialog__header {
		padding-top: 0px;
		font-weight: 500;
		line-height: 50px;
		text-align: center;
		background: #eeeeee;
	}

	.app_poster_card .el-card__header {
		background: #ffffff;
	}

	.app_poster_card .el-card__body {
		background: #ffffff;
	}

	.app_poster_dialog {
		position: absolute !important;
		top: 40% px;
		left: 50%;
		width: 320px;
		overflow: hidden;
		font-size: 16px;
		background-color: #fff;
		border-radius: 3px;
		-webkit-transform: translate3d(-50%, -50%, 0);
		transform: translate3d(-50%, -50%, 0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: .3s;
		transition: .3s;
		-webkit-transition-property: opacity, -webkit-transform;
		transition-property: opacity, -webkit-transform;
		transition-property: transform, opacity;
		transition-property: transform, opacity, -webkit-transform;

	}

	.app_dialog .van-dialog__header {
		padding: 20px;
		color: #f5222d;
	}

	.app_dialog {
		position: absolute !important;
		top: 45%;
		left: 50%;
		width: 320px;
		overflow: hidden;
		font-size: 16px;
		background-color: #fff;
		border-radius: 16px;
		-webkit-transform: translate3d(-50%, -50%, 0);
		transform: translate3d(-50%, -50%, 0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: .3s;
		transition: .3s;
		-webkit-transition-property: opacity, -webkit-transform;
		transition-property: opacity, -webkit-transform;
		transition-property: transform, opacity;
		transition-property: transform, opacity, -webkit-transform;
	}

	.app_up_eitem .el-form-item__label {
		float: none;
	}

	.app_vcell {
		padding: 10px 0px;
	}

	.van-cell::after {
		position: absolute;
		box-sizing: border-box;
		content: ' ';
		pointer-events: none;
		right: 16px;
		bottom: 0;
		left: 16px;
		border-bottom: 0px solid #ebedf0;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
	}

	.app_form .el-input__inner {
		border-radius: 0px;
		border: 0px;
		padding: 0px;
	}

	.app_form .el-form-item__content {
		position: unset;
	}

	.app_form .el-form-item {
		margin-bottom: 10px !important;
	}

	.el-dropdown-menu {
		z-index: 2010 !important;
		padding: 0px;
		margin: 20px 0;
	}

	.el-dropdown-menu__item {
		width: 60px !important;
		text-align: center;
		border-bottom: 1px solid #eee;
	}

	.van-popup {
		position: absolute;
		bottom: 0px;
	}

	.van-search__action {
		padding: 0px;
	}

	.app_search .van-search__content {
		height: 40px;
		background-color: #ffffff;
		border: 1px solid #d9d9d9;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
		border-right: 0px;
	}

	.app_search .van-field__left-icon {
		line-height: 30px;
	}

	.app_search .van-field__control {
		line-height: 30px;
	}

	[class*=" el-icon-"], [class^=el-icon-] {
		/*font-weight: 500 !important;*/
	}

	.app_card1 .el-card__body {
		padding: 0px;
		padding-bottom: 10px;
	}

	.app_card .el-card__body {
		padding: 0 10px;
	}

</style>>