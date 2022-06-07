<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <NormalHeader ref="normalHeaderRef" :currentMenu="'observationData'" @initLanguage="initLanguage"></NormalHeader>
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
                    <div :class="(type==item.type?'nd-eq-active':'') + ' nd-eq-item cursor'"
                         v-for="(item, index) in menus" :key="index"
                         @click="selectEq(item, index)"
                    >{{ item.name }}
                    </div>
                </div>

                <div class="aiocloud-card" :style="hightType">
                    <QuickView v-if="type == 0" ref="quickViewRef"></QuickView>
                    <DataSearch v-if="type == 1" ref="dataSearchRef" @setTableData="setTableData"></DataSearch>
                    <NewView v-if="type == 2"></NewView>
                    <UseRule ref="useRuleRef" v-if="type == 3"></UseRule>
                    <Friendly v-if="type == 4"></Friendly>
                </div>
            </div>

            <div class="aiocloud-card1" v-if="dataType">
                <div class="nd-menus">
                    <div class="nd-checkbox">
                        <el-radio-group v-model="label">
                            <el-radio label="0" @change="aboveAll()">{{
                                $t('message.AllAbove') }}
                            </el-radio>
                            <el-radio label="1" @change="belowAll()">{{
                                $t('message.AllBelow') }}
                            </el-radio>
                            <el-radio label="2" @change="just">{{ $t('message.Just') }}</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="nd-select">
                        <el-button @click="clear">{{ $t('message.clear') }}</el-button>
                        <el-button type="primary" @click="download">{{ $t('message.Download') }}</el-button>
                    </div>
                </div>

                <div class="nd-search-data" v-if="dataType">
                    <el-table
                            ref="tableRef"
                            :data="tableData"
                            stripe
                            tooltip-effect="dark"
                            style="width: 100%"
                            @select="aiocloudHandleSelection">
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
                                prop="obsTime"
                                :label="$t('message.obsTime')"
                                width="150"
                                align="center">
                        </el-table-column>
                        <!--<el-table-column
                                show-overflow-tooltip="true"
                                prop="endTime"
                                :label="$t('message.endTime')"
                                width="100"
                                align="center">
                        </el-table-column>-->
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="offBand"
                                width="100px"
                                :label="$t('message.offBand')"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="exposureTime"
                                :label="$t('message.exposureTime')"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="observationWaveLength"
                                :label="$t('message.observationWaveLength')"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="picture"
                                :label="$t('message.image')"
                                width="150px"
                                align="center">
                            <template slot-scope="scope">
                                <el-button class="wdi-120" type="primary" plain @click="previewImage(scope.row)">
                                   {{$t('message.preview')}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                prop="video"
                                :label="$t('message.video')"
                                align="center"
                                width="150px">
                            <template slot-scope="scope">
                                <a :href="scope.row.video" target="_blank"
                                   v-if="scope.row.video !=null && scope.row.video.length > 0"
                                   :download="getName(scope.row.video)">
                                    {{$t('message.downloadObsVideo')}}
                                </a>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <Pagination class="pagination" ref="pageRef" @search="search"></Pagination>
            </div>
        </div>
        <Footer ref="footerRef"></Footer>
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
    import QuickView from "@/views/observationData/quickView.vue";
    import NewView from "@/views/observationData/newView.vue";
    import UseRule from "@/views/observationData/useRule.vue";
    import Friendly from "@/views/observationData/friendly.vue";
    import DataSearch from "@/views/observationData/dataSearch.vue";
    import DownLoad from "@/views/observationData/download.vue";
    import Preview from "@/views/observationData/previewDialog.vue";

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
            DownLoad,
            Preview
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
                label: "2",
            }
        },
        mounted() {
            let onsetPage = this.$utils.getStorage("onsetPage");
            if(onsetPage) {
                this.menu = onsetPage;
                this.type = onsetPage.type;
                if (this.type == 1) {
                    this.dataType = true;
                    this.hightType = "height: 300px; ";
                } else {
                    this.dataType = false;
                    this.hightType = "";
                }
            }
            this.initLanguage();
        },

        methods: {
            initLanguage() {
                this.menus[0].name = this.$t('message.QuickView');
                this.menus[1].name = this.$t('message.DataQuery');
                this.menus[2].name = this.$t('message.LatestData');
                this.menus[3].name = this.$t('message.DataUsageRules');
                if(this.type == 1) {
                    this.$refs.quickViewRef.initLanguage();
                }
                if(this.type == 3) {
                    this.$refs.useRuleRef.initLanguage();
                }
                this.$refs.footerRef.initLanguage();
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

            aiocloudHandleSelection(selection, row) {
                // 判断当前点击的是选中还是没选中
                let selected = selection.length && selection.indexOf(row) !== -1
                if (this.label == '2') {
                    if(!selected) {
                        this.$refs.tableRef.toggleRowSelection(row, false);
                    }
                    else {
                        this.$refs.tableRef.toggleRowSelection(row, true);
                    }
                    return;
                }
                for (let i = 0; i <= this.tableData.length - 1; i++) {
                    if (row.id == this.tableData[i].id) {
                        if (this.label == '0') {
                            for (let j = 0; j < i; j++) {
                                if(!selected) {
                                    this.$refs.tableRef.toggleRowSelection(this.tableData[j], false);
                                }
                                else {
                                    this.$refs.tableRef.toggleRowSelection(this.tableData[j], true);
                                }
                            }
                        } else if (this.label == '1') {
                            for (let j = i; j <= this.tableData.length - 1; j++) {
                                if(!selected) {
                                    this.$refs.tableRef.toggleRowSelection(this.tableData[j], false);
                                }
                                else {
                                    this.$refs.tableRef.toggleRowSelection(this.tableData[j], true);
                                }
                            }
                        }
                    }
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
                        this.multipleSelection = this.$refs.tableRef.selection;
                        if (this.multipleSelection.length > 0) {
                            this.$refs.downloadRef.open(this.multipleSelection);
                        } else {
                            this.$message($t('alert.dataSelect'));
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
            },

            //选择行以下
            belowAll() {
            },

            //当前行
            just() {
            },

            selectEq(item, index) {
                if (item.type == 1) {
                    this.dataType = true;
                    this.hightType = "height: 300px";
                } else {
                    this.dataType = false;
                    this.hightType = "";
                }
                this.type = item.type;
                this.menu = item;
                this.$utils.setStorage("observationDataIndex", index);
                this.$utils.setStorage("onsetPage", item);
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
    /*@media screen and (min-width: 768px) {*/
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

        .nd-breadcrumb-top {
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

    /*}*/
</style>