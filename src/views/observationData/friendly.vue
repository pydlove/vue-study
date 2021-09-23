<template>
    <!--eslint-disable-->
    <div class="friendlyTitle">
            <div class="firstConnect">
                <div class="connectName">虚拟太阳天文台（vso）：</div>
                <div class="connectStyle" @click="jumpWeb1">https://umbra.nascom.nasa.gov/vso/</div>
            </div>
            <div class="SecondConnect">
                <div class="connectName">Joint Science Operations Center (JSOC)：</div>
                <div class="connectStyle" @click="jumpWeb2">http://jsoc.stanford.edu/</div>
            </div>
            <div class="ThreeConnect">
                <div class="connectName">太阳动力学天文台：</div>
                <div class="connectStyle" @click="jumpWeb3">https://sdo.gsfc.nasa.gov/</div>
            </div>
            <div class="ThreeConnect">
                <div class="connectName"> 抚仙湖观测站：</div>
                <div class="connectStyle" @click="jumpWeb4">http://fso.ynao.ac.cn/</div>
            </div>
        <div class="ThreeConnect">
            <div class="connectName"> BBSO地面天文台：</div>
            <div class="connectStyle" @click="jumpWeb5">http://www.bbso.njit.edu/</div>
        </div>
        <div class="ThreeConnect">
            <div class="connectName">Hinode/EIS：</div>
            <div class="connectStyle" @click="jumpWeb6">http://solarb.mssl.ucl.ac.uk/SolarB/</div>
        </div>
        <div class="ForeConnect">
            <div class="connectName">IRIS：</div>
            <div class="connectStyle" @click="jumpWeb7">https://iris.gsfc.nasa.gov/</div>
        </div>

    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "friendly",
        methods: {
            jumpWeb1() {
                window.open("https://umbra.nascom.nasa.gov/vso/")
            },
            jumpWeb2() {
                window.open("http://jsoc.stanford.edu/")
            },
            jumpWeb3() {
                window.open("https://sdo.gsfc.nasa.gov/")
            },
            jumpWeb4() {
                window.open("http://fso.ynao.ac.cn/")
            },
            jumpWeb5() {
                window.open("http://www.bbso.njit.edu/")
            },
            jumpWeb6() {
                window.open("http://solarb.mssl.ucl.ac.uk/SolarB/")
            },
            jumpWeb7() {
                window.open("https://iris.gsfc.nasa.gov/")
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
            font-size: 16px;
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