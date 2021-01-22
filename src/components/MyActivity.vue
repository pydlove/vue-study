<template>
    <div>
        <el-divider content-position="left">
            我参与的活动
        </el-divider>
        <div>
            <el-table :data="activities" size="small" border style="width: 100%">
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
                <el-table-column prop="title" label="活动主题" show-overflow-tooltip="true"></el-table-column>
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
            <Pagination class="fr mb-20 mt-20" ref="sPaginationRef" @search="initActivities"></Pagination>
        </div>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination"

    export default {
        name: "MyActivity",
        components: {Pagination},
        mounted() {
            this.initActivities(0, 10);
        },
        methods: {
            toDetail(row) {
                const detail = this.$router.resolve({name: 'activityDetail'});
                this.$utils.setStorage("activity", row);
                window.open(detail.href,'_blank');
            },

            async initActivities(currentPage, pageSize) {
                this.atCurrentPage = currentPage;
                this.atPageSize = pageSize;
                let params = new FormData();
                params.append("page", this.atCurrentPage);
                params.append("limit", this.atPageSize);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_activity_my_list, params, "POST");
                if (data.code === 200) {
                    this.activities = data.data;
                    this.$refs.sPaginationRef.totalCount = data.totalCount;
                }
            },

            fmtActivityStatus(status) {
                switch (status) {
                    case "0":
                        return "报名中";
                    case "1":
                        return "未发布";
                    case "2":
                        return "进行中";
                    case "3":
                        return "已结束";
                    default:
                        return status;
                }
            },
        },
        data() {
            return {
                activities:[],
                atCurrentPage: 1,
                atPageSize: 10,
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