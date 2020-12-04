<template>
    <div class="f-main">
        <el-card class="aioc-card" :style="'height:' + clientHeight + 'px;'">
            <el-form class="aioc-form mt-20"
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
                            placeholder="请输入用户姓名"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-form-item label="状态" prop="name">
                    <el-select v-model="searchform.status" placeholder="请选择状态">
                        <el-option label="活跃" value="0"></el-option>
                        <el-option label="静默" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="区域" prop="area">
                    <el-cascader
                            ref="areaCascaderRef"
                            size="large"
                            :props="{ checkStrictly: true }"
                            :options="areaOptions"
                            v-model="searchform.area"
                            @change="handleAreaCascader"
                            placeholder="请选择区域">
                    </el-cascader>
                </el-form-item>


                <el-button class="ml-20 aioc-btn" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
                <el-button v-aba="['a']" type="info" icon="el-icon-video-pause" size="small"  @click="setAutoDisable()">自动静默设置</el-button>
                <el-button v-aba="['d']" type="warning" icon="el-icon-close" size="small" @click="toggleSelection">取消选择</el-button>
            </div>

            <el-table
                    class="aioc-table"
                    ref="codeTable"
                    :data="tableData"
                    @selection-change='onTableSelectChange'
                    @row-click='tableRowClick'
                    @expand-change='tableExpand'
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'9px 1px'}"
            >
                <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                <el-table-column prop="img" label="照片" width="121px">
                    <template slot-scope="scope">
                        <el-image
                                :style="'width:' + photoWidth + 'px;height:' + photoHeight + 'px;'"
                                :src="scope.row.photo"
                                fit="fit"
                                :preview-src-list="[scope.row.photo]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="sex" label="性别" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{ scope.row.sex == "0" ? "男":"女" }}
                    </template>
                </el-table-column>
                <el-table-column prop="idcard" label="身份证" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="phone" label="联系方式" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="age" label="年龄" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="score" label="学分" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == '0' ? 'success':'info'" effect="dark">
                            {{ scope.row.status == '0' ? '活跃':'静默' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="详情" type="expand" width="85" fixed="right">
                    <template slot-scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <div class="mp-top">
                                <el-divider content-position="left">
                                    学籍信息
                                </el-divider>
                            </div>
                            <div class="dffn">
                                <div class="wdi-400">
                                    <div class="xx-lable">
                                        <span>姓 <span class="ml-28"></span> 名</span>
                                        <span>{{ props.row.name }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>性 <span class="ml-28"></span> 别</span>
                                        <span> {{ props.row.sex == "0" ? "男":"女" }} </span>
                                    </div>
                                    <div class="xx-lable">
                                            <span>
                                                身<span class="ml-5"></span>
                                                份<span class="ml-5"></span>
                                                证
                                            </span>
                                        <span>{{ props.row.idcard }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>出生年月</span>
                                        <span>{{ props.row.birth }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>地 <span class="ml-28"></span> 址</span>
                                        <span>
                                            {{ props.row.province }}{{ props.row.city }}{{ props.row.county }}
                                            ({{ props.row.address }})
                                        </span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>联系方式</span>
                                        <span>{{ props.row.phone }}</span>
                                    </div>
                                    <div class="xx-lable">
                                        <span>学 <span class="ml-28"></span> 分</span>
                                        <span>{{props.row.score}}</span>
                                    </div>
                                    <div class="xx-lable dffc">
                                        <span>课程班级</span>
                                        <el-tag  class="mb-10 colori-303133" v-for="item in props.row.classes" :key="item.id">
                                            <span class="color-fa5c26">班级：</span>{{item.className}}， 课程：{{ item.subSubject }}，负责老师：{{ item.teacher }}
                                        </el-tag>
                                    </div>
                                    <div class="xx-lable">
                                        <span>学习用品</span>
                                        <div class="dffw mb-10">
                                            <el-tag type="" class="mr-10 colori-303133" v-for="item in props.row.schoolSupplies" :key="item.id">{{ item.name }}</el-tag>
                                        </div>
                                    </div>
                                    <div class="xx-lable">
                                        <span>状 <span class="ml-28"></span> 态</span>
                                        <el-tag class="colori-ffffff" :type="props.row.status == '0' ? 'success':'info'" effect="dark">
                                            {{ props.row.status == '0' ? '活跃':'静默' }}
                                        </el-tag>
                                    </div>
                                </div>


                                <div class="ml-50 wp-50">
                                    <el-form-item label="备注">
                                        <el-input
                                                disabled
                                                class="textarea xx-text"
                                                type="textarea"
                                                :autosize="{ minRows: 16, maxRows: 18}"
                                                placeholder="暂无评语"
                                                maxlength="3000"
                                                show-word-limit
                                                v-model="props.row.remark">
                                        </el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="xx-lable">
                                    <span class="wdi-220">
                                        已参加活动
                                        <span class="color-b83f3f">(参加总数：{{totalAcCount}}个)</span>
                                    </span>
                                <el-card>
                                    <el-table
                                            class="aiocw-table"
                                            ref="activityTableRef"
                                            :data="props.row.activities"
                                            @selection-change='onTableSelectChange'
                                            @row-click='tableRowClick'
                                            :row-style="{height:'20px'}"
                                            :cell-style="{padding:'9px 1px'}"
                                    >
                                        <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="time" label="活动时间" :show-overflow-tooltip="true"></el-table-column>
                                        <el-table-column prop="address" label="活动地点" :show-overflow-tooltip="true"></el-table-column>
                                    </el-table>
                                    <el-pagination
                                            class="mt-10 pb-10 pt-20"
                                            @size-change="acHandleSizeChange"
                                            @current-change="acHandleCurrentChange"
                                            :current-page="acCurrentPage"
                                            :page-sizes="[10]"
                                            :page-size="acPageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="totalAcCount">
                                    </el-pagination>
                                </el-card>
                            </div>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button class="aioc-btn1"
                                   v-aba="['e']"
                                   size="mini"
                                   type="info"
                                   @click="setCertificate(scope.row)">绑定证书</el-button>
                        <el-button v-if="scope.row.status == '0'"
                                   v-aba="['e']"
                                   size="mini"
                                   type="info"
                                   @click="setDisableRow(scope.row)">静默TA</el-button>
                        <el-button v-else-if="scope.row.status == '1'"
                                v-aba="['e']"
                                size="mini"
                                type="success"
                                @click="setAbleRow(scope.row)">激活</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        </el-card>
        <Certificate ref="certificateRef"></Certificate>
        <AutoDisable ref="autoDisableRef"></AutoDisable>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import areaData from '@/assets/json/areaData.json'
    import Certificate from '@/views/console/student/certificate'
    import AutoDisable from '@/views/console/student/autoDisable'
    export default {
        name: "index",
        components: {Pagination, Certificate, AutoDisable},
        mounted() {
            this.search(0, 10);
            this.initAreaOptions(areaData);
        },
        methods: {
            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData()
                if(this.searchform.area != null && this.searchform.area != "" && this.searchform.area != undefined) {
                    if(this.searchform.area.length == 1) {
                        params.append("province", this.searchform.area[0]);
                    }
                    if(this.searchform.area.length == 2) {
                        params.append("province", this.searchform.area[0]);
                        params.append("city", this.searchform.area[1]);
                    }
                    if(this.searchform.area.length == 3) {
                        params.append("province", this.searchform.area[0]);
                        params.append("city", this.searchform.area[1]);
                        params.append("county", this.searchform.area[2]);
                    }
                }
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                params.append("name",  this.searchform.name.trim());
                params.append("phone",  this.searchform.phone.trim());
                params.append("status",  this.searchform.status.trim());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_user_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            reseta() {
                this.searchform = {
                    name: "",
                    phone: "",
                    status: "",
                };
                this.search(this.currentPage, this.pageSize)
            },

            /**
             * 处理地区条件选择变化
             */
            handleAreaCascader() {
                if (this.$refs.areaCascaderRef) {
                    this.$refs.areaCascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
                }
                this.$(".cond span").removeClass("cond-selected");
            },

            setCertificate(row) {
                this.$refs.certificateRef.open();
                this.$refs.certificateRef.setUser(row);
            },

            setDisableRow(row) {
                this.$confirm('静默后将不能使用系统，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checkRowIds = [];
                    this.checkRowIds.push("\"" + row.id + "\"");
                    this.setDisableRequest();
                }).catch(() => {
                });
            },
            setDisable() {
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                this.$confirm('静默后将不能使用系统，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checkRowIds = [];
                    for(var i in this.checkRows) {
                        var row = this.checkRows[i];
                        this.checkRowIds.push("\"" + row.id + "\"");
                    }
                    this.setDisableRequest();
                }).catch(() => {
                });
            },
            async setDisableRequest() {
                let params = new FormData()
                params.append("ids", this.checkRowIds.toString());
                params.append("status", "1");
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_user_setStatus, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg("静默成功", "success");
                    this.search(this.currentPage, this.pageSize);
                    return true;
                }
            },

            setAbleRow(row) {
                this.$confirm('激活后将正常使用系统，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checkRowIds = [];
                    this.checkRowIds.push("\"" + row.id + "\"");
                    this.setAbleRequest();
                }).catch(() => {
                });
            },
            async setAbleRequest() {
                let params = new FormData()
                params.append("ids", this.checkRowIds.toString());
                params.append("status", "0");
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_user_setStatus, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg("激活成功", "success");
                    this.search(this.currentPage, this.pageSize);
                    return true;
                }
            },

            setAutoDisable() {
                this.$refs.autoDisableRef.open();
            },

            /**
             * 分页方法
             */
            acHandleSizeChange(val) {
                this.acPageSize = val;
                this.acCurrentPage = 1;
            },
            acHandleCurrentChange(val) {
                this.acCurrentPage = val;
            },
            tableExpand(row) {
                // this.totalAcCount = row.activities.length;
                console.log(row)
            },

            tableRowClick(row) {
                this.$refs.codeTable.toggleRowSelection(row);
            },
            onTableSelectChange(rows) {
                this.checkRows = rows;
            },
            toggleSelection() {
                this.$refs.codeTable.clearSelection();
            },

            /**
             * 初始化地域数据
             */
            initAreaOptions(area) {
                var all = {
                    label:"全国",
                    value:"全国",
                }
                this.areaOptions.push(all);
                for(let key in area){
                    let province = area[key];
                    var provinceObj = {
                        label:key,
                        value:key,
                        children:[]
                    }
                    this.areaOptions.push(provinceObj);
                    for(let cityKey in province){
                        let city = province[cityKey];
                        var cityObj={
                            label:cityKey,
                            value:cityKey,
                            children:[]
                        }
                        provinceObj.children.push(cityObj);
                        for(let areaKey in city) {
                            var areaObj={
                                label:areaKey,
                                value:areaKey,
                            }
                            cityObj.children.push(areaObj);
                        }
                    }
                }
            },
        },
        data() {
            return {
                searchform: {
                    name: "",
                    phone: "",
                    status: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
                photoWidth: 207*0.2,
                photoHeight: 313*0.2,

                totalAcCount: 0,
                acPageSize: 10,
                acCurrentPage: 0,
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