<template>
    <!--eslint-disable-->
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="文件下载(File Downloading)"
                v-loading="loading"
                element-loading-text="数据正在下载中，请不要关闭网页"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="800px"
                center
        >
            <!-- <el-table
                     border
                     ref="table"
                     :data="multipleSelection"
                     @sort-change="sortChange"
                     @selection-change='onTableSelectChange'
                     @row-click='tableRowClick'
                     :row-style="{height:'20px'}"
                     :cell-style="{padding:'9px 1px'}">
                 <el-table-column fixed="left" type="selection" width="55" align="center"></el-table-column>
                 <el-table-column prop="fitsName" label="文件名称" :show-overflow-tooltip="true" align="center"></el-table-column>
                 <el-table-column prop="fitsUrl" label="文件地址" :show-overflow-tooltip="true" align="center"></el-table-column>
                 <el-table-column prop="csize" label="文件大小" :show-overflow-tooltip="true" align="center" sortable>
                     <template slot-scope="scope">
                         {{ fmtActivityStatus(scope.row.csize) }}
                     </template>
                 </el-table-column>
             </el-table>-->

            <div class="nd-all-data">
                <el-button type="primary" @click="downloadAll">下载全部</el-button>
            </div>

            <div class="nd-file-download" v-for="item in filesPath">
                <div class="nd-file">
                    <div class="nd-icon"></div>
                    <a class="nd-file-url"  @click="toDownload(item)">{{fakeUrl(item)}}</a>
                    <div class="nd-file-size">{{fitsSize(item)}}</div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">{{ $t('menu.camcel') }}</el-button>
              <el-button class="wdi-120 aioc-btn1" type="primary" @click="close">{{ $t('menu.sure') }}</el-button>
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
            this.filesPath = this.multipleSelection;
        },
        methods: {
            open() {
                this.dialogVisible = true;
                this.filesPath = this.multipleSelection;
                this.checkRows = null;
            },
            close() {
                this.dialogVisible = false;
            },

            fakeUrl(item) {
                let url = "http://114.212.174.143:9092/download" + "? fileName=" + item.fitsName;
                return url;
            },

        /*    //通过url 转为blob格式的数据
            getImgArrayBuffer(url) {
                let _this = this;
                return new Promise((resolve, reject) => {
                    //通过请求获取文件blob格式
                    let xmlhttp = new XMLHttpRequest();
                    console.log("url是：" + url);
                    xmlhttp.open("GET", url, true);
                    xmlhttp.responseType = "blob";
                    xmlhttp.onload = function () {
                        if (this.status == 200) {
                            resolve(this.response);
                        } else {
                            reject(this.status);
                        }
                    }
                    xmlhttp.send();
                });

            },*/

            fitsSize(item) {
                let cSize = (item.csize) / (1024 * 1024);
                cSize = parseFloat(cSize).toFixed(2);
                return cSize + "MB";
            },

            //点一条数据就去下载 参数id
            async toDownload(item) {
                this.loading = true;
                let params = new FormData();
                params.append("fitsUrls", item.fitsUrl);
                params.append("sizes", item.csize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_download, params, "POST");
                if (data.code == 200) {
                    this.download(item.fitsUrl, item.fitsName);
                    this.loading = false;
                }
            },

            async downloadAll() {
                this.size = 0;
                for (let i = 0; i < this.filesPath.length; i++) {
                    this.form.fitsUrls += this.filesPath[i].fitsUrl + ",";
                    let cSize = (this.filesPath[i].csize) / (1024 * 1024);
                    this.size = this.size + cSize;
                }
                let params = new FormData();
                params.append("fitsUrls", this.form.fitsUrls.toString());
                params.append("sizes", this.size);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_download, params, "POST");
                if (data.code == 200) {
                    this.handleDownLoad(this.filesPath);
                }
            },

            handleDownLoad(item) {
                for(let i = 0 ; i <=item.length; i++){
                    this.download(item[i].fitsUrl, item[i].fitsName);
                }
            },

            download(fitsUrl, fitsName) {
                console.log(1);
                let src = "/web-service" + fitsUrl;
                let fileNames = fitsName;
                let x = new XMLHttpRequest();
                x.open("GET", src, true);
                x.responseType = 'blob';
                x.onload = function (e) {
                    let url = window.URL.createObjectURL(x.response)
                    let a = document.createElement('a');
                    a.href = url
                    a.download = fileNames
                    a.click()
                }
                x.send();
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
                },
                filesPath: [],
                baseUrl: "",
                saveUrl: [],
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

    .nd-file[data-v-3fca0a1b] {
        margin-top: 20px;
        display: flex;
        flex-wrap: nowrap;
        text-align: center;
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