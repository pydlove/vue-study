<template>
	<!--eslint-disable-->
	<div>
		<div class="date-header">
			{{ aiocloudDate.yearMonth }}
		</div>
		<div class="date-weeks">
			<div v-for="(item, index) in weeks" :key="index" class="date-weeks-item">
				{{ item }}
			</div>
		</div>
		<div class="date-content">
			<div v-for="(item, index) in aiocloudDate.days" :key="index" class="date-item" :style="fmtFirstDayWeek(index)">
				{{ item }}
			</div>
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "AiocloudDate",
	    props: [
            "aiocloudDate",
		    "observationDataDateArr"
	    ],
	    data() {
            return {
	            weeks: ['日','一','二','三','四','五','六'],
            }
	    },
	    mounted() {

	    },
	    methods: {
            fmtFirstDayWeek(index) {
                let style = "";
                let day = index + 1;
                if(day < 10) {
                    day = "0" + day;
                }
                // 判断这个数组中是否包含，包含显示
	            let date = this.aiocloudDate.yearMonth + "-" + day;
                for(var i in this.observationDataDateArr) {
                    let observationDataDate = this.observationDataDateArr[i];
                    const observerDate = observationDataDate.observerDate;
                    console.log(observerDate + "  " + date)
                    if(observerDate == date) {
                        const level = observationDataDate.level;
                        if(level == "0") {
                            style = "";
                        }
                        else if(level == "1") {
                            style = "background: #fa541c; color: #ffffff;";
                        }
                        else if(level == "2") {
                            style = "background: #389e0d; color: #ffffff;";
                        }
                    }
                }
                if(index == 0) {
                    switch (this.aiocloudDate.firstDayWeek) {
                        case '日':
                            style = "margin-left: " + (44.28*0) + "px;";
                            break;
                        case '一':
                            style = "margin-left: " + (44.28*1) + "px;";
                            break;
                        case '二':
                            style = "margin-left: " + (44.28*2) + "px;";
                            break;
                        case '三':
                            style = "margin-left: " + (44.28*3) + "px;";
                            break;
                        case '四':
                            style = "margin-left: " + (44.28*4) + "px;";
                            break;
                        case '五':
                            style = "margin-left: " + (44.28*5) + "px;";
                            break;
                        case '六':
                            style = "margin-left: " + (44.28*6) + "px;";
                            break;
                    }
                }
                return style;
            }
	    }
    }
</script>

<style scoped>
	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
		.date-header {
			width: 310px;
			height: 36px;
			background: #17030b;
			text-align: center;
			line-height: 36px;
			color: #ffffff;
			font-size: 16px;
		}
		.date-content {
			display: flex;
			flex-wrap: wrap;
			width: 310px;
			margin-bottom: 20px;
		}
		.date-item {
			width: 44.28px;
			height: 44.28px;
			line-height: 44.28px;
		}
		.date-weeks {
			display: flex;
			flex-wrap: wrap;
			height: 36px;
			background: #434343;
		}
		.date-weeks-item {
			width: 44.28px;
			height: 36px;
			line-height: 36px;
			color: #ffffff;
		}
	}
</style>