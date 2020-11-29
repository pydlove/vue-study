<template>
    <div>
        <div class="aioc-pc">
            <Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'" :bgColor="'bg-black'"></Header>
        </div>
        <div class="aioc-container1" :style="'width:' + clientWidth + 'px; height:' + clientHeight + 'px;'">
            <div class="jz dffn">
                <el-card class="gycard tl color-303133 fs-15">
                    <el-divider content-position="left">
                        <span class="fb">您的基本信息</span>
                    </el-divider>
                    <div class="ml-40">
                        <div class="xxitem">
                            <span>姓 <span class="ml-28"></span> 名：</span>
                            <span>{{user.name}}</span>
                        </div>
                        <div class="xxitem">
                            <span>身份证件：</span>
                            <span>{{user.idCard}}</span>
                        </div>
                        <div class="xxitem">
                            <span>证书数量：</span>
                            <span>{{user.honorCertificateTotal}}</span>
                        </div>
                        <div class="xxitem">
                            <span>颁发机构：</span>
                            <span>{{officialUnit}}</span>
                        </div>
                    </div>
                    <div class="mt-40">
                        <el-divider content-position="left">
                            <span class="fb">获得的证书列表</span>
                        </el-divider>
                    </div>
                    <div class="cem">
                        <div class="ce" v-for="item in user.honorCertificates" :key="item.id" @click="selectCertificate(item)">
                            <div class="cet">
                                {{item.honorName}}<br/>荣誉证书
                            </div>
                            <i class="rongyu cei"></i>
                            <div class="cejg">
                                {{item.officialUnit}}
                            </div>
                            <div v-show="certificateSelect == item.id" class="sjx">
                                <i class="el-icon-check dh"></i>
                            </div>
                        </div>
                        <el-pagination  :hide-on-single-page="pageshow"
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="pageSizes"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev, pager, next"
                                        :total="totalCount">
                        </el-pagination>
                    </div>
                </el-card>
                <el-card class="cecard">
                    <div class="tl fb">
                        <span>证书编号：</span>
                        <span class="color-fa5c26">{{honorCertificate.id}}</span>
                    </div>
                    <div>
                        <Certificate ref="certificateRef" :pageLimit="pageLimit"></Certificate>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import Certificate from  "@/components/Certificate"

    export default {
        name: "index",
        components: {Header, Certificate},
        mounted() {
        },
        methods: {
            selectCertificate(item) {
                this.certificateSelect = item.id;
                this.honorCertificate = item;
                this.$refs.certificateRef.setHonorCertificate(item);
            }
        },
        data() {
            return {
                activePage: "证书信息",
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight -100,
                pageLimit: 2,
                user: {
                    id: "1",
                    name: "欧阳娜娜",
                    sex: 0,
                    idCard: "210448196602231235",
                    birth: "2008-06-15",
                    address: "广东省江门市",
                    phone: "13645695968",
                    honorCertificates: [
                        {
                            id: "blsh2020111116",
                            honorName: "三好学生",
                            officialUnit: "安徽柏林书画研究院",
                            img: require("@/assets/img/ryzs.jpg"),
                        },
                        {
                            id: "blsh2020111117",
                            honorName: "优秀写手",
                            officialUnit: "安徽柏林书画研究院",
                            img: require("@/assets/img/ryzs.jpg"),
                        },
                        {
                            id: "blsh2020111118",
                            honorName: "优秀写手",
                            officialUnit: "安徽柏林书画研究院",
                            img: require("@/assets/img/ryzs.jpg"),
                        },
                        {
                            id: "blsh2020111119",
                            honorName: "优秀写手",
                            officialUnit: "安徽柏林书画研究院",
                            img: require("@/assets/img/ryzs.jpg"),
                        },
                    ],
                    honorCertificateTotal: 8,
                },
                officialUnit: "安徽柏林书画研究院",
                certificateSelect: "blsh2020111116",
                honorCertificate:   {
                    id: "blsh2020111116",
                    honorName: "三好学生",
                    officialUnit: "安徽柏林书画研究院",
                    img: require("@/assets/img/ryzs.jpg"),
                },
                /**
                 * 分页参数
                 */
                currentPage: 1,
                pageSize: 10,
                pageSizes: [4],
                totalCount: 8,
                pageshow: false,
            }
        },
    }
</script>

<style scoped>
        .cecard {
            width: 1000px;
            margin-left: 10px;
        }
        .gycard {
            width: 400px;
        }
        .xxitem {
            line-height: 40px;
        }
        .jz {
            width: 1400px;
            margin: 10px auto;
            margin-bottom: 20px;
        }
        .cem {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: left;
            height: 500px;
        }
        .ce {
            width: 140px;
            height: 180px;
            text-align: center;
            background: #a3010e;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 5px;
            margin: 19px;
            position: relative;
        }
        .cet {
            font-size: 22px;
            color: #bf954b;
            font-family: 华文宋体;
            font-weight: 800;
            margin-top: 20px;
        }
        .cei {
            width: 40px;
            height: 40px;
            margin-top: 10px;
        }
        .cejg {
            font-size: 6px;
            color: #bf954b;
            margin-top: 20px;
            line-height: 20px;
        }
        .dh {
            position: absolute;
            top: 15px;
            right: 12px;
            font-size: 24px;
            color: #ffffff;
        }
        .sjx {
            width: 50px;
            height: 50px;
            position: absolute;
            top: 65px;
            right: 45px;
            border-radius: 25px;
            background: #67C23A;
            opacity:0.9;
        }

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