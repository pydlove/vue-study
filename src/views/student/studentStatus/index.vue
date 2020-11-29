<template>
    <div>
        <div class="aioc-pc">
            <Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'" :bgColor="'bg-black'"></Header>
        </div>

        <div class="aioc-container1" :style="'width:' + clientWidth + 'px; height:' + clientHeight + 'px;'">
            <div class="tl xjxx" :style="'width:' + cardWidth + 'px;'">
                <div class="dffn">
                    <el-card class="mr-10 fs-15 color-303133 wow bounceInLeft" :style="'width:' + (photoWidth + 40) + 'px;'">
                        <el-image
                                :src="user.photo"
                                :style="'width:' + photoWidth + 'px;height:' + photoHeight + 'px;'"
                                alt="" @click="showUpPhoto = true" :preview-src-list="srcList"></el-image>
                         <div class="mt-20 lh-20">
                             <span class="fb">
                                 姓<span class="zwf"></span>名：
                             </span>
                             <span>{{user.name}}</span>
                         </div>

                         <div class="mt-20 lh-20">
                            <span class="fb">
                                性<span class="zwf"></span>别：
                            </span>
                            <span>{{user.sex}}</span>
                         </div>

                         <div class="mt-20 lh-20">
                            <span class="fb">出生年月：</span>
                            <span>{{user.birth}}</span>
                         </div>

                         <div class="mt-20 lh-20">
                            <span class="fb">联系方式：</span>
                            <span>{{user.phone}}</span>
                         </div>

                         <div class="mt-20 lh-20">
                            <span class="fb">
                                身<span class="zwf1"></span>份<span class="zwf1"></span>证：
                            </span>
                            <div>{{user.idCard}}</div>
                         </div>

                         <div class="mt-20 lh-20">
                            <span class="fb">家庭住址：</span>
                            <div>{{user.address}}</div>
                         </div>
                    </el-card>

                    <div class=" wow bounceInRight">
                        <el-card class="mb-10" :style="'width:' + (cardWidth - photoWidth - 80 - 10) + 'px;'">
                            <div class="xf dffn">
                                <Score class="ml-50" :score="user.score"></Score>
                                <div class="tl xfts">
                                    <div class="mt-20 ml-20">
                                        <span class="fs-20">{{user.name}}</span>，你好，2020-2021学年的累计学分为<span class="fs-30 color-fa5c26">88</span>分
                                    </div>
                                    <div class="mt-20 fs-12 lh-20 color-ae0000a6 dffn">
                                        <div>
                                            <el-image :src="require('@/assets/img/avatar/longmao.png')"></el-image>
                                        </div>
                                        <div class="ml-20">
                                            <div class="fb">学分须知：</div>
                                            <div>
                                                如果您的学分低于60分，您本学年的成绩将评估为不及格，
                                                对于不及格的学生，账号将在下学年给予一整年的静默惩戒，即下学年不能够报名科目学习和活动。
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-card>

                        <el-card class="mb-10" :style="'width:' + (cardWidth - photoWidth - 80 - 10) + 'px;'">
                            <div slot="header" class="clearfix">
                                <span class="fl fb">已选课程</span>
                            </div>
                            <el-table :data="subjects" border style="width: 100%">
                                <el-table-column prop="main" label="课程大类" show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="sub" label="课程小类" show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="address" label="地点" show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="time" label="时间" show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="remainingClassTime" label="剩余课时（时）" show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="classTime" label="总课时（时）" show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="teacher" label="老师" show-overflow-tooltip="true"></el-table-column>
                            </el-table>
                            <Pagination class="fr mt-10 mb-20" ref="sPaginationRef"></Pagination>
                        </el-card>

                        <el-card class="mb-10" :style="'width:' + (cardWidth - photoWidth - 80 - 10) + 'px;'">
                            <div slot="header" class="clearfix">
                                <span class="fl fb">完结课程</span>
                            </div>
                            <el-table :data="endSubjects" border style="width: 100%">
                                <el-table-column prop="main" label="课程大类" show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="sub" label="课程小类" show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="classTime" label="总课时（时）" show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="score" label="课程学分" show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                    <span :class="scope.row.score > 60 ? 'color-67C23A':'color-fa5c26'">
                                        {{scope.row.score}}
                                    </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="time" label="证书数量" show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                    <span :class="scope.row.certificates.length > 0 ? 'color-67C23A':'color-fa5c26'">
                                        {{scope.row.certificates.length}}
                                    </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="teacher" label="授课老师" show-overflow-tooltip="true"></el-table-column>
                            </el-table>
                            <Pagination class="fr mt-10 mb-20" ref="ePaginationRef"></Pagination>
                        </el-card>

                        <el-card class="mb-10" :style="'width:' + (cardWidth - photoWidth - 80 - 10) + 'px;'">
                            <div slot="header" class="clearfix">
                                <span class="fl fb">活动经历</span>
                            </div>
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
                                <el-table-column prop="status" label="活动状态" show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.status == 0 ? 'success':'info'" class="fb" effect="dark">
                                            {{fmtActivityStatus(scope.row.status)}}
                                        </el-tag>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <Pagination class="fr mb-20 mt-20" ref="sPaginationRef"></Pagination>
                        </el-card>


                        <el-card class="mb-10" :style="'width:' + (cardWidth - photoWidth - 80 - 10) + 'px;'">
                            <div slot="header" class="clearfix">
                                <span class="fl fb">获奖情况</span>
                            </div>
                            <el-table :data="certificates" border size="mini" style="width: 100%">
                                <el-table-column prop="no" label="证书编号" show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="name" label="荣誉名称" show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="getTime" label="获得时间" show-overflow-tooltip="true"></el-table-column>
                            </el-table>
                            <Pagination class="fr mb-20 mt-20" ref="sPaginationRef"></Pagination>
                        </el-card>

                        <el-card :style="'width:' + (cardWidth - photoWidth - 80 - 10) + 'px;'">
                            <div slot="header" class="clearfix">
                                <span class="fl fb">缴费情况</span>
                            </div>
                            <el-table :data="orders" border size="mini" style="width: 100%">
                                <el-table-column prop="no" label="订单编号" show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="cost" label="报名费用" show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <span class="color-fa5c26 fb">{{scope.row.cost}}元</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" label="状态" show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                        <span class="color-67C23A fb">{{scope.row.status}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desc" label="费用用途" show-overflow-tooltip="true"></el-table-column>
                            </el-table>
                            <Pagination class="fr mb-20 mt-20" ref="sPaginationRef"></Pagination>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import Score from  "@/components/Score"
    import Pagination from  "@/components/Pagination"

    export default {
        name: "index",
        components: {Header, Score, Pagination},
        mounted() {
            new this.$wow.WOW({
                live: false
            }).init();
        },
        methods: {
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
        },
        data() {
            return {
                activePage: '学籍信息',
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight -100,
                user: {
                    id: "1",
                    name: "欧阳娜娜",
                    sex: "女",
                    idCard: "342901200806132846",
                    birth: "2008-06-13",
                    address: "安徽省合肥市瑶海区磨店",
                    phone: "13648964520",
                    photo: require("@/assets/img/ouynn.jpg"),
                    score: 88,
                },
                srcList: [
                    require("@/assets/img/ouynn.jpg"),
                ],
                photoWidth: 207,
                photoHeight: 313,
                cardWidth: 1200,
                orders: [
                    {
                        id: "1",
                        no: "20200506898989",
                        cost: "100",
                        status: "已支付",
                        time: "2020-11-5 15:30:16",
                        desc: " 用于支付报名参加绘画-中国画12岁以上、摄影-摄影入门12岁以上学习所产生的报名费用",
                    }
                ],
                certificates: [
                    {
                        id: "1",
                        no: "20200506898989",
                        name: "安徽柏林书画研究院三好学生",
                        getTime: "2020-11-6",
                    }
                ],
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
                subjects: [
                    {
                        id: "1",
                        main: "绘画",
                        sub: "中国画12岁以上",
                        address: "美都广场C座511",
                        time: "每周一下午两点",
                        teacher: "欧阳修",
                        classTime: "40",
                        remainingClassTime: "20",
                    },
                    {
                        id: "2",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        address: "丁兰广场C座511",
                        time: "每周一下午两点",
                        teacher: "欧阳修",
                        classTime: "40",
                        remainingClassTime: "20",
                    },
                    {
                        id: "2",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        address: "丁兰广场C座511",
                        time: "每周一下午两点",
                        teacher: "欧阳修",
                        classTime: "40",
                        remainingClassTime: "20",
                    },
                    {
                        id: "2",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        address: "丁兰广场C座511",
                        time: "每周一下午两点",
                        teacher: "欧阳修",
                        classTime: "40",
                        remainingClassTime: "20",
                    },
                    {
                        id: "2",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        address: "丁兰广场C座511",
                        time: "每周一下午两点",
                        teacher: "欧阳修",
                        classTime: "40",
                        remainingClassTime: "20",
                    },
                ],
                endSubjects: [
                    {
                        id: "3",
                        main: "绘画",
                        sub: "中国画12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "86",
                        certificates: [
                            {
                                id: "1",
                                no: "20200506898989",
                                name: "安徽柏林书画研究院三好学生",
                                getTime: "2020-11-6",
                            }
                        ],
                        teacher: "欧阳修",
                    },
                    {
                        id: "4",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "58",
                        certificates: [],
                        teacher: "李清照",
                    },
                    {
                        id: "4",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "58",
                        certificates: [],
                        teacher: "李清照",
                    },
                    {
                        id: "4",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "58",
                        certificates: [],
                        teacher: "李清照",
                    },
                    {
                        id: "4",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "58",
                        certificates: [],
                        teacher: "李清照",
                    },
                    {
                        id: "4",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "58",
                        certificates: [],
                        teacher: "李清照",
                    },
                    {
                        id: "4",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        classTime: "40",
                        remainingClassTime: "0",
                        score: "58",
                        certificates: [],
                        teacher: "李清照",
                    },
                ],
            }
        },
    }
</script>

<style scoped>
        .circle-credit{
            position:relative;

        }
        .circle-container{
            position:absolute;
            left:calc((100% - 130px) / 2);
            top:20px;
            width:130px;
            height:130px;
            transform:rotate(-135deg);
            -ms-transform:rotate(-135deg); /* Internet Explorer */
            -moz-transform:rotate(-135deg); /* Firefox */
            -webkit-transform:rotate(-135deg); /* Safari 和 Chrome */
            -o-transform:rotate(-135deg); /* Opera */
        }
        .zwf {
           margin-left: 28px;
        }
        .zwf1 {
           margin-left: 7px;
        }
        .fitem {
            width: 300px;
        }
        .xjxx {
            margin: 10px auto;
            margin-bottom: 20px;
            width: 1200px;
            display: flex;
            flex-wrap: nowrap;
        }
        .xf {
            background-image: linear-gradient(#5dd9ff, #1979ff);
            width: 100%;
            height: 166px;
            padding-top: 10px;
            text-align: center;
        }
        .xfts {
            width: 500px;
            margin-left: 40px;
            color: #ffffff;
            letter-spacing: 2px;
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