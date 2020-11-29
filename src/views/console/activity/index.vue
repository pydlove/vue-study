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

                <el-form-item label="课程名称" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入课程大类名称"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-button class="ml-20 aioc-btn" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
                <el-button class="aioc-btn1" v-aba="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">增加</el-button>
                <el-button v-aba="['d']" type="danger" icon="el-icon-delete" size="small" @click="deletea">批量删除</el-button>
                <el-button v-aba="['d']" type="warning" icon="el-icon-close" size="small" @click="toggleSelection">取消选择</el-button>
            </div>

            <el-table
                    class="aioc-table"
                    ref="codeTable"
                    :data="tableData"
                    @selection-change='onTableSelectChange'
                    @row-click='tableRowClick'
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'9px 1px'}"
            >
                <el-table-column prop="img" label="活动海报" width="122px">
                    <template slot-scope="scope">
                        <el-image
                                style="width: 100px; height: 50px"
                                :src="scope.row.poster"
                                fit="fit"
                                :preview-src-list="scope.row.posters"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="活动主题" show-overflow-tooltip="true" width="150px"></el-table-column>
                <el-table-column prop="desc" label="活动描述" show-overflow-tooltip="true" width="150px"></el-table-column>
                <el-table-column prop="time" label="活动时间" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="活动地点" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="capacity" label="活动总人数" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="score" label="累计学分" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="cost" label="报名费用(¥)" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="startTime" label="活动开始时间" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="endTime" label="活动结束时间" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="teacher" label="负责人" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="status" label="活动状态" show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == 0 ? 'success':'info'" class="fb" effect="dark">
                            {{fmtActivityStatus(scope.row.status)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  fixed="right" width="260">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status == '2'">
                            <el-button class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="editRow(scope.row)">编辑</el-button>
                            <el-button
                                    v-aba="['d']"
                                    size="mini"
                                    type="danger"
                                    @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                            <el-button class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="preview(scope.row)">预览</el-button>
                        </div>
                        <div v-else-if="scope.row.status == '0' || scope.row.status == '1'">
                            <el-button class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="seeSignInfo(scope.row)">查看报名信息</el-button>
                            <el-button class="aioc-btn1"
                                       v-aba="['e']"
                                       size="mini"
                                       @click="preview(scope.row)">预览</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        </el-card>
        <Add ref="addRef"></Add>
        <Edit ref="editRef"></Edit>
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

    export default {
        name: "index",
        components: {Pagination, Add, Edit, SignInfo, Detail},
        mounted() {
            this.search(0, 10);
        },
        methods: {
            preview(row) {
                this.$refs.detailRef.open();
                this.$refs.detailRef.setActivity(row);
            },

            seeSignInfo(row) {
                console.log(row)
                this.$refs.signRef.open();
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
                console.log(row)
                var timeRange = [];
                timeRange.push(row.startTime);
                timeRange.push(row.endTime);
                this.$refs.editRef.form = {
                    id: row.id,
                    title: row.title,
                    desc: row.desc,
                    time: row.time,
                    poster: [{name: 'food.jpeg', url: row.poster}],
                    teacher: row.teacher,
                    address: row.address,
                    capacity: row.capacity,
                    score: row.score,
                    isNeedCost: row.isNeedCost,
                    cost: row.cost,
                    timeRange: timeRange,
                    content: row.content,
                    status: row.status,
                };
                this.$refs.editRef.open();
            },

            /**
             * 批量删除
             * 单行删除
             * 删除请求
             */
            deletea() {
                if(this.checkRows.length == 0) {
                    this.$promptMsg("至少需要选择一条数据", "error");
                    return;
                }
                for(var i in this.checkRows) {
                    var row = this.checkRows[i];
                    this.checkRowIds.push("\"" + row.id + "\"");
                }
                this.deleteRequest();
            },
            deleteRow(index, row) {
                this.checkRowIds = [];
                this.checkRowIds.push("\"" + row.id + "\"");
                this.deleteRequest();
            },
            deleteRequest() {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
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
                // let params = new FormData()
                // params.append("page", this.currentPage);
                // params.append("limit", this.pageSize);
                // params.append("name",  this.searchform.name);
                // let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_role_list, params, "POST");
                // if (data.code === 200) {
                //     this.tableData = data.data;
                //     this.$refs.pageRef.totalCount = data.totalCount;
                //     return true;
                // }
                this.tableData = [];
                for(var i=0; i < 10; i++) {
                    var status = "2";
                    if(i > 2 && i < 8) {
                        status = "0";
                    } else if(i >= 8 && i <= 10) {
                        status = "1";
                    }
                    var uuidObj = {
                        id: i+1,
                        title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                        desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动，旨在赛前为跑友们提供专," +
                        "业的马拉松训练课程，帮助跑友掌握科学有效的训练方式，合理备战、实现目标。前两期的2019" +
                        "汕马官方训练营已分别在10月和11月顺利举行。",
                        poster: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
                        posters: ["https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"],
                        time: "2019-12-09",
                        address: "汕头开放广场",
                        teacher: "郭嘉",
                        capacity: "120",
                        score: "3",
                        isNeedCost: "0",
                        cost: "100",
                        startTime: "2019-12-09 10:00:00",
                        endTime: "2019-12-13 10:00:00",
                        content: '"<p class="ql-align-center"><img src="http://localhost:8080/img/1.27590ef4.png"></p><p class="ql-align-center">2019中国交建·汕头国际马拉松</p><p class="ql-align-center">倒计时&nbsp;13&nbsp;天</p><p class="ql-align-center">跑友们期待已久的2019汕马官方训练营</p><p class="ql-align-center">又将如期与大家见面啦</p><p class="ql-align-center"><br></p><p class="ql-align-center">这也是本年度汕马官方训练营的最后一期</p><p class="ql-align-center">届时会有更加系统、科学的赛前训练课程</p><p class="ql-align-center">以及马拉松参赛的经验和技巧分享内容</p><p class="ql-align-center"><br></p><p class="ql-align-center">因市海滨体育场关闭改造</p><p class="ql-align-center">本次2019汕马官方训练营</p><p class="ql-align-center">将在市开放广场进行</p><p class="ql-align-center">跑友们可不要跑错啦</p><p class="ql-align-center"><span style="background-color: rgb(238, 238, 238);">汕马训练营</span></p><p class="ql-align-center">汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动，旨在赛前为跑友们提供专</p><p class="ql-align-center">业的马拉松训练课程，帮助跑友掌握科学有效的训练方式，合理备战、实现目标。前两期的2019</p><p class="ql-align-center">汕马官方训练营已分别在10月和11月顺利举行。</p><p class="ql-align-center"><span style="background-color: rgb(249, 211, 74);">【2019汕马第三期官方训练营基本信息】</span></p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><p class="ql-align-center">训练时间</p><p class="ql-align-center">12月15日8:30-10:30（周日）</p><p class="ql-align-center"><br></p><p class="ql-align-center">训练地点</p><p class="ql-align-center">市开放广场</p><p class="ql-align-center"><br></p><p class="ql-align-center">限报人数</p><p class="ql-align-center">120人（额满即止）</p><p class="ql-align-center"><br></p><p class="ql-align-center">时间安排</p><p><br></p>"',
                        status: status,
                    };
                    this.tableData.push(uuidObj);
                }
                this.$refs.pageRef.totalCount = this.tableData.length;
            },

            reseta() {
                this.searchform = {
                    name: "",
                    status: "",
                };
            },

            fmtActivityStatus(status) {
                switch (status) {
                    case "0":
                        return "报名中";
                    case "1":
                        return "已结束";
                    case "2":
                        return "未发布";
                    default:
                        return status;
                }
            },
        },
        data() {
            return {
                searchform: {
                    name: "",
                },
                tableData: [],
                checkRows: [],
                checkRowIds: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                currentPage: 0,
                pageSize: 10,
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