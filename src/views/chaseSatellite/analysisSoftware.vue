<template>
    <!--eslint-disable-->
    <div class="nd-wehost">
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
                                <div class="dffn-ac-jc">
                                    <!--<div style="margin-right: 10px">Windows</div>-->
                                    <!--<div style="margin-right: 10px">MAC</div>-->
                                    <!--<div style="margin-right: 10px">Linux</div>-->
                                    <a class="cursor mr-10" :href="scope.row.windowsUrl">Windows</a>
                                    <a class="cursor mr-10" :href="scope.row.macUrl">MAC</a>
                                    <a class="cursor" :href="scope.row.linuxUrl">Linux</a>
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
                                <div class="dffn-ac-jc">
                                    <a class="cursor mr-10" :href="scope.row.windowsUrl">Windows</a>
                                    <a class="cursor mr-10" :href="scope.row.macUrl">MAC</a>
                                    <a class="cursor" :href="scope.row.linuxUrl">Linux</a>
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
            this.searchData(1,10);
            this.initLanguage();
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
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
                    if(this.tableData != null && this.tableData.length > 0) {
                        this.form = this.tableData[0];
                        console.log( this.form)
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