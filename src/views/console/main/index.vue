<template>
	<!--eslint-disable-->
	<div class="pd-5">
		<el-card class="ficard">
			<div class="dffn">
				<div class="tmain bg0">
					<div class="sm">活跃 / 注册学生数量</div>
					<div class="xssz">{{indexData.activeStudentCount}} / {{indexData.totalStudentCount}}</div>
				</div>

				<div class="tmain ml-40 bg1">
					<div class="sm">老师数量</div>
					<div class="xssz">{{indexData.teacherCount}}</div>
				</div>

				<div class="tmain ml-40 bg2">
					<div class="sm">活动数量</div>
					<div class="xssz">{{indexData.activityCount}}</div>
				</div>

				<div class="tmain ml-40 bg3">
					<div class="sm">财务金额</div>
					<div class="xssz">¥ {{indexData.totalflowAmount}}</div>
				</div>
			</div>
		</el-card>

		<div class="dffn">
			<el-card class="secard mt-5 ">
				<div slot="header" class="clearfix">
					<span class="fl fs-14 color-409EFF">最近一周学生注册趋势</span>
				</div>
				<div id="registeredEchart" class="echart"></div>
			</el-card>

			<el-card class="secard mt-5 ml-5">
				<div slot="header" class="clearfix">
					<span class="fl fs-14 color-409EFF">待审批工单</span>
					<span class="fr fs-14 color-409EFF" @click="toMore">更多</span>
				</div>
				<div class="aioc-scroll">
					<div class="tl"
					     v-for="(item, index) in approves" :key="index" @click="toApprove(item)">
						<span class="fs-30 fb">{{getReleaseDay(item.updateTime)}}</span>
						<span> {{getReleaseMonth(item.updateTime)}}月</span>
						<span>
                            <a class="ml-20">{{item.title.length > 26 ? (item.title.substring(0, 26) + '...'):(item.title)}}</a>
						</span>

						<el-button class="fr mt-5"
								v-aba="['e']"
								size="mini"
								type="primary"
								@click="toApprove(scope.row)">审批</el-button>

						<div class="bt-line mt-10"></div>
					</div>
				</div>
			</el-card>
		</div>

		<div class="dffn">
			<el-card class="secard mt-5 ">
				<div slot="header" class="clearfix">
					<span class="fl fs-14 color-409EFF">注册学生年龄分布</span>
				</div>
				<div id="ageEchart" class="echart"></div>
			</el-card>

			<el-card class="secard mt-5 ml-5">
				<div slot="header" class="clearfix">
					<span class="fl fs-14 color-409EFF">最近15天财务流水趋势</span>
				</div>
				<div id="financeEchart" class="echart"></div>
			</el-card>
		</div>
		<Approve ref="approveRef" @search="initApproves"></Approve>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Approve from "@/views/console/finance/pendingApprove/approve";
    export default {
        name: "index",
	    components: {Approve},
	    mounted() {
            this.area = this.$utils.getStorage("area");
            this.initIndexData();
            this.initApproves();
	    },
	    methods: {
            toApprove(row) {
                this.$refs.approveRef.form = {
                    appNum: row.appNum,
                    title: row.title,
                    content: row.content,
                    createTime: row.createTime,
                    createUserName: row.createUserName,
                    createUser: row.createUser,
                    status: "",
                    link: "1",
                    opinion:"",
                };
                this.$refs.approveRef.open();
            },

            toMore() {
                this.$utils.setStorage("activeMenu", {
                    btns: "",
                    chName: "总控审批",
                    children: [],
                    enName: null,
                    enabled: "1",
                    extra: null,
                    icon: "el-icon-s-tools",
                    id: "14bba67dbca14c3d9cfbd752fb8b1397",
                    lastUpdTime: "2021-01-07 13:24:11",
                    lastUpdUser: null,
                    level: "2",
                    openType: "iframe",
                    parentId: "f9450a14c3d24b8caf6253321b7c25f3",
                    parentName: null,
                    remark: "",
                    showOrder: "3",
                    type: "menu",
                    url: "/pendingApprove",
                });
                parent.location.reload();
            },

            async initApproves() {
                let params = new FormData()
                params.append("page", 0);
                params.append("limit", 6);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_approve_master_list, params, "POST");
                if (data.code === 200) {
                    this.approves = data.data;
                    return true;
                }
            },

            getReleaseDay(datetime) {
                const date = new Date(datetime);
                return date.getDate();
            },

            getReleaseMonth(datetime) {
                const date = new Date(datetime);
                return date.getMonth() + 1;
            },

            fmtLevel(value) {
                switch (value) {
                    case "0":
                        return "一般";
                    case "1":
                        return "重要";
                    case "2":
                        return "紧急";
                    default :
                        return value;
                }
            },

            fmtLevelColor(value) {
                switch (value) {
                    case "0":
                        return "#606266";
                    case "1":
                        return "#E6A23C";
                    case "2":
                        return "#F56C6C";
                    default :
                        return value;
                }
            },

            async initIndexData() {
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
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_login_indexData, params, "POST");
                if (data.code === 200) {
                    this.indexData = data.data;
                    console.log(this.indexData);
                    this.initRegisteredEchart();
                    this.initFinanceEchart();
                    this.initAgeEchart();
                    return true;
                }
            },

            initAgeEchart() {
                var ageDom = document.getElementById('ageEchart');
                var echart = this.$echarts.init(ageDom);
                var optionData = [];
                for (var key in this.indexData.ages) {
                    var user = this.indexData.ages[key];
                    optionData.push(
                        {
                            value: Number(user.countNum),
                            name: user.age,
                        }
                    );
                }
                var option = {
                    title: {
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}岁 ，共 {c} 人 ，占比 {d}%'
                    },
                    series: [
                        {
                            name: '学生年龄分布',
                            type: 'pie',
                            radius: [30, 80],
                            roseType: 'area',
                            data: optionData,
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        var colorList = ['#00c2ff', '#5fda8a', '#ec5f68', '#e5ab72', '#a1fb37', '#8668aa', '#31a6d1'];
                                        return colorList[params.dataIndex];
                                    }
                                }
                            }
                        }
                    ]
                };
                echart.setOption(option);
            },

            initRegisteredEchart() {
                var findDom = document.getElementById('registeredEchart');
                var regEchart = this.$echarts.init(findDom);
                var regOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：’line’ | ‘shadow’
                        },
                        formatter: function (params) {
                            var key = params[0].name;
                            var value = params[0].value;
                            return "<div style='text-align: left;'>" +
                                "日期: " + key +
                                "<br/> 注册人数: " + value + " 人" +
                                "</div>";
                        }
                    },
                    xAxis: [
                        {
                            name: '',
                            type: 'category',
                            data: this.indexData.registeredMap.x,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "#eeeeee",
                                    width: 1,
                                    type: "solid"
                                },
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#6586a9'
                                },
                                // rotate: 30
                            },
                        }
                    ],
                    yAxis: [
                        {
                            name: '',
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "#eeeeee",
                                    width: 1,
                                    type: "solid"
                                },
                            },
                            axisLabel: {
                                formatter: function (val) {
                                    return "";
                                }
                            },
                        },
                    ],
                    series: [
                        {
                            name: '',
                            type: 'line',
                            smooth: true,
                            data: this.indexData.registeredMap.y,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,		//开启显示
                                        position: 'top', //在上方显示
                                        color: '#6586a9',
                                        formatter: function (params) {
                                            if(params.value == 0) {
                                                return ""
                                            }
                                            return params.value + "人";
                                        },
                                    },
                                    color: '#3ed8ff'
                                },
                                emphasis: {
                                    color: new this.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#71C8B1'},                  //柱图高亮渐变色
                                            {offset: 0.7, color: '#44C0C1'},                //柱图高亮渐变色
                                            {offset: 1, color: '#06B5D7'}                   //柱图高亮渐变色
                                        ]
                                    )
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#3ed8ff'},                   //柱图渐变色
                                            {offset: 0.2, color: '#5cdfff'},                   //柱图渐变色
                                            {offset: 0.5, color: '#81ebff'},                 //柱图渐变色
                                            {offset: 0.7, color: '#9fecff'},                 //柱图渐变色
                                            {offset: 1, color: '#bbf4ff'},                   //柱图渐变色
                                        ]
                                    ),
                                }
                            },
                        },
                    ]
                };
                regEchart.setOption(regOption);
            },

            initFinanceEchart() {
                var findDom = document.getElementById('financeEchart');
                var finEchart = this.$echarts.init(findDom);
                var finOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：’line’ | ‘shadow’
                        },
                        formatter: function (params) {
                            var key = params[0].name;
                            var value = params[0].value;
                            return "<div style='text-align: left;'>" +
                                "日期: "+ key +
                                "<br/> 流水金额:  ¥ " + value + " 元" +
                                "</div>";
                        }
                    },
                    xAxis: [
                        {
                            name: '',
                            type: 'category',
                            data: this.indexData.flowMap.x,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "#eeeeee",
                                    width: 1,
                                    type: "solid"
                                },
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#6586a9'
                                },
                            },
                        }
                    ],
                    yAxis: [
                        {
                            name: '',
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "#eeeeee",
                                    width: 1,
                                    type: "solid"
                                },
                            },
                            axisLabel: {
                                formatter: function (val) {
                                    return "";
                                }
                            },
                        },
                    ],
                    series: [
                        {
                            name: '',
                            type: 'line',
                            smooth: true,
                            data: this.indexData.flowMap.y,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,		//开启显示
                                        position: 'top', //在上方显示
                                        color: '#6586a9',
                                        formatter: function (params) {
                                            if(params.value == 0) {
                                                return ""
                                            }
                                            return params.value + "元";
                                        },
                                    },
                                    color: '#ff8f52'
                                },
                                emphasis: {
                                    color: new this.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#c82423'},                  //柱图高亮渐变色
                                            {offset: 0.7, color: '#c82423'},                //柱图高亮渐变色
                                            {offset: 1, color: '#c82423'}                   //柱图高亮渐变色
                                        ]
                                    )
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#ff8f52'},                   //柱图渐变色
                                            {offset: 0.2, color: '#ff8f52'},                   //柱图渐变色
                                            {offset: 0.5, color: '#ff8f52'},                 //柱图渐变色
                                            {offset: 0.7, color: '#ff8f52'},                 //柱图渐变色
                                            {offset: 1, color: '#ff8f52'},                   //柱图渐变色
                                        ]
                                    ),
                                }
                            },
                        },
                    ]
                };
                finEchart.setOption(finOption);
            },
	    },
	    data() {
            return {
                indexData: "",
                approves: [],
            }
	    }
    }
</script>

<style scoped>
	.bt-line {
		border-bottom: 1px solid #eeeeee;
	}
	.echart {
		width: 100%;
		height: 260px;
	}
	.secard {
		width: 50%;
		height: 320px;
	}
	.ficard {
		height: 140px;
	}
	.bg0 {
		background: linear-gradient(to right, #ff8332, #f84820) !important;
	}
	.bg1 {
		background: linear-gradient(to right, #6bcbf7, #60b8f7) !important;
	}
	.bg2 {
		background: linear-gradient(to right, #c58df7, #916af7) !important;
	}
	.bg3 {
		background: linear-gradient(to right, #f7be8d, #f7ae3e) !important;
	}
	.tmain {
		width: 25%;
		height: 100px;
		text-align: left;
		padding-left: 10px;
		border-radius: 3px;
	}
	.xssz {
		font-size: 28px;
		line-height: 38px;
		color: #ffffff;
	}
	.sm {
		margin-top: 20px;
		font-size: 14px;
		color: #ffffff;
		line-height: 22px;
	}
</style>