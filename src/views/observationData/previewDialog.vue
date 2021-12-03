<template>
    <!--eslint-disable-->
    <div>
        <el-dialog
                class="aiocw-dialog"
                :title="$t('el.title.preview')"
                v-loading="loading"
                :element-loading-text="$t('loading.preview')"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                center
        >
            <div>
                <el-image
                        :src="imageUrl"
                        fit="fit"
                        :preview-src-list="[imageUrl]"
                >
                    <div slot="placeholder" class="image-slot">
                        loading<span class="dot">...</span>
                    </div>
                </el-image>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">{{ $t('menu.cancel') }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<!--eslint-disable-->
<script>
    export default {
        name: "previewDialog",
        mounted() {
            this.baseUrl = this.$aiocUrl.baseUrl;
        },
        data() {
            return {
                loading: false,
                dialogVisible: false,
                imageUrl: "",
                imageArr: [],
                obsData: [],
                clientWidth: document.body.clientWidth - 50,
                clientHeight: document.body.clientHeight,
                timer:"",
            }
        },
        methods: {
            open(row) {
                this.dialogVisible = true;
                this.loading = true;
                this.obsData = row;
                this.preview();
            },
            close() {
                this.dialogVisible = false;
                this.imageUrl= "";
                this.imageArr= [];
                this.loading= false;
            },
            async preview() {
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_data_preview, this.obsData, "POST");
                if (data.code == 200) {
                    let _this = this;
                    this.loading = false;
                    //清除定时器
                    clearTimeout(this.timer);
                    //设置一次性定时器
                    _this.timer = setTimeout(function(){
                        _this.imageUrl = data.data;
                        _this.imageArr.push(_this.imageUrl);
                    }, 1000);
                }
            },
        },

    }
</script>

<style scoped>
</style>