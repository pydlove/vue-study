<template>
	<!--eslint-disable-->
	<div>
		<el-form class="search-form"
		         ref="searchform"
		         :model="searchform"
		         :inline="true"
		         :validate-on-rule-change="false"
		         label-width="80px"
		         label-position="right">
			<el-form-item label="观测日期" prop="name">
				<el-date-picker
						v-model="searchform.fitsDates"
						type="datetimerange"
						range-separator="至"
						format="yyyy-MM-dd HH:mm:SS"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>

			<el-form-item label="工单状态" prop="name">
				<el-select v-model="searchform.status" placeholder="请选择工单状态搜索">
					<el-option label="审核中" value="0"></el-option>
					<el-option label="审核完成" value="1"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="审核结果" prop="name">
				<el-select v-model="searchform.result" placeholder="请选择审核结果搜索">
					<el-option label="已否决" value="0"></el-option>
					<el-option label="已批准" value="1"></el-option>
				</el-select>
			</el-form-item>

			<el-button class="ml-20 aioc-btn1" type="primary" icon="el-icon-search"
			           @click="search(0, 10)">搜索
			</el-button>
			<el-button class="ml-20" icon="el-icon-refresh" @click="reseta">重置</el-button>
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
			<el-table-column prop="tradeNo" label="工单号" :show-overflow-tooltip="true" align="center"></el-table-column>
			<el-table-column prop="status" label="工单状态" :show-overflow-tooltip="true" width="100" align="center">
				<template slot-scope="scope">
					{{ scope.row.status == "0" ? "审核中":"审核完成" }}
				</template>
			</el-table-column>
			<el-table-column prop="fitsName" label="下载文件" :show-overflow-tooltip="true">
				<template slot-scope="scope">
					<div class="fitsName" @click="showDetail(scope.row)">
						{{ scope.row.fitsName }}
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="fitsDate" label="观测日期" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="result" label="审核结果" :show-overflow-tooltip="true" width="100">
				<template slot-scope="scope">
					{{ fmtResutl(scope.row.result) }}
				</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" width="100" align="center">
				<template slot-scope="scope">
					<el-button
							v-if="scope.row.result == 1"
							v-aiocp="['d']"
							size="mini"
							type="danger"
							@click="deleteRow(scope.$index, scope.row)">下载
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Pagination from "@/components/Pagination";

    export default {
        name: "application",
        components: {
            Pagination
        },
        data() {
            return {
                tableData: [],
                searchform: {
                    status: "",
                    fitsDates: "",
                    result: "",
                },
                pageSize: 10,
                totalAcCount: 0,
            }
        },
        mounted() {
            this.search(1, 10);
        },
        methods: {
            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("status", this.searchform.status);
                params.append("result", this.searchform.result);
                if(this.searchform.fitsDates.length == 2) {
                    params.append("start", this.searchform.fitsDates[0]);
                    params.append("end", this.searchform.fitsDates[1]);
                }
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_web_application_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            fmtResutl(result) {
                if(result == 0) {
                    return "已否决";
                }
                else if(result == 1) {
                    return "已批准";
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
            }
        }
    }
</script>

<style scoped>
	.search-form {
		text-align: left;
	}
</style>