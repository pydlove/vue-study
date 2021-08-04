<template>
    <!--eslint-disable-->
        <div class="nd-footer" style="position: relative">
            <div class="nd-info" style="position: absolute; margin-top: 10px">
                <div class="nd-detail">
                    <div class="nd-address" style="text-align: left; margin-top: 25px; margin-left: 150px">地址:
                        江苏省南京市栖霞区仙林大道163号天文楼
                    </div>
                    <div style="margin-top: 25px; display: flex; flex-wrap: nowrap; margin-left: 150px; position: relative">
                        电话热线: (86)- 18012012539
                    </div>
                    <div style="margin-top: 25px; display: flex; flex-wrap: nowrap; margin-left: 150px">邮编: 210023</div>
                    <div class="nd-about"
                         style="display: flex; flex-wrap: nowrap; margin-left: 150px; margin-top: 25px;">关于我们
                        <div class="nd-tail" style="margin-left: 50px">联系我们</div>
                    </div>
                </div>
                <div class="nd-tech-support"
                     style=" border-top: 1px solid #f5f5f5; margin-left: 150px; margin-top: 20px; width: 900px"></div>
                <div style="display: flex; flex-wrap: nowrap; margin-left: 150px; margin-top: 20px; position: relative">
                    技术支持: 杭州爱启云网络科技有限公司
                    <div style="margin-left: 100px"> 苏ICP备 05002851 号</div>
                    <div style="margin-left: 90px">Copyright @ 南京大学天文与空间科学学院 All Rights Reserved 版权所有</div>
                </div>
                <div class="nd-tech-support"
                     style=" border-top: 1px solid #f5f5f5; margin-left: 150px; margin-top: 20px; width: 900px"></div>
            </div>
            <van-image style="position: absolute; width: 290px; height: 55px;margin-top: 45px"
                       :src="require('@/assets/img/logo/logo@2x.png')"/>
        </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "tail"
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
            background: #181617;
            height: 260px;
            width: 100%;
            min-width: 1200px;
        }
    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {


        .nd-footer {
            position: relative;
            background: #181617;
            height: 88px;
            width: 100%;
        }

    }
</style>