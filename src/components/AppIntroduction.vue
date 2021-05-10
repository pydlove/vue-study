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
			<div class="fs-14" v-html="activity.content"></div>
		</el-card>

		<div class="app_bot">
			<a href="https://www.aiocloud.ltd/#/mainApp" :style="{ color: colorStyle.main, }">爱启云科技</a>提供支持
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>

    export default {
        name: "AppIntroduction",
	    props: [ "activity", "activityBanners", "colorStyle" ],
	    mounted() {
	    },
	    methods: {
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
            }
	    }
    }
</script>

<style scoped>
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