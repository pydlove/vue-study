<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="菜单权限peizhi"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="true"
                center>
            <div class="yhpz">
                <el-tag class="mb-10" type="danger">角色名称：{{lastCheckName}}</el-tag>
                <el-card class="box-card tl of-at hp-400">
                    <el-input
                            placeholder="关键字过滤"
                            v-model="filterText">
                    </el-input>
                    <el-tree
                            class="filter-tree"
                            ref="menuTree"
                            show-checkbox
                            :data="treeData"
                            :accordion="true"
                            :highlight-current="true"
                            :default-expand-all="isExpandAll"
                            :check-on-click-node="true"
                            :expand-on-click-node="false"
                            node-key="id"
                            :check-strictly="checkStrictly"
                            :props="defaultProps"
                            :default-checked-keys="checkMenus"
                            :filter-node-method="filterNode"
                            @check="checkedMenus"
                    >
                    </el-tree>
                </el-card>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="authorizeRoleMenu">确 定</el-button>
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
                this.$promptMsg("增加成功", "success");
            },

        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    name: "",
                    remark: '',
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