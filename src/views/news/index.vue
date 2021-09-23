<template>
	<!--eslint-disable-->
	<div class="nd-container">
		<NormalHeader :currentMenu="'newsAndResource'"  @initLanguage="initLanguage"></NormalHeader>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
			<el-breadcrumb-item :to="{ path: '/home' }">
				<i class="el-icon-s-home"></i>
				{{ $t('menu.home') }}
			</el-breadcrumb-item>
			<el-breadcrumb-item>
				{{ $t('menu.newsResources') }}
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="nd-background">
			<div class="dffn nd-news-main">
				<div class="nd-news-resource">
					<div class="nd-news-resource-list">
						{{ $t('menu.newsResources') }}
					</div>
					<div class="nd-new-title-desc">
						[{{ $t('message.newsDesc') }}] <br>
					</div>
				</div>

				<div class="nd-news-list">
					<div class="nd-list dffn" v-for="(item, index) in this.tableData" :key="index">
						<el-image
								class="nd-picture"
								:src="item.picture"
								:preview-src-list="[item.picture]"
						></el-image>
						<div class="nd-list-title">
							<p v-if="language == 'zh'"  @click="lookDetail(item)">{{ item.title }}</p>
							<p v-else-if="language == 'en'"  @click="lookDetail(item)">{{ item.enTitle }}</p>
							<p class="dffn-ac">
								<i class="el-icon-alarm-clock"></i>
								{{item.createTime}}
							</p>
						</div>
						<el-button type="primary" size="mini" class="nd-see-detail" @click="lookDetail(item)">
							{{ $t('message.ViewNews') }}
						</el-button>
					</div>
				</div>

			</div>

			<div class="nd-breadcrumb-top">
				<Page v-if="this.client" class="page" ref="pageRef" @search="search"></Page>
				<Pagination v-else class="pagination" ref="pageRef" @search="search"></Pagination>
			</div>

		</div>
		<Footer></Footer>
	</div>
</template>
<!--eslint-disable-->
<script>
    import NormalHeader from "@/components/NormalHeader";
    import Footer from "@/components/Footer";
    import Page from "@/components/Page";
    import Pagination from "@/components/Pagination";

    export default {
        name: "newsAndResource",
        components: {NormalHeader, Footer, Page, Pagination},
        mounted() {
            this.initLanguage();
            if (this.clientWidth < 500) {
                this.client = true;
            }
            this.search(1, 10);
        },

        filters: {
            ellipsis(value) {
                if (!value) return '';
                if (value.length > 100) {
                    return value.slice(0, 100) + '...'
                }
                return value
            }
        },

        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
            },

            lookDetail(item) {
                this.$utils.setStorage("newsDetail", item);
                let routeData = this.$router.resolve({
                    path: "/newsDetail",
                });
                window.open(routeData.href, '_blank');
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData();
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("title", this.title);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_new_and_resource_searchAll, params, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },
        },

        data() {
            return {
                title: "",
                client: false,
                status: true,
                status1: false,
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                clientWidth: document.body.clientWidth,
                language: "zh",
            }
        }
    }
</script>

<style scoped>

	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {

		.nd-news-main {
			width: 900px;
			margin: 0 auto;
		}

		img {
			border-style: none;
			width: 210px;
			height: 306px;
			margin-left: 20px;
			text-align: center;
		}

		.nd-title div:nth-of-type(1) {
			font-size: 32px;
		}

		.nd-title div:nth-of-type(2) {
			font-size: 18px;
			margin-top: 10px;
		}

		.nd-news-list {
			width: calc(100% - 270px);
		}

		.nd-news-resource {
			text-align: left;
			width: 250px;
			min-width: 250px;
			height: 600px;
			padding: 20px;
			margin-right: 20px;
			border-radius: 5px;
			background: #ffffff;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

		}

		.nd-news-resource-list {
			font-size: 16px;
			font-family: SC-Bold;
			color: #fa541c;
		}

		.nd-new-title-desc {
			line-height: 22px;
			color: #333333;
			font-size: 16px;
			margin-top: 20px;
		}

		.nd-list {
			padding: 20px;
			margin-bottom: 10px;
			border-radius: 5px;
			background: #ffffff;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
			position: relative;
		}

		.nd-picture {
			width: 120px;
			height: 70px;
			min-width: 120px;
			min-height: 80px;
			margin-right: 20px;
		}
		.el-icon-alarm-clock {
			margin-right: 5px;
		}

		.nd-list-title > p:nth-of-type(1) {
			line-height: 45px;
			font-size: 16px;
			color: #333333;
			text-align: left;
		}


		.nd-list-title > p:nth-of-type(1):hover{
			color: #fa541c;
		}
		.nd-list-title > p:nth-of-type(2) {
			line-height: 24px;
			font-size: 14px;
			color: #888888;
			justify-content: flex-start;
		}

		.nd-see-detail {
			position: absolute;
			bottom: 20px;
			right: 20px;
		}

		.pagination {
			margin-top: 20px;
			text-align: right;
		}
	}

	/*媒体查询（手机）*/
	@media screen and (max-width: 768px) {

		.nd-card {
			width: 375px;
			background: white;
			background: #f0f0f0;
		}

		.nd-list-top {
			width: 900px;
			margin: 0 auto;
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

		.nd-lists {
			position: absolute;
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


	}
</style>