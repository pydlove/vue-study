<template>
	<!--eslint-disable-->
	<div class="qv-container">
		<div class="qv-date">
			<el-date-picker
					v-model="year"
					type="year"
					placeholder="选择年">
			</el-date-picker>

			<span class="aiocloud-btn" @click="searchInfo">查询</span>

		</div>

		<div class="qv-tag dffn-ac">
			<span class="qc-no"></span>无观测数据
			<span class="qc-yes"></span>有观测数据

			<div class="dffn-ac qv-rl">
				<div>日历大小</div>
				<el-radio-group v-model="coefficient" @change="setSize">
					<el-radio :label="3">小</el-radio>
					<el-radio :label="2">中</el-radio>
					<el-radio :label="1">大</el-radio>
				</el-radio-group>
			</div>
		</div>

		<div class="qv-main">
			<div v-for="(item, index) in aiocloudDates" :key="index"
			     :class="(index+1)%coefficient!=0?'mr-20':''">
				<div class="date-header" :style="dateHeaderStyle">
					{{ item.yearMonth }}
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
                weeks: ['日', '一', '二', '三', '四', '五', '六'],
                year: "",
	            totalWidth: 680,
                coefficient: 3,
                dateWidth: 200,
                itemWidthNum: "",
                itemWidth: "",
                dateHeaderStyle: "",
                dateWeeksStyle: "",
                dateContentStyle: "",
                dateItemStyle: "",
            }
        },
        mounted() {
			this.setSize();
            this.getYear();
            this.mGetDate();
            this.search();
        },
        methods: {
            toDetail(item) {
                this.$utils.setStorage("observationDataDetail", item);
                let routeData = this.$router.resolve({
                    path: "/observationDataDetail"
                });
                window.open(routeData.href, '_blank');
            },

            fmtContent(item) {
				if(item.level == "0") {
				    return "该日志无观测数据，点击查看日志详情";
				}
				if(item.level == "1") {
				    return "该日志有观测数据，点击查看观测日志和观测数据详情";
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
                const date = new Date();
                this.year = date;
            },

            searchInfo() {
                this.aiocloudDates = [];
                this.mGetDate();
                this.search();
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
                        for (var i in this.aiocloudDates) {
                            const aiocloudDate = this.aiocloudDates[i];
                            const yearMonth = aiocloudDate.yearMonth;
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
                for (var i = 1; i < 13; i++) {
                    var d = new Date(year, i, 0);
                    var days = d.getDate();
                    let month = d.getMonth() + 1;
                    if (month < 10) {
                        month = "0" + month;
                    }
                    var firstDate = new Date(year, month, 1);
                    const iWeek = firstDate.getDay();
                    var sWeek;
                    switch (iWeek) {
                        case 0:
                            sWeek = "日";
                            break;
                        case 1:
                            sWeek = "一";
                            break;
                        case 2:
                            sWeek = "二";
                            break;
                        case 3:
                            sWeek = "三";
                            break;
                        case 4:
                            sWeek = "四";
                            break;
                        case 5:
                            sWeek = "五";
                            break;
                        case 6:
                            sWeek = "六";
                            break;
                    }
                    let aiocloudDate = {
                        yearMonth: year + '-' + month,
                        days: days,
                        firstDayWeek: sWeek,
                    };
                    this.aiocloudDates.push(aiocloudDate);
                }
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
			text-align: left;
		}

		.date-header {
			background: #17030b;
			text-align: center;
			color: #ffffff;
			font-size: 16px;
		}

		.date-content {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 20px;
			margin-top: 10px;
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