<template>
	<!--eslint-disable-->
	<div class="nd-container">
		<NormalHeader :currentMenu="'observationData'" @initLanguage="initLanguage"></NormalHeader>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
			<el-breadcrumb-item :to="{ path: '/home' }">
				<i class="el-icon-s-home"></i>
				{{ $t('menu.home') }}
			</el-breadcrumb-item>
			<el-breadcrumb-item>
				{{ $t('menu.observationData') }}
			</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="nd-background">
			<div class="nd-content dffn">
				<div class="aiocloud-card">
					<div :class="(type==item.type?'nd-eq-active':'') + ' nd-eq-item'"
					     v-for="(item, index) in menus" :key="index"
					     @click="selectEq(item, index)"
					>{{ item.name }}</div>
				</div>

				<div class="aiocloud-card">
					<QuickView v-if="type==0" ref="quickViewRef"></QuickView>
					<DataSearch v-if="type == 1"></DataSearch>
					<NewView v-if="type==2"></NewView>
					<UseRule v-if="type==3"></UseRule>
					<Friendly v-if="type == 4"></Friendly>
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
    import NewView from "@/views/observationData/newView.vue";
    import UseRule from "@/views/observationData/useRule.vue";
    import Friendly from "@/views/observationData/friendly.vue";
    import DataSearch from "@/views/observationData/dataSearch.vue";


    export default {
        name: "index",
        components: {
            UseRule,
            NormalHeader,
	        Footer,
            QuickView,
			NewView,
			UseRule,
            Friendly,
            DataSearch
        },
	    data() {
            return {
                menus: [
                    {
                        name: this.$t('message.QuickView'),
                        type: "0",
                    },
                    {
                        name: this.$t('message.DataQuery'),
                        type: "1",
                    },
                    {
                        name: this.$t('message.LatestData'),
                        type: "2",
                    },
                    {
                        name: this.$t('message.DataUsageRules'),
                        type: "3",
                    },
                ],
                menu: {
                    name: this.$t('message.QuickView'),
                    type: "0",
                },
                type: "0",
            }
	    },
	    mounted() {
		    this.initLanguage();
            /*const observationDataIndex = this.$utils.getStorage("observationDataIndex");
            if(observationDataIndex != undefined) {
                this.menu = this.menus[observationDataIndex];
                this.type = this.menu.type;
            }*/
        },



	    methods: {
            initLanguage() {
                this.menus[0].name = this.$t('message.QuickView');
                this.menus[1].name = this.$t('message.DataQuery');
                this.menus[2].name = this.$t('message.LatestData');
                this.menus[3].name = this.$t('message.DataUsageRules');
                this.menus[4].name = this.$t('message.Links');

                this.$refs.quickViewRef.initLanguage();
            },

            selectEq(item, index) {
                this.type = item.type;
                this.menu = item;
                this.$utils.setStorage("observationDataIndex", index);
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