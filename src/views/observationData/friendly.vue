<template>
    <!--eslint-disable-->
    <div class="friendlyTitle">
        友情链接
        <div class="firstConnect">
            BBSO地面天文台：
            <div class="connectStyle" @click="jumpWeb">http://www.bbso.njit.edu/</div>
        </div>

    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "friendly",
        methods: {
            jumpWeb() {
                window.open("http://www.bbso.njit.edu/")
            },

            data() {
                return {
                    conntects:[
                        {
                            name: "BBSO地面天文台：",
                            connect: "http://www.bbso.njit.edu/"
                        }
                    ]
                }
            }
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
        .firstConnect {
            font-size: 16px;
            line-height: 20px;
            margin-top: 20px;
            display: flex;
            flex-wrap: nowrap;
        }
        .firstConnect > div:hover {
            color: #fa541c;
            font-size: 16px;
            margin-left: 10px;
        }
        .connectStyle {
            margin-left: 10px;
            font-size: 16px;
        }
    }

</style>