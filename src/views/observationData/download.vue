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
                    :data="tableData"
                    @sort-change="sortChange"
                    @selection-change='onTableSelectChange'
                    @row-click='tableRowClick'
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'9px 1px'}">
                <el-table-column fixed="left" type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="fitsUrls" label="文件地址" :show-overflow-tooltip="true" align="center"></el-table-column>
                <el-table-column prop="sizes" label="文件大小" :show-overflow-tooltip="true" align="center" sortable></el-table-column>
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
    export default {
        name: "download",
        mounted() {
        },
        methods: {
            open(){
                this.dialogVisible = true;
                console.log(this.multipleSelection);
            },
            close() {
                this.dialogVisible = false;
            },

            onSubmit(){
                this.$confirm('您将要下载文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checkRowIds = [];
                    this.checkRowIds.push("\"" + row.id + "\"");
                    this.submitRequest();
                }).catch(() => {
                });
            },

            async submitRequest(){
                let params = new FormData();
                params.append("fitsUrls", this.form.fitsUrls);
                params.append("sizes", this.form.sizes);
                let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_web_download_log_in, this.form, "POST");
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

            }
        },
    }
</script>

<style scoped>

</style>