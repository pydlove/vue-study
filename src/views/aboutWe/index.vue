<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <div class="nd-top">
            <div class="nd-top-main">
                <div class="nd-tm-left">
                    <van-image class="nd-logo" :src="require('@/assets/img/logo/logo@2x.png')"/>
                    <div class="nd-title">
                        <div>太阳数据分析中心</div>
                        <div>Sun data analysis center</div>
                    </div>
                </div>
                <Header></Header>
            </div>
        </div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
            <el-breadcrumb-item :to="{ path: '/home' }">
                <i class="el-icon-s-home"></i>
                {{ $t('menu.home') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ $t('menu.AboutUs') }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="nd-background">
            <div class="nd-content dffn">
                <div class="aiocloud-card aw-left" >
                    <div class="nd-contact">
                        <div class="nd-address">{{ $t('message.Address') }}: 江苏省南京市栖霞区仙林大道163号天文楼 </div>
                        <div class="nd-address">{{ $t('message.Contact') }}: (86)- 18012012539</div>
                        <div class="nd-address">{{ $t('message.EmailAddress') }}: 2228627068@qq.com</div>
                    </div>
                    <div class="nd-wechat"></div>
                    <div class="wechat-cen">
                        <div class="wechat-icon"></div>
                        <div class="wechat-num">
                            {{ $t('message.WeChat') }}
                        </div>
                    </div>
                </div>

                <div class="aiocloud-card aw-right">
                    <div class="nd-aboutus">
                        {{ $t('menu.AboutUs') }}
                    </div>
                    <div class="nd-new-title-desc">
                        {{ $t('menu.AboutUs') }}
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<!--eslint-disable-->
<script>
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";

    export default {
        name: "index",
        components: {Footer, Header},
    }
</script>

<style scoped>
    @media screen and (min-width: 768px) {

        .nd-new-title-desc {
            line-height: 22px;
            color: #333333;
            font-size: 14px;
            margin-top: 10px;
        }
        .nd-aboutus{
            font-size: 14px;
            text-align: left;
            width: 100%;
            height: 20px;
        }

        .wechat-cen {
            margin-top: 10px;
            text-align: center;
            display: flex;
            flex-wrap: nowrap;
            align-items: center; /*//垂直居中*/
            justify-content: center;
            width: 200px;
        }
        .nd-wechat {
            display: flex;
            flex-wrap: nowrap;
        }
        .wechat-icon {
            background: url("../../assets/img/icon/weChat.png");
            width: 32px;
            height: 32px;
        }

        .wechat-num {
            font-size: 15px;
            margin-left: 10px;
        }


        .nd-wechat {
            background: url("../../assets/img/background/avatar.jpg");
            width: 200px;
            height: 200px;
            margin-top: 50px;
        }
        
        .nd-content > div[data-v-899ba358]:nth-of-type(1) {
            width: 400px;
            min-height: 500px;
            margin-right: 20px;
        }

       .nd-address {
           font-size: 12px;
           margin-top: 20px;
           text-align: left;
       }

        .nd-content > div:nth-of-type(1) {
            width: 200px;
            min-width: 200px;
            height: 300px;
            margin-right: 20px;
        }

        .nd-content > div:nth-of-type(2) {
            width: calc(100% - 220px);
            display: flex;
            flex-wrap: wrap;
            background: #ffffff;
        }

        img {
            border-style: none;
            width: 210px;
            height: 306px;
            margin-left: 20px;
            text-align: center;
        }

        .nd-introduction-title > div:nth-of-type(1) {
            font-size: 26px;
            margin-left: 20px;
            line-height: 40px;
        }

        .nd-introduction-title > div:nth-of-type(2) {
            font-size: 10px;
            line-height: 20px;
            height: 20px;
            font-family: SC-Light;
            margin-left: 23px;
        }

        .nd-title div:nth-of-type(1) {
            font-size: 32px;
        }

        .nd-title div:nth-of-type(2) {
            font-size: 18px;
            margin-top: 10px;
        }

        .nd-title {
            margin-top: 100px;
        }

        .nd-tm-left, .nd-tm-right {
            width: 50%;
            text-align: left;
        }

        .nd-logo {
            height: 44px;
            width: 224px;
            margin-top: 10px;
        }

        .nd-top-main {
            display: flex;
            flex-wrap: nowrap;
            width: 900px;
            margin: 0px auto;
            font-family: "SC-Bold";
            color: #ffffff;
        }

        .nd-top {
            background: url("../../assets/img/background/banner@3x.png");
            background-size: 100% 100%;
            height: 325px;
            width: 100%;
            min-width: 1200px;
            position: relative;
        }

        .nd-result > div:nth-of-type(1) {
            font-size: 24px;
            line-height: 40px;
            height: 40px;
            letter-spacing: 2px;
        }

        .nd-result > div:nth-of-type(2) {
            font-size: 10px;
            line-height: 20px;
            height: 20px;
            font-family: SC-Light;
            margin-left: 3px;
        }

        .nd-result-more > div:nth-of-type(1) {
            line-height: 36px;
        }

        .nd-more-arrow > div:nth-of-type(1) {
            width: 30px;
            border-top: 1px solid #ffffff;
        }

        .nd-more-arrow > div:nth-of-type(2) {
            width: 5px;
            border-top: 1px solid #ffffff;
            transform: rotate(
                    25deg
            );
            position: absolute;
            top: -2px;
            right: 0px;
        }

    }

</style>