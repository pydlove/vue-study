<template>
	<!--eslint-disable-->
	<div class="ai_container" :style="{height: ( clientHeight ) + 'px'}" >
		<el-card class="ai_main" v-if="page=='main'">
			<div class="ai_tit">
				<div class="vertical_line"></div>
				<div>数据统计</div>
				<el-button class="cjhd" icon="el-icon-plus" @click="page='add'">创建活动</el-button>
			</div>
			<div class="ai_top_ct">
				<div class="ai_top_main">
					<el-avatar class="ai_avatar" :size="80" fit="fill"
					           :src="require('@/assets/img/icon/ing.png')"></el-avatar>
					<div class="ai_item">
						<div>0</div>
						<div>进行中活动</div>
					</div>
				</div>
				<div class="ai_line"></div>
				<div class="ai_top_main">
					<el-avatar class="ai_avatar1" :size="80" fit="fill"
					           :src="require('@/assets/img/icon/all.png')"></el-avatar>
					<div class="ai_item">
						<div>0</div>
						<div>全部活动</div>
					</div>
				</div>
			</div>

			<div class="ai_tit mt-20">
				<div class="vertical_line"></div>
				<div>活动管理</div>
			</div>
			<el-table class="ai_table"
			          :data="tableData"
			          stripe
			          style="width: 100%">
				<el-table-column prop="title" label="活动名称" width="400">
					<template slot-scope="scope">
						<div>
							<div class="ai_table_tit">{{ scope.row.title }}</div>
							<div class="ai_table_time">创建时间：{{ scope.row.createTime }}</div>
							<div class="ai_table_time">投票时间：{{ scope.row.startTime }} ~ {{ scope.row.endTime }}</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="活动状态">
					<template slot-scope="scope">
						<div :style="{ color: fmtStatusColor(scope.row.status) }"> {{ fmtStatus(scope.row.status) }}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="totalVotes" label="总票数"></el-table-column>
				<el-table-column prop="players" label="选手数"></el-table-column>
				<el-table-column prop="views" label="访问量"></el-table-column>
				<el-table-column prop="option" label="操作" fixed="right" width="120">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
						    <span class="el-dropdown-link">设置<i class="el-icon-arrow-down el-icon--right"></i></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="page='edit'">编 辑</el-dropdown-item>
								<el-dropdown-item >删除</el-dropdown-item>
								<el-dropdown-item divided @click.native="page='sign'">报名统计</el-dropdown-item>
								<el-dropdown-item>发布活动</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>
			<div class="tl">
				<Pagination class="page" ref="pageRef"></Pagination>
			</div>
		</el-card>

		<Add v-else-if="page=='add'" @toPage="toPage"></Add>
		<Edit v-else-if="page=='edit'" @toPage="toPage"></Edit>
		<Sign v-else-if="page=='sign'" @toPage="toPage"></Sign>
	</div>
</template>
<!--eslint-disable-->
<script>
	import Pagination from "@/components/Pagination.vue"
	import Add from "@/views/app/activity/add.vue"
	import Edit from "@/views/app/activity/edit.vue"
	import Sign from "@/views/app/activity/sign.vue"
    export default {
        name: "index",
	    components: { Pagination, Add, Edit, Sign },
        methods: {
            toPage() {
				this.page = "main";
            },

            fmtStatus(status) {
                switch (status) {
                    case "0":
                        return "未开始";
                    case "1":
                        return "进行中";
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
                    default:
                        break;
                }
            }
        },
        data() {
            return {
                clientHeight: document.body.clientHeight-2,
                page: "main",
                tableData: [
                    {
                        title: "2020年国庆中秋文艺晚会最受欢迎节目投票开始啦！等你来投",
                        status: "1",
                        totalVotes: "91042",
                        players: "16",
                        views: "109738",
                        createTime: "2021-2-24 15:26:00",
                        startTime: "2021-2-25 00:00:00",
                        endTime: "2021-3-25 00:00:00",
                    }
                ],
            }
        }
    }
</script>

<style scoped>
	.cjhd {
		background: #ef5252;
		border: 1px solid #ef5252;
		color: #ffffff;
		padding: 8px 15px;
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.page {
		margin: 20px 0;
	}
	.ai_table_time {
		color: #8c8c8c;
	}

	.ai_table_tit {
		font-size: 16px;
		color: #333333;
		line-height: 24px;
		margin-bottom: 15px;
	}

	.ai_avatar {
		padding: 15px;
		background: #fff1b8;
		margin-right: 100px;
	}

	.ai_avatar1 {
		padding: 15px;
		background: #e6f7ff;
		margin-right: 100px;
	}

	.ai_tit {
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 20px;
		padding-top: 10px;
		font-size: 18px;
		position: relative;
	}

	.vertical_line {
		height: 30px;
		width: 2px;
		background: #1890ff;
		margin-right: 10px;
	}

	.ai_item div:nth-of-type(1) {
		font-size: 38px;
		line-height: 46px;
		color: #2b90ff;
	}

	.ai_item div:nth-of-type(2) {
		font-size: 16px;
		line-height: 24px;
		color: #999;
	}

	.ai_item {
	}

	.ai_top_main {
		height: 80px;
		width: 50%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
	}

	.ai_line {
		height: 80px;
		border-left: 1px solid #eeeeee;
	}

	.ai_top_ct {
		display: flex;
		flex-wrap: nowrap;
		background: #ffffff;
		border: 1px solid #eeeeee;
		padding: 10px;
	}

	.ai_main {
		background: #ffffff;
	}

	.ai_container {
		background: #F9F9F9;
		padding: 10px;
		overflow: auto;
	}
</style>

<style>
	.el-dropdown-menu__item {
		width: 80px !important;
		text-align: center;
		border-bottom: 0px solid #eee;
	}
	.ai_table .cell {
		font-weight: 500 !important;
		color: #8c8c8c;
	}

	.ai_table .el-table__row .cell {
		color: #333333 !important;
	}

	[class*=" el-icon-"], [class^=el-icon-] {
		font-weight: 600;
	}
</style>