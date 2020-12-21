<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="编辑子节点"
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
                        :inline="true"
                        :validate-on-rule-change="false"
                        label-width="95px">
                    <el-form-item label="子菜单名称" prop="chName">
                        <el-input class="wdi-300" v-model="form.chName"></el-input>
                    </el-form-item>

                    <el-form-item label="菜单类型" prop="type">
                        <el-select class="wdi-300" v-model="form.type" placeholder="请选择菜单类型">
                            <el-option label="首页" value="index"></el-option>
                            <el-option label="菜单" value="menu"></el-option>
                            <el-option label="按钮" value="button"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="form.type == 'menu' || form.type == 'index'" label="菜单链接" prop="url">
                        <el-input class="wdi-300" v-model="form.url"></el-input>
                    </el-form-item>

                    <el-form-item v-if="form.type == 'menu'" label="显示图标" prop="icon">
                        <el-select class="wdi-300" v-model="form.icon" placeholder="请选择菜单类型">
                            <el-option label="el-icon-c-scale-to-original" value="el-icon-c-scale-to-original"><i class="el-icon-c-scale-to-original"></i></el-option>
                            <el-option label="el-icon-reading" value="el-icon-reading"><i class="el-icon-reading"></i></el-option>
                            <el-option label="el-icon-coin" value="el-icon-coin"><i class="el-icon-coin"></i></el-option>
                            <el-option label="el-icon-trophy" value="el-icon-trophy"><i class="el-icon-trophy"></i></el-option>
                            <el-option label="el-icon-present" value="el-icon-present"><i class="el-icon-present"></i></el-option>
                            <el-option label="el-icon-user" value="el-icon-user"><i class="el-icon-user"></i></el-option>
                            <el-option label="el-icon-tickets" value="el-icon-tickets"><i class="el-icon-tickets"></i></el-option>
                            <el-option label="el-icon-search" value="el-icon-search"><i class="el-icon-search"></i></el-option>
                            <el-option label="el-icon-warning-outline" value="el-icon-warning-outline"><i class="el-icon-warning-outline"></i></el-option>
                            <el-option label="el-icon-setting" value="el-icon-setting"><i class="el-icon-setting"></i></el-option>
                            <el-option label="el-icon-message" value="el-icon-message"><i class="el-icon-message"></i></el-option>
                            <el-option label="el-icon-house" value="el-icon-house"><i class="el-icon-house"></i></el-option>
                            <el-option label="el-icon-data-line" value="el-icon-data-line"><i class="el-icon-data-line"></i></el-option>
                            <el-option label="el-icon-user" value="el-icon-user"><i class="el-icon-user"></i></el-option>
                            <el-option label="el-icon-office-building" value="el-icon-office-building"><i class="el-icon-office-building"></i></el-option>
                            <el-option label="el-icon-edit" value="el-icon-edit"><i class="el-icon-edit"></i></el-option>
                            <el-option label="el-icon-delete" value="el-icon-delete"><i class="el-icon-delete"></i></el-option>
                            <el-option label="el-icon-share" value="el-icon-share"><i class="el-icon-share"></i></el-option>
                            <el-option label="el-icon-s-tools" value="el-icon-s-tools"><i class="el-icon-s-tools"></i></el-option>
                            <el-option label="el-icon-phone" value="el-icon-phone"><i class="el-icon-phone"></i></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="级别" prop="level">
                        <el-select class="wdi-300" v-model="form.level" disabled placeholder="请选择菜单级别">
                            <el-option label="0" value="project"></el-option>
                            <el-option label="1" value="menu"></el-option>
                            <el-option label="2" value="button"></el-option>
                            <el-option label="3" value="button"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="form.type == 'menu' || form.type == 'index'" label="打开方式">
                        <el-select class="wdi-300" v-model="form.openType" placeholder="请选择打开方式">
                            <el-option label="默认" value="default"></el-option>
                            <el-option label="iframe" value="iframe"></el-option>
                            <el-option label="弹出窗口" value="open"></el-option>
                            <el-option label="打开新的标签页" value="tab"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="显示顺序">
                        <el-input class="wdi-300" v-model="form.showOrder"></el-input>
                    </el-form-item>

                    <el-form-item label="是否可用" prop="enabled" required>
                        <el-select class="wdi-300" v-model="form.enabled" placeholder="请选择是否可用">
                            <el-option label="停用" value="0"></el-option>
                            <el-option label="启用" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="父类节点">
                        <el-select class="wdi-300" v-model="form.parentId" disabled  placeholder="请选择父类节点" >
                            <el-option :label="form.parentName" :value="form.parentId" :disabled="true"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="描述">
                        <el-input class="wdi-708 textarea" type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button class="wdi-120" @click="close">取 消</el-button>
                <el-button class="wdi-120" type="primary" @click="onSubmit">确 定</el-button>
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
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_functions_edit, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg("编辑子菜单成功！", "success");
                    this.dialogVisible = false;
                    this.$emit("search");
                }
            },

            setForm(form) {
                this.form = form;
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: '',
                    chName: '',
                    url: '',
                    showOrder: '',
                    level: '',
                    type: '',
                    openType: '',
                    enabled: '',
                    remark: '',
                    icon: '',
                    parentId: '',
                    parentName: '',
                },

                rules: {
                    chName: [
                        { type: 'string', required: true, message: '请输入菜单名称', trigger: ['change'] },
                    ],
                    url: [
                        { type: 'string', required: true, message: '请输入菜单链接', trigger: ['change']},
                    ],
                    icon: [
                        { type: 'string', required: true, message: '请选择菜单图标', trigger: ['change'] },
                    ],
                    type: [
                        { type: 'string', required: true, message: '请选择菜单类型', trigger: ['change'] }
                    ],
                    enabled: [
                        { type: 'string', required: true, message: '请选择菜单是否启用', trigger: ['change'] }
                    ],
                },
            }
        },
    }
</script>

<style scoped>
    .pr {
        position: relative;
    }
    .upload-item {
        position: absolute;
        top: 50px;
        right: 80px;
    }
</style>

<style>
    .zpcc .el-upload {
        width: 180px;
        height: 250px;
        line-height: 250px;
    }
</style>