<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="用户角色配置"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
            <div class="yhpz">
                <el-tag class="mb-10" type="danger">角色名称：{{lastCheckName}}</el-tag>
                <el-card class="box-card tl of-at">
                    <el-transfer class="tra"
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
              <el-button class="wdi-120" @click="close">取 消</el-button>
              <el-button class="wdi-120 aioc-btn1" type="primary" @click="relatedUserRole">确 定</el-button>
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
            async search() {
                let params = new FormData()
                params.append("roleId", this.lastCheckId);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_user_role_related, params, "POST");
                if (data.code === 200) {
                    this.allUserData = data.data.all;
                    this.relatedData = data.data.related;
                    return true;
                }
            },
            async relatedUserRole() {
                let params = new FormData()
                params.append("roleId", this.lastCheckId);
                params.append("userIds", this.relatedUserIds.toString());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_role_related_user, params, "POST");
                if (data.code === 200) {
                    this.relatedUserIds = [];
                    this.$promptMsg("配置人员角色成功", "success");
                    this.close();
                }

            },
            handleChange(value) {
                this.relatedUserIds = value;
            },
        },
        data() {
            return {
                dialogVisible: false,
                allUserData: [],
                relatedData: [],
                lastCheckId: "",
                lastCheckName: "",
                relatedUserIds: [],
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
    .tra .el-transfer-panel__body {
        height: 500px;
    }
    .tra .el-transfer-panel__list.is-filterable {
        height: 450px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
</style>