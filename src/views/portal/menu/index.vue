<template>
  <div :class="bgClass + '-main'">
    <el-card :class="bgClass + '-card'" :style="'height:' + clientHeight + 'px;'">
      <el-card>
        <el-form :class="bgClass + '-form mt-20'"
                 ref="searchform"
                 :model="searchform"
                 :inline="true"
                 :validate-on-rule-change="false"
                 label-width="80px"
                 label-position="right">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="searchform.chName" placeholder="请搜索单位名称"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" prop="name">
          <el-input v-model="searchform.parentName" placeholder="请搜索上级单位名称"></el-input>
        </el-form-item>

        <el-button class="ml-20 aioc-btn1" type="primary" size="small" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
      </el-form>

      <div class="mb-10">
        <el-button class="aioc-btn1" v-aiocp="['ar']" type="primary" icon="el-icon-plus" size="small" @click="addRoot">增加根菜单</el-button>
      </div>
      <el-table
              :class="bgClass == 'aiocw' ? '':'aioc-table'"
              :border="bgClass == 'aiocw'"
              :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column fixed="left" type="selection" width="55"></el-table-column>
        <el-table-column fixed="left" prop="chName" label="菜单名称" width="300">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type == 'project'" style="background: #f51d37;color: #ffffff;">
              {{scope.row.chName}}
            </el-tag>
            <el-tag v-else-if="scope.row.type == 'menu'" style="background: #409EFF;color: #ffffff;">
              {{scope.row.chName}}
            </el-tag>
            <el-tag v-else-if="scope.row.level == 'button'" style="background: #67C23A;color: #ffffff;">
              {{scope.row.chName}}
            </el-tag>
            <el-tag v-else style="background: #E6A23C;color: #ffffff;">
              {{scope.row.chName}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" :formatter="typeFormat"></el-table-column>
        <el-table-column prop="url" label="路径" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="showOrder" label="展示顺序" :show-overflow-tooltip="true" width="90"></el-table-column>
        <el-table-column prop="lastUpdTime" label="时间" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="level" label="级别" width="70"></el-table-column>
        <el-table-column prop="openType" label="打开方式" :formatter="openTypeFormat"></el-table-column>
        <el-table-column prop="icon" label="图标" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="enabled" label="是否可用" :formatter="enabledFormat"></el-table-column>
        <el-table-column prop="remark" label="描述" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column fixed="right" label="操作" width="350" >
          <template slot-scope="scope">
            <el-button v-show="scope.row.type != 'button' && scope.row.type != 'index'"
                       class="aioc-btn1 mli-10"
                       v-aiocp="['as']"
                       type="primary"
                       size="mini"
                       @click="add(scope.row)">增加子节点</el-button>
            <el-button
                    v-aiocp="['e']"
                    size="mini"
                    type="success"
                    @click="rowEditMenu(scope.row)">编辑</el-button>
            <el-button
                    v-aiocp="['d']"
                    size="mini"
                    type="danger"
                    @click="rowDeleteMenu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-card>
    </el-card>
    <ButtonDialog ref="buttonDialogRef" @search="search"></ButtonDialog>
    <Add ref="addRef" @search="search"></Add>
    <Edit ref="editRef" @search="search"></Edit>
    <AddRoot ref="addRootRef" @search="search"></AddRoot>
    <EditRoot ref="editRootRef" @search="search"></EditRoot>
  </div>
</template>

<script>
    import ButtonDialog from "./buttonDialog";
    import AddRoot from "@/views/portal/menu/addRoot";
    import EditRoot from "@/views/portal/menu/editRoot";
    import Add from "@/views/portal/menu/add";
    import Edit from "@/views/portal/menu/edit";

    export default {
      name: "Menu",
      components: { ButtonDialog, Add, AddRoot, EditRoot, Edit },
      created() {
        this.search();
      },
      methods: {
          async search() {
              let params = new FormData();
              params.append("chName", this.searchform.chName.trim());
              params.append("parentName",  this.searchform.parentName.trim());
              let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_functions_treeTable, params, "POST");
              if (data.code === 200) {
                  this.tableData = data.data;
                  return true;
              }
          },

          reseta() {
              this.searchform = {
                  chName: "",
                  parentName: "",
              };
              this.search();
          },

          addRoot() {
              var form = {
                  id: '',
                  chName: '',
                  url: '',
                  showOrder: '',
                  level: '0',
                  type: 'project',
                  openType: '',
                  enabled: '',
                  remark: '',
                  icon: '',
                  parentId: '',
                  parentName: '',
              };
              this.$refs.addRootRef.setForm(form);
              this.$refs.addRootRef.open();
          },

          add(row) {
              var form = {
                  id: '',
                  chName: '',
                  url: '',
                  showOrder: '',
                  level: Number(row.level) + 1,
                  type: '',
                  openType: '',
                  enabled: '1',
                  remark: '',
                  icon: '',
                  parentId: row.id,
                  parentName: row.chName,
              };
              this.$refs.addRef.setForm(form);
              this.$refs.addRef.open();
          },

          rowDeleteMenu(row) {
              this.checkRowIds.push("\"" + row.id + "\"");
              for(var i in row.children) {
                  const child = row.children[i];
                  this.checkRowIds.push("\"" + child.id + "\"");
                  for(var j in child.children) {
                      const subChild = child.children[j];
                      this.checkRowIds.push("\"" + subChild.id + "\"");
                      for(var k in subChild.children) {
                          const subSubChild = subChild.children[k];
                          this.checkRowIds.push("\"" + subSubChild.id + "\"");
                      }
                  }
              }
              this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.deleteRequest();
              }).catch(() => {
              });
          },

          async deleteRequest() {
              let params = new FormData()
              params.append("ids", this.checkRowIds.toString());
              let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_con_functions_delete, params, "POST");
              if (data.code === 200) {
                  this.$promptMsg("删除菜单成功", "success");
                  this.search();
                  return true;
              }
          },

          rowEditMenu(row) {
              const type = row.type;
              if(type == "project") {
                  var editRootform = {
                      id: row.id,
                      chName: row.chName,
                      showOrder: row.showOrder,
                      level: row.level,
                      type: row.type,
                      enabled: row.enabled,
                      remark: row.remark,
                      icon:  row.icon,
                  };
                  var logoArrays = row.icon.split("/");
                  this.$refs.editRootRef.setOriginalFileName(logoArrays[logoArrays.length - 1]);
                  this.$refs.editRootRef.setFileName(logoArrays[logoArrays.length - 1]);
                  this.$refs.editRootRef.setFileList([{name: row.chName, url: row.icon}]);
                  this.$refs.editRootRef.setForm(editRootform);
                  this.$refs.editRootRef.open();
              } else {
                  var editform = {
                      id: row.id,
                      chName:row.chName,
                      url: row.url,
                      showOrder: row.showOrder,
                      level: row.level,
                      type: row.type,
                      openType: row.openType,
                      enabled: row.enabled,
                      remark: row.remark,
                      icon: row.icon,
                      parentId: row.parentId,
                      parentName: row.parentName,
                  };
                  this.$refs.editRef.setForm(editform);
                  this.$refs.editRef.open();
              }
          },

          typeFormat(row, column) {
            const value = row[column.property];
            switch (value) {
              case "menu":
                return "菜单";
              case "button":
                return "按钮";
              case "project":
                return "项目";
              default :
                return value;
            }
          },
          openTypeFormat(row, column) {
            const value = row[column.property];
            switch (value) {
              case "default":
                return "默认";
              case "iframe":
                return "iframe弹窗";
              case "tab":
                return "打开新的标签页";
              case "open":
                return "弹出窗口";
              default :
                return value;
            }
          },
          enabledFormat(row, column) {
            const value = row[column.property];
            switch (value) {
              case "1":
                return "启用";
              case "2":
                return "停用";
              default :
                return value;
            }
          },
      },
      data() {
          return {
              bgClass: "aiocw",
              clientHeight: document.body.clientHeight-2,
              tableData: [],
              checkRowIds: [],
              searchform: {
                  chName : '',
                  parentName : '',
              },



              funsTreeData: [],
              defaultProps: {
                  children: 'children',
                  label: 'label'
              },
              checkRows: [],
              checkParentId: '',
              checkParentName: '',
              checkLevel: '',
              requestType: '',
              title : "",
              initFlag: false,

          }
      },
    }
</script>
<style>
</style>

<style scoped>
</style>
