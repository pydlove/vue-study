<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="审批流转"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="true"
                center>
            <el-card class="auto-card wdi-800">
                <div class="dffn">
                    <el-form
                            class= "pt-20 w-50 tapp-form"
                            :rules="rules"
                            ref="form"
                            :model="form"
                            :validate-on-rule-change="false"
                            label-width="120px"
                            label-position="right">
                        <el-form-item class="wp-460" label="审批单号：" prop="name" >
                            <span>{{form.id}}</span>
                        </el-form-item>

                        <el-form-item class="wp-460" label="审批标题：" prop="name" >
                            <span>{{form.name}}</span>
                        </el-form-item>

                        <el-form-item class="wp-460" label="审批描述：" prop="name" >
                            <span>{{form.remark}}</span>
                        </el-form-item>

                        <el-form-item class="wp-460" label="创建人员：" prop="name">
                            <span>{{form.createUserName}}</span>
                        </el-form-item>

                        <el-form-item class="wp-460" label="创建时间：" prop="name">
                            <span>{{form.createTime}}</span>
                        </el-form-item>

                        <el-form-item v-show="form.link == 0" class="wp-460" label="下个环节：" prop="name">
                            <span>{{form.nextLinkName}}</span>
                        </el-form-item>

                        <el-form-item v-if="form.link == 0 " class="w-100" label="环节审批人：" prop="approveUser">
                            <el-select class="wp-340" v-model="form.approveUser"
                                       filterable clearable placeholder="请选择下阶段审批人" >
                                <el-option v-for="(item, index) in prUsers"
                                           :key="index" :label="item.userName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>

            <span slot="footer" class="dialog-footer" v-if="form.link == 0">
                <el-button type="warning" @click="close">取 消</el-button>
                <el-button type="primary" @click="onCirculation('form')">流 转</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "approveCirculation",
        components: {},
        mounted() {
            this.setId();
        },
        methods: {
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

<style >
</style>