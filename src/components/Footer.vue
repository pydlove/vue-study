<template>
    <!--eslint-disable-->
    <div class="nd-footer">

        <div class="nd-info" v-if="this.client">
            <div class="nd-detail">
                <div class="nd-icon">
                    <van-image style="height: 70px;" :src="require('@/assets/img/logo/logo@2x-tw.png')"/>
                </div>
                <div class="nd-address">
                    <div class="nd-addr fs-14">{{ $t('message.Address') }}: {{ $t('message.AddressDetail') }}</div>
                    <div class="nd-phone fs-14">{{ $t('message.Contact') }}: (86)-25-89683510</div>
                    <div class="nd-mail fs-14">{{ $t('message.PostCode') }}: 210023</div>
                    <div class="nd-about fs-14">{{ $t('menu.AboutUs') }}
                        <div class="nd-tail fs-14" style="margin-left: 50px">{{ $t('menu.ContactUs') }}</div>
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
                    <div class="nd-addr fs-14">{{ $t('message.Address') }}: {{ $t('message.AddressDetail') }}</div>
                    <div class="nd-phone fs-14">{{ $t('message.Contact') }}: (86)-25-89683510</div>
                    <div class="nd-mail fs-14">{{ $t('message.PostCode') }}: 210023</div>
                    <div class="nd-aboutus fs-14">
                        <!--<div class="nd-about cursor" @click="aboutWe">{{ $t('menu.AboutUs') }}</div>-->
                        <div class="nd-tail fs-14 cursor">{{ $t('menu.ContactUs') }}</div>
                        <div class="nd-tail fs-14 cursor">: xswan@nju.edu.cn</div>
                    </div>

                </div>
                <div class="nd-icon">
                    <van-image class="cursor" style="width: 80px; height: 100px;" :src="require('@/assets/img/logo/nd-logo.png')" @click="toOpen('https://www.nju.edu.cn/main.htm')"/>
                    <van-image class="ml-20 cursor" style="width: 103px; height: 103px;" :src="require('@/assets/img/logo/tw-logo.png')" @click="toOpen('https://astronomy.nju.edu.cn/')"/>
                </div>
                <div class="nd-over">
                    <div class="nd-tech-support"></div>
                    <div class="nd-port">
                        <!--<div class="nd-support">{{ $t('message.TechnicalSupport') }}: {{ $t('message.Company') }}</div>-->
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
            },

            toOpen(url) {
                window.open(url, '_blank');
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
            position: relative;
        }

        .nd-address {
            width: 500px;
            height: 150px;
            margin-left: 150px;
            color: #bfbfbf;
            font-size: 14px;
        }

        .nd-icon {
            width: 550px;
            margin-top: 15px;
            margin-left: 80px;
            height: 30px;
            position: absolute;
            right: 20px;
            top: 0px;
        }

        .nd-over {
            width: 930px;
            height: 80px;
            margin-left: 140px;
            padding: 0px 10px;
        }

        .nd-addr {
            text-align: left;
        }

        .nd-phone {
            margin-top: 15px;
            text-align: left;
        }

        .nd-mail {
            margin-top: 15px;
            text-align: left;
        }

        .nd-aboutus {
            margin-top: 15px;
            text-align: left;
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-tail {
            /*margin-left: 50px;*/
        }
        /*.nd-tail:hover {*/
            /*margin-left: 50px;*/
            /*font-size: 10px;*/
            /*color: #fa541c;*/
        /*}*/

        .nd-about {
            font-size: 10px;
        }

        .nd-about:hover {
            font-size: 10px;
            color: #fa541c;
        }

        .nd-port {
            /*display: flex;*/
            /*flex-wrap: nowrap;*/
            margin-top: 20px;
            color: #8c8c8c;
            /*align-items: center;*/
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
            /*margin-left: 100px*/
            font-size: 14px;
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
            text-align: center;
        }
    }
</style>