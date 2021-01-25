<template>
	<!--eslint-disable-->
	<div>
		<div class="aioc-pc">
			<Header ref="headerRef" :activePage="activePage" :fontColor="fontColor = 'color-white'"
			        :bgColor="'bg-black'" :bluser="bluser"></Header>
		</div>
		<div class="aioc-container1" :style="'height:' + clientHeight + 'px;'">
			<div class="main" :style="' height:' + (clientHeight - 60) + 'px;'">
				<el-image class="logo" :src="img" fit="fill"></el-image>
				<div class="color-999">
					您的账号目前处于静默状态，不能正常访问登录，请联系客服
					<div class="color-409EFF fs-14 mt-20" @click="toKonw">
						了解安徽伯林书画研究院用户须知
					</div>
				</div>
			</div>
			<Footer></Footer>
		</div>
		<UserNotice ref="unRef"></UserNotice>
	</div>
</template>
<!--eslint-disable-->
<script>
    import Header from "@/components/Header"
    import Footer from "@/components/Footer"
    import UserNotice from "@/views/register/userNotice.vue"
    export default {
        name: "index",
        components: {Header, Footer, UserNotice},
        created() {
            // 判断用户是否登录
            this.judgeIsLogin();
        },
        mounted() {
            new this.$wow.WOW({
                live: false
            }).init();
        },
        methods: {
            async judgeIsLogin() {
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_login_judgeIsLogin, {}, "GET");
                if (data.code === 200) {
                    if (data.data.isLogin == "login") {
                        this.bluser = data.data.bluser;
                        if(this.bluser.status == "2") {
                            this.$router.push({
                                name: 'firstLogin'
                            });
                        } else if (this.bluser.status == "0") {
                            // this.$router.push({
                            //     name: 'main'
                            // });
                        } else if (this.bluser.status == "1") {
                            this.$router.push({
                                name: 'silent'
                            });
                        } else {
                            this.$router.push({
                                name: 'firstLogin'
                            });
                        }
                    } else {
                        this.$router.push({name: "studentLogin"});
                    }
                } else {
                    this.$router.push({name: "studentLogin"});
                }
            },

            toKonw() {
                this.$refs.unRef.open();
            },
        },
        data() {
            return {
                activePage: '首页',
                bluser: "",
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight - 100,
                img: require('@/assets/img/logo/jingmo.png'),
            }
        },
    }
</script>

<style scoped>
	.main {
		width: 1500px;
		margin: 10px auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>

<style>

</style>