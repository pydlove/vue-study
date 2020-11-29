<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="发布活动信息"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :before-close="close"
                :fullscreen="true"
                center>
            <el-card class="auto-card wdi-800">
                <el-form
                        class= "pt-20 pl-20"
                        ref="form"
                        :model="form"
                        :validate-on-rule-change="false"
                        label-width="120px"
                        label-position="right">

                    <el-form-item label="活动主题" prop="title">
                        <el-input class="wdi-600" v-model="form.title" placeholder="请输入活动主题"></el-input>
                    </el-form-item>

                    <el-form-item label="活动描述" prop="title">
                        <el-input class="textarea wdi-600" type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入活动描述"
                                  v-model="form.desc"
                                  maxlength="200"
                                  show-word-limit></el-input>
                    </el-form-item>

                    <el-form-item label="活动海报" prop="title">
                        <el-upload
                                class="aioc-upload"
                                drag
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :file-list="form.poster"
                                list-type="picture"
                                multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>

                    <div class="dffn">
                        <el-form-item label="活动时间" prop="time">
                            <el-date-picker class="wdi-239"
                                            v-model="form.time"
                                            type="date"
                                            placeholder="选择活动时间"
                                            align="right"
                                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="负责老师" prop="name">
                            <el-select class="wdi-239" v-model="form.teacher" placeholder="请选择负责老师">
                                <el-option
                                        v-for="item in teacherOptions"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <el-form-item label="活动地点" prop="name">
                        <el-input class="wdi-600" v-model="form.address" placeholder="请输入活动地点"></el-input>
                    </el-form-item>

                    <div class="dffn">
                        <el-form-item label="限定人数" prop="name">
                            <el-input-number v-model="form.capacity" @change="handleChange" :step="1" label="限定人数"></el-input-number>
                            人
                        </el-form-item>

                        <el-form-item class="ml-80" label="累计学分" prop="name">
                            <el-input-number v-model="form.score" @change="handleChange" :step="1" label="累计学分"></el-input-number>
                            分
                        </el-form-item>
                    </div>

                   <div class="dffn">
                       <el-form-item label="是否需要付费" prop="name">
                           <el-select class="wdi-300" v-model="form.isNeedCost" placeholder="请选择所属课程大类" clearable >
                               <el-option label="是" value="0"></el-option>
                               <el-option label="否" value="1"></el-option>
                           </el-select>
                       </el-form-item>

                       <div v-if="form.isNeedCost=='0'" class="ml-52    ">
                           收费：
                           <el-input-number v-model="form.cost" @change="handleChange" :step="1" label="报名费用"></el-input-number>
                           元
                       </div>
                   </div>

                    <el-form-item label="报名日期" prop="mainName">
                        <el-date-picker class="wdi-600"
                                v-model="form.timeRange"
                                type="datetimerange"
                                :picker-options="pickerMOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="" prop="remark" label-width="50px" >
                        <span class="color-606266">活动内容</span>
                        <quill-editor ref="text" v-model="form.content" class="hp-600 mb-100 wdi-670" :options="editorOption" />
                    </el-form-item>

                    <el-form-item label="是否发布" prop="name">
                        <el-tag class="mr-20 wdi-80 tc" :effect="form.status=='0'?'dark':''" @click="form.status = '0'">发布</el-tag>
                        <el-tag class="wdi-80 tc" :effect="form.status=='1'?'dark':''" @click="form.status = '1'">未发布</el-tag>
                    </el-form-item>
                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
              <el-button class="wdi-120" @click="close">取 消</el-button>
              <el-button class="wdi-120" type="primary" @click="onSubmit">发 布</el-button>
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
        name: "student",
        components: { quillEditor },
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
                this.$promptMsg("发布成功", "success");
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    title: "",
                    desc: "",
                    poster: [],
                    time: "",
                    teacher: "",
                    address: "",
                    capacity: "",
                    score: "",
                    isNeedCost: "",
                    cost: "",
                    timeRange: [],
                    content: "",
                    status: "",
                },
                teacherOptions: [
                    {
                        name: "郭嘉",
                        value: "0",
                    },
                    {
                        name: "诸葛亮",
                        value: "1",
                    },
                    {
                        name: "周瑜",
                        value: "2",
                    },
                ],
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
            }
        },
    }
</script>

<style scoped>
</style>

<style >
    .aioc-upload .el-upload-list__item-thumbnail {
        vertical-align: middle;
        display: inline-block;
        width: 179px;
        height: 100px;
        float: left;
        position: relative;
        z-index: 1;
        margin-left: -80px;
        background-color: #FFF;
    }
    .aioc-upload .el-upload-list__item {
        overflow: hidden;
        z-index: 0;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        margin-top: 10px;
        padding: 10px 10px 10px 90px;
        height: 120px;
        width: 600px;
    }
    .aioc-upload .el-upload-dragger {
        width: 600px;
        height: 180px;
    }
</style>