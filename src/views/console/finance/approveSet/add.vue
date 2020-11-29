<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="增加审批人员配置"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="true"
                center>
            <el-card class="auto-card wdi-800">
                <el-form
                        class= "pt-20 pl-20"
                        :rules="rules"
                        ref="form"
                        :model="form"
                        :inline="true"
                        :validate-on-rule-change="false"
                        label-width="120px"
                        label-position="right"
                        style="display: flex; flex-direction: column; text-align: center;"
                >
                    <el-form-item label="用户姓名" prop="userName">
                        <el-autocomplete
                                class="wp-450"
                                v-model="form.userName"
                                :fetch-suggestions="querySearch"
                                placeholder="请搜索用户姓名"
                                @select="handleSelect">
                            <i
                                    class="el-icon-s-custom el-input__icon"
                                    slot="suffix">
                            </i>
                            <template slot-scope="{ item }">
                                <div>{{ item.name }}</div>
                            </template>
                        </el-autocomplete>
                    </el-form-item>

                    <el-form-item label="用户账号" prop="userAccount">
                        <el-input  class="wp-450" v-model="form.userAccount" placeholder="根据搜索结果自动补充" readonly></el-input>
                    </el-form-item>

                    <el-form-item label="审批角色" prop="approveRole">
                        <el-select class="wp-450" v-model="form.approveRole" placeholder="请选择审批角色" >
                            <el-option label="二级管理员" value="0"></el-option>
                            <el-option label="超级管理要换" value="1"></el-option>
                        </el-select>
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

            /**
             * 人员查询
             */
            querySearch(queryString, cb) {
                var users = this.portalUsers;
                var results = queryString ? users.filter(this.createFilter(queryString)) : users;
                // 调用 callback 返回建议列表的数据
                console.log(results)
                if(results == "" || results == null || results ==undefined) {
                    this.form.userAccount = "";
                } else {
                    cb(results);
                }
            },
            createFilter(queryString) {
                return (user) => {
                    return (user.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                this.form.userName = item.name;
                this.form.userAccount = item.account;
            },
        },
        data() {
            return {
                dialogVisible: false,
                /**
                 * 表单数据
                 */
                form: {
                    id: "",
                    userName: "",
                    userAccount: "",
                    approveRole: "",
                },

                /**
                 * portal 用户数据
                 */
                portalUsers: [
                    {
                        id: "1",
                        userName: "张三",
                        userAccount: "zhangsan",
                    }
                ],
            }
        },
    }
</script>

<style scoped>
</style>

<style >
</style>