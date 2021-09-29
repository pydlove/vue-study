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
			<el-form-item :label="$t('message.ObservationDate')" prop="name">
				<el-date-picker
            size="small"
						v-model="searchform.fitsDates"
						type="datetimerange"
						range-separator="至"
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

      <el-form-item :label="$t('message.Instruments')" prop="name">
        <el-select size="small" v-model="searchform.result" :placeholder="$t('message.AuditResultsPlaceholder')">
          <el-option :label="$t('OnSet')" value="0"></el-option>
          <el-option :label="$t('WeHost')" value="1"></el-option>
        </el-select>
      </el-form-item>

			<el-form-item :label="$t('message.AuditResults')" prop="name">
				<el-select size="small" v-model="searchform.result" :placeholder="$t('message.AuditResultsPlaceholder')">
					<el-option :label="$t('Rejected')" value="0"></el-option>
					<el-option :label="$t('Approved')" value="1"></el-option>
				</el-select>
			</el-form-item>

			<el-button class="ml-5 aioc-btn1" type="primary" icon="el-icon-search" size="mini"
			           @click="search(0, 10)">
				{{ $t('message.Search') }}
			</el-button>
			<el-button class="ml-5" icon="el-icon-refresh" size="mini" @click="reseta">
				{{ $t('message.Reset') }}
			</el-button>
		</el-form>

    <div class="ml-10 ">
      <el-button class="aioc-btn1" type="primary" icon="el-icon-plus" size="mini"
                 @click="add">{{ $t('message.Add') }}
      </el-button>
    </div>

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
      <el-table-column prop="instruments" :label="$t('message.Instruments')" :show-overflow-tooltip="true" align="center"></el-table-column>
			<el-table-column prop="status" :label="$t('message.OrderStatus')" :show-overflow-tooltip="true" width="120" align="center">
				<template slot-scope="scope">
					{{ scope.row.status == "0" ? $t('message.UnderReview'):$t('message.ReviewCompleteds') }}
				</template>
			</el-table-column>
			<el-table-column prop="content" :label="$t('message.content')" :show-overflow-tooltip="true" align="center"></el-table-column>
			<el-table-column prop="obsDate" :label="$t('message.obsDate')" :show-overflow-tooltip="true" align="center">
        <template slot-scope="props">
          <div >
            {{ props.row.startTime }}-{{ props.row.endTime }}
          </div>
        </template>
      </el-table-column>
			<el-table-column prop="result" :label="$t('message.AuditResults')" :show-overflow-tooltip="true" width="120">
				<template slot-scope="scope">
					{{ fmtResutl(scope.row.result) }}
				</template>
			</el-table-column>
			<el-table-column :label="$t('message.Operate')" fixed="right" width="100" align="center">
				<template slot-scope="scope">
					<el-button
							v-if="scope.row.result == 1"
							v-aiocp="['d']"
							size="mini"
							type="danger"
							@click="deleteRow(scope.$index, scope.row)">
						{{ $t('message.Download') }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
    <Add ref="addRef" @search="search" ></Add>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/application/add";
    export default {
        name: "application",
        components: {
            Pagination,Add
        },
        data() {
            return {
                tableData: [],
                searchform: {
                    status: "",
                    fitsDates: "",
                    result: "",
                  instruments:"",
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
            this.$refs.addRef.open();
          },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("instruments", this.searchform.instruments);
                params.append("status", this.searchform.status);
                params.append("result", this.searchform.result);
                if(this.searchform.fitsDates.length == 2) {
                    params.append("startTime", this.searchform.fitsDates[0]);
                    params.append("endTime", this.searchform.fitsDates[1]);
                }
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_web_application_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    console.log(this.tableData);
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            fmtResutl(result) {
                if(result == 0) {
                    return this.$t('message.Rejected');
                }
                else if(result == 1) {
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
	}
</style>
