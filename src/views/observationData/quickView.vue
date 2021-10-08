<template>
	<!--eslint-disable-->
	<div class="qv-container">
		<div class="qv-main">
			<div v-for="(item, index) in aiocloudDates" :key="index">
				<div class="date-header" :style="dateHeaderStyle">

                    <div class="nd-year-month">
                        <div class="nd-year-reduce" @click="yearReduce(item.yearMonth)"></div>
                        <div class="nd-month-reduce" @click="monthReduce(item.yearMonth)"></div>
                    </div>
                    <div class="nd-time">
                        {{ item.yearMonth }}
                    </div>
                    <div class="nd-month-year">
                        <div class="nd-year-add" @click="monthAdd(item.yearMonth)"></div>
                        <div class="nd-month-add" @click="yearAdd(item.yearMonth)"></div>
                    </div>
				</div>
				<div class="date-weeks" :style="dateWeeksStyle">
					<div v-for="(witem, windex) in weeks" :key="windex" class="date-weeks-item" :style="dateItemStyle">
						{{ witem }}
					</div>
				</div>
				<div class="date-content" :style="dateContentStyle">
					<div v-for="(citem, cindex) in item.aiocloudDays" :key="cindex" class="date-item"
						 :style="citem.style + ' ' + dateItemStyle">
						<span v-if="citem.level == '9'">{{ citem.day }}</span>
						<el-popover v-else
									placement="top-start"
									width="200"
									trigger="hover"
									:content="fmtContent(citem)">
							<div class="aiocloud-cursor" slot="reference" @click="toDetail(citem)">{{ citem.day }}</div>
						</el-popover>
					</div>
				</div>
			</div>
		</div>

		<div class="qv-tag dffn-ac">
			<span class="qc-no"></span>
			{{ $t('message.NoObservationData') }}
			<span class="qc-yes"></span>
			{{ $t('message.HaveObservationData') }}
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>

    export default {
        name: "quickView",
        components: {},
        data() {
            return {
                aiocloudDates: [],
                observationDataDates: [],
                weeks: [
                    this.$t('week.Sun'),
                    this.$t('week.Mon'),
                    this.$t('week.Tue'),
                    this.$t('week.Wed'),
                    this.$t('week.Thu'),
                    this.$t('week.Fri'),
                    this.$t('week.Sat'),
                ],
                year: "",
	            totalWidth: 1600,
                coefficient: 3,
                dateWidth: 400,
                itemWidthNum: "",
                itemWidth: "",
                dateHeaderStyle: "",
                dateWeeksStyle: "",
                dateContentStyle: "",
                dateItemStyle: "",
				yearData: "",
            }
        },
        mounted() {
            this.initLanguage();
			this.setSize();
            this.getYear();
            this.mGetDate();
            this.search();
        },
        methods: {
            initLanguage() {
				this.weeks = [
                    this.$t('week.Sun'),
                    this.$t('week.Mon'),
                    this.$t('week.Tue'),
                    this.$t('week.Wed'),
                    this.$t('week.Thu'),
                    this.$t('week.Fri'),
                    this.$t('week.Sat'),
                ];
            },

            /************************时间业务开始****************************/
                yearReduce(item){
                    this.aiocloudDates.length = 0;
                    let yearMonth = this.$utils.reduceYear(item);
                    this.year = new Date(yearMonth);
                    console.log(this.year);
                    this.search();
                    this.mGetDate();
                },
                monthReduce(item){
                    this.aiocloudDates.length = 0;
                    let yearMonth = this.$utils.reduceMonth(item);
                    this.year = new Date(yearMonth);
                    console.log(this.year);
                    this.search();
                    this.mGetDate();
                },

                yearAdd(item){
                    this.aiocloudDates.length = 0;
                    let yearMonth = this.$utils.addYear(item);
                    this.year = new Date(yearMonth);
                    console.log(this.year);
                    this.search();
                    this.mGetDate();
                },
                monthAdd(item){
                    this.aiocloudDates.length = 0;
                    let yearMonth = this.$utils.addMonth(item);
                    this.year = new Date(yearMonth);
                    console.log(this.year);
                    this.search();
                    this.mGetDate();
                },

            /*************************时间业务结束*********************************/

            toDetail(item) {
                this.$utils.setStorage("observationDataDetail", item);
                let routeData = this.$router.resolve({
                    path: "/observationDataDetail"
                });
                window.open(routeData.href, '_blank');
            },

            fmtContent(item) {
				if(item.level == "0") {
				    return this.$t('message.NoDataTip');
				}
				if(item.level == "1") {
				    return this.$t('message.HasDataTip');
				}
            },

            setSize() {
                this.dateWidth = (this.totalWidth - (40 + (this.coefficient - 1)*20))/this.coefficient;
                this.itemWidthNum = (this.dateWidth / 7);
                this.itemWidth = (this.dateWidth / 7) + 'px';
                this.dateHeaderStyle = {
                    width: this.dateWidth + 'px',
                    height: this.itemWidth,
                    lineHeight: this.itemWidth,
                };
                this.dateWeeksStyle = {
                    width: this.dateWidth + 'px',
                    height: this.itemWidth,
                    lineHeight: this.itemWidth,
                };
                this.dateContentStyle = {
                    width: this.dateWidth + 'px',
                };
                this.dateItemStyle =
                    "width:" + this.itemWidth +
                    ";height:" + this.itemWidth +
                    ";line-height:" + this.itemWidth;
            },

            getYear() {
                //今年年份  换成当前月
                const date = new Date();
                this.year = date;
            },



            /**
             * 查询观测数据
             * @param {*} 参数 参数说明
             * @author panyong
             */
            async search() {
                const fullYear = this.year.getFullYear();
                let params = new FormData();
                params.append("year", fullYear);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_date, params, "POST");
                if (data.code == 200) {
                    if (data.data) {
                        this.observationDataDates = data.data;
                        let temp = [];
                        console.log( this.observationDataDates);
                        for (var i in this.aiocloudDates) {
                            const aiocloudDate = this.aiocloudDates[i];
                            console.log(aiocloudDate);
                            const yearMonth = aiocloudDate.yearMonth;
                            console.log(yearMonth);
                            if (yearMonth in this.observationDataDates) {
                                aiocloudDate.observationDataDateMap = this.observationDataDates[yearMonth];
                            }
                            else {
                                aiocloudDate.observationDataDateMap = [];
                            }
                            let aiocloudDays = this.fmtAiocloudDate(aiocloudDate);
                            aiocloudDate.aiocloudDays = aiocloudDays;
                            temp.push(aiocloudDate);
                        }
                        this.aiocloudDates = temp;
                    }
                    return true;
                }
            },

            mGetDate() {
                    var year = this.year.getFullYear();
                    console.log(year);
                    var d = new Date(year, this.year.getMonth() + 1, 0);
                    var days = d.getDate();
                    let month = d.getMonth() + 1;
                    console.log(month);
                    var firstDate = new Date(year, this.year.getMonth(), 1);
                    console.log(firstDate);
                    const iWeek = firstDate.getDay();
                    console.log(iWeek);
                    var sWeek;
                    switch (iWeek) {
                        case 0:
                            sWeek = this.$t('week.Sun');
                            break;
                        case 1:
                            sWeek = this.$t('week.Mon');
                            break;
                        case 2:
                            sWeek = this.$t('week.Tue');
                            break;
                        case 3:
                            sWeek = this.$t('week.Wed');
                            break;
                        case 4:
                            sWeek = this.$t('week.Thu');
                            break;
                        case 5:
                            sWeek = this.$t('week.Fri');
                            break;
                        case 6:
                            sWeek = this.$t('week.Sun');
                            break;
                    }
                if (month < 10) {
                    month = "0" + month;
                }
                    let aiocloudDate = {
                        yearMonth: year + '-' + month,
                        days: days,
                        firstDayWeek: sWeek,
                    };
                    this.aiocloudDates.push(aiocloudDate);
                    console.log(this.aiocloudDates);
            },

            fmtAiocloudDate(aiocloudDate) {
                let aiocloudDays = [];
                for (var i = 1; i <= aiocloudDate.days; i++) {
                    let aiocloudDay = {
                        day: i
                    };
                    let style = "";
                    let day = i;
                    if (day < 10) {
                        day = "0" + day;
                    }
                    // 判断这个数组中是否包含，包含显示
                    let date = aiocloudDate.yearMonth + "-" + day;
                    aiocloudDay.level = "9";
                    aiocloudDay.date = date;
                    if (date in aiocloudDate.observationDataDateMap) {
                        const observationDataDateMapElement = aiocloudDate.observationDataDateMap[date];
                        const level = observationDataDateMapElement.level;
                        if (level == "0") {
                            aiocloudDay.level = "0";
                            style = style + "background: #8c8c8c; color: #ffffff;border-right: 1px solid #ffffff;";
                        }
                        else if (level == "1") {
                            aiocloudDay.level = "1";
                            style = style + "background: #389e0d; color: #ffffff;border-right: 1px solid #ffffff;";
                        }
                    }
                    if (i == 1) {
                        switch (aiocloudDate.firstDayWeek) {
                            case '日':
                                style = style + "margin-left: " + (this.itemWidthNum * 0) + "px;";
                                break;
                            case '一':
                                style = style + "margin-left: " + (this.itemWidthNum * 1) + "px;";
                                break;
                            case '二':
                                style = style + "margin-left: " + (this.itemWidthNum * 2) + "px;";
                                break;
                            case '三':
                                style = style + "margin-left: " + (this.itemWidthNum * 3) + "px;";
                                break;
                            case '四':
                                style = style + "margin-left: " + (this.itemWidthNum * 4) + "px;";
                                break;
                            case '五':
                                style = style + "margin-left: " + (this.itemWidthNum * 5) + "px;";
                                break;
                            case '六':
                                style = style + "margin-left: " + (this.itemWidthNum * 6) + "px;";
                                break;
                        }
                    }
                    aiocloudDay.style = style;
                    aiocloudDays.push(aiocloudDay);
                }
                return aiocloudDays;
            },
        }
    }
</script>

<style scoped>
	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
        .nd-year-month{
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            width: 20%;
            margin-left: 32px;
        }
        .nd-year-reduce{
            background: url("../../assets/img/icon/return1.png");
            background-size: 100% 100%;
            width: 17px;
            height: 17px;
        }
        .nd-month-reduce {
            background: url("../../assets/img/icon/return2.png");
            background-size: 100% 100%;
            width: 17px;
            height: 17px;
            margin-left: 5px;
        }

        .nd-month-year{
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            text-align: right;
            width: 20%;
        }

        .nd-year-add{
            background: url("../../assets/img/icon/going2.png");
            background-size: 100% 100%;
            width: 23px;
            height: 23px;
        }
        .nd-month-add {
            background: url("../../assets/img/icon/going1.png");
            background-size: 100% 100%;
            width: 23px;
            height: 23px;
            margin-left: 5px;
        }

        .nd-time{
            text-align: center;
            width: 60%;
        }

		.qv-rl {
			margin-left: 50px;
		}
		.qv-rl > div:nth-of-type(1) {
			margin-right: 10px;
		}
		.qv-tag {
			margin-bottom: 40px;
			font-size: 14px;
		}

		.qc-yes {
			background: #389e0d;
			width: 28.57px;
			height: 28.57px;
			margin-right: 10px;
			margin-left: 20px;
		}

		.qc-no {
			background: #8c8c8c;
			width: 28.57px;
			height: 28.57px;
			margin-right: 10px;
		}

		.aiocloud-btn {
			margin-left: 10px;
			width: 80px;
		}

		.qv-date {
			height: 100px;
		}

		.qv-main {
			display: flex;
			flex-wrap: wrap;
		}

		.qv-container {
			text-align: center;
			margin: 0 auto;
		}

		.date-header {
			background: #17030b;
			color: #ffffff;
			font-size: 16px;
            display: flex;
            flex-wrap: nowrap;
		}

		.date-content {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 20px;
			margin-top: 10px;
            min-height: 370px;
		}

		.date-item {
			text-align: center;
		}

		.date-weeks {
			display: flex;
			flex-wrap: wrap;
			background: #434343;
		}

		.date-weeks-item {
			color: #ffffff;
			text-align: center;
		}
	}
</style>

<style>
	.qv-tag .is-checked .el-radio__inner {
		background: #fa541c;
		border-color: #fa541c;
	}
	.qv-tag .is-checked .el-radio__label {
		color: #fa541c;
	}
</style>