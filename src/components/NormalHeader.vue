<template>
	<!--eslint-disable-->
	<div>
		<div class="nd-top-normal-main">
			<div class="nd-tm-normal">
				<div class="nd-normal-logo-box">
					<van-image class="nd-normal-logo" :src="require('@/assets/img/logo/logo@2x.png')"/>
				</div>
				<Header :currentMenu="currentMenu"></Header>
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
	    ]
    }
</script>

<style scoped>
</style>