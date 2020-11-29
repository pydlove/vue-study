<template>
  <div>
    <el-dialog
      class="h-100"
      :title="title"
      :visible.sync="dialogShow"
      width="1000px"
      :before-close="close"
      center>
      <el-card class="unit-card tl of-at pb-20" style="display: flex; flex-wrap: nowrap;">
        <el-form
          class= "pt-20 pl-20"
          :rules="rules"
          ref="form"
          :model="form"
          :inline="true"
          :validate-on-rule-change="false"
          label-width="120px"
          label-position="right">
          <el-form-item label="按钮：" prop="btn">
            <el-checkbox-group v-model="form.btn" size="small" style="width: 800px;">
              <el-checkbox label="增加" border>增加</el-checkbox>
              <el-checkbox label="删除" border>删除</el-checkbox>
              <el-checkbox label="编辑" border>编辑</el-checkbox>
              <el-checkbox label="人员配置" border>人员配置</el-checkbox>
              <el-checkbox label="权限配置" border>权限配置</el-checkbox>
              <el-checkbox label="导入照片" border>导入照片</el-checkbox>
              <el-checkbox label="导入模板" border>导入模板</el-checkbox>
              <el-checkbox label="下载模板" border>下载模板</el-checkbox>
              <el-checkbox label="导出数据" border>导出数据</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ButtonDialog",
    props: ["currentPage", "pageSize", "parentId", "parentName"],
    mounted() {
    },
    methods: {
      /**
       * 关闭对话框
       * 开启对话框
       */
      close() {
        this.$confirm('确认关闭？','提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: false
        })
          .then(() => {
            this.closeDialog();
          })
          .catch(() => {});
      },
      closeDialog() {
        this.dialogShow = false;
        this.$refs["form"].clearValidate();
      },
      openDialog(intitle) {
        this.dialogShow = true;
        this.title = intitle;
      },

      /**
       * 提交
       */
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addRequest();
          } else {
            return false;
          }
        });
      },

      /**
       * 增加请求
       */
      addRequest() {
        var forms = [];
        for(var i in this.form.btn) {
          var btnName = this.form.btn[i];
          var btnForm = {
            id: '',
            chName: btnName,
            url: '#',
            showOrder: i,
            level: 4,
            type: 'button',
            openType: 'default',
            enabled: '1',
            remark: this.parentName + btnName,
            icon: '',
            parentId: this.parentId,
            parentName: this.parentName,
          };
          forms.push(btnForm);
        }
        this.$axios.post(
          this.$consoleUrl.portal_service_v1_sys_functions_addBtn, forms,
          {
            header: {
              'Content-Type': 'application/json;charset=UTF-8',
            }
          }
        )
        .then(response => {
          let res = response.data;
          var isLogin = this.$checkLogin(res.code);
          if(!isLogin) {
            return;
          }
          if(res.code == "SUCCESS") {
            this.$promptMsg('增加按钮成功', 'success');
            this.closeDialog();
            this.$emit("search", this.currentPage, this.pageSize);
            this.$emit("refreshTree");
          } else {
            this.$promptMsg('增加按钮失败', 'error');
          }
        })
        .catch(() => {
        });
      },
    },

    data() {
      return {
        /**
         * 标题
         */
        title: "",

        /**
         * 是否显示
         */
        dialogShow: false,

        /**
         * 表单数据
         */
        form: {
          btn: [],
        },

        rules: {
          btn: [
            { required: true, message: '请选择需要增加的按钮', trigger: 'change' },
          ],
        },
      }
    },
  }
</script>

<style scoped>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {width: 214px;}
  .upload-item {position: absolute;top: 105px;left: 47px; }
  .upload {padding-left: 30px;}
</style>

<style>
  .el-upload {width: 150px; height: 164px;}
  .hide .el-upload--picture-card {display: none;}
  .el-upload-list__item {width: 150px !important; height: 164px !important;}
  .unit-card .el-card__body{padding: 0px !important;margin-left: 10px !important;}
  .unit-card .el-form--inline .el-form-item{margin-right: 0px !important;}
  .unit-card .el-form-item__content{margin-right: 10px !important;}
</style>
