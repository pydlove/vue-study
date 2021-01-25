<template>
	<!--eslint-disable-->
	<div class="wrap spc_container">
		<div v-show="isShow" class="yanhua1"> </div>
		<div v-show="isShow" class="yanhua2"> </div>
		<div v-show="isShow" class="yanhua3"> </div>
		<img class="trans_fade_image" :src="img" alt="" style="width: 680px; height: 260px;z-index: 999">
	</div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "special1",
        mounted() {
            this.judgeBrowser();
        },
        methods: {
            judgeBrowser() {
                var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
                console.log(userAgent)
                var isOpera = userAgent.indexOf("Opera") > -1;
                //判断是否Opera浏览器
                if (isOpera) {
                    console.log(1)
                    this.isShow = false;
                };
                //判断是否Firefox浏览器
                if (userAgent.indexOf("Firefox") > -1) {
                    console.log(2)
                    this.isShow = true;
                }
                //判断是否chorme浏览器
                if (userAgent.indexOf("Chrome") > -1){
                    console.log(3)
                    this.isShow = true;
                }
                //判断是否Edge浏览器
                if (userAgent.indexOf("Trident") > -1) {
                    console.log(5)
                    this.isShow = false;
                };
                console.log(this.isShow)
            },
        },
        data() {
            return {
                isShow: false,
                img: require("@/assets/img/bg/texiao5.png"),
            }
        }
    }
</script>

<style scoped>
	.wrap {
		height: 800px;
		width: 800px;
		margin: 0 auto;
		position: relative;
		animation: opc 1s ease-in 1s backwards;
		-webkit-animation: opc 1s ease-in 1s backwards;
		overflow: hidden;
	}

	.yanhua1 {
		border-radius: 50%;
		position: absolute;
		width: 150px;
		height: 150px;
		background: linear-gradient(rgba(115, 197, 251, 1), rgba(115, 197, 251, 1)), url(./images/hua1.png) no-repeat center center;
		background: -webkit-linear-gradient(rgba(115, 197, 251, 1), rgba(115, 197, 251, 1)), url(./images/hua1.png) no-repeat center center;
		background-size: 100% 100%, 100% 100%;
		top: 121px;
		left: 30px;
		z-index: 3001;
		animation: yanhua 1s ease-out infinite 8s backwards, yanse1 1s ease-out infinite 8s backwards, touming 1s ease-out infinite 8s backwards;
		-webkit-animation: yanhua 1s ease-out infinite 8s backwards, yanse1 1s ease-out infinite 8s backwards, touming 1s ease-out infinite 8s backwards;
		box-shadow: 0 0 20px rgba(115, 197, 251, 1);
	}

	.yanhua2 {
		border-radius: 50%;
		position: absolute;
		width: 230px;
		height: 230px;
		background: linear-gradient(rgba(245, 231, 210, 1), rgba(245, 231, 210, 1)), url(./images/hua2.png) no-repeat center center;
		background: -webkit-linear-gradient(rgba(245, 231, 210, 1), rgba(245, 231, 210, 1)), url(./images/hua2.png) no-repeat center center;
		background-size: 100% 100%, 100% 100%;
		top: 37px;
		left: 450px;
		z-index: 3001 !important;
		animation: yanhua 1s ease-out infinite 6s backwards, yanse2 1s ease-out infinite backwards 6s, touming 1s ease-out infinite 6s backwards;
		-webkit-animation: yanhua 1s ease-out infinite 6s backwards, yanse2 1s ease-out infinite backwards 6s, touming 1s ease-out infinite 6s backwards;
		box-shadow: 0 0 20px rgba(245, 231, 210, 1);
	}

	.yanhua3 {
		border-radius: 50%;
		position: absolute;
		width: 150px;
		height: 150px;
		background: linear-gradient(rgba(154, 134, 255, 1), rgba(154, 134, 255, 1)), url(./images/hua3.png) no-repeat center center;
		background: -webkit-linear-gradient(rgba(154, 134, 255, 1), rgba(154, 134, 255, 1)), url(./images/hua3.png) no-repeat center center;
		background-size: 100% 100%, 100% 100%;
		top: -28px;
		left: 44px;
		z-index: 3001;
		animation: yanhua 1s ease-out infinite 3 backwards, yanse3 1s ease-out infinite backwards 3s, touming 1s ease-out infinite 3s backwards;
		-webkit-animation: yanhua 1s ease-out infinite 3s backwards, yanse3 1s ease-out infinite backwards 3s, touming 1s ease-out infinite 3s backwards;
	}

	@-webkit-keyframes fadeInOut {
		0% {
			transform: scale(1);
		}
		10% {
			transform: scale(1.01);
		}
		20% {
			transform: scale(1.02);
		}
		30% {
			transform: scale(1.03);
		}
		40% {
			transform: scale(1.04);
		}
		50% {
			transform: scale(1.05);
		}
		60% {
			transform: scale(1.04);
		}
		70% {
			transform: scale(1.03);
		}
		80% {
			transform: scale(1.02);
		}
		90% {
			transform: scale(1.01);
		}
		100% {
			transform: scale(1);
		}
	}

	.trans_fade_image {
		-webkit-animation-name: fadeInOut;
		-webkit-animation-timing-function: ease-in-out;
		-webkit-animation-iteration-count: infinite;
		-webkit-animation-duration: 2s;
		border-radius: 10px;
		position: absolute;
		top: 20px;
		left: 20px;
	}

	@keyframes yanhua {
		0% {
			transform: translateY(300%) scale(0.05)
		}
		50% {
			transform: translateY(0%) scale(0.05)
		}
		100% {
			transform: translateY(0%) scale(1)
		}
	}

	@-webkit-keyframes yanhua {
		0% {
			-webkit-transform: translateY(300%) scale(0.05)
		}
		50% {
			-webkit-transform: translateY(0%) scale(0.05)
		}
		100% {
			-webkit-transform: translateY(0%) scale(1)
		}
	}

	@keyframes yanse1 {
		0% {
			background: linear-gradient(rgba(115, 197, 251, 1), rgba(115, 197, 251, 1)), url(./images/hua1.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(115, 197, 251, 1);
		}
		49% {
			background: linear-gradient(rgba(115, 197, 251, 1), rgba(115, 197, 251, 1)), url(./images/hua1.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(115, 197, 251, 1);
		}
		50% {
			background: linear-gradient(rgba(115, 197, 251, 0), rgba(115, 197, 251, 0)), url(./images/hua1.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(115, 197, 251, 0);
		}
		100% {
			background: linear-gradient(rgba(115, 197, 251, 0), rgba(115, 197, 251, 0)), url(./images/hua1.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(115, 197, 251, 0);
		}
	}

	@-webkit-keyframes yanse1 {
		0% {
			background: -webkit-linear-gradient(rgba(115, 197, 251, 1), rgba(115, 197, 251, 1)), url(./images/hua1.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(115, 197, 251, 1);
		}
		49% {
			background: -webkit-linear-gradient(rgba(115, 197, 251, 1), rgba(115, 197, 251, 1)), url(./images/hua1.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(115, 197, 251, 1);
		}
		50% {
			background: -webkit-linear-gradient(rgba(115, 197, 251, 0), rgba(115, 197, 251, 0)), url(./images/hua1.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(115, 197, 251, 0);
		}
		100% {
			background: -webkit-linear-gradient(rgba(115, 197, 251, 0), rgba(115, 197, 251, 0)), url(./images/hua1.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(115, 197, 251, 0);
		}
	}

	@keyframes yanse2 {
		0% {
			background: linear-gradient(rgba(245, 231, 210, 1), rgba(245, 231, 210, 1)), url(./images/hua2.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(245, 231, 210, 1);
		}
		49% {
			background: linear-gradient(rgba(245, 231, 210, 1), rgba(245, 231, 210, 1)), url(./images/hua2.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(245, 231, 210, 1);
		}
		50% {
			background: linear-gradient(rgba(245, 231, 210, 0), rgba(245, 231, 210, 0)), url(./images/hua2.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(245, 231, 210, 0);
		}
		100% {
			background: linear-gradient(rgba(245, 231, 210, 0), rgba(245, 231, 210, 0)), url(./images/hua2.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(245, 231, 210, 0);
		}
	}

	@-webkit-keyframes yanse2 {
		0% {
			background: -webkit-linear-gradient(rgba(245, 231, 210, 1), rgba(245, 231, 210, 1)), url(./images/hua2.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(115, 197, 251, 1);
		}
		49% {
			background: -webkit-linear-gradient(rgba(245, 231, 210, 1), rgba(245, 231, 210, 1)), url(./images/hua2.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(245, 231, 210, 1);
		}
		50% {
			background: -webkit-linear-gradient(rgba(245, 231, 210, 0), rgba(245, 231, 210, 0)), url(./images/hua2.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(245, 231, 210, 0);
		}
		100% {
			background: -webkit-linear-gradient(rgba(245, 231, 210, 0), rgba(245, 231, 210, 0)), url(./images/hua2.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(245, 231, 210, 0);
		}
	}

	@keyframes yanse3 {
		0% {
			background: linear-gradient(rgba(154, 134, 255, 1), rgba(154, 134, 255, 1)), url(./images/hua3.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(154, 134, 255, 1);
		}
		49% {
			background: linear-gradient(rgba(154, 134, 255, 1), rgba(154, 134, 255, 1)), url(./images/hua3.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(154, 134, 255, 1);
		}
		50% {
			background: linear-gradient(rgba(154, 134, 255, 0), rgba(154, 134, 255, 0)), url(./images/hua3.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(154, 134, 255, 0);
		}
		100% {
			background: linear-gradient(rgba(154, 134, 255, 0), rgba(154, 134, 255, 0)), url(./images/hua3.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(154, 134, 255, 0);
		}
	}

	@-webkit-keyframes yanse3 {
		0% {
			background: -webkit-linear-gradient(rgba(154, 134, 255, 1), rgba(154, 134, 255, 1)), url(./images/hua3.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(154, 134, 255, 1);
		}
		49% {
			background: -webkit-linear-gradient(rgba(154, 134, 255, 1), rgba(154, 134, 255, 1)), url(./images/hua3.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(154, 134, 255, 1);
		}
		50% {
			background: -webkit-linear-gradient(rgba(154, 134, 255, 0), rgba(154, 134, 255, 0)), url(./images/hua3.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(154, 134, 255, 0);
		}
		100% {
			background: -webkit-linear-gradient(rgba(154, 134, 255, 0), rgba(154, 134, 255, 0)), url(./images/hua3.png) no-repeat center center;
			box-shadow: 0 0 20px rgba(154, 134, 255, 0);
		}
	}

	@keyframes touming {
		0% {
			opacity: 1
		}
		85% {
			opacity: 1
		}
		100% {
			opacity: 0
		}
	}

	@-webkit-keyframes touming {
		0% {
			opacity: 1
		}
		85% {
			opacity: 1
		}
		100% {
			opacity: 0
		}
	}

	@keyframes opc {
		from {
			opacity: 0
		}
		to {
			opacity: 1
		}
	}

	@-webkit-keyframes opc {
		from {
			opacity: 0
		}
		to {
			opacity: 1
		}
	}

	@keyframes topopc {
		from {
			opacity: 0;
			transform: translateY(30%)
		}
		to {
			opacity: 1;
			transform: translateY(0)
		}
	}

	@-webkit-keyframes topopc {
		from {
			opacity: 0;
			-webkit-transform: translateY(30%)
		}
		to {
			opacity: 1;
			-webkit-transform: translateY(0)
		}
	}

	body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, p, blockquote, th, td {
		margin: 0;
		padding: 0;
	}

	a:link, a:visited {
		text-decoration: none;
	}

	a img {
		border: 0;
	}

	ul li {
		list-style: none;
	}

	input:focus {
		outline: none;
	}

	/*兼容性解决 安卓原生浏览器在加了bg后才渲染为block*/
	/* 清理浮动 */
	.f-clear:after {
		visibility: hidden;
		display: block;
		font-size: 0;
		content: " ";
		clear: both;
		height: 0;
	}

	.f-clear {
		zoom: 1;
	}

	/* for IE6 IE7 */
	body {
		margin: 0;
		padding: 0;
		font-family: "微软雅黑";
		background: #F1F5F8;
	}

	.wrapper {
		width: 640px;
		background: #F1F5F8;
		margin: 0 auto;
	}

	.clear {
		clear: both
	}

	@keyframes shandong {
		0% {
			opacity: 0
		}
		20% {
			opacity: 1
		}
		40% {
			opacity: 0
		}
		60% {
			opacity: 1
		}
		100% {
			opacity: 1
		}

	}

	@-webkit-keyframes shandong {
		0% {
			opacity: 0
		}
		20% {
			opacity: 1
		}
		40% {
			opacity: 0
		}
		60% {
			opacity: 1
		}
		100% {
			opacity: 1
		}

	}
</style>