<template>
    <!--eslint-disable-->
    <div>
        <el-dialog
            class="aiocw-dialog"
            title="文件下载"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :before-close="close"
            :fullscreen="false"
            width="800px"
            center
        >
            <el-table
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
            </el-table>

            <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">取 消</el-button>
              <el-button class="wdi-120 aioc-btn1" type="primary" @click="onSubmit">确 定</el-button>
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
            console.log(this.filesPath);
        },
        methods: {
            open(){
                this.dialogVisible = true;
                console.log(this.multipleSelection);
                this.filesPath = this.multipleSelection;
                console.log( this.filesPath);
            },
            close() {
                this.dialogVisible = false;
            },

            fmtActivityStatus(item) {
               console.log(item);
               let csize = item/1024;
               csize = parseFloat(csize).toFixed(0);
               return csize + "KB";
            },

            //通过url 转为blob格式的数据
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
            },

            handleDownLoad() {
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
                this.size = 0;
                for(let i = 0 ; i < this.checkRows.length; i++){
                    let cSize = (this.checkRows[i].csize)/(1024*1024);
                    this.size = this.size + cSize;
                    this.saveUrl.push(this.checkRows[i].fitsUrl);
                }
               this.size = parseFloat(this.size).toFixed(2)
                if(this.checkRows.length > 0) {
                    this.$confirm('您将要下载文件大小为' + this.size +'MB , 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.submitRequest();
                    }).catch(() => {
                    });

                } else {
                    this.$message('请选择一条数据');
                }

            },

            async submitRequest(){
                console.log(1);
                let params = new FormData();
                params.append("fitsUrls", this.saveUrl.toString());
                params.append("sizes", this.size);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_web_download_log_in, params, "POST");
                if(data.code == 200){
                    this.handleDownLoad();
                    this.dialogVisible = false;
                }
                },

            /**
             * 表格点击事件
             */
            tableRowClick(row) {
                this.$refs.table.toggleRowSelection(row);
            },
            /**
             * 表格选择改变事件
             */
            onTableSelectChange(rows) {
                this.checkRows = rows;
                console.log(this.checkRows);
            },
            /**
             * 取消选择
             */
            toggleSelection() {
                this.$refs.table.clearSelection();
            },

            sortChange(column) {
                this.$refs.table.clearSort()
                this.sort = "";
                if (column.prop == "sizes" && column.order == "ascending") {
                    this.sort = "sizes asc";
                }
                else if (column.prop == "sizes" && column.order == "descending") {
                    this.sort = "sizes desc";
                }
                this.search(this.currentPage, this.pageSize);
            },
        },
        data() {
            return {
                dialogVisible: false,
                multipleSelection: [],
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
                 size:  0,
                saveUrl: [],

            }
        },
    }
</script>

<style scoped>

</style>