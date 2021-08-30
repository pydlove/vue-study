<template>
	<!--eslint-disable-->
	<div class="qv-container">
		<AiocloudDate v-for="(item, index) in aiocloudDates" :key="index" :aiocloudDate="item" :observationDataDateArr="observationDataDates[index]"
			:class="index%2==1?'ml-20':''"
		></AiocloudDate>
	</div>
</template>
<!--eslint-disable-->
<script>
	import AiocloudDate from "@/components/AiocloudDate.vue"

    export default {
        name: "quickView",
	    components: {
            AiocloudDate
	    },
	    data() {
            return {
				aiocloudDates: [],
	            observationDataDates: [
		            [
			            {
                            observerDate: "2021-01-30",
                            level: "1"
			            }
		            ],
	            ],
            }
	    },
	    mounted() {
            this.mGetDate();
            this.search();
	    },
	    methods: {
            /**
             * 查询观测数据
             * @param {*} 参数 参数说明
             * @author panyong
             */
            async search() {
                let params = new FormData();
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_nd_observation_log_date, params, "POST");
                if (data.code == 200) {
                    return true;
                }
            },

            mGetDate() {
                var date = new Date();
                var year = date.getFullYear();
                for(var i=1; i<13; i++){
                    var d = new Date(year, i, 0);
                    var days = d.getDate();
	                let month = d.getMonth() + 1;
	                if(month < 10) {
                        month = "0" + month;
	                }
                    var firstDate = new Date(year, month, 1);
                    const iWeek = firstDate.getDay();
                    var sWeek;
                    switch(iWeek){
                        case 0: sWeek = "日"; break;
                        case 1: sWeek = "一"; break;
                        case 2: sWeek = "二"; break;
                        case 3: sWeek = "三"; break;
                        case 4: sWeek = "四"; break;
                        case 5: sWeek = "五"; break;
                        case 6: sWeek = "六"; break;
                    }
                    let aiocloudDate = {
                        yearMonth: year + '-' + month,
                        days: days,
                        firstDayWeek: sWeek,
	                };
                    this.aiocloudDates.push(aiocloudDate);
                }
            }
        }
    }
</script>

<style scoped>
	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
		.qv-container {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>