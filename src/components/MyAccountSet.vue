<template>
    <div>
        <el-divider content-position="left">
            修改密码
        </el-divider>
        <div class="mt-40 ml-20">
            <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="100px">
                <el-form-item class="mb-10 wdi-400" label="输入旧密码" prop="currentPwd">
                    <el-input placeholder="请输入密码" v-model="form.currentPwd" show-password></el-input>
                </el-form-item>

                <el-form-item class="mb-10 wdi-400" label="输入新密码" prop="newPwd">
                    <el-input placeholder="请输入密码" v-model="form.newPwd" show-password></el-input>
                </el-form-item>

                <el-form-item class="mb-10 wdi-400" label="确认新密码" prop="confirmNewPwd">
                    <el-input placeholder="请输入密码" v-model="form.confirmNewPwd" show-password></el-input>
                </el-form-item>

                <el-button class="fl mli-280 wdi-120 aioc-btn1"  type="primary" @click="submit">提 交</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyAccountSet",
        mounted() {
            this.$nextTick(() => {
                this.$refs["form"].clearValidate();
            });
        },
        methods: {
            submit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        // 校验两次密码是否一致
                        if(this.form.newPwd == this.form.confirmNewPwd) {
                            // 校验旧密码
                            this.checkOldPwd();
                        } else {
                            this.$notify.error({
                                title: '提示',
                                message: '两次面输入不一致，请核实'
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },

            async checkOldPwd() {
                let params = new FormData()
                params.append("password", this.$md5(this.form.currentPwd));
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_user_check_pwd, params, "POST");
                if(data.code == 200 && data.data == "success") {
                    this.submitRequest();
                }
            },

            async submitRequest() {
                let params = new FormData()
                params.append("password", this.$md5(this.form.newPwd));
                let data = await this.$aiorequest(this.$aiocUrl.blsh_service_v1_bl_user_update_pwd, params, "POST");
                if(data.code == 200) {
                    this.$notify({
                        title: '提示',
                        message: '修改密码成功'
                    });
                    this.clearForm();
                }
            },

            clearForm() {
                this.form = {
                    currentPwd: "",
                    newPwd: "",
                    confirmNewPwd: "",
                };
                this.$refs["form"].clearValidate();
            },
        },
        data() {
            return {
                form: {
                    currentPwd: "",
                    newPwd: "",
                    confirmNewPwd: "",
                },
                rules: {
                    currentPwd: [
                        {type: 'string', required: true, message: '请输入旧密码', trigger: ['change', 'blur']},
                    ],
                    newPwd: [
                        {type: 'string', required: true, message: '请输入新密码', trigger: ['change', 'blur']},
                        {
                            validator: function (rule, value, callback) {
                                var pwdReg = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}");
                                if (value.length < 6) {
                                    callback(new Error("密码至少设置6位字符"));
                                } else if(!(pwdReg.test(value))) {
                                    var pwdErrorMsg = "您的密码复杂度太低（密码中必须包含字母、数字、特殊字符）";
                                    callback(new Error(pwdErrorMsg));
                                } else {
                                    callback();
                                }
                            }, trigger: ['change', 'blur']
                        }
                    ],
                    confirmNewPwd: [
                        {type: 'string', required: true, message: '请再次输入新密码', trigger: ['change', 'blur']},
                    ],
                }
            }
        }
    }
</script>

<style scoped>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
    }

    /*媒体查询（平板）*/
    @media screen and (min-width: 769px) and (max-width: 996px) {

    }

    /*媒体查询（手机）*/
    @media screen and (max-width: 768px) {


    }
</style>

<style>
    /*媒体查询（电脑）*/
    @media screen and (min-width: 1529px) {
        .el-form-item {
            margin-bottom: 20px !important;
        }
    }
</style>