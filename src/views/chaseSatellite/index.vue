<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <NormalHeader ref="normalHeaderRef" :currentMenu="'chaseSatellite'" @initLanguage="initLanguage"></NormalHeader>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
            <el-breadcrumb-item :to="{ path: '/home' }">
                <i class="el-icon-s-home"></i>
                {{ $t('menu.home') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ $t('menu.chaseSatellite') }}
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="nd-background">
            <div class="nd-content dffn">
                <div class="aiocloud-card">
                    <div :class="(type==item.type?'nd-eq-active':'') + ' nd-eq-item cursor'"
                         v-for="(item, index) in chaseMenus" :key="index"
                         @click="selectEq(item, index)"
                    >{{ item.name }}
                    </div>
                </div>

                <div class="aiocloud-card" :style="hightType">
                    <DataProduct v-if="type==0" ref="dataProductRef"></DataProduct>
                    <DataSearch v-if="type == 1" ref="dataSearchRef" @setTableData="setTableData"></DataSearch>
                    <NewData v-if="type==2"></NewData>
                    <AnalysisSoftware v-if="type==3"></AnalysisSoftware>
                    <FlareList ref="flareListRef" v-if="type == 4"></FlareList>
                    <DataUseRule ref="dataUseRuleRef" v-if="type == 5"></DataUseRule>
                </div>
            </div>
            <div class="aiocloud-card1" v-if="dataType">
                <div class="nd-menus">
                    <div class="nd-checkbox">
                        <el-radio-group v-model="label">
                            <el-radio :label="0" @change="aboveAll">{{ $t('message.AllAbove') }}</el-radio>
                            <el-radio :label="1" @change="belowAll">{{ $t('message.AllBelow') }}</el-radio>
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
                            ref="tableRef"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @select="handleSelection"
                    >
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="fitsName"
                                :label="$t('message.fitsName')"
                                width="300"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="beginTime"
                                :label="$t('message.startTime')"
                                width="120"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="endTime"
                                :label="$t('message.endTime')"
                                width="80"
                                align="center">
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--show-overflow-tooltip="true"-->
                                <!--prop="target"-->
                                <!--width="150px"-->
                                <!--:label="$t('message.ObservationTarget')"-->
                                <!--align="center">-->
                        <!--</el-table-column>-->
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="lineSpectrum"
                                width="150px"
                                :label="$t('message.LineSpectrum')"
                                align="center"
                        >
                            <template slot-scope="scope">
                                {{ fmtLine(scope.row) }}
                            </template>
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--show-overflow-tooltip="true"-->
                                <!--prop="observationPattern"-->
                                <!--width="100px"-->
                                <!--:label="$t('message.obsPattern')"-->
                                <!--align="center">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--show-overflow-tooltip="true"-->
                                <!--prop="exposureTime"-->
                                <!--width="150px"-->
                                <!--:label="$t('message.expTime')"-->
                                <!--align="center">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--show-overflow-tooltip="true"-->
                                <!--prop="coordinates"-->
                                <!--width="150px"-->
                                <!--:label="$t('message.ObsCoordinate')"-->
                                <!--align="center">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--show-overflow-tooltip="true"-->
                                <!--prop="observationBand"-->
                                <!--width="100px"-->
                                <!--:label="$t('message.obsBand')"-->
                                <!--align="center">-->
                        <!--</el-table-column>-->
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="picture"
                                :label="$t('message.image')"
                                align="center"
                                width="150px">
                            <template slot-scope="scope">
                                <el-button class="wdi-120" type="primary" plain @click="previewImage(scope.row)">
                                    {{$t('message.preview')}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--show-overflow-tooltip="true"-->
                                <!--prop="video"-->
                                <!--:label="$t('message.video')"-->
                                <!--align="center"-->
                                <!--width="150px"-->
                                <!--&gt;-->
                            <!--<template slot-scope="scope">-->
                                <!--<a :href="scope.row.video" target="_blank"-->
                                    <!--v-if="scope.row.video !=null && scope.row.video.length > 0"-->
                                   <!--:download="getName(scope.row.video)">-->
                                    <!--{{$t('message.downloadObsVideo')}}-->
                                <!--</a>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </div>
                <Pagination class="pagination" ref="pageRef" @search="search"></Pagination>
            </div>
        </div>
        <Footer></Footer>
        <DownLoad ref="downloadRef"></DownLoad>
        <Preview ref="previewRef"></Preview>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Page from "@/components/Page";
    import Pagination from "@/components/Pagination";
    import NormalHeader from "@/components/NormalHeader";
    import Footer from "@/components/Footer";
    import DataSearch from "@/views/chaseSatellite/dataSearch.vue";
    import DataProduct from "@/views/chaseSatellite/dataProduct.vue";
    import NewData from "@/views/chaseSatellite/newData.vue";
    import FlareList from "@/views/chaseSatellite/flareList.vue";
    import AnalysisSoftware from "@/views/chaseSatellite/analysisSoftware.vue";
    import DataUseRule from "@/views/chaseSatellite/dataUseRule.vue";
    import DownLoad from "@/views/observationData/download.vue";
    import Preview from "@/views/observationData/previewDialog.vue";

    export default {
        name: "index",
        components: {
            NormalHeader,
            Footer,
            DataSearch,
            DataProduct,
            NewData,
            AnalysisSoftware,
            DataUseRule,
            FlareList,
            Page,
            Pagination,
            DownLoad,
            Preview
        },

        data() {
            return {
                checkList: [],
                tableData: [],
                dataType: false,
                hightType: "",
                chaseMenus: [
                    {
                        name: this.$t('message.DataProduct'),
                        type: "0",
                    },
                    {
                        name: this.$t('message.DataSearch'),
                        type: "1",
                    },
                    {
                        name: this.$t('message.NewData'),
                        type: "2",
                    },
                    {
                        name: this.$t('message.AnalysisSoftware'),
                        type: "3",
                    },
                    {
                        name: this.$t('message.FlareList'),
                        type: "4",
                    },
                    {
                        name: this.$t('message.DataUseRule'),
                        type: "5",
                    },
                ],
                chaseMenu: {
                    name: this.$t('message.DataProduct'),
                    type: "0",
                },
                type: "0",
                multipleSelection: [],
                label: 2,
                selectData: [],
            }
        },

        mounted() {
            this.initLanguage();
        },

        methods: {
            initLanguage() {
                this.chaseMenus[0].name = this.$t('message.DataProduct');
                this.chaseMenus[1].name = this.$t('message.DataSearch');
                this.chaseMenus[2].name = this.$t('message.NewData');
                this.chaseMenus[3].name = this.$t('message.AnalysisSoftware');
                this.chaseMenus[4].name = this.$t('message.FlareList');
                this.chaseMenus[5].name = this.$t('message.DataUseRule');
                if(this.type == 0) {
                    this.$refs.dataProductRef.initLanguage();
                }
                if(this.type == 5) {
                    this.$refs.dataUseRuleRef.initLanguage();
                }
            },
            fmtLine(row){
                var observationWaveLength = row.observationWaveLength;
                if(observationWaveLength == '6562.82'){
                    return 'Hα';
                }
                if(observationWaveLength == '6569.22'){
                    return 'Fe';
                }
            },
            previewImage(row){
                this.$refs.previewRef.open(row);
            },

            getName(url){
                if(url != null && url != "" && url != undefined){
                    var fileName = url.substring(url.lastIndexOf("/") + 1);
                    return fileName;
                }
            },

            handleSelection(selection, row) {
                if (this.label == '0') {
                    for (let i = 0; i <= this.tableData.length - 1; i++) {
                        if (row.id == this.tableData[i].id) {
                            for (let j = 0; j < i; j++) {
                                this.$refs.tableRef.toggleRowSelection(this.tableData[j]);
                            }
                        }
                    }
                } else if (this.label == '1') {
                    for (let i = 0; i <= this.tableData.length - 1; i++) {
                        if (row.id == this.tableData[i].id) {
                            for (let j = i; j <= this.tableData.length - 1; j++) {
                                this.$refs.tableRef.toggleRowSelection(this.tableData[j]);
                            }
                        }
                    }
                    this.$refs.tableRef.toggleRowSelection(row);
                }
            },

            //下载
            download() {
                this.getUserInfo();
            },

            async getUserInfo() {
                let params = new FormData();
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_login_getUser, params, "POST");
                if (data.code == 200) {
                    let res = data.data;
                    if (!res.isLogin) {
                        this.$refs.normalHeaderRef.toLogin();
                    } else {
                        this.multipleSelection =  this.$refs.tableRef.selection;
                        if (this.multipleSelection.length > 0) {
                            this.$refs.downloadRef.open(this.multipleSelection);
                        } else {
                            this.$message(this.$t('alert.dataSelect'));
                        }
                    }
                    return true;
                }
            },

            //清除
            clear() {
                this.$refs.tableRef.clearSelection();
            },

            //选择行以上
            aboveAll() {
                this.selectData.length = 0;
                this.label = 0;
            },


            //选择行以下
            belowAll() {
                this.selectData.length = 0;
                this.label = 1;
            },

            //当前行
            just() {
                this.selectData.length = 0;
                this.$refs.table.toggleRowSelection(this.multipleSelection);
            },


            selectEq(item, index) {
                if (item.type == 1) {
                    this.dataType = true;
                    this.hightType = "height: 300px; ";
                } else {
                    this.dataType = false;
                    this.hightType = "";
                }
                this.type = item.type;
                this.menu = item;
                this.$utils.setStorage("chaseSatelliteIndex", index);
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
        },

    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {

        .aiocloud-card1 {
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

        .nd-breadcrumb-top {
            width: 900px;
        }
    }
</style>