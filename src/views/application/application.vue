<template>
    <!--eslint-disable-->
    <div>
        <el-form class="search-form"
                 ref="searchform"
                 :model="searchform"
                 :inline="true"
                 :validate-on-rule-change="false"
                 :label-width="labelWidth"
                 label-position="right">
            <el-form-item :label="$t('message.ObservationDate')" prop="fitsDates">
                <el-date-picker
                        size="small"
                        v-model="searchform.fitsDates"
                        type="datetimerange"
                        :range-separator="$t('message.to')"
                        format="yyyy-MM-dd HH:mm:SS"
                        :start-placeholder="$t('message.startDate')"
                        :end-placeholder="$t('message.endDate')"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item :label="$t('message.OrderStatus')" prop="name">
                <el-select size="small" v-model="searchform.status" :placeholder="$t('message.OrderStatusPlaceholder')">
                    <el-option :label="$t('message.UnderReview')" value="0"></el-option>
                    <el-option :label="$t('message.ReviewCompleteds')" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="$t('message.Instruments')" prop="instruments">
                <el-select size="small" v-model="searchform.instruments"
                           :placeholder="$t('message.instrumentsPlaceholder')">
                    <el-option :label="$t('OnSet')" value="0"></el-option>
                    <el-option :label="$t('WeHost')" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="$t('message.AuditResults')" prop="result">
                <el-select size="small" v-model="searchform.result"
                           :placeholder="$t('message.AuditResultsPlaceholder')">
                    <el-option :label="$t('Rejected')" value="0"></el-option>
                    <el-option :label="$t('Approved')" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-button class="ml-5 aioc-btn1" type="primary" icon="el-icon-search" size="small"
                       @click="search(0, 10)">
                {{ $t('message.Search') }}
            </el-button>
            <el-button class="ml-5" icon="el-icon-refresh" size="small" @click="reseta">
                {{ $t('message.Reset') }}
            </el-button>
            <el-button class="aioc-btn1" type="primary" icon="el-icon-plus" size="small"
                       @click="add">{{ $t('message.Add') }}
            </el-button>
        </el-form>

        <el-table
                border
                ref="codeTable"
                :data="tableData"
                @selection-change='onTableSelectChange'
                @row-click='tableRowClick'
                @cell-dblclick='seeDetail'
                :row-style="{height:'20px'}"
                :cell-style="{padding:'9px 1px'}"
        >
            <el-table-column prop="tradeNo" :label="$t('message.TraderNo')" :show-overflow-tooltip="true" align="center"></el-table-column>
            <el-table-column prop="instruments" :label="$t('message.Instruments')" :show-overflow-tooltip="true" width="140" align="center"></el-table-column>
            <el-table-column prop="status" :label="$t('message.OrderStatus')" :show-overflow-tooltip="true" width="140" align="center">
                <template slot-scope="scope">
                    {{ scope.row.status == "0" ? $t('message.UnderReview'):$t('message.ReviewCompleteds') }}
                </template>
            </el-table-column>
            <el-table-column prop="content" :label="$t('message.content')" :show-overflow-tooltip="true" align="center"></el-table-column>
            <el-table-column prop="obsDate" :label="$t('message.obsDate')" :show-overflow-tooltip="true" align="center"></el-table-column>
            <el-table-column prop="obsTime" :label="$t('message.obsTime')" :show-overflow-tooltip="true" align="center">
                <template slot-scope="props">
                    <div>
                        {{ props.row.startTime }}-{{ props.row.endTime }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="result" :label="$t('message.AuditResults')" :show-overflow-tooltip="true" align="center" width="120">
                <template slot-scope="scope">
                    {{ fmtResutl(scope.row.result) }}
                </template>
            </el-table-column>
            <el-table-column prop="opinion" :label="$t('message.Opinion')" :show-overflow-tooltip="true" align="center" width="120"></el-table-column>

            <!--<el-table-column :label="$t('message.Operate')" fixed="right" width="150" align="center">-->
            <!--&lt;!&ndash;          <el-button class="aioc-btn1" type="primary" size="mini" @click="editRow(scope.row)"> {{ $t('message.Edit') }}&ndash;&gt;-->
            <!--&lt;!&ndash;          </el-button>&ndash;&gt;-->
            <!--<template slot-scope="scope">-->
            <!--<el-button-->
            <!--v-if="scope.row.result == 1"-->
            <!--v-aiocp="['d']"-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="deleteRow(scope.$index, scope.row)">-->
            <!--{{ $t('message.Download') }}-->
            <!--</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
        </el-table>
        <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        <Add ref="addRef" @search="search"></Add>
        <Edit ref="editRef" @search="search"></Edit>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/application/add";
    import Edit from "@/views/application/edit";
    import LoginDialog from "@/views/login/loginDialog.vue"


    export default {
        name: "application",
        components: {
            Pagination, Add, Edit, LoginDialog
        },
        data() {
            return {
                tableData: [],
                searchform: {
                    status: "",
                    fitsDates: "",
                    result: "",
                    instruments: "",
                },
                pageSize: 10,
                totalAcCount: 0,
                labelWidth: '100px',
            }
        },
        mounted() {
            this.search(1, 10);
            // this.initLanguage();
        },
        methods: {
            // initLanguage() {
            //     if(this.$i18n.locale == 'zh') {
            //         this.labelWidth = '80px';
            //     }
            //     else if(this.$i18n.locale == 'en') {
            //         this.labelWidth = '100px';
            //     }
            // },

            add() {
                this.getUserInfo();
            },

            async getUserInfo() {
                let params = new FormData();
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_login_getUser, params, "POST");
                if (data.code == 200) {
                    let res = data.data;
                    console.log(res);
                    if (res.isLogin) {
                        console.log(1);
                        this.$refs.addRef.open();
                    } else {
                        this.$emit("getUserInfo");
                    }
                }
            },

            //编辑
            editRow(row) {
                this.$refs.editRef.form = {
                    id: row.id,
                    tradeNo: row.tradeNo,
                    userId: row.userId,
                    content: row.content,
                    status: row.status,
                    updateTime: row.updateTime,
                    instruments: row.instruments,
                    remark: row.remark,
                    obsDate: row.obsDate,
                    startTime: row.startTime,
                    endTime: row.endTime,
                };
                this.$refs.editRef.open();
            },

            async search(currentPage, pageSize) {
                let params = new FormData();
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_login_getUser, params, "POST");
                if (data.code == 200) {
                    let res = data.data;
                    console.log(res);
                    if (res.isLogin) {
                        this.searchData(currentPage, pageSize);
                    } else {
                        this.$emit("getUserInfo");
                    }
                }

            },

            async searchData(currentPage, pageSize){
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("instruments", this.searchform.instruments);
                params.append("status", this.searchform.status);
                params.append("result", this.searchform.result);
                if (this.searchform.fitsDates.length == 2) {
                    params.append("startTime", this.searchform.fitsDates[0]);
                    params.append("endTime", this.searchform.fitsDates[1]);
                }
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_web_application_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            fmtResutl(result) {
                if (result == 0) {
                    return this.$t('message.Rejected');
                }
                else if (result == 1) {
                    return this.$t('message.Approved');
                }
                else {
                    return "";
                }
            },

            reseta() {
                this.searchform = {
                    status: "",
                    fitsDates: "",
                    result: "",
                };
                this.search(this.currentPage, this.pageSize);
            },

            tableRowClick(row) {
                this.$refs.table.toggleRowSelection(row);
            },

            onTableSelectChange(rows) {
                this.checkRows = rows;
            },

            toggleSelection() {
                this.$refs.table.clearSelection();
            }
        }
    }
</script>

<style scoped>
    .search-form {
        text-align: left;
        margin-bottom: 10px !important;
    }

    .ml-10 {
        margin-left: 20px !important;
        margin-top: 10px !important;
        margin-bottom: 10px !important;
    }
</style>
