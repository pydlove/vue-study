<template>
	<!--eslint-disable-->
	<div class="app_container" :style="{height: (clientHeight-50) + 'px', width: clientWidth + 'px'}">
		<!--投票-->
		<div class="app_main" v-if="active == '0'">
			<!--投票-->
			<div v-if="page == 'vote'">
				<AppVote
						ref="appVoteRef"
						:activity="activity"
						:activityBanners="activityBanners"
						:colorStyle="colorStyle"
						:clientHeight="clientHeight"
						:originalHeight="originalHeight"
						:voteUserId="voteUserId"
						:openId="openId"
						@changePage="changePage"
						@toDetail="toDetail"
				></AppVote>
			</div>

			<!--在线报名-->
			<div v-else-if="page == 'signup'">
				<AppSign
						:activity="activity"
						:activityBanners="activityBanners"
						:colorStyle="colorStyle"
						:clientHeight="clientHeight"
						:originalHeight="originalHeight"
						@toDetail="toDetail"
				></AppSign>
			</div>

			<!--作品详情-->
			<div v-else-if="page == 'detail'">
				<AppDetail
						:playerWorks="playerWorks"
						:signPlayer="signPlayer"
						:activity="activity"
						:activityBanners="activityBanners"
						:colorStyle="colorStyle"
						:voteUserId="voteUserId"
						@changePage="changePage"
				></AppDetail>
			</div>
		</div>

		<!--介绍-->
		<div class="app_main" v-else-if="active == '1'">
			<AppIntroduction
					:activity="activity"
					:activityBanners="activityBanners"
					:colorStyle="colorStyle"
			></AppIntroduction>
		</div>

		<!--排行榜-->
		<div class="app_main" v-else-if="active == '2' ">
			<div v-if="page == 'ranking'">
				<AppRank
						ref="rankRef"
						:activity="activity"
						:activityBanners="activityBanners"
						:colorStyle="colorStyle"
						:clientHeight="clientHeight"
						:originalHeight="originalHeight"
						@toDetail="toDetail"
				></AppRank>
			</div>

			<div v-else-if="page == 'detail'">
				<AppDetail
						:playerWorks="playerWorks"
						:signPlayer="signPlayer"
						:activity="activity"
						:activityBanners="activityBanners"
						:colorStyle="colorStyle"
						@changePage="changePage"
				></AppDetail>
			</div>
		</div>

		<van-tabbar class="app_footer" v-model="active"
		            :active-color="colorStyle.main"
		            inactive-color="#999"
		>
			<van-tabbar-item v-for="(item, index) in menus" :key="index"
			                 badge="" @click="changePage(item.page)">
				<span>{{item.name}}</span>
				<template #icon="props">
					<i :class="item.icon + ' app_icon'"></i>
				</template>
			</van-tabbar-item>
		</van-tabbar>

	</div>
</template>
<!--eslint-disable-->
<script>
    import {Dialog} from 'vant';
    import AppVote from "@/components/AppVote.vue"
    import AppDetail from "@/components/AppDetail.vue"
    import AppSign from "@/components/AppSign.vue"
    import AppIntroduction from "@/components/AppIntroduction.vue"
    import AppRank from "@/components/AppRank.vue"
    export default {
        name: "app",
        components: {
            Dialog,
            AppVote,
            AppDetail,
            AppSign,
            AppIntroduction,
            AppRank,
        },
        mounted() {
            this.clientWidth = document.documentElement.clientWidth;
            this.clientHeight = document.documentElement.clientHeight;

            // var useragent = navigator.userAgent;
            // if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
            //     this.$router.push({name: "errorPage"});
            // }
			// TODO 还需要判断微信版本

            // 解析参数 初始化数据
            let path = window.location.href;

            console.log("%请求路径:", path);

            if( path.indexOf("code") != -1 ) {
                let pathArray = path.split("?");
                let params = pathArray[1];
                let paramArray = params.split("&");
                let codeStr = paramArray[0];
                let codeArray = codeStr.split("=");
                let code = codeArray[1];
                let stateStr = paramArray[1];
                let stateArray = stateStr.split("=");
                let state = stateArray[1];
                this.searchActivityInfo(state)
                this.getWxAccessToken(code);
            } else {
                let pathStr = path.split("?")
                this.fmtParam(pathStr);
            }

            this.originalHeight = document.documentElement.clientHeight ||document.body.clientHeight;
            window.onresize = ()=>{
                return(()=>{
                    const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    if(resizeHeight < this.originalHeight){
                        //当软键盘弹起，在此处操作
                        document.querySelector('body').setAttribute('style', 'height:'+ this.originalHeight +'px;');
                        this.clientHeight = resizeHeight;
                    }else{
                        //当软键盘收起，在此处操作
                        document.querySelector('body').setAttribute('style', 'height:100%;');
                        this.clientHeight = this.originalHeight;
                    }
                })()
            }
        },
        methods: {
            async getWxAccessToken(code) {
                console.log("%返回code:", code);
                let params = new FormData()
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_vote_openid, params, "POST");
                if (data.code === 200) {
                    let openid = data.data;
                    if(openid == undefined || openid == null || openid == "") {
                        let params = new FormData()
                        params.append("code", code);
                        let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_wx_openId, params, "POST");
                        if (data.code == 200) {
                            this.openId = data.data;
                            console.log("%返回openId:", this.openId);
                        }
                    } else {
                        this.openId = openid;
                    }
                }
            },

	        addAccessNum() {
                let params = new FormData()
                params.append("id", this.activityId);
                this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_activity_add_access, params, "POST");
            },

            async createUserInfo() {
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_vote_userid, {}, "POST");
                if (data.code === 200) {
                    let userid = data.data;
                    if(userid != null && userid != undefined && userid != "") {
                        this.voteUserId = userid;
					}else {
                        let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_vote_create, {}, "POST");
                        if (data.code === 200) {
                            this.voteUserId = data.data;
                            return true;
                        }
                    }
                    return true;
                }
            },

            /**
             * 跳转到选手作品详情
             * @param {*} 参数 参数说明
             * @author panyong
             */
            async toDetail(signPlayer) {
                document.getElementsByClassName("app_container")[0].scrollTop = 0;
                this.signPlayer = signPlayer;
                if(this.signPlayer.worksImage != null && this.signPlayer.worksImage != "") {
                    this.playerWorks = this.signPlayer.worksImage.split(",");
                }
                let params = new FormData()
                params.append("signId", this.signPlayer.id);
                params.append("activityId", this.activity.id);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_rank, params, "POST");
                if (data.code === 200) {
                    let res = data.data;
                    this.signPlayer.rankNo = res.rankNo;
                    if(res.rankNo > 1) {
                        this.signPlayer.gapVoteNum = res.gapVoteNum + "票";
                        this.signPlayer.rankDesc = "距上一名";
                    } else {
                        this.signPlayer.gapVoteNum = "榜首";
                        this.signPlayer.rankDesc = "当前";
                    }
                    this.page = "detail";
                }
            },

            /**
             * 跳转到指定页面
             * @param {*} 参数 参数说明
             * @author panyong
             */
            changePage(pageName) {
                document.getElementsByClassName("app_container")[0].scrollTop = 0;
                this.page = pageName;
                if(pageName == "vote") {
                    this.$nextTick(function () {
                        this.$refs.appVoteRef.activityId = this.activity.id;
                        this.$refs.appVoteRef.resetData();
                        this.searchActivityInfo(this.activity.id);
                    });
                } else if (pageName == "ranking") {
                    this.active = 2;
                    this.$nextTick(function () {
                        this.$refs.rankRef.resetData();
                        this.$refs.rankRef.searchRank(this.activity.id);
                    });
                } else if (pageName == "returnPage") {
                    if(this.active == 0) {
                        this.page = "vote";
                        this.$nextTick(function () {
                            this.$refs.appVoteRef.activityId = this.activity.id;
                            this.$refs.appVoteRef.resetData();
                            this.searchActivityInfo(this.activity.id);
                        });
                    } else if (this.active == 2) {
                        this.page = "ranking";
                        this.$nextTick(function () {
                            this.$refs.rankRef.resetData();
                            this.$refs.rankRef.searchRank(this.activity.id);
                        });
                    }
                }
            },

            async wxShare() {
                let params = new FormData()
                params.append("url", "http://192.168.0.102:8080/#/am");
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_wx_sign, params, "POST");
                if (data.code == 200) {
                    alert(data.data.nonceStr)
                    this.$wx.config({
                        debug: true, // 开启调试模式,开发时可以开启 
                        appId: "wx10b9490a067b1e61",   // 必填，公众号的唯一标识   由接口返回
                        timestamp: data.data.timestamp, // 必填，生成签名的时间戳 由接口返回
                        nonceStr: data.data.nonceStr,    // 必填，生成签名的随机串 由接口返回
                        signature: data.data.signature,   // 必填，签名 由接口返回
                        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 此处填你所用到的方法
                    });
                    let _this = this
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
                    this.$wx.ready(() => {
                        //分享给朋友
                        this.$wx.onMenuShareAppMessage({
                            title: '快来参加伯林书画研究院活动', // 分享标题
                            desc: '快来注册秒单之家，一大笔订单等你来拿', // 分享描述
                            link: "http://192.168.0.102:8080/#/am", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: window.document.location.protocol + '//' + window.document.location.host + '/kwd/static/img/logo.png', // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                _this.$router.push({path: '/me', query: {}})
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        })
                        //分享到朋友圈
                        this.$wx.onMenuShareTimeline({
                            title: '快来参加伯林书画研究院活动', // 分享标题
                            link: "http://192.168.0.102:8080/#/am", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: "http://192.168.0.102:9091/console-service/upload/activity/1608453410103-864001506084502_v2%20(1).jpg", // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                // _this.$router.push({path: '/am', query: {page: 'detail', workId: this.work.id}})
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        })
                    })
                    return true;
                }
            },

            fmtParam(path) {
                if (path.length > 1) {
                    const params = path[1].split("&");
                    if (params.length == 1) {
                        var pageParams = params[0].split("=");
                        if (pageParams[0] == "activityId") {
                            this.activityId = pageParams[1];
                            this.searchActivityInfo(this.activityId);
                        }
                    } else if (params.length == 3) {
                        var pageStr = params[0];
                        var activityIdStr = params[1];
                        var signIdStr = params[2];
                        let pageArr = pageStr.split("=");
                        let activityIdArr = activityIdStr.split("=");
                        let signIdArr = signIdStr.split("=");
                        if (pageArr[0] == "page" && activityIdArr[0] == "activityId" && signIdArr[0] == "signId") {
                            this.page = pageArr[1];
                            this.detailPageParams.activityId = activityIdArr[1];
                            this.activityId = activityIdArr[1];
                            this.detailPageParams.signId = signIdArr[1];
                            this.initDetailInfo();
                        }
                    }
                    // 增加活动访问量 +1
                    this.addAccessNum();

                    // 为用户生成id
                    this.createUserInfo();
                }
            },

            /**
             * 初始化详情页面需要的数据
             * @param {*} 参数 参数说明
             * @author panyong
             */
            async initDetailInfo() {
                let params = new FormData()
                params.append("id", this.detailPageParams.activityId);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_activity_info, params, "POST");
                if (data.code === 200) {
                    if (data.data.status == "9") {
                        //跳转到活动已结束界面
                    } else {
                        this.activity = data.data.activity;
                        if (this.activity.imgs != null && this.activity.imgs != "") {
                            this.activityBanners = this.activity.imgs.split(",");
                        }
                        this.colorStyle = JSON.parse(this.activity.colorStyle);
                        this.searchSignPlayer();
                        return true;
                    }
                }
            },

            /**
             * 查询参赛选手
             * @param {*} 参数 参数说明
             * @author panyong
             */
            async searchSignPlayer() {
                let params = new FormData()
                params.append("signId",  this.detailPageParams.signId);
                params.append("activityId", this.activity.id);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_player, params, "POST");
                if (data.code === 200) {
                    this.signPlayer = data.data;
                    if(this.signPlayer.worksImage != null && this.signPlayer.worksImage != "") {
                        this.playerWorks = this.signPlayer.worksImage.split(",");
                    }
                    let data1 = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_rank, params, "POST");
                    if (data1.code === 200) {
                        let res = data1.data;
                        this.signPlayer.rankNo = res.rankNo;
                        if(res.rankNo > 1) {
                            this.signPlayer.gapVoteNum = res.gapVoteNum + "票";
                            this.signPlayer.rankDesc = "距上一名";
                        } else {
                            this.signPlayer.gapVoteNum = "榜首";
                            this.signPlayer.rankDesc = "当前";
                        }
                    }
                }
            },

            /**
             * 查询活动
             * @param {*} 参数 参数说明
             * @author panyong
             */
            async searchActivityInfo(activityId) {
                let params = new FormData()
                params.append("id", activityId);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_activity_info, params, "POST");
                if (data.code === 200) {
                    if (data.data.status == "9") {
                        //跳转到活动已结束界面
                    } else {
                        this.activity = data.data.activity;
                        if (this.activity.imgs != null && this.activity.imgs != "") {
                            this.activityBanners = this.activity.imgs.split(",");
                        }
                        this.colorStyle = JSON.parse(this.activity.colorStyle);
                        this.$refs.appVoteRef.activityId = activityId;
                        this.$refs.appVoteRef.searchPlayer();
                        return true;
                    }
                }
            },

        },
        data() {
            return {
                clientWidth: 360,
                openId: "",
                voteUserId: "",
                detailPageParams: {
                    sign: "",
                    activityId: "",
                },
                activityId: "",
                signPlayer: "",
                playerWorks: [],
                activityBanners: [],
                activity: "",
                colorStyle: {
                    main: "#0C2AA4",
                    total: "#0C2AA4",
                    player: "#0C2AA4",
                    access: "#0C2AA4",
                },
                clientHeight: 667,
                originalHeight: 667,
                qrcode: "",
                page: "vote",
                active: 0,
                menus: [
                    {
                        name: "投票",
                        icon: "elh-personnel",
                        page: "vote",
                    },
                    {
                        name: "介绍",
                        icon: "elh-jieshao1",
                        page: "introduction",
                    },
                    {
                        name: "排行",
                        icon: "elh-paihangbang",
                        page: "ranking",
                    },
                ],
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

	.app_code_desc {
		line-height: 30px;
		color: #999;
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

	.app_work_btn_container {
		padding: 10px 10px;
		margin: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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

	.app_work_btn {
		margin: 10px;
		padding: 20px 0px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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

	.app_next_btn {
		width: 150px;
		color: #ffffff;
	}

	.app_next {
		text-align: center;
	}

	.app_vcell1 {
		color: #909399;
	}

	.app_form {
		padding-top: 20px;
		padding-bottom: 20px;
		text-align: left;
	}

	.app_rank_bottom {
		/*background: #0C2AA4;*/
		color: #ffffff;
		height: 30px;
		width: 80px;
		line-height: 30px;
		border-radius: 5px;
		font-size: 14px;
		margin: 0 auto;
		margin-top: 20px;
	}

	.app_rank_top {
		/*background: #0C2AA4;*/
		color: #ffffff;
		height: 40px;
		line-height: 40px;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	.app_rank_vote {
		min-width: 80px;
	}

	.app_sort {
		min-width: 40px;
		color: #ff4d4f;
	}

	.app_sort_icon {
		display: inline-block;
		width: 22px;
		height: 22px;
	}

	.app_rank_no {
		color: #999;
		width: 40px;
	}

	.app_rank_author {
		width: 150px;
		min-width: 150px;
		text-align: left;
	}

	.app_rank_item {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		font-size: 14px;
		margin: 10px 0px;
	}

	.app_icon {
		font-size: 20px;
		text-align: center;
	}

	.app_num {
		position: absolute;
		top: 0;
		left: 0;
		padding: 5px;
		font-size: 14px;
		color: #ffffff;
		background: #8c8c8c;
		border-radius: 5px;
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
	}

	.app_works_container {
		/*background: #0C2AA4;*/
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		height: 30px;
		font-size: 14px;
	}

	.app_rank_img {
		border-radius: 3px;
		width: 40px;
		min-width: 40px;
		height: 40px;
	}

	.app_works_img {
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
	}

	.app_works_item {
		width: 48%;
		margin-bottom: 20px;
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

	.app_rule {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		padding: 10px;
		line-height: 22px;
		/*color: #0C2AA4;*/
	}

	.app_hline {
		border-top: 1px solid;
		width: 40px;
		margin: 0 5px;
	}

	.app_card1 {
		margin: 15px 10px;
		position: relative;
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

	.app_main {
		/*overflow-y: auto;*/
		padding-bottom: 50px;
	}

	/*.app_footer {*/
	/*position: absolute !important;*/
	/*bottom: 0;*/
	/*left: 0;*/
	/*}*/

	.app_container {
		position: relative;
		overflow: auto;
	}

	div::-webkit-scrollbar {
		width: 0;
	}
</style>

<style>
	#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	overflow: unset;
	}

	.app_code_in .van-field__control {
		height: 43px !important;
		line-height: 43px !important;
	}

	.app_code_dialog {
		position: fixed !important;
		top: 50%;
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
		padding: 10px;
	}

</style>