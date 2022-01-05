<template>
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
                <el-button type="primary" @click="downloadAll">{{ $t('message.downloadAll') }}</el-button>
            </div>
            <!--<el-form ref="form" :model="form" label-width="120px" style="width: 50%">-->
            <!--<el-form-item label="保存至文件夹">-->
            <!--<input type="file" id="file" hidden @change="fileChange" webkitdirectory>-->
            <!--<el-input placeholder="请输入内容" v-model="form.savePath" class="input-with-select">-->
            <!--<el-button slot="append" icon="el-icon-folder" type="success" @click="btnChange"></el-button>-->
            <!--</el-input>-->
            <!--</el-form-item>-->
            <!--</el-form>-->
            <!--<el-button type="primary" @click="openFile()" round>选择文件</el-button>
            <el-button type="primary" @click="showRealPath()" round>显示路径</el-button>-->
            <input type="file" name="filename" id="open" style="display:none"/>
            <div class="nd-file-download" v-for="item in filesPath">
                <div class="nd-file">
                    <div class="nd-icon"></div>
                    <a class="nd-file-url" @click="toDownload(item)">{{fakeUrl(item)}}</a>
                </div>
            </div>

            <!--<form id="downloadForm" action="/web-service/v1/web_download_log/download">-->
                <!--<div class="nd-file-download" v-for="item in filesPath">-->
                    <!--<input type="text" name="fitsUrls" :value="item.fitsUrl">-->
                    <!--<input type="text" name="sizes" :value="item.csize">-->
                    <!--<input type="text" name="dataType" :value="item.dataType">-->
                    <!--<input type="text" name="bucketName" :value="item.bucketName">-->

                    <!--<div class="nd-file">-->
                        <!--<div class="nd-icon"></div>-->
                        <!--<a class="nd-file-url" @click="toDownload(item)">{{fakeUrl(item)}}</a>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</form>-->

            <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">{{ $t('menu.cancel') }}</el-button>
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
                let url = "/download" + "? fileName=" + item.fitsName;
                return url;
            },

            async toMulDownload() {
                this.queueIndex = 0;
                this.loading = true;
                for (var i = 0; i < this.filesPath.length; i++ ) {
                    let item = this.filesPath[i];
                    await this.downMethod(item);
                }
                let _this = this;
                this.timer = setInterval(function () {
                    if(_this.queueIndex == _this.filesPath.length) {
                        _this.loading = false;
                        clearInterval(_this.timer);
                    }
                }, 1000);
            },

            downMethod(item) {
                // window.location.href =  this.$aiocUrl.web_service_v1_cl_observation_log_download;
                let params = new FormData();
                params.append("fitsUrls", item.fitsUrl);
                params.append("sizes", item.csize);
                params.append("dataType", item.dataType);
                params.append("bucketName", item.bucketName);
                console.log("桶是：" + item.bucketName);
                this.$axios({
                    method: 'POST',
                    url: this.$aiocUrl.web_service_v1_cl_observation_log_download,
                    data: params
                }).then(response => {
                    console.log(response);
                    // let headerContent = response.headers["content-disposition"];
                    // headerContent.substring(headerContent.indexOf("filename=") + 9, headerContent.length)
                    // 文件流
                    this.downloadGO(response.data);
                    this.queueIndex++;
                }).catch(error => {
                }).then(() => {
                });
            },

            //点一条数据就去下载 参数id
            async toDownload(item) {
                this.queueIndex = 0;
                this.loading = true;
                let params = new FormData();
                params.append("fitsUrls", item.fitsUrl);
                params.append("sizes", item.csize);
                params.append("dataType", item.dataType);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_in, params, "POST");
                this.download(item);
            },

            async downloadAll() {
                this.queueIndex = 0;
                this.loading = true;
                this.size = 0;
                let dataType = "";
                for (let i = 0; i < this.filesPath.length; i++) {
                    this.form.fitsUrls += this.filesPath[i].fitsUrl + ",";
                    let cSize = (this.filesPath[i].csize) / (1024 * 1024);
                    dataType = this.filesPath[i].dataType;
                    this.size = this.size + cSize;
                }
                let params = new FormData();
                params.append("fitsUrls", this.form.fitsUrls.toString());
                params.append("sizes", this.size);
                params.append("dataType", dataType);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_in, params, "POST");
                if (data.code == 200) {
                    this.handleDownLoadAll(this.filesPath);
                }
            },

            async handleDownLoadAll(item) {
                let form = {
                    observationDatas: item
                }
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_downloadAll, form, "POST");
                if (data.code === 200) {
                    let fitsName = data.data;
                    let link = document.createElement("a");
                    link.style.display = "none";
                    let url = this.$aiocUrl.baseUrl +"/web-service/files/" + fitsName;
                    console.log(url)
                    link.href = url;
                    link.setAttribute("download", fitsName);
                    document.body.appendChild(link);
                    link.click();
                    this.queueIndex++;
                    this.loading = false;
                }
                // let _this = this;
                // this.timer = setInterval(function () {
                //     if(_this.queueIndex == _this.filesPath.length) {
                //         _this.loading = false;
                //         clearInterval(_this.timer);
                //     }
                // }, 1000);
            },

            async download(item){
                let params = new FormData();
                params.append("fitsUrl", item.fitsUrl);
                params.append("sizes", item.csize);
                params.append("dataType", item.dataType);
                params.append("bucketName", item.bucketName);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_download, params, "POST");
                if (data.code === 200) {
                    let fitsUrl = data.data;
                    let fitsName = data.other.fitsName;
                    let link = document.createElement("a");
                    link.style.display = "none";
                    let url = this.$aiocUrl.baseUrl +"/web-service/files/" + fitsUrl;
                    link.href = url;
                    link.setAttribute("download", fitsName);
                    document.body.appendChild(link);
                    link.click();
                    this.queueIndex++;
                    this.loading = false;
                }
                // {
                //     fitsUrls: item.fitsUrl,
                //         sizes: item.csize,
                //     dataType: item.dataType,
                //     bucketName: item.bucketName,
                // },
                // let params = new FormData();
                // params.append("fitsUrls", item.fitsUrl);
                // params.append("sizes", item.csize);
                // params.append("dataType", item.dataType);
                // params.append("bucketName", item.bucketName);
                // this.$axios({
                //     method: 'POST',
                //     url: this.$aiocUrl.web_service_v1_cl_observation_log_download,
                //     data: params,
                //     // headers:{
                //     //     'Content-Type': 'application/x-www-form-urlencoded'
                //     // },
                //     // responseType: 'blob',
                // }).then(response => {
                //
                //     // 文件流
                //     // this.downloadGO(response);
                //     this.queueIndex++;
                // }).catch(error => {
                // }).then(() => {
                // });
            },

            //下载文件流
            downloadGO(response) {
                let data = response.data;
                let headerContent = response.headers["content-disposition"];
                let fileName = headerContent.substring(headerContent.indexOf("fileName=") + 9, headerContent.length)
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]), {type: "application/x-msdownload"})
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click();                          //点击下载
                document.body.removeChild(link);     //下载完成移除元素
                window.URL.revokeObjectURL(url);   //为了更好地性能和内存使用状况，应该在适当的时候释放url.
            },

         /*   //前台url下载
            download(fitsUrl, fitsName) {
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
            }*/


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