<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="收支账户修改"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
            <el-card class="auto-card wdi-800">
                <el-form
                        class= "pt-20 pl-20"
                        ref="form"
                        :model="form"
                        :rules="rules"
                        :validate-on-rule-change="false"
                        label-width="120px"
                        label-position="right">

                    <el-form-item label="支付账户类型" prop="typeName">
                        <el-input v-model="form.typeName" disabled></el-input>
                    </el-form-item>

                    <div v-if="form.type == '1'">
                        <el-form-item label="APPID" prop="appId">
                            <el-input  placeholder="请输入APPID" v-model="form.appId"></el-input>
                            <el-card class="mt-10">
                                appid是微信公众账号或开放平台APP的唯一标识，
                                在公众平台申请公众账号或者在开放平台申请APP账号后，
                                微信会自动分配对应的appid，用于标识该应用。
                                可在微信公众平台-->开发-->基本配置里面查看，
                                商户的微信支付审核通过邮件中也会包含该字段值。
                            </el-card>
                        </el-form-item>

                        <el-form-item label="微信支付商户号" prop="mchId">
                            <el-input  placeholder="请输入微信支付商户号" v-model="form.mchId"></el-input>
                            <el-card class="mt-10">
                                商户申请微信支付后，由微信支付分配的商户收款账号。
                            </el-card>
                        </el-form-item>

                        <el-form-item label="API密钥	" prop="apiKey">
                            <el-input class="textarea" type="textarea" autosize placeholder="请输入API密钥" v-model="form.apiKey"></el-input>
                            <el-card class="mt-10">
                                交易过程生成签名的密钥，仅保留在商户系统和微信支付后台，
                                不会在网络中传播。商户妥善保管该Key，切勿在网络中传输，
                                不能在其他客户端中存储，保证key不会被泄漏。
                                商户可根据邮件提示登录微信商户平台进行设置。
                                也可按以下路径设置：微信商户平台(pay.weixin.qq.com)-->账户中心-->账户设置-->API安全-->密钥设置
                            </el-card>
                        </el-form-item>

                    </div>

                    <div v-else-if="form.type == '0'">
                        <el-form-item label="APPID" prop="appId">
                            <el-input  placeholder="请输入APPID" v-model="form.appId"></el-input>
                            <el-card class="mt-10">
                                支付宝商户号
                            </el-card>
                        </el-form-item>

                        <el-form-item label="私钥" prop="merchantPrivateKey">
                            <el-input class="textarea" type="textarea" autosize placeholder="请输入支付宝应用私钥" v-model="form.merchantPrivateKey"></el-input>
                            <el-card class="mt-10">
                                支付宝应用私钥
                            </el-card>
                        </el-form-item>

                        <el-form-item label="公钥" prop="alipayPublicKey">
                            <el-input class="textarea" type="textarea" autosize placeholder="请输入支付宝公钥" v-model="form.alipayPublicKey"></el-input>
                            <el-card class="mt-10">
                                支付宝公钥
                            </el-card>
                        </el-form-item>
                    </div>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
               <el-button class="wdi-120" @click="close">取 消</el-button>
              <el-button class="wdi-120" type="primary" @click="onSubmit">保 存</el-button>
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
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_pay_edit, this.form, "POST");
                if(data.code == 200) {
                    this.$notify({
                        title: '提示',
                        message: "编辑成功",
                    });
                    this.dialogVisible = false;
                    this.$emit("search");
                }
            },

        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    appId: "",
                    mchId: "",
                    type: "",
                    typeName: "",
                    updateTime: "",
                    createTime: "",
                    status: "",
                    merchantPrivateKey: "",
                    alipayPublicKey:"",
                    apiKey: "",
                },
                rules: {
                    appId: [
                        {type: 'string', required: true, message: '请填写APPID', trigger: ['change', 'blur']},
                    ],
                    mchId: [
                        {type: 'string', required: true, message: '请填写商户号', trigger: ['change', 'blur']},
                    ],
                    merchantPrivateKey: [
                        {type: 'string', required: true, message: '请填写应用私钥', trigger: ['change', 'blur']},
                    ],
                    alipayPublicKey: [
                        {type: 'string', required: true, message: '请填写支付宝公钥', trigger: ['change', 'blur']},
                    ],
                    apiKey: [
                        {type: 'string', required: true, message: '请填写API私钥', trigger: ['change', 'blur']},
                    ],
                },
            }
        },
    }
</script>

<style scoped>
</style>

<style >
</style>