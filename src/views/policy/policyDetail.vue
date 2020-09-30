<template>
    <div>
        <div class="header">
            <Header ref="headerRef" :activePage="activePage"></Header>
        </div>
        <div class="pode-container">
            <div class="pode-main">
                <el-card shadow="always" class="policy-card ">
                    <div class="policy-main">
                       <h1>{{policyData.title}}</h1>

                       <div class="pc-container">
                           <div class="policy-tag">
                               <el-tag type="" effect="dark">{{showArea()}}</el-tag>
                               <el-tag type="success" effect="dark">{{policyData.treatmentType}}</el-tag>
                               <el-tag type="success" effect="dark">{{policyData.policyType}}</el-tag>

                               <span class="policy-bq">{{policyData.no}}</span>
                           </div>

                           <div class="policy-content">
                               <span class="title">政策内容：</span>
                               <div class="mt-10 pc-main">
                                   {{policyData.content}}
                               </div>

                               <div class="mt-20">
                                   <span class="title">人才待遇：</span>{{policyData.talentTreatment}}
                               </div>

                               <div class="mt-20">
                                   <span class="title">待遇类型：</span>{{policyData.treatmentType}}
                               </div>

                               <div class="mt-20">
                                   <span class="title">政策类型：</span>{{policyData.policyType}}
                               </div>

                               <div class="mt-20 contact">
                                  <div>
                                      <div>
                                          <span>咨询单位：</span>{{policyData.governmentUnitName}}
                                      </div>

                                      <div class="">
                                          <span>办公时间：</span>{{policyData.officeHours}}
                                      </div>

                                      <div class="">
                                          <span>单位地址：</span>{{policyData.address}}
                                      </div>

                                      <div class="">
                                          <span>咨询电话：</span>{{policyData.hotline}}
                                      </div>
                                  </div>
                               </div>
                           </div>
                       </div>
                    </div>
                    <div class="policy-cond">
                        <div class="poc-title">
                            政策条件
                            <el-button class="fr mri-20" type="primary" size="mini"
                                       @click="getMySuitability()"
                            >{{isShowSuitability ? "隐藏我的匹配度": "显示我的匹配度"}}</el-button>
                        </div>
                        <div class="poc-main">
                            <div class="cond">
                                <div class="mt-20" v-for="(item, index) in policyData.conditionList" :key="index">
                                    <span>{{item.kpiName}}：</span>
                                    <span class="color-fa5c26">{{item.name}}</span>
                                </div>
                            </div>

                            <div class="suitability" v-show="isShowSuitability">
                                <div class="mt-20 wow bounceInRight">
                                    <span class="el-icon-success color-67C23A"></span>
                                    <span class="color-67C23A ml-10">满足</span>
                                </div>

                                <div class="mt-20 wow bounceInRight">
                                    <span class="el-icon-success color-67C23A"></span>
                                    <span class="color-67C23A ml-10">满足</span>
                                </div>

                                <div class="mt-20 wow bounceInRight">
                                    <span class="el-icon-success color-F56C6C"></span>
                                    <span class="color-F56C6C ml-10">不满足</span>
                                </div>

                                <div class="mt-20 wow bounceInRight">
                                    <span class="el-icon-success color-67C23A"></span>
                                    <span class="color-67C23A ml-10">满足</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-20 wow bounceInRight" v-show="isShowSuitability">
                            <div>匹配结论：</div>
                            <div class="color-F56C6C mt-20">您的情况与政策条件匹配度为75%，不能享受该政策。</div>
                        </div>
                    </div>

                    <div class="policy-op">
                        <a>
                            <span class="unlinke-icon"></span>
                            <div class="opspan">点赞</div>
                        </a>
                        <a href="#publishEvaluation">
                            <span class="evaluation-icon"></span>
                            <div class="opspan">评价</div>
                        </a>
                        <a>
                            <span class="share-icon"></span>
                            <div class="opspan">分享</div>
                        </a>
                        <a>
                            <span class="unfavorites-icon"></span>
                            <div class="opspan">收藏</div>
                        </a>
                        <a>
                            <span class="phoneg-icon"></span>
                            <div class="opspan">手机看</div>
                        </a>

                        <div class="eva-statistics">
                            <span class="mr-20">赞：200</span>
                            <span class="mr-20">查看次数：200</span>
                            <span>评论：200</span>
                        </div>
                    </div>
                </el-card>

                <Comment ref="commentRef"></Comment>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import Comment from  "@/components/Comment.vue"


    export default {
        name: "policyDetail",
        components: {Header, Comment},
        mounted() {
            this.policyId = this.$route.query.id;
            this.initPolicy(this.policyId);
            this.$refs.commentRef.initComments(this.policyId);
            new this.$wow.WOW({
                live: false
            }).init();
        },
        methods: {
            /**
             * 初始化政策
             * @param {*} id 政策id
             * @author panyong
             */
            async initPolicy(id) {
                let params = new FormData()
                params.append("id", id);
                let data = await this.$aiorequest(this.$aiocUrl.cpcm_service_v1_cm_talent_policy_info, params, "POST");
                if (data.code === 200) {
                    this.policyData = data.data;
                    return true;
                }
            },

            /**
             * 获取我的匹配度
             * @author panyong
             */
            getMySuitability() {
                this.isShowSuitability = this.isShowSuitability ? false : true;
            },

            /**
             * 显示适用区域
             * @author panyong
             */
            showArea() {
                const level = this.policyData.level;
                switch (level) {
                    case "0":
                        return this.policyData.country;
                    case "1":
                        return this.policyData.province;
                    case "2":
                        return this.policyData.city;
                    case "3":
                        return this.policyData.county;
                    default:
                        break;
                }
            },
        },
        data() {
            return {
                /*当前选中菜单*/
                activePage: '人才政策',
                // 当前政策信息
                policyData: "",
                // 当前政策编号
                policyId: "",
                // 是否神计算我的匹配度
                isShowSuitability: false,
            }
        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .header {
            height: 50px;
            background: #333333;
        }
        .pode-container {
            display: flex;
            justify-content: center;
            background: #eeeeee;
        }
        .pode-main {
            width: 1230px;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        .policy-card {
            display: flex;
            flex-wrap: nowrap;
            position: relative;
            padding-bottom: 60px;
        }
        .policy-main {
            width: 800px;
            padding: 20px 10px 20px 10px;
        }
        .policy-cond {
            width: 400px;
            border-left: 1px dashed #cccccc;
        }
        .policy-content {
            text-align: left;
            margin: 20px;
        }
        .pc-main {
            text-indent:2em;
            line-height: 40px;

        }
        .policy-main h1 {
            font-size: 22px;
            font-weight: 600;
        }
        .title {
            font-size: 16px;
            font-weight: bold;
            color: #2b90ff;
        }
        .policy-tag {
            margin: 20px;
        }
        .policy-bq {
            float: right;
            display: inline-block;
            line-height: 32px;
            font-size: 14px;
            color: #999999;
        }
        .pc-container {
            text-align: left;
        }
        .pc-container .el-tag {
            margin-right: 10px;
        }
        .contact {
            float: right;
            color: #606266;
            width: 300px;
            line-height: 30px;
        }
        .contact span {
            font-size: 16px;
        }
        .policy-op {
            position: absolute;
            bottom: 0px;
            height: 40px;
            line-height: 40px;
            display: flex;
            flex-wrap: nowrap;
            padding: 10px;
            background: #eeeeee;
            width: 100%;
        }
        .policy-op > a {
            display: flex;
            justify-content: center;
            line-height: 40px;
            padding-top: 10px;
            width: 88px;
            border-radius: 3px;
            color: #707070;
            text-decoration: none;
        }
        .policy-op > a:hover {
            background: #DCDFE6;
        }
        .eva-statistics {
            position: absolute;
            right: 40px;
            font-size: 14px;
            color: #707070;
        }
        .opspan {
            height: 20px;
            line-height: 20px;
            margin-left: 5px;
            text-align: center;
        }
        .policy-cond {
            padding-top: 20px;
            padding-left: 20px;
            text-align: left;
        }
        .poc-main {
            padding: 10px;
            display: flex;
            flex-wrap: nowrap;
        }
        .poc-title {
            font-size: 20px;
            font-weight: 600;
            padding-left: 10px;
            height: 28px;
            line-height: 28px;
        }
        .cond {
            width: 300px;
            font-size: 15px;
        }
        .suitability {
            width: 100px;
            font-size: 15px;
        }
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
        .policy-card .el-card__body{
            display: flex;
            flex-wrap: nowrap;
            padding: 0px;
        }
    }
</style>