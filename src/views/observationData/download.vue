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
            <el-button type="primary" @click="openFile()" round>选择文件</el-button>
            <el-button type="primary" @click="showRealPath()" round>显示路径</el-button>
            <input type="file" name="filename" id="open" style="display:none" />
            <div class="nd-file-download" v-for="item in filesPath">
                <div class="nd-file">
                    <div class="nd-icon"></div>
                    <a class="nd-file-url" @click="toDownload(item)">{{fakeUrl(item)}}</a>
                    <div class="nd-file-size">{{fitsSize(item)}}</div>
                </div>
            </div>

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
            openFile: function () {
                document.getElementById('open').click()
            },
            showRealPath: function () {
                // document.getElementById('input01').value = document.getElementById('open').files[0].path
                console.log( document.getElementById('open').files[0].path)
            },
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

            fileChange(e) {
                try {
                    let Base64 = require('js-base64').Base64;
                    let _this = this;
                    if (!e || !window.FileReader) return  // 看支持不支持FileReader
                    let reader = new FileReader()
                    reader.readAsDataURL(e.target.files[0]) // 这里是最关键的一步，转换就在这里 （参数必须是blob对象）
                    reader.onloadend = function (res) {
                        console.log(this.result)
                    }
                    // const fu = document.getElementById('file')
                    // if (fu == null) return
                    // console.log("-----------------------")
                    // console.log(fu)
                    // this.form.savePath = fu.value
                    // console.log(fu.path)
                    // console.log(this.form.savePath)
                    // var theFiles = e.target.files;
                    // var rea = theFiles[0].webkitRelativePath;
                    // var folder = rea.split("/");
                    // console.log("+++++++++++++++++++++++++")
                    // console.log(rea)
                    // console.log(folder[0])

                } catch (error) {
                    console.debug('choice file err:', error)
                }
            },

            btnChange() {
                var file = document.getElementById('file')
                file.click()
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
                params.append("dataType", item.dataType);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_download, params, "POST");
                console.log("++++++")
                console.log(data)
                console.log("------")
                if (data.code == 200) {
                    this.download(item.fitsUrl, item.fitsName);
                    this.loading = false;
                }
                //文件流
                this.downloadGO(data);
                this.loading = false;
            },

            async downloadAll() {
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
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_download, params, "POST");
                if (data.code == 200) {
                    this.handleDownLoad(this.filesPath);
                }
            },

            handleDownLoad(item) {
                for (let i = 0; i <= item.length; i++) {
                    this.download(item[i].fitsUrl, item[i].fitsName);
                }
            },

            //下载文件流
            downloadGO (data) {
                console.log("hahahahahah");
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]),{type: "application/x-msdownload"})
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                console.log("url" + url)
                console.log("fileName" + this.filename)
                link.setAttribute('download', "Ha+0020111011130442.fits")
                document.body.appendChild(link)
                link.click()
                window.URL.revokeObjectURL(url);   //为了更好地性能和内存使用状况，应该在适当的时候释放url.
            },

            download(fitsUrl, fitsName) {
                console.log("下载了吗----------------")
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
                    savePath: "",
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