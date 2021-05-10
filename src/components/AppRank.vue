<template>
	<!--eslint-disable-->
	<div>
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

		<el-card class="app_card app_br">
			<div class="app_tit">
				{{ activity.title }}
			</div>
			<div class="app_tit_container">
				<div class="app_tit_item app_item_bl" :style="{ background: colorStyle.total }">
					<div>{{ activity.totalVoteNum }}</div>
					<div>总票数</div>
				</div>
				<div class="app_vline"></div>
				<div class="app_tit_item" :style="{ background: colorStyle.player }">
					<div>{{ activity.totalPlayersNum }}</div>
					<div>选手数</div>
				</div>
				<div class="app_vline"></div>
				<div class="app_tit_item app_item_br" :style="{ background: colorStyle.access }">
					<div>{{ activity.accessNum }}</div>
					<div>访问量</div>
				</div>
			</div>
			<div class="app_status" :style="{ color: fmtStatusColor(activity.status) }">
				{{ fmtStatus(activity.status) }}
			</div>
		</el-card>

		<el-card class="app_card app_br">
			<div class="app_rule" :style="{ color: colorStyle.main }">
				<div class="app_hline" :style="{ borderColor: colorStyle.main }"></div>
				活动规则
				<div class="app_hline" :style="{ borderColor: colorStyle.main }"></div>
			</div>
			<div class="app_rule_item">
				<van-icon class="app_rule_icon" name="clock-o" :style="{ color: colorStyle.main }"/>
				投票开始：
				{{ activity.voteStart }}
			</div>
			<div class="app_rule_item">
				<van-icon class="app_rule_icon" name="clock-o" :style="{ color: colorStyle.main }"/>
				投票截止：
				{{ activity.voteEnd }}
			</div>
			<div class="app_rule_item mb-10">
				<van-icon class="app_rule_icon" name="info-o" :style="{ color: colorStyle.main }"/>
				投票规则： 每个微信号每天限制投三票
			</div>
		</el-card>

		<el-card class="app_card1 app_br">
			<div class="app_rank_top" :style="{ background: colorStyle.main }">
				活动排行榜
			</div>

			<div class="app_rank_item" v-for="(item, index) in rankData" :key="index" @click="toPlayerDetail(item)">
				<div v-if="index == '0'" class="app_sort">
					<i class="guangjun app_sort_icon"></i>
				</div>
				<div v-else-if="index == '1'" class="app_sort">
					<i class="yajun app_sort_icon"></i>
				</div>
				<div v-else-if="index == '2'" class="app_sort">
					<i class="jijun app_sort_icon"></i>
				</div>
				<div v-else class="app_sort">
					{{ index+1 }}
				</div>
				<el-image class="app_rank_img"
				          :src="getFirstImg(item.worksImage)"
				          fit="fill"></el-image>
				<div class="app_rank_item">
					<div class="app_rank_no">
						{{ item.no }}号
					</div>
					<div class="app_rank_author">
						{{ item.name }}
					</div>
					<div class="app_rank_vote">
						{{ item.voteNum }}票
					</div>
				</div>
			</div>
			<div class="app_rank_bottom app_br_20" :style="{ background: colorStyle.main }" @click="showMore">
				显示更多
			</div>
		</el-card>

		<van-search class="app_search" ref="arSearchRef"
		            v-model="search"
		            show-action
		            placeholder="请输入姓名或编号搜索"
		            background="#ffffff"
		            @clear="onSearchPlayer"
		>
			<div class="app_search_prefix" slot="action" @click="onSearchPlayer"
			     :style="{ background: colorStyle.main, borderColor: colorStyle.main }"
			>搜索
			</div>
		</van-search>

		<el-card class="app_card1 app_br" v-show="searchResult.length > 0">
			<div class="app_rank_item" v-for="(item, index) in searchResult" :key="index" @click="toPlayerDetail(item)">
				<div v-if="item.rankNo == '1'" class="app_sort">
					<i class="guangjun app_sort_icon"></i>
				</div>
				<div v-else-if="item.rankNo == '2'" class="app_sort">
					<i class="yajun app_sort_icon"></i>
				</div>
				<div v-else-if="item.rankNo == '3'" class="app_sort">
					<i class="jijun app_sort_icon"></i>
				</div>
				<div v-else class="app_sort">
					{{ item.rankNo }}
				</div>
				<el-image class="app_rank_img"
				          :src="getFirstImg(item.worksImage)"
				          fit="fill"></el-image>
				<div class="app_rank_item">
					<div class="app_rank_no">
						{{ item.no }}号
					</div>
					<div class="app_rank_author">
						{{ item.name }}
					</div>
					<div class="app_rank_vote">
						{{ item.voteNum }}票
					</div>
				</div>
			</div>
		</el-card>

		<div class="app_bot" id="arBot" ref="arBot">
			<a href="http://www.aiocloud.ltd/#/mainApp" :style="{ color: colorStyle.main, }">爱启云科技</a>提供支持
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>

    export default {
        name: "AppRank",
        props: ["activity", "activityBanners", "colorStyle", "originalHeight", "clientHeight" ],
        watch: {
            clientHeight :function() {
                if( this.originalHeight != this.clientHeight ){
                    //键盘弹出操作
                    setTimeout(()=>{
                        this.$refs.arBot.scrollIntoView(false);
                        window.scrollTo(0, 50);
                    },200)
                }else{
                    //键盘收起操作
                }
            }
        },
        mounted() {
        },
        methods: {
            /**
             * 打开选手作品详情
             * @param {*} 参数 参数说明
             * @author panyong
             */
            toPlayerDetail(item) {
				this.$emit("toDetail", item);
            },

            /**
             * 快速搜索
             * @param {*} 参数 参数说明
             * @author panyong
             */
            async onSearchPlayer() {
	            if(this.search == "") {
                    this.searchResult = [];
	            } else {
                    this.searchPlayer();
	            }
            },
            async searchPlayer() {
                let params = new FormData()
                params.append("page", 0);
                params.append("limit", 10);
                params.append("activityId", this.activityId);
                params.append("order", "t1.no ASC");
                params.append("noOrName", this.search);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_list, params, "POST");
                if (data.code === 200) {
	                this.searchResult = data.data;
	                let tempResult = [];
                    for(var i in this.searchResult) {
                        var item = this.searchResult[i];
                        let params1 = new FormData()
                        params1.append("signId", item.id);
                        params1.append("activityId", this.activityId);
                        let data1 = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_rank, params1, "POST");
                        if (data1.code === 200) {
                            let res = data1.data;
                            item.rankNo = res.rankNo;
                            tempResult.push(item);
                        }
                    }
                    this.searchResult = tempResult;
                    return true;
                }
            },


            resetData() {
                this.currentPage = 1;
                this.pageSize = 10;
                this.totalCount = 0;
                this.rankData = [];
            },

            /**
             * 查询排行榜
             * @param {*} 参数 参数说明
             * @author panyong
             */
            async searchRank(activityId) {
                this.activityId = activityId;
                let params = new FormData();
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("activityId", activityId);
                params.append("order", "vote_num DESC");
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_sign_list, params, "POST");
                if (data.code === 200) {
	                this.totalCount = data.totalCount;
                    this.rankData.push.apply(this.rankData, data.data);
                    return true;
                }
            },

		    /**
		     * 展示更多
		     * @param {*} 参数 参数说明
		     * @author panyong
		     */
            showMore() {
                if(this.totalCount < (this.currentPage*this.pageSize)) {
                    this.$toast('无更多排名信息');
                } else {
                    this.currentPage++;
                    this.searchRank(this.activity.id);
                }
            },

            /**
             * 获取第一张图片
             * @param {*} 参数 参数说明
             * @author panyong
             */
            getFirstImg(worksImage) {
                if (worksImage != null && worksImage != "") {
                    let imgs = worksImage.split(",");
                    return imgs[0];
                }
                return "";
            },

            /**
             * 格式化状态
             * @param {*} 参数 参数说明
             * @author panyong
             */
            fmtStatus(status) {
                switch (status) {
                    case "0":
                        return "活动未开始";
                    case "1":
                        return "活动进行中";
                    case "2":
                        return "活动已结束";
                    default:
                        break;
                }
            },

            fmtStatusColor(status) {
                switch (status) {
                    case "0":
                        return "#bfbfbf";
                    case "1":
                        return "#52c41a";
                    case "2":
                        return "#c4192a";
                    default:
                        break;
                }
            },
        },
        data() {
            return {
                activityId: "",
                searchResult: [],
                rankData: [],
                totalCount: 0,
                currentPage: 1,
                pageSize: 10,
                search: "",
            }
        }
    }
</script>
<style scoped>
	.guangjun {
		background: url("../assets/img/icon/guangjun.png") 0 0 no-repeat;
		background-size: 100% 100%;
	}

	.jijun {
		background: url("../assets/img/icon/jijun.png") 0 0 no-repeat;
		background-size: 100% 100%;
	}

	.yajun {
		background: url("../assets/img/icon/yajun.png") 0 0 no-repeat;
		background-size: 100% 100%;
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

	.app_bot {
		font-size: 14px;
		line-height: 40px;
		color: #666;
	}

	.app_bot a {
		font-weight: 600;
	}

	.app_rank_img {
		border-radius: 3px;
		width: 40px;
		min-width: 40px;
		height: 40px;
	}

	.app_search_prefix {
		width: 70px;
		height: 40px;
		line-height: 40px;
		border: 1px solid;
		/*border: 1px solid #0C2AA4;*/
		/*background: #0C2AA4;*/
		color: #ffffff;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		margin-right: 10px;
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
		border-left: 1px solid #FFFFFF;
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
</style>
