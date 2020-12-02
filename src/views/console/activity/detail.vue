<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="活动预览"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                width="1200px"
                :fullscreen="true"
                :before-close="close"
                center>
            <el-card shadow="hover">
                <div slot="header" class="clearfix">
                    <span class="fl color-fa5c26 fb">活动详情</span>
                </div>
                <div class="dffn">
                    <el-image style="width: 550px;height: 300px;border-radius: 3px;"
                              :src="activity.poster" :lazy="true"
                              fit="fit"
                              :preview-src-list="[activity.poster]"
                    ></el-image>
                    <div class="hdxx">
                                    <span class="hdzt">
                                        {{activity.title}}
                                    </span>
                        <span class="item"><i class="naoling new-icons"></i>活动时间：{{activity.startTime}} - {{activity.endTime}}</span>
                        <span class="item"><i class="weizhi new-icons"></i>活动地点：{{activity.address}}</span>
                        <span class="item"><i class="renshu new-icons"></i>限定人数：{{activity.peopleLimit}} 人</span>
                        <span class="item"><i class="feiyong new-icons"></i>报名费用：
                            <span v-if="activity.isFree == '0'">
                                {{activity.cost}}元
                            </span>
                            <div v-else>
                                {{免费}}
                            </div>
                        </span>
                        <span class="item"><i class="fenshu new-icons"></i>累计学分：{{activity.score}}</span>
                        <span class="item"><i class="shijian new-icons"></i>报名日期：{{activity.signupStart}} 至 {{activity.signupEnd}}</span>
                        <div>
                            <span class="hdjxz">
                                {{getActivityStatus(activity.status)}}
                            </span>
                        </div>
                    </div>
                </div>
            </el-card>

            <el-card v-if="activity.status != '1'" shadow="hover" class="mt-10">
                <div slot="header" class="clearfix">
                    <span class="fl color-fa5c26 fb">报名情况</span>
                    <span class="fl color-409EFF fb">
                                    （{{signs.length}}）
                                </span>
                </div>
                <div class="dffw">
                    <div v-for="(item, index) in signs" :key="index" class="dffc mr-20">
                        <el-avatar :size="50"  :src="item.avatar"></el-avatar>
                        <span class="bmxm">{{item.name}}</span>
                    </div>
                </div>
            </el-card>

            <el-card shadow="hover" class="mt-10 mb-20">
                <div slot="header" class="clearfix">
                    <span class="fl color-fa5c26 fb">活动介绍</span>
                </div>
                <div class="ql-container ql-snow">
                    <div class="ql-editor">
                        <div class="ct" v-html="activity.content"></div>
                    </div>
                </div>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "detail",
        mounted() {
        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },

            setActivity(activity) {
                this.activity = activity;
            },

            getActivityStatus(status) {
                switch (status) {
                    case "0":
                        return "活动报名中";
                    case "1":
                        return "活动未发布";
                    case "2":
                        return "活动进行中";
                    case "3":
                        return "活动已结束";
                    default:
                        return status;
                }
            },
        },
        data() {
            return {
                dialogVisible: false,
                activity: {
                    id: "",
                    title: "",
                    description: "",
                    poster: [],
                    startTime: "",
                    endTime: "",
                    address: "",
                    peopleLimit: "",
                    score: "",
                    isFree: "",
                    cost: "",
                    signupStart: "",
                    signupEnd: "",
                    content: "",
                    status: "",
                    teacherIds: [],
                    teachers: [],
                },
                e1: require("@/assets/img/em/1.png"),
                e2: require("@/assets/img/em/2.png"),
                e3: require("@/assets/img/em/3.png"),
                e4: require("@/assets/img/em/4.png"),
                e5: require("@/assets/img/em/5.png"),
                e6: require("@/assets/img/em/6.png"),
                signs: [
                    {
                        name: "张辽",
                        avatar: require("@/assets/img/avatar/avatar-1.jpg"),
                    },
                    {
                        name: "李清照",
                        avatar: require("@/assets/img/avatar/avatar-1.jpg"),
                    },
                    {
                        name: "王豆豆",
                        avatar: require("@/assets/img/avatar/avatar-1.jpg"),
                    }
                ],
            }
        },
    }
</script>

<style scoped>
    .hdxx {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-left: 50px;
    }
    .hdzt {
        font-size: 26px;
        margin-bottom: 10px;
        margin-left: 10px;
        font-weight: 600;
    }
    .item {
        display: flex;
        color: #707070;
        font-size: 18px;
        line-height: 31px;
        margin-bottom: 2px;
    }
    .new-icons {
        width: 25px !important;
        height: 25px !important;
    }
    .hdjxz {
        margin-top: 10px;
        display: inline-block;
        padding: 15px 50px 15px 50px;
        border: 3px solid #da231c;
        margin-left: 10px;
        border-radius: 3px;
        color: #da231c;
        font-size: 22px;
        font-weight: 600;
    }
    .bmxm {
        font-size: 12px;
        color: #606266;
        margin-top: 5px;
        text-align: center;
    }
    .ct {
        padding: 50px;
        line-height: 20px;
        text-align: unset;
    }
    .ql-container.ql-snow {
      border: 0px;
    }
</style>

<style>

</style>