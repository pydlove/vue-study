<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="菜单权限配置"
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
                <el-button class="wdi-120" @click="close">取 消</el-button>
                <el-button class="wdi-120" type="primary" @click="authorizeRoleMenu">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "add",
        components: {},
        mounted: function() {
        },
        methods: {
            close() {
                this.projectIds = [];
                this.checkedMenuIds = [];
                this.checkMenus = [];
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;
            },

            async initTreeData() {
                let params = new FormData()
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_functions_tree, params, "GET");
                if (data.code === 200) {
                    this.treeData = data.data[0].children;
                    for(var i in this.treeData) {
                        var projectId = this.treeData[i].id;
                        this.projectIds.push(projectId);
                    }
                    return true;
                }
            },

            async authorizeRoleMenu() {
                this.handleCheckChange();
                var count = this.isSingleProject();
                if(count > 1) {
                    this.$promptMsg("同一个角色，只能授权一个系统，当前授权了" + count + "个系统", "error");
                    return false;
                }
                let params = new FormData()
                params.append("roleId", this.lastCheckId);
                params.append("funcIds", this.checkedMenuIds.toString());
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_role_authorize_fun, params, "POST");
                if (data.code === 200) {
                    this.checkedMenuIds = [];
                    this.$promptMsg("角色菜单授权成功", "success");
                    this.close();
                    return true;
                }
            },
            checkedMenus(currentObj, treeStatus) {
                let selected = treeStatus.checkedKeys.indexOf(currentObj.id);
                if (selected !== -1) {
                    this.$refs.menuTree.setChecked(currentObj.id, false);
                    this.selectedParent(currentObj)
                    this.uniteChildSame(currentObj, true)
                }
            },
            uniteChildSame (treeList, isSelected) {
                this.$refs.menuTree.setChecked(treeList.id, isSelected)
                if (treeList.children) {
                    for (let i = 0; i < treeList.children.length; i++) {
                        this.uniteChildSame(treeList.children[i], isSelected)
                    }
                }
            },
            selectedParent (currentObj) {
                let currentNode = this.$refs.menuTree.getNode(currentObj);
                if (currentNode.parent.key !== undefined) {
                    this.$refs.menuTree.setChecked(currentNode.parent, true)
                    this.selectedParent(currentNode.parent)
                }
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleCheckChange () {
                this.checkedMenuIds = [];
                let res = this.$refs.menuTree.getCheckedNodes()
                res.forEach((item) => {
                    this.checkedMenuIds.push(item.id)
                })
            },
            async initCheckMenus() {
                let params = new FormData()
                params.append("roleId", this.lastCheckId);
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_role_related_fun, params, "POST");
                if (data.code === 200) {
                    this.checkMenus = data.data;
                    return true;
                }
            },
            getCurrentProjectId() {
                for(var i in this.checkMenus) {
                    var id = this.checkMenus[i];
                    for(var j in this.projectIds) {
                        var projectId = this.projectIds[j];
                        if(id == projectId) {
                            this.currentProjectId = projectId;
                            return;
                        }
                    }
                }
            },
            isSingleProject() {
                console.log(this.checkedMenuIds);
                var count = 0;
                for(var i in this.checkedMenuIds) {
                    var id = this.checkedMenuIds[i];
                    for(var j in this.projectIds) {
                        var projectId = this.projectIds[j];
                        if(projectId == id) {
                            count++;
                        }
                    }
                }
                return count;
            },

        },
        data() {
            return {
                dialogVisible: false,
                lastCheckId: "",
                lastCheckName: "",
                filterText: '',
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    level: 'level',
                },
                isExpandAll: true,
                checkStrictly: true,
                checkedMenuIds: [],
                checkMenus: [],
                projectIds: [],
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