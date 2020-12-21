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

                    <el-form-item label="班级名称" prop="name">
                        <el-input
                                v-model="searchform.name"
                                class="wp-180 mr-10"
                                placeholder="请输入班级名称"
                        >
                        </el-input>
                    </el-form-item>

                    <el-form-item label="教师名称" prop="name">
                        <el-input
                                v-model="searchform.teacherName"
                                class="wp-180 mr-10"
                                placeholder="请输入教师名称"
                        >
                        </el-input>
                    </el-form-item>

                    <el-form-item label="课程大类名称" prop="name">
                        <el-input
                                v-model="searchform.mainName"
                                class="wp-180 mr-10"
                                placeholder="请输入教师名称"
                        >
                        </el-input>
                    </el-form-item>

                    <el-form-item label="课程小类名称" prop="name">
                        <el-input
                                v-model="searchform.subName"
                                class="wp-180 mr-10"
                                placeholder="请输入教师名称"
                        >
                        </el-input>
                    </el-form-item>

                    <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                    <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
                </el-form>

                <div class="mb-10 mt-40">
                    <el-button class="aioc-btn1" v-aiocp="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">增加</el-button>
                    <el-button v-aiocp="['d']" type="danger" icon="el-icon-delete" size="small" @click="deletea">批量删除</el-button>
                    <el-button v-aiocp="['d']" type="warning" icon="el-icon-close" size="small" @click="toggleSelection">取消选择</el-button>
                </div>

                <el-table
                        :class="bgClass == 'aiocw' ? '':'aioc-table'"
                        :border="bgClass == 'aiocw'"
                        ref="codeTable"
                        :data="tableData"
                        @selection-change='onTableSelectChange'
                        @row-click='tableRowClick'
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                >
                    <el-table-column fixed="left" type="selection" width="55"></el-table-column>
                    <el-table-column fixed="left" prop="name" label="班级名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="startDate" label="开始时间" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="endType" label="结束方式" width="200" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                                {{handleEnd(scope.row)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="isRepeat" width="300" label="时间" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{handleTime(scope.row)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="teacherName" label="老师" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="capacity" label="已报名/容量" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                           <span class="color-fa5c26">{{scope.row.used}}</span> / <span class="color-67C23A"> {{scope.row.capacity}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mainName" label="课程大类" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="subName" label="课程小类" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="score" label="获得学分" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="操作"  fixed="right" width="200">
                        <template slot-scope="scope">
                                <el-button class="aioc-btn1"
                                        v-aiocp="['e']"
                                        size="mini"
                                        @click="editRow(scope.row)">编辑</el-button>
                                <el-button
                                        v-aiocp="['d']"
                                        size="mini"
                                        type="danger"
                                        @click="deleteRow(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
            </el-card>
        </el-card>
        <Add ref="addRef" @search="search" :mainSubjects="mainSubjects" :areaOptions="areaOptions"></Add>
        <Edit ref="editRef" @search="search"
              :mainSubjects="mainSubjects"
              :currentPage="currentPage"
              :pageSize="pageSize"
              :areaOptions="areaOptions"
        ></Edit>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import Add from "@/views/console/class/class/add";
    import Edit from "@/views/console/class/class/edit";
    import areaData from '@/assets/json/areaData.json'

    export default {
        name: "index",
        components: {Pagination, Add, Edit},
        mounted() {
            this.area = this.$utils.getStorage("area");
            this.search(0, 10);
            this.initMainSubjects();
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

            async initMainSubjects() {
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_main_subject_sub, {}, "GET");
                if (data.code === 200) {
                    this.mainSubjects = data.data;
                    return true;
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
                    startDate: row.startDate,
                    endType: row.endType,
                    frequency: row.frequency,
                    endDate: row.endDate,
                    isRepeat: row.isRepeat,
                    whichDay: row.whichDay.split(","),
                    startTime: row.startTime,
                    endTime: row.endTime,
                    teacherId: row.teacherId,
                    timeRange: [row.startTime, row.endTime],
                    address: row.address,
                    capacity: row.capacity.toString(),
                    subId: row.subId,
                    mainId: row.mainId,
                    createTime: row.createTime,
                    updateTime: row.updateTime,
                    remark: row.remark,
                    score: row.score.toString(),
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
                this.$refs.editRef.mainSubject = this.mainSubjects[row.mainId];
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
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for(var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.id + "\"");
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
            deleteRow(row) {
                this.checkRowIds = [];
                this.checkRowIds.push("\"" + row.id + "\"");
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
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_class_delete, params, "POST");
                if (data.code === 200) {
                    this.$promptMsg(data.msg, "success");
                    this.search(this.currentPage, this.pageSize);
                    return true;
                }
            },

            handleEnd(row) {
                const endType = row.endType;
                if(endType == "0") {
                    const frequency = row.frequency;
                    return "限次数" + "(" + frequency + ")";
                } else if (endType == "1") {
                    const endDate = row.endDate;
                    return "限日期" + "(" + endDate + ")";
                }
            },

            handleTime(row) {
                const isRepeat = row.isRepeat;
                const week = row.whichDay;
                const startTime = row.startTime;
                const endTime = row.endTime;
                if(isRepeat == "0") {
                    return "每天" + " / (" + startTime + " - " + endTime + ")";
                } else if (isRepeat == "1") {
                    return "隔天" + " / (" + startTime + " - " + endTime + ")";
                } else if (isRepeat == "2") {
                    return "每周" + " / " + week + " / (" + startTime + " - " + endTime + ")";
                } else if (isRepeat == "3") {
                    return "隔周" + " / " + week + " / (" + startTime + " - " + endTime + ")";
                }
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
                params.append("name",  this.searchform.name.trim());
                params.append("teacherName",  this.searchform.teacherName.trim());
                params.append("mainName",  this.searchform.mainName.trim());
                params.append("subName",  this.searchform.subName.trim());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_class_list, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },

            reseta() {
                this.searchform = {
                    name: "",
                    teacherName: "",
                    mainName: "",
                    subName: "",
                };
                this.search(this.currentPage, this.pageSize)
            },
        },
        data() {
            return {
                bgClass: "aiocw",
                searchform: {
                    name: "",
                    teacherName: "",
                    mainName: "",
                    subName: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
                activeTeachers: [],
                mainSubjects: [],
                areaOptions: [],
                area:[],
            }
        },
    }
</script>

<style scoped>

</style>
<style>

</style>