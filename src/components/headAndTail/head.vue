<template>
    <!--eslint-disable-->
    <div class="nd-container" :style="scaleFun">
        <div class="nd-top">
            <div class="nd-top-main">
                <div class="nd-tm-left">
                    <van-image class="nd-logo" :src="require('@/assets/img/logo/logo@2x.png')"/>
                    <div class="nd-title">
                        <div>太阳数据分析中心</div>
                        <div>Sun data analysis center</div>
                    </div>
                </div>

                <div class="nd-tm-right">
                    <div class="ml-20">
                        <div class="nd-menu-header1">
                            首页
                        </div>
                    </div>
                    <div class="ml-20">
                        <div class="nd-menu-header2">
                            观测设备
                        </div>
                        <div class="nd-menu-header3">
                            观测数据
                        </div>
                        <div class="nd-menu-header3">
                            观测申请
                        </div>
                    </div>
                    <div class="ml-20">
                        <div class="nd-menu-header2">
                            图库与成功
                        </div>
                        <div class="nd-menu-header3" onclick="newsAndResource">
                            新闻与资源
                        </div>
                        <div class="nd-menu-header3">
                            中/EN
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "head"
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

        .nd-menu-header1 {
            border-top: 2px solid #ffffff;
            font-size: 16px;
            line-height: 40px;
            width: 100px;
        }

        .nd-menu-header2 {
            border-top: 2px solid #ffffff;
            font-size: 16px;
            line-height: 40px;
            margin-left: 40px;
            width: 100px;
        }

        .nd-menu-header3 {
            border-top: 1px solid #f5f5f5;
            font-size: 16px;
            margin-left: 40px;
            line-height: 40px;
            width: 100px;
        }

        .nd-tm-right {
            display: flex;
            flex-wrap: nowrap;
            padding-top: 20px;
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
    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {
        .nd-top {
            background: url("../../assets/img/background/banner@3x.png");
            background-size: 100% 100%;
            height: 150px;
            width: 100%;
            position: relative;
        }

    }
</style>