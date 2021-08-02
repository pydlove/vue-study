<template>
	<!--eslint-disable-->
	<div class="nd-container" :style="scaleFun">
		<div class="nd-top">
			<!--资讯-->
			<div class="nd-zx-box">
				<div class="nd-zx-main">
					<div class="nd-left">
						<div class="nd-left-title">

						</div>

						<div class="nd-zx-bg">
							<div class="nd-zb-bottom">

							</div>
						</div>
					</div>

					<div class="nd-right">
						<div class="nd-right-title">

						</div>

						<div class="nd-news">

						</div>

						<div class="nd-news-bg"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="nd-next1"></div>
		<div class="nd-next2"></div>
		<div class="nd-introduction">

		</div>

		<div class="nd-fl">

		</div>

		<div class="nd-footer">

		</div>

	</div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "index",
	    data() {
            return {
                scale:0.5,
            }
	    },
	    mounted() {

	    },
	    methods: {
            scaleFun:function () {
                var scale = this.scale;
                return `transform:scale(${scale})`
            }
	    }
    }
</script>

<style scoped>

	.nd-zx-title {
		size: 30px;
		color: white;
		margin-top: 20px;

	}
	.nd-top {
		background: url("../../assets/img/background/banner@3x.png");
		background-size: 100% 100%;
		height: 325px;
		width: 100%;
		position: relative;
	}
	.nd-zx-box {
		width: 100%;
		height: 500px;
		position: absolute;
		top: 285px;
		left: 0px;
	}
	.nd-zx-main {
		width: 900px;
		height: 100%;
		margin: 0px auto;
		display: flex;
		flex-wrap: nowrap;
	}
	.nd-next1 {
		background: #181617;
		height: 80px;
		width: 100%;
	}
	.nd-next2 {
		background: #252022;
		height: 380px;
		width: 100%;
	}
	.nd-left,.nd-right {
		width: 50%;
	}
	.nd-left-title {
		width: 100%;
		height: 120px;
		background: #252022;
		display: flex;
		flex-wrap: nowrap;
	}
	.nd-right-title {
		height: 80px;
		width: 100%;
		margin-top: 40px;
	}
	.nd-zx-bg {
		background: url("../../assets/img/background/zx.png");
		background-size: 100% 100%;
		height: 337.5px;
		width: 100%;
		position: relative;
	}
	.nd-zb-bottom {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 75px;
		background: #2520228a;
	}
	.nd-news {
		width: 398px;
		height: 139px;
		border: 2px solid #ffffff;
		margin: 30px;
	}
	.nd-news-bg {
		background: url("../../assets/img/background/news.png");
		background-size: 100% 100%;
		height: 143px;
		width: 398px;
		margin-left: 30px;
	}
	.nd-introduction {
		background: #181617;
		height: 114px;
		width: 100%;
	}
	.nd-fl {
		background: #252022;
		height: 348px;
		width: 100%;
	}
	.nd-footer {
		background: #181617;
		height: 262px;
		width: 100%;
	}

	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {

	}

	/*媒体查询（手机）*/
	@media screen and (max-width: 768px) {

	}
</style>