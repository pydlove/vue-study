<template>
    <div>
        <!--aiocloud@admin-->
        <el-dialog
                class="aiocw-dialog"
                title="超级管理员"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
            <el-card class="auto-card wdi-900 pr">
                <el-form
                        ref="form"
                        :model="form"
                        :rules="rules"
                        :validate-on-rule-change="false"
                        label-width="80px">
                    <el-form-item label="口令" prop="name">
                        <el-input v-model="form.pwd" show-password></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button class="wdi-120" @click="close">取 消</el-button>
                <el-button class="wdi-120 aioc-btn1" type="primary" @click="onSubmit">确 定</el-button>
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
                this.$refs["form"].clearValidate();
            },
            onSubmit() {
                if(this.$md5(this.form.pwd) == "20af5c65d3f44a221628c58531058ae1") {
                    this.$emit("setIsAdmin");
                    this.close();
                }
            }

        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    pwd: "",
                },
            }
        },
    }
</script>

<style scoped>
</style>

<style>
</style>