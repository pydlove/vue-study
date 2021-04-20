<template>
    <!--eslint-disable-->
    <div>
        <el-dialog
                class="aiovl-dialog"
                title="修改投票信息"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="600px"
                center>
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="当前票数">
                    <span>{{this.ticket.voteNum}}  票</span>
                </el-form-item>

                <el-form-item label="增加票数" prop="addTicket">
                    <el-input v-model="form.addTicket" class="wd-100" clearable></el-input>
                    票
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit" :disabled="enableSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<!--eslint-disable-->
<script>

    export default {
        name: "alterTicket",

        props: ["currentPage", "pageSize"],
        /**
         * 弹出窗口
         */
        methods: {

            updateTicket(row) {
                this.ticket = row;
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
                // 按钮加锁 单击一次,向后台请求数据，释放锁，当多次点击只触发一次，锁住按钮事件，当数据请求回来释放锁
                // 1、拿到选手id
                // 2、用户在界面输入票数 拿票数
                // 3、确认用户的票数是否空 确认用户的票数是否大于票数 如果小于 提示不正确;
                // 0   1、提示 2. 返回（阻断）
                // 4、传后台
                // 5.点击确定关闭增加票数对话框  并清空文本框的值
                this.enableSubmit=true;
                let params = new FormData();
                params.append("signId", this.ticket.id);
                params.append("voteNum", this.form.addTicket);
                let data = await this.$aiorequest(this.$aiocUrl.blsh_h5_service_v1_bh_vote_voteTicket, params, "POST");
                if (data.code == 200) {
                    this.enableSubmit=false;
                    this.dialogVisible=false;
                    this.clearForm();
                    console.log(this.currentPage,this.pageSize);
                    this.$emit("search", this.currentPage, this.pageSize);

                } else if (data.code == 500) {
                    this.enableSubmit=false;
                    this.$promptMsg("查看URL/域名是否连接正常");
                    return false;
                }
            },

            close() {
                this.dialogVisible = false;
            },

            open() {
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },

            clearForm() {
                this.form = {
                    voteNum: "",
                }
            },

        },


        data() {
            return {
                close: "",
                enableSubmit: false,
                form: {
                    addTicket: '1',
                },
                ticket: "",
                dialogVisible: false,
                rules: {
                   addTicket: [
                        {
                            type: 'integer', required: true, message: '请输入增加票数，增加的票数必须是正数字', trigger: 'blur',
                            validator: (rule, value, callback) => {
                                if (value != "") {
                                    if(value != 0){
                                        callback();
                                    }else {
                                        callback(new Error("输入的票数不能为0"))
                                    }
                                } else {
                                    callback(new Error("请输入增加票数"));
                                }
                            },
                        },
                    ],
                }
            }
        },
    }

</script>

<style scoped>

</style>