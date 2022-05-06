<template>
	<div>

	</div>
</template>
<!--eslint-disable-->

<script>
    export default {
        name: "dataUseRule",
        data() {
            return {
                language: "",
            }
        },
        mounted() {
            this.initLanguage();
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
            },
        }

    }
</script>

<style scoped>
	.nd-policy {
		font-size: 14px;
		line-height: 24px;
		text-align: left;
		text-indent: 28px;
	}

	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
		.useRuleTitle {
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