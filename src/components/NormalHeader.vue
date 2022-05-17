<template>
	<!--eslint-disable-->
	<div>
		<div class="nd-top-normal-main">
			<div class="nd-tm-normal">
				<div class="nd-normal-logo-box">
					<van-image class="nd-normal-logo cursor" @click="toHome" :src="require('@/assets/img/logo/logo-nd.png')"/>
				</div>
				<Header ref="headerRef" :currentMenu="currentMenu"
				        @reloadApplications="reloadApplications"
				        @initLanguage="initLanguage"
				></Header>
			</div>
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Header from "@/components/Header.vue";

    export default {
        name: "NormalHeader",
	    components: { Header },
	    props: [
	        'currentMenu'
	    ],
	    methods: {
            toLogin() {
				this.$refs.headerRef.toLogin();
            },

            reloadApplications() {
                this.$emit("reloadApplications");
            },

            initLanguage() {
                this.$emit("initLanguage");
            },

            toHome() {
                this.$router.push({
                    path: "/home",
                });
            }
	    }
    }
</script>

<style scoped>
</style>