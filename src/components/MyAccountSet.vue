<template>
    <div>
        <el-divider content-position="left">
            修改密码
        </el-divider>
        <div class="mt-40 ml-20">
            <el-form ref="form" :model="form" label-position="right" label-width="80px">
                <el-form-item class="mb-10 wdi-400" label-width="100px" label="输入旧密码" prop="name">
                    <el-input placeholder="请输入密码" v-model="form.currentPwd" show-password></el-input>
                </el-form-item>

                <el-form-item class="mb-10 wdi-400" label-width="100px" label="输入新密码" prop="name">
                    <el-input placeholder="请输入密码" v-model="form.newPwd" show-password></el-input>
                </el-form-item>

                <el-form-item class="mb-10 wdi-400" label-width="100px" label="确认新密码" prop="name">
                    <el-input placeholder="请输入密码" v-model="form.confirmNewPwd" show-password></el-input>
                </el-form-item>

                <el-button class="fl mli-280 wdi-120" type="primary" @click="submit">提 交</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyAccountSet",
        mounted() {

        },
        methods: {
        },
        data() {
            return {
                form: {
                    currentPwd: "",
                    newPwd: "",
                    confirmNewPwd: "",
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