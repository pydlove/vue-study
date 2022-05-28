<template>
	<div>
		<!--<el-table-->
				<!--:data="tableData"-->
				<!--style="width: 640px">-->
			<!--<el-table-column prop="datetime" label="Date" width=""></el-table-column>-->
			<!--<el-table-column prop="goes" label="GOES Start (UT)" width=""></el-table-column>-->
			<!--<el-table-column prop="peak" label="Peak (hh:mm)" width=""></el-table-column>-->
			<!--<el-table-column prop="end" label="End (hh:mm)" width=""></el-table-column>-->
			<!--<el-table-column prop="clazz" label="Class" width=""></el-table-column>-->
			<!--<el-table-column prop="location" label="Location (NOAA AR)" width=""></el-table-column>-->
			<!--<el-table-column prop="observationTime" label="CHASE observation time" width=""></el-table-column>-->
			<!--<el-table-column prop="iris" label="IRIS observations" width=""></el-table-column>-->
		<!--</el-table>-->
		<!--<Pagination class="pagination" ref="pageRef" @search="search"></Pagination>-->

		<div v-html="flare.content"></div>
	</div>
</template>
<!--eslint-disable-->

<script>
    import Pagination from "@/components/Pagination";

    export default {
        name: "dataUseRule",
	    components: {
            Pagination
	    },
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                language: "",
                flare: "",
                tableData: [
                    // {date: "2021-12-14", goes: "08:16", peak: "08:26", end: "08:36", class: "C1.4", location: "S20E60 (2907)", observationTime: "08:01-08:19", iris: "N"},
                    // {date: "2021-12-14", goes: "15:51", peak: "16:13", end: "16:20", class: "C1.1", location: "S20E54 (2907)\n", observationTime: "15:56-16:14\n", iris: "Y(15:53-16:49)\n"},
                    // {date: "2021-12-16", goes: "15:19", peak: "15:27", end: "15:31", class: "C3.3", location: "S21E65 (2909)\n", observationTime: "15:24-15:42\n", iris: "N"},
                    // {date: "2021-12-17", goes: "15:14", peak: "15:42", end: "15:53\n", class: "C1.5\n", location: "S22E44 (2909)\n", observationTime: "15:09-15:21 \n", iris: "N"},
                    // {date: "2021-12-20", goes: "06:33", peak: "06:40", end: "06:44\n", class: "C1.3\n", location: "S21W12 (2907)\n", observationTime: "06:26-06:44 \n", iris: "N"},
                    // {date: "2021-12-21", goes: "15:44", peak: "15:53", end: "15:58\n", class: "C2.0\n", location: "S17E89 (2916)\n", observationTime: "15:44-15:47\n", iris: "N"},
                    // {date: "2022-01-17", goes: "15:09", peak: "15:16", end: "15:21\n", class: "C2.7\n", location: "N25W37 (2930)\n", observationTime: "14:50-15:08\n", iris: "N"},
                    // {date: "2022-01-20", goes: "05:41", peak: "06:01", end: "06:12\n", class: "M5.5\n", location: "N08W76 (2929)\n", observationTime: "06:08-06:26 \n", iris: "N"},
                    // {date: "2022-01-29", goes: "11:46", peak: "11:53", end: "12:03\n", class: "C2.5\n", location: "N17E13 (2936)\n", observationTime: "11:39-11:57\n", iris: "Y (11:04-12:05)\n"},
                    // {date: "2022-02-02", goes: "18:43", peak: "18:53", end: "19:02\n", class: "C1.5\n", location: "N17E38 (2940)", observationTime: "18:30-18:48\n", iris: "N"},
                    // {date: "2022-03-02", goes: "09:12", peak: "09:42", end: "10:08\n", class: "C3.0\n", location: "S19E36 (2957)\n", observationTime: "09:31-09:51 \n", iris: "N"},
                    // {date: "2022-03-05", goes: "18:24", peak: "18:36", end: "18:43\n", class: "C1.7", location: "N26E60 (2962)", observationTime: "18:04-18:32 \n", iris: "N"},
                    // {date: "2022-03-07", goes: "22:33", peak: "22:49", end: "23:13\n", class: "C1.8", location: "N22E86 (2965)\n", observationTime: "22:16-22:45 \n", iris: "N"},
                    // {date: "2022-03-08", goes: "03:01", peak: "03:12", end: "03:13\n", class: "C2.0", location: "N23E86 (2965)\n", observationTime: "03:01-03:30 \n", iris: "N"},
                    // {date: "",           goes: "22:22", peak: "22:27", end: "22:32\n", class: "C1.1", location: "N26E86 (2965)\n", observationTime: "22:00-22:29 \n", iris: "N"},
                    // {date: "2022-03-09", goes: "07:49", peak: "07:56", end: "08:03\n", class: "C1.0", location: "N25E77 (2965)\n", observationTime: "07:30-07:54 \n", iris: "N"},
                    // {date: "",           goes: "12:42", peak: "12:49", end: "12:54\n", class: "C1.0", location: "N25E47 (2965)\n", observationTime: "12:15-12:43 \n", iris: "N"},
                    // {date: "2022-03-14", goes: "01:22", peak: "01:31", end: "01:37\n", class: "C1.2", location: "N27E12 (2965)\n", observationTime: "01:25-01:44 \n", iris: "Y (00:17-04:04)\n"},
                    // {date: "2022-03-15", goes: "15:26", peak: "15:32", end: "15:38\n", class: "C1.0", location: "N22W15 (2965)\n", observationTime: "15:23-15:43\n", iris: "Y(14:19-17:11)\n"},
                    // {date: "2022-03-22", goes: "04:07", peak: "04:27", end: "05:07\n", class: "C1.0\n", location: "N13E88\n", observationTime: "04:01-04:30 \n", iris: "N"},
                    // {date: "2022-03-23", goes: "08:42", peak: "09:03", end: "09:16\n", class: "C2.3\n", location: "N13E88(2975)\n", observationTime: "08:39-08:58 \n", iris: "N"},
                    // {date: "2022-03-24", goes: "08:03", peak: "08:21", end: "08:44\n", class: "C2.2\n", location: "N17E87(2976)", observationTime: "08:23-08:43 \n", iris: "08:23-08:43 \n"},
                    // {date: "",           goes: "15:22", peak: "15:37", end: "15:51\n", class: "C1.5", location: "S19E45(2974)\n", observationTime: "15:39-16:08\n", iris: "N"},
                    // {date: "2022-03-30", goes: "02:15", peak: "02:24", end: "02:33\n", class: "C3.0", location: "N15W27(2975)\n", observationTime: "01:53-02:21 \n", iris: "N"},
                    // {date: "",           goes: "06:38", peak: "06:46", end: "06:50\n", class: "C2.3\n", location: "S26E58\n", observationTime: "06:37-07:06\n", iris: "N"},
                    // {date: "",           goes: "10:10", peak: "10:17", end: "10:23\n", class: "C1.1\n", location: "N15W31(2975)\n", observationTime: "09:47-10:16 \n", iris: "Y (07:43-10:53)\n"},
                    // {date: "",           goes: "12:21", peak: "12:35", end: "12:58\n", class: "C4.5\n", location: "N13W34(2975)", observationTime: "12:57-13:26 \n", iris: "N"},
                    // {date: "2022-03-31", goes: "07:56", peak: "08:00", end: "08:05\n", class: "C3.9\n", location: "S23W87", observationTime: "07:56-08:25 \n", iris: "N"},
                    // {date: "",           goes: "14:02", peak: "14:13", end: "14:29\n", class: "C2.9\n", location: "S24E39 (2981)\n", observationTime: "14:16-14:45\n", iris: "N"},
                    // {date: "",           goes: "14:29", peak: "14:38", end: "14:46\n", class: "C3.8\n", location: "S24E39 (2981)\n", observationTime: "14:16-14:45\n", iris: "N"},
                    // {date: "",           goes: "17:27", peak: "17:34", end: "17:39\n", class: "C2.1\n", location: "N13W46(2975)\n", observationTime: "17:26-17:54 \n", iris: "Y (17:43-19:29)\n"},
                    // {date: "",           goes: "20:51", peak: "20:57", end: "21:01\n", class: "C2.6\n", location: "S15E23(2978)\n", observationTime: "20:36-21:04 \n", iris: "N"},
                    // {date: "",           goes: "23:43", peak: "23:53", end: "23:59\n", class: "C4.4\n", location: "N12W54 (2975)\n", observationTime: "23:46-23:59\n", iris: "N"},
                    // {date: "2022-04-01", goes: "06:15", peak: "06:22", end: "06:40\n", class: "C4.4\n", location: "S18E27(2978)\n", observationTime: "06:05-06:34 \n", iris: "N"},
                    // {date: "",           goes: "18:38", peak: "18:45", end: "18:54\n", class: "C2.2\n", location: "N14W64(2975)\n", observationTime: "18:45-19:13\n", iris: "Y (18:17-23:21)\n"},
                    // {date: "",           goes: "22:09", peak: "22:16", end: "22:29\n", class: "C1.6\n", location: "N14W64(2975)\n", observationTime: "21:55-22:23\n", iris: "Y (18:17-23:21)\n"},
                    // {date: "2022-04-02", goes: "00:56", peak: "01:06", end: "01:16\n", class: "C3.2\n", location: "N13W66(2975)\n", observationTime: "01:04-01:33\n", iris: "N"},
                    // {date: "",           goes: "04:19", peak: "04:24", end: "04:28\n", class: "C2.1\n", location: "S26E16(2981)\n", observationTime: "04:14-04:43\n", iris: "N"},
                    // {date: "",           goes: "07:15", peak: "07:27", end: "07:30\n", class: "C2.3\n", location: "S26E16(2981)\n", observationTime: "07:24-07:53 \n", iris: "N"},
                    // {date: "",           goes: "07:30", peak: "07:36", end: "07:39\n", class: "C2.5\n", location: "N13W59(2984)", observationTime: "07:24-07:53\n", iris: "N"},
                    // {date: "",           goes: "07:39", peak: "07:43", end: "07:50", class: "C6.4\n", location: "S26E16(2981)\n", observationTime: "07:24-07:53\n", iris: "N"},
                    // {date: "",           goes: "10:40", peak: "10:46", end: "10:50\n", class: "C2.6\n", location: "S18E03(2978)\n", observationTime: "10:34-11:03 \n", iris: "N"},
                    // {date: "",           goes: "12:56", peak: "13:55", end: "14:44\n", class: "M3.9\n", location: "N12W68(2984)\n", observationTime: "13:44-14:12 \n", iris: "N"},
                    // {date: "2022-04-03", goes: "15:23", peak: "15:49", end: "16:47\n", class: "C2.0\n", location: "N17W75(2976)\n", observationTime: "15:03-15:31\n", iris: "N"},
                    // {date: "",           goes: "21:33", peak: "21:36", end: "21:42\n", class: "C1.3", location: "N11W83(2984)\n", observationTime: "21:22-21:51 \n", iris: "N"},
                    // {date: "2022-04-04", goes: "00:25", peak: "01:01", end: "01:20\n", class: "C1.1\n", location: "S26E76(2985)\n", observationTime: "00:32-01:00\n", iris: "N"},
                    // {date: "",           goes: "22:57", peak: "23:59", end: "01:16\n", class: "C1.4", location: "N16W87(2975)\n", observationTime: "22:41-23:09 \n", iris: "N"},
                    // {date: "2022-04-06", goes: "09:56", peak: "10:27", end: "11:14\n", class: "C3.1\n", location: "N14W88(2975)\n", observationTime: "09:29-09:58\n", iris: "N"},
                    // {date: "2022-04-07", goes: "01:16", peak: "01:31", end: "01:41\n", class: "C1.2\n", location: "S21E32(2985)\n", observationTime: "01:19-01:47 \n", iris: "N"},
                    // {date: "2022-04-09", goes: "02:36", peak: "03:27", end: "04:18\n", class: "C1.2\n", location: "S21W87(2981)\n", observationTime: "03:56-04:25 \n", iris: "N"},
                    // {date: "",           goes: "07:20", peak: "07:33", end: "07:40\n", class: "C1.0", location: "S24W87(2981)\n", observationTime: "07:06-07:35\n", iris: "N"},
                    // {date: "2022-04-10", goes: "02:30", peak: "02:41", end: "02:50\n", class: "C4.9\n", location: "S23W87(2981)\n", observationTime: "02:05-02:34\n", iris: "N"},
                    // {date: "2022-04-12", goes: "04:45", peak: "04:56", end: "05:06\n", class: "C1.1\n", location: "N13W88(2983)\n", observationTime: "04:43-05:11\n", iris: "N"},
                    // {date: "",           goes: "04:48", peak: "04:56", end: "05:14\n", class: "C1.1\n", location: "N13W88(2983)\n", observationTime: "04:43-05:11\n", iris: "N"},
                    // {date: "",           goes: "07:57", peak: "08:08", end: "08:18\n", class: "C1.0", location: "N13W88(2983)", observationTime: "07:52-08:21", iris: "N"},
                    // {date: "2022-04-24", goes: "09:04", peak: "10:31", end: "12:23\n", class: "C2.1", location: "N10W12(2994)", observationTime: "", iris: ""},
                    // {date: "2022-04-30", goes: "07:40", peak: "07:52", end: "07:57", class: "C6.6", location: "N14W88(2994)", observationTime: "07:46-08:13 (rise, decay)", iris: "N"},
                    // {date: "", goes: "07:22", peak: "07:34", end: "07:40", class: "C4.6", location: "N17W88(2993)", observationTime: "07:46-08:13 (?)", iris: "N"},
                    // {date: "", goes: "17:33", peak: "17:38", end: "17:42", class: "C3.2", location: "N15W88(2994)", observationTime: "17:13-17:43 (preflare, rise, decay)", iris: "N"},
                    // {date: "2022-05-01", goes: "02:26", peak: "03:59", end: "04:26", class: "C2.2", location: "N16W88(2994)", observationTime: "02:45-03:12 (rise)", iris: "N"},
                    // {date: "", goes: "22:03", peak: "22:18", end: "22:35", class: "C2.5", location: "N11W88(2994)", observationTime: "21:44-22:11 (preflare, rise)", iris: "N"},
                    // {date: "2022-05-02", goes: "02:45", peak: "02:51", end: "02:59", class: "C1.2", location: "N15W88(2994)", observationTime: "02:29-02:56 (preflare, rise, decay)", iris: "N"},
                    // {date: "2022-05-03", goes: "11:52", peak: "12:03", end: "12:09", class: "C1.6", location: "S33E87", observationTime: "11:42-12:09", iris: ""},
                    // {date: "", goes: "21:00", peak: "21:11", end: "21:29", class: "C2.4", location: "S16W00 ( 3004 )", observationTime: "21:11-21:38", iris: ""},
                    // {date: "2022-05-04", goes: "11:49", peak: "12:04", end: "12:14", class: "C2.7", location: "S29E76 ( 3006 )", observationTime: "11:26-11:53", iris: ""},
                    // {date: "", goes: "16:06", peak: "16:22", end: "16:22", class: "C8.5", location: "S15W11 ( 3004 )", observationTime: "16:10-16:37", iris: ""},
                    // {date: "", goes: "16:25", peak: "16:32", end: "16:40", class: "M1.1", location: "S15W13 ( 3004 )", observationTime: "16:10-16:37", iris: ""},
                    // {date: "2022-05-05", goes: "22:15", peak: "22:20", end: "22:27", class: "C2.4", location: "S16W28 ( 3004 )", observationTime: "22:14-22:38", iris: ""},
                    // {date: "2022-05-08", goes: "04:07", peak: "04:09", end: "04:17", class: "C2.6", location: "S15W58 ( 3004 )", observationTime: "04:01-04:28", iris: ""},
                    // {date: "", goes: "19:23", peak: "19:38", end: "19:52", class: "C8.2", location: "S24E79 ( 3007 )", observationTime: "19:50-20:17", iris: ""},
                    // {date: "2022-05-11", goes: "08:11", peak: "08:21", end: "08:25", class: "C2.1", location: "S24E45 ( 3007 )", observationTime: "07:56-08:24", iris: ""},
                    // {date: "", goes: "20:52", peak: "21:18", end: "21:40", class: "C7.6", location: "N13E88", observationTime: "20:36-21:03", iris: ""},
                    // {date: "2022-05-12", goes: "05:59", peak: "06:18", end: "06:29", class: "C2.2", location: "S33W21 ( 3006 )", observationTime: "06:06-06:32", iris: ""},
                    // {date: "", goes: "21:51", peak: "22:01", end: "22:09", class: "C2.8", location: "S33W30 ( 3006 )", observationTime: "21:51-22:22", iris: ""},
                    // {date: "2022-05-13", goes: "00:56", peak: "01:04", end: "01:13", class: "C2.4", location: "N13E89 ( 3011 )01:04-01:31", iris: ""},
                    // {date: "2022-05-14", goes: "09:04", peak: "09:25", end: "09:43", class: "C3.0", location: "N15E88 ( 3015 )", observationTime: "08:42-09:10", iris: ""},
                    // {date: "", goes: "15:10", peak: "15:16", end: "15:23", class: "C2.1", location: "N11E70 (3015)", observationTime: "15:02-15:29", iris: ""},
                    // {date: "", goes: "21:20", peak: "22:07", end: "22:28", class: "C5.7", location: "N17E88 (3015)", observationTime: "21:22-21:49", iris: ""},
                    // {date: "2022-05-15", goes: "13:25", peak: "13:36", end: "13:58", class: "C1.4", location: "N17E88 (3015)", observationTime: "13:11-13:38", iris: ""},
                    // {date: "2022-05-16", goes: "20:41", peak: "20:47", end: "21:24", class: "C2.5", location: "N21E44 ( 3014 )", observationTime: "20:49-21:16", iris: ""},
                    // {date: "", goes: "20:58", peak: "21:02", end: "21:06", class: "C2.3", location: "N22E51 ( 3014 )", observationTime: "20:49-21:16", iris: ""},
                    // {date: "2022-05-17", goes: "00:00", peak: "00:10", end: "00:14", class: "C3.6", location: "N21E42 ( 3014 )", observationTime: "00:00-00:26", iris: ""},
                    // {date: "", goes: "03:06", peak: "03:10", end: "03:45", class: "C3.3", location: "S15E21 ( 3010 )", observationTime: "03:09-03:36", iris: ""},
                    // {date: "", goes: "09:36", peak: "09:40", end: "10:00", class: "C3.0", location: "S30W88 ( 3006 )", observationTime: "09:28-09:55", iris: ""},
                    // {date: "", goes: "12:28", peak: "12:35", end: "12:40", class: "C8.6", location: "S31W88 ( 3006 )", observationTime: "12:38-13:05", iris: ""},
                ],
            }
        },
        mounted() {
            this.initLanguage();
            this.search(1, 10);
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
            },

            async search(currentPage, pageSize) {
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                let params = new FormData();
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_web_flare_text_list, params, "POST");
                if (data.code == 200) {
                    this.tableData = data.data;
                    if(this.tableData.length > 0) {
                        this.flare =  this.tableData[0];
                    }
                    return true;
                }
            }
        }

    }
</script>

<style scoped>
	.nd-policy {
		font-size: 14px;
		line-height: 24px;
		text-align: left;
		text-indent: 28px;
	}

	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
		.useRuleTitle {
			font-size: 20px;
			margin: 10px;
			text-align: left;
		}

		.userule {
			margin-top: 10px;
			font-size: 14px;
			line-height: 28px;
			text-align: left;
		}
	}
</style>