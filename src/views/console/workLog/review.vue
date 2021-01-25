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

					<el-form-item label="日志标题" prop="name">
						<el-input
								v-model="searchform.title"
								class="wp-180 mr-10"
								placeholder="请输入日志标题"
								prefix-icon="el-icon-search">
						</el-input>
					</el-form-item>

					<el-form-item label="日志作者" prop="name">
						<el-input
								v-model="searchform.createUserName"
								class="wp-180 mr-10"
								placeholder="请输入日志作者姓名"
								prefix-icon="el-icon-search">
						</el-input>
					</el-form-item>

					<el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
					<el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
				</el-form>
				<div class="mb-10 mt-40">
				</div>
				<el-table
						:class="bgClass == 'aiocw' ? '':'aioc-table'"
						:border="bgClass == 'aiocw'"
						ref="tableRef"
						:data="tableData"
						@selection-change='onTableSelectChange'
						@row-click='tableRowClick'
						@cell-dblclick='seeDetail'
						:row-style="{height:'20px'}"
						:cell-style="{padding:'9px 1px'}"
				>
					<el-table-column fixed="left" type="selection" width="55" align="center"></el-table-column>
					<el-table-column prop="status" label="状态" align="center" :show-overflow-tooltip="true">
						<template slot-scope="scope">
                            <span :style="'color:' + formatStatusColor(scope.row.status)">
                                {{formatStatusMethod(scope.row.status)}}
                            </span>
						</template>
					</el-table-column>
					<el-table-column prop="title" label="日志标题" align="center" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="createUserName" label="作者" align="center" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="leader" label="领导" align="center" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="createTime" label="创建时间" align="center" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="updateTime" label="更新时间" align="center" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column fixed="right" label="操作" width="300">
						<template slot-scope="scope">
							<el-button
									size="mini"
									type="success"
									@click="seeDetail(scope.row)">查看详情</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
			</el-card>
		</el-card>
		<Detail ref="detailRef" :leader="leader" ></Detail>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Pagination from "@/components/Pagination";
    import Detail from "@/views/console/workLog/detail.vue";
    export default {
        name: "index",
        components: {Pagination, Detail},
        mounted() {
            this.search(0, 10);
            this.initApproveUser();
        },
        methods: {
            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("createUserName",  this.searchform.createUserName.trim());
                params.append("title",  this.searchform.title.trim());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_work_log_leader, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            seeDetail(row) {
                this.$refs.detailRef.form = {
                    id: row.id,
                    title: row.title,
                    content:  row.content,
                    createTime:  row.createTime,
                    updateTime:  row.updateTime,
                    createUser:  row.createUser,
                    createUserName:  row.createUserName,
                    leader:  row.leader,
                    toLeaderId:  row.toLeaderId,
                    remark:  row.remark,
                };
                this.$refs.detailRef.open();
            },

            reseta() {
                this.searchform = {
                    createUserName: "",
                    title: "",
                }
            },

            async initApproveUser() {
                let params = new FormData()
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_user_approver, params, "POST");
                if (data.code === 200) {
                    this.leader = data.data;
                    return true;
                }
            },

            formatStatusMethod(value) {
                switch (value) {
                    case "0":
                        return "草稿箱";
                    case "1":
                        return "发布";
                    default :
                        return value;
                }
            },

            formatStatusColor(value) {
                switch (value) {
                    case "0":
                        return "#999";
                    case "1":
                        return "#67C23A";
                    default :
                        return value;
                }
            },
        },
        data() {
            return {
                bgClass: "aiocw",
                clientHeight: document.body.clientHeight-2,
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                currentPage: 0,
                pageSize: 10,
                leader: "",
                searchform: {
                    createUserName: "",
                    title: "",
                }
            }
        },
    }
</script>

<style scoped>
</style>

<style>
</style>