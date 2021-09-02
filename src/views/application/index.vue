<template>
	<!--eslint-disable-->
	<div class="nd-container">
		<NormalHeader ref="normalHeaderRef" :currentMenu="'application'" @reloadApplications="reloadApplications"></NormalHeader>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
			<el-breadcrumb-item :to="{ path: '/home' }">
				<i class="el-icon-s-home"></i>首页
			</el-breadcrumb-item>
			<el-breadcrumb-item>观测申请</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="nd-background">
			<div class="nd-content dffn">
				<div class="aiocloud-card app-content">
					<Application ref="applicationRef"></Application>
				</div>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>
<!--eslint-disable-->
<script>
    import NormalHeader from "@/components/NormalHeader";
    import Footer from "@/components/Footer";
    import Application from "@/views/application/application.vue";

    export default {
        name: "application",
        components: {
            NormalHeader,
            Footer,
            Application
        },
        data() {
            return {
            }
        },
        mounted() {
            this.getUserInfo();
        },
        methods: {
            async getUserInfo() {
                let params = new FormData();
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_login_getUser, params, "POST");
                if (data.code == 200) {
                    let res = data.data;
                    console.log(res)
                    if (!res.isLogin) {
                        this.$refs.normalHeaderRef.toLogin();
                    }
                    return true;
                }
            },

            reloadApplications() {
				this.$refs.applicationRef.search(1, 10);
            }
        }
    }
</script>

<style scoped>
	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
		.app-content {
			width: 900px;
			min-height: 400px;
		}
	}
</style>