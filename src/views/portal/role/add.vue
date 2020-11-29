<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="增加课程大类信息"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="true"
                center>
            <el-card class="auto-card wdi-900 pr">
                <el-form
                        ref="form"
                        :model="form"
                        :rules="rules"
                        :validate-on-rule-change="false"
                        label-width="80px">

                    <el-form-item label="角色名称" prop="name" required>
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="描述" prop="remark">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "add",
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
                this.$promptMsg("增加成功", "success");
            },

        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    name: "",
                    remark: '',
                },
            }
        },
    }
</script>

<style scoped>
</style>

<style>
</style>