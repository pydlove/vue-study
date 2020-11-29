<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="用户角色配置"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="true"
                center>
            <div class="yhpz">
                <el-tag class="mb-10" type="danger">角色名称：{{lastCheckName}}</el-tag>
                <el-card class="box-card tl of-at">
                    <el-transfer
                            filterable
                            v-model="relatedData"
                            :props="{key: 'id', label: 'name'}"
                            :titles="['未关联用户', '已关联用户']"
                            :button-texts="[ '移出角色', '加入角色']"
                            :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
                            @change="handleChange"
                            :data="allUserData"
                    >
                    </el-transfer>
                </el-card>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="close">取 消</el-button>
              <el-button type="primary" @click="relatedUserRole">确 定</el-button>
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
                console.log(this.form)
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
                    account: "",
                    password: '',
                    pwdagain: '',
                    phone: '',
                    email: '',
                    status: '',
                    remark: '',
                    photo: '',
                    birth: '',
                    idCard: '',
                    address: '',
                },
            }
        },
    }
</script>

<style scoped>
    .yhpz {
        margin: 10px auto;
        width: 900px;
    }
</style>

<style>
</style>