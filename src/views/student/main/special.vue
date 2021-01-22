<template>
	<!--eslint-disable-->
	<div class="wrap">
		<div class="yanhua1"> </div>
		<div class="yanhua2"> </div>
		<div class="yanhua3"> </div>
		<div class="land"> <img src="./images/land.png"> </div>
		<div class="ren1"> <img src="./images/ren2.png"> </div>
		<div class="ren2"> <img src="./images/ren1.png"> </div>
		<div class="ren3"> <img src="./images/ren3.png"> </div>
		<div class="ren4"> <img src="./images/ren4.png"> </div>
		<!--  <div class="zhounian"> <img src="./images/peace.png"> </div> -->
		<div class="zhounian2"> <img src="./images/70.png"> </div>
	</div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "special",
        mounted() {
        },
        methods: {

        }
    }
</script>

<style scoped>
	* { margin: 0; padding: 0; }
	html, body { height: 100%; }
	body { font-family: "microsoft yahei"; }
	img { display: block; }
	.wrap { height: 630px; width: 640px; margin: 0 auto; background: #c03430; position: relative; animation: opc 1s ease-in 1s backwards; -webkit-animation: opc 1s ease-in 1s backwards; overflow: hidden }
	.yanhua1 { border-radius: 50%; position: absolute; width: 150px; height: 150px; background: linear-gradient(rgba(115,197,251,1), rgba(115,197,251,1)), url(./images/hua1.png) no-repeat center center; background: -webkit-linear-gradient(rgba(115,197,251,1), rgba(115,197,251,1)), url(./images/hua1.png) no-repeat center center; background-size: 100% 100%, 100% 100%; top: 121px; left: 45px; z-index: 1; animation: yanhua 1s ease-out infinite 8s backwards, yanse1 1s ease-out infinite 8s backwards, touming 1s ease-out infinite 8s backwards; -webkit-animation: yanhua 1s ease-out infinite 8s backwards, yanse1 1s ease-out infinite 8s backwards, touming 1s ease-out infinite 8s backwards; box-shadow: 0 0 20px rgba(115,197,251,1); }

	.yanhua2 { border-radius: 50%; position: absolute; width: 230px; height: 230px; background: linear-gradient(rgba(245,231,210,1), rgba(245,231,210,1)), url(./images/hua2.png) no-repeat center center; background: -webkit-linear-gradient(rgba(245,231,210,1), rgba(245,231,210,1)), url(./images/hua2.png) no-repeat center center; background-size: 100% 100%, 100% 100%; top: 37px; left: 277px; z-index: 2; animation: yanhua 1s ease-out infinite 9s backwards, yanse2 1s ease-out infinite backwards 9s, touming 1s ease-out infinite 9s backwards; -webkit-animation: yanhua 1s ease-out infinite 9s backwards, yanse2 1s ease-out infinite backwards 9s, touming 1s ease-out infinite 9s backwards; box-shadow: 0 0 20px rgba(245,231,210,1); }

	.yanhua3 { border-radius: 50%; position: absolute; width: 150px; height: 150px; background: linear-gradient(rgba(154,134,255,1), rgba(154,134,255,1)), url(./images/hua3.png) no-repeat center center; background: -webkit-linear-gradient(rgba(154,134,255,1), rgba(154,134,255,1)), url(./images/hua3.png) no-repeat center center; background-size: 100% 100%, 100% 100%; top:  -28px; left: 44px; z-index: 3; animation: yanhua 1s ease-out infinite 8.5s backwards, yanse3 1s ease-out infinite backwards 8.5s, touming 1s ease-out infinite 8.5s backwards; -webkit-animation: yanhua 1s ease-out infinite 8.5s backwards, yanse3 1s ease-out infinite backwards 8.5s, touming 1s ease-out infinite 8.5s backwards; }
	.land { position: absolute; bottom: 0; left: 0; width: 640px; z-index: 9 }
	.land img { width: 100% }
	.ren1 { width: 184px; height: 235px; left: 48px; bottom: 140px; position: absolute; z-index: 20; animation: opc 1s linear 1s backwards; -webkit-animation: opc 1s linear 4s backwards; }
	.ren1 img { width: 100%; height: 100% }
	.ren2 { width: 136px; height: 200px; left: 212px; bottom: 140px; position: absolute; z-index: 20; animation: opc 1s linear 1.5s backwards; -webkit-animation: opc 1s linear 7.5s backwards; }
	.ren2 img { width: 100%; height: 100% }
	.ren3 { width: 97px; height: 114px; left: 332px; bottom: 140px; position: absolute; z-index: 20; animation: opc 1s linear 2s backwards; -webkit-animation: opc 1s linear 6s backwards; }
	.ren3 img { width: 100%; height: 100% }
	.ren4 { width: 173px; height: 225px; left: 406px; bottom: 140px; position: absolute; z-index: 20; animation: opc 1s linear 2s backwards; -webkit-animation: opc 1s linear 5s backwards; }
	.ren4 img { width: 100%; height: 100% }
	.zhounian { position: absolute; width: 221px; height: 199px; margin: auto; left: 0; right: 0; top: 250px; z-index: 99; animation: topopc 1.5s linear 12s backwards; -webkit-animation: topopc 1.5s linear 12s backwards; }
	.zhounian2 { position: absolute;
		width: 406px;
		height: 59px;
		margin: auto;
		left: -205px;
		top: -439px;
		right: 0;
		bottom: 100px;
		z-index: 99;
		animation: opc 1.5s ease-in 9s backwards;
		-webkit-animation: opc 1.5s ease-in 9s backwards;
	}
	@keyframes yanhua {  0% {
		transform:translateY(300%) scale(0.05)
	}
		50% {
			transform:translateY(0%) scale(0.05)
		}
		100% {
			transform:translateY(0%) scale(1)
		}
	}
	@-webkit-keyframes yanhua {  0% {
		-webkit-transform: translateY(300%) scale(0.05)
	}
		50% {
			-webkit-transform:translateY(0%) scale(0.05)
		}
		100% {
			-webkit-transform:translateY(0%) scale(1)
		}
	}
	@keyframes yanse1 {  0% {
		background: linear-gradient(rgba(115,197,251,1), rgba(115,197,251,1)), url(./images/hua1.png) no-repeat center center;
		box-shadow:0 0 20px rgba(115,197,251,1);
	}
		49% {
			background: linear-gradient(rgba(115,197,251,1), rgba(115,197,251,1)), url(./images/hua1.png) no-repeat center center;
			box-shadow:0 0 20px rgba(115,197,251,1);
		}
		50% {
			background: linear-gradient(rgba(115,197,251,0), rgba(115,197,251,0)), url(./images/hua1.png) no-repeat center center;
			box-shadow:0 0 20px rgba(115,197,251,0);
		}
		100% {
			background: linear-gradient(rgba(115,197,251,0), rgba(115,197,251,0)), url(./images/hua1.png) no-repeat center center;
			box-shadow:0 0 20px rgba(115,197,251,0);
		}
	}
	@-webkit-keyframes yanse1 {  0% {
		background:-webkit-linear-gradient(rgba(115,197,251,1), rgba(115,197,251,1)), url(./images/hua1.png) no-repeat center center;
		box-shadow:0 0 20px rgba(115,197,251,1);
	}
		49% {
			background:-webkit-linear-gradient(rgba(115,197,251,1), rgba(115,197,251,1)), url(./images/hua1.png) no-repeat center center;
			box-shadow:0 0 20px rgba(115,197,251,1);
		}
		50% {
			background:-webkit-linear-gradient(rgba(115,197,251,0), rgba(115,197,251,0)), url(./images/hua1.png) no-repeat center center;
			box-shadow:0 0 20px rgba(115,197,251,0);
		}
		100% {
			background: -webkit-linear-gradient(rgba(115,197,251,0), rgba(115,197,251,0)), url(./images/hua1.png) no-repeat center center;
			box-shadow:0 0 20px rgba(115,197,251,0);
		}
	}
	@keyframes yanse2 {  0% {
		background: linear-gradient(rgba(245,231,210,1), rgba(245,231,210,1)), url(./images/hua2.png) no-repeat center center;
		box-shadow:0 0 20px rgba(245,231,210,1);
	}
		49% {
			background: linear-gradient(rgba(245,231,210,1), rgba(245,231,210,1)), url(./images/hua2.png) no-repeat center center;
			box-shadow:0 0 20px rgba(245,231,210,1);
		}
		50% {
			background: linear-gradient(rgba(245,231,210,0), rgba(245,231,210,0)), url(./images/hua2.png) no-repeat center center;
			box-shadow:0 0 20px rgba(245,231,210,0);
		}
		100% {
			background: linear-gradient(rgba(245,231,210,0), rgba(245,231,210,0)), url(./images/hua2.png) no-repeat center center;
			box-shadow:0 0 20px rgba(245,231,210,0);
		}
	}
	@-webkit-keyframes yanse2 {  0% {
		background:-webkit-linear-gradient(rgba(245,231,210,1), rgba(245,231,210,1)), url(./images/hua2.png) no-repeat center center;
		box-shadow:0 0 20px rgba(115,197,251,1);
	}
		49% {
			background:-webkit-linear-gradient(rgba(245,231,210,1), rgba(245,231,210,1)), url(./images/hua2.png) no-repeat center center;
			box-shadow:0 0 20px rgba(245,231,210,1);
		}
		50% {
			background:-webkit-linear-gradient(rgba(245,231,210,0), rgba(245,231,210,0)), url(./images/hua2.png) no-repeat center center;
			box-shadow:0 0 20px rgba(245,231,210,0);
		}
		100% {
			background: -webkit-linear-gradient(rgba(245,231,210,0), rgba(245,231,210,0)), url(./images/hua2.png) no-repeat center center;
			box-shadow:0 0 20px rgba(245,231,210,0);
		}
	}
	@keyframes yanse3 {  0% {
		background: linear-gradient(rgba(154,134,255,1), rgba(154,134,255,1)), url(./images/hua3.png) no-repeat center center;
		box-shadow:0 0 20px rgba(154,134,255,1);
	}
		49% {
			background: linear-gradient(rgba(154,134,255,1), rgba(154,134,255,1)), url(./images/hua3.png) no-repeat center center;
			box-shadow:0 0 20px rgba(154,134,255,1);
		}
		50% {
			background: linear-gradient(rgba(154,134,255,0), rgba(154,134,255,0)), url(./images/hua3.png) no-repeat center center;
			box-shadow:0 0 20px rgba(154,134,255,0);
		}
		100% {
			background: linear-gradient(rgba(154,134,255,0), rgba(154,134,255,0)), url(./images/hua3.png) no-repeat center center;
			box-shadow:0 0 20px rgba(154,134,255,0);
		}
	}
	@-webkit-keyframes yanse3 {  0% {
		background:-webkit-linear-gradient(rgba(154,134,255,1), rgba(154,134,255,1)), url(./images/hua3.png) no-repeat center center;
		box-shadow:0 0 20px rgba(154,134,255,1);
	}
		49% {
			background:-webkit-linear-gradient(rgba(154,134,255,1), rgba(154,134,255,1)), url(./images/hua3.png) no-repeat center center;
			box-shadow:0 0 20px rgba(154,134,255,1);
		}
		50% {
			background:-webkit-linear-gradient(rgba(154,134,255,0), rgba(154,134,255,0)), url(./images/hua3.png) no-repeat center center;
			box-shadow:0 0 20px rgba(154,134,255,0);
		}
		100% {
			background: -webkit-linear-gradient(rgba(154,134,255,0), rgba(154,134,255,0)), url(./images/hua3.png) no-repeat center center;
			box-shadow:0 0 20px rgba(154,134,255,0);
		}
	}
	@keyframes touming {  0% {
		opacity:1
	}
		85% {
			opacity:1
		}
		100% {
			opacity:0
		}
	}
	@-webkit-keyframes touming {  0% {
		opacity:1
	}
		85% {
			opacity:1
		}
		100% {
			opacity:0
		}
	}
	@keyframes opc {  from {
		opacity:0
	}
		to { opacity: 1 }
	}
	@-webkit-keyframes opc {  from {
		opacity:0
	}
		to { opacity: 1 }
	}
	@keyframes topopc {  from {
		opacity:0;
		transform:translateY(30%)
	}
		to { opacity: 1; transform: translateY(0) }
	}
	@-webkit-keyframes topopc {  from {
		opacity:0;
		-webkit-transform:translateY(30%)
	}
		to { opacity: 1; -webkit-transform: translateY(0) }
	}

	body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,p,blockquote,th,td{margin:0;padding:0;}
	a:link,a:visited{text-decoration: none;}
	a img{border: 0;}
	ul li{list-style: none;}
	input:focus{outline: none;}
	/*兼容性解决 安卓原生浏览器在加了bg后才渲染为block*/
	/* 清理浮动 */
	.f-clear:after {visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;}
	.f-clear {zoom:1;}/* for IE6 IE7 */
	body{margin: 0;padding: 0;font-family:"微软雅黑";background: #F1F5F8;}
	.wrapper{width: 640px; background: #F1F5F8;  margin:0 auto;}
	.clear{clear: both}
	@keyframes shandong{
		0%{ opacity:0}
		20%{ opacity:1}
		40%{ opacity:0}
		60%{ opacity:1}
		100%{ opacity:1}

	}
	@-webkit-keyframes shandong{
		0%{ opacity:0}
		20%{ opacity:1}
		40%{ opacity:0}
		60%{ opacity:1}
		100%{ opacity:1}

	}

</style>