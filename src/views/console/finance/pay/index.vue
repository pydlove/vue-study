<template>
    <div :class="bgClass + '-main'">
        <el-card :class="bgClass + '-card'" :style="'height:' + clientHeight + 'px;'">
            <el-card>
                <el-table
                        :class="bgClass == 'aiocw' ? '':'aioc-table'"
                        :border="bgClass == 'aiocw'"
                        ref="codeTable"
                        :data="tableData"
                        @selection-change='onTableSelectChange'
                        @row-click='tableRowClick'
                        :row-style="{height:'20px'}"
                        :cell-style="{padding:'9px 1px'}"
                >
                    <el-table-column prop="type" label="支付账户类型" width="100">
                        <template slot-scope="scope">
                            <span >{{fmtType(scope.row.type)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="paySet" label="支付账户参数">
                        <template slot-scope="scope">
                            <div v-if="showPaySet(scope.row.id)">
                                <div v-if="scope.row.type == '0'">
                                    <el-card class="mb-5">
                                        <span class="fb">app_id（商户id）:</span>
                                        {{scope.row.appId}}
                                    </el-card>
                                    <el-card class="mb-5">
                                        <span class="fb">merchant_private_key （应用私钥）:</span>
                                        <br>{{scope.row.merchantPrivateKey}}
                                    </el-card>
                                    <el-card class="mb-5">
                                        <span class="fb">alipay_public_key （支付宝公钥）:</span>
                                        <br>{{scope.row.alipayPublicKey}}
                                    </el-card>
                                </div>
                                <div v-else>
                                    <el-card class="mb-5">
                                        <span class="fb">app_id（微信公众账号APPID）:</span>
                                        {{scope.row.appId}}
                                    </el-card>
                                    <el-card class="mb-5">
                                        <span class="fb">mch_id （商户号）:</span>
                                        <br>{{scope.row.mchId}}
                                    </el-card>
                                    <el-card class="mb-5">
                                        <span class="fb">api_key （API密钥）:</span>
                                        <br>{{scope.row.apiKey}}
                                    </el-card>
                                </div>
                                <el-button v-aiocp="['vp']" size="mini" @click="hidePaySet(scope.row.id)">隐藏参数</el-button>
                            </div>

                            <div v-else>
                                <i class="yc"></i> <span class="fb mr-20">* * * * * *</span>
                                <el-button v-aiocp="['vp']" size="mini" @click="showPaySetIds.push(scope.row.id);">查看参数</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == '0'" class="color-67C23A fb">
                                已启用
                            </span>

                            <el-tag v-else type="info" class="color-606266">
                                已停用
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"  fixed="right" width="120">
                        <template slot-scope="scope">
                            <el-button class="aioc-btn1"
                                       v-aiocp="['e']"
                                       size="mini"
                                       @click="editRow(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-card>
        <Edit ref="editRef" @search="search"></Edit>
    </div>
</template>

<script>
    import Edit from "@/views/console/finance/pay/edit";
    export default {
        name: "index",
        components: {Edit},
        mounted() {
            this.search();
        },
        methods: {
            showPaySet(id) {
                for(var i in this.showPaySetIds) {
                    if(id == this.showPaySetIds[i]) {
                        return true;
                    }
                }
                return false;
            },

            hidePaySet(id) {
                var temp = [];
                for(var i in this.showPaySetIds) {
                    if(id != this.showPaySetIds[i]) {
                        temp.push(this.showPaySetIds[i]);
                    }
                }
                this.showPaySetIds = temp;
            },

            async search() {
                let params = new FormData()
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_pay, params, "POST");
                if (data.code === 200) {
                    this.tableData = data.data;
                    return true;
                }
            },

            fmtType(type) {
                switch (type) {
                    case "0":
                        return "支付宝";
                    case "1":
                        return "微信";
                    default:
                        return "";
                }
            },

            /**
             * 编辑
             */
            editRow(row) {
                this.$refs.editRef.form = {
                    id: row.id,
                    appId: row.appId,
                    mchId: row.mchId,
                    type: row.type,
                    typeName: this.fmtType(row.type),
                    updateTime: row.updateTime,
                    createTime: row.createTime,
                    status: row.status,
                    merchantPrivateKey: row.merchantPrivateKey,
                    alipayPublicKey: row.alipayPublicKey,
                    apiKey: row.apiKey,
                };
                this.$refs.editRef.open();
            },

        },
        data() {
            return {
                bgClass: "aiocw",
                tableData: [],
                clientWidth: 1800,
                clientHeight: document.body.clientHeight-2,
                showPaySetIds: [],
            }
        },
    }
</script>

<style scoped>

</style>
<style >
    .aioc-upload .el-upload-list__item-thumbnail {
        vertical-align: middle;
        display: inline-block;
        height: 400px;
        width: 500px;
        float: left;
        position: relative;
        z-index: 1;
        margin-left: -80px;
        background-color: #FFF;
    }
    .aioc-upload .el-upload-list__item {
        overflow: hidden;
        z-index: 0;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        margin-top: 10px;
        padding: 10px 10px 10px 90px;
        height: 420px;
        width: 600px;
    }
    .aioc-upload .el-upload-dragger {
        width: 600px;
        height: 180px;
    }
</style>