<template>
	<!--eslint-disable-->
	<div class="nd-container">
		<NormalHeader  @initLanguage="initLanguage"></NormalHeader>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
			<el-breadcrumb-item :to="{ path: '/home' }">
				<i class="el-icon-s-home"></i>
				{{ $t('menu.home') }}
			</el-breadcrumb-item>
			<el-breadcrumb-item>
				{{ $t('menu.observationData') }}
			</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="nd-background">
			<div class="nd-content dffn">
				<div class="aiocloud-card">
					<div :class="(type==item.type?'nd-eq-active':'') + ' nd-eq-item'"
					     v-for="(item, index) in menus" :key="index"
					     @click="selectEq(item, index)"
					>{{ item.name }}</div>
				</div>

				<div class="aiocloud-card" :style="hightType">
					<QuickView v-if="type == 0" ref="quickViewRef"></QuickView>
					<DataSearch v-if="type == 1" ref="dataSearchRef" @setTableData="setTableData"></DataSearch>
					<NewView v-if="type == 2"></NewView>
					<UseRule v-if="type == 3"></UseRule>
					<Friendly v-if="type == 4"></Friendly>
				</div>
			</div>

			<div class="aiocloud-card1" v-if="dataType">
				<div class="nd-menus">
					<div class="nd-checkbox">
						<el-radio-group v-model="label">
							<el-radio :label="0" @change="aboveAll(tableData[1], tableData[2])">{{ $t('message.AllAbove') }}</el-radio>
							<el-radio :label="1" @change="belowAll(tableData[4] , tableData[5], tableData[6])">{{ $t('message.AllBelow') }}</el-radio>
							<el-radio :label="2" @change="just">{{ $t('message.Just') }}</el-radio>
						</el-radio-group>
					</div>
					<div class="nd-select">
						<el-button @click="clear">{{ $t('message.clear') }}</el-button>
						<el-button type="primary" @click="download">{{ $t('message.Download') }}</el-button>
					</div>
				</div>

				<div class="nd-search-data">
					<el-table
							ref="table"
							:data="tableData"
							stripe
							tooltip-effect="dark"
							style="width: 100%"
							@selection-change="handleSelectionChange">
						<el-table-column
								type="selection"
								width="55">
						</el-table-column>
						<el-table-column
								show-overflow-tooltip="true"
								prop="startTime"
								label="开始时间"
								width="150">
						</el-table-column>
						<el-table-column
								show-overflow-tooltip="true"
								prop="endTime"
								label="结束时间"
								width="150">
						</el-table-column>
						<el-table-column
								show-overflow-tooltip="true"
								prop="offBand"
								width="200px"
								label="偏带">
						</el-table-column>
						<el-table-column
								show-overflow-tooltip="true"
								prop="exposureTime"
								width="200px"
								label="曝光时间">
						</el-table-column>
						<el-table-column
								show-overflow-tooltip="true"
								prop="observationWaveLength"
								width="100px"
								label="观测波长">
						</el-table-column>
						<!--<el-table-column label="操作" fixed="right" width="150px" align="center">
							<template slot-scope="scope">
								<el-button class="obd-data-btn" type="primary" size="mini" @click="lookDay(item)">
									{{ $t('message.AllDay') }}
								</el-button>
							</template>
						</el-table-column>-->
					</el-table>
				</div>
				<Pagination class="pagination" ref="pageRef" @search="search"></Pagination>
			</div>
		</div>
		<Footer></Footer>
		<DownLoad ref="downloadRef"></DownLoad>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Page from "@/components/Page";
    import Pagination from "@/components/Pagination";
    import NormalHeader from "@/components/NormalHeader";
    import Footer from "@/components/Footer";
    import QuickView from "@/views/observationData/quickView.vue";
    import NewView from "@/views/observationData/newView.vue";
    import UseRule from "@/views/observationData/useRule.vue";
    import Friendly from "@/views/observationData/friendly.vue";
    import DataSearch from "@/views/observationData/dataSearch.vue";
    import DownLoad from "@/views/observationData/download.vue";

    export default {
        name: "index",
        components: {
            UseRule,
            NormalHeader,
	        Footer,
            QuickView,
			NewView,
			UseRule,
            Friendly,
            DataSearch,
            Page,
            Pagination,
            DownLoad
        },
	    data() {
            return {
                tableData: [],
                dataType: false,
                hightType: "",
                menus: [
                    {
                        name: this.$t('message.QuickView'),
                        type: "0",
                    },
                    {
                        name: this.$t('message.DataQuery'),
                        type: "1",
                    },
                    {
                        name: this.$t('message.LatestData'),
                        type: "2",
                    },
                    {
                        name: this.$t('message.DataUsageRules'),
                        type: "3",
                    },
                ],
                menu: {
                    name: this.$t('message.QuickView'),
                    type: "0",
                },
                type: "0",
                multipleSelection: [],
                label: 2,
            }
	    },
	    mounted() {
		    this.initLanguage();
        },

	    methods: {
            initLanguage() {
                this.menus[0].name = this.$t('message.QuickView');
                this.menus[1].name = this.$t('message.DataQuery');
                this.menus[2].name = this.$t('message.LatestData');
                this.menus[3].name = this.$t('message.DataUsageRules');
                this.menus[4].name = this.$t('message.Links');
                this.$refs.quickViewRef.initLanguage();
            },

            handleSelectionChange(item){
                this.multipleSelection = item;
			},

			//下载
            download(){
                this.$refs.downloadRef.multipleSelection = this.multipleSelection;
                this.$refs.downloadRef.open();
			},

            //清除
            clear() {
                this.$refs.table.clearSelection();
            },

            //选择行以上
            aboveAll(rows) {
                /*for (let i = 0; i <= this.tableData.size; i++) {
                    if (this.multipleSelection.toString() == this.tableData[i]) {
                        let a = i;
                        console.log(a);
                        for (a; a <= this.tableData.size; a--) {
                            this.$refs.table.toggleRowSelection(this.tableData[a]);
                        }
                    }
                }*/
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.table.aboveAll(row);
                    });
                } else {
                    this.$refs.table.clearSelection();
                }
            },

            //选择行以下
            belowAll(rows) {
                console.log(this.multipleSelection);
              /*  for (let i = 0; i <= this.tableData.size; i++) {
                    if (this.multipleSelection == this.tableData[i]) {
                        let a = i;
                        console.log(a);
                        for (a; a < this.tableData.size; a++) {
                            this.$refs.table.toggleRowSelection(data[a]);
                        }
                    }
                }*/

                if (rows) {
                    rows.forEach(row => {
                        this.$refs.table.belowAll(row);
                    });
                } else {
                    this.$refs.table.clearSelection();
                }

            },

            //当前行
            just() {
                console.log(this.multipleSelection);
                this.$refs.table.toggleRowSelection(this.multipleSelection);
            },

            selectEq(item, index) {
                if(item.type == 1){
                    this.dataType = true;
                    this.hightType = "height: 300px";
                } else {
                    this.dataType =false;
                    this.hightType = "";
                }
                this.type = item.type;
                this.menu = item;
                this.$utils.setStorage("observationDataIndex", index);
            },

            /********************************** 数据查询逻辑开始 ***********************************/
            setTableData(data) {
                this.tableData = data.data;
                this.$refs.pageRef.totalCount = data.totalCount;
            },

            search(currentPage, pageSize) {
                this.$refs.dataSearchRef.search(currentPage, pageSize);
            }

            /****************************************数据查询逻辑结束**********************************************/
	    }
    }
</script>

<style scoped>

	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
		.aiocloud-card1{
			padding: 20px;
			border-radius: 5px;
			background: #ffffff;
			box-shadow: 0 2px 4px rgb(0 0 0 /12%), 0 0 6px rgb(0 0 0 /4%);
			width: 900px;
			margin: 0 auto;
			margin-top: 20px;
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
			background: #ffffff;
		}

		.nd-breadcrumb-top{
			width: 900px;
		}

		.nd-menus {
			display: flex;
			flex-wrap: nowrap;
			margin: 10px;
		}

		.nd-checkbox {
			margin-left: 10px;
			margin-top: 11px;
		}

		.nd-select {
			margin-left: 20px;
		}

	}
</style>