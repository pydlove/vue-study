<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <NormalHeader :currentMenu = "'chaseSatellite'" @initLanguage="initLanguage"></NormalHeader>
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
                    <div :class="(type==item.type?'nd-eq-active':'') + ' nd-eq-item'"
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
                    <DataUseRule v-if="type == 4"></DataUseRule>
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
                            ref="table"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="fitsName"
                                label="文件名称"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="startTime"
                                label="开始时间"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="endTime"
                                label="结束时间"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="target"
                                width="100px"
                                label="观测目标">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="lineSpectrum"
                                width="100px"
                                label="观测谱线">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="observationPattern"
                                width="100px"
                                label="观测模式">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="exposureTime"
                                width="100px"
                                label="曝光时间">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="coordinates"
                                width="100px"
                                label="观测坐标">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="observationBand"
                                width="100px"
                                label="观测波段">
                        </el-table-column>
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
    import DataSearch from "@/views/chaseSatellite/dataSearch.vue";
    import DataProduct from "@/views/chaseSatellite/dataProduct.vue";
    import NewData from "@/views/chaseSatellite/newData.vue";
    import AnalysisSoftware from "@/views/chaseSatellite/analysisSoftware.vue";
    import DataUseRule from "@/views/chaseSatellite/dataUseRule.vue";
    import DownLoad from "@/views/observationData/download.vue";

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
            Page,
            Pagination,
            DownLoad
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
                        name: this.$t('message.DataUseRule'),
                        type: "4",
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
                this.chaseMenus[4].name = this.$t('message.DataUseRule');
            },

            //选择一条数据 根据label触发选择行为
            handleSelectionChange(item) {
                this.multipleSelection = item;
                if(this.label == '0'){
                    console.log(0);
                    for(let i = 0; i <= this.tableData.size; i++){
                         if(this.multipleSelection[0] == this.tableData[i]){
                             let a = i ;
                             for(let b = 0; b <= a; b++){
                                this.selectData.push(this.tableData[b]);
                             }
                         }
                    }
                    this.selectData = this.multipleSelection;
                    console.log(this.selectData);
                    /*for(let i = 0; i <= this.selectData.length; i++){
                        this.$refs.table.toggleRowSelection(this.selectData[i]);
                    }*/
                } else if(this.label == '1'){
                    console.log(1);
                    for(let i = 0; i <= this.tableData.size; i++){
                        if(this.multipleSelection[0] == this.tableData[i]){
                            let a = i ;
                            for(let b = a; a <= b; b++){
                                this.selectData.push(this.tableData[b]);
                            }
                        }
                    }
                    this.selectData = this.multipleSelection;
                    console.log(this.selectData);
                   /* for(let i = 0; i < this.selectData.size; i++){
                        this.$refs.table.toggleRowSelection(this.selectData[i]);
                    }*/
                }
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
            aboveAll() {
                this.label = 0;
            },


            //选择行以下
            belowAll() {
                this.label = 1;
               /* if (rows) {
                    rows.forEach(row => {
                        this.$refs.table.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.table.clearSelection();
                }*/
            },

            //当前行
            just() {
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