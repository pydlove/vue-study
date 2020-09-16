<template>
    <div>
        <div class="aioc-policy">
            <Header :activePage="activePage" @toLoginPage="toLoginPage" @toRegisterPage="toRegisterPage"></Header>
            <div class="policy-main">
                <div class="policy-title">
                    梧桐圈，您专属的人才政策咨询顾问
                </div>
                <div class="policy-desc">
                    现在每天超过 10万的用户们使用梧桐圈去了解每个地方政府的人才政策，
                    在梧桐圈上线以来，已有超过 100 万的人才通过梧桐圈了解到他们能享受的所有政策，
                    在这里他们分享他们技能、经验， 他们是梧桐圈真正的创造者。
                </div>

                <div>
                    <el-input class="policy-input"
                            placeholder="每天10万人次通过梧桐圈去搜索人才政策"
                            v-model="input3">
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>

                <div class="policy-hotsearch">
                    <span>热门搜索</span>
                    <span v-for="(item, index) in hotSearchs" :key="index">{{item.name}}</span>
                </div>

                <div class="policy-type">
                    <el-card shadow="always" class="policy-all wow bounceInLeft" @click.native="toAllPolicyPage">
                        <div class="ptta">中国有哪些人才政策？</div>
                        <div class="ptadesc">
                            你真的了解中国每座城市人才和企业扶持等相关的人才政策吗？
                            <span class="ptak">去了解</span>
                        </div>
                        <img src="@/assets/img/policy-all.png" alt="">
                    </el-card>

                    <el-card shadow="always" class="policy-my wow bounceInRight" @click.native="toMyPolicyPage">
                        <div class="pttm">你能享受哪些政策？</div>
                        <div class="ptmdesc">
                            你一共能享受多少人才政策？在每个城市都能享受什么人才政策？想知道吗？
                            <span class="ptmk">去了解</span>
                        </div>
                        <img src="@/assets/img/policy-all.png" alt="">
                    </el-card>
                </div>
            </div>
        </div>
        <Login ref="loginRef" @toRegisterPage="toRegisterPage" @toForgetPage="toForgetPage"></Login>
        <Register ref="registerRef" @toLoginPage="toLoginPage"></Register>
        <Forget ref="forgetRef" @toLoginPage="toLoginPage"></Forget>
    </div>
</template>

<script>
    import Header from  "@/components/Header"
    import Login from "@/components/Login"
    import Register from "@/components/Register"
    import Forget from "@/components/Forget"

    export default {
        name: "policy",
        components: {Header, Login, Register, Forget},
        mounted() {
            new this.$wow.WOW({
                live: false
            }).init()
        },
        methods: {
            toAllPolicyPage() {
                // this.$refs.loginRef.open();
                const pathobj = this.$router.resolve({
                    path: "/policyInquire",
                })
                window.open(pathobj.href, '_blank')
            },
            toMyPolicyPage() {
                this.$refs.loginRef.open();
            },
            toRegisterPage() {
                this.$refs.registerRef.openRegisterType();
            },
            toLoginPage() {
                this.$refs.loginRef.open();
            },
            toForgetPage() {
                this.$refs.forgetRef.open();
            },
        },
        data() {
            return {
                /*当前选中菜单*/
                activePage: '人才政策',

                /*热门搜索*/
                hotSearchs: [
                    {
                        name: "人才引进",
                    }, {
                        name: "租房补贴",
                    }, {
                        name: "就业创业",
                    },{
                        name: "公务员",
                    }, {
                        name: "劳动关系",
                    },{
                        name: "社会保险",
                    },{
                        name: "技能鉴定",
                    },{
                        name: "培训补贴",
                    },
                ],
            }
        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .aioc-policy {
            background-image: url("../../assets/img/policy-1.jpg");
            height: 800px;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .policy-title {
            margin: 40px auto;
            width: 720px;
            height: 54px;
            line-height: 54px;
            color: #fff;
            font-family: sy-sans,sans-serif;
            font-size: 44px;
            text-align: center;
            text-shadow: 0 10px 30px rgba(0,0,0,.3), 0 2px 10px rgba(0,0,0,.2);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .policy-desc {
            margin: 40px auto;
            width: 690px;
            color: #fff;
            text-align: center;
            line-height: 24px;
            text-shadow: 0 1px 16px rgba(0,0,0,.3);
        }
        .policy-input {
            width: 690px;
        }
        .policy-hotsearch {
            margin: 15px auto;
            width: 690px;
            text-align: left;
        }
        .policy-hotsearch > span:nth-of-type(n+1) {
            margin: 0px 10px 10px 0px;
            font-size: 14px;
            color: #ffffff;
            background: #409EFF;
            padding: 5px;
            border-radius: 3px;
        }
        .policy-hotsearch > span:nth-of-type(n+2):hover {
            background: #2f67ff;
        }
        .policy-hotsearch > span:nth-of-type(1){
            color: #ff2423;
            background: none;
        }
        .policy-type {
            margin: 40px auto;
            width: 1000px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
        }
        .policy-type .el-card {
            width: 400px;
            height: 300px;
            margin: 20px;
            opacity:0.88;
            /* 针对 IE8 以及更早的版本 */
            filter:alpha(opacity=88);
        }
        .policy-type .el-card:hover {
            animation:mymove 3s 2;
            animation-timing-function: ease-in-out; /*动画的速度曲线*/
            /* Safari 和 Chrome */
            -webkit-animation:mymove 3s 2;
            -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
         }
        @keyframes mymove
        {
            0%{
                transform: scale(1);  /*开始为原始大小*/
            }
            50%{
                transform: scale(1.1); /*放大1.1倍*/
            }
        }
        @-webkit-keyframes mymove /*Safari and Chrome*/
        {
            0%{
                transform: scale(1);  /*开始为原始大小*/
            }
            25%{
                transform: scale(1.1); /*放大1.1倍*/
            }
        }

        .policy-all img {
            background-repeat: no-repeat;
            background-size: cover;
            width: 250px;
        }
        .policy-my img {
            background-repeat: no-repeat;
            background-size: cover;
            width: 250px;
        }
        .ptta {
            font-size: 30px;
            color: #ee5c35;
        }
        .ptadesc {
            font-size: 16px;
            margin: 10px auto;
            color: #ee5c35;
            line-height: 30px;
        }
        .ptak {
            display: inline-block;
            width: 70px;
            height: 25px;
            line-height: 25px;
            border-radius: 3px;
            background: #ee5c35;
            color: #fff;
            float: right;
            margin-top:10px;
        }
        .pttm {
            font-size: 30px;
            color: #277eff;
        }
        .ptmdesc {
            font-size: 16px;
            margin: 10px auto;
            color: #277eff;
            line-height: 30px;
        }
        .ptmk {
            display: inline-block;
            width: 70px;
            height: 25px;
            line-height: 25px;
            border-radius: 3px;
            background: #277eff;
            color: #fff;
            float: right;
            margin-top:10px;
        }
    }

    /*媒体查询（平板）*/
    @media screen and (min-width: 769px) and (max-width: 996px) {


    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {


    }
</style>