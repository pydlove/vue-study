<template>
    <!--eslint-disable-->
    <div>

    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "newView",
        mounted() {
            this.initNewData();
        },
        methods: {
            async initNewData(){
                let params = new FormData();
                params.append("startTime", this.startTime);
                params.append("endTime", this.endTime);
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_data_searchNewData, params, "POST");
                if(data.code == 200) {
                    this.tableData = data.data;
                    console.log(this.tableData);
                    this.$refs.pageRef.totalCount = data.totalCount;
                    return true;
                }
            },
        },
        data() {
            return {
                startTime: '2021-8-29 12:30:55',
                endTime: '2021-8-30 12:30:55',
                currentPage: 1,
                pageSize: 4,
                tableData: [],
            }
        }
    }
</script>

<style scoped>

</style>