<template>
	<!--eslint-disable-->
	<div class="skeleton">
		<div class="skeleton-swiper skeleton-bg"></div>
		<div class="skeleton-title-card">
			<div class="skeleton-title-text skeleton-bg"></div>
			<div class="skeleton-banner skeleton-bg"></div>
			<div class="skeleton-status skeleton-bg"></div>
		</div>

		<div class="skeleton-rule-card">
			<div class="skeleton-status-box">
				<div class="skeleton-status skeleton-bg"></div>
			</div>
			<div class="skeleton-rule skeleton-bg"></div>
			<div class="skeleton-rule skeleton-bg"></div>
			<div class="skeleton-rule skeleton-bg"></div>
		</div>

		<div class="skeleton-box1 skeleton-bg"></div>

		<div class="skeleton-box2 skeleton-bg"></div>
	</div>
</template>
<!--eslint-disable-->
<style>
	.skeleton-bg {
		list-style: none;
		background-size: 400% 100%;
		background-position: 100% 50%;
		animation: skeleton-loading 1.4s ease infinite;
		background-image: linear-gradient(90deg, #eee 25%, #dfdfdf 37%, #eee 63%);
		animation: skeleton-loading 1.4s ease infinite;
	}
	@keyframes skeleton-loading {
		0% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0 50%;
		}
	}
	.skeleton {
		position: relative;
		height: 100%;
		overflow: hidden;
		padding: 0px !important;
		box-sizing: border-box;
		background: #fff;
	}
	.skeleton-swiper {
		height: 200px;
	}

	.skeleton-title-card {
		height: 140px;
		border: 1px solid #eee;
		margin: 20px 10px 0px 10px;
		border-radius: 3px;
	}
	.skeleton-title-text {
		height: 16px;
		width: 100px;
		margin: 10px;
	}
	.skeleton-banner {
		height: 70px;
		margin: 10px;
	}
	.skeleton-status-box {
		margin-bottom: 25px;
	}
	.skeleton-status {
		height: 16px;
		line-height: 22px;
		width: 150px;
		margin: 10px auto;
	}
	.skeleton-rule {
		height: 16px;
		width: 300px;
		margin: 10px;
	}
	.skeleton-rule-card {
		height: 136px;
		border: 1px solid #eee;
		margin: 20px 10px 0px 10px;
		border-radius: 3px;
	}
	.skeleton-box1 {
		height: 40px;
		margin: 20px 10px 0px 10px;
	}
	.skeleton-box2 {
		height: 50px;
		margin-top: 10px;
	}
</style>
