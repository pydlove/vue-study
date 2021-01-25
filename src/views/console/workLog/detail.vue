<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="日志详情"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="900px"
                center>
            <el-card class="auto-card wdi-800">
                <el-form
                        class= "pt-20 pl-20"
                        ref="form"
                        :model="form"
                        :validate-on-rule-change="false"
                        label-width="120px"
                        label-position="right">

                    <el-form-item label="日志标题" prop="title">
                        <el-input class="wdi-600" v-model="form.title" placeholder="请输入日志标题" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="日志正文" prop="content">
                        <el-input class="wdi-600 textarea" type="textarea" :autosize="{ minRows: 10, maxRows: 12}"
                                  placeholder="请输入日志正文内容" v-model="form.content" disabled></el-input>
                    </el-form-item>

                    <el-form-item class="w-100" label="日志审批领导" prop="approverUser">
                        <el-select class="wdi-300" v-model="form.toLeaderId" disabled
                                   filterable clearable placeholder="请选择日志审批领导" >
                            <el-option v-for="(item, index) in leader"
                                       :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "edit",
        props: ['leader', "currentPage", "pageSize",],
        mounted() {
        },
        methods: {
            close() {
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },

        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    title: "",
                    content: "",
                    createTime: "",
                    updateTime: "",
                    createUser: "",
                    createUserName: "",
                    leader: "",
                    toLeaderId: "",
                    remark: "",
                },
            }
        },
    }
</script>

<style scoped>
</style>

<style >
</style>