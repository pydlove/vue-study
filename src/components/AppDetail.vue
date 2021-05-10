<template>
	<!--eslint-disable-->
	<div ref="appDetailRef" class="appd_main">
		<!--为 我 拉 票 海报-->
		<div ref="imageWrapper" v-show="showPosterScreenshot" id="appPosterMain" class="post_main"
		     :style="{ background: colorStyle.main}">
			<van-image :style="{ width: '100%', height: '160px', marginBottom: '10px', }"
			           :src="activityBanners[0]"/>

			<el-card class="app_poster_card">
				<div slot="header" class="app_poster_header">
					<span>{{ activity.title }}</span>
				</div>

				<div class="app_poster_author">
					<div :style="{ border: '2px solid ' + colorStyle.main , borderRadius: '3px',}">
						<van-image :style="{ width: '50px', height: '50px', display: 'block', }"
						           :src="playerWorks[0]"/>
					</div>
					<div class="app_poster_aname">
						{{ signPlayer.name }}
					</div>
				</div>

				<div>
					<div class="app_poster_bottom">
						<div>
							<div class="app_ca">
								长按识别二维码
							</div>

							<div class="app_tp" :style="{ background: colorStyle.main, }">
								请帮我投一票
								<div class="app_poster_right">
									<i class="el-icon-caret-right"></i>
									<i class="el-icon-caret-right app_r1"></i>
									<i class="el-icon-caret-right"></i>
								</div>
							</div>
						</div>

						<div id="voteQrcode" ref="voteQrcodeRef"
						     :style="{ width: '80px', height: '80px', marginLeft: '20px' }"></div>
					</div>
				</div>
			</el-card>
		</div>

		<div id="poster_main" v-show="posterMainFlag" :style="{width: clientWidth + 'px'}">
			<div class="cgbg1">
				<div class="app_title" :style="{ color: colorStyle.main}">
				</div>
				<div class="zlcg1">
					{{currentVotes}}
				</div>
				<div class="tl ml-40">
				</div>
			</div>
			<div class="mb-20 mt-20">
				<van-image
						round
						width="60px"
						height="60px"
						fit="fill"
						:src="require('@/assets/img/icon/wechat.png')"
				/>
				<div class="fs-16 mt-10 mb-20 color-303133">
					保存分享给好友
				</div>
			</div>
		</div>

		<div class="app_al"  @click="returnPage">
			<van-icon name="arrow-left"/>
			<span>
				返回
			</span>
		</div>
		<el-carousel class="app_el_carousel" height="200px">
			<el-carousel-item v-for="(item, index) in activityBanners" :key="index" autoplay>
				<van-image
						width="100%"
						height="200px"
						fit="fill"
						:src="item"
				/>
			</el-carousel-item>
		</el-carousel>

		<el-card class="ad_card app_br">
			<div class="app_tit_container1" :style="{ background: color }">
				<div class="app_tit_item app_item_bl" :style="{ background: colorStyle.total }">
					<div>{{ signPlayer.rankNo }}</div>
					<div>排名</div>
				</div>
				<div class="app_vline"></div>
				<div class="app_tit_item" :style="{ background: colorStyle.player }">
					<div>{{ signPlayer.voteNum }}</div>
					<div>票数</div>
				</div>
				<div class="app_vline"></div>
				<div class="app_tit_item app_item_br" :style="{ background: colorStyle.access }">
					<div>{{ signPlayer.gapVoteNum }}</div>
					<div>{{ signPlayer.rankDesc }}</div>
				</div>
			</div>

			<div class="app_work_name">
				{{ signPlayer.worksName }}
			</div>
			<div class="app_work_author">
				{{ signPlayer.no }}号 {{ signPlayer.name }} {{ signPlayer.age }}岁
			</div>
			<div class="app_work_name">
				指导老师：{{ signPlayer.teacher }}
			</div>

			<div v-for="( item, index ) in playerWorks" :key="index">
				<el-image class="app_work_img app_br"
				          width="100%"
				          height="200px"
				          fit="fill"
				          :src="item"
				          :preview-src-list="[item]"
				/>
			</div>

			<div class="app_work_btn_main app_br" :style="{ background: colorStyle.main }">
				<div class="app_work_item" @click="giveVote">
					<div>投 票</div>
				</div>
				<div class="app_vline"></div>
				<div class="app_work_item" @click="createPoster">
					<div>为 我 拉 票</div>
				</div>
				<div class="app_vline"></div>
				<div class="app_work_item" @click="boost">
					<div>为 我 助 力</div>
				</div>
			</div>

			<div class="app_bot">
				<a href="http://www.aiocloud.ltd/#/mainApp" :style="{ color: colorStyle.main, }">爱启云科技</a>提供支持
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
					<img id="imgIdentifyingCode" src="/blsh-h5-service/v1/login/captcha.jpg"
					     class="app_code_img" alt="点击更换" title="点击更换" @click="getIdentifyingCode()"/>
				</div>
			</van-dialog>
		</el-card>

		<!--生成拉票海报 START-->
		<van-dialog class="app_poster_dialog"
		            use-slot
		            v-model="showVotePoster"
		            :showConfirmButton="false"
		            :showCancelButton="false"
		>
			<van-image class="app_poster" :src="posterImg"/>
		</van-dialog>

		<div v-show="showVotePoster" class="app_poster_close">
			<div class="fs-16">
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
		<!--生成拉票海报 END -->

		<van-action-sheet v-model="showGift" title="礼物">
			<div class="app_action">
				<div class="app_desc" :style="{ background: colorStyle.main }">为好友再点个赞吧！给选手赠送礼物，可以增加相应票数！</div>
				<div class="app_action_container">
					<div :class="(gift.name == item.name ? 'app_active':'') + ' app_item'"
					     v-for="(item, index) in gifts" :key="index"
					     @click="setGift(item)"
					>
						<van-image
								width="30"
								height="30"
								:src="item.img"
						/>
						<div class="app_item_text">
							{{ item.name }}（{{ item.votes }}票）
						</div>
						<div class="app_item_price">
							{{ item.price }}元
						</div>
					</div>
				</div>
			</div>
			<van-divider/>
			<div class="app_eld">
				<div class="app_eld_main">
					<el-dropdown placement="top-start" trigger="click" @command="setGiftNum">
						<el-button class="app_eld_btn" size="medium"
						           :style="{ borderColor: colorStyle.main, color: colorStyle.main }"
						>
							{{ giftNum }}<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="1">1</el-dropdown-item>
							<el-dropdown-item command="2">2</el-dropdown-item>
							<el-dropdown-item command="3">3</el-dropdown-item>
							<el-dropdown-item command="4">4</el-dropdown-item>
							<el-dropdown-item command="5">5</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<span class="app_eld_btn_send" :style="{ background: colorStyle.main, borderColor: colorStyle.main }" @click="payl">
						赠送
					</span>
				</div>
			</div>
		</van-action-sheet>

		<BoostDialog ref="boostDialogRef" :colorStyle="colorStyle" @help="help"></BoostDialog>
		<ShareBoost ref="shareBoostRef" :colorStyle="colorStyle" @saveShare="saveShare"></ShareBoost>
	</div>
</template>
<!--eslint-disable-->
<script>
    import html2canvas from "html2canvas";
    import QRCode from 'qrcodejs2'
    import BoostDialog from "@/components/BoostDialog.vue";
    import ShareBoost from "@/components/ShareBoost.vue";

    export default {
        name: "AppTop1",
	    components: {BoostDialog, ShareBoost},
        props: [ "clientHeight", "clientWidth", "activity", "activityBanners", "colorStyle", "signPlayer", "playerWorks", "signPlayerRank", "voteUserId", "openId"],
	    mounted() {
	    },
	    methods: {
            saveShare() {
                this.posterMainFlag = true;
                var vm = this;
                window.pageYOffset = 0;
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                setTimeout(function () {
                    let target = document.querySelector("#poster_main");
                    html2canvas(target, {
                        dpi: 500,
                        scale: 3,
                        allowTaint: true, ///允许跨域图片
                        useCORS: true, //是否尝试使用CORS从服务器加载图像
                        width: target.offsetWidth, //为了解决安卓手机截图后出现白边的问题
                        height: target.offsetHeight //为了解决安卓手机截图后出现白边的问题
                    }).then(canvas => {
                        let dataURL = canvas.toDataURL("image/png");
                        vm.posterMainFlag = false;
                        vm.$refs.shareBoostRef.showPoster(dataURL);
                    })
                }, 1000);
            },

            help() {
				this.$refs.boostDialogRef.close();
				this.boost();
            },

            /**
             * 投票
             * @param {*} 参数 参数说明
             * @author panyong
             */
            async giveVote() {
                // 校验是否有票权
                let params = new FormData()
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_vote_check1, params, "POST");
                if (data.code === 200) {
                    if(data.data) {
                        this.showVerificationCode = true;
                        this.getIdentifyingCode();
                    } else {
                        this.$toast('您当日投票次数已达上限');
                    }
                    return true;
                }
            },
            async confirmVote() {
                if( this.verificationCode == "") {
                    this.$toast.fail('投票失败，未输入验证码');
                    return false;
                }
                let params = new FormData()
                params.append("voteUserId", this.voteUserId);
                params.append("signId", this.signPlayer.id);
                params.append("verificationCode", this.verificationCode);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_vote_giveVote, params, "POST");
                if (data.code === 200) {
                    if(data.data == "codeError") {
                        this.showVerificationCode = false;
                        this.verificationCode = "";
                        this.$toast.fail('投票失败，验证码过期');
                    } else {
                        this.showVerificationCode = false;
                        this.verificationCode = "";
                        this.signPlayer.voteNum++;
	                    this.$refs.boostDialogRef.open();

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

			/**
			 * 返回投票页
			 * @param {*} 参数 参数说明
			 * @author panyong
			 */
            returnPage() {
                this.$emit("changePage", "returnPage");
            },

		    /**
		     * 创建海报
		     * @param {*} 参数 参数说明
		     * @author panyong
		     */
            createPoster() {
                this.overlayStyle.height = (this.$refs.appDetailRef.offsetHeight + 60) + 'px';
                this.getQrcode(
                    this.$aiocUrl.rootUrl + "am?page=detail&activityId=" + this.activity.id + "&signId=" + this.signPlayer.id,
                    this.$refs.voteQrcodeRef,
                    90, 90
                );
                // 生成海报
                this.showPosterScreenshot = true;
                this.showOverlay = true;
                var vm = this;
                window.pageYOffset = 0;
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                setTimeout(function () {
                    // html2canvas(vm.$refs.imageWrapper,
                    // ).then(canvas => {
                    //     let dataURL = canvas.toDataURL("image/png");
                    //     vm.posterImg = dataURL;
                    //     vm.showPosterScreenshot = false;
                    //     vm.showOverlay = false;
                    //     vm.showVotePoster = true;
                    // });
                    let target = document.querySelector("#appPosterMain");
                    html2canvas(target, {
                        dpi: 500,
                        allowTaint: true, ///允许跨域图片
                        useCORS: true, //是否尝试使用CORS从服务器加载图像
                        width: target.offsetWidth, //为了解决安卓手机截图后出现白边的问题
                        height: target.offsetHeight //为了解决安卓手机截图后出现白边的问题
                    }).then(canvas => {
                        let dataURL = canvas.toDataURL("image/png");
                        vm.posterImg = dataURL;
                        vm.showPosterScreenshot = false;
                        vm.showOverlay = false;
                        vm.showVotePoster = true;
                    })
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

            setGiftNum(value) {
                this.giftNum = value;
            },

            setGift(item) {
                this.gift = item;
            },

            async boost() {
                // 1、判断openId是否存储在
                // 2、判断存储里面 openId
                // 3、根据 voteUserId 去查
                // 4、没有就获取微信授权
                if(this.openId == undefined || this.openId == null || this.openId == "") {
                    let params = new FormData()
                    let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_vote_openid, params, "POST");
                    if (data.code === 200) {
                        let openid = data.data;
                        if(openid == undefined || openid == null || openid == "") {
                            const appid = "wx2c6a92b7b529b35c";
                            const url = this.$aiocUrl.rootUrl + "am";
                            const state = "detail," + this.activity.id + "," + this.signPlayer.id;
                            window.location.href =
                                "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
                                + appid + "&redirect_uri="
                                + url
                                + "&response_type=code&scope=snsapi_userinfo&state="
                                + state
                                + "#wechat_redirect ";
                        } else {
                            this.openId = openid;
                            this.showGift = true;
                        }
                    }
                } else {
                    this.showGift = true;
                }
            },

            async payl(){
                let totalAmount = this.giftNum * Number(this.gift.price);
                let params = new FormData()
                params.append("outTradeNo", this.$utils.random_No(4));
                params.append("subject", "给选手赠送礼物：" + this.gift.name);
                params.append("totalAmount", totalAmount);
                params.append("body", "给选手赠送礼物：" + this.gift.name);
                params.append("openid", this.openId);
                params.append("activityId", this.activity.id);
                params.append("signId", this.signPlayer.id);
                params.append("gift", this.gift.name);
                params.append("giftNum", this.giftNum);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_wx_to, params, "POST");
                if (data.code === 200) {
                    var res = data.data;
                    console.log("%返回参数params:", res);
                    let vm = this;
                    if (typeof WeixinJSBridge === 'undefined') {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false)
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data))
                            document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data))
                        }
                    } else {
                        vm.onBridgeReady(res)
                    }
                }
            },

            onBridgeReady(data){
                let vm = this;
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
	                    "appId" : data.appId,   //公众号ID，由商户传入
	                    "timeStamp": data.timeStamp,       //时间戳，自1970年以来的秒数
	                    "nonceStr": data.nonceStr, //随机串
	                    "package": data.package,
	                    "signType": data.signType,         //微信签名方式：
	                    "paySign": data.paySign,
                },
                function(res) {
                    if(res.err_msg == "get_brand_wcpay_request:ok") {
                        console.log("支付成功");
                        // 计算票数
                        vm.currentVotes = vm.calVotes();
                        // 更新投票信息
                        vm.signPlayer.voteNum =  vm.signPlayer.voteNum + vm.currentVotes;
                        vm.showGift = false;
                        // 显示助力成功信息
						vm.$refs.shareBoostRef.open(vm.currentVotes);
                        vm.carryOutPayOrder(data.orderNo, vm.currentVotes);
                    } else if(res.err_msg == "get_brand_wcpay_request:cancel") {
                        console.log("取消支付!");
                    } else {
                        console.log("支付失败!");
                    }
                });
            },

            async carryOutPayOrder(outTradeNo, votes) {
                let params = new FormData()
                params.append("outTradeNo", outTradeNo);
                params.append("signId", this.signPlayer.id);
                params.append("votes", votes);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_gift_order_finish, params, "POST");
                if (data.code === 200) {
                    return true;
                }
            },

            calVotes() {
                if(this.gift.code) {
                    switch (this.gift.code) {
                        case "applause":
                            return 5*this.giftNum;
                        case "flower":
                            return 10*this.giftNum;
                        case "chocolate":
                            return 20*this.giftNum;
                        case "crystalBall":
                            return 30*this.giftNum;
                        case "crown":
                            return 50*this.giftNum;
                        case "castle":
                            return 100*this.giftNum;
                    }
                }
            },

        },
	    data() {
            return {
                vUserId: "",
                currentVotes: 0,
                posterMainFlag: false,
                gift: {
                    img: require('@/assets/img/icon/zhangsheng.png'),
                    name: "掌声",
                    code: "applause",
                    votes: "10",
                    price: "1.88"
                },
                giftNum: 1,
                gifts: [
                    {
                        img: require('@/assets/img/icon/zhangsheng.png'),
                        name: "掌声",
                        code: "applause",
                        votes: "10",
                        price: "1.88"
                    },
                    {
                        img: require('@/assets/img/icon/xianhua.png'),
                        name: "鲜花",
                        code: "flower",
                        votes: "30",
                        price: "5.88"
                    },
                    {
                        img: require('@/assets/img/icon/qiaokeli.png'),
                        name: "巧克力",
                        code: "chocolate",
                        votes: "70",
                        price: "10.88"
                    },
                    {
                        img: require('@/assets/img/icon/shuijinqiu.png'),
                        name: "水晶球",
                        code: "crystalBall",
                        votes: "180",
                        price: "28.88"
                    },
                    {
                        img: require('@/assets/img/icon/huangguan.png'),
                        name: "皇冠",
                        code: "crown",
                        votes: "380",
                        price: "48.88"
                    },

                    {
                        img: require('@/assets/img/icon/chengbao.png'),
                        name: "城堡",
                        code: "castle",
                        votes: "750",
                        price: "88.88"
                    }
                ],
                showGift: false,
                overlayStyle:{
                    height: '0px'
                },
	            clientHeight: "",
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
	.app_active {
		border: 2px solid #0C2AA4 !important;
		border-radius: 5px;
	}

	.app_action_container {
		display: flex;
		flex-wrap: wrap;
	}

	.app_item {
		text-align: center;
		width: 33.3%;
		margin-bottom: 10px;
		padding: 10px 0px;
		border: 2px solid #ffffff;
		border-radius: 5px;
	}

	.app_item_text {
		font-size: 12px;
		line-height: 20px;
		color: #333333;
	}

	.app_item_price {
		font-size: 12px;
		line-height: 18px;
		color: #666;
	}

	.app_desc {
		font-size: 14px;
		color: #ffffff;
		line-height: 22px;
		margin-bottom: 10px;
		/*background: #0C2AA4;*/
		padding: 10px;
		border-radius: 3px;
	}

	.app_action {
		padding: 10px;
		text-align: left;
	}

	.app_eld_btn_send {
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		display: inline-block;
		width: 70px;
		border: 1px solid;
		/*background: #0C2AA4;*/
		height: 36px;
		line-height: 36px;
		text-align: center;
		color: #ffffff;
		font-size: 14px;
	}

	.app_eld_btn {
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
		width: 70px;
		border-left: 1px solid;
		border-top: 1px solid;
		border-bottom: 1px solid;
		border-right: 0px !important;
	}

	.app_eld {
		text-align: right;
		margin-bottom: 10px;
		padding-right: 10px;
	}

	.app_eld_main {
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-end;
	}

	.cgbg1  {
		background-image: url("../assets/img/bg/caidaibg4.png") ;
		background-size: 100% 100%;
		height: 520px;
	}
	.zlcg1 {
		line-height: 80px;
		font-size: 80px;
		font-weight: 600;
		color: #ffd666 !important;
		position: absolute;
		top: 295px;
		left: 104px;
		width: 147px;
		height: 80px;
		text-align: center;
	}
	.app_title {
		line-height: 50px;
		font-size: 50px;
		font-weight: 600;
		padding-top: 130px;
		color: #fff1b8 !important;
	}
	.post_main {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-o-box-sizing: border-box;
		-ms-box-sizing: border-box;
		box-sizing: border-box;
		padding: 15px;
		height: 490px;
	}
	.ad_card {
		margin: 10px;
	}
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
		width: 100%;
		height: 100%;
		margin-top: 0px;
		margin-left: 0px;
		position: absolute;
		top: 0px;
		left: 0;
		z-index: 2000;
		background-color: rgba(0, 0, 0, .7);
		position: fixed;
	}

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
		/*border-bottom: 1px dashed #EBEEF5;*/
	}

	.app_poster_header {
		text-align: left;
		font-size: 14px;
	}

	.app_al {
		height: 30px;
		line-height: 30px;
		width: 60px;
		border-radius: 15px;
		opacity: 0.8;
		background: rgba(0, 0, 0, .4);
		color: #ffffff;
		font-size: 18px;
		position: fixed;
		top: 10px;
		left: 10px;
		z-index: 3000;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}
	.app_al > span  {
		font-size: 14px;
	}

	.app_work_btn_main {
		display: flex;
		flex-wrap: nowrap;
		padding: 15px;
		border-radius: 5px;
	}

	.app_work_item {
		color: #ffffff;
		width: 50%;
	}

	.app_work_name {
		padding: 20px 40px;
		line-height: 20px;
		color: #333;
		font-size: 16px;
	}

	.app_work_author {
		height: 50px;
		line-height: 50px;
		color: #666;
		font-size: 14px;
	}

	.app_work_img {
		border-radius: 5px;
		margin-bottom: 20px;
	}

	.app_tit_container1 {
		display: flex;
		flex-wrap: nowrap;
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
		border-left: 1px solid #FFFFFF;
	}

	.app_tit_item {
		text-align: center;
		width: 33%;
		height: 60px;
		line-height: 20px;
		color: #ffffff;
		font-size: 14px;
		padding: 10px 0;
	}

	.app_tit_item div:nth-of-type(1) {
		font-size: 18px;
	}

	div::-webkit-scrollbar {
		width: 0;
	}

	.app_poster_dialog {
		position: fixed !important;
	}
</style>

<style>
	.app_eld_main .el-button:focus, .el-button:hover {
		background-color: #ffffff !important;
	}
</style>