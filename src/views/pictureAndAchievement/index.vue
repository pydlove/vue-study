<template>
	<!--eslint-disable-->
	<div class="nd-container">
		<NormalHeader :currentMenu="'pictureAndAchievement'"  @initLanguage="initLanguage"></NormalHeader>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
			<el-breadcrumb-item :to="{ path: '/home' }">
				{{ $t('menu.home') }}
			</el-breadcrumb-item>
			<el-breadcrumb-item>
				{{ $t('menu.galleryAchievement') }}
			</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="nd-background">
			<div class="nd-content dffn">
				<div class="aiocloud-card">
					<div :class="(type==item.type?'nd-eq-active':'') + ' nd-eq-item'"
					     v-for="(item, index) in images" :key="index"
					     @click="selectEq(item, index)">{{ item.name }}
					</div>
				</div>

				<div v-if="this.type == '0'">
					<div :class="(index%2 == 0?'mr-10':'') + ' aiocloud-card nd-obd-item'"
					     v-for="(item, index) in tableData" :key="index">
						<el-image class="nd-picture" :src="item.picture"
						          :preview-src-list="[item.picture]"></el-image>
						<div class="nd-list-title">
							<p v-if="language == 'zh'" class="myCards">{{item.title }}</p>
							<p v-else-if="language == 'en'" class="myCards">{{item.enTitle }}</p>
						</div>
					</div>
				</div>

				<div v-else>
					<div :class="(index%2 == 0?'mr-10':'') + ' aiocloud-card nd-obd-item'"
					     v-for="(item, index) in tableData" :key="index">
						<AiocloudVideo class="nd-picture"
									   :sources="[{type: 'video/mp4', src: baseUrl + item.video}]">
						</AiocloudVideo>
						<div class="nd-list-title">
							<p v-if="language == 'zh'" class="myCards">{{item.title }}</p>
							<p v-else-if="language == 'en'" class="myCards">{{item.enTitle }}</p>
						</div>

					</div>
				</div>

			</div>
			<div class="nd-breadcrumb-top">
				<Pagination class="pagination" ref="pageRef" @search="search"></Pagination>
			</div>
		</div>
		<Videos ref="videosRef" @search="search"></Videos>
		<Footer></Footer>
	</div>
</template>
<!--eslint-disable-->
<script>
    import NormalHeader from "@/components/NormalHeader.vue";
    import Footer from "@/components/Footer";
    import Pagination from "@/components/Pagination";
    import AiocloudVideo from "@/components/AiocloudVideo";
    import Videos from "@/views/pictureAndAchievement/videos.vue";

    export default {
        name: "index",
        components: {NormalHeader, Footer, Pagination, AiocloudVideo, Videos},
        data() {
            return {
                baseUrl: "",
                language: "zh",
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                sources: [
                    {
                        type: "video/mp4",
                        src: " ",
                    }
                ],
                type: "0",
                image: {
                    name: this.$t('message.beautifulImage'),
                    type: "0",
                },
                images: [
                    {
                        name: this.$t('message.beautifulImage'),
                        type: "0",
                    },
                    {
                        name: this.$t('message.beautifulVideo'),
                        type: "1",
                    }
                ],
            }
        },
        mounted() {
            this.baseUrl = this.$aiocUrl.baseUrl;

            this.initLanguage();
            const imageIndex = this.$utils.getStorage("imageIndex");
            if(imageIndex != undefined) {
                this.image = this.images[imageIndex];
                this.type = this.image.type;
            }
            this.search(1, 10);
        },
        methods: {

            videos(row) {
                this.$refs.videosRef.form = {
                    video: row.video,
                };
                this.$refs.videosRef.open();
            },

            initLanguage() {
                this.images[0].name = this.$t('message.beautifulImage');
                this.images[1].name = this.$t('message.beautifulVideo');
                this.language = this.$i18n.locale;
            },

            selectEq(item, index) {
                this.type = item.type;
                this.image = item;
                this.$utils.setStorage("imageIndex", index);
                this.search(1, 10);
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let param = new FormData();
                param.append("page", this.currentPage);
                param.append("limit", this.pageSize);
                if(this.type == '0'){
                    let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_nd_gallery_achievement_searchList, param, "POST");
                    if (data.code == 200) {
                        this.tableData = data.data;
                        this.$refs.pageRef.totalCount = data.totalCount;
                        return true;
                    }
                } else if (this.type == '1'){
                    let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_nd_gallery_video_searchList, param, "POST");
                    if (data.code == 200) {
                        this.tableData = data.data;
                        console.log(this.tableData);
                        this.$refs.pageRef.totalCount = data.totalCount;
                        return true;
                    }
                }
            },
        },
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