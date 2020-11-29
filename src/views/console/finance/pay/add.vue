<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="收支账户配置"
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

                    <el-form-item label="支付账户描述" prop="mainName">
                        <el-input  placeholder="请输入描述" v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="支付账户类型" prop="mainName">
                        <el-select class="wp-100" v-model="form.type" placeholder="请选择所属课程大类" clearable >
                            <el-option
                                    v-for="item in typeOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <div v-if="form.type == 'wx'">
                        <el-form-item label="APPID" prop="appid">
                            <el-input  placeholder="请输入APPID" v-model="wx.appid"></el-input>
                            <el-card class="mt-10">
                                appid是微信公众账号或开放平台APP的唯一标识，
                                在公众平台申请公众账号或者在开放平台申请APP账号后，
                                微信会自动分配对应的appid，用于标识该应用。
                                可在微信公众平台-->开发-->基本配置里面查看，
                                商户的微信支付审核通过邮件中也会包含该字段值。
                            </el-card>
                        </el-form-item>

                        <el-form-item label="微信支付商户号" prop="mch_id">
                            <el-input  placeholder="请输入微信支付商户号" v-model="wx.mch_id"></el-input>
                            <el-card class="mt-10">
                                商户申请微信支付后，由微信支付分配的商户收款账号。
                            </el-card>
                        </el-form-item>

                        <el-form-item label="API密钥	" prop="key">
                            <el-input  placeholder="请输入API密钥" v-model="wx.key"></el-input> <el-card class="mt-10">
                            交易过程生成签名的密钥，仅保留在商户系统和微信支付后台，
                            不会在网络中传播。商户妥善保管该Key，切勿在网络中传输，
                            不能在其他客户端中存储，保证key不会被泄漏。
                            商户可根据邮件提示登录微信商户平台进行设置。
                            也可按以下路径设置：微信商户平台(pay.weixin.qq.com)-->账户中心-->账户设置-->API安全-->密钥设置
                        </el-card>

                        </el-form-item>

                        <el-form-item label="Appsecret" prop="secret">
                            <el-input  placeholder="请输入Appsecret" v-model="wx.secret"></el-input>
                            <el-card class="mt-10">
                                AppSecret是APPID对应的接口密码，
                                用于获取接口调用凭证access_token时使用。
                                在微信支付中，先通过OAuth2.0接口获取用户openid，
                                此openid用于微信内网页支付模式下单接口使用。
                                可登录公众平台-->微信支付，获取AppSecret（需成为开发者且帐号没有异常状态）。
                            </el-card>
                        </el-form-item>
                    </div>

                    <div v-else-if="form.type == 'zfb'">
                        <el-form-item label="APPID" prop="appid">
                            <el-input  placeholder="请输入APPID" v-model="zfb.appid"></el-input>
                            <el-card class="mt-10">
                                appid是微信公众账号或开放平台APP的唯一标识，
                                在公众平台申请公众账号或者在开放平台申请APP账号后，
                                微信会自动分配对应的appid，用于标识该应用。
                                可在微信公众平台-->开发-->基本配置里面查看，
                                商户的微信支付审核通过邮件中也会包含该字段值。
                            </el-card>
                        </el-form-item>

                        <el-form-item label="私钥" prop="RSA_PRIVATE_KEY">
                            <el-input  placeholder="请输入私钥" v-model="zfb.RSA_PRIVATE_KEY"></el-input>
                            <el-card class="mt-10">
                                私钥 pkcs8格式的
                            </el-card>
                        </el-form-item>

                        <el-form-item label="公钥" prop="ALIPAY_PUBLIC_KEY">
                            <el-input  placeholder="请输入公钥" v-model="zfb.ALIPAY_PUBLIC_KEY"></el-input>
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
              <el-button class="" type="primary" @click="onSubmit">保存并启用</el-button>
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
                this.$promptMsg("增加成功", "success");
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    name: "",
                    type: "",
                    paySet: "",
                    createTime: "",
                },
                wx: {
                    appid: "",
                    mch_id: "",
                    key: "",
                    secret: "",
                },
                zfb: {
                    appid: "",
                    RSA_PRIVATE_KEY: "",
                    ALIPAY_PUBLIC_KEY: "",
                },
                typeOptions: [
                    {
                        id: 'wx',
                        name: '微信'
                    },
                    {
                        id: 'zfb',
                        name: '支付宝'
                    },
                ],
            }
        },
    }
</script>

<style scoped>
</style>

<style >
</style>