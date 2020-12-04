<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="设置自动静默规则"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="true"
                center>
            <el-card class="auto-card wdi-800">
                <el-form
                        class= "pt-20 pl-20"
                        ref="form"
                        :model="form"
                        :validate-on-rule-change="false"
                        label-width="120px"
                        label-position="right">

                    <el-form-item label="预警值" prop="name" label-width="120px">
                        低于
                        <el-input-number v-model="form.score" @change="handleChange" :step="1" label="限定人数"></el-input-number>
                        分以下，将自动静默
                    </el-form-item>

                    <el-form-item label="结算时间" prop="name" label-width="120px">
                        <el-date-picker class="wdi-350"
                                        v-model="form.time"
                                        type="date"
                                        placeholder="选择活动时间"
                                        align="right"
                                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">取 消</el-button>
              <el-button class="" type="primary" @click="onSubmit">保存并启动规则</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "autoDisable",
        mounted() {
        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    score: "",
                    endTime: "",
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },

            }
        },
    }
</script>

<style scoped>

</style>
<style >
    .aioc-upload .el-upload-list__item-thumbnail {
        vertical-align: middle;
        display: inline-block;
        height: 400px;
        width: 500px;
        float: left;
        position: relative;
        z-index: 1;
        margin-left: -80px;
        background-color: #FFF;
    }
    .aioc-upload .el-upload-list__item {
        overflow: hidden;
        z-index: 0;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        margin-top: 10px;
        padding: 10px 10px 10px 90px;
        height: 420px;
        width: 600px;
    }
    .aioc-upload .el-upload-dragger {
        width: 600px;
        height: 180px;
    }
</style>