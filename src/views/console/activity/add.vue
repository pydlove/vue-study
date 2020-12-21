<template>
    <div>
        <el-dialog
                class="aiocw-dialog"
                title="创建活动"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="false"
                width="1200px"
                center>
            <el-card class="auto-card wdi-800">
                <el-form
                        class= "pt-20 pl-20"
                        ref="form"
                        :model="form"
                        :rules="rules"
                        :validate-on-rule-change="false"
                        label-width="120px"
                        label-position="right">

                    <el-form-item label="活动主题" prop="title" required>
                        <el-input class="wdi-600" v-model="form.title" placeholder="请输入活动主题"></el-input>
                    </el-form-item>

                    <el-form-item label="活动描述" prop="description" required>
                        <el-input class="textarea wdi-600" type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入活动描述"
                                  v-model="form.description"
                                  maxlength="200"
                                  show-word-limit></el-input>
                    </el-form-item>

                    <el-form-item label="活动海报" prop="poster" required>
                        <el-upload
                                class="aioc-ac-upload"
                                drag
                                :action="uploadAction"
                                :on-success="onSuccess"
                                :before-upload="beforeUpload"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                list-type="picture"
                                multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
                            <div slot="tip" class="el-upload__tip">上传预览：</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="活动日期" prop="seTimeRange" required>
                        <el-date-picker class="wdi-600"
                                        v-model="form.seTimeRange"
                                        type="datetimerange"
                                        :picker-options="pickerMOptions"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd HH:mm:SS"
                                        align="right">
                        </el-date-picker>
                    </el-form-item>

                   <div class="dffn">
                       <el-form-item label="所在区域" prop="area" required>
                           <el-cascader  class="wdi-239"
                                         ref="areaCascaderRef"
                                         size="large"
                                         :props="{ checkStrictly: true }"
                                         :options="areaOptions"
                                         v-model="form.area"
                                         @change="handleAreaCascader"
                                         placeholder="请选择区域">
                           </el-cascader>
                       </el-form-item>

                       <el-form-item label="活动地点" prop="address" required>
                           <el-input class="wdi-239" v-model="form.address" placeholder="请输入活动地点"></el-input>
                       </el-form-item>
                   </div>

                    <div class="dffn">
                        <el-form-item label="限定人数" prop="peopleLimit">
                            <el-input-number v-model="form.peopleLimit" :step="1" :min="0" label="限定人数"></el-input-number>
                            人 <span class="color-fa5c26 fs-10">(0=不限制人数)</span>
                        </el-form-item>

                        <el-form-item label="累计学分" prop="score">
                            <el-input-number v-model="form.score" :step="1" :min="0" label="累计学分"></el-input-number>
                            分
                        </el-form-item>
                    </div>

                    <el-form-item label="报名日期" prop="timeRange" required>
                        <el-date-picker class="wdi-600"
                                        v-model="form.timeRange"
                                        type="datetimerange"
                                        :picker-options="pickerMOptions"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd HH:mm:SS"
                                        align="right">
                        </el-date-picker>
                    </el-form-item>

                   <div class="dffn">
                       <el-form-item label="负责老师" prop="teacherIds" required>
                           <el-select class="wdi-239" v-model="form.teacherIds" placeholder="请选择负责老师" clearable multiple filterable >
                               <el-option
                                       v-for="item in activeTeachers"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                               </el-option>
                           </el-select>
                       </el-form-item>

                       <el-form-item label="是否需要付费" prop="isFree" required>
                           <el-select class="wdi-239" v-model="form.isFree" placeholder="请选择是否需要付费" clearable >
                               <el-option label="付费" value="0"></el-option>
                               <el-option label="免费" value="1"></el-option>
                           </el-select>
                       </el-form-item>
                   </div>

                    <el-form-item v-if="form.isFree=='0'" label="收费" prop="cost" required>
                        <el-input-number v-model="form.cost" :step="1" :min="0" label="报名费用"></el-input-number>
                        元
                    </el-form-item>

                   <el-form-item label="" prop="content" label-width="50px" required>
                        <span class="color-606266">活动内容</span>
                        <quill-editor ref="text" v-model="form.content" class="hp-600 mb-100 wdi-670" :options="editorOption" />
                   </el-form-item>

                   <el-form-item label="是否发布" prop="status" required>
                        <el-tag class="mr-20 wdi-80 tc" :effect="form.status=='0'?'dark':''" @click="form.status = '0'">发布</el-tag>
                        <el-tag class="wdi-80 tc" :effect="form.status=='1'?'dark':''" @click="form.status = '1'">未发布</el-tag>
                   </el-form-item>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">取 消</el-button>
              <el-button class="wdi-120 aioc-btn1" type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    export default {
        name: "add",
        props: ["areaOptions"],
        components: { quillEditor },
        mounted() {

        },
        methods: {
            close() {
                this.dialogVisible = false;
                this.fileList = [];
                this.form.icon = "";
                this.deletePhotoRequest(this.fileName);
            },
            open() {
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs["form"].clearValidate();
                });
            },

            /**
             * 处理地区条件选择变化
             */
            handleAreaCascader() {
                if (this.$refs.areaCascaderRef) {
                    this.$refs.areaCascaderRef.dropDownVisible = false; //监听值发生变化就关闭它
                }
                this.initActiveTeacher();
            },

            async initActiveTeacher() {
                let params = new FormData()
                if (this.form.area != null && this.form.area != "" && this.form.area != undefined) {
                    if (this.form.area.length == 1) {
                        params.append("province", this.form.area[0]);
                    }
                    if (this.form.area.length == 2) {
                        params.append("province", this.form.area[0]);
                        params.append("city", this.form.area[1]);
                    }
                    if (this.form.area.length == 3) {
                        params.append("province", this.form.area[0]);
                        params.append("city", this.form.area[1]);
                        params.append("county", this.form.area[2]);
                    }
                } else {
                    params.append("province", "安徽省");
                }
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_teacher_active, params, "POST");
                if (data.code === 200) {
                    this.activeTeachers = data.data;
                    return true;
                }
            },

            clearForm() {
                this.form = {
                    id: "",
                    title: "",
                    description: "",
                    poster: [],
                    startTime: "",
                    endTime: "",
                    province: '',
                    city: '',
                    county: '',
                    township: '',
                    area: [],
                    address: "",
                    peopleLimit: "",
                    score: "",
                    isFree: "",
                    cost: "",
                    signupStart: "",
                    signupEnd: "",
                    content: "",
                    status: "",
                    teacherIds: [],
                    timeRange: [],
                    seTimeRange: [],
                };
                this.fileList = [];
                this.fileName = "";
            },
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitRequest();
                    } else {
                        return false;
                    }
                });
            },

            async submitRequest() {
                this.form.signupStart = this.form.timeRange[0];
                this.form.signupEnd = this.form.timeRange[1];
                this.form.startTime = this.form.seTimeRange[0];
                this.form.endTime = this.form.seTimeRange[1];
                if(this.form.area.length == 1) {
                    this.form.province = this.form.area[0];
                }
                if(this.form.area.length == 2) {
                    this.form.province = this.form.area[0];
                    this.form.city = this.form.area[1];
                }
                if(this.form.area.length == 3) {
                    this.form.province = this.form.area[0];
                    this.form.city = this.form.area[1];
                    this.form.county = this.form.area[2];
                }
                let data = await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_activity_add, this.form, "POST");
                if(data.code == 200) {
                    this.$promptMsg(data.msg, "success");
                    this.dialogVisible = false;
                    this.clearForm();
                    this.$emit("search", 1, 10);
                }
            },

            /**
             * 照片上传、删除
             */
            handleRemove() {
                this.fileList = [];
                this.deletePhotoRequest(this.fileName);
            },
            onSuccess(response) {
                if(this.fileList != [] && this.fileList.length > 0) {
                    this.fileList = [];
                    this.form.poster = "";
                    this.deletePhotoRequest(this.fileName);
                }
                this.fileName = response.data.fileName;
                this.fileList.push({name: response.data.fileName, url: response.data.fileUrl})
                this.form.poster = response.data.fileUrl;
            },
            beforeUpload(file) {
                // 上传格式做限制
                var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'png'
                const extension2 = testmsg === 'jpg'
                const extension3 = testmsg === 'jpeg'
                if(!extension && !extension2 && !extension3) {
                    this.$promptMsg("图片仅支持png、jpg、jpeg格式，请选择正确的格式！", "error");
                    return false;
                }
            },
            async deletePhotoRequest(fileName) {
                let params = new FormData();
                params.append("fileName", fileName);
                await this.$aiorequest(this.$aiocUrl.console_service_v1_bl_activity_poster_delete, params, "POST");
            },

        },
        data() {
            return {
                dialogVisible: false,
                /**
                 * 照片
                 */
                uploadAction: this.$aiocUrl.console_service_v1_bl_activity_poster_upload,
                fileList: [],
                fileName: "",

                form: {
                    id: "",
                    title: "",
                    description: "",
                    poster: [],
                    startTime: "",
                    endTime: "",
                    province: '',
                    city: '',
                    county: '',
                    township: '',
                    area: [],
                    address: "",
                    peopleLimit: "",
                    score: "",
                    isFree: "",
                    cost: "",
                    signupStart: "",
                    signupEnd: "",
                    content: "",
                    status: "",
                    teacherIds: [],
                    timeRange: [],
                    seTimeRange: [],
                },
                rules: {
                    title: [
                        { type: 'string', required: true, message: '请输入活动标题', trigger: ['change', 'blur'] },
                    ],
                    description: [
                        { type: 'string', required: true, message: '请输入活动描述', trigger: ['change', 'blur']},
                    ],
                    poster: [
                        { type: 'string', required: true, message: '请选择上传海报', trigger: ['change', 'blur'] },
                    ],
                    startTime: [
                        { type: 'string', required: true, message: '请填写活动开始时间', trigger: ['change', 'blur'] }
                    ],
                    endTime: [
                        { type: 'string', required: true, message: '请填写活动结束时间', trigger: ['change', 'blur'] }
                    ],
                    teacherIds: [
                        { type: 'array', required: true, message: '请选择负责老师', trigger: ['change', 'blur'] }
                    ],
                    address: [
                        { type: 'string', required: true, message: '请填写活动地点', trigger: ['change', 'blur'] }
                    ],
                    isFree: [
                        { type: 'string', required: true, message: '请选择是否付费', trigger: ['change', 'blur'] }
                    ],
                    cost: [
                        { type: 'number', required: true, message: '请填写付费金额', trigger: ['change', 'blur'] }
                    ],
                    timeRange: [
                        { type: 'array', required: true, message: '请填写活动报名时间', trigger: ['change', 'blur'] }
                    ],
                    seTimeRange: [
                        { type: 'array', required: true, message: '请填写活动时间', trigger: ['change', 'blur'] }
                    ],
                    content: [
                        { type: 'string', required: true, message: '请填写活动内容', trigger: ['change', 'blur'] }
                    ],
                    status: [
                        { type: 'string', required: true, message: '请选择活动状态', trigger: ['change', 'blur'] }
                    ],
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
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
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
    }
</style>

<style >
    .aioc-ac-upload .el-upload-list__item-thumbnail {
        vertical-align: middle;
        display: inline-block;
        width: 500px;
        height: 300px;
        float: left;
        position: relative;
        z-index: 1;
        margin-left: 40px;
        margin-top: 30px;
        background-color: #FFF;
    }
    .aioc-ac-upload .el-upload-list__item {
        overflow: hidden;
        z-index: 0;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        margin-top: 10px;
        padding: 0px;
        height: 360px !important;
        width: 600px !important;
        transition: none;
    }
    .aioc-ac-upload .el-upload-dragger {
        width: 600px;
        height: 180px;
    }
    .aioc-ac-upload .el-upload-list__item-name {
        display: none;
    }
</style>