<template>
	<!--eslint-disable-->
	<div>
		<el-card class="app_main_card">
			<div slot="header" class="aa_return" @click="toMainPage">
				<i class="el-icon-arrow-left"></i>
				<div>
					返回活动管理
				</div>
			</div>

			<el-table
					class="as_table"
					:data="tableData"
					stripe
					style="width: 100%">
				<el-table-column prop="id" label="编号"></el-table-column>
				<el-table-column prop="author" label="作品">
					<template slot-scope="scope">
						<el-image style="width: 40px;height: 40px;" :src="scope.row.imgs[0]" fit="fill"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="author" label="选手"></el-table-column>
				<el-table-column prop="age" label="年龄"></el-table-column>
				<el-table-column prop="rank" label="排名"></el-table-column>
				<el-table-column prop="votes" label="票数"></el-table-column>
				<el-table-column prop="option" label="操作" fixed="right" width="120">
					<template slot-scope="scope">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link"><i class="el-icon-more"></i></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>作品详情</el-dropdown-item>
								<el-dropdown-item>投票日志</el-dropdown-item>
								<el-dropdown-item>礼物日志</el-dropdown-item>
								<el-dropdown-item>修改票数</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>

			<Pagination class="page" ref="pageRef"></Pagination>
		</el-card>
	</div>
</template>
<!--eslint-disable-->
<script>
	import Pagination from "@/components/Pagination.vue"

    export default {
        name: "sign",
	    components: { Pagination },
	    methods: {
            toMainPage() {
                this.$emit("toPage", "main");
            }
	    },
	    data() {
            return {
                tableData: [
                    {
                        id: "1",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 1,
                        votes: 12530,
                    },
                    {
                        id: "2",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 2,
                        votes: 10235,
                    },
                    {
                        id: "3",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 3,
                        votes: 9823,
                    },
                    {
                        id: "4",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 4,
                        votes: 9725,
                    },
                    {
                        id: "5",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 5,
                        votes: 9023,
                    },
                    {
                        id: "6",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 6,
                        votes: 8925,
                    },
                    {
                        id: "7",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 7,
                        votes: 8826,
                    },
                    {
                        id: "8",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 8,
                        votes: 8236,
                    },
                    {
                        id: "9",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 9,
                        votes: 8162,
                    },
                    {
                        id: "10",
                        imgs: [
                            require('@/assets/img/icon/nopeople.jpg')
                        ],
                        name: "我为祖国献石油",
                        author: "徐腾",
                        age: "38",
                        rank: 10,
                        votes: 7230,
                    },
                ]
            }
	    }
    }
</script>

<style scoped>
	.el-icon-more {
		font-size: 16px;
		color: #666;
	}
	.el-icon-arrow-left {
		font-size: 18px;
		margin-right: 10px;
	}
	.aa_return {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
		font-size: 16px;
	}
	.aa_return:hover {
		color: #2b90ff;
	}
	.page {
		margin: 20px 0px;
		text-align: left;
	}
</style>