<template>
	<!--eslint-disable-->
	<div>
		<div class="nd-tm-right">
			<div class=" nd-menu-header">
				<div :class="currentMenu=='index'?'nd-menu-active':''"  @click="selectMenu('index')">
					首页
				</div>
			</div>
			<div class="nd-menu-header">
				<div :class="currentMenu=='observeDevice'?'nd-menu-active':''" @click="selectMenu('observeDevice')">
					观测设备
				</div>
				<div :class="currentMenu=='observationData'?'nd-menu-active':''" @click="selectMenu('observationData')">
					观测数据
				</div>
				<div :class="currentMenu==''?'nd-menu-active':''" @click="selectMenu('index')">
					观测申请
				</div>
			</div>
			<div>
				<div class="nd-menu-header">
					<div :class="currentMenu=='pictureAndAchievement'?'nd-menu-active':''" @click="selectMenu('pictureAndAchievement')">
						图库与成果
					</div>
					<div :class="currentMenu=='newsAndResource'?'nd-menu-active':''" @click="selectMenu('newsAndResource')">
						新闻与资源
					</div>
				</div>
				<div class="nd-language" @click="switchLang">
					<span :class="language == 'ch'?'nd-lang-active':''">中</span>/<span :class="language == 'en'?'nd-lang-active':''">EN</span>
				</div>
			</div>
		</div>
	</div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "Header",
	    data() {
            return {
                language: 'ch',
            }
	    },
	    props: [ 'currentMenu' ],
	    mounted() {
			console.log(this.currentMenu)
	    },
	    methods: {
            /**
             * 切换语言
             */
            switchLang() {
                this.language = this.language == 'ch' ? 'en':'ch';
            },

            /**
             * 选择菜单
             */
            selectMenu(menu) {
                this.currentMenu = menu;
                switch (menu) {
	                case 'index':
                        this.$router.push({path: '/home'})
		                break;
                    case 'newsAndResource':
                        this.$router.push({path: '/newsAndResource'})
                        break;
                    case 'observeDevice':
                        this.$router.push({path: '/observeDevice'})
                        break;
                    case 'pictureAndAchievement':
                        this.$router.push({path: '/pictureAndAchievement'})
                        break;
                    case 'observationData':
                        this.$router.push({path: '/observationData'})
                        break;
                    default:
                        this.$router.push({path: '/home'})
                        break;
                }
            },
	    }
    }
</script>

<style scoped>
	@media screen and (min-width: 768px) {
		.nd-lang-active {
			color: #fa541c;
		}
		.nd-menu-active {
			color: #fa541c;
			font-size: 16px !important;
		}
		.nd-language > span:nth-of-type(1) {
			margin-right: 5px;
		}
		.nd-language > span:nth-of-type(2) {
			margin-left: 5px;
		}

		.nd-language {
			border-top: 1pt solid #8c8c8c;
			font-size: 15px;
			line-height: 40px;
			width: 120px;
			text-align: left;
			margin-left: 50px;
		}

		.nd-menu-header {
			margin-left: 50px;
		}

		.nd-menu-header > div {
			font-size: 15px;
			line-height: 40px;
			width: 120px;
			text-align: left;
		}

		.nd-menu-header > div:hover {
			color: #fa541c;
			font-size: 16px;
		}

		.nd-menu-header > div:nth-of-type(1) {
			border-top: 2px solid #ffffff;
		}

		.nd-menu-header > div:nth-of-type(n+2) {
			border-top: 1pt solid #8c8c8c;
		}

		.nd-tm-right {
			display: flex;
			flex-wrap: nowrap;
			padding-top: 20px;
			font-family: SC-Light;
		}
	}
</style>