<template>
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

                    <el-form-item label="活动名称" prop="name">
                        <el-input
                                v-model="searchform.title"
                                class="wp-180 mr-10"
                                placeholder="请输入活动名称"
                                prefix-icon="el-icon-search">
                        </el-input>
                    </el-form-item>

                    <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                    <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
                </el-form>

                <div class="mb-10 mt-40">
                    <el-button class="aioc-btn1" v-aiocp="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">增加</el-button>
                </div>

                <el-table
                        :class="bgClass == 'aiocw' ? '':'aioc-table'"
                        :border="bgClass == 'aiocw'"
                        ref="table"
                        :data="tableData"
                        @selection-change='onTableSelectChange'
                        @row-click='tableRowClick'
                        @row-dblclick='preview'
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                >
                    <el-table-column prop="img" label="活动海报" width="140px" align="center">
                        <template slot-scope="scope">
                            <el-image
                                    style="width: 100px; height: 50px"
                                    :src="scope.row.poster"
                                    fit="fit"
                                    :preview-src-list="[scope.row.poster]"
                            ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="活动主题" show-overflow-tooltip="true" width="150px"></el-table-column>
                    <el-table-column prop="description" label="活动描述" show-overflow-tooltip="true" width="150px"></el-table-column>
                    <el-table-column prop="startTime" label="活动时间" show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{ scope.row.startTime }} - {{ scope.row.endTime }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="活动地点" show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{ scope.row.province }}{{ scope.row.city }}{{ scope.row.county }}({{ scope.row.address }})
                        </template>
                    </el-table-column>
                    <el-table-column prop="peopleLimit" label="活动总人数" show-overflow-tooltip="true" align="center"></el-table-column>
                    <el-table-column prop="score" label="累计学分" show-overflow-tooltip="true" align="center"></el-table-column>
                    <el-table-column prop="cost" label="报名费用(¥)" show-overflow-tooltip="true" align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.isFree == '0'">
                                {{scope.row.cost}}
                            </div>
                            <div v-else-if="scope.row.isFree == '1'">
                                免费
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="signupStart" label="报名开始时间" show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="signupEnd" label="报名结束时间" show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="teachers" label="负责人" show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="status" label="活动状态" show-overflow-tooltip="true" align="center">
                        <template slot-scope="scope">
                            {{fmtActivityStatus(scope.row.status)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"  fixed="right" width="260">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status == '1'">
                                <el-button class="aioc-btn1"
                                           v-aiocp="['e']"
                                           size="mini"
                                           @click="editRow(scope.row)">编辑</el-button>
                                <el-button
                                        v-aiocp="['d']"
                                        size="mini"
                                        type="danger"
                                        @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                                <el-button class="aioc-btn1"
                                           v-aiocp="['pr']"
                                           size="mini"
                                           @click="preview(scope.row)">预览</el-button>
                            </div>
                            <div v-else>
                                <el-button class="aioc-btn1"
                                           v-aiocp="['vri']"
                                           size="mini"
                                           @click="seeSignInfo(scope.row)">查看报名信息</el-button>
                                <el-button class="aioc-btn1"
                                           v-aiocp="['pr']"
                                           size="mini"
                                           @click="preview(scope.row)">预览</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>
        </el-card>
        <Add ref="addRef" @search="search" :areaOptions="areaOptions"></Add>
        <Edit ref="editRef" @search="search" :currentPage="currentPage" :pageSize="pageSize" :areaOptions="areaOptions">></Edit>
        <SignInfo ref="signRef"></SignInfo>
        <Detail ref="detailRef"></Detail>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/console/activity/add";
    import Edit from "@/views/console/activity/edit";
    import SignInfo from "@/views/console/activity/signInfo";
    import Detail from "@/views/console/activity/detail";
    import areaData from '@/assets/json/areaData.json'
    export default {
        name: "index",
        components: {Pagination, Add, Edit, SignInfo, Detail},
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

            add() {
                this.$refs.addRef.open();
            },

            preview(row) {
                this.$refs.detailRef.open();
                this.$refs.detailRef.setActivity(row);
                if(row.status != '1') {
                    this.$refs.detailRef.search();
                }
            },

            seeSignInfo(row) {
                this.$refs.signRef.activity = row;
                this.$refs.signRef.search(0, 10);
                this.$refs.signRef.open();
            },

            editRow(row) {
                var timeRange = [];
                timeRange.push(row.signupStart);
                timeRange.push(row.signupEnd);
                var seTimeRange = [];
                seTimeRange.push(row.startTime);
                seTimeRange.push(row.endTime);
                var teacherIds = [];
                if(row.teacherIds != null && row.teacherIds != "") {
                    teacherIds = row.teacherIds.split(",")
                }
                this.$refs.editRef.form = {
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    poster: row.poster,
                    startTime: row.startTime,
                    endTime: row.endTime,
                    address: row.address,
                    peopleLimit: row.peopleLimit,
                    score: row.score,
                    isFree: row.isFree,
                    cost: row.cost,
                    signupStart: row.signupStart,
                    signupEnd: row.signupEnd,
                    content: row.content,
                    status: row.status,
                    teacherIds: teacherIds,
                    timeRange: timeRange,
                    seTimeRange: seTimeRange,
                    province: row.province,
                    city: row.city,
                    county: row.county,
                    township: row.township,
                    area: [],
                };
                this.$refs.editRef.form.area.push(row.province);
                if (row.city != null && row.city != undefined && row.city != "") {
                    this.$refs.editRef.form.area.push(row.city);
                }
                if (row.county != null && row.county != undefined && row.county != "") {
                    this.$refs.editRef.form.area.push(row.county);
                }
                var posterArrays = row.poster.split("/");
                this.$refs.editRef.originalFileName = posterArrays[posterArrays.length - 1];
                this.$refs.editRef.fileName = posterArrays[posterArrays.length - 1];
                this.$refs.editRef.fileList = [{name: "", url: row.poster}];
                this.initActiveTeacher(row);
                this.$refs.editRef.open();
            },

            async initActiveTeacher(row) {
                let params = new FormData()
                params.append("province", row.province);
                if (row.city != null && row.city != undefined && row.city != "") {
                    params.append("city", row.city);
                }
                if (row.county != null && row.county != undefined && row.county != "") {
                    params.append("county", row.county);
                }
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_teacher_active, params, "POST");
                if (data.code === 200) {
                    this.$refs.editRef.activeTeachers = data.data;
                    return true;
                }
            },

            /**
             * 批量删除
             * 单行删除
             * 删除请求
             */
            deletea() {
                this.checkRowIds = [];
                this.checkRowImgs = [];
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for(var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.id + "\"");
                    var imgArrays = row.poster.split("/");
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
                var imgArrays = row.poster.split("/");
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
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_activity_delete, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg("删除活动成功", "success");
                    this.search(this.currentPage, this.pageSize);
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
                params.append("title",  this.searchform.title.trim());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_activity_page_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            reseta() {
                this.searchform = {
                    title: "",
                };
                this.search(this.currentPage, this.pageSize)
            },

            fmtActivityStatus(status) {
                switch (status) {
                    case "0":
                        return "已发布";
                    case "1":
                        return "未发布";
                    case "2":
                        return "进行中";
                    case "3":
                        return "已结束";
                    case "4":
                        return "报名中";
                    case "5":
                        return "报名结束";
                    default:
                        return status;
                }
            },
        },
        data() {
            return {
                bgClass: "aiocw",
                searchform: {
                    title: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                checkRowImgs: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
                areaOptions:[],
                area:[],
            }
        },
    }
</script>

<style scoped>

</style>
<style>
    .el-table__expanded-cell:hover {
        background: #ffffff !important;
    }
</style>