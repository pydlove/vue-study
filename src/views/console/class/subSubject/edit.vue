<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="编辑课程大类信息"
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

                    <el-form-item label="课程小类名称" prop="name">
                        <el-input class="wdi-600" v-model="form.name" placeholder="请输入课程大类名称"></el-input>
                    </el-form-item>

                    <el-form-item label="所属课程大类" prop="mainName">
                        <el-select class="wdi-600" v-model="form.mainName" placeholder="请选择所属课程大类" clearable >
                            <el-option
                                    v-for="item in mainSubjects"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="备注" prop="remark">
                        <el-input class="textarea wdi-600" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="输入备注" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">取 消</el-button>
              <el-button class="wdi-120" type="primary" @click="onSubmit">确 定</el-button>
            </span>
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
            onSubmit() {
                this.$promptMsg("编辑成功", "success");
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    name: "",
                    mainId: "",
                    mainName: "",
                    createTime: "",
                    remark: "",
                },
                mainSubjects: [
                    {
                        id: '1',
                        name: '绘画'
                    }, {
                        id: '2',
                        name: '书法'
                    }, {
                        id: '3',
                        name: '摄影'
                    }, {
                        id: '4',
                        name: '设计'
                    }, {
                        id: '5',
                        name: '雕塑'
                    }
                ],
            }
        },
    }
</script>

<style scoped>
</style>

<style >
</style>