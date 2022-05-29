<template>
    <!--eslint-disable-->
    <div class="nd-container">
        <NormalHeader  @initLanguage="initLanguage"></NormalHeader>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nd-breadcrumb-top">
            <el-breadcrumb-item :to="{ path: '/home' }">
                <i class="el-icon-s-home"></i>
                {{ $t('menu.home') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ $t('menu.wehostSatellite') }}
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="nd-background">
            <div class="nd-content dffn">
                <div class="aiocloud-card1" :style="hightType">
                    <div class="nd-wehost">
                        <van-empty image="search" :description="$t('message.underConstruction')"/>
                    </div>
                </div>
            </div>

        </div>

        <Footer ref="footerRef"></Footer>
    </div>
</template>
<!--eslint-disable-->
<script>
    import NormalHeader from "@/components/NormalHeader";
    import Footer from "@/components/Footer";
    export default {
        name: "index",
        components: {
            NormalHeader,
            Footer
        },
        data() {
            return {
                language: "zh",
                tableData: [],
                loading: true
            };
        },
        methods: {
            initLanguage() {
                this.language = this.$i18n.locale;
                this.$refs.footerRef.initLanguage();
            },
        }
    }
</script>

<style scoped>
    .aiocloud-card1{
        padding: 20px;
        border-radius: 5px;
        background: #ffffff;
        box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
        width: 100%;
        height: 395px;
    }

    .nd-breadcrumb-top{
        width: 900px;
    }
</style>