<template>
    <!--eslint-disable-->
    <div>
        <el-radio v-model="radio" label="1" @change = "week">一周以内</el-radio>
        <el-radio v-model="radio" label="2" @change="month">一个月以内</el-radio>
        <div class="nd-news-list">
            <div class="myCard">
                <el-card class="nd-list" v-for="(item, index) in this.tableData" :key="index">
                    <div class="nd-lists">
                        <el-image
                                class="nd-picture"
                                :src="item.picture"
                                :preview-src-list="[item.picture]"></el-image>
                    </div>
                    <div class="nd-list-title"  @click="lookDetail(item)">
                        <p class="myCards">{{item.SIMPLE}}</p>
                    </div>
                    <div  class="nd-list-title" >
                        <p class="myCards1"> {{item.BITPIX}}</p>
                    </div>
                </el-card>
            </div>
        </div>

    </div>
</template>
<!--eslint-disable-->
<script>
    import Pagination from "@/components/Pagination";
    import Page from "@/components/Page";

    export default {
        name: "newView",
        components: {Page, Pagination},
        mounted() {
            this.initNewData();
        },
        methods: {
            week() {
              this.startTime = this.$utils.lastWeek();
              console.log(this.startTime);
              var data = new Date();
              this.endTime = data;
              this.initNewData();
            },
            month() {
               this.startTime = this.$utils.lastMonth();
                console.log(this.startTime);
                var data = new Date();
                this.endTime = data;
                this.initNewData();
            },

            async initNewData(){
                let params = new FormData();
                params.append("startTime", this.startTime);
                params.append("endTime", this.endTime);
                params.append("page", this.currentPage);
                params.append("limit", this.pageSize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_data_searchNewData, params, "POST");
                if(data.code == 200) {
                    this.tableData = data.data;
                    for( var i = 0; i < this.tableData.length; i++) {
                        var json = JSON.parse(this.tableData[i].dataDetail);
                        this.dataDetail.push(json);
                    }
                    console.log(this.dataDetail);
                    //
                    return true;
                }
            },
        },
        data() {
            return {
                startTime: "",
                endTime: "",
                currentPage: 1,
                pageSize: 4,
                tableData: [],
                radio: '1',
                dataDetail: [],
            }
        }
    }
</script>

<style scoped>

</style>