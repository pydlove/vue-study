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

					<el-form-item label="用户名称" prop="name">
						<el-input
								v-model="searchform.name"
								class="wp-180 mr-10"
								placeholder="请输入用户名称"
						>
						</el-input>
					</el-form-item>

					<el-form-item label="用户账号" prop="name">
						<el-input
								v-model="searchform.account"
								class="wp-180 mr-10"
								placeholder="请输入用户账号"
						>
						</el-input>
					</el-form-item>

					<el-form-item label="电话号码" prop="name">
						<el-input
								v-model="searchform.phone"
								class="wp-180 mr-10"
								placeholder="请输入用户名称"
						>
						</el-input>
					</el-form-item>

					<el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search"
					           @click="search(0, 10)">搜索
					</el-button>
					<el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
				</el-form>

				<div class="mb-10 mt-40">
					<el-button v-aiocp="['a']" class="aioc-btn1" type="primary" icon="el-icon-plus" size="small"
					           @click="add">增加
					</el-button>
					<el-button v-aiocp="['d']" type="danger" icon="el-icon-delete" size="small" @click="deletea">批量删除
					</el-button>
					<el-button v-aiocp="['d']" type="warning" icon="el-icon-close" size="small"
					           @click="toggleSelection">取消选择
					</el-button>
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
					<el-table-column prop="img" label="照片" width="121px">
						<template slot-scope="scope">
							<el-image
									:style="'width:' + photoWidth + 'px;height:' + photoHeight + 'px;'"
									:src="scope.row.avatar"
									fit="fit"
									:preview-src-list="[scope.row.avatar]"
							></el-image>
						</template>
					</el-table-column>
					<el-table-column prop="account" label="账号" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="name" label="姓名" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="phone" label="电话" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="mail" label="邮箱" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="status" label="状态" :show-overflow-tooltip="true"
					                 :formatter="statusFormat"></el-table-column>
					<el-table-column prop="createTime" label="时间" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column label="详情" type="expand" width="85" fixed="right">
						<template slot-scope="props">
							<el-form label-position="left" class="demo-table-expand">
								<div class="mp-top">
									<el-divider content-position="left">
										用户信息
									</el-divider>
								</div>
								<div class="dffn">
									<div class="wdi-400">
										<div class="xx-lable">
											<span>账 <span class="ml-28"></span> 号</span>
											<span>{{ props.row.account }}</span>
										</div>
										<div class="xx-lable">
											<span>姓 <span class="ml-28"></span> 名</span>
											<span>{{ props.row.name }}</span>
										</div>
										<div class="xx-lable">
											<span>性 <span class="ml-28"></span> 别</span>
											<span>{{ props.row.sex == "0" ? "男":"女" }}</span>
										</div>
										<div class="xx-lable">
                                            <span>
                                                身<span class="ml-5"></span>
                                                份<span class="ml-5"></span>
                                                证
                                            </span>
											<span>{{ props.row.idCard }}</span>
										</div>
										<div class="xx-lable">
											<span>出生年月</span>
											<span>{{ props.row.birthtime }}</span>
										</div>
										<div class="xx-lable">
											<span>地 <span class="ml-28"></span> 址</span>
											<span>{{ props.row.address }}</span>
										</div>
										<div class="xx-lable">
											<span>手机号码</span>
											<span>{{ props.row.phone }}</span>
										</div>
										<div class="xx-lable">
											<span>电子邮箱</span>
											<span>{{ props.row.mail }}</span>
										</div>
										<div class="xx-lable">
											<span>状 <span class="ml-28"></span> 态</span>
											<span>{{ statusFormatMethod(props.row.status) }}</span>
										</div>
									</div>

								</div>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column prop="remark" label="描述" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column label="操作" fixed="right" width="200">
						<template slot-scope="scope">
							<el-button class="aioc-btn1"
							           v-aiocp="['e']"
							           size="mini"
							           @click="editRow(scope.row)">编辑
							</el-button>
							<el-button
									v-aiocp="['d']"
									size="mini"
									type="danger"
									@click="deleteRow(scope.$index, scope.row)">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
			</el-card>
		</el-card>
		<Add ref="addRef" @search="search" :areaOptions="areaOptions"></Add>
		<Edit ref="editRef" @search="search" :currentPage="currentPage" :pageSize="pageSize"
		      :areaOptions="areaOptions"></Edit>
	</div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/portal/user/add"
    import Edit from "@/views/portal/user/edit"
    import areaData from '@/assets/json/areaData.json'

    export default {
        name: "index",
        components: {Pagination, Add, Edit},
        mounted() {
            this.area = this.$utils.getStorage("area");
            this.search(0, 10);
            this.initAreaOptions(areaData);
        },
        methods: {
            /**
             * 初始化地域数据
             */
            initAreaOptions(area) {
                for (let key in area) {
                    let province = area[key];
                    if (key == '安徽省') {
                        var provinceObj = {
                            label: key,
                            value: key,
                            children: []
                        }
                        this.areaOptions.push(provinceObj);
                        for (let cityKey in province) {
                            let city = province[cityKey];
                            var cityObj = {
                                label: cityKey,
                                value: cityKey,
                                children: []
                            }
                            provinceObj.children.push(cityObj);
                            for (let areaKey in city) {
                                var areaObj = {
                                    label: areaKey,
                                    value: areaKey,
                                }
                                cityObj.children.push(areaObj);
                            }
                        }
                    }
                }
            },

            /**
             * 增加
             */
            add() {
                this.$refs.addRef.open();
            },

            /**
             * 编辑
             */
            editRow(row) {
                this.$refs.editRef.form = {
                    id: row.id,
                    name: row.name,
                    account: row.account,
                    phone: row.phone,
                    mail: row.mail,
                    status: row.status,
                    remark: row.remark,
                    avatar: row.avatar,
                    idCard: row.idCard,
                    address: row.address,
                    birthtime: row.birthtime,
                    sex: Number(row.sex),
                    province: '',
                    city: '',
                    county: '',
                    township: '',
                    area: [],
                };
                this.$refs.editRef.form.area.push(row.province);
                if (row.city != null && row.city != undefined && row.city != "") {
                    this.$refs.editRef.form.area.push(row.city);
                }
                if (row.county != null && row.county != undefined && row.county != "") {
                    this.$refs.editRef.form.area.push(row.county);
                }
                if (row.avatar != null && row.avatar != "") {
                    var photoArray = row.avatar.split("/")
                    this.$refs.editRef.fileName = photoArray[photoArray.length - 1];
                    this.$refs.editRef.originalFileName = photoArray[photoArray.length - 1];
                    this.$refs.editRef.fileList = [{url: row.avatar}];
                    this.$refs.editRef.hideUpload = true;
                } else {
                    this.$refs.editRef.fileName = "";
                    this.$refs.editRef.originalFileName = "";
                    this.$refs.editRef.fileList = [];
                    this.$refs.editRef.hideUpload = false;
                }
                this.$refs.editRef.open();
            },

            /**
             * 批量删除
             * 单行删除
             * 删除请求
             */
            deletea() {
                this.checkRowIds = [];
                this.checkRowImgs = [];
                if (this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for (var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.id + "\"");
                    var imgArrays = row.avatar.split("/");
                    this.checkRowImgs.push(imgArrays[imgArrays.length - 1]);
                }
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest();
                }).catch(() => {
                });
            },
            deleteRow(index, row) {
                this.checkRowIds = [];
                this.checkRowImgs = [];
                this.checkRowIds.push("\"" + row.id + "\"");
                var imgArrays = row.avatar.split("/");
                this.checkRowImgs.push(imgArrays[imgArrays.length - 1]);
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest();
                }).catch(() => {
                });
            },
            async deleteRequest() {
                let params = new FormData()
                params.append("ids", this.checkRowIds.toString());
                params.append("imgs", this.checkRowImgs);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_user_delete, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg("删除用户成功", "success");
                    this.search(this.currentPage, this.pageSize);
                    return true;
                }
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                if (this.area != null && this.area != "" && this.area != undefined) {
                    if (this.area.length == 1) {
                        params.append("province", this.area[0]);
                    }
                    if (this.area.length == 2) {
                        params.append("province", this.area[0]);
                        params.append("city", this.area[1]);
                    }
                    if (this.area.length == 3) {
                        params.append("province", this.area[0]);
                        params.append("city", this.area[1]);
                        params.append("county", this.area[2]);
                    }
                } else {
                    params.append("province", "安徽省");
                }
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("account", this.searchform.account.trim());
                params.append("name", this.searchform.name.trim());
                params.append("phone", this.searchform.phone.trim());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_user_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            tableRowClick(row) {
                this.$refs.table.toggleRowSelection(row);
            },
            onTableSelectChange(rows) {
                this.checkRows = rows;
            },
            toggleSelection() {
                this.$refs.table.clearSelection();
            },

            statusFormat(row, column) {
                const value = row[column.property];
                return this.statusFormatMethod(value);
            },
            statusFormatMethod(value) {
                switch (value) {
                    case "active":
                        return "已激活";
                    case "lock":
                        return "已锁定";
                    case "freeze":
                        return "已冻结";
                    case "expired":
                        return "已过期";
                    default :
                        return value;
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
                checkRows: [],
                checkRowIds: [],
                checkRowImgs: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight - 2,
                currentPage: 0,
                pageSize: 10,
                photoWidth: 50,
                photoHeight: 50,
                area: [],
                areaOptions: [],
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