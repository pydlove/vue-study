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

                <el-form-item label="活动名称" prop="name">
                    <el-input
                            v-model="searchform.name"
                            class="wp-180 mr-10"
                            placeholder="请输入活动名称"
                            prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>

                <el-form-item label="活动状态" prop="name">
                    <el-select v-model="searchform.status" placeholder="请选择活动状态">
                        <el-option label="报名中" value="0"></el-option>
                        <el-option label="已结束" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-button class="ml-20 aioc-btn" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
                <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
            </el-form>

            <div class="mb-10 mt-40">
            </div>

            <el-table
                    class="aioc-table"
                    ref="roleTable"
                    :data="tableData"
                    @selection-change='onTableSelectChange'
                    @row-dblclick='showDetail'
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'9px 1px'}"
            >

                <el-table-column prop="img" label="活动海报" width="121px">
                    <template slot-scope="scope">
                        <el-image
                                style="width: 100px; height: 50px"
                                :src="scope.row.img"
                                fit="fit"
                                :preview-src-list="scope.row.imgs"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="活动主题" show-overflow-tooltip="true" width="150px"></el-table-column>
                <el-table-column prop="time" label="活动时间" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address" label="活动地点" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="capacity" label="活动总人数" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="score" label="累计学分" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="cost" label="报名费用(¥)" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="startTime" label="活动开始时间" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="endTime" label="活动结束时间" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="principal" label="负责人" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="status" label="活动状态" show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == 0 ? 'success':'info'" class="fb" effect="dark">
                            {{fmtActivityStatus(scope.row.status)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button v-aba="['e']"
                                   size="mini"
                                   type=""
                                   @click="showDetail(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
        </el-card>
        <ActivityDetail ref="activityDetailRef"></ActivityDetail>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination";
    import ActivityDetail from "@/views/teacher/activity/detail";

    export default {
        name: "index",
        components: {Pagination, ActivityDetail},
        mounted() {
            this.search(0, 10);
        },
        methods: {
            showDetail(row) {
                this.$refs.activityDetailRef.open();
                this.$refs.activityDetailRef.setActivity(row);
            },

            fmtActivityStatus(status) {
                switch (status) {
                    case "0":
                        return "报名中";
                    case "1":
                        return "已结束";
                    default:
                        return status;
                }
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
                this.tableData = [
                    {
                        id: "3",
                        title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                        desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动，旨在赛前为跑友们提供专," +
                        "业的马拉松训练课程，帮助跑友掌握科学有效的训练方式，合理备战、实现目标。前两期的2019" +
                        "汕马官方训练营已分别在10月和11月顺利举行。",
                        time: "2019-12-15",
                        address: "汕头开放广场",
                        capacity: "120",
                        score: "3",
                        use: "1005",
                        cost: "100",
                        startTime: "2019-12-09",
                        endTime: "2019-12-13",
                        img: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        status: "1",
                        principal: "欧阳娜娜",
                    },
                    {
                        id: "3",
                        title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                        desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动，旨在赛前为跑友们提供专," +
                        "业的马拉松训练课程，帮助跑友掌握科学有效的训练方式，合理备战、实现目标。前两期的2019" +
                        "汕马官方训练营已分别在10月和11月顺利举行。",
                        time: "2019-12-15",
                        address: "汕头开放广场",
                        capacity: "120",
                        score: "3",
                        use: "1005",
                        cost: "100",
                        startTime: "2019-12-09",
                        endTime: "2019-12-13",
                        img: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        status: "1",
                        principal: "欧阳娜娜",
                    },
                    {
                        id: "0",
                        title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                        desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动。",
                        time: "2019-12-15",
                        address: "汕头开放广场",
                        capacity: "120",
                        score: "3",
                        use: "100",
                        cost: "100",
                        startTime: "2019-12-09",
                        endTime: "2019-12-13",
                        img: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        imgs: ["https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"],
                        status: "0",
                        principal: "欧阳娜娜",
                    },
                    {
                        id: "1",
                        title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                        desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动，旨在赛前为跑友们提供专," +
                        "业的马拉松训练课程，帮助跑友掌握科学有效的训练方式，合理备战、实现目标。前两期的2019" +
                        "汕马官方训练营已分别在10月和11月顺利举行。",
                        time: "2019-12-15",
                        address: "汕头开放广场",
                        capacity: "120",
                        score: "3",
                        use: "100",
                        cost: "100",
                        startTime: "2019-12-09",
                        endTime: "2019-12-13",
                        img: require("@/assets/img/steamWave.jpg"),
                        imgs: [require("@/assets/img/steamWave.jpg")],
                        status: "0",
                        principal: "欧阳娜娜",
                    },
                    {
                        id: "2",
                        title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                        desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动，旨在赛前为跑友们提供专," +
                        "业的马拉松训练课程，帮助跑友掌握科学有效的训练方式，合理备战、实现目标。前两期的2019" +
                        "汕马官方训练营已分别在10月和11月顺利举行。",
                        time: "2019-12-15",
                        address: "汕头开放广场",
                        capacity: "120",
                        score: "3",
                        use: "100",
                        cost: "100",
                        startTime: "2019-12-09",
                        endTime: "2019-12-13",
                        img: require("@/assets/img/zbsytp.jpg"),
                        imgs: [require("@/assets/img/zbsytp.jpg")],
                        status: "0",
                        principal: "欧阳娜娜",
                    },
                    {
                        id: "3",
                        title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                        desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动。",
                        time: "2019-12-15",
                        address: "汕头开放广场",
                        capacity: "120",
                        score: "3",
                        use: "100",
                        cost: "100",
                        startTime: "2019-12-09",
                        endTime: "2019-12-13",
                        img: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        imgs: ["https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"],
                        status: "1",
                        principal: "欧阳娜娜",
                    },
                    {
                        id: "3",
                        title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                        desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动。",
                        time: "2019-12-15",
                        address: "汕头开放广场",
                        capacity: "120",
                        score: "3",
                        use: "100",
                        cost: "100",
                        startTime: "2019-12-09",
                        endTime: "2019-12-13",
                        img: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        imgs: ["https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"],
                        status: "1",
                        principal: "欧阳娜娜",
                    },
                    {
                        id: "3",
                        title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                        desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动。",
                        time: "2019-12-15",
                        address: "汕头开放广场",
                        capacity: "120",
                        score: "3",
                        use: "100",
                        cost: "100",
                        startTime: "2019-12-09",
                        endTime: "2019-12-13",
                        img: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        imgs: ["https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"],
                        status: "1",
                        principal: "欧阳娜娜",
                    },
                    {
                        id: "3",
                        title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                        desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动。",
                        time: "2019-12-15",
                        address: "汕头开放广场",
                        capacity: "120",
                        score: "3",
                        use: "100",
                        cost: "100",
                        startTime: "2019-12-09",
                        endTime: "2019-12-13",
                        img: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        imgs: ["https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"],
                        status: "1",
                        principal: "欧阳娜娜",
                    },
                    {
                        id: "3",
                        title: "最后一期！2019汕头国际马拉松第三期官方训练营报名启动",
                        desc: "汕头国际马拉松官方训练营由汕头市长跑协会主办的非盈利性公益活动。",
                        time: "2019-12-15",
                        address: "汕头开放广场",
                        capacity: "120",
                        score: "3",
                        use: "100",
                        cost: "100",
                        startTime: "2019-12-09",
                        endTime: "2019-12-13",
                        img: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        imgs: ["https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"],
                        status: "1",
                        principal: "欧阳娜娜",
                    },
                ];
                this.$refs.pageRef.totalCount = this.tableData.length;
            },

            reseta() {
                this.searchform = {
                    name: "",
                    status: "",
                };
            },
        },
        data() {
            return {
                searchform: {
                    name: "",
                },
                tableData: [],
                checkRows: [],
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
</style>