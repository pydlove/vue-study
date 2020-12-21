<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="增加注册码"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                width="1200px"
                :before-close="close"
                :fullscreen="false"
                center>
            <el-form class="aiocw-form mt-20"
                     ref="form"
                     :model="form"
                     :inline="true"
                     :validate-on-rule-change="false"
                     label-width="90px"
                     label-position="right">

                <el-form-item label="注册码数量" prop="name">
                    <el-input
                            v-model="form.count"
                            class="wp-180 mr-10"
                            placeholder="请输入注册码数量">
                    </el-input>
                </el-form-item>

                <el-button class="ml-20 aiocw-btn1" type="primary" size="small" icon="el-icon-plus" @click="create">生成注册码</el-button>
                <el-button class="ml-20" type="primary" size="small" icon="el-icon-check" @click="submit">提交</el-button>
            </el-form>

            <el-table
                    class=""
                    ref="uuidTableRef"
                    :data="uuidTable"
                    @selection-change='onTableSelectChange'
                    @row-click='tableRowClick'
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'9px 1px'}"
                    border
            >
                <el-table-column prop="id" label="序号" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="code" label="注册码" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="status" label="状态" fixed="right">
                    <el-tag type="success" effect="dark">
                        可用
                    </el-tag>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "student",
        components: {},
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },
            async submit() {
                console.log(this.uuidTable)
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_code_add, this.uuidTable, "POST");
                if(data.code == 200) {
                    this.$promptMsg(data.msg, "success");
                    this.dialogVisible = false;
                    this.$emit("search", 1, 10);
                    this.form.count = 10;
                    this.uuidTable = [];
                }
            },
            create() {
                this.uuidTable = [];
                var d = new Date();
                for(var i=0; i < this.form.count; i++) {
                    var uuidObj = {
                        id: i+1,
                        code: this.getUUID(),
                        createTime: d.getFullYear()+ "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":"  + d.getMinutes() + ":" + d.getSeconds(),
                        status: 0,
                    };
                    this.uuidTable.push(uuidObj);
                }
            },
            getUUID() {
                return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16).toUpperCase();
                });
            }
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    count: 10
                },
                uuidTable: [],
            }
        },
    }
</script>

<style scoped>
</style>

<style >
</style>