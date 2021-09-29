aioc-ac-upload
<template>
  <!--eslint-disable-->
  <div>
    <el-dialog
        class="aiocw-dialog"
        title="提交观测申请"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :before-close="close"
        :fullscreen="false"
        width="800px"
        center>
      <el-form
          class="pt-20 pl-10"
          ref="form"
          :model="form"
          :rules="rules"
          :validate-on-rule-change="false"
          label-width="120px"
          label-position="left">
        <el-form-item label="设备名称" prop="instruments">
          <el-select class="wdi-600" v-model="form.instruments" placeholder="请输入设备名称">
            <el-option label="OnSet" value="OnSet"></el-option>
            <el-option label="WeHost" value="WeHost"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="申请备注" prop="content" >
          <el-input class="wdi-600" v-model="form.content" placeholder="请输入申请备注"></el-input>
        </el-form-item>

        <el-form-item label="观测日期" prop="obsDate">
          <el-date-picker class="wdi-600" type="date" placeholder="选择观测日期 "
                          value-format="yyyy-MM-dd"
                          v-model="form.obsDate" :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="开始时间" prop="startTime" >
          <template>
            <el-time-picker
                class="wdi-600"
                value-format="HH:mm:ss"
                v-model="form.startTime"
                :picker-options="{
      selectableRange: '00:00:00 - 23:59:59'
    }"
                placeholder="开始时间">
            </el-time-picker>
          </template>
        </el-form-item>

        <el-form-item label="结束时间" prop="endTime">
          <template>
            <el-time-picker
                class="wdi-600"
                arrow-control
                value-format="HH:mm:ss"
                v-model="form.endTime"
                :picker-options="{
      selectableRange: '00:00:00 - 23:59:59'
    }"
                placeholder="结束时间">
            </el-time-picker>
          </template>
        </el-form-item>

        <el-form-item label="描述">
          <el-input class="wdi-600 textarea" :autosize="{ minRows: 6, maxRows: 8}"
                    type="textarea" v-model="form.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">关 闭</el-button>
              <el-button class="wdi-120 aioc-btn1" type="primary" @click="onSubmit">提交</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<!--eslint-disable-->
<script>

import utils from "@/utils/utils";

export default {
  name: "add",
  props: [],
  components: {},
  mounted() {
  },
  methods: {
    close() {
      this.dialogVisible = false;
      this.clearForm();
    },

    open() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },

    clearForm() {
      this.form = {
        id: "",
        tradeNo: "",
        userId: "",
        logId: "",
        dataId: "",
        result: "",
        fitsName: "",
        fitsUrl: "",
        fitsDate: "",
        name: "",
        mail: "",
        phone: "",
        address: "",
        observerDate: "",
        sort: "",
        startTime: "",
        endTime: "",
        obsDate: "",
        instruments: "",
        content: "",
        status: "",
        createTime: "",
        updateTime: "",
        remark: "",
      };
    },

    onSubmit() {
      this.message = "提交成功";
      this.submitRequest();
      this.dialogVisible = false;
      this.clearForm();

    },

    async submitRequest() {
      this.form.tradeNo = utils.random_No();
      console.log("-----" + this.form.tradeNo);
      let data = await this.$aiorequest(this.$aiocUrl.web_service_v1_web_application_add, this.form, "POST");
      if (data.code == 200) {
        this.$promptMsg(this.message, "success");
        this.$emit("search", 1, 10);
      }
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        id: "",
        tradeNo: "",
        userId: "",
        logId: "",
        dataId: "",
        result: "",
        fitsName: "",
        fitsUrl: "",
        fitsDate: "",
        name: "",
        mail: "",
        phone: "",
        address: "",
        observerDate: "",
        sort: "",
        startTime: "",
        endTime: "",
        obsDate: "",
        instruments: "",
        content: "",
        status: "",
        createTime: "",
        updateTime: "",

      },
      rules: {
        // content: [
        //   {type: 'string', required: true, message: '请填写望远镜描述', trigger: ['change', 'blur']}
        // ],
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      pickerMOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const endTime = new Date();
            const startTime = new Date();
            start.setTime(startTime.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [startTime, endTime]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const endTime = new Date();
            const startTime = new Date();
            startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [startTime, endTime]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const endTime = new Date();
            const startTime = new Date();
            startTime.setTime(startTime.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [startTime, endTime]);
          }
        }]
      },
      activeTeachers: [],
    }
  },
}
</script>

<style scoped>
.el-upload__tip {
  color: #f51d37;
  margin-left: 20px;
  min-width: 80px;
}

wdi{
  width: 450px !important;
}
</style>

<style>
</style>
