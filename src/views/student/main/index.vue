<template>
    <div>
        <div class="aioc-pc">
            <Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'" :bgColor="'bg-black'"></Header>
        </div>
        <div class="aioc-container1" :style="'width:' + clientWidth + 'px; height:' + clientHeight + 'px;'">
           <div class="dfjc">
               <div class="main">
                   <el-card class="mc1 wow bounceInLeft">
                       <div slot="header" class="clearfix">
                           <span class="fl fb">活动列表</span>
                           <span class="gd ahover fs-12" @click="toActivityPage">查看更多</span>
                       </div>
                       <div class="hdbox">
                           <el-card class="mb-10 hdcard" v-for="item in activities" :key="item.id">
                               <div class="hdlb">
                                   <el-image
                                           style="width: 180px;height: 100px;border-radius: 3px;"
                                           :src="item.img"
                                           fit="fill" :preview-src-list="item.imgs"></el-image>
                                   <div class="hdxx">
                                    <span class="hdzt">
                                        {{item.title.length >= 26 ? (item.title.substring(0, 26) + "..."):item.title}}
                                    </span>
                                       <span class="hdms">
                                        {{item.desc.length > 80 ? (item.desc.substring(0, 80) + "...") : item.desc}}
                                    </span>
                                       <div class="dffn">
                                           <span class="item"><i class="naozhongb"></i>活动时间：{{item.time}}</span>
                                           <span class="item"><i class="weizhib"></i>活动地点：{{item.address}}</span>
                                       </div>
                                   </div>
                                   <span :class="(item.status == '0'? 'hdbqg':'hdbqgr') + ' hdbq'">
                                        {{item.status == '0' ? "活动中":"已结束"}}
                                   </span>
                                   <span class="ckxq ahover" @click="toActivityDetailPage(item)">查看详情</span>
                               </div>
                           </el-card>
                       </div>
                   </el-card>

                   <div class="mc2 wow bounceInRight">
                       <el-card class="mb-10 mcard">
                           <div slot="header" class="clearfix">
                               <span class="fl fb">已选课程</span>
                               <span class="gd ahover fs-12" @click="toPersonCenterPage('myClass')">查看更多</span>
                           </div>
                           <div class="wdxk">
                               <el-table :data="subjects" border size="mini" style="width: 100%">
                                   <el-table-column prop="main" label="课程大类" show-overflow-tooltip="true"></el-table-column>
                                   <el-table-column prop="sub" label="课程小类" show-overflow-tooltip="true"></el-table-column>
                                   <el-table-column prop="address" label="地点" show-overflow-tooltip="true"></el-table-column>
                                   <el-table-column prop="time" label="时间" show-overflow-tooltip="true"></el-table-column>
                                   <el-table-column prop="classTime" label="已消费课时/总课时" show-overflow-tooltip="true">
                                       <template slot-scope="scope">
                                            <span class="color-fa5c26">
                                                {{scope.row.classTime - scope.row.remainingClassTime}}
                                            </span>
                                           /
                                           <span class="color-67C23A">
                                                {{scope.row.classTime}}
                                            </span>
                                       </template>
                                   </el-table-column>
                                   <el-table-column prop="teacher" label="老师" show-overflow-tooltip="true"></el-table-column>
                               </el-table>
                           </div>
                       </el-card>

                       <el-card class="mb-10 mcard">
                           <div slot="header" class="clearfix">
                               <span class="fl fb">完结课程</span>
                               <span class="gd ahover fs-12" @click="toPersonCenterPage('myClass')">查看更多</span>
                           </div>
                           <div class="wdxk">
                               <el-table :data="endSubjects" border size="mini" style="width: 100%">
                                   <el-table-column prop="main" label="课程大类" show-overflow-tooltip="true"></el-table-column>
                                   <el-table-column prop="sub" label="课程小类" show-overflow-tooltip="true"></el-table-column>
                                   <el-table-column prop="classTime" label="总课时" show-overflow-tooltip="true"></el-table-column>
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
                           </div>
                       </el-card>

                       <el-card class="mb-10 mcard">
                           <div slot="header" class="clearfix">
                               <span class="fl fb">证书获得</span>
                               <span class="gd ahover fs-12" @click="toPersonCenterPage('myCertificate')">查看更多</span>
                           </div>
                           <div>
                               <el-table :data="certificates" border size="mini" style="width: 100%">
                                   <el-table-column prop="no" label="证书编号" show-overflow-tooltip="true"></el-table-column>
                                   <el-table-column prop="name" label="荣誉名称" show-overflow-tooltip="true"></el-table-column>
                                   <el-table-column prop="getTime" label="获得时间" show-overflow-tooltip="true"></el-table-column>
                                   <el-table-column label="操作">
                                       <template slot-scope="scope">
                                           <el-button type="primary" size="mini" @click="toSee(scope.$index, scope.row)">
                                               <i class="el-icon-right"></i>
                                               去查看
                                           </el-button>
                                       </template>
                                   </el-table-column>
                               </el-table>
                           </div>
                       </el-card>

                       <el-card class="mcard">
                           <div slot="header" class="clearfix">
                               <span class="fl fb">支付订单</span>
                               <span class="gd ahover fs-12" @click="toPersonCenterPage('myPay')">查看更多</span>
                           </div>
                           <div>
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
                           </div>
                       </el-card>
                   </div>
               </div>
           </div>
        </div>
        <FirstLogin ref="firstLoginRef"></FirstLogin>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import FirstLogin from  "@/components/FirstLogin"

    export default {
        name: "index",
        components: {Header, FirstLogin},
        mounted() {
            this.judgmentIsFirstLogin();
            new this.$wow.WOW({
                live: false
            }).init();
        },
        methods: {
            toActivityPage() {
                this.toNewPage("activity");
            },

            toPersonCenterPage(currentMenu) {
                this.toNewPage("personCenter", "currentMenu", currentMenu);
            },

            toActivityDetailPage(item) {
                this.toNewPage("activityDetail", "activity", item);
            },

            toNewPage(to, key, value) {
                const detail = this.$router.resolve({name: to});
                if(key != undefined && key != null && value != null && value != undefined) {
                    this.$utils.setStorage(key, value);
                }
                window.open(detail.href,'_blank');
            },

            toSee() {
                this.toNewPage("certificate");
            },

            judgmentIsFirstLogin() {
                if(this.isFirstLogin) {
                    this.$refs.firstLoginRef.open();
                }
            },
        },
        data() {
            return {
                activePage: '首页',
                isFirstLogin: true,
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight -100,
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
                        id: "1",
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
                        id: "1",
                        main: "绘画",
                        sub: "中国画12岁以上",
                        score: "86",
                        classTime: "40",
                        remainingClassTime: "0",
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
                        id: "1",
                        main: "摄影",
                        sub: "摄影入门12岁以上",
                        score: "58",
                        classTime: "40",
                        remainingClassTime: "0",
                        certificates: [],
                        teacher: "李清照",
                    },
                ],
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
        },
    }
</script>

<style scoped>
    .main {
        width: 1500px;
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: 20px;
    }
    .mc1 {
        margin: 20px 5px 0px 20px;
        width: 60%;
    }
    .mc2 {
        margin: 20px 20px 0px 5px;
        width: 40%;
    }
    .gd {
        float: right;
        font-size: 12px;
        color: #2b90ff;
    }
    .ahover:hover {
        color: #ff7521;
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
        font-size: 18px;
        margin-bottom: 10px;
        margin-left: 20px;
        font-weight: 600;
    }
    .hdms {
        margin-left: 20px;
        font-size: 14px;
        width: 645px;
        height: 50px;
        line-height: 25px;
        color: #707070;
    }
    .item {
        display: flex;
        color: #1296db;
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 2px;
        margin-left: 10px;
    }
    .ckxq {
        position: absolute;
        bottom: 0px;
        right: 0px;
        font-size: 14px;
        color: #409EFF;
    }
    .wdxk {
        text-align: left;
        font-size: 14px;
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
    .mcard {
        height: 210px;
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