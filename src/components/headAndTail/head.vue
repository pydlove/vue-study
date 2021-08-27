<template>
    <!--eslint-disable-->
    <div class="nd-container" :style="scaleFun">
        <div class="nd-top">
            <div class="nd-top-main">
                <div class="nd-tm-left">
                    <van-image class="nd-logo" :src="require('@/assets/img/logo/logo@2x.png')"/>
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
                            图库与成果
                        </div>
                        <div class="nd-menu-header3">
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
            background: #181617;
        }

        .nd-top {
            background: #181617;
            background-size: 100% 100%;
            height: 180px;
            width: 100%;
            min-width: 1200px;
            position: relative;
        }

    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {
        .nd-top {
            background: #181617;
            background-size: 100% 100%;
            height: 150px;
            width: 100%;
        }

        .nd-top-main {
            width: 100%;
            height: 150px;
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-tm-left {
            width: 150px;
            height: 30px;
            margin-top: 10px;
            margin-left: 10px;
        }

        .nd-tm-right {
            width: 200px;
            margin-left: 5px;
            height: 120px;
            margin-top: 10px;
            display: flex;
            flex-wrap: nowrap;
        }

        .nd-menu-header1 {
            border-top: 2px solid #ffffff;
            font-size: 1px;
            line-height: 30px;
            width: 60px;
            color: #bfbfbf;;
        }

        .nd-menu-header2 {
            border-top: 2px solid #ffffff;
            font-size: 1px;
            margin-left: 10px;
            line-height: 30px;
            width: 60px;
            color: #bfbfbf;
        }

        .nd-menu-header3 {
            border-top: 2px solid #f5f5f5;
            font-size: 1px;
            margin-left: 10px;
            line-height: 30px;
            width: 60px;
            color: #bfbfbf;
        }
    }
</style>