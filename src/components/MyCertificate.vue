<template>
    <div>
        <el-divider content-position="left">
            我的证书
        </el-divider>
        <div class="mt-40 ml-20">
            <el-table :data="certificates" border size="mini" style="width: 100%">
                <el-table-column prop="uuid" label="证书编号" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="name" label="证书名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="unit" label="颁发机构" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="createTime" label="获得时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button class="aioc-btn1" type="primary" size="mini" @click="toSee(scope.row)"><i class="el-icon-right"></i>去查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination class="fr mb-20 mt-20" ref="cePage" @search="initCertificates"></Pagination>
        </div>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination"
    export default {
        name: "MyCertificate",
        components: {Pagination},
        mounted() {
            this.initCertificates(0, 10)
        },
        methods: {
            toNewPage(to, key, value) {
                const detail = this.$router.resolve({name: to});
                if(key != undefined && key != null && value != null && value != undefined) {
                    this.$utils.setStorage(key, value);
                }
                window.open(detail.href,'_blank');
            },

            toSee(row) {
                this.toNewPage("certificateSearch");
                this.$utils.setStorage("currentCertificate", row);
            },

            async initCertificates(currentPage, pageSize) {
                this.ceCurrentPage = currentPage;
                this.cePageSize = pageSize;
                let params = new FormData();
                params.append("page", this.ceCurrentPage);
                params.append("limit", this.cePageSize);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_certificate_my_page_list, params, "POST");
                if (data.code === 200) {
                    this.certificates = data.data;
                    this.$refs.cePage.totalCount = data.totalCount;
                }
            },
        },
        data() {
            return {
                certificates: [],
                ceCurrentPage: 1,
                cePageSize: 10,
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