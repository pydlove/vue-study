<template>
    <div>
        <div class="aioc-pc">
            <Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'" :bgColor="'bg-black'"></Header>
        </div>
        <div class="aioc-container1" :style="'width:' + clientWidth + 'px; height:' + clientHeight + 'px;'">
            <div class="dfjc">
                <div class="hdm">
                    <el-card shadow="always">
                        <el-input placeholder="请输入活动名称进行搜索（支持名称模糊搜索），如：活动" v-model="input3" class="mb-20">
                            <template slot="prepend">活动名称</template>
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>


                        <el-card class="mb-10 hdcard" v-for="item in activities" :key="item.id">
                            <div class="hdlb">
                                <el-image
                                        style="width: 250px;height: 143px;border-radius: 3px;"
                                        :src="item.img"
                                        fit="fill"></el-image>
                                <div class="hdxx">
                                    <span class="hdzt">
                                        {{item.title.length >= 26 ? (item.title.substring(0, 26) + "..."):item.title}}
                                    </span>
                                    <span class="item"><i class="naoling"></i>活动时间：{{item.time}}</span>
                                    <span class="item"><i class="weizhi"></i>活动地点：{{item.address}}</span>
                                    <span class="item"><i class="renshu"></i>限定人数：{{item.capacity}} 人</span>
                                    <span class="item"><i class="feiyong"></i>报名费用：{{item.cost}}元</span>
                                    <span class="item"><i class="shijian"></i>报名日期：{{item.startTime}} 至 {{item.endTime}}</span>
                                </div>
                                <span :class="(item.status == '0'? 'hdbqg':'hdbqgr') + ' hdbq'">
                                        {{item.status == '0' ? "活动中":"已结束"}}
                                   </span>
                                <span class="ckxq ahover" @click="toActivityDetailPage(item)">查看详情</span>
                            </div>
                        </el-card>

                        <Pagination class="mt-10" ref="pageRef" @search="search"></Pagination>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import Pagination from  "@/components/Pagination"

    export default {
        name: "index",
        components: {Header, Pagination},
        mounted() {
        },
        methods: {
            toActivityDetailPage(item) {
                const detail = this.$router.resolve({name: 'activityDetail'});
                this.$utils.setStorage("activity", item);
                window.open(detail.href,'_blank');
            },
        },
        data() {
            return {
                activePage: '活动中心',
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight -100,
                activities: [
                    {
                        id: "0",
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
                        use: "1005",
                        cost: "100",
                        startTime: "2019-12-09",
                        endTime: "2019-12-13",
                        img: require("@/assets/img/steamWave.jpg"),
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
                        use: "1005",
                        cost: "100",
                        startTime: "2019-12-09",
                        endTime: "2019-12-13",
                        img: require("@/assets/img/zbsytp.jpg"),
                        status: "0",
                    }
                    ,{
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
                    }
                ],
            }
        },
    }
</script>

<style scoped>

        .hdm {
            width: 1500px;
            margin-top: 10px;
            padding-bottom: 30px;
        }
        .hdlb {
            display: flex;
            flex-wrap: nowrap;
            position: relative;
        }
        .hdxx {
            display: flex;
            flex-direction: column;
            text-align: left;
        }
        .hdzt {
            font-size: 22px;
            margin-bottom: 10px;
            margin-left: 20px;
            font-weight: 600;
        }
        .ckxq {
            position: absolute;
            bottom: 0px;
            right: 0px;
            font-size: 14px;
            color: #409EFF;
        }
        .item {
            display: flex;
            color: #707070;
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 2px;
            margin-left: 10px;
        }
        .hdcard {
            position: relative;
        }
        .hdbq {
            display: inline-block;
            width: 50px;
            height: 16px;
            font-size: 12px;
            font-weight: 600;
            color: #ffffff;
            padding: 5px 5px 12px 5px;
            position: absolute;
            top: -20px;
            right: 5px;
        }
        .hdbqg {
            background: url("../../../assets/img/biaoqiang.png") 0 0 no-repeat;
            background-size: 100% 100%;
        }
        .hdbqgr {
            background: url("../../../assets/img/biaoqiangr.png") 0 0 no-repeat;
            background-size: 100% 100%;
        }
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