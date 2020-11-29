<template>
  <div class="f-main">
     <div class="dffn aioc-scroll" :style="'height:' + clientHeight + 'px;'">
       <el-card class="aioc-card wp-20">
         <Tree ref="functionTree"
               @getFunsTreeData="getFunsTreeData"
               @getCheckNodeId="getCheckNodeId"
               @getCheckNodeLabel="getCheckNodeLabel"
               @getCheckNodeLevel="getCheckNodeLevel"
         ></Tree>
       </el-card>

       <el-card class="aioc-card">
         <el-form class="aioc-form"
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

           <el-button class="ml-20 aioc-btn" type="primary" size="small" icon="el-icon-search" @click="search(0, 10)">搜索</el-button>
           <el-button class="ml-20" type="" size="small" icon="el-icon-refresh" @click="reseta">重置</el-button>
         </el-form>

         <div class="mb-10">
           <el-button class="aioc-btn1" v-aba="['a']" type="primary" icon="el-icon-plus" size="small" @click="add">增加</el-button>
           <el-button v-aba="['d']" type="danger" icon="el-icon-delete" size="small" @click="deletea">批量删除</el-button>
           <el-button v-aba="['d']" type="warning" icon="el-icon-close" size="small" @click="toggleSelection">取消选择</el-button>
           <el-button v-aba="['a']" class="aioc-btn" type="primary" icon="el-icon-plus" size="small" @click="addBtn">增加按钮</el-button>
         </div>

         <el-table
                 class="aioc-table"
                 ref="codeTable"
                 :data="tableData"
                 @selection-change='onTableSelectChange'
                 @row-click='tableRowClick'
                 :row-style="{height:'20px'}"
                 :cell-style="{padding:'9px 1px'}"
         >
           <el-table-column fixed="left" type="selection" width="55"></el-table-column>
           <el-table-column fixed="left" prop="chName" label="菜单名称" :show-overflow-tooltip="true"></el-table-column>
           <el-table-column prop="parentName" label="上级菜单" :show-overflow-tooltip="true"></el-table-column>
           <el-table-column prop="type" label="类型" :formatter="typeFormat"></el-table-column>
           <el-table-column prop="url" label="路径" :show-overflow-tooltip="true"></el-table-column>
           <el-table-column prop="showOrder" label="展示顺序" :show-overflow-tooltip="true"></el-table-column>
           <el-table-column prop="lastUpdTime" label="时间"></el-table-column>
           <el-table-column prop="level" label="级别"></el-table-column>
           <el-table-column prop="openType" label="打开方式" :formatter="openTypeFormat"></el-table-column>
           <el-table-column prop="icon" label="图标" :show-overflow-tooltip="true"></el-table-column>
           <el-table-column prop="enabled" label="是否可用" :formatter="enabledFormat"></el-table-column>
           <el-table-column prop="remark" label="描述" :show-overflow-tooltip="true"></el-table-column>
           <el-table-column fixed="right" label="操作" >
             <template slot-scope="scope">
               <el-button
                       v-aba="['e']"
                       size="mini"
                       type="primary"
                       @click="rowEditMenu(scope.$index, scope.row)">编辑</el-button>
               <el-button
                       v-aba="['d']"
                       size="mini"
                       type="danger"
                       @click="rowDeleteMenu(scope.$index, scope.row)">删除</el-button>
             </template>
           </el-table-column>
         </el-table>
         <Pagination class="pagination mt-20" ref="pageRef" @search="search"></Pagination>
       </el-card>
     </div>
    <ButtonDialog @refreshTree="refreshTree" @search="search" ref="buttonDialogRef" :currentPage="currentPage" :pageSize="pageSize"
                  :parentName="form.parentName" :parentId="form.parentId"></ButtonDialog>
    <Add ref="addRef"></Add>
  </div>
</template>

<script>
    import Tree from '@/views/portal/menu/tree.vue';
    import Pagination from "@/components/Pagination";
    import ButtonDialog from "./buttonDialog";
    import Add from "@/views/portal/menu/add";

    export default {
      name: "Menu",
      components: {Tree, Pagination, ButtonDialog, Add},
      data() {
        return {
          clientHeight: document.body.clientHeight,
          tableData: [],
          chNameSearch: '',
          dialogVisible: false,
          direction: 'rtl',
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
            parentId:'',
            parentName:'',
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
          checkRowIds: [],
          title : "",
          initFlag: false,
          searchform: {
            chName : '',
            parentName : '',
          },
          currentPage: 1,
          pageSize: 10,
        }
      },
      created() {
        this.search(0, 10);
      },
      methods: {
        onSubmit() {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              if(this.requestType == "add") {
                this.addRequest();
              }
              else if(this.requestType == "edit") {
                this.editRequest();
              }
            } else {
              return false;
            }
          });
        },
        reset() {
          this.searchform = {
            chName : '',
            parentName : '',
          };
        },
        search(currentPage, pageSize) {
          this.currentPage = currentPage;
          this.pageSize = pageSize;
        },
        addMenu() {
          if(this.checkParentId == '') {
            this.$promptMsg("请先从左侧选择出增加菜单的上级菜单！", "error");
            return;
          }
          this.requestType = "add";
          this.title = "增加菜单";
          this.form = {
            id: '',
            chName: '',
            url: '',
            showOrder: '',
            level: this.checkLevel,
            type: '',
            openType: '',
            enabled: '',
            remark: '',
            icon: '',
            parentId: this.checkParentId,
            parentName: this.checkParentName,
          };
          this.openDialog();
        },

        addBtn() {
          if(this.checkParentId == '') {
            this.$promptMsg("请先从左侧选择出增加菜单的上级菜单！", "error");
            return;
          }
          this.$refs.buttonDialogRef.form.btn = [];
          this.$refs.buttonDialogRef.openDialog("增加按钮");
        },

        editMenu() {
          if(this.checkRows.length == 0) {
            this.$promptMsg("至少需要选择一条数据", "error");
            return;
          }
          if(this.checkRows.length > 1) {
            this.$promptMsg("编辑不能选择多条数据", "error");
            return;
          }
          this.showEditMenu(this.checkRows[0]);
        },
        rowEditMenu(index, row) {
          this.showEditMenu(row);
        },
        showEditMenu(row) {
          this.requestType = "edit";
          this.title = "编辑菜单";
          this.form = {
            id: row.id,
            chName: row.chName,
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
          this.clearNewValidate();
          this.openDialog();
        },
        deleteMenu() {
          if(this.checkRows.length == 0) {
            this.$promptMsg("至少需要选择一条数据", "error");
            return;
          }
          for(var i in this.checkRows) {
            var row = this.checkRows[i];
            this.checkRowIds.push("\"" + row.id + "\"");
          }
          this.deleteRequest();
        },
        rowDeleteMenu(index, row) {
          this.checkRowIds.push("\"" + row.id + "\"");
          this.deleteRequest();
        },
        close() {
          this.$confirm('确认关闭？')
          .then(() => {
            this.closeDialog();
          })
          .catch(() => {});
        },
        openDialog() {
          this.dialogVisible = true;
          this.$refs["form"].clearValidate();
        },
        closeDialog() {
          this.dialogVisible = false;
        },
        tableRowClick(row) {
          this.$refs.menuTable.toggleRowSelection(row);
        },
        onTableSelectChange(rows) {
          this.checkRows = rows;
        },
        toggleSelection() {
          this.$refs.menuTable.clearSelection();
        },
        getFunsTreeData(val) {
          this.funsTreeData = val;
        },
        getCheckNodeId(val) {
          this.form.parentId = val;
          this.checkParentId = val;
        },
        getCheckNodeLabel(val) {
          this.form.parentName = val;
          this.checkParentName = val;
          console.log(this.form.parentName)
        },
        getCheckNodeLevel(val) {
          this.form.level = val;
          this.checkLevel = val;
        },
        addRequest() {
        },
        editRequest() {
        },
        deleteRequest() {
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
        },
        clearNewValidate() {
          if( this.initFlag == false) {
            this.initFlag = true;
          } else {
            this.$refs["form"].clearValidate();
          }
        },
        refreshTree() {
          this.$refs.functionTree.initTreeData();
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
      }
    }
</script>
<style>
  .el-drawer__header {
    background: #4A5154;
    color: #fff;
    margin-bottom: 0px;
    padding: 20px 10px 20px ;
  }
  .el-input--suffix .el-input__inner {
    padding-right: 0px;
  }
  .el-select .el-input__inner {
    cursor: pointer;
    padding-right: 40px;
  }
</style>

<style scoped>
  .el-card {margin: 10px; }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 61px !important;
  }
  .el-footer {
    background-color: #3a4144;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
    height: 40px !important;
    font-size: 14px;
  }

  .el-aside {
    color: #333;
    text-align: center;
    height: 100%;
    line-height: 100%;
  }

  .el-main {
    color: #333;
    text-align: center;
    padding: 0px;
  }

  .el-container {
    width: 100%;
    height: 100%;
  }

  body > .el-container {
    height: 100%;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 100%;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 100%;
  }
</style>
