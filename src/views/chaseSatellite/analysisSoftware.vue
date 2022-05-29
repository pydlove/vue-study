<template>
    <!--eslint-disable-->
    <div class="nd-wehost">
        <NormalHeader ref="normalHeaderRef" :currentMenu="'chaseSatellite'" @initLanguage="initLanguage"></NormalHeader>
        <!--<van-empty image="search" :description="$t('message.underConstruction')"/>-->
        <div class="aiocloud-card1">
            <div class="nd-search-data">
                <div class="nd-policy" v-if="language == 'zh'">
                    <el-table
                            ref="tableRef"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @select="handleSelection"
                    >
                        <el-table-column
                                show-overflow-tooltip="true"
                                :label="$t('message.softwareName')"
                                width="300"
                                align="center">
                            <template slot-scope="scope">
                                <div v-html="scope.row.title"></div>
                                <div style="display: flex;text-align: center">
                                    <div style="margin-right: 10px">Windows</div>
                                    <div style="margin-right: 10px">MAC</div>
                                    <div style="margin-right: 10px">Linux</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                :label="$t('message.softwareIntroduction')"
                                width="300"
                                align="center">
                            <template slot-scope="scope">
                                <div v-html="scope.row.content"></div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="nd-policy" v-else-if="language == 'en'">
                    <el-table
                            ref="tableRef"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @select="handleSelection"
                    >
                        <el-table-column
                                show-overflow-tooltip="true"
                                :label="$t('message.softwareName')"
                                width="300"
                                align="center">
                            <template slot-scope="scope">
                                <div v-html="scope.row.enTitle"></div>
                                <div style="display: flex;text-align: center">
                                    <div style="margin-right: 10px">Windows</div>
                                    <div style="margin-right: 10px">MAC</div>
                                    <div style="margin-right: 10px">Linux</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                show-overflow-tooltip="true"
                                :label="$t('message.softwareIntroduction')"
                                width="300"
                                align="center">
                            <template slot-scope="scope">
                                <div v-html="scope.row.enContent"></div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="nd-policy" v-if="language == 'zh'">
            <div v-html="form.content"></div>
        </div>
        <div class="nd-policy" v-else-if="language == 'en'">
            <div v-html="form.enContent"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "analysisSoftware",
        data() {
            return {
                language: "",
                currentPage: 1,
                pageSize: 10,
                tableData: [],
                form: {
                    title:"",
                    enTitle:"",
                    content: "",
                    enContent: "",
                }
            }
        },
        mounted() {
            this.initLanguage();
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
                this.searchData(1,10);
            },
            async searchData(currentPage, pageSize) {
                this.pageSize = pageSize;
                this.currentPage = currentPage;
                let params = new FormData();
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_nd_software_searchListByType, params, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    console.log(this.tableData)
                    if(this.tableData != null && this.tableData.length > 0) {
                        this.form = this.tableData[0];
                    }
                    return true;
                }
            },
        }
    }
</script>

<style scoped>

</style>
<style>
    .el-soft {
        font-size: 16px;
        margin-top: 20px;
        display: flex;
        flex-wrap: nowrap;
    }
    .nd-soft-div {
        margin-right: 10px;
    }
</style>