<template>
    <!--eslint-disable-->
    <div class="nd-footer">
        <div class="nd-info">
            <div class="nd-detail">
                <div class="nd-address">
                    <div class="nd-addr">地址:  江苏省南京市栖霞区仙林大道163号天文楼</div>
                     <div class="nd-phone" >电话热线: (86)- 18012012539</div>
                     <div class="nd-mail" >邮编: 210023</div>
                     <div class="nd-about">关于我们<div class="nd-tail" style="margin-left: 50px">联系我们</div></div>
                </div>
                <div class="nd-icon">
                    <van-image style="height: 70px" :src="require('@/assets/img/logo/logo@2x.png')"/>
                </div>
                <div class="nd-over">
                    <div class="nd-tech-support"></div>
                    <div class="nd-port">
                        <div class="nd-support">技术支持: 杭州爱启云网络科技有限公司</div>
                        <div class="nd-num" > 苏ICP备 05002851 号</div>
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
            color: #eeeeee;
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

        .nd-about {
            margin-top: 25px;
            text-align: left;
            display: flex;
            flex-wrap: nowrap;
            font-size: 10px;
        }

        .nd-port {
            display: flex;
            flex-wrap: nowrap;
            margin-top: 20px;
        }

        .nd-support {
            text-align: left;
        }
        .nd-tech-support {
            border-top: 1px solid #f5f5f5;
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

        .nd-detail {
            display: flex;
            flex-wrap: wrap;
        }

        .nd-address {
            width: 200px;
            height: 80px;
            margin-left: 10px;
            color: #eeeeee;
            margin-top: 10px;
        }
        .nd-icon {
            width: 150px;
            height: 40px;
            margin-top: 10px;
        }

       .nd-addr {
           margin-top: 5px;
           font-size: 1px;
           text-align: left;
           color: #bfbfbf;
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