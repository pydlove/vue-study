<template>
    <!--eslint-disable-->
    <div class="friendlyTitle">
            <div class="firstConnect">
                <div class="connectName">中国科学院国家天文台明安图观测基地：</div>
                <div class="connectStyle" @click="jumpWeb1">http://mos.bao.ac.cn</div>
            </div>
            <div class="SecondConnect">
                <div class="connectName">中国虚拟天文台明安图观测基地：</div>
                <div class="connectStyle" @click="jumpWeb2">https://nadc.china-vo.org/s/static/mingantu/muser.html</div>
            </div>
            <div class="ThreeConnect">
                <div class="connectName">中国科学院国家天文台怀柔观测基地：</div>
                <div class="connectStyle" @click="jumpWeb3">https://sun10.bao.ac.cn</div>
            </div>
            <div class="ThreeConnect">
                <div class="connectName">先进天基太阳天文台：</div>
                <div class="connectStyle" @click="jumpWeb4">http://aso-s.pmo.ac.cn</div>
            </div>
        <div class="ThreeConnect">
            <div class="connectName">国家空间天气监测预警中心-NSMC：</div>
            <div class="connectStyle" @click="jumpWeb5">http://www.nsmc.org.cn/nsmc/channels/spaceweather.html</div>
        </div>

    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "friendly",
        methods: {
            jumpWeb1() {
                window.open("http://mos.bao.ac.cn")
            },
            jumpWeb2() {
                window.open("https://nadc.china-vo.org/s/static/mingantu/muser.html")
            },
            jumpWeb3() {
                window.open("https://sun10.bao.ac.cn")
            },
            jumpWeb4() {
                window.open("http://aso-s.pmo.ac.cn")
            },
            jumpWeb5() {
                window.open("http://www.nsmc.org.cn/nsmc/channels/spaceweather.html")
            },

        },
    }
</script>

<style scoped>

    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {

        .friendlyTitle {
            background: white;
            text-align: left;
        }

        .connectName {
            font-size: 15px;
            color: #fa541c;
        }

        .firstConnect {
            font-size: 16px;
            line-height: 68px;
            margin-left: 10px;
            display: flex;
            flex-wrap: nowrap;
        }

        .connectStyle {
            margin-left: 10px;
            font-size: 16px;
        }

        .connectStyle:hover {
            color: #fa541c;
            font-size: 16px;
            margin-left: 10px;
        }

        .SecondConnect {
            font-size: 16px;
            line-height: 50px;
            margin-left: 10px;
            display: flex;
            flex-wrap: nowrap;
        }

        .ThreeConnect {
            font-size: 16px;
            line-height: 62px;
            margin-left: 10px;
            display: flex;
            flex-wrap: nowrap;
        }

        .ForeConnect {
            font-size: 16px;
            line-height: 50px;
            margin-left: 10px;
            display: flex;
            flex-wrap: nowrap;
            margin-bottom: 20px;
        }

    }

</style>