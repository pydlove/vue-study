<template>
    <!--eslint-disable-->
    <div class="nd-wehost">
        <div class="nd-policy" v-if="language == 'zh'">
            <div v-html="policy.chContent"></div>

        </div>
        <div class="nd-policy" v-else-if="language == 'en'">
            <div v-html="policy.enContent"></div>
        </div>
    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "useRule",
        data() {
            return {
                language: "",
                policy: {
                    chContent: "",
                    enContent: "",
                },
            }
        },
        mounted() {
            this.initLanguage();
            this.searchData();
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
            },

            async searchData() {
                let params = new FormData();
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_nd_onset_policy, params, "POST");
                if (data.code == 200) {
                    this.policy = data.data;
                    return true;
                }
            },
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    /*@media screen and (min-width: 768px) {*/
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
    /*}*/
</style>