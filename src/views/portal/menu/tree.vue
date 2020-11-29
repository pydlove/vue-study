<template>
    <div>
      <el-input
        placeholder="关键字过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree mt-20"
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
        :filter-node-method="filterNode"
        @check="getCheckedKeys"
        ref="tree">
      </el-tree>
    </div>
</template>

<script>
    export default {
      name: "Tree",
      data() {
        return {
          filterText: '',
          treeData: [],
          defaultProps: {
            children: 'children',
            label: 'label',
            level: 'level',
          },
          isExpandAll: true,
          checkStrictly: true,
        }
      },
      watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
        },
      },
      created() {
        this.initTreeData();
      },
      methods: {
        initTreeData() {
          // this.$axios.get(
          //   this.$consoleUrl.portal_service_v1_sys_functions_tree,
          //   {
          //     params: {
          //     },
          //     header: {
          //     }
          //   }
          // )
          // .then(response => {
          //   let res = response.data;
          //   var isLogin = this.$checkLogin(res.code);
          //   if(!isLogin) {
          //     return;
          //   }
          //   if(res.code == "SUCCESS") {
          //     this.treeData = res.data;
          //     this.$emit("getFunsTreeData", this.treeData);
          //   } else {
          //     this.$promptMsg('查询菜单树失败', 'error')
          //   }
          // })
          // .catch(() => {
          // });
        },
        getCheckedKeys(val1, val2) {
          console.log(val1)
          console.log(val2)
          if(val2.checkedKeys.length > 0 && val2.checkedKeys != []) {
            this.$emit("getCheckNodeId", val1.id);
            this.$emit("getCheckNodeLabel", val1.label);
            if(val1.id == 'root') {
              this.$emit("getCheckNodeLevel", Number(val1.level));
            } else {
              this.$emit("getCheckNodeLevel", Number(val1.level) + 1);
            }
          } else {
            this.$emit("getCheckNodeId", "");
            this.$emit("getCheckNodeLabel", "");
            this.$emit("getCheckNodeLevel", "");
          }
        },
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        },
      }
    };
</script>

<style scoped>
</style>
