<template>
	<!--eslint-disable-->
	<div class="nd-container">
		<NormalHeader :currentMenu="'observeDevice'" @initLanguage="initLanguage"></NormalHeader>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
			<el-breadcrumb-item :to="{ path: '/home' }">
				<i class="el-icon-s-home"></i>
				{{ $t('menu.home') }}
			</el-breadcrumb-item>
			<el-breadcrumb-item>
				{{ $t('menu.observationEquipment') }}
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="nd-background">
			<div class="nd-content dffn">
				<div class="aiocloud-card">
					<div :class="(type==item.type?'nd-eq-active':'') + ' nd-eq-item'"
					     v-for="(item, index) in equipments" :key="index"
						@click="selectEq(item, index)"
					>{{ item.name }}</div>
				</div>

				<div>
					<div :class="(index%2 == 0?'mr-10':'') + ' aiocloud-card nd-obd-item'"
					         v-for="(item, index) in this.tableData" :key="index">
						<el-image
								@click="lookDetail(item)"
								class="nd-picture"
								:src="item.picture"
						></el-image>
						<div v-if="language == 'zh'" class="nd-list-title" @click="lookDetail(item, index)">
							<p>{{item.title }}</p>
						</div>
						<div v-else-if="language == 'en'" class="nd-list-title" @click="lookDetail(item, index)">
							<p>{{item.enTitle }}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="nd-breadcrumb-top">
				<Page v-if="this.client" class="page" ref="pageRef" @search="search"></Page>
				<Pagination style="text-align: center" v-else class="pagination" ref="pageRef" @search="search"></Pagination>
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
        name: "index",
        components: {NormalHeader, Footer, Page, Pagination},
        mounted() {
            this.initLanguage();
            let observeDeviceIndex = this.$utils.getStorage("observeDeviceIndex");
            if(observeDeviceIndex != undefined) {
                this.equipment = this.equipments[observeDeviceIndex];
                this.type = this.equipment.type;
            }
            this.initDataList();
        },

        methods: {
            initLanguage() {
	            this.equipments[1].name = this.$t('message.CHASESatellite');
	            this.equipments[2].name = this.$t('message.OnsetSatellite');
	            this.equipments[3].name = this.$t('message.WEHOTSatellite');
	            this.equipments[0].name = this.$t('message.EquipmentDetail');
	            this.language = this.$i18n.locale;
            },

            selectEq(item, index) {
				this.type = item.type;
				this.equipment = item;
                this.$utils.setStorage("observeDeviceIndex", index);
                this.initDataList();
            },

            lookDetail(item, index) {
                this.$utils.setStorage("observeDeviceDetail", item);
                let routeData = this.$router.resolve({
                    path: "/observeDeviceDetail",
                    query: {
                        index: index,
                    }
                });
                window.open(routeData.href, '_blank');
            },

            async initDataList() {
                let params = new FormData();
                params.append("type", this.type);
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_nd_observation_equipment_searchAll, params, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    console.log(this.tableData)
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },
        },

        data() {
            return {
                language: "zh",
                equipment: {
                    name: this.$t('message.CHASESatellite'),
                    type: "1",
                },
                equipments: [
	                {
	                    name: this.$t('message.CHASESatellite'),
		                type: "1",
	                },
                    {
                        name: this.$t('message.OnsetSatellite'),
                        type: "2",
                    },
                    {
                        name: this.$t('message.WEHOTSatellite'),
                        type: "3",
                    },
                    {
                        name: this.$t('message.OtherEquipment'),
                        type: "0",
                    }
                ],
                type: "1",
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                clientWidth: document.body.clientWidth,
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

		.nd-content >div:nth-of-type(1) {
			width: 200px;
			min-width: 200px;
			height: 300px;
			margin-right: 20px;
		}

		.nd-content >div:nth-of-type(2) {
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
			width: 375px;
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