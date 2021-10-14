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

            <div class="nd-file-download" v-for="item in filesPath">
                <div class="nd-file" @click="toDownload(item)">
                    <div class="nd-icon"></div>
                    <div class="nd-file-url">{{fakeUrl(item)}}</div>
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
    import JSZip from'jszip'
    import FileSaver from'file-saver'

    export default {
        name: "download",
        mounted() {
            this.baseUrl = this.$aiocUrl.baseUrl;
            this.filesPath = this.multipleSelection;
    },
        methods: {
            open(){
                this.dialogVisible = true;
                this.filesPath = this.multipleSelection;
                this.checkRows = null;
            },
            close() {
                this.dialogVisible = false;
            },

            fakeUrl(item){
                let url = "http://114.212.174.143:9092/download" + "? fileName=" + item.fitsName;
                console.log(item.fitsUrl);
                return url;
            },

         /*   //通过url 转为blob格式的数据
            getImgArrayBuffer(url){
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
                        }else{
                            reject(this.status);
                        }
                    }
                    xmlhttp.send();
                });
            },*/

            fitsSize(item){
                let cSize = (item.csize)/(1024*1024);
                cSize = parseFloat(cSize).toFixed(2);
                return cSize + "MB";
            },

            //点一条数据就去下载 参数id
            async toDownload(item){
                this.loading = true;
                let params = new FormData();
                params.append("fitsUrls", item.fitsUrl);
                params.append("sizes", item.csize);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_cl_observation_log_download, params, "POST");
                if(data.code == 200) {
                    this.loading = false;
                }

            },

        /*    handleDownLoad() {
                let _this = this;
                let zip = new JSZip();
                let obj = {};
                let promises = [];
                _this.title = '正在加载压缩文件';
                // 循环文件数组
                for (let i = 0; i < this.filesPath.length; i++) {
                    if(this.filesPath[i].fitsUrls != '') {
                         const promise= _this.getImgArrayBuffer("/web-service" + this.filesPath[i].fitsUrl).then(res => {
                        // const promise= _this.getImgArrayBuffer("/web-service/testdata/chase/2021/07/15/sun_2566.fts").then(res => {
                            // 下载文件, 并存成ArrayBuffer对象(blob)
                            zip.file(this.filesPath[i].fitsName, res, { binary: true }); // 逐个添加文件
                            // zip.file("sun_2565.fts", res, { binary: true }); // 逐个添加文件
                            // 这里截取我是为了打印
                            obj [this.filesPath[i].fitsName + '.' + res.type.substring(6)] = res;
                            console.log('``````````````````````````````',obj )
                        });
                        promises.push(promise);
                    }else {
                        return this.$message.error('空文件不允许下载  !');
                    }
                }
                Promise.all(promises).then(() => {
                    zip.generateAsync({ type: "blob" }).then(res=> {
                        _this.title = '正在压缩中';
                        // 生成二进制流
                        FileSaver.saveAs(res, 'Fits文件'); // 利用file-saver保存文件,可以改成自己想要的压缩包名称
                        _this.title = '压缩完成';
                    });
                }).catch(res=>{
                    _this.$message.error('文件压缩失败');
                });
                this.dialogVisible = false; // 弹窗关闭
            },

            onSubmit(){
                    this.$confirm('您将要下载文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.submitRequest();
                    }).catch(() => {
                    });
            },

            async submitRequest(){
                let params = new FormData();
                params.append("fitsUrls", this.saveUrl.toString());
                params.append("sizes", this.size);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_web_download_log_in, params, "POST");
                if(data.code == 200){
                    this.handleDownLoad();
                    this.dialogVisible = false;
                }
                },*/

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
                form:{
                    fitsUrls:"",
                    sizes:"",
                },
                filesPath:[],
                baseUrl: "",
                saveUrl: [],
            }
        },
    }
</script>

<style scoped>

    .nd-icon{
        background: url("../../assets/img/background/icon.png");
        width: 20px;
        height: 20px;
        background-size: 100% 100%;
    }

    .nd-file-download{
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

    .nd-file-url{
        margin-left: 3px;
        font-size: 14px;
        line-height: 21px;
    }

    .nd-file-url:hover{
        color: #fa541c;
        margin-left: 3px;
        font-size: 14px;
        line-height: 21px;
    }

    .nd-file-size{
        margin-left: 10px;
        font-size: 14px;
        line-height: 21px;
    }

</style>