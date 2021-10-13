<template>
    <!--eslint-disable-->
    <div class="nd-wehost">
        <van-empty image="search" :description="$t('message.underConstruction')"/>
    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "useRule"
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 768px) {
        .useRuleTitle{
            font-size: 20px;
            margin: 10px;
            text-align: left;
        }
        .userule {
            margin-top: 10px;
            font-size: 14px;
            line-height: 28px;
            text-align: left;
        }
    }
</style>