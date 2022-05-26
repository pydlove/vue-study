<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <!--eslint-disable-->
    <div>
        <el-dialog
                class="aiocw-dialog"
                :title="$t('el.title.fileDownload')"
                v-loading="loading"
                :element-loading-text="$t('loading.download')"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="800px"
                center
        >
            <div class="nd-all-data">
                <el-button type="primary" @click="downloadAll">{{ $t('message.downloadAll') }}</el-button>
                <el-button class="ml-10" type="primary" v-clipboard:copy="content"
                           v-clipboard:success="onCopy"
                           v-clipboard:error="onError"
                >{{ $t('message.copyLink') }}</el-button>
            </div>
            <input type="file" name="filename" id="open" style="display:none"/>
            <div class="nd-file-download" v-for="(item, index) in fitTempUrls" :key="index">
                <div class="nd-file">
                    <div class="nd-icon"></div>
                    <a class="nd-file-url" @click="toDownload(item, index)">{{item}}</a>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">{{ $t('menu.close') }}</el-button>
              <!--<el-button class="wdi-120 aioc-btn1" type="primary" @click="close">{{ $t('menu.sure') }}</el-button>-->
            </span>
        </el-dialog>
    </div>

</template>
<!--eslint-disable-->
<script>
    import JSZip from 'jszip'
    import FileSaver from 'file-saver'

    export default {
        name: "download",
        mounted() {
            this.baseUrl = this.$aiocUrl.baseUrl;
        },
        methods: {
            onCopy(e){
                this.$notify({
                    title: '成功',
                    message: '复制成功',
                    type: 'success'
                });
            },
            onError(e){
                this.$notify.error({
                    title: '失败',
                    message: '复制失败',
                    type: 'success'
                });
            },

            open(multipleSelection) {
                this.dialogVisible = true;
                this.filesPath = multipleSelection;
                this.checkRows = null;
                this.initDownloadUrl();
            },

            close() {
                this.dialogVisible = false;
                this.content = "";
            },

            async initDownloadUrl() {
                let params = {
                    observationDatas: this.filesPath,
                };
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_url, params, "POST");
                if (data.code == 200) {
                    this.fitTempUrls = data.data;
                    for(var i in this.fitTempUrls) {
                        this.content = this.content + ",\r\n" + this.fitTempUrls[i];
                    }
                }
            },

            //点一条数据就去下载 参数id
            async toDownload(item, index) {
                this.recordLog(item.toString(), this.filesPath[index].fitsUrl.toString());
                let link = document.createElement("a");
                link.style.display = "none";
                let url = item;
                link.href = url;
                document.body.appendChild(link);
                link.click();
            },

            async downloadAll() {
                var datas = "";
                for(var  i in this.filesPath) {
                    datas = datas + "," + this.filesPath[i].fitsUrl.toString();
                }
                datas = datas.substring(1, datas.length);
                this.recordLog(this.fitTempUrls, datas);
                // for(var i in this.fitTempUrls) {
                //     let url = this.fitTempUrls[i];
                //     var a = document.createElement('a')
                //     var e = document.createEvent('MouseEvents')  // 创建鼠标事件对象
                //     e.initEvent('click', false, false) // 初始化事件对象
                //     a.href = url;  // 设置下载地址
                //     a.download = name // 设置下载文件名
                //     a.dispatchEvent(e) // 给指定的元素，执行事件click事件
                // }

                this.fitTempUrls.forEach(item => {
                    const iframe = document.createElement("iframe");
                    iframe.style.display = "none"; // 防止影响页面
                    iframe.style.height = 0; // 防止影响页面
                    iframe.src = item;
                    document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
                    // 5分钟之后删除
                    setTimeout(()=>{
                        iframe.remove();
                    }, 5 * 60 * 1000);
                })
            },

            async recordLog(url, data) {
                let params = new FormData();
                params.append("fitsUrls", url);
                params.append("observationDatas", data);
                await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_log, params, "POST");
            }
        },
        data() {
            return {
                loading: false,
                dialogVisible: false,
                /**
                 * 选择
                 */
                checkRowIds: [],
                checkRows: [],
                form: {
                    fitsUrls: "",
                    sizes: "",
                    savePath: "",
                },
                filesPath: [],
                baseUrl: "",
                saveUrl: [],
                queueIndex: 0,
                timer: "",
                fitTempUrls: [],
                content: "",
            }
        },
    }
</script>

<style scoped>

    .nd-icon {
        background: url("../../assets/img/background/icon.png");
        width: 20px;
        height: 20px;
        background-size: 100% 100%;
    }

    .nd-file-download {
        width: 100%;
    }

    .nd-file {
        margin-top: 20px;
        display: flex;
        flex-wrap: nowrap;
    }

    .nd-file > div:nth-of-type(2) {
        border-bottom: 2px solid #69c0ff;
    }

    .nd-file-url {
        margin-left: 3px;
        font-size: 14px;
        line-height: 21px;
    }

    .nd-file-url:hover {
        color: #fa541c;
        margin-left: 3px;
        font-size: 14px;
        line-height: 21px;
    }

    .nd-file-size {
        margin-left: 10px;
        font-size: 14px;
        line-height: 21px;
    }

</style>