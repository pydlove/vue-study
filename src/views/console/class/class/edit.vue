<template>
    <div>
        <el-dialog
                class="aioc-dialog"
                title="增加课程大类信息"
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
                    <el-form-item label="班级名称" prop="name">
                        <el-input class="wdi-288" v-model="form.name" placeholder="请输入班级名称"></el-input>
                    </el-form-item>

                    <el-form-item label="开始日期" prop="startTime">
                        <el-date-picker class="wdi-288"
                                        v-model="form.startTime"
                                        type="date"
                                        placeholder="选择开始日期"
                                        align="right"
                                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="结束方式" prop="endType">
                        <el-select class="wdi-288" v-model="form.endType" placeholder="请选择">
                            <el-option
                                    v-for="item in endTypes"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <span v-if="form.endType == '1'" class="ml-20">
                            <el-input-number v-model="form.frequency"  :step="1" step-strictly></el-input-number><span class="ml-20">次之后结束</span>
                        </span>
                    </el-form-item>

                    <el-form-item v-if="form.endType == '2'" label="结束日期" prop="name">
                        <el-date-picker class="wdi-288"
                                        v-model="form.endTime"
                                        type="date"
                                        placeholder="选择结束日期"
                                        align="right"
                                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="是否重复" prop="name">
                        <el-select class="wdi-288" v-model="form.isRepeat" placeholder="请选择是否重复">
                            <el-option
                                    v-for="item in repeats"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="form.isRepeat == '2' || form.isRepeat == '3'" label="周几上课" prop="name">
                        <el-tag :type="form.week == item.value? 'dark':'' " class="week"
                                v-for="item in weeks" :key="item.value" @click="form.week = item.value">
                            {{item.name}}</el-tag>
                    </el-form-item>

                    <el-form-item label="上课时间" prop="name">
                        <el-time-picker class="wdi-288"
                                        is-range
                                        v-model="form.time"
                                        arrow-control
                                        value-format="HH:mm:SS"
                                        :picker-options="{
                                          selectableRange: '8:00:00 - 20:30:00'
                                        }"
                                        range-separator="至"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>

                    <el-form-item label="上课老师" prop="name">
                        <el-select class="wdi-288" v-model="form.teacher" placeholder="请选择上课老师">
                            <el-option
                                    v-for="item in teacherOptions"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="上课地点" prop="name">
                        <el-input class="wdi-288" v-model="form.address" placeholder="请输入上课地点"></el-input>
                    </el-form-item>

                    <el-form-item label="班级容量" prop="name">
                        <el-input class="wdi-288" v-model="form.capacity" placeholder="请输入班级容量"></el-input>
                    </el-form-item>

                    <el-form-item label="所属课程大类" prop="name">
                        <el-select class="wdi-288" v-model="form.mainSubject" placeholder="请选择所属课程大类">
                            <el-option
                                    v-for="item in mainSubjects"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="所属课程小类" prop="name">
                        <el-select class="wdi-288" v-model="form.subSubject" placeholder="请选择所属课程小类">
                            <el-option
                                    v-for="item in subSubjects"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="备注" prop="remark">
                        <el-input class="textarea wdi-600" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="输入备注" v-model="form.remark"></el-input>
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
                this.$promptMsg("编辑成功", "success");
            },
        },
        data() {
            return {
                dialogVisible: false,
                form: {
                    id: "",
                    name: "",
                    startTime: "",
                    endType: "",
                    endTime: "",
                    frequency: "",
                    isRepeat: "",
                    week: "",
                    time: "",
                    teacher: "",
                    address: "",
                    capacity: "",
                    mainSubject: "",
                    subSubject: "",
                },
                weeks: [
                    {name: "周一", value: "周一"},
                    {name: "周二", value: "周二"},
                    {name: "周三", value: "周三"},
                    {name: "周四", value: "周四"},
                    {name: "周五", value: "周五"},
                    {name: "周六", value: "周六"},
                    {name: "周日", value: "周日"},
                ],
                repeats: [
                    {
                        name: "每天",
                        value: "0",
                    },
                    {
                        name: "隔天",
                        value: "1",
                    },
                    {
                        name: "每周",
                        value: "2",
                    },
                    {
                        name: "隔周",
                        value: "3",
                    },
                ],
                endTypes: [
                    {
                        name: "限次数",
                        value: "1",
                    },
                    {
                        name: "限日期",
                        value: "2",
                    },
                ],
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
                mainSubjects: [
                    {
                        id: '1',
                        name: '绘画'
                    }, {
                        id: '2',
                        name: '书法'
                    }, {
                        id: '3',
                        name: '摄影'
                    }, {
                        id: '4',
                        name: '设计'
                    }, {
                        id: '5',
                        name: '雕塑'
                    }
                ],
                subSubjects: [
                    {
                        id: '1',
                        name: '涂鸦4-6'
                    }, {
                        id: '2',
                        name: '涂鸦4-6'
                    }, {
                        id: '3',
                        name: '涂鸦4-6'
                    }, {
                        id: '4',
                        name: '涂鸦4-6'
                    }, {
                        id: '5',
                        name: '涂鸦4-6'
                    }
                ],

                /**
                 * 日期工具
                 */
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
            }
        },
    }
</script>

<style scoped>

</style>

<style >
</style>