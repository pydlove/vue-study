<template>
    <div>
        <el-divider content-position="left">
            我参与的活动
        </el-divider>
        <div>
            <el-table :data="activities" size="small" border style="width: 100%">
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
                <el-table-column prop="status" label="活动状态" show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == 0 ? 'success':'info'" class="fb" effect="dark">
                            {{fmtActivityStatus(scope.row.status)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="" size="mini" @click="toDetail(scope.row)">
                            <div class="dfjc lh-20">
                                详情
                            </div>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="fr mb-20 mt-20" ref="sPaginationRef"></Pagination>
        </div>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination"

    export default {
        name: "MyActivity",
        components: {Pagination},
        mounted() {

        },
        methods: {
            toDetail(row) {
                const detail = this.$router.resolve({name: 'activityDetail'});
                this.$utils.setStorage("activity", row);
                window.open(detail.href,'_blank');
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
            }
        },
        data() {
            return {
                activities: [
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
                    }
                    ,{
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
                    }
                ],
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
    }

    /*媒体查询（平板）*/
    @media screen and (min-width: 769px) and (max-width: 996px) {

    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {


    }
</style>

<style>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
    }
</style>