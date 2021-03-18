<template>
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
            <div>
                <span>当前票数： 1314  票</span>
            </div>
            <div>
                <span>修改票数:</span>
                <el-input v-model="alter" style="width: 100px; height: 20px; margin: 10px;"></el-input>
                <span>票</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close" >取 消</el-button>
                <el-button type="primary" @click="onSubmit" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

    export default {
        name: "alterTicket",
        /**
         * 弹出窗口
         */
        methods: {

            onSubmit() {
                this.dialogVisible=false;
            },

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
            }

        },
    }

</script>

<style scoped>

</style>