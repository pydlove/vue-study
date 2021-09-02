<template>
	<!--eslint-disable-->
	<div class="nd-container">
		<NormalHeader :currentMenu="'pictureAndAchievement'"></NormalHeader>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>图片与成果</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="nd-background">
			<div class="nd-content dffn">
				<div class="aiocloud-card">
					<div :class="(type==item.type?'nd-eq-active':'') + ' nd-eq-item'"
					     v-for="(item, index) in equipments" :key="index"
					     @click="selectEq(item)">{{ item.name }}
					</div>
				</div>

				<div v-if="this.pictureStyle">
					<div :class="(index%2 == 0?'mr-10':'') + ' aiocloud-card nd-obd-item'"
					     v-for="(item, index) in this.tableData" :key="index">
						<el-image class="nd-picture" :src="item.picture"
						          :preview-src-list="[item.picture]"></el-image>
						<div class="nd-list-title">
							<p class="myCards">{{item.title }}</p>
						</div>
					</div>
				</div>

				<div v-else>
					<div :class="(index%2 == 0?'mr-10':'') + ' aiocloud-card nd-obd-item'"
					     v-for="(item, index) in this.tableData" :key="index">
						<el-image class="nd-picture" :src="item.video"
						          :preview-src-list="[item.video]"></el-image>
						<div class="nd-list-title" @click="lookDetail(item)">
							<p class="myCards">{{item.title }}</p>
						</div>
					</div>
				</div>

			</div>
			<div class="nd-breadcrumb-top">
				<Page v-if="this.client" class="page" ref="pageRef" @search="search"></Page>
				<Pagination style="text-align: center" v-else class="pagination" ref="pageRef"
				            @search="search"></Pagination>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>
<!--eslint-disable-->
<script>
    import NormalHeader from "@/components/NormalHeader.vue";
    import Footer from "@/components/Footer";
    import Page from "@/components/Page";
    import Pagination from "@/components/Pagination";

    export default {
        name: "index",
        components: {NormalHeader, Footer, Page, Pagination},
        mounted() {
            this.initPictureData();
        },
        methods: {

            selectEq(item) {
                this.type = item.type;
                this.menu = item;
                if(this.type == '0'){
                    this.initPictureData();
				} else if (this.type == '1'){
                    this.initVideoData();
				}
            },

            async initPictureData() {
                this.pictureStyle = true;
                let param = new FormData();
                param.append("page", this.currentPage);
                param.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_nd_gallery_achievement_searchList, param, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            async initVideoData() {
                this.pictureStyle = false;
                let param = new FormData();
                param.append("page", this.currentPage);
                param.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_nd_gallery_video_searchList, param, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

        },

        data() {
            return {
                pictureStyle: true,
                type: "0",
                title: "",
                client: false,
                status: true,
                status1: false,
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                clientWidth: document.body.clientWidth,

                equipments: [
                    {
                        name: "精美图片",
                        type: "0",
                    },
                    {
                        name: "精美视频",
                        type: "1",
                    }
                ],
            }
        }

    }
</script>

<style scoped>

	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
		.nd-eq-active {
			color: #fa541c !important;
		}

		.nd-eq-item {
			line-height: 40px;
			font-family: SC-Bold;
			font-size: 16px;
			color: #333333;
		}

		.nd-eq-item:hover {
			color: #fa541c;
		}

		.nd-obd-item {
			width: calc(50% - 5px);
			margin-bottom: 10px;
		}

		.nd-content > div:nth-of-type(1) {
			width: 200px;
			min-width: 200px;
			height: 300px;
			margin-right: 20px;
		}

		.nd-content > div:nth-of-type(2) {
			width: calc(100% - 220px);
			display: flex;
			flex-wrap: wrap;
		}

		.nd-title div:nth-of-type(1) {
			font-size: 32px;
		}

		.nd-title div:nth-of-type(2) {
			font-size: 18px;
			margin-top: 10px;
		}

		.nd-list-title > p {
			margin-top: 10px;
			font-size: 14px;
			text-align: left;
			padding-left: 10px;
		}

		.nd-list-title > p:hover {
			color: #fa541c;
			text-decoration: underline;
		}

		.nd-picture {
			width: 100%;
			height: 280px;
		}

		.pagination {
			margin-top: 20px;
			text-align: right;
		}

	}

	/*媒体查询（手机）*/
	@media screen and (max-width: 768px) {

		.nd-card {
			width: 300px;
			background: white;
			background: #f0f0f0;
		}

		.nd-list-top {
			margin-left: 10px;
			line-height: 2;
		}

		.nd-news-list {
			position: relative;
			width: 100%;
		}

		.myCard {
			width: 100%;
		}

		.nd-list {
			margin-top: 10px;
			position: relative;
			margin-left: 10px;
			margin-right: 10px;
			height: 100px;
		}

		.nd-picture {
			width: 80px;
			height: 60px;
		}

		.nd-list-title {
			margin-left: 20px;
		}

		.pagination {
			margin-top: 20px;
			text-align: right;
		}

		.myCards {
			width: 200px;
			margin-top: 10px;
			font-size: 5px;
			text-align: left;
			margin-left: 68px;
		}

		.myCards1 {
			width: 150px;
			margin-top: 5px;
			font-size: 5px;
			text-align: left;
			margin-left: 68px;
		}
	}
</style>