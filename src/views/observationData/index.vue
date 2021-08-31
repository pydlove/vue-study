<template>
	<!--eslint-disable-->
	<div class="nd-container">
		<NormalHeader :currentMenu="'observationData'"></NormalHeader>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
			<el-breadcrumb-item :to="{ path: '/home' }">
				<i class="el-icon-s-home"></i>首页
			</el-breadcrumb-item>
			<el-breadcrumb-item>观测数据</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="nd-background">
			<div class="nd-content dffn">
				<div class="aiocloud-card">
					<div :class="(type==item.type?'nd-eq-active':'') + ' nd-eq-item'"
					     v-for="(item, index) in menus" :key="index"
					     @click="selectEq(item)"
					>{{ item.name }}</div>
				</div>

				<div class="aiocloud-card">
					<QuickView v-if="type==0"></QuickView>
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
    import QuickView from "@/views/observationData/quickView.vue";

    export default {
        name: "index",
        components: {
            NormalHeader,
	        Footer,
            QuickView
        },
	    data() {
            return {
                menus: [
                    {
                        name: "快速浏览",
                        type: "0",
                    },
                    {
                        name: "数据查询",
                        type: "1",
                    },
                    {
                        name: "最新数据",
                        type: "2",
                    },
                    {
                        name: "数据使用规则",
                        type: "3",
                    },
                    {
                        name: "友情链接",
                        type: "4",
                    }
                ],
                menu: {
                    name: "快速浏览",
                    type: "0",
                },
                type: "0",
            }
	    },
	    mounted() {

	    },
	    methods: {
            selectEq(item) {
                this.type = item.type;
                this.menu = item;
                this.initDataList();
            },
	    }
    }
</script>

<style scoped>

	/*媒体查询（电脑）*/
	@media screen and (min-width: 768px) {
		.nd-content > div:nth-of-type(1) {
			width: 200px;
			min-width: 200px;
			height: 300px;
			margin-right: 20px;
		}

		.nd-content > div:nth-of-type(2) {
			width: calc(100% - 220px);
			display: flex;
			flex-wrap: wrap;
			background: #ffffff;
		}
	}
</style>