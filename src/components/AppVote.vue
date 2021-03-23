<template>
	<!--eslint-disable-->
	<div>
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

		<el-card class="app_card">
			<div class="app_tit">
				{{ activity.title }}
			</div>
			<div class="app_tit_container" :style="{ background: color }">
				<div class="app_tit_item">
					<div>{{ activity.totalVoteNum }}</div>
					<div>总票数</div>
				</div>
				<div class="app_vline"></div>
				<div class="app_tit_item">
					<div>{{ activity.totalPlayersNum }}</div>
					<div>选手数</div>
				</div>
				<div class="app_vline"></div>
				<div class="app_tit_item">
					<div>{{ activity.accessNum }}</div>
					<div>访问量</div>
				</div>
			</div>
			<div class="app_status">
				活动未开始
			</div>
		</el-card>

		<el-card class="app_card">
			<div class="app_rule_item">
				<van-icon class="app_rule_icon" name="clock-o" :style="{ color: color }" />投票开始：
				{{ activity.voteStart }}
			</div>
			<div class="app_rule_item">
				<van-icon class="app_rule_icon" name="clock-o" :style="{ color: color }" />投票截止：
				{{ activity.voteEnd }}
			</div>
			<div class="app_rule_item mb-10">
				<van-icon class="app_rule_icon" name="info-o" :style="{ color: color }" />
				投票规则： 每个微信号每天限制投三票
			</div>
		</el-card>

		<div class="app_fun_container" :style="{ background: color }">
			<div class="app_fun_item" @click="toOrder">
				<i class="el-icon-trophy"></i>
				<div>查看排名</div>
			</div>
			<div class="app_vline1"></div>
			<div class="app_fun_item" @click="toSignUp">
				<i class="el-icon-edit-outline"></i>
				<div>在线报名</div>
			</div>
		</div>

		<van-search class="app_search"
		            v-model="search"
		            show-action
		            placeholder="请输入姓名或编号搜索"
		            background="#ffffff"
		            @clear="onSearch"
		>
			<div class="app_search_prefix" slot="action" @click="onSearch"
			     :style="{ background: color, borderColor: color }"
			>搜索
			</div>
		</van-search>

		<div class="infinite-list-wrapper">
			<div class="app_works list"
			     :style="{ height: worksHeight + 'px'}"
			     infinite-scroll-distance="1200px"
			     v-infinite-scroll="loadingPlayer"
			     :infinite-scroll-disabled="infiniteDisabled"
			>
				<div class="app_works_item"
				     v-for="(item, index) in players" :key="index"
				     :style="{ marginRight: (index%2==0?'2%':'0px')}"
				>
					<el-image class="app_works_img"
					          width="100%"
					          height="100%"
					          :src="getFirstImg(item.worksImage)"
					          fit="fill" @click="toDetail(item)"></el-image>
					<div class="app_works_info">
						<div>
							作品名：{{ item.worksName }}
						</div>
						<div>
							作者：{{ item.name }}
						</div>
						<div>
							年龄：{{ item.age }}
						</div>
						<div>
							票数：{{ item.voteNum }}票
						</div>
					</div>
					<div class="app_works_container" :style="{ background: color }">
						<div class="app_witem" @click="giveVote(item)">
							<div>投票</div>
						</div>
						<div class="app_vline1"></div>
						<div class="app_witem" @click="boost">
							<el-tooltip class="item" effect="dark" content="点我为好友再点个赞吧" placement="top-start">
								<div class="app_witem_zan">
									<i class="app_flower"></i>助力
								</div>
							</el-tooltip>
						</div>
					</div>
					<div class="app_num_container">
					</div>
					<div class="app_num">
						{{ item.no }}号
					</div>
				</div>
				<div class="app_works_item" v-show="totalCount%2 != 0">
				</div>
				<div class="app_bot">
					<a href="https://www.aiocloud.ltd/#/mainApp" :style="{ color: color, }">爱启云科技</a>提供支持
				</div>
			</div>
		</div>

		<van-action-sheet v-model="showGift" title="礼物">
			<div class="app_action">
				<div class="app_desc" :style="{ background: color }">为好友再点个赞吧！给选手赠送礼物，可以增加相应票数！</div>
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
						           :style="{ borderColor: color, color: color }"
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
					<span class="app_eld_btn_send" :style="{ background: color, borderColor: color }">
						赠送
					</span>
				</div>
			</div>
		</van-action-sheet>

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
	</div>
</template>
<!--eslint-disable-->
<script>

    export default {
        name: "AppTop",
	    props: [ "activity", "activityBanners", "color" ],
	    mounted() {
	    },
	    methods: {
            getFirstImg(worksImage) {
                if(worksImage != null && worksImage != "") {
                    let imgs = worksImage.split(",");
                    return imgs[0];
                }
                return "";
            },

		    /**
		     * 处理高度
		     * @param {*} 参数 参数说明
		     * @author panyong
		     */
            handlerHeight() {
				if(this.totalCount >= 10) {
				    this.worksHeight = 1200;
				} else if(this.totalCount < 10) {
                    this.worksHeight = Math.ceil(this.totalCount/2)*1200/5;
				}
            },

		    /**
		     * 快速搜索
		     * @param {*} 参数 参数说明
		     * @author panyong
		     */
            async onSearch() {
                this.searchPlayer();
            },

            /**
             * 查询参加人
             * @param {*} 参数 参数说明
             * @author panyong
             */
            loadingPlayer() {
	            if(this.totalCount > this.pageSize) {
                   if(!this.infiniteDisabled) {
                       this.infiniteDisabled = true;
                       this.currentPage = 0;
                       this.pageSize = this.pageSize+10;
                       this.searchPlayer();
                   }
	            } else {
                    this.infiniteDisabled = true;
	            }
            },
            async searchPlayer() {
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("activityId", "248424e4e4f4459c9554ce97d737f981");
                params.append("order", "t1.no ASC");
                params.append("noOrName", this.search);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_list, params, "POST");
                if (data.code === 200) {
                    this.players = data.data;
                    this.totalCount = data.totalCount;
                    this.infiniteDisabled = false;
                    this.handlerHeight();
                    return true;
                }
            },

            toSignUp() {
                this.$emit("changePage", "signup");
            },

            toOrder() {
                this.active = 2;
            },

            toDetail(item) {
                this.$emit("toDetail", item);;
            },

		    /**
		     * 投票
		     * @param {*} 参数 参数说明
		     * @author panyong
		     */
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



            boost() {
                this.showGift = true;
            },

            setGiftNum(value) {
                this.giftNum = value;
            },

            setGift(item) {
                this.gift = item;
            },

	    },
	    data() {
            return {
                signPlayer: "",
                voteUser: {
                    id: "3",
                    openid: "",
                    nickname: "",
                    sex: "",
                    country: "",
                    province: "",
                    city: "",
                    head_img_url: "",
                },
                worksHeight: 1200,
                infiniteDisabled: false,
                players: [],
                totalCount: 0,
                currentPage: 0,
                pageSize: 10,
                verificationCode: "",
                showVerificationCode: false,
                gift: "",
                giftNum: 1,
                gifts: [
                    {
                        img: require('@/assets/img/icon/zhangsheng.png'),
                        name: "掌声",
                        votes: "5",
                        price: "5"
                    },
                    {
                        img: require('@/assets/img/icon/xianhua1.png'),
                        name: "鲜花",
                        votes: "10",
                        price: "10"
                    },
                    {
                        img: require('@/assets/img/icon/qiaokeli.png'),
                        name: "巧克力",
                        votes: "20",
                        price: "15"
                    },
                    {
                        img: require('@/assets/img/icon/shuijinqiu.png'),
                        name: "水晶球",
                        votes: "30",
                        price: "24"
                    },
                    {
                        img: require('@/assets/img/icon/huangguan.png'),
                        name: "皇冠",
                        votes: "50",
                        price: "40"
                    },

                    {
                        img: require('@/assets/img/icon/chengbao.png'),
                        name: "城堡",
                        votes: "100",
                        price: "80"
                    }
                ],
                showGift: false,
                search: "",
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

	.app_num_container {
		position: absolute;
		top: 0;
		left: 0;
		width: 50px;
		height: 20px;
		font-size: 14px;
		color: #ffffff;
		background: #8c8c8c;
		border-radius: 5px;
		opacity: 0.6;
	}

	.app_num {
		position: absolute;
		top: 0;
		left: 0;
		width: 50px;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		text-align: center;
		color: #ffffff;
	}

	.app_active {
		border: 2px solid #0C2AA4 !important;
		border-radius: 5px;
	}

	.app_eld_btn_send {
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		display: inline-block;
		width: 70px;
		border: 1px solid;
		/*background: #0C2AA4;*/
		height: 35px;
		line-height: 34px;
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

	.app_action_container {
		display: flex;
		flex-wrap: wrap;
	}

	.app_item {
		text-align: center;
		width: calc(33% - 24px);
		margin-bottom: 10px;
		padding: 10px;
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

	.app_bot {
		width: 100%;
		text-align: center;
		font-size: 14px;
		line-height: 40px;
		color: #666;
	}

	.app_bot a {
		font-weight: 600;
	}

	.app_witem_zan {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}

	.app_flower {
		width: 18px;
		height: 18px;
		margin-right: 5px;
	}

	.app_witem {
		width: 50%;
		height: 40px;
		line-height: 40px;
		color: #ffffff;
		font-size: 14px;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.app_works_info {
		font-size: 14px;
		text-align: left;
		line-height: 22px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		background: #FFFFFF;
		padding: 4px;
		color: #666;
	}

	.app_works_container {
		/*background: #0C2AA4;*/
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		height: 30px;
		font-size: 14px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.app_works_img {
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
		min-width: 170px;
		height: 95px;
	}

	.app_works_item {
		width: 49%;
		margin-bottom: 10px;
		position: relative;
	}

	.app_works {
		display: flex;
		flex-wrap: wrap;
		margin: 10px;
	}

	.app_search_prefix {
		width: 70px;
		height: 40px;
		line-height: 40px;
		border: 1px solid;
		/*border: 1px solid #0C2AA4;*/
		/*background: #0C2AA4;*/
		color: #ffffff;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
		margin-right: 10px;
	}

	.el-icon-trophy, .el-icon-edit-outline {
		margin-right: 5px;
	}

	.app_fun_item {
		width: 50%;
		height: 40px;
		line-height: 40px;
		color: #ffffff;
		font-size: 14px;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.app_vline1 {
		border-left: 1px solid #bfbfbf;
		height: 15px;
	}

	.app_fun_container {
		/*background: #0C2AA4;*/
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		height: 40px;
		margin: 10px;
		font-size: 14px;
	}

	.app_rule_icon {
		/*font-weight: 600;*/
		margin-right: 5px;
	}

	.app_rule_item {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
		font-size: 14px;
		color: #595959;
		margin-top: 5px;
		height: 22px;
	}

	.app_card {
		margin: 15px 10px;
	}

	.app_tit {
		padding: 10px 0;
		text-align: left;
	}

	.app_status {
		padding: 10px;
		text-align: center;
		font-size: 14px;
		color: #999;
	}

	.app_vline {
		border-left: 1px solid #bfbfbf;
	}

	.app_tit_container {
		/*background: #0C2AA4;*/
		display: flex;
		flex-wrap: nowrap;
		padding: 15px;
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

	.app_search {
		background: unset !important;
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

	.app_card .el-card__body {
		padding: 0 10px;
	}

</style>