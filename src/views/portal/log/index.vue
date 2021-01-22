<template>
	<!--eslint-disable-->
	<div :class="bgClass + '-main'">
		<el-card :class="bgClass + '-card'" :style="'height:' + clientHeight + 'px;'">
			<el-card>
				<el-form :class="bgClass + '-form mt-20'"
				         ref="searchform"
				         :model="searchform"
				         :inline="true"
				         :validate-on-rule-change="false"
				         label-width="80px"
				         label-position="right">

					<!--<el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search"-->
					           <!--@click="search(0, 10)">搜索-->
					<!--</el-button>-->
					<!--<el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>-->
				</el-form>

				<div class="mb-10 mt-40">
				</div>

				<el-table
						:class="bgClass == 'aiocw' ? '':'aioc-table'"
						:border="bgClass == 'aiocw'"
						ref="table"
						:data="tableData"
						@selection-change='onTableSelectChange'
						@row-click='tableRowClick'
						:row-style="{height:'20px'}"
						:cell-style="{padding:'9px 1px'}"
				>
					<el-table-column fixed="left" type="selection" width="55"></el-table-column>
					<el-table-column prop="source" label="客户端" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="operation" label="操作" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="username" label="用户名" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="ip" label="ip地址" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="createTime" label="时间" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
				</el-table>
				<Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
			</el-card>
		</el-card>
	</div>
</template>

<script>
    import Pagination from "@/components/Pagination";

    export default {
        name: "index",
        components: {Pagination},
        mounted() {
            this.search(0, 10);
        },
        methods: {

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_log_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            reseta() {
                this.searchform = {
                    name: "",
                    account: "",
                    phone: "",
                };
                this.search(this.currentPage, this.pageSize)
            },
        },
        data() {
            return {
                bgClass: "aiocw",
                searchform: {
                    name: "",
                    account: "",
                    phone: "",
                },
                tableData: [],
                clientHeight: document.body.clientHeight - 2,
                currentPage: 0,
                pageSize: 10,
            }
        },
    }
</script>


<style scoped>
	.xx-lable > span:nth-of-type(1) {
		display: inline-block;
		width: 90px;
		color: #99a9bf;
	}

	.xx-lable > span:nth-of-type(2) {
		display: inline-block;
		color: #303133;
	}

	.xx-lable {
		line-height: 40px;
	}

	.xx-text {
		width: 600px;
	}
</style>

<style>
	.el-table__expanded-cell:hover {
		background: #ffffff !important;
	}
</style>