<template>
    <!--eslint-disable-->
    <div class="friendlyTitle">
        友情链接
        <div class="firstConnect">
            <div class="connectName">BBSO地面天文台：</div>
            <div class="connectStyle" @click="jumpWeb1">http://www.bbso.njit.edu/</div>
        </div>
        <div class="SecondConnect">
            <div class="connectName">Hinode/EIS Homepage：</div>
            <div class="connectStyle" @click="jumpWeb2">http://solarb.mssl.ucl.ac.uk/SolarB/</div>
        </div>
        <div class="ThreeConnect">
            <div class="connectName">Solar Dynamics Observatory：</div>
            <div class="connectStyle" @click="jumpWeb3"> https://sdo.gsfc.nasa.gov/</div>
        </div>
        <div class="ForeConnect">
            <div class="connectName"> IRIS：</div>
            <div class="connectStyle" @click="jumpWeb4">https://iris.gsfc.nasa.gov/</div>
        </div>
    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "friendly",
        methods: {
            jumpWeb1() {
                window.open("http://www.bbso.njit.edu/")
            },
            jumpWeb2() {
                window.open("http://solarb.mssl.ucl.ac.uk/SolarB/")
            },
            jumpWeb3() {
                window.open(" https://sdo.gsfc.nasa.gov/")
            },
            jumpWeb4() {
                window.open("https://iris.gsfc.nasa.gov/")
            },
        },
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {
        .friendlyTitle {
            font-size: 20px;
            margin: 10px;
            text-align: left;
        }
        .connectName {
            font-size: 16px;
            color: #fa541c;
        }
        .firstConnect {
            font-size: 16px;
            line-height: 20px;
            margin-top: 20px;
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
            line-height: 20px;
            margin-top: 20px;
            display: flex;
            flex-wrap: nowrap;
        }

        .ThreeConnect {
            font-size: 16px;
            line-height: 20px;
            margin-top: 20px;
            display: flex;
            flex-wrap: nowrap;
        }

        .ForeConnect {
            font-size: 16px;
            line-height: 20px;
            margin-top: 20px;
            display: flex;
            flex-wrap: nowrap;
        }

    }

</style>