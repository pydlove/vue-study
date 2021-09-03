<template>
    <!--eslint-disable-->
    <div class="nd-footer">

        <div class="nd-info" v-if="this.client">
            <div class="nd-detail">
                <div class="nd-icon">
                    <van-image style="height: 70px;" :src="require('@/assets/img/logo/logo@2x.png')"/>
                </div>
                <div class="nd-address">
                    <div class="nd-addr">{{ $t('message.Address') }}: 江苏省南京市栖霞区仙林大道163号天文楼</div>
                    <div class="nd-phone">{{ $t('message.Contact') }}: (86)- 18012012539</div>
                    <div class="nd-mail">{{ $t('message.PostCode') }}: 210023</div>
                    <div class="nd-about">{{ $t('menu.AboutUs') }}
                        <div class="nd-tail" style="margin-left: 50px">{{ $t('menu.ContactUs') }}</div>
                    </div>
                </div>

                <div class="nd-over">
                    <div class="nd-tech-support"></div>
                    <div class="nd-port">
                        <div class="nd-support">{{ $t('message.TechnicalSupport') }}: {{ $t('message.Company') }}</div>
                        <div class="nd-num"> 苏ICP备 05002851 号</div>
                        <div class="nd-class">Copyright @ 南京大学天文与空间科学学院 All Rights Reserved 版权所有</div>
                    </div>
                    <div class="nd-tech-support"></div>
                </div>
            </div>
        </div>

        <div class="nd-info" v-else>
            <div class="nd-detail">
                <div class="nd-address">
                    <div class="nd-addr">{{ $t('message.Address') }}: 江苏省南京市栖霞区仙林大道163号天文楼</div>
                    <div class="nd-phone">{{ $t('message.Contact') }}: (86)- 18012012539</div>
                    <div class="nd-mail">{{ $t('message.PostCode') }}: 210023</div>
                    <div class="nd-aboutus">
                        <div class="nd-about" @click="aboutWe">{{ $t('menu.AboutUs') }}</div>
                        <div class="nd-tail" @click="aboutWe">{{ $t('menu.ContactUs') }}</div>
                    </div>

                </div>
                <div class="nd-icon">
                    <van-image style="height: 70px;" :src="require('@/assets/img/logo/logo@2x.png')"/>
                </div>
                <div class="nd-over">
                    <div class="nd-tech-support"></div>
                    <div class="nd-port">
                        <div class="nd-support">{{ $t('message.TechnicalSupport') }}: {{ $t('message.Company') }}</div>
                        <!--<div class="nd-num"> 苏ICP备 05002851 号</div>-->
                        <div class="nd-class">Copyright @ 南京大学天文与空间科学学院 All Rights Reserved 版权所有</div>
                    </div>
                    <div class="nd-tech-support"></div>
                </div>
            </div>
        </div>

    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "tail",

        mounted() {
            if (this.clientWidth < 500) {
                this.client = true;
            }
        },

        methods: {
            aboutWe() {
                let routeData = this.$router.resolve({
                    path: "/aboutWe",
                });
                window.open(routeData.href, '_blank');
            }
        },

        data() {
            return {
                client: false,
                clientWidth: document.body.clientWidth,
            }
        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {
        img {
            border-style: none;
            width: 210px;
            height: 306px;
            margin-left: 20px;
            text-align: center;
        }

        .nd-title div:nth-of-type(1) {
            font-size: 32px;
        }

        .nd-title div:nth-of-type(2) {
            font-size: 18px;
            margin-top: 10px;
        }

        .nd-footer {
            background: #ffffff;
            height: 260px;
            width: 100%;
            min-width: 1200px;
        }

        .nd-info {
            background: #252022;
            width: 1200px;
            padding: 20px 0;
            margin: 0px auto;
            height: 260px;
        }

        .nd-detail {
            display: flex;
            flex-wrap: wrap;
        }

        .nd-address {
            width: 300px;
            height: 150px;
            margin-left: 150px;
            color: #bfbfbf;
        }

        .nd-icon {
            width: 550px;
            margin-top: 15px;
            margin-left: 80px;
            height: 30px;
        }

        .nd-over {
            width: 930px;
            height: 80px;
            margin-left: 140px;
            padding: 0px 10px;
        }

        .nd-addr {
            text-align: left;
            font-size: 10px;
        }

        .nd-phone {
            margin-top: 25px;
            text-align: left;
            font-size: 10px;
        }

        .nd-mail {
            margin-top: 25px;
            text-align: left;
            font-size: 10px;
        }

        .nd-aboutus {
            margin-top: 25px;
            text-align: left;
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-tail {
            margin-left: 50px;
            font-size: 10px;
        }
        .nd-tail:hover {
            margin-left: 50px;
            font-size: 10px;
            color: #fa541c;
        }

        .nd-about {
            font-size: 10px;
        }

        .nd-about:hover {
            font-size: 10px;
            color: #fa541c;
        }

        .nd-port {
            display: flex;
            flex-wrap: nowrap;
            margin-top: 20px;
            color: #8c8c8c;
        }

        .nd-support {
            text-align: left;
        }

        .nd-tech-support {
            border-top: 1px solid #595959;
            margin-top: 20px;
        }

        .nd-num {
            margin-left: 80px
        }

        .nd-class {
            margin-left: 100px
        }

    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {
        .nd-footer {
            background: #ffffff;
            height: 180px;
            width: 100%;
            min-width: 375px;
        }

        .nd-info {
            width: 100%;
            height: 180px;
            background: #181617;
        }

        .nd-address {
            width: 100%;
            height: 80px;
            margin-left: 10px;
            color: #eeeeee;
            margin-top: 30px;
        }

        .nd-icon {
            width: 150px;
            height: 40px;
            margin-top: 10px;
            margin: 0px auto;
        }

        .nd-addr {
            margin-top: 5px;
            font-size: 1px;
            text-align: left;
            color: #bfbfbf;
            width: 100%;
        }

        .nd-phone {
            margin-top: 5px;
            text-align: left;
            font-size: 1px;
            color: #bfbfbf;
        }

        .nd-mail {
            margin-top: 5px;
            text-align: left;
            font-size: 1px;
            color: #bfbfbf;
        }

        .nd-about {
            margin-top: 5px;
            text-align: left;
            display: flex;
            flex-wrap: nowrap;
            font-size: 1px;
            color: #bfbfbf;
        }

        .nd-support {
            text-align: left;
            font-size: 1px;
            margin-top: 5px;
        }

        .nd-tech-support {
            border-top: 1px solid #f5f5f5;
            margin-top: 5px;
            font-size: 1px;
        }

        .nd-num {
            font-size: 1px;
            text-align: left;
            margin-top: 5px;
        }

        .nd-class {
            margin-top: 5px;
            font-size: 1px;
            text-align: left;
        }
    }
</style>