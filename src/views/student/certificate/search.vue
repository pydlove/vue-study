<template>
    <div>
        <div class="aioc-pc">
            <Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'" :bgColor="'bg-black'" :bluser="bluser"></Header>
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
                            <span>{{bluser.name}}</span>
                        </div>
                        <div class="xxitem">
                            <span>身份证件：</span>
                            <span>{{bluser.idcard}}</span>
                        </div>
                    </div>
                    <div class="mt-40">
                        <el-divider content-position="left">
                            <span class="fb">查看的证书</span>
                        </el-divider>
                    </div>
                    <div class="cem">
                        <div :id="key" class="ce" v-for="(item, key) in certificates" :key="key" @click="selectCertificate(item)">
                            <div class="cet">
                                {{item.name}}<br/>
                            </div>
                            <div class="ryzs">
                                荣誉证书
                            </div>
                            <i class="rongyu cei"></i>
                            <div class="cejg">
                                {{item.unit}}
                            </div>
                            <div v-show="certificateSelect == item.uuid" class="sjx">
                                <i class="el-icon-check dh"></i>
                            </div>
                        </div>
                    </div>
                </el-card>
                <el-card class="cecard">
                    <div class="tl fb">
                        <span>证书编号：</span>
                        <span class="color-fa5c26">{{honorCertificate.uuid}}</span>
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
            this.judgeIsLogin();
        },
        methods: {
            selectCertificate(item) {
                this.certificateSelect = item.uuid;
                this.honorCertificate = item;
                this.$refs.certificateRef.setHonorCertificate(item);
            },

            async judgeIsLogin() {
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_login_judgeIsLogin, {}, "GET");
                if (data.code === 200) {
                    if (data.data.isLogin == "login") {
                        this.bluser = data.data.bluser;
                        this.initCertificates();
                    } else {
                        this.$router.push({name: "studentLogin"});
                    }
                } else {
                    this.$router.push({name: "studentLogin"});
                }
            },

            async initCertificates() {
                const currentCertificate = this.$utils.getStorage("currentCertificate");
                let params = new FormData();
                params.append("uuid", currentCertificate.uuid)
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_certificate_my_list, params, "POST");
                if (data.code === 200) {
                    this.certificates = data.data;
                    this.selectCertificate(this.certificates[0]);
                }
            },

        },
        data() {
            return {
                activePage: "",
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight -100,
                certificates: [],
                bluser: "",
                certificateSelect: "",
                officialUnit: "安徽柏林书画研究院",
                honorCertificate: "",
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
            justify-content: center;
            height: 500px;
            position: relative;
            overflow: auto;
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
            font-size: 16px;
            color: #bf954b;
            font-family: 华文宋体;
            font-weight: 800;
            position: absolute;
            top: 30px;
            padding: 0px 10px;
        }
        .ryzs {
            font-size: 14px;
            color: #bf954b;
            font-family: 华文宋体;
            font-weight: 800;
            position: absolute;
            bottom: 100px;
            padding: 0px 10px;
        }
        .cei {
            width: 40px;
            height: 40px;
            margin-top: 10px;
            position: absolute;
            bottom: 50px;
        }
        .cejg {
            font-size: 6px;
            color: #bf954b;
            line-height: 20px;
            position: absolute;
            bottom: 20px;
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