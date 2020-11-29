<template>
    <div>
        <el-divider content-position="left">
            我的证书
        </el-divider>
        <div class="mt-40 ml-20">
            <el-table :data="certificates" border size="mini" style="width: 100%">
                <el-table-column prop="no" label="证书编号" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="name" label="荣誉名称" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="getTime" label="获得时间" show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="toSee(scope.$index, scope.row)"><i class="el-icon-right"></i>去查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="fr mb-20 mt-20" ref="sPaginationRef"></Pagination>
        </div>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination"
    export default {
        name: "MyCertificate",
        components: {Pagination},
        mounted() {

        },
        methods: {
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
        },
        data() {
            return {
                certificates: [
                    {
                        id: "1",
                        no: "20200506898989",
                        name: "安徽柏林书画研究院三好学生",
                        getTime: "2020-11-6",
                    }
                ],
            }
        }
    }
</script>

<style scoped>
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